import { FaCode } from 'react-icons/fa'
import { FaFileCode } from 'react-icons/fa'
import { FaCube } from 'react-icons/fa'

function Features() {
  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-white text-center mb-12">Magna veroeros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 shadow-lg flex items-center justify-center mx-auto mb-4">
              <FaCode className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Ipsum consequat</h3>
            <p className="text-gray-300 text-sm">Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 shadow-lg flex items-center justify-center mx-auto mb-4">
              <FaFileCode className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Amed sed feugiat</h3>
            <p className="text-gray-300 text-sm">Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 shadow-lg flex items-center justify-center mx-auto mb-4">
              <FaCube className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Dolor nullam</h3>
            <p className="text-gray-300 text-sm">Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button className="text-gray-300 hover:text-white">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Features