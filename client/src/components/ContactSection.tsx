import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
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
      title: 'Message Sent!',
      description: 'We will get back to you shortly.',
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-[hsl(199,37%,24%)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-medium text-white text-center mb-16" data-testid="text-contact-headline">
          Contact Dr. Paws Veterinary Clinic & Schedule Your Pet's Appointment Today!
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white"
                required
                data-testid="input-name"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="phone">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white"
                required
                data-testid="input-phone"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white"
                required
                data-testid="input-email"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 font-medium" htmlFor="message">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white min-h-32"
                required
                data-testid="input-message"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" data-testid="button-submit">
              Submit
            </Button>
          </form>

          <div className="space-y-8 text-white">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Call: 920 003 045</p>
                    <p className="text-white/80 text-sm">Emergency: 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Al-Sahafa Branch</p>
                    <p className="text-white/80 text-sm">Al Thumama Road, Al Sahafa, Riyadh 13315, KSA</p>
                    <p className="text-white/80 text-sm">Tel: 05520 30564</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Al-Mather Branch</p>
                    <p className="text-white/80 text-sm">Prince Sultan bin Abdulaziz Road</p>
                    <p className="text-white/80 text-sm">Tel: 05313 53667</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-[hsl(43,75%,66%)]" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-white/80 text-sm">Sat – Thu: 09:00 AM – 10:00 PM</p>
                    <p className="text-white/80 text-sm">Fri: 03:00 PM – 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
