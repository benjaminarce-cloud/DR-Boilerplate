import About from '@/components/sections/About';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Booking from '@/components/sections/Booking';
import CertificationsBar from '@/components/sections/CertificationsBar';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Procedures from '@/components/sections/Procedures';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';
import Footer from '@/components/ui/Footer';
import NavBar from '@/components/ui/NavBar';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <CertificationsBar />
        <About />
        <Procedures />
        <WhyUs />
        <Testimonials />
        <BeforeAfter />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
