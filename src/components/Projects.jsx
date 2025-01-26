import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const APIFLASH_KEY = import.meta.env.VITE_APIFLASH_KEY;

  const getScreenshot = async (url, projectName) => {
    // Check cache first - 30 days in milliseconds
    const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000;
    
    const cachedScreenshot = localStorage.getItem(`screenshot_${projectName}`);
    if (cachedScreenshot) {
      const { timestamp, url: cachedUrl } = JSON.parse(cachedScreenshot);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return cachedUrl;
      }
    }
    // Cache the URL
    localStorage.setItem(`screenshot_${projectName}`, JSON.stringify({
      timestamp: Date.now(),
      url: screenshotUrl
    }));

    return screenshotUrl;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        };

        // Add authorization header if token exists
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (githubToken) {
          headers['Authorization'] = `token ${githubToken}`;
        }

        const response = await fetch('https://api.github.com/users/temesgen-982/repos', {
          headers: headers
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('GitHub API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const repos = await response.json();
        
        const projectsData = await Promise.all(
          repos
            .filter(repo => !repo.fork && !repo.private)
            .map(async (repo) => {
              try {
                // Fetch languages for each repo
                const langResponse = await fetch(repo.languages_url, {
                  headers: headers
                });
                
                if (!langResponse.ok) {
                  throw new Error('Failed to fetch languages');
                }
                
                const languagesData = await langResponse.json();
                
                // Calculate language percentages
                const totalBytes = Object.values(languagesData).reduce((a, b) => a + b, 0);
                const languages = Object.entries(languagesData).map(([name, bytes]) => ({
                  name,
                  percentage: ((bytes / totalBytes) * 100).toFixed(1)
                }));

                // Generate screenshot only if project has homepage
                let screenshot = null;
                if (repo.homepage) {
                  try {
                    const screenshotResponse = await fetch(
                      `https://handtrix-website-screenshot-v1.p.rapidapi.com/?url=${encodeURIComponent(repo.homepage)}`,
                      {
                        headers: {
                          'x-rapidapi-host': 'handtrix-website-screenshot-v1.p.rapidapi.com',
                          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
                        }
                      }
                    );

                    if (screenshotResponse.ok) {
                      screenshot = await screenshotResponse.url;
                    } else {
                      console.error('Failed to generate screenshot:', await screenshotResponse.text());
                    }
                  } catch (error) {
                    console.error('Error generating screenshot:', error);
                  }
                }

                return {
                  title: repo.name,
                  description: repo.description || 'No description available',
                  languages: languages,
                  repoLink: repo.html_url,
                  demoLink: repo.homepage || '',
                  screenshot: screenshot,
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  lastUpdated: new Date(repo.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }),
                  initialLikes: 0
                };
              } catch (error) {
                console.error(`Error processing repo ${repo.name}:`, error);
                return null;
              }
            })
        );

        // Filter out any null results from errors and sort projects
        const validProjects = projectsData.filter(project => project !== null);
        const sortedProjects = validProjects.sort((a, b) => {
          // First sort by stars
          if (b.stars !== a.stars) {
            return b.stars - a.stars;
          }
          
          // Then by last updated date
          const dateA = new Date(a.lastUpdated);
          const dateB = new Date(b.lastUpdated);
          if (dateA !== dateB) {
            return dateB - dateA;
          }

          // Finally, if everything else is equal, prioritize projects with screenshots
          if (a.screenshot && !b.screenshot) return -1;
          if (!a.screenshot && b.screenshot) return 1;
          
          return 0;
        });

        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-8 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-neutral-700 h-48 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl dark:text-white text-gray-900 text-center mb-12">Projects</h2>
          <div className="text-red-500 text-center">Error: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-8 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects