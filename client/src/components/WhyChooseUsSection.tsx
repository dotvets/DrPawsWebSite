import { HeartHandshake, Award, Building2, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-medium text-foreground text-center mb-16" data-testid="text-why-choose-headline">
          Why Choose Dr. Paws Veterinary Clinic?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6" data-testid={`feature-${index}`}>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" data-testid="button-read-more-why">
            Read More…
          </Button>
        </div>
      </div>
    </section>
  );
}
