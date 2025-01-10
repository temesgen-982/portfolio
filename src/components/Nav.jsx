function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-sm rounded-md py-4 flex items-center my-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
          <li><a href="#projects" className="text-gray-300 hover:text-white">Projects</a></li>
          <li><a href="#stats" className="text-gray-300 hover:text-white">Stats</a></li>
          <li><a href="#skills" className="text-gray-300 hover:text-white">Skills</a></li>
          <li><a href="#cta" className="text-gray-300 hover:text-white">CTA</a></li>
          <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav