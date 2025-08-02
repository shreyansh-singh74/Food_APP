import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const ingredientsRef = useRef(null);
  const floatingPizzaRef = useRef(null);

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

    // Animate ingredients with stagger
    tl.fromTo(ingredientsRef.current.children,
      { y: 20, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );

    // Floating pizza animation
    gsap.to(floatingPizzaRef.current, {
      y: -15,
      rotation: 8,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  const ingredients = [
    { icon: "🍅", name: "Fresh Tomatoes", desc: "Hand-picked from local farms" },
    { icon: "🧀", name: "Premium Mozzarella", desc: "Aged to perfection" },
    { icon: "🌿", name: "Fresh Basil", desc: "Grown in our garden" },
    { icon: "🫓", name: "Artisan Dough", desc: "Made fresh daily" }
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
              Who We Are
            </h2>
            
            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
                Founded in 2010, we've been crafting the perfect pizza experience for over a decade. 
                Our journey began with a simple mission: to serve authentic Italian flavors with a modern twist.
              </p>
              
              <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
                Every pizza is handcrafted by our expert chefs using traditional techniques passed down 
                through generations. We source only the finest ingredients, ensuring every bite is a 
                celebration of flavor and quality.
              </p>
            </div>

            {/* Ingredients Grid */}
            <div ref={ingredientsRef} className="grid grid-cols-2 gap-4 mt-8">
              {ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-center hover:bg-pizza-orange hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-2">{ingredient.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{ingredient.name}</h4>
                  <p className="text-xs opacity-75">{ingredient.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div 
              ref={floatingPizzaRef}
              className="relative z-10 w-80 h-80 mx-auto"
            >
              <div className="w-full h-full bg-gradient-to-br from-pizza-orange to-pizza-red rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-8xl">🍕</span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-pizza-yellow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧀</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🌿</span>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-pizza-green/10 to-pizza-orange/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 