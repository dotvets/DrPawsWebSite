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
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import servicesHeroImage from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';
import teamImage from '@assets/generated_images/Veterinary_team_professional_photo_a4845f6b.png';
import vetExamImage from '@assets/generated_images/Vet_examining_golden_retriever_19654044.png';
import consultationImage from '@assets/generated_images/Vet_consultation_with_cat_owner_7978144f.png';

export default function Services() {
  const { t, language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const heroRef = useRef(null);
  const servicesRef1 = useRef(null);
  const imageRef1 = useRef(null);
  const servicesRef2 = useRef(null);
  const imageRef2 = useRef(null);
  const servicesRef3 = useRef(null);
  const homeCareRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const servicesInView1 = useInView(servicesRef1, { once: false, amount: 0.2 });
  const imageInView1 = useInView(imageRef1, { once: false, amount: 0.3 });
  const servicesInView2 = useInView(servicesRef2, { once: false, amount: 0.2 });
  const imageInView2 = useInView(imageRef2, { once: false, amount: 0.3 });
  const servicesInView3 = useInView(servicesRef3, { once: false, amount: 0.2 });
  const homeCareInView = useInView(homeCareRef, { once: false, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const services = [
    {
      id: 1,
      icon: Stethoscope,
      title: t('servicesPage.examinations.title'),
      description: t('servicesPage.examinations.description'),
      subsections: [
        {
          title: t('servicesPage.examinations.canineTitle'),
          intro: t('servicesPage.examinations.canineIntro'),
          content: t('servicesPage.examinations.canine'),
        },
        {
          title: t('servicesPage.examinations.felineTitle'),
          intro: t('servicesPage.examinations.felineIntro'),
          content: t('servicesPage.examinations.feline'),
        },
        {
          title: t('servicesPage.examinations.avianTitle'),
          intro: t('servicesPage.examinations.avianIntro'),
          content: t('servicesPage.examinations.avian'),
        },
      ],
      closing: t('servicesPage.examinations.closing'),
    },
    {
      id: 2,
      icon: Sparkles,
      title: t('servicesPage.grooming.title'),
      description: t('servicesPage.grooming.description'),
      subsections: [
        {
          title: t('servicesPage.grooming.nailTrimmingTitle'),
          content: t('servicesPage.grooming.nailTrimming'),
        },
        {
          title: t('servicesPage.grooming.earCleaningTitle'),
          content: t('servicesPage.grooming.earCleaning'),
        },
        {
          title: t('servicesPage.grooming.bathingTitle'),
          content: t('servicesPage.grooming.bathing'),
        },
        {
          title: t('servicesPage.grooming.groomingTitle'),
          content: t('servicesPage.grooming.grooming'),
        },
      ],
    },
    {
      id: 3,
      icon: Microscope,
      title: t('servicesPage.diagnostics.title'),
      description: t('servicesPage.diagnostics.description'),
      subsections: [
        {
          title: t('servicesPage.diagnostics.labTitle'),
          content: t('servicesPage.diagnostics.lab'),
        },
        {
          title: t('servicesPage.diagnostics.imagingTitle'),
          content: t('servicesPage.diagnostics.imaging'),
        },
        {
          title: t('servicesPage.diagnostics.advancedTitle'),
          content: t('servicesPage.diagnostics.advanced'),
        },
      ],
      closing: t('servicesPage.diagnostics.closing'),
    },
    {
      id: 4,
      icon: Scissors,
      title: t('servicesPage.surgery.title'),
      description: t('servicesPage.surgery.description'),
      subsections: [
        {
          title: t('servicesPage.surgery.sterilizationTitle'),
          content: t('servicesPage.surgery.sterilization'),
        },
        {
          title: t('servicesPage.surgery.orthopedicTitle'),
          content: t('servicesPage.surgery.orthopedic'),
        },
        {
          title: t('servicesPage.surgery.digestiveTitle'),
          content: t('servicesPage.surgery.digestive'),
        },
        {
          title: t('servicesPage.surgery.rhinoplastyTitle'),
          content: t('servicesPage.surgery.rhinoplasty'),
        },
        {
          title: t('servicesPage.surgery.urinaryTitle'),
          content: t('servicesPage.surgery.urinary'),
        },
      ],
      closing: t('servicesPage.surgery.closing'),
    },
    {
      id: 5,
      icon: Stethoscope,
      title: t('servicesPage.dental.title'),
      description: t('servicesPage.dental.description'),
      subsections: [
        {
          title: t('servicesPage.dental.cleaningTitle'),
          content: t('servicesPage.dental.cleaning'),
        },
        {
          title: t('servicesPage.dental.examinationsTitle'),
          content: t('servicesPage.dental.examinations'),
        },
        {
          title: t('servicesPage.dental.scalingTitle'),
          content: t('servicesPage.dental.scaling'),
        },
        {
          title: t('servicesPage.dental.extractionTitle'),
          content: t('servicesPage.dental.extraction'),
        },
        {
          title: t('servicesPage.dental.surgeryTitle'),
          content: t('servicesPage.dental.surgery'),
        },
      ],
      closing: t('servicesPage.dental.closing'),
    },
    {
      id: 6,
      icon: Syringe,
      title: t('servicesPage.vaccination.title'),
      description: t('servicesPage.vaccination.description'),
      subsections: [
        {
          title: t('servicesPage.vaccination.catTripleTitle'),
          intro: t('servicesPage.vaccination.catTripleDesc'),
          content: t('servicesPage.vaccination.catTriple'),
          extra: t('servicesPage.vaccination.catQuad'),
        },
        {
          title: t('servicesPage.vaccination.catBenefitsTitle'),
          content: t('servicesPage.vaccination.catBenefits'),
        },
        {
          title: t('servicesPage.vaccination.dogPentaTitle'),
          intro: t('servicesPage.vaccination.dogPentaDesc'),
          content: t('servicesPage.vaccination.dogPenta'),
        },
        {
          title: t('servicesPage.vaccination.dogBenefitsTitle'),
          content: t('servicesPage.vaccination.dogBenefits'),
        },
        {
          title: t('servicesPage.vaccination.rabiesTitle'),
          content: t('servicesPage.vaccination.rabies'),
        },
        {
          title: t('servicesPage.vaccination.dewormTitle'),
          content: t('servicesPage.vaccination.deworm'),
        },
      ],
    },
    {
      id: 7,
      icon: Plane,
      title: t('servicesPage.travel.title'),
      description: t('servicesPage.travel.description'),
      subsections: [
        {
          title: t('servicesPage.travel.certificatesTitle'),
          content: t('servicesPage.travel.certificates'),
        },
        {
          title: t('servicesPage.travel.rabiesTitle'),
          content: t('servicesPage.travel.rabies'),
        },
        {
          title: t('servicesPage.travel.formsTitle'),
          content: t('servicesPage.travel.forms'),
        },
      ],
      closing: t('servicesPage.travel.closing'),
    },
    {
      id: 8,
      icon: Home,
      title: t('servicesPage.boarding.title'),
      description: t('servicesPage.boarding.description'),
      subsections: [
        {
          title: t('servicesPage.boarding.therapeuticTitle'),
          intro: t('servicesPage.boarding.therapeuticDesc'),
          content: t('servicesPage.boarding.therapeutic'),
        },
      ],
    },
    {
      id: 9,
      icon: Heart,
      title: t('servicesPage.intensiveCare.title'),
      description: t('servicesPage.intensiveCare.description'),
      features: [
        t('servicesPage.intensiveCare.organ'),
        t('servicesPage.intensiveCare.metabolic'),
        t('servicesPage.intensiveCare.trauma'),
        t('servicesPage.intensiveCare.postSurgical'),
      ],
    },
    {
      id: 10,
      icon: AlertCircle,
      title: t('servicesPage.emergency.title'),
      description: t('servicesPage.emergency.description'),
      features: [
        t('servicesPage.emergency.trauma'),
        t('servicesPage.emergency.breathing'),
        t('servicesPage.emergency.bleeding'),
        t('servicesPage.emergency.seizures'),
      ],
      emergency: true,
      emergencyNumbers: [
        {
          label: t('servicesPage.emergency.numbers'),
        },
        {
          label: t('servicesPage.emergency.sahafa'),
        },
        {
          label: t('servicesPage.emergency.mather'),
        },
      ],
    },
    {
      id: 11,
      icon: Pill,
      title: t('servicesPage.homeCare.title'),
      description: t('servicesPage.homeCare.description'),
      features: [
        t('servicesPage.homeCare.wellness'),
        t('servicesPage.homeCare.vaccinations'),
        t('servicesPage.homeCare.sample'),
      ],
    },
  ];

  const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    const Icon = service.icon;
    const isExpanded = expandedCards[service.id];
    
    const lordIconConfig: Record<number, string> = {
      1: 'https://cdn.lordicon.com/fdjmqgqo.json', // Examinations
      2: 'https://cdn.lordicon.com/qrbnmuva.json', // Grooming
      3: 'https://cdn.lordicon.com/xtqxtpiq.json', // Diagnostics
      4: 'https://cdn.lordicon.com/ebchswfj.json', // Surgery
      5: 'https://cdn.lordicon.com/qgvewybt.json', // Dental
      6: 'https://cdn.lordicon.com/ssjzuqhe.json', // Vaccination
      7: 'https://cdn.lordicon.com/xvidkckm.json', // Travel
      8: 'https://cdn.lordicon.com/nejoxqhx.json', // Boarding
      9: 'https://cdn.lordicon.com/rqeluyar.json', // Intensive Care
      10: 'https://cdn.lordicon.com/njkwpvad.json', // Emergency
      11: 'https://cdn.lordicon.com/npehekun.json', // Home Care
    };
    
    const hasLordIcon = lordIconConfig[service.id];
    const hasSubsections = 'subsections' in service && service.subsections;
    const hasFeatures = 'features' in service && service.features;
    
    // Services that should always be expanded: Surgery (4), Dental (5), Vaccination (6), Intensive Care (9), Emergency (10)
    const alwaysExpandedServices = [4, 5, 6, 9, 10];
    const shouldAlwaysExpand = alwaysExpandedServices.includes(service.id);
    const hasLongContent = !shouldAlwaysExpand && (
      service.description.length > 150 || 
      (hasSubsections && service.subsections!.length > 2) ||
      (hasFeatures && service.features!.length > 3)
    );

    // Helper function to split bullet points
    const splitBulletPoints = (text: string) => {
      return text.split('•').map(item => item.trim()).filter(item => item);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          className={`flex flex-col hover-elevate h-[520px] ${
            service.emergency ? 'border-[#e9c46a]' : ''
          }`}
          data-testid={`card-service-${service.id}`}
        >
          <CardHeader className="pb-3">
            <CardTitle
              className={`text-[#18ac61] ${
                hasLordIcon ? 'flex items-center gap-3' : ''
              } ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}
              data-testid={`title-service-${service.id}`}
            >
              {hasLordIcon && (
                <lord-icon
                  src={lordIconConfig[service.id]}
                  trigger="loop"
                  delay="1500"
                  style={{ width: '50px', height: '50px' }}
                />
              )}
              <span className={language === 'ar' ? 'text-right' : 'text-left'}>{service.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 overflow-hidden">
            <div className={`flex-1 overflow-y-auto ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <p
                className={`text-foreground/80 mb-3 text-sm ${
                  !isExpanded && hasLongContent ? 'line-clamp-2' : ''
                }`}
                data-testid={`description-service-${service.id}`}
              >
                {service.description}
              </p>

              {hasSubsections && (
                <div className="space-y-3 mb-3">
                  {(isExpanded || shouldAlwaysExpand ? service.subsections! : service.subsections!.slice(0, 1)).map((subsection: any, idx: number) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-[#18ac61]">
                        {subsection.title}
                      </h4>
                      {subsection.intro && (
                        <p className="text-xs text-foreground/70">
                          {subsection.intro}
                        </p>
                      )}
                      {subsection.content && (
                        <ul className="space-y-1">
                          {splitBulletPoints(subsection.content).slice(0, isExpanded || shouldAlwaysExpand ? undefined : 2).map((point: string, pointIdx: number) => (
                            <li
                              key={pointIdx}
                              className={`text-xs text-foreground/70 flex items-start gap-1.5 ${
                                language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'
                              }`}
                            >
                              <span
                                className={`inline-block w-1 h-1 rounded-full bg-[#18ac61] mt-1.5 flex-shrink-0`}
                              />
                              <span className={language === 'ar' ? 'text-right' : 'text-left'}>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {subsection.extra && (
                        <p className="text-xs text-foreground/70 italic mt-1.5">
                          {subsection.extra}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {hasFeatures && (
                <ul className="space-y-1.5 mb-3">
                  {(isExpanded || shouldAlwaysExpand ? service.features! : service.features!.slice(0, 3)).map((feature, idx) => (
                    <li
                      key={idx}
                      className={`text-xs text-foreground/70 flex items-start gap-1.5 ${
                        language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'
                      }`}
                      data-testid={`feature-service-${service.id}-${idx}`}
                    >
                      <span className={`inline-block w-1 h-1 rounded-full bg-[#18ac61] mt-1.5 flex-shrink-0`} />
                      <span className={language === 'ar' ? 'text-right' : 'text-left'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {'closing' in service && service.closing && (isExpanded || shouldAlwaysExpand) && (
                <p className="text-xs text-foreground/70 mb-3">
                  {service.closing}
                </p>
              )}

              {service.emergency && 'emergencyNumbers' in service && (
                <div className="mb-3 p-2 bg-[#e9c46a]/10 rounded-md">
                  {service.emergencyNumbers!.map((item: any, idx: number) => (
                    <p key={idx} className={`text-xs ${idx === 0 ? 'font-semibold text-[#264653] mb-1' : 'text-foreground/80'}`}>
                      {item.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {hasLongContent && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(service.id)}
                className={`mb-2 mt-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                data-testid={`button-expand-${service.id}`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className={`w-4 h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                    {language === 'ar' ? 'عرض أقل' : 'Show less'}
                  </>
                ) : (
                  <>
                    <ChevronDown className={`w-4 h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                    {language === 'ar' ? 'عرض المزيد' : 'Read more'}
                  </>
                )}
              </Button>
            )}

            <Link href="/#contact">
              <Button
                className="w-full mt-auto"
                size="sm"
                data-testid={`button-book-${service.id}`}
              >
                {t('servicesPage.bookAppointment')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

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
            className="relative z-20 text-center px-6"
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

        <section ref={servicesRef1} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        <motion.section
          ref={imageRef1}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={imageInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={vetExamImage}
                  alt="Veterinary examination"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-services-1"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={imageInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className={`space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <h2 className="text-3xl font-bold text-primary">
                  {language === 'ar' ? 'رعاية شاملة ومتخصصة' : 'Comprehensive & Specialized Care'}
                </h2>
                <p className="text-lg text-foreground/90">
                  {language === 'ar' 
                    ? 'في عيادات د. باوز، نقدم مجموعة واسعة من الخدمات البيطرية المتخصصة باستخدام أحدث المعدات والتقنيات لضمان صحة وسعادة حيوانك الأليف.'
                    : 'At Dr. Paws, we offer a wide range of specialized veterinary services using the latest equipment and technology to ensure your pet\'s health and happiness.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section ref={servicesRef2} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(3, 7).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        <motion.section
          ref={imageRef2}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={imageInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="md:order-2"
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={consultationImage}
                  alt="Veterinary consultation"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-services-2"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={imageInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className={`space-y-6 md:order-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <h2 className="text-3xl font-bold text-primary">
                  {language === 'ar' ? 'فريق محترف ومتفاني' : 'Professional & Dedicated Team'}
                </h2>
                <p className="text-lg text-foreground/90">
                  {language === 'ar' 
                    ? 'فريقنا من الأطباء البيطريين ذوي الخبرة ملتزم بتقديم أفضل رعاية ممكنة لحيواناتكم الأليفة مع الاهتمام بكل التفاصيل.'
                    : 'Our team of experienced veterinarians is committed to providing the best possible care for your pets with attention to every detail.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section ref={servicesRef3} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(7, 10).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        <motion.section
          ref={homeCareRef}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={homeCareInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={teamImage}
                  alt="Home Care Services"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-home-care-1"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={homeCareInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <ServiceCard service={services[10]} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={homeCareInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={vetExamImage}
                  alt="Home Care Services"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-home-care-2"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
