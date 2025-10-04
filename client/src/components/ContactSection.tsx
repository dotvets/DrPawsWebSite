import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

export default function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: t('contact.success'),
      description: '',
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-[hsl(199,37%,24%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-medium text-white text-center mb-16" 
          data-testid="text-contact-headline"
        >
          {t('contact.subheadline')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form 
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <motion.div variants={item}>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="name">
                {t('contact.name')}
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white transition-all focus:scale-[1.01]"
                required
                data-testid="input-name"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="phone">
                {t('contact.phone')}
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white transition-all focus:scale-[1.01]"
                required
                data-testid="input-phone"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="email">
                {t('contact.email')}
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white transition-all focus:scale-[1.01]"
                required
                data-testid="input-email"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="message">
                {t('contact.message')}
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white min-h-32 transition-all focus:scale-[1.01]"
                required
                data-testid="input-message"
              />
            </motion.div>

            <motion.div 
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" size="lg" className="w-full" data-testid="button-submit">
                {t('contact.submit')}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8 text-white"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Call: 920 003 045</p>
                    <p className="text-white/80 text-sm">Emergency: 24/7</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <MapPin className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Al-Sahafa Branch</p>
                    <p className="text-white/80 text-sm">Al Thumama Road, Al Sahafa, Riyadh 13315, KSA</p>
                    <p className="text-white/80 text-sm">Tel: 05520 30564</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <MapPin className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Al-Mather Branch</p>
                    <p className="text-white/80 text-sm">Prince Sultan bin Abdulaziz Road</p>
                    <p className="text-white/80 text-sm">Tel: 05313 53667</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Clock className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-white/80 text-sm">Sat – Thu: 09:00 AM – 10:00 PM</p>
                    <p className="text-white/80 text-sm">Fri: 03:00 PM – 10:00 PM</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
