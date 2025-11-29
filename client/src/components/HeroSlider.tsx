import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import heroImage1 from '@assets/generated_images/Vet_examining_golden_retriever_19654044.png';
import heroImage2 from '@assets/generated_images/Vet_consultation_with_cat_owner_7978144f.png';
import heroImage3 from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';

const slides = [
  { image: heroImage1, alt: 'Veterinarian examining golden retriever' },
  { image: heroImage2, alt: 'Vet consultation with cat owner' },
  { image: heroImage3, alt: 'Modern veterinary equipment' },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(199,37%,24%)]/70 to-[hsl(199,37%,24%)]/40" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl font-medium mb-4" 
            data-testid="text-hero-headline"
          >
            {t('hero.headline')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl mb-3 opacity-90" 
            data-testid="text-hero-subheadline"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl mb-8 opacity-80" 
            data-testid="text-hero-subtext"
          >
            {t('hero.subheadline')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg transition-transform hover:scale-105"
              onClick={() => setLocation('/book-now')}
              data-testid="button-book-appointment"
            >
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3'
            }`}
            data-testid={`button-slide-indicator-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
