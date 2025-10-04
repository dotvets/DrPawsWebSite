import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const packages = [
  {
    name: 'Basic Care',
    price: '299',
    popular: false,
    features: [
      'Annual Wellness Exam',
      'Basic Vaccinations',
      'Parasite Prevention',
      'Dental Consultation',
      'Nutrition Guidance',
    ],
  },
  {
    name: 'Complete Care',
    price: '599',
    popular: true,
    features: [
      'Bi-Annual Wellness Exams',
      'Complete Vaccination Package',
      'Advanced Parasite Prevention',
      'Dental Cleaning Included',
      'Blood Work & Diagnostics',
      'Emergency Care Discount',
    ],
  },
  {
    name: 'Premium Care',
    price: '999',
    popular: false,
    features: [
      'Quarterly Wellness Exams',
      'Premium Vaccination Package',
      'Year-Round Parasite Prevention',
      'Professional Dental Care',
      'Comprehensive Lab Work',
      'Priority Emergency Care',
      '24/7 Vet Consultation',
    ],
  },
];

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
          <h2 className="font-display text-4xl font-medium text-foreground mb-4" data-testid="text-packages-headline">
            Service Packages
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-packages-description">
            Choose the perfect care package for your pet's needs. All packages include comprehensive 
            veterinary care tailored to keep your beloved companion healthy and happy.
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
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2" data-testid={`text-package-name-${index}`}>{pkg.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary" data-testid={`text-package-price-${index}`}>{pkg.price}</span>
                      <span className="text-lg text-foreground/60"> SAR/year</span>
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
                        Book Now
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
