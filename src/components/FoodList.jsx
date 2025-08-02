import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FoodItemCard = ({ item }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Create new animation
    animationRef.current = gsap.to(imgRef.current, { 
      opacity: 1, 
      x: 0, 
      scale: 1.1,
      duration: 0.3, 
      ease: 'power3.out' 
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Create new animation
    animationRef.current = gsap.to(imgRef.current, { 
      opacity: 0, 
      x: -30, 
      scale: 0.9,
      duration: 0.2, 
      ease: 'power3.in' 
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Text Content */}
      <div className="pr-24">
        <h3 className="text-lg font-semibold text-pizza-green mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Hidden Image Element */}
      <div
        ref={imgRef}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-20 h-20 rounded-xl overflow-hidden shadow-lg"
        style={{
          opacity: 0,
          transform: 'translateX(-30px) translateY(-50%) scale(0.9)',
          pointerEvents: 'none' // Prevent image from interfering with hover
        }}
      >
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback emoji if image fails to load */}
        <div className="w-full h-full bg-gradient-to-br from-pizza-orange to-pizza-red flex items-center justify-center" style={{ display: 'none' }}>
          <span className="text-3xl">{item.fallbackEmoji}</span>
        </div>
      </div>
    </div>
  );
};

const FoodList = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  const foodItems = [
    {
      id: 1,
      name: "Idli",
      description: "Soft, fluffy steamed rice cakes served with coconut chutney and sambar. A perfect South Indian breakfast.",
      imageUrl: "https://www.indianveggiedelight.com/wp-content/uploads/2017/08/rice-kheer-instant-pot-featured-image.jpg",
      fallbackEmoji: "🍚"
    },
    {
      id: 2,
      name: "Dosa",
      description: "Crispy, golden crepes made from fermented rice and lentil batter. Stuffed with spiced potato filling.",
      imageUrl: "https://www.indianveggiedelight.com/wp-content/uploads/2017/08/rice-kheer-instant-pot-featured-image.jpg",
      fallbackEmoji: "🥘"
    },
    {
      id: 3,
      name: "Puri Sabzi",
      description: "Deep-fried puffy bread served with spicy potato curry. A hearty North Indian breakfast.",
      imageUrl: "https://www.indianveggiedelight.com/wp-content/uploads/2017/08/rice-kheer-instant-pot-featured-image.jpg",
      fallbackEmoji: "🥟"
    },
    {
      id: 4,
      name: "Kheer",
      description: "Creamy rice pudding made with milk, sugar, and aromatic spices. Garnished with nuts and saffron.",
      imageUrl: "https://www.indianveggiedelight.com/wp-content/uploads/2017/08/rice-kheer-instant-pot-featured-image.jpg",
      fallbackEmoji: "🍮"
    }
  ];

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
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // Animate list items with stagger
    tl.fromTo(listRef.current.children,
      { y: 20, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.08,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-lobster text-pizza-green mb-2"
          >
            Traditional Indian Delights
          </h2>
          <p className="text-base text-gray-600 font-montserrat max-w-2xl mx-auto">
            Discover authentic Indian flavors alongside our signature pizzas
          </p>
        </div>

        {/* Compact Food List */}
        <div ref={listRef} className="max-w-3xl mx-auto space-y-2">
          {foodItems.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-12 h-12 opacity-20 animate-spin" style={{ animationDuration: '20s' }}>
          <span className="text-2xl">🍕</span>
        </div>
        <div className="absolute bottom-10 right-10 w-10 h-10 opacity-20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <span className="text-xl">🧃</span>
        </div>
      </div>
    </section>
  );
};

export default FoodList; 