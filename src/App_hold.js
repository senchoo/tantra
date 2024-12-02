// =============== PART 1 - IMPORTS AND DATA ===============
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Phone, Mail, Heart, Users, Menu, X, MessageCircle, Send } from 'lucide-react';

// Import your images
import privateSessionImage from './images/private-session.jpg';
import couplesImage from './images/couples.jpg';
import groupClassImage from './images/group-class.jpg';
import onlineSessionImage from './images/online-session.jpg';
import heroImage from './images/hero-image.jpg';
import profileImage from './images/profile.jpg';

const servicesData = [
  {
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
    title: "Private Sessions",
    description: "One-on-one guidance tailored to your personal journey and goals.",
    image: privateSessionImage,
    fullDescription: "Experience a deeply transformative one-on-one session designed to meet you exactly where you are on your journey. Our private sessions offer a safe, nurturing space for personal exploration and growth through traditional tantra practices.",
    benefits: [
      "Personalized attention and guidance",
      "Custom-tailored practices for your needs",
      "Private, confidential environment",
      "Flexible scheduling options"
    ],
    includes: [
      "90-minute session",
      "Pre-session consultation",
      "Personalized practice recommendations",
      "Post-session integration guidance"
    ]
  },
  {
    icon: <Heart className="w-6 h-6 text-purple-600" />,
    title: "Couples Sessions",
    description: "Deepen your connection and explore sacred intimacy together.",
    image: couplesImage,
    fullDescription: "Strengthen your relationship through the sacred practices of tantra. Our couples sessions help you and your partner develop deeper intimacy, trust, and understanding while exploring the spiritual dimensions of your connection.",
    benefits: [
      "Enhanced emotional intimacy",
      "Improved communication",
      "Deeper spiritual connection",
      "Strengthened relationship bond"
    ],
    includes: [
      "2-hour couple's session",
      "Joint consultation",
      "Practical exercises to take home",
      "Follow-up support"
    ]
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: "Group Classes",
    description: "Share and learn in a supportive community environment.",
    image: groupClassImage,
    fullDescription: "Join our vibrant community in exploring tantra through group sessions. These classes offer a unique opportunity to learn and grow alongside others while maintaining personal boundaries and comfort levels.",
    benefits: [
      "Community support and connection",
      "Shared learning experience",
      "Affordable pricing",
      "Regular practice schedule"
    ],
    includes: [
      "Weekly 2-hour sessions",
      "Beginner-friendly instruction",
      "Community support",
      "Monthly workshops"
    ]
  },
  {
    icon: <Phone className="w-6 h-6 text-purple-600" />,
    title: "Online Consultation",
    description: "Connect and begin your journey from anywhere in the world.",
    image: onlineSessionImage,
    fullDescription: "Access the transformative power of tantra from wherever you are. Our online consultations bring expert guidance directly to you, making spiritual growth and personal development accessible regardless of location.",
    benefits: [
      "Location independence",
      "Flexible scheduling",
      "Comfortable home environment",
      "Recorded sessions available"
    ],
    includes: [
      "60-minute video session",
      "Digital resources",
      "Email support",
      "Recording access"
    ]
  }
];



// =============== PART 2 - SERVICE DETAILS COMPONENT ===============
const ServiceDetails = ({ service, onClose }) => {
  const [isOnline, setIsOnline] = useState(null);
  const [sessionTypeSelected, setSessionTypeSelected] = useState(false);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleBooking = () => {
    if (isOnline === null) {
      alert('Please select your preferred session type (online or in-person)');
      return;
    }
    alert(`Booking system coming soon! You selected a ${isOnline ? 'online' : 'in-person'} session. Please use the contact form for now.`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[90vw] max-w-[1200px] h-[85vh] flex flex-col"
        onClick={handleContentClick}
      >
        <div className="relative h-[35vh]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold mb-4">{service.title}</h3>
            <p className="text-gray-600 text-lg mb-8">{service.fullDescription}</p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Benefits:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="text-lg">{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Session Includes:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="text-lg">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-auto max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-12 mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sessionType"
                  checked={isOnline === false}
                  onChange={() => {
                    setIsOnline(false);
                    setSessionTypeSelected(true);
                  }}
                  className="w-5 h-5 text-purple-600"
                />
                <span className="text-lg">In-Person Session</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sessionType"
                  checked={isOnline === true}
                  onChange={() => {
                    setIsOnline(true);
                    setSessionTypeSelected(true);
                  }}
                  className="w-5 h-5 text-purple-600"
                />
                <span className="text-lg">Online Session</span>
              </label>
            </div>

            <div className="flex gap-6">
              <button 
                onClick={handleBooking}
                className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg"
              >
                Book This Session
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-gray-50 px-6 py-4 rounded-lg transition-colors border border-gray-300 text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =============== PART 3 - MAIN APP COMPONENT ===============
// =============== PART 3 - MAIN APP COMPONENT ===============


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    // Changed the main container background to a gradient
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-purple-100">
      {/* Navigation - made slightly transparent */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div 
              className="text-2xl font-semibold text-red-800 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              Sacred Journey
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-purple-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex space-x-8">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`${
                    activeSection === section ? 'text-purple-600' : 'text-gray-600'
                  } hover:text-purple-600 transition-colors capitalize`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/90 border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`${
                    activeSection === section 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600'
                  } block w-full px-3 py-2 rounded-md text-base text-left hover:bg-purple-50 hover:text-purple-600 transition-colors capitalize`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Discover Your Inner Harmony
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience transformative tantra sessions tailored to your journey of self-discovery and spiritual growth.
          </p>

          {/* Hero Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="h-[180px]">
              <img
                src={heroImage}
                alt="Sacred Journey Banner"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Book a Session
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - removed background */}
      <section id="services" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">My Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="bg-white/90 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-gray-600 px-8">
            {/* Image centered above text */}
            <div className="flex justify-center mb-8">
              <img
                src={profileImage}  // Make sure to import this at the top of your file
                alt="Tantra Teacher"
                className="w-72 h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
            {/* Text content */}
            <div className="space-y-6">
              <p>
              After having lived over 5 years in Bali where the art of Tantra has completely transformed my life, I have dedicated my life to helping others discover their true potential through sacred practices. Having guided more than 1,000 individuals in group sessions and numerous couples on their journey to deeper connection, I bring both expertise and heartfelt dedication to every session.
              </p>
              <p>
                My practice combines traditional tantra teachings with ecstatic dance facilitation, creating unique experiences that open pathways to enhanced intimacy and self-discovery. Through private sessions, couple consultations, and regular appearances at transformational events, I have witnessed countless breakthroughs in personal growth and relationship dynamics.
              </p>
              <p>
                Whether you are seeking to deepen your connection with yourself, enhance your relationship, or explore the transformative power of tantra, I offer a safe and nurturing space for your journey. Let us explore together how these ancient practices can bring more harmony, joy, and authenticity into your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - removed background */}
      {/* Contact Section */}
      <section id="contact" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Get in Touch</h2>
          <div className="flex justify-center mb-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-medium">Contact Information</h3>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <a href="mailto:contact@sacredjourney.com" className="hover:text-purple-600">
                  contact@sacredjourney.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-purple-600" />
                <a href="tel:+15551234567" className="hover:text-purple-600">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 p-6 rounded-lg shadow-sm col-span-2 max-w-xl mx-auto w-full">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleFormChange}
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  placeholder="Your Message"
                  className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetails 
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default App;