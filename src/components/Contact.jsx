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

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
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
    <footer className="text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full p-2 rounded bg-neutral-800 border ${
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
                  className={`w-full p-2 rounded bg-neutral-800 border ${
                    errors.email ? 'border-red-500' : 'border-neutral-700'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className={`w-full p-2 rounded bg-neutral-800 border ${
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

          <div>
            <h3 className="text-xl dark:text-white text-gray-900 mb-4">Contact Me</h3>
            <div className="space-y-2 text-sm dark:text-gray-300 text-gray-600">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Addis Ababa • Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>+251909709370</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>tedenadane@gmail.com</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://t.me/beshow" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaTelegram className="w-5 h-5" />
              </a>
              <a href="https://github.com/temesgen-982" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/beshow.6767/" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/temesgen-adane-7a8b96289/" className="dark:text-white text-gray-700 dark:opacity-80 opacity-70 hover:opacity-100">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer