import { FaGithub, FaLinkedin, FaInstagram, FaTelegram } from 'react-icons/fa'
import { FaFileArrowDown } from 'react-icons/fa6'

function Hero({ className }) {
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
      href: "https://drive.google.com/file/d/138K_25gZQEv5x-WH9S_T-KRzdDZEsTzk/view?usp=drive_link",
      element: <FaFileArrowDown className="w-6 h-6" />,
      external: false
    },
  ];

  return (
    <section className={`pt-[40%] sm:pt-24 flex items-center justify-center ${className}`}>
      <div className="container mx-auto text-center px-4">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6 md:mb-8 overflow-hidden border-[.1rem] dark:border-white border-transparent">
          <img 
            src="/images/portrait.png"
            alt="Profile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl dark:text-white text-gray-900 font-bold mb-2">Temesgen Adane</h1>
        <h2 className="text-lg md:text-xl dark:text-gray-300 text-gray-600 mb-6 md:mb-8">Frontend Developer</h2>
        
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
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