import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiWhatsapp } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import logoSvg from '@assets/dr-paws-logo.svg';

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

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[hsl(199,37%,24%)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          <motion.div variants={item}>
            <img src={logoSvg} alt="Dr. Paws" className="h-16 mb-4" data-testid="img-footer-logo" />
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4">{t('footer.contactInfo')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{t('footer.call')}: <a href="tel:920003045" className="hover:underline" data-testid="link-phone-general">{t('footer.generalPhone')}</a></p>
                  <p className="text-white/70">{t('footer.emergency')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('footer.sahafahBranch')}</p>
                  <p className="text-white/70">{t('footer.sahafahAddress')}</p>
                  <p className="text-white/70"><a href="tel:0552030564" className="hover:underline" data-testid="link-phone-sahafa">{t('footer.sahafahPhone')}</a></p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/70">{t('footer.matherBranch')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4">{t('footer.hours')}</h4>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{t('footer.satThu')}</p>
                  <p>{t('footer.fri')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p><a href="mailto:info@drpaws-sa.com" className="hover:underline" data-testid="link-email">{t('footer.email')}</a></p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-4">{t('footer.follow')}</h4>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-facebook"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-twitter"
                  aria-label="X (Twitter)"
                >
                  <SiX className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-whatsapp"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 pt-8 text-center text-sm text-white/70"
        >
          <p>&copy; {new Date().getFullYear()} Dr. Paws Veterinary Clinic. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
