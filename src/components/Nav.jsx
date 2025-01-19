import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/background", text: "Background" },
    { to: "/projects", text: "Projects" },
    { to: "/testimonials", text: "Testimonials" },
    { to: "/skills", text: "Skills" },
    { to: "/contact", text: "Contact" }
  ]

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled ? 'dark:bg-neutral-950/90 bg-white/90 backdrop-blur shadow-lg' : 'dark:bg-neutral-950 bg-white'}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Desktop Navigation */}
            <div className="hidden sm:block">
              <div className="dark:bg-neutral-800 bg-gray-100 rounded-lg overflow-hidden my-4">
                <div className="px-6 py-2 flex items-center dark:border-none border-2 border-gray-300">
                  <ul className="flex space-x-8 flex-1 justify-center">
                    {navLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-white text-sm"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg dark:bg-neutral-700 bg-gray-200 dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-white ml-4"
                  >
                    {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between py-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg dark:bg-neutral-700 bg-gray-200 dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-white"
                >
                  {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-white p-2"
                >
                  {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Menu */}
              <div className={`
                absolute left-0 right-0 px-4 dark:bg-neutral-950 bg-white
                transition-all duration-300
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
              `}>
                <div className="dark:bg-neutral-800 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <ul className="py-2">
                    {navLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="block dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-white text-sm py-2 px-4"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      <div 
        className={`sm:hidden fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 40 }}
        onClick={() => setIsOpen(false)}
      />
    </>
  )
}

export default Nav