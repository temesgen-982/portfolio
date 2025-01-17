import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 dark:bg-neutral-900 bg-white hover:bg-gray-100 dark:hover:bg-neutral-800 dark:text-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 z-50 dark:border-gray-500 border-gray-300 border-2"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop 