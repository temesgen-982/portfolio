import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { FaGithub, FaStar, FaCodeBranch, FaHeart, FaClock } from 'react-icons/fa'

function ProjectCard({ 
  title, 
  description, 
  languages = [], 
  repoLink, 
  demoLink, 
  stars = 0, 
  forks = 0, 
  lastUpdated, 
  initialLikes = 0 
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1)
      setIsLiked(true)
    } else {
      setLikes(prev => prev - 1)
      setIsLiked(false)
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border dark:border-neutral-700 border-gray-200">
      <div className="p-6">
        <h3 className="text-lg sm:text-xl dark:text-white text-gray-900 font-semibold mb-3">
          {title}
        </h3>
        
        <p className="text-sm sm:text-base dark:text-gray-300 text-gray-600 mb-4">
          {description}
        </p>

        {languages.length > 0 && (
          <div className="mb-4 text-sm flex flex-wrap items-center gap-2">
            <span className="dark:text-gray-300 text-gray-600 font-medium">Languages:</span>
            {languages.map((lang, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full dark:bg-neutral-700 bg-gray-200 text-xs"
              >
                {lang.name} {lang.percentage}%
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1 dark:text-gray-400 text-gray-500">
            <FaStar className="w-4 h-4" />
            {stars}
          </span>
          <span className="flex items-center gap-1 dark:text-gray-400 text-gray-500">
            <FaCodeBranch className="w-4 h-4" />
            {forks}
          </span>
          <span className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500">
            <FaClock className="w-4 h-4" />
            {lastUpdated}
          </span>
        </div>

        <hr className="border-gray-200 dark:border-neutral-700 my-4" />

        <div className="flex gap-4">
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg dark:bg-neutral-700 bg-gray-200 hover:opacity-80 transition-opacity text-sm"
          >
            <FaGithub className="w-4 h-4" />
            Repository
          </a>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
            >
              <FiExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
                : 'dark:bg-neutral-700 bg-gray-200 dark:text-gray-400 text-gray-500 hover:text-red-500 dark:hover:text-red-500'
            }`}
          >
            <FaHeart className={`w-4 h-4 ${isLiked ? 'text-red-500' : ''}`} />
            {likes}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard