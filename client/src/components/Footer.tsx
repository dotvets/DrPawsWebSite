import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[hsl(199,37%,24%)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-medium mb-4">Dr. Paws</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              From wellness exams to advanced treatments, Dr. Paws provides comprehensive veterinary 
              care for your pet's every need.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Call: 920 003 045</p>
                  <p className="text-white/70">Emergency: 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">Al-Sahafa: 05520 30564</p>
                  <p className="text-white/70">Al Thumama Road, Al Sahafa, Riyadh 13315</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">Al-Mather: 05313 53667</p>
                  <p className="text-white/70">Prince Sultan bin Abdulaziz Road</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <p>info@drpaws.sa</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Working Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Sat – Thu: 09:00 AM – 10:00 PM</p>
                  <p>Fri: 03:00 PM – 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-4">Stay in touch</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-facebook"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-twitter"
                  aria-label="X (Twitter)"
                >
                  <SiX className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover-elevate active-elevate-2"
                  data-testid="link-whatsapp"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Dr. Paws Veterinary Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
