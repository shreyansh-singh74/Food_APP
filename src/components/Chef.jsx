import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Chef = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const chefRef = useRef(null);
  const ingredientsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate content
    tl.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Animate chef image
    tl.fromTo(chefRef.current,
      { x: -50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Animate ingredients with stagger
    tl.fromTo(ingredientsRef.current.children,
      { y: 20, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.5"
    );

    // Continuous floating animation for chef
    gsap.to(chefRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  const qualityFeatures = [
    { icon: "👨‍🍳", title: "Expert Chefs", desc: "Trained in authentic Italian techniques" },
    { icon: "🌾", title: "Fresh Ingredients", desc: "Sourced daily from local suppliers" },
    { icon: "🔥", title: "Wood-Fired Ovens", desc: "Traditional cooking methods" },
    { icon: "⭐", title: "Quality Assured", desc: "Every dish meets our high standards" }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-lobster text-pizza-green"
            >
              Meet Our Chef
            </h2>
            
            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
                Chef Marco Rossi brings over 20 years of culinary expertise to our kitchen. 
                Trained in the finest restaurants of Naples, he ensures every pizza is crafted 
                with passion and precision.
              </p>
              
              <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
                Our commitment to quality goes beyond ingredients. We use traditional wood-fired 
                ovens and time-honored techniques to create the authentic taste of Italy in every bite.
              </p>
            </div>

            {/* Quality Features */}
            <div ref={ingredientsRef} className="grid grid-cols-2 gap-4">
              {qualityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-center hover:bg-pizza-orange hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs opacity-75">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Visual Side */}
          <div className="relative">
            <div 
              ref={chefRef}
              className="relative z-10 w-80 h-80 mx-auto"
            >
              {/* Chef Image */}
              <div className="w-full h-full bg-gradient-to-br from-pizza-green to-green-700 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pizza-orange/20 to-pizza-yellow/20"></div>
                <span className="text-8xl relative z-10">👨‍🍳</span>
                
                {/* Floating ingredients around chef */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-pizza-orange rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-2xl">🍅</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-pizza-yellow rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <span className="text-xl">🧀</span>
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                  <span className="text-lg">🌿</span>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-pizza-green/10 to-pizza-orange/10 rounded-full blur-3xl"></div>
            
            {/* Floating pizza slices */}
            <div className="absolute top-10 left-0 w-20 h-20 opacity-60 animate-spin" style={{ animationDuration: '20s' }}>
              <span className="text-4xl">🍕</span>
            </div>
            <div className="absolute bottom-10 right-0 w-16 h-16 opacity-60 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <span className="text-3xl">🍕</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chef; 