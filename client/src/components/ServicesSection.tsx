import { Stethoscope, Heart, Syringe, Scissors, ClipboardList, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const services = [
    {
      icon: Stethoscope,
      title: t('services.wellness.title'),
      description: t('services.wellness.description'),
    },
    {
      icon: Heart,
      title: t('services.emergency.title'),
      description: t('services.emergency.description'),
    },
    {
      icon: Syringe,
      title: t('services.vaccinations.title'),
      description: t('services.vaccinations.description'),
    },
    {
      icon: Scissors,
      title: t('services.surgery.title'),
      description: t('services.surgery.description'),
    },
    {
      icon: Activity,
      title: t('services.diagnostics.title'),
      description: t('services.diagnostics.description'),
    },
    {
      icon: ClipboardList,
      title: t('services.dental.title'),
      description: t('services.dental.description'),
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[hsl(43,75%,66%)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-medium text-foreground mb-4" data-testid="text-services-headline">
            {t('services.headline')}
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-services-description">
            {t('services.description')}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="h-full hover-elevate" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="mb-4">
                      <service.icon className="w-12 h-12 text-[hsl(27,87%,67%)]" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/services">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" data-testid="button-read-more-services">
                {t('services.readMore')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
