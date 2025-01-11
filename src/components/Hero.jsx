import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaFileArrowDown } from 'react-icons/fa6'

function Hero() {
  const socialLinks = [
    { 
      icon: "github", 
      href: "https://github.com/temesgen-982",
      element: <FaGithub className="w-6 h-6" />,
      external: true
    },
    { 
      icon: "linkedin", 
      href: "https://www.linkedin.com/in/temesgen-adane-7a8b96289/",
      element: <FaLinkedin className="w-6 h-6" />,
      external: true
    },
    { 
      icon: "instagram",
      href: "https://www.instagram.com/beshow.6767/",
      element: <FaInstagram className="w-6 h-6" />,
      external: true
    },
    { 
      icon: "resume", 
      href: "#cta",
      element: <FaFileArrowDown className="w-6 h-6" />,
      external: false
    },
  ];

  return (
    <section className="h-[85vh] flex items-center justify-center">
      <div className="container mx-auto text-center px-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-8 overflow-hidden">
          <img 
            src="/path-to-your-image.jpg" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-4xl text-white font-bold mb-2">Temesgen Adane</h1>
        <h2 className="text-xl text-gray-300 mb-8">Frontend Developer</h2>
        
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors"
              {...(link.external ? {
                target: "_blank",
                rel: "noopener noreferrer"
              } : {})}
            >
              {link.element}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;