# Personal Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🛠️ Built With [Dependencies]

- React 18
- Vite
- Tailwind CSS
- EmailJS
- React Icons
- React Router DOM

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/temesgen-982/portfolio.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_GITHUB_TOKEN=your_github_token

VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

VITE_RAPIDAPI_KEY=your_rapidapi_key
```

4. Start the development server

```bash
npm run dev
```

## 📦 Build

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🌟 Features in Detail

### Projects Section

- Fetches repositories from GitHub API
- Displays project screenshots, languages used, and statistics
- Caches screenshots for better performance
- Like button functionality for projects

### Contact Form

- Real-time form validation
- EmailJS integration for sending messages
- Success/Error notifications
- Character limit for messages

### Dark Mode

- System preference detection
- Manual toggle option
- Persistent preference storage

## Responsive Design

The portfolio is fully responsive with breakpoints for:

- Mobile devices
- Tablets
- Desktop screens
- Large desktop screens

## 🔧 Configuration

You can modify the following files for customization:

- `tailwind.config.js` for theme customization
- `src/components/Hero.jsx` for personal information
- `src/components/Testimonials.jsx` for testimonials data

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Contact

Temesgen Adane

- Email: tedenadane@gmail.com
- GitHub: [@temesgen-982](https://github.com/temesgen-982)
- LinkedIn: [Temesgen Adane](https://www.linkedin.com/in/temesgen-adane-7a8b96289/)
