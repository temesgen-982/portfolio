import { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt
} from 'react-icons/fa'
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Temesgen',
          }
        );

        if (result.status === 200) {
          setNotification({
            show: true,
            type: 'success',
            message: 'Message sent successfully! I will get back to you soon.'
          });
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setNotification({
          show: true,
          type: 'error',
          message: 'Failed to send message. Please try again later.'
        });
      } finally {
        setIsSubmitting(false);
        // Hide notification after 5 seconds
        setTimeout(() => {
          setNotification({ show: false, type: '', message: '' });
        }, 5000);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section className="text-white py-16 relative" id="contact">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-50 border-l-4 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
          role="alert"
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl mb-4 dark:text-white text-gray-900">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border dark:text-white text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    errors.name ? 'border-red-500' : 'border-neutral-700'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border dark:text-white text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    errors.email ? 'border-red-500' : 'border-neutral-700'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border dark:text-white text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    errors.message ? 'border-red-500' : 'border-neutral-700'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="sm:justify-self-center space-y-6">
            <h3 className="text-xl dark:text-white text-gray-900 mb-4">Contact Me</h3>
            <div className="space-y-3 text-sm dark:text-gray-300 text-gray-600">
              <p className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Addis Ababa • Ethiopia</span>
              </p>
              <a 
                href="tel:+251909709370" 
                className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaPhone className="w-4 h-4" />
                <span>+251909709370</span>
              </a>
              <a 
                href="mailto:tedenadane@gmail.com"
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
              >
                <FaEnvelope className="w-4 h-4 text-blue-500" />
                <span>tedenadane@gmail.com</span>
              </a>
            </div>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://t.me/beshow" 
                className="text-[#0088cc] hover:text-[#0088cc]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/temesgen-982" 
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/beshow.6767/" 
                className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/temesgen-adane-7a8b96289/" 
                className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact