import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { type CustomerReview } from '@shared/schema';

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

interface CustomerReviewsDisplayProps {
  showHeader?: boolean;
  className?: string;
  asSection?: boolean;
  onEdit?: (review: CustomerReview) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export default function CustomerReviewsDisplay({
  showHeader = true,
  className = "",
  asSection = true,
  onEdit,
  onDelete,
  showActions = false
}: CustomerReviewsDisplayProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t, language } = useLanguage();

  const { data: reviews = [], isLoading } = useQuery<CustomerReview[]>({
    queryKey: ["/api/customer-reviews"],
  });

  const WrapperComponent = asSection ? 'section' : 'div';
  const wrapperClassName = asSection ? `py-20 bg-card ${className}` : className;

  return (
    <WrapperComponent ref={ref} className={wrapperClassName}>
      <div className="max-w-7xl mx-auto px-6">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-medium text-foreground mb-4" data-testid="text-reviews-headline">
              {t('reviews.headline')}
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Customer testimonials and feedback
            </p>
          </motion.div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60" data-testid="text-loading-reviews">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60" data-testid="text-no-reviews">No customer reviews yet.</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <motion.div key={review.id} variants={item}>
                <Card className="h-full hover-elevate" data-testid={`card-review-${review.id}`}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className="font-semibold text-lg text-foreground" data-testid={`text-name-${review.id}`}>
                          {language === 'ar' && review.nameAr ? review.nameAr : review.name}
                        </h3>
                        <div className={`flex gap-1 mt-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`} data-testid={`rating-${review.id}`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-[#e9c46a] text-[#e9c46a]"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {showActions && onEdit && onDelete && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(review)}
                            data-testid={`button-edit-${review.id}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(review.id)}
                            data-testid={`button-delete-${review.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className={`text-foreground/80 ${language === 'ar' ? 'text-right' : 'text-left'}`} data-testid={`text-message-${review.id}`}>
                      {review.message}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </WrapperComponent>
  );
}
