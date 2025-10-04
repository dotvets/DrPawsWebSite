import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ServicePackagesSection from '@/components/ServicePackagesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <ServicePackagesSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
