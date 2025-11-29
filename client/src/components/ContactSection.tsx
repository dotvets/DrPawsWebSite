import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';

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

        <div className="max-w-2xl mx-auto">
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
        </div>
      </div>
    </section>
  );
}
