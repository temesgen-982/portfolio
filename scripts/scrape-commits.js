import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf-8'));

const LANE_COLORS = ['#4183c4', '#4A7A56', '#E6B280', '#B53A3A', '#969aa1', '#a86cd8'];
const ROW_HEIGHT = 32;
const LANE_WIDTH = 16;
const PAD = 8;

function extractRepo(url) {
  const match = (url ?? '').match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)/);
  return match ? { owner: match[1], repo: match[2].replace(/\.git$/, '') } : null;
}

async function fetchCommits(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=8`, {
    headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${owner}/${repo}`);
  return res.json();
}

// Builds lane/graph geometry from a list of commits (newest first),
// same idea as `git log --graph`: walk newest -> oldest, track which
// lane each still-unresolved parent SHA is waiting in.
function buildGraph(commits) {
  const lanes = []; // lanes[i] = sha this lane is currently waiting for
  const rows = [];

  for (const commit of commits) {
    let lane = lanes.indexOf(commit.sha);
    const isNewLane = lane === -1;
    if (isNewLane) {
      lane = lanes.length;
      lanes.push(commit.sha);
    }
    // collapse duplicate lanes that were also waiting for this same sha
    for (let i = lanes.length - 1; i >= 0; i--) {
      if (i !== lane && lanes[i] === commit.sha) lanes.splice(i, 1);
    }

    const activeBefore = lanes.map((_, i) => i).filter(i => i !== lane); // pass-through lanes this row
    const parents = commit.parents ?? [];
    const parentLanes = [];

    if (parents.length === 0) {
      lanes.splice(lane, 1); // root commit, lane terminates
    } else {
      lanes[lane] = parents[0].sha;
      parentLanes.push({ lane, isMergeParent: false });
      for (let p = 1; p < parents.length; p++) {
        let pLane = lanes.indexOf(parents[p].sha);
        if (pLane === -1) { pLane = lanes.length; lanes.push(parents[p].sha); }
        parentLanes.push({ lane: pLane, isMergeParent: true });
      }
    }

    rows.push({
      sha: commit.sha.slice(0, 7),
      message: commit.commit.message.split('\n')[0],
      date: commit.commit.author.date,
      url: commit.html_url,
      isMerge: parents.length > 1,
      lane,
      hasIncoming: !isNewLane,
      passThroughLanes: [...new Set(activeBefore)],
      parentLanes,
      color: LANE_COLORS[lane % LANE_COLORS.length],
    });
  }

  const maxLane = Math.max(0, ...rows.flatMap(r => [r.lane, ...r.passThroughLanes, ...r.parentLanes.map(p => p.lane)]));
  const width = PAD * 2 + (maxLane + 1) * LANE_WIDTH;

  return { rows, width, rowHeight: ROW_HEIGHT, laneWidth: LANE_WIDTH, pad: PAD };
}

fs.mkdirSync(path.join(ROOT, 'data/commits'), { recursive: true });

for (const project of projects) {
  const repoInfo = extractRepo(project.projectUrl);
  if (!repoInfo) continue;

  try {
    const raw = await fetchCommits(repoInfo.owner, repoInfo.repo);
    const commits = raw.map(c => ({
      sha: c.sha,
      commit: c.commit,
      html_url: c.html_url,
      parents: c.parents,
    }));

    const graph = buildGraph(commits);
    fs.writeFileSync(path.join(ROOT, `data/commits/${project.slug}.json`), JSON.stringify(graph, null, 2));

    const latest = graph.rows.find(r => !r.isMerge) || graph.rows[0];
    if (latest) {
      project.updated = new Date(latest.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
    }
    console.log(`✓ ${project.slug}: ${graph.rows.length} commits`);
  } catch (err) {
    console.error(`✗ ${project.slug}: ${err.message}`);
  }
}

fs.writeFileSync(path.join(ROOT, 'data/projects.json'), JSON.stringify(projects, null, 2));
console.log('Written data/commits/*.json and updated data/projects.json');