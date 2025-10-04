import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(199,37%,24%)]/70 to-[hsl(199,37%,24%)]/40" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl font-medium mb-4" data-testid="text-hero-headline">
            Dr. Paws Veterinary Clinic
          </h1>
          <p className="text-2xl md:text-3xl mb-3 opacity-90" data-testid="text-hero-subheadline">
            Compassionate Care for Your Beloved Pets
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-80" data-testid="text-hero-subtext">
            Providing the Highest Quality Veterinary Care
          </p>
          <Button
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={scrollToContact}
            data-testid="button-book-appointment"
          >
            Book your appointment today
          </Button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover-elevate active-elevate-2 text-white backdrop-blur-sm"
        data-testid="button-prev-slide"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover-elevate active-elevate-2 text-white backdrop-blur-sm"
        data-testid="button-next-slide"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            data-testid={`button-slide-indicator-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
