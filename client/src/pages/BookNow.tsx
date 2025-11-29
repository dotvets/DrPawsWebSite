import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useEffect, useState } from 'react';
import Header from '@/components/Header';
import ECGAnimation from '@/components/ECGAnimation';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';
import { MapPin, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import vetExamImage from '@assets/generated_images/Vet_examining_golden_retriever_19654044.png';
import vetConsultationImage from '@assets/generated_images/Vet_consultation_with_cat_owner_7978144f.png';
import vetEquipmentImage from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';

export default function BookNow() {
  const { t, language } = useLanguage();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const remainingAfterMonths = distance % (1000 * 60 * 60 * 24 * 30);
      const weeks = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24 * 7));
      const remainingAfterWeeks = remainingAfterMonths % (1000 * 60 * 60 * 24 * 7);
      const days = Math.floor(remainingAfterWeeks / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingAfterWeeks % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingAfterWeeks % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingAfterWeeks % (1000 * 60)) / 1000);

      setCountdown({ months, weeks, days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert English numerals to Arabic-Indic numerals
  const toArabicNumerals = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
  };

  // Format number based on language
  const formatNumber = (num: number): string => {
    return language === 'ar' ? toArabicNumerals(num) : num.toString();
  };

  const riyadhBranches = [
    {
      id: 'sahafa',
      name: t('bookNow.sahafahBranch'),
      whatsapp: t('bookNow.sahafahWhatsApp'),
      phone: t('bookNow.sahafahPhone'),
      bookingUrl: `https://vet.digitail.io/clinics/dr-paws-sahafa-tel-920003045?lang=${language}`,
    },
    {
      id: 'mather',
      name: t('bookNow.matherBranch'),
      whatsapp: t('bookNow.matherWhatsApp'),
      phone: t('bookNow.matherPhone'),
      bookingUrl: `https://vet.digitail.io/clinics/dr-paws-mathar-phone-920003045?lang=${language}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <ECGAnimation />

      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-32 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${vetExamImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="text-booknow-title">
              {t('bookNow.title')}
            </h1>
            <p className="text-xl text-foreground/80 mb-8" data-testid="text-booknow-welcome">
              {t('bookNow.welcome')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Booking & Contact Section */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-primary text-center mb-8" data-testid="text-quick-booking-title">
              {t('bookNow.bookingMethods')}
            </h2>
            
            <div className={`${language === 'ar' ? 'flex justify-start' : ''}`}>
              <h3 className={`text-2xl font-semibold text-primary mb-6 flex items-center gap-2 ${language === 'ar' ? 'text-right' : ''}`} data-testid="text-riyadh-branches">
                <lord-icon
                  src="https://cdn.lordicon.com/dfwzmvnc.json"
                  trigger="loop"
                  delay="1500"
                  colors="primary:#18ac61,secondary:#264653"
                  style={{ width: '90px', height: '90px' }}
                />
                {t('bookNow.riyadhBranches')}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* WhatsApp Quick Access */}
              <Card className="text-center hover-elevate" data-testid="card-quick-whatsapp">
                <CardContent className="p-6">
                  <SiWhatsapp className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-4" data-testid="text-quick-whatsapp-title">{t('bookNow.whatsappBooking')}</h3>
                  <div className="space-y-3 flex flex-col items-center">
                    {riyadhBranches.map((branch) => (
                      <div key={`quick-wa-${branch.id}`} className="flex items-center gap-2">
                        <a
                          href={branch.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground/70 hover:text-primary hover:underline transition-colors"
                          data-testid={`link-branch-${branch.id}`}
                        >
                          {branch.name}
                        </a>
                        <a
                          href={`https://wa.me/966${branch.whatsapp.replace(/^0/, '').replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover-elevate rounded-lg"
                          data-testid={`link-quick-whatsapp-${branch.id}`}
                        >
                          <SiWhatsapp className="w-5 h-5 text-primary" />
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Phone Quick Access */}
              <Card className="text-center hover-elevate" data-testid="card-quick-phone">
                <CardContent className="p-6 flex flex-col items-center">
                  <Phone className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-4" data-testid="text-quick-phone-title">
                    {t('bookNow.phoneBooking')}
                  </h3>
                  <div className="space-y-2 text-sm flex flex-col items-center">
                    {riyadhBranches.map((branch) => (
                      <div key={`quick-phone-${branch.id}`} className="flex items-center gap-3">
                        <a
                          href={branch.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-foreground/70 hover:text-primary hover:underline transition-colors ${language === 'ar' ? 'pl-[10px]' : ''}`}
                        >
                          {branch.name}
                        </a>
                        <span className="text-foreground/70">:</span>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, '')}`}
                          className="text-primary hover:underline font-semibold font-mono tracking-wide"
                          data-testid={`link-quick-phone-${branch.id}`}
                          dir="ltr"
                        >
                          {branch.phone.replace(/(\d{2})\s(\d{4})\s(\d{4})/, '$1\u00A0$2\u00A0$3')}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Online Program Quick Access */}
              <Card className="text-center hover-elevate" data-testid="card-quick-program">
                <CardContent className="p-6">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-4" data-testid="text-quick-program-title">{t('bookNow.programBooking')}</h3>
                  <div className="flex flex-col gap-2">
                    {riyadhBranches.map((branch) => (
                      <a
                        key={`quick-program-${branch.id}`}
                        href={branch.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                        data-testid={`link-quick-program-${branch.id}`}
                      >
                        {branch.name}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Section with Images */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={vetConsultationImage} 
                alt="Veterinary consultation" 
                className="rounded-xl w-full h-full object-cover shadow-md"
                data-testid="img-vet-consultation"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={vetEquipmentImage} 
                alt="Modern veterinary equipment" 
                className="rounded-xl w-full h-full object-cover shadow-md"
                data-testid="img-vet-equipment"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jeddah Branches - Coming Soon */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`${language === 'ar' ? 'flex justify-start' : ''}`}>
              <h3 className={`text-2xl font-semibold text-primary mb-6 flex items-center gap-2 ${language === 'ar' ? 'text-right' : ''}`} data-testid="text-jeddah-branches">
                <lord-icon
                  src="https://cdn.lordicon.com/dfwzmvnc.json"
                  trigger="loop"
                  delay="1500"
                  colors="primary:#18ac61,secondary:#264653"
                  style={{ width: '90px', height: '90px' }}
                />
                {t('bookNow.jeddahBranches')}
              </h3>
            </div>
            
            <Card className="text-center py-12" data-testid="card-jeddah-coming-soon">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <lord-icon
                    src="https://cdn.lordicon.com/mmsmhvsw.json"
                    trigger="loop"
                    delay="1000"
                    colors="primary:#18ac61,secondary:#264653"
                    style={{ width: '90px', height: '90px' }}
                  />
                </div>
                <p className="text-2xl font-semibold text-foreground mb-6" data-testid="text-coming-soon">
                  {t('bookNow.comingSoon')}
                </p>
                
                {/* Countdown Timer */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-months">{formatNumber(countdown.months)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'شهور' : 'Months'}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-weeks">{formatNumber(countdown.weeks)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'أسابيع' : 'Weeks'}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-days">{formatNumber(countdown.days)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'أيام' : 'Days'}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-hours">{formatNumber(countdown.hours)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'ساعات' : 'Hours'}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-minutes">{formatNumber(countdown.minutes)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'دقائق' : 'Minutes'}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-3xl font-bold text-primary" data-testid="countdown-seconds">{formatNumber(countdown.seconds)}</span>
                    <span className="text-sm text-foreground/60 mt-1">{language === 'ar' ? 'ثواني' : 'Seconds'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <HeartbeatDivider />
      <Footer />
    </div>
  );
}
