import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-pizza-orange to-pizza-red flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.icon}
        </span>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-pizza-red text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-pizza-green mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount ? (
              <>
                <span className="text-2xl font-bold text-pizza-orange">
                  ${product.discountedPrice}
                </span>
                <span className="text-gray-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-pizza-orange">
                ${product.price}
              </span>
            )}
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-pizza-green hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('pizza');

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

    // Animate categories
    tl.fromTo(categoriesRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

  }, []);

  const categories = [
    { id: 'pizza', name: 'Pizzas', icon: '🍕' },
    { id: 'drinks', name: 'Beverages', icon: '🧃' },
    { id: 'combos', name: 'Combos', icon: '🍽️' }
  ];

  const products = {
    pizza: [
      {
        id: 1,
        name: "Margherita Classic",
        description: "Fresh mozzarella, tomato sauce, and basil on our signature crust",
        price: 18.99,
        discountedPrice: 15.99,
        discount: 15,
        icon: "🍕"
      },
      {
        id: 2,
        name: "Pepperoni Supreme",
        description: "Spicy pepperoni with melted cheese and our special sauce",
        price: 22.99,
        discountedPrice: 19.99,
        discount: 13,
        icon: "🍕"
      },
      {
        id: 3,
        name: "Veggie Delight",
        description: "Fresh vegetables, mushrooms, and olives on whole wheat crust",
        price: 20.99,
        icon: "🍕"
      },
      {
        id: 4,
        name: "BBQ Chicken",
        description: "Grilled chicken with BBQ sauce, red onions, and cilantro",
        price: 24.99,
        icon: "🍕"
      }
    ],
    drinks: [
      {
        id: 5,
        name: "Fresh Lemonade",
        description: "Hand-squeezed lemons with a hint of mint",
        price: 4.99,
        icon: "🧃"
      },
      {
        id: 6,
        name: "Berry Smoothie",
        description: "Mixed berries with yogurt and honey",
        price: 6.99,
        discountedPrice: 5.99,
        discount: 14,
        icon: "🧃"
      },
      {
        id: 7,
        name: "Iced Coffee",
        description: "Cold brew with cream and vanilla",
        price: 5.99,
        icon: "🧃"
      },
      {
        id: 8,
        name: "Sparkling Water",
        description: "Natural spring water with lemon or lime",
        price: 3.99,
        icon: "🧃"
      }
    ],
    combos: [
      {
        id: 9,
        name: "Pizza + Drink",
        description: "Any medium pizza with your choice of beverage",
        price: 24.99,
        discountedPrice: 21.99,
        discount: 12,
        icon: "🍽️"
      },
      {
        id: 10,
        name: "Family Pack",
        description: "2 large pizzas, 2 sides, and 4 drinks",
        price: 49.99,
        discountedPrice: 44.99,
        discount: 10,
        icon: "🍽️"
      },
      {
        id: 11,
        name: "Lunch Special",
        description: "Personal pizza with salad and drink",
        price: 14.99,
        icon: "🍽️"
      },
      {
        id: 12,
        name: "Party Pack",
        description: "3 large pizzas, 3 sides, and 6 drinks",
        price: 69.99,
        discountedPrice: 59.99,
        discount: 14,
        icon: "🍽️"
      }
    ]
  };

  const handleAddToCart = (product) => {
    // Add to cart functionality
    console.log('Added to cart:', product);
    // You can implement cart state management here
  };

  return (
    <section ref={sectionRef} id="menu" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-lobster text-pizza-green mb-4"
          >
            Our Menu
          </h2>
          <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
            Discover our handcrafted pizzas, refreshing beverages, and amazing combo deals
          </p>
        </div>

        {/* Category Tabs */}
        <div ref={categoriesRef} className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-pizza-orange text-white shadow-lg'
                    : 'text-gray-600 hover:text-pizza-orange'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products[activeCategory].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu; 