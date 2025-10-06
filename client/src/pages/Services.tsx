import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Stethoscope,
  Scissors,
  Microscope,
  Syringe,
  Pill,
  Plane,
  Home,
  Heart,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import servicesHeroImage from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';

export default function Services() {
  const { t, language } = useLanguage();

  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: false, amount: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      id: 1,
      icon: Stethoscope,
      title: t('servicesPage.examinations.title'),
      description: t('servicesPage.examinations.description'),
      features: [
        t('servicesPage.examinations.canine'),
        t('servicesPage.examinations.feline'),
        t('servicesPage.examinations.avian'),
      ],
    },
    {
      id: 2,
      icon: Sparkles,
      title: t('servicesPage.grooming.title'),
      description: t('servicesPage.grooming.description'),
      features: [
        t('servicesPage.grooming.feature1'),
        t('servicesPage.grooming.feature2'),
        t('servicesPage.grooming.feature3'),
        t('servicesPage.grooming.feature4'),
      ],
    },
    {
      id: 3,
      icon: Microscope,
      title: t('servicesPage.diagnostics.title'),
      description: t('servicesPage.diagnostics.description'),
      features: [
        t('servicesPage.diagnostics.lab'),
        t('servicesPage.diagnostics.imaging'),
        t('servicesPage.diagnostics.advanced'),
      ],
    },
    {
      id: 4,
      icon: Scissors,
      title: t('servicesPage.surgery.title'),
      description: t('servicesPage.surgery.description'),
      features: [
        t('servicesPage.surgery.feature1'),
        t('servicesPage.surgery.feature2'),
        t('servicesPage.surgery.feature3'),
        t('servicesPage.surgery.feature4'),
        t('servicesPage.surgery.feature5'),
      ],
    },
    {
      id: 5,
      icon: Stethoscope,
      title: t('servicesPage.dental.title'),
      description: t('servicesPage.dental.description'),
      features: [
        t('servicesPage.dental.feature1'),
        t('servicesPage.dental.feature2'),
        t('servicesPage.dental.feature3'),
        t('servicesPage.dental.feature4'),
      ],
    },
    {
      id: 6,
      icon: Syringe,
      title: t('servicesPage.vaccination.title'),
      description: t('servicesPage.vaccination.description'),
      features: [
        t('servicesPage.vaccination.feature1'),
        t('servicesPage.vaccination.feature2'),
        t('servicesPage.vaccination.feature3'),
      ],
    },
    {
      id: 7,
      icon: Plane,
      title: t('servicesPage.travel.title'),
      description: t('servicesPage.travel.description'),
      features: [
        t('servicesPage.travel.feature1'),
        t('servicesPage.travel.feature2'),
        t('servicesPage.travel.feature3'),
      ],
    },
    {
      id: 8,
      icon: Home,
      title: t('servicesPage.boarding.title'),
      description: t('servicesPage.boarding.description'),
      features: [
        t('servicesPage.boarding.therapeutic'),
        t('servicesPage.boarding.fungi'),
      ],
    },
    {
      id: 9,
      icon: Heart,
      title: t('servicesPage.intensiveCare.title'),
      description: t('servicesPage.intensiveCare.description'),
      features: [
        t('servicesPage.intensiveCare.feature1'),
        t('servicesPage.intensiveCare.feature2'),
        t('servicesPage.intensiveCare.feature3'),
        t('servicesPage.intensiveCare.feature4'),
      ],
    },
    {
      id: 10,
      icon: AlertCircle,
      title: t('servicesPage.emergency.title'),
      description: t('servicesPage.emergency.description'),
      features: [
        t('servicesPage.emergency.feature1'),
        t('servicesPage.emergency.feature2'),
        t('servicesPage.emergency.feature3'),
        t('servicesPage.emergency.feature4'),
      ],
      emergency: true,
    },
    {
      id: 11,
      icon: Pill,
      title: t('servicesPage.homeCare.title'),
      description: t('servicesPage.homeCare.description'),
      features: [
        t('servicesPage.homeCare.feature1'),
        t('servicesPage.homeCare.feature2'),
        t('servicesPage.homeCare.feature3'),
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative z-10">
        <section
          ref={heroRef}
          className="relative h-[400px] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
            <img
              src={servicesHeroImage}
              alt="Veterinary Services"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`relative z-20 text-center px-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <h1
              className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
              data-testid="text-services-header"
            >
              {t('servicesPage.header')}
            </h1>
            <p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              data-testid="text-services-subheader"
            >
              {t('servicesPage.subheader')}
            </p>
          </motion.div>
        </section>

        <section ref={servicesRef} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={servicesInView ? 'visible' : 'hidden'}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.id} variants={itemVariants}>
                    <Card
                      className={`h-full hover-elevate ${
                        service.emergency ? 'border-[#e9c46a]' : ''
                      }`}
                      data-testid={`card-service-${service.id}`}
                    >
                      <CardHeader>
                        <div
                          className={`flex items-center gap-4 mb-2 ${
                            language === 'ar' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div className="p-3 rounded-lg bg-[#18ac61]/10">
                            <Icon
                              className="w-6 h-6 text-[#18ac61]"
                              data-testid={`icon-service-${service.id}`}
                            />
                          </div>
                        </div>
                        <CardTitle
                          className={`${language === 'ar' ? 'text-right' : 'text-left'}`}
                          data-testid={`title-service-${service.id}`}
                        >
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={`text-foreground/80 mb-4 ${
                            language === 'ar' ? 'text-right' : 'text-left'
                          }`}
                          data-testid={`description-service-${service.id}`}
                        >
                          {service.description}
                        </p>

                        <ul
                          className={`space-y-2 mb-6 ${
                            language === 'ar' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className={`text-sm text-foreground/70 flex items-start gap-2 ${
                                language === 'ar' ? 'flex-row-reverse' : ''
                              }`}
                              data-testid={`feature-service-${service.id}-${idx}`}
                            >
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full bg-[#18ac61] mt-2 flex-shrink-0 ${
                                  language === 'ar' ? 'mr-0 ml-2' : 'ml-0 mr-2'
                                }`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {service.emergency && (
                          <div
                            className={`mb-4 p-3 bg-[#e9c46a]/10 rounded-md ${
                              language === 'ar' ? 'text-right' : 'text-left'
                            }`}
                          >
                            <p className="text-sm font-semibold text-[#264653] mb-2">
                              {t('servicesPage.emergency.numbers')}
                            </p>
                            <p className="text-sm text-foreground/80">
                              {t('servicesPage.emergency.sahafa')}
                            </p>
                            <p className="text-sm text-foreground/80">
                              {t('servicesPage.emergency.mather')}
                            </p>
                          </div>
                        )}

                        <Link href="/#contact">
                          <Button
                            className="w-full"
                            data-testid={`button-book-${service.id}`}
                          >
                            {t('servicesPage.bookAppointment')}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
