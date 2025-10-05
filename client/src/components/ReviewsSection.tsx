import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

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

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const reviews = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      rating: 5,
      text: 'Excellent service! The staff was very caring and professional with my cat. Highly recommend Dr. Paws!',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 5,
      text: 'My dog received the best care here. The doctors are knowledgeable and the clinic is very clean.',
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
      rating: 4,
      text: 'Great experience overall. The veterinarian explained everything clearly and my pet feels much better.',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 5,
      text: 'The emergency service was outstanding. They took care of my rabbit immediately and professionally.',
    },
    {
      id: 5,
      name: 'Khalid Abdullah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
      rating: 5,
      text: 'Best veterinary clinic in Riyadh! The staff is friendly and they truly care about animals.',
    },
    {
      id: 6,
      name: 'Jennifer Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
      rating: 5,
      text: 'Very impressed with the facilities and the level of care. My parrot received excellent treatment.',
    },
    {
      id: 7,
      name: 'Omar Saeed',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      rating: 4,
      text: 'Professional team and modern equipment. They made my pet feel comfortable during the visit.',
    },
    {
      id: 8,
      name: 'Lisa Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      rating: 5,
      text: 'Wonderful experience! The grooming service was perfect and my dog looks amazing. Thank you!',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-medium text-foreground text-center mb-16"
          data-testid="text-reviews-headline"
        >
          {t('reviews.headline') || 'What Our Customers Say'}
        </motion.h2>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={item}
              className="p-6 rounded-lg border border-border bg-background hover-elevate"
              data-testid={`review-card-${review.id}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar data-testid={`avatar-${review.id}`}>
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground" data-testid={`name-${review.id}`}>
                    {review.name}
                  </h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-[#e9c46a] text-[#e9c46a]'
                            : 'fill-muted text-muted'
                        }`}
                        data-testid={`star-${review.id}-${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed" data-testid={`text-${review.id}`}>
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
