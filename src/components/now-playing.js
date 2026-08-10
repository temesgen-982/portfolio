import { html } from '../utils/html.js';
import { youtubeIcon, spotifyIcon } from '../partials/icons.js';

const LASTFM_USER = 'beshow6767';
const API_KEY = 'a2809dc0cf902671e6093ef866bb9ee1';

export function nowPlaying() {
  return html`
  <div class="now-playing">
    <div class="now-playing__status">
      <span class="now-playing__dot" id="now-playing-dot"></span>
      <span id="status-text">Loading…</span>
      <a class="now-playing__link" href="https://www.last.fm/user/${LASTFM_USER}" target="_blank" rel="noopener">Last.fm</a>
    </div>
    <div class="now-playing__body">
      <img id="track-art" class="now-playing__art" alt="Album art" style="display:none">
      <div class="now-playing__meta">
        <p class="now-playing__title" id="track-title">—</p>
        <p class="now-playing__artist" id="track-artist">—</p>
        <div class="now-playing__links" id="now-playing-links" hidden>
          <a id="youtube-link" href="#" target="_blank" rel="noopener" aria-label="Search on YouTube">${youtubeIcon}</a>
          <a id="spotify-link" href="#" target="_blank" rel="noopener" aria-label="Search on Spotify">${spotifyIcon}</a>
        </div>
      </div>
    </div>
  </div>

  <script>
    const NOW_PLAYING_URL = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${API_KEY}&format=json&limit=1';

    let pollTimer;

    const statusText = document.getElementById('status-text');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackArt = document.getElementById('track-art');
    const statusDot = document.getElementById('now-playing-dot');
    const trackLinks = document.getElementById('now-playing-links');
    const YouTubeLink = document.getElementById('youtube-link');
    const SpotifyLink = document.getElementById('spotify-link');

    async function updateNowPlaying() {
      try {
        const res = await fetch(NOW_PLAYING_URL);
        if (!res.ok) throw new Error('Last.fm responded ' + res.status);
        const data = await res.json();
        const track = data.recenttracks?.track?.[0];

        if (!track) {
          statusText.innerText = 'No recent tracks';
          trackTitle.innerText = '—';
          trackArtist.innerText = '—';
          trackArt.style.display = 'none';
          trackLinks.hidden = true;
          statusDot.classList.remove('is-playing');
          return;
        }

        const isPlaying = track['@attr']?.nowplaying === 'true';
        const artistName = track.artist['#text'];
        statusText.innerText = isPlaying ? 'Now playing' : 'Last played';
        trackTitle.innerText = track.name;
        trackArtist.innerText = artistName;
        statusDot.classList.toggle('is-playing', isPlaying);

        const art = track.image?.find(img => img.size === 'extralarge') || track.image?.at(-1);
        const artUrl = art?.['#text'];
        if (artUrl) {
          trackArt.src = artUrl;
          trackArt.style.display = 'block';
        }

        const query = encodeURIComponent(track.name + ' ' + artistName);
        YouTubeLink.href = 'https://www.youtube.com/results?search_query=' + query;
        SpotifyLink.href = 'https://open.spotify.com/search/' + query;
        trackLinks.hidden = false;
      } catch (err) {
        console.error('Last.fm fetch failed:', err);
        statusText.innerText = 'Offline';
        trackTitle.innerText = '—';
        trackArtist.innerText = '—';
        trackArt.style.display = 'none';
        trackLinks.hidden = true;
        statusDot.classList.remove('is-playing');
      }
    }

    function startPolling() {
      clearInterval(pollTimer);
      updateNowPlaying();
      pollTimer = setInterval(updateNowPlaying, 30000);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(pollTimer);
      } else {
        startPolling();
      }
    });

    if (!document.hidden) startPolling();
  </script>`;
}
