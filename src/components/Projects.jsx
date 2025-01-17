import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/temesgen-982/repos', {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`GitHub API Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json()
        const savedLikes = JSON.parse(localStorage.getItem('projectLikes') || '{}')
        
        const formattedProjects = data
          .filter(repo => !repo.fork && !repo.private)
          .map(repo => ({
            title: repo.name,
            description: repo.description || 'No description available',
            technologies: [repo.language].filter(Boolean),
            repoLink: repo.html_url,
            demoLink: repo.homepage || '',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            likes: savedLikes[repo.name] || 0
          }))
          .sort((a, b) => b.stars - a.stars)

        setProjects(formattedProjects)
      } catch (err) {
        console.error('Fetch error details:', err);
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleLike = (projectTitle) => {
    setProjects(prevProjects => {
      const newProjects = prevProjects.map(project => {
        if (project.title === projectTitle) {
          return { ...project, likes: project.likes + 1 }
        }
        return project
      })

      // Save likes to localStorage
      const likes = newProjects.reduce((acc, project) => ({
        ...acc,
        [project.title]: project.likes
      }), {})
      localStorage.setItem('projectLikes', JSON.stringify(likes))

      return newProjects
    })
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl dark:text-white text-gray-900 text-center mb-12">Projects</h2>
          <div className="dark:text-white text-gray-900 text-center">Loading projects...</div>
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
    <section className="min-h-screen pt-24" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl dark:text-white text-gray-900 text-center mb-8 sm:mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project} 
              onLike={() => handleLike(project.title)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects