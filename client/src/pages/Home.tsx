import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ECGAnimation from '@/components/ECGAnimation';
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
import PromotionalModal from '@/components/PromotionalModal';

export default function Home() {
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenPromoModal');
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePromo = () => {
    setShowPromoModal(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <ECGAnimation />
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
      
      <PromotionalModal open={showPromoModal} onClose={handleClosePromo} />
    </div>
  );
}
