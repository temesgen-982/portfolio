import { FaQuoteLeft } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Senior Developer at TechCorp",
      image: "/path-to-image1.jpg",
      text: "Working with Temesgen was a great experience. His attention to detail and problem-solving skills are exceptional."
    },
    {
      name: "Jane Smith",
      role: "Project Manager at WebSolutions",
      image: "/path-to-image2.jpg",
      text: "Temesgen consistently delivered high-quality work and was always ready to take on new challenges."
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead at InnovateTech",
      image: "/path-to-image3.jpg",
      text: "His expertise in frontend development and ability to work well in a team made him an invaluable asset to our projects."
    }
  ];

  return (
    <section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] py-8 overflow-y-auto" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl text-white text-center mb-8 sm:mb-12">
          Testimonials
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-neutral-800 p-6 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <FaQuoteLeft className="text-3xl text-gray-500 mb-4" />
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm sm:text-base">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials; 