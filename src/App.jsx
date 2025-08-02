import Hero from './components/Hero'
import About from './components/About'
import FoodList from './components/FoodList'
import Menu from './components/Menu'
import Chef from './components/Chef'
import Testimonial from './components/Testimonial'
import Reserve from './components/Reserve'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="food">
        <FoodList />
      </section>
      <section id="menu">
        <Menu />
      </section>
      <section id="chef">
        <Chef />
      </section>
      <section id="testimonials">
        <Testimonial />
      </section>
      <section id="reserve">
        <Reserve />
      </section>
      <Footer />
    </div>
  )
}

export default App
