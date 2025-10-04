import { HeartHandshake, Award, Building2, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: HeartHandshake,
    title: 'Comprehensive & Affectionate Care',
    description: 'We treat every pet as if it were our own, with kindness, respect, and understanding.',
  },
  {
    icon: Award,
    title: 'Experienced Team',
    description: 'Our veterinarians and support staff have years of experience and are passionate about animal health.',
  },
  {
    icon: Building2,
    title: 'State-of-the-Art Facility',
    description: 'We utilize advanced technology and equipment to provide the best possible care.',
  },
  {
    icon: ClipboardCheck,
    title: 'Tailored Plan',
    description: 'We tailor our treatment plans to meet the unique needs of each pet.',
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
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
          Why Choose Dr. Paws Veterinary Clinic?
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" data-testid="button-read-more-why">
              Read More…
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
