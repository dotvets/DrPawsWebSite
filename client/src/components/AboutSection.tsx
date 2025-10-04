import { Button } from '@/components/ui/button';
import teamImage from '@assets/generated_images/Veterinary_team_professional_photo_a4845f6b.png';

export default function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={teamImage}
              alt="Dr. Paws veterinary team"
              className="rounded-xl w-full h-auto object-cover shadow-md"
              data-testid="img-about-team"
            />
          </div>
          <div>
            <h2 className="font-display text-4xl font-medium text-foreground mb-6" data-testid="text-about-headline">
              Committed to Your Pet's Well-being, Every Step of the Way
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8" data-testid="text-about-paragraph">
              At Dr. Paws Veterinary Clinic, we understand the special bond you share with your pets. 
              Our experienced and compassionate team is dedicated to providing comprehensive, high-quality 
              veterinary care to keep your furry companions healthy and happy throughout their lives. We 
              strive to create a comfortable and welcoming environment for both you and your pet.
            </p>
            <Button variant="outline" size="lg" data-testid="button-read-more-about">
              Read More…
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
