import { 
  FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl mb-4">Aliquam sed mauris</h3>
            <p className="text-sm opacity-80 mb-4">
              Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.
            </p>
            <button className="text-white opacity-80 hover:opacity-100">
              Learn More
            </button>
          </div>
          
          <div>
            <h3 className="text-xl mb-4">Contact Me</h3>
            <div className="space-y-2 text-sm opacity-80">
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
              <a href="https://t.me/beshow" className="text-white opacity-80 hover:opacity-100">
                <FaTelegram className="w-5 h-5" />
              </a>
              <a href="https://github.com/temesgen-982" className="text-white opacity-80 hover:opacity-100">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/beshow.6767/" className="text-white opacity-80 hover:opacity-100">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/temesgen-adane-7a8b96289/" className="text-white opacity-80 hover:opacity-100">
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