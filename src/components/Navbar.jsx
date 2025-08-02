import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const navbarRef = useRef(null);
  const menuItemsRef = useRef(null);
  const burgerRef = useRef(null);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  const menuItems = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'food', name: 'Indian Delights' },
    { id: 'menu', name: 'Menu' },
    { id: 'chef', name: 'Our Chef' },
    { id: 'testimonials', name: 'Reviews' },
    { id: 'reserve', name: 'Reserve' }
  ];

  // GSAP Animation for opening navbar
  const openNavbar = () => {
    const tl = gsap.timeline();
    
    // Animate overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Animate navbar sliding in from top
    tl.to(navbarRef.current, {
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Animate burger icon to X
    tl.to(burgerRef.current.children[0], {
      rotation: 45,
      y: 6,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");
    tl.to(burgerRef.current.children[1], {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    }, "-=0.3");
    tl.to(burgerRef.current.children[2], {
      rotation: -45,
      y: -6,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");

    // Animate close button
    tl.to(closeBtnRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Animate menu items with stagger
    tl.fromTo(menuItemsRef.current.children,
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );
  };

  // GSAP Animation for closing navbar
  const closeNavbar = () => {
    const tl = gsap.timeline();
    
    // Animate menu items out
    tl.to(menuItemsRef.current.children, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    });

    // Animate close button out
    tl.to(closeBtnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.2");

    // Animate navbar sliding out to top
    tl.to(navbarRef.current, {
      y: "-100%",
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.2");

    // Animate burger icon back to lines
    tl.to(burgerRef.current.children[0], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");
    tl.to(burgerRef.current.children[1], {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out"
    }, "-=0.3");
    tl.to(burgerRef.current.children[2], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");

    // Animate overlay out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  };

  // Handle burger click
  const toggleNavbar = () => {
    if (isOpen) {
      closeNavbar();
    } else {
      openNavbar();
    }
    setIsOpen(!isOpen);
  };

  // Handle close button click
  const handleClose = () => {
    toggleNavbar();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          toggleNavbar();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedTab(prev => prev > 0 ? prev - 1 : menuItems.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedTab(prev => prev < menuItems.length - 1 ? prev + 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedTab >= 0 && selectedTab < menuItems.length) {
            scrollToSection(menuItems[selectedTab].id);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedTab]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !navbarRef.current?.contains(e.target) && !burgerRef.current?.contains(e.target)) {
        toggleNavbar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close navbar immediately after navigation
      setTimeout(() => {
        if (isOpen) {
          toggleNavbar();
        }
      }, 100);
    }
  };

  // Handle tab click
  const handleTabClick = (index, sectionId) => {
    setSelectedTab(index);
    scrollToSection(sectionId);
  };

  return (
    <>
      {/* Burger Menu Button */}
      <button
        ref={burgerRef}
        onClick={toggleNavbar}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-pizza-green hover:bg-green-700 rounded-full flex flex-col justify-center items-center space-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
        aria-label="Toggle navigation menu"
      >
        <span className="w-6 h-0.5 bg-white transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-white transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-white transition-all duration-300"></span>
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleNavbar}
      />

      {/* Full Page Navigation Menu */}
      <nav
        ref={navbarRef}
        className={`fixed inset-0 bg-pizza-green/95 backdrop-blur-md z-50 transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className={`absolute top-6 right-6 z-60 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/30 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
          }`}
          aria-label="Close navigation menu"
        >
          <span className="text-white text-2xl">✕</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">🍕</span>
              <h1 className="text-5xl md:text-6xl font-lobster text-white">Pizza Palace</h1>
            </div>
            <p className="text-white/80 text-xl font-montserrat max-w-2xl mx-auto">
              Discover authentic Indian flavors alongside our signature pizzas
            </p>
          </div>

          {/* Navigation Tabs - Horizontal Layout */}
          <div ref={menuItemsRef} className="w-full max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex flex-wrap justify-center gap-4">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(index, item.id)}
                    onMouseEnter={() => setSelectedTab(index)}
                    className={`group px-8 py-6 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pizza-orange focus:ring-opacity-50 border-2 backdrop-blur-sm text-center min-w-[180px] ${
                      selectedTab === index
                        ? 'bg-pizza-orange text-white border-pizza-orange scale-110 shadow-xl'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                    } ${
                      isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ 
                      transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                    }}
                    aria-selected={selectedTab === index}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <span className={`font-bold font-montserrat text-xl ${
                      selectedTab === index ? 'text-white' : 'text-white/90'
                    }`}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Keyboard Navigation Instructions */}
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm font-montserrat">
                  Use ← → arrow keys to navigate, Enter to select, or click with mouse
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
              <div className="text-white/90 text-lg font-montserrat">
                <p className="font-semibold mb-2">Contact Us</p>
                <p className="text-sm">📞 (555) 123-4567</p>
                <p className="text-sm mt-1">🕒 Open daily 11AM-10PM</p>
                <p className="text-sm mt-1">📍 123 Pizza Street, New York</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 