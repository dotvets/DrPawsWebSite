import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function ServicePackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const packages = [
    {
      name: t('packages.basic.name'),
      price: t('packages.basic.price'),
      period: t('packages.basic.period'),
      popular: false,
      features: [
        t('packages.basic.feature1'),
        t('packages.basic.feature2'),
        t('packages.basic.feature3'),
        t('packages.basic.feature4'),
        t('packages.basic.feature5'),
      ],
    },
    {
      name: t('packages.complete.name'),
      price: t('packages.complete.price'),
      period: t('packages.complete.period'),
      popular: true,
      features: [
        t('packages.complete.feature1'),
        t('packages.complete.feature2'),
        t('packages.complete.feature3'),
        t('packages.complete.feature4'),
        t('packages.complete.feature5'),
        t('packages.complete.feature6'),
      ],
    },
    {
      name: t('packages.premium.name'),
      price: t('packages.premium.price'),
      period: t('packages.premium.period'),
      popular: false,
      features: [
        t('packages.premium.feature1'),
        t('packages.premium.feature2'),
        t('packages.premium.feature3'),
        t('packages.premium.feature4'),
        t('packages.premium.feature5'),
        t('packages.premium.feature6'),
        t('packages.premium.feature7'),
      ],
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <lord-icon
              src="https://cdn.lordicon.com/qopeqxee.json"
              trigger="loop"
              delay="1500"
              state="in-reveal"
              colors="primary:#18ac61,secondary:#264653"
              style={{width: '90px', height: '90px'}}
              data-testid="icon-paw-animated">
            </lord-icon>
            <h2 className="font-display text-4xl font-medium text-foreground" data-testid="text-packages-headline">
              {t('packages.headline')}
            </h2>
          </div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-packages-description">
            {t('packages.description')}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={item}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Card className={`h-full flex flex-col hover-elevate relative ${pkg.popular ? 'border-primary' : ''}`} data-testid={`card-package-${index}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground" data-testid="badge-most-popular">
                        {t('packages.popular')}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2" data-testid={`text-package-name-${index}`}>{pkg.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary" data-testid={`text-package-price-${index}`}>{pkg.price}</span>
                      <span className="text-lg text-foreground/60"> {pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2" data-testid={`feature-${index}-${featureIndex}`}>
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button 
                        className="w-full" 
                        variant={pkg.popular ? 'default' : 'outline'}
                        size="lg"
                        onClick={scrollToContact}
                        data-testid={`button-book-now-${index}`}
                      >
                        {t('packages.bookNow')}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
