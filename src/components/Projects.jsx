import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/temesgen-982/repos')
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        
        const repos = await response.json()
        
        const projectsData = await Promise.all(
          repos
            .filter(repo => !repo.fork && !repo.private)
            .map(async (repo) => {
              // Fetch languages for each repo
              const langResponse = await fetch(repo.languages_url)
              const languagesData = await langResponse.json()
              
              // Calculate language percentages
              const totalBytes = Object.values(languagesData).reduce((a, b) => a + b, 0)
              const languages = Object.entries(languagesData).map(([name, bytes]) => ({
                name,
                percentage: ((bytes / totalBytes) * 100).toFixed(1)
              }))

              return {
                title: repo.name,
                description: repo.description || 'No description available',
                languages: languages,
                repoLink: repo.html_url,
                demoLink: repo.homepage || '',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                lastUpdated: new Date(repo.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }),
                initialLikes: 0
              }
            })
        )

        // Sort by stars first, then by date
        const sortedProjects = projectsData.sort((a, b) => {
          // First compare by stars
          if (b.stars !== a.stars) {
            return b.stars - a.stars;
          }
          // If stars are equal, sort by date
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        })

        setProjects(sortedProjects)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl dark:text-white text-gray-900 text-center mb-12">Projects</h2>
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
      <div className="container mx-auto px-4">
        <h2 className="text-2xl dark:text-white text-gray-900 text-center mb-12">Projects</h2>
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