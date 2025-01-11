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
          className="fixed bottom-8 right-8 bg-neutral-900 hover:bg-neutral-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 border-2 border-gray-500"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop 