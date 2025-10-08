import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ServicePackagesSection from '@/components/ServicePackagesSection';
import MediaSection from '@/components/MediaSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
        <ServicePackagesSection />
      </div>
      <MediaSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <ContactSection />
      <HeartbeatDivider />
      <Footer />
    </div>
  );
}
