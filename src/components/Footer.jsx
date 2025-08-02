import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate footer content
    tl.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reserve', href: '#reserve' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="bg-pizza-green text-white">
      <div ref={contentRef} className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🍕</span>
              <h3 className="text-2xl font-lobster">Pizza Palace</h3>
            </div>
            <p className="text-gray-300 font-montserrat leading-relaxed">
              Crafting the perfect pizza experience since 2010. Fresh ingredients, 
              authentic flavors, and unforgettable moments.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pizza-orange transition-all duration-300 transform hover:scale-110"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-300 hover:text-pizza-orange transition-colors duration-300 font-montserrat"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-pizza-orange text-xl">📍</span>
                <div>
                  <p className="font-montserrat">123 Pizza Street</p>
                  <p className="text-gray-300 text-sm">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pizza-orange text-xl">📞</span>
                <div>
                  <p className="font-montserrat">(555) 123-4567</p>
                  <p className="text-gray-300 text-sm">Mon-Sun 11AM-10PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pizza-orange text-xl">✉️</span>
                <div>
                  <p className="font-montserrat">hello@pizzapalace.com</p>
                  <p className="text-gray-300 text-sm">We'll respond within 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 font-montserrat text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full bg-pizza-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 font-montserrat text-sm">
              © 2024 Pizza Palace. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-pizza-orange transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-pizza-orange transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-pizza-orange transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating pizza decoration */}
      <div className="absolute bottom-4 left-4 w-12 h-12 opacity-20 animate-bounce">
        <span className="text-3xl">🍕</span>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <span className="text-2xl">🧃</span>
      </div>
    </footer>
  );
};

export default Footer; 