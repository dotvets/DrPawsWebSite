import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import teamImage from '@assets/generated_images/Veterinary_team_professional_photo_a4845f6b.png';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src={teamImage}
              alt="Dr. Paws veterinary team"
              className="rounded-xl w-full h-auto object-cover shadow-md"
              data-testid="img-about-team"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl font-medium text-foreground mb-6" data-testid="text-about-headline">
              Committed to Your Pet's Well-being, Every Step of the Way
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8" data-testid="text-about-paragraph">
              At Dr. Paws Veterinary Clinic, we understand the special bond you share with your pets. 
              Our experienced and compassionate team is dedicated to providing comprehensive, high-quality 
              veterinary care to keep your furry companions healthy and happy throughout their lives. We 
              strive to create a comfortable and welcoming environment for both you and your pet.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" data-testid="button-read-more-about">
                Read More…
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
