import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t, language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      id: 1,
      name: t('reviews.1.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      rating: 5,
      text: t('reviews.1.text'),
    },
    {
      id: 2,
      name: t('reviews.2.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 5,
      text: t('reviews.2.text'),
    },
    {
      id: 3,
      name: t('reviews.3.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
      rating: 4,
      text: t('reviews.3.text'),
    },
    {
      id: 4,
      name: t('reviews.4.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 5,
      text: t('reviews.4.text'),
    },
    {
      id: 5,
      name: t('reviews.5.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
      rating: 5,
      text: t('reviews.5.text'),
    },
    {
      id: 6,
      name: t('reviews.6.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
      rating: 5,
      text: t('reviews.6.text'),
    },
    {
      id: 7,
      name: t('reviews.7.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      rating: 4,
      text: t('reviews.7.text'),
    },
    {
      id: 8,
      name: t('reviews.8.name'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      rating: 5,
      text: t('reviews.8.text'),
    },
  ];

  const duplicatedReviews = [...reviews, ...reviews];

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div
      className="p-6 rounded-lg border border-border bg-background hover-elevate flex-shrink-0 w-[300px]"
      data-testid={`review-card-${review.id}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <Avatar data-testid={`avatar-${review.id}`}>
          <AvatarImage src={review.avatar} alt={review.name} />
          <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className={language === 'ar' ? 'text-right' : ''}>
          <h3 className="font-semibold text-foreground" data-testid={`name-${review.id}`}>
            {review.name}
          </h3>
          <div className={`flex gap-0.5 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
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
      <p className={`text-foreground/80 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`} data-testid={`text-${review.id}`}>
        {review.text}
      </p>
    </div>
  );

  return (
    <section ref={ref} className="py-20 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-medium text-foreground text-center mb-16"
          data-testid="text-reviews-headline"
        >
          {t('reviews.headline')}
        </motion.h2>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            key={language}
            className="flex gap-6"
            animate={{
              x: isPaused ? undefined : [0, -((300 + 24) * reviews.length)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
