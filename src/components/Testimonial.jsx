import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      avatar: "👩‍💼",
      rating: 5,
      text: "The Margherita pizza here is absolutely divine! The crust is perfectly crispy and the mozzarella is so fresh. I've been coming here for months and it never disappoints.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Regular Customer",
      avatar: "👨‍💻",
      rating: 5,
      text: "Best pizza in town! The family pack is perfect for our weekly dinners. The staff is friendly and the delivery is always on time. Highly recommend!",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Local Foodie",
      avatar: "👩‍🍳",
      rating: 5,
      text: "I love their veggie options! The fresh ingredients really make a difference. The smoothies are also amazing - perfect pairing with any pizza.",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Business Owner",
      avatar: "👨‍💼",
      rating: 5,
      text: "We order from here for all our office lunches. The combo deals are great value and everyone loves the variety. Fast service and delicious food!",
      date: "5 days ago"
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
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate slider
    tl.fromTo(sliderRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animate slide change
  useEffect(() => {
    const slides = sliderRef.current?.children;
    if (slides) {
      gsap.to(slides, {
        x: `-${currentSlide * 100}%`,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-lobster text-pizza-green mb-4"
          >
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Slider */}
        <div ref={sliderRef} className="relative overflow-hidden">
          <div className="flex transition-transform duration-800 ease-out">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-pizza-yellow text-2xl">⭐</span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg text-gray-700 font-montserrat italic text-center mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pizza-orange to-pizza-red rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-pizza-green">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <p className="text-xs text-gray-400">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-pizza-orange scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-pizza-orange mb-2">500+</div>
            <div className="text-gray-600 font-montserrat">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pizza-orange mb-2">4.9</div>
            <div className="text-gray-600 font-montserrat">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pizza-orange mb-2">50+</div>
            <div className="text-gray-600 font-montserrat">Pizza Varieties</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 