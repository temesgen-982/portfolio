function Nav() {
  return (
    <nav className="bg-zinc-900/80 backdrop-blur-sm rounded-md h-[10vh] flex items-center">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <li><a href="#" className="text-gray-300 hover:text-white">Introduction</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">First Section</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Second Section</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Get Started</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav