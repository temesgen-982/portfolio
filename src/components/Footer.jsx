import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
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
            <h3 className="text-xl mb-4">Etiam feugiat</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>1234 Somewhere Road • Nashville, TN 00000 • USA</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>(000) 000-0000 x0000</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>information@untitled.tld</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
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