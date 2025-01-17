function ResumeCTA() {
  return (
    <section className="py-16" id="cta">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl text-white mb-4">Download Resume</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Donec imperdiet consequat consequat. Suspendisse feugiat congue posuere. Nulla massa urna, fermentum eget quam aliquet.
        </p>
        <div className="space-x-4">
          <a 
            href="https://drive.google.com/file/d/138K_25gZQEv5x-WH9S_T-KRzdDZEsTzk/view?usp=drive_link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  )
}

export default ResumeCTA;