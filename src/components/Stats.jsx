function Stats() {
  return (
    <section className="py-16" id="stats">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-white text-center mb-8">Ipsum consequat</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Donec imperdiet consequat consequat. Suspendisse feugiat congue posuere. Nulla massa urna, fermentum eget quam aliquet.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 max-w-4xl mx-auto">
          <div className="bg-gray-700 p-4 text-white text-center">
            <div className="text-2xl font-bold">5,120</div>
            <div className="text-sm">Etiam</div>
          </div>
          <div className="bg-gray-600 p-4 text-white text-center">
            <div className="text-2xl font-bold">8,192</div>
            <div className="text-sm">Magna</div>
          </div>
          <div className="bg-gray-500 p-4 text-white text-center">
            <div className="text-2xl font-bold">2,048</div>
            <div className="text-sm">Tempus</div>
          </div>
          <div className="bg-gray-400 p-4 text-white text-center">
            <div className="text-2xl font-bold">4,096</div>
            <div className="text-sm">Aliquam</div>
          </div>
          <div className="bg-gray-300 p-4 text-white text-center">
            <div className="text-2xl font-bold">1,024</div>
            <div className="text-sm">Nullam</div>
          </div>
        </div>
        
        <p className="text-center text-gray-300 mt-12 max-w-4xl mx-auto">
          Nam pellentesque venenatis tempor. Nullam duis ante est, elementum eu consectetur est, blandit at justo.
        </p>
      </div>
    </section>
  )
}
export default Stats
    