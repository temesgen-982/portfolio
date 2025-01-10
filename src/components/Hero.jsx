import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiDocument } from 'react-icons/hi'

function Hero() {
  const socialLinks = [
    { 
      icon: "github", 
      href: "https://github.com/yourusername",
      element: <FaGithub className="w-6 h-6" />
    },
    { 
      icon: "linkedin", 
      href: "https://linkedin.com/in/yourusername",
      element: <FaLinkedin className="w-6 h-6" />
    },
    { 
      icon: "instagram",
      href: "https://instagram.com/yourusername",
      element: <FaInstagram className="w-6 h-6" />
    },
    { 
      icon: "resume", 
      href: "#",
      element: <HiDocument className="w-6 h-6" />
    },
  ];

  return (
    <section className="min-h-[90vh] flex items-center justify-center">
      <div className="container mx-auto text-center px-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-8 overflow-hidden">
          <img 
            src="/path-to-your-image.jpg" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-4xl text-white font-bold mb-2">Your Name</h1>
        <h2 className="text-xl text-gray-300 mb-8">Full-stack Developer | Your Tech Stack</h2>
        
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
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