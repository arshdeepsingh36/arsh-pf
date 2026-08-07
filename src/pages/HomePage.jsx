import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Works from '../components/Works';
import About from '../components/About';
import ClientsMarquee from '../components/ClientsMarquee';
import Services from '../components/Services';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Clients from '../components/Clients';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="bg-background min-h-screen text-text">
      <Navigation />
      <Hero />
      <Works />
      <About />
      <ClientsMarquee />
      <Services />
      <Process />
      <Testimonials />
      <Clients />
      <Contact />
      <Blog />
      <Footer />
    </div>
  );
}

export default HomePage;
