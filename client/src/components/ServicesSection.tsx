import { Stethoscope, Heart, Syringe, Scissors, ClipboardList, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Stethoscope,
    title: 'Wellness Exams',
    description: 'Comprehensive health checkups to keep your pet in optimal condition.',
  },
  {
    icon: Heart,
    title: 'Emergency Care',
    description: '24/7 emergency services for urgent medical situations.',
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Complete vaccination programs to protect your pets from diseases.',
  },
  {
    icon: Scissors,
    title: 'Surgery',
    description: 'Advanced surgical procedures with state-of-the-art equipment.',
  },
  {
    icon: Activity,
    title: 'Diagnostics',
    description: 'Advanced diagnostic imaging and laboratory services.',
  },
  {
    icon: ClipboardList,
    title: 'Dental Care',
    description: 'Professional dental cleaning and oral health services.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[hsl(43,75%,66%)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-foreground mb-4" data-testid="text-services-headline">
            What we offer?
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-services-description">
            Dr. Paws Veterinary Clinic provides a comprehensive range of services to keep your pets healthy 
            at every stage of life. From routine checkups to advanced diagnostics and surgery, we're here for 
            all your pet's healthcare needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
              <CardHeader>
                <div className="mb-4">
                  <service.icon className="w-12 h-12 text-[hsl(27,87%,67%)]" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" data-testid="button-read-more-services">
            Read more…
          </Button>
        </div>
      </div>
    </section>
  );
}
