import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const pizza1Ref = useRef(null);
  const pizza2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate headline text with staggered reveal
    tl.fromTo(headlineRef.current, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Animate CTA button
    tl.fromTo(ctaRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Floating pizza animations
    gsap.to(pizza1Ref.current, {
      y: -20,
      rotation: 5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    gsap.to(pizza2Ref.current, {
      y: 15,
      rotation: -3,
      duration: 2.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    // Parallax effect on scroll
    gsap.to([pizza1Ref.current, pizza2Ref.current], {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-pizza-green flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pizza-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pizza-yellow rounded-full blur-3xl"></div>
      </div>

      {/* Floating Pizza Images */}
      <div 
        ref={pizza1Ref}
        className="absolute top-20 left-10 w-32 h-32 md:w-40 md:h-40 opacity-80"
      >
        <div className="w-full h-full bg-pizza-orange rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-4xl md:text-6xl">🍕</span>
        </div>
      </div>

      <div 
        ref={pizza2Ref}
        className="absolute bottom-20 right-10 w-28 h-28 md:w-36 md:h-36 opacity-80"
      >
        <div className="w-full h-full bg-pizza-yellow rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-3xl md:text-5xl">🧃</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-lobster text-white mb-6 leading-tight"
          >
            <span className="text-pizza-orange">Delicious</span> Pizza & 
            <br />
            <span className="text-pizza-yellow">Refreshing</span> Beverages
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-montserrat">
            Experience the perfect blend of authentic Italian flavors and handcrafted beverages. 
            Every bite tells a story of passion and tradition.
          </p>

          <button 
            ref={ctaRef}
            className="btn-primary text-lg md:text-xl"
            onClick={() => {
              // Smooth scroll to menu section
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Order Now 🚀
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 