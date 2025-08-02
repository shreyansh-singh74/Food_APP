import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Reserve = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

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

    // Animate form
    tl.fromTo(formRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Animate image
    tl.fromTo(imageRef.current,
      { x: 50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.6"
    );

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Reservation submitted:', formData);
    alert('Reservation submitted successfully! We\'ll contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    });
  };

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-lobster text-pizza-green mb-4"
          >
            Reserve Your Table
          </h2>
          <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
            Book your table and experience the perfect dining atmosphere
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form Side */}
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pizza-green mb-2">
                    Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select time</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pizza-green mb-2">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-orange focus:border-transparent transition-all duration-300"
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Reserve Table 🍽️
              </button>
            </form>
          </div>

          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-pizza-orange to-pizza-red rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pizza-green/20 to-pizza-yellow/20"></div>
              
              {/* Restaurant scene */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🍽️</div>
                  <h3 className="text-2xl font-lobster mb-2">Perfect Dining Experience</h3>
                  <p className="text-lg opacity-90">Cozy atmosphere, great food</p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">🍕</span>
              </div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <span className="text-xl">🧃</span>
              </div>
              <div className="absolute top-1/2 left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                <span className="text-lg">🍷</span>
              </div>
            </div>

            {/* Contact info overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">📞</div>
                <p className="text-sm font-semibold text-pizza-green">Call Us</p>
                <p className="text-xs text-gray-600">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve; 