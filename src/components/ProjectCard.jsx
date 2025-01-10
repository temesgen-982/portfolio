import { FiExternalLink } from 'react-icons/fi'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'

function ProjectCard({ title, description, technologies, repoLink, demoLink, stars, forks }) {
  return (
    <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors">
      <h3 className="text-xl text-white font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{description}</p>
      
      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span 
            key={index}
            className="px-3 py-1 text-xs bg-neutral-900 text-gray-300 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex gap-4 mb-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <FaStar className="w-4 h-4" />
          {stars}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="w-4 h-4" />
          {forks}
        </span>
      </div>
      
      {/* Links */}
      <div className="flex gap-4">
        <a
          href={repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-sm flex items-center gap-2"
        >
          <FaGithub className="w-4 h-4" />
          Repository
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-sm flex items-center gap-2"
          >
            <FiExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard