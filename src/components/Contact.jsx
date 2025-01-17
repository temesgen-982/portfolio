import { 
  FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt
} from 'react-icons/fa'
import { FaFileArrowDown } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl mb-4">Download Resume</h3>
            <p className="text-sm opacity-80 mb-6">
              Donec imperdiet consequat consequat. Suspendisse feugiat congue posuere. Nulla massa urna, fermentum eget quam aliquet.
            </p>
            <a 
              href="https://drive.google.com/file/d/138K_25gZQEv5x-WH9S_T-KRzdDZEsTzk/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              <FaFileArrowDown className="w-5 h-5" />
              Download CV
            </a>
          </div>

          <div>
            <h3 className="text-xl dark:text-white text-gray-900 mb-4">Contact Me</h3>
            <div className="space-y-2 text-sm dark:text-gray-300 text-gray-600">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Addis Ababa • Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>+251909709370</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>tedenadane@gmail.com</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://t.me/beshow" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaTelegram className="w-5 h-5" />
              </a>
              <a href="https://github.com/temesgen-982" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/beshow.6767/" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/temesgen-adane-7a8b96289/" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer