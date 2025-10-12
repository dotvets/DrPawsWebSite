import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';
import { MapPin, Clock, Info } from 'lucide-react';

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
      iframeUrl: `https://vet.digitail.io/clinics/dr-paws-sahafa-tel-920003045?widget&lang=${language}`,
    },
    {
      id: 'mather',
      name: t('bookNow.matherBranch'),
      iframeUrl: `https://vet.digitail.io/clinics/dr-paws-mathar-phone-920003045?widget&lang=${language}`,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-booknow-title">
              {t('bookNow.title')}
            </h1>
            <p className="text-xl text-foreground/80 mb-8" data-testid="text-booknow-welcome">
              {t('bookNow.welcome')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4" data-testid="text-choose-branch-title">
              {t('bookNow.chooseBranch')}
            </h2>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2" data-testid="text-riyadh-branches">
                <MapPin className="w-6 h-6 text-primary" />
                {t('bookNow.riyadhBranches')}
              </h3>
              
              {language === 'ar' && (
                <Card className="mb-6 bg-primary/5 border-primary/20" data-testid="card-booking-help">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      {t('bookNow.helpTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/80 mb-4" data-testid="text-help-note">
                      {t('bookNow.helpNote')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Select Date:</strong> {t('bookNow.field.selectDate')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Select Time:</strong> {t('bookNow.field.selectTime')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Pet Name:</strong> {t('bookNow.field.petName')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Owner Name:</strong> {t('bookNow.field.ownerName')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Phone Number:</strong> {t('bookNow.field.phoneNumber')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Email:</strong> {t('bookNow.field.email')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Pet Type:</strong> {t('bookNow.field.petType')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Service:</strong> {t('bookNow.field.service')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Notes/Comments:</strong> {t('bookNow.field.notes')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">•</span>
                        <span><strong>Submit/Book:</strong> {t('bookNow.field.submit')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                {riyadhBranches.map((branch) => (
                  <Card key={branch.id} className="overflow-hidden" data-testid={`card-branch-${branch.id}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center gap-2" data-testid={`text-branch-${branch.id}-name`}>
                        <MapPin className="w-5 h-5 text-primary" />
                        {branch.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative w-full" style={{ height: '600px' }}>
                        <iframe
                          key={`${branch.id}-${language}`}
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
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2" data-testid="text-jeddah-branches">
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
