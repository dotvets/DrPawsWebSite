import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function BookNow() {
  const { t, language } = useLanguage();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const riyadhBranches = [
    {
      id: 'sahafa',
      name: t('bookNow.sahafahBranch'),
      whatsapp: t('bookNow.sahafahWhatsApp'),
      phone: t('bookNow.sahafahPhone'),
      iframeUrl: 'https://vet.digitail.io/clinics/dr-paws-sahafa-tel-920003045?widget',
    },
    {
      id: 'mather',
      name: t('bookNow.matherBranch'),
      whatsapp: t('bookNow.matherWhatsApp'),
      phone: t('bookNow.matherPhone'),
      iframeUrl: 'https://vet.digitail.io/clinics/dr-paws-mathar-phone-920003045?widget',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="max-w-7xl mx-auto px-6">
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
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* WhatsApp Quick Access */}
              <Card className="text-center hover-elevate" data-testid="card-quick-whatsapp">
                <CardContent className="p-6">
                  <SiWhatsapp className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-4" data-testid="text-quick-whatsapp-title">{t('bookNow.whatsappBooking')}</h3>
                  <div className="space-y-3">
                    {riyadhBranches.map((branch) => (
                      <div key={`quick-wa-${branch.id}`} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground/70">{branch.name}</span>
                        <a
                          href={`https://wa.me/${branch.whatsapp.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                          data-testid={`link-quick-whatsapp-${branch.id}`}
                        >
                          <SiWhatsapp className="w-5 h-5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Phone Quick Access */}
              <Card className="text-center hover-elevate" data-testid="card-quick-phone">
                <CardContent className="p-6">
                  <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-4" data-testid="text-quick-phone-title">{t('bookNow.phoneBooking')}</h3>
                  <div className="space-y-3">
                    {riyadhBranches.map((branch) => (
                      <div key={`quick-phone-${branch.id}`} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground/70">{branch.name}</span>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, '')}`}
                          className="text-primary hover:underline text-sm font-semibold"
                          data-testid={`link-quick-phone-${branch.id}`}
                        >
                          {branch.phone}
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
                  <p className="text-sm text-foreground/70 mb-4">{t('bookNow.chooseBranch')}</p>
                  <div className="flex flex-col gap-2">
                    {riyadhBranches.map((branch) => (
                      <a
                        key={`quick-program-${branch.id}`}
                        href={`#program-${branch.id}`}
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

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4" data-testid="text-booking-methods-title">
              {t('bookNow.bookingMethods')}
            </h2>
          </motion.div>

          <div className="space-y-16">
            {/* Book via WhatsApp */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2" data-testid="text-whatsapp-booking">
                <SiWhatsapp className="w-6 h-6 text-primary" />
                {t('bookNow.whatsappBooking')}
              </h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2" data-testid="text-riyadh-branches">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t('bookNow.riyadhBranches')}
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {riyadhBranches.map((branch) => (
                    <Card key={branch.id} className="hover-elevate" data-testid={`card-whatsapp-${branch.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="font-medium" data-testid={`text-branch-${branch.id}-name`}>
                              {branch.name}
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/${branch.whatsapp.replace(/\s/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2"
                            data-testid={`link-whatsapp-${branch.id}`}
                          >
                            <SiWhatsapp className="w-6 h-6" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Book by Phone */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2" data-testid="text-phone-booking">
                <Phone className="w-6 h-6 text-primary" />
                {t('bookNow.phoneBooking')}
              </h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2" data-testid="text-riyadh-branches-phone">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t('bookNow.riyadhBranches')}
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {riyadhBranches.map((branch) => (
                    <Card key={branch.id} className="hover-elevate" data-testid={`card-phone-${branch.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="font-medium" data-testid={`text-branch-${branch.id}-name-phone`}>
                              {branch.name}
                            </span>
                          </div>
                          <a
                            href={`tel:${branch.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                            data-testid={`link-phone-${branch.id}`}
                          >
                            <Phone className="w-5 h-5" />
                            <span className="font-semibold" data-testid={`text-phone-${branch.id}`}>
                              {branch.phone}
                            </span>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Book through our program */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6" data-testid="text-program-booking">
                {t('bookNow.programBooking')}
              </h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2" data-testid="text-riyadh-branches-program">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t('bookNow.riyadhBranches')}
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {riyadhBranches.map((branch) => (
                    <Card key={branch.id} id={`program-${branch.id}`} className="overflow-hidden scroll-mt-24" data-testid={`card-program-${branch.id}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl flex items-center gap-2" data-testid={`text-program-branch-${branch.id}-name`}>
                          <MapPin className="w-5 h-5 text-primary" />
                          {branch.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative w-full" style={{ height: '600px' }}>
                          <iframe
                            src={branch.iframeUrl}
                            height="600"
                            width="100%"
                            frameBorder="0"
                            title={`${branch.name} Booking`}
                            className="w-full h-full"
                            data-testid={`iframe-branch-${branch.id}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Jeddah Branches - Coming Soon */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2" data-testid="text-jeddah-branches">
                <MapPin className="w-6 h-6 text-primary" />
                {t('bookNow.jeddahBranches')}
              </h3>
              
              <Card className="text-center py-12" data-testid="card-jeddah-coming-soon">
                <CardContent>
                  <Clock className="w-16 h-16 mx-auto mb-4 text-primary/40" />
                  <p className="text-2xl font-semibold text-foreground/60" data-testid="text-coming-soon">
                    {t('bookNow.comingSoon')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <HeartbeatDivider />
      <Footer />
    </div>
  );
}
