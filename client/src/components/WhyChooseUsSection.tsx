import { HeartHandshake, Award, Building2, ClipboardCheck } from 'lucide-react';
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
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useLanguage();

  const features = [
    {
      icon: HeartHandshake,
      title: t('why.reason1.title'),
      description: t('why.reason1.description'),
    },
    {
      icon: Award,
      title: t('why.reason2.title'),
      description: t('why.reason2.description'),
    },
    {
      icon: Building2,
      title: t('why.reason3.title'),
      description: t('why.reason3.description'),
    },
    {
      icon: ClipboardCheck,
      title: t('why.reason4.title'),
      description: t('why.reason4.description'),
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-medium text-foreground text-center mb-16" 
          data-testid="text-why-choose-headline"
        >
          {t('why.headline')}
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-12 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex gap-6" 
              data-testid={`feature-${index}`}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" data-testid="button-read-more-why">
                {t('why.readMore')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
