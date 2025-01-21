import { FaQuoteLeft } from 'react-icons/fa';

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="dark:bg-neutral-800 bg-gray-100 p-6 rounded-lg">
        <FaQuoteLeft className="text-3xl dark:text-gray-500 text-gray-400 mb-4" />
        <p className="dark:text-gray-300 text-gray-600 mb-6 text-sm sm:text-base">
          "{testimonial.text}"
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500 bg-gray-600 overflow-hidden mr-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="dark:text-white text-gray-900 font-medium text-sm sm:text-base">
              {testimonial.name}
            </h3>
            <p className="dark:text-gray-400 text-gray-500 text-xs sm:text-sm">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
