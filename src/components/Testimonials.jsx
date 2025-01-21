import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TestimonialCard from './TestimonialCard';

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Senior Developer at TechCorp",
      image: "/images/user.png",
      text: "Working with Temesgen was a great experience. His attention to detail and problem-solving skills are exceptional."
    },
    {
      name: "Jane Smith",
      role: "Project Manager at WebSolutions",
      image: "/images/user.png",
      text: "Temesgen consistently delivered high-quality work and was always ready to take on new challenges."
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead at InnovateTech",
      image: "/images/user.png",
      text: "lorem."
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead at InnovateTech",
      image: "/images/user.png",
      text: "lorem."
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead at InnovateTech",
      image: "/images/user.png",
      text: "lorem."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] py-8" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl dark:text-white text-gray-900 text-center mb-8 sm:mb-12">
          Testimonials
        </h2>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 dark:bg-neutral-800 bg-white p-2 rounded-full shadow-lg dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-neutral-700"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 dark:bg-neutral-800 bg-white p-2 rounded-full shadow-lg dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-neutral-700"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;