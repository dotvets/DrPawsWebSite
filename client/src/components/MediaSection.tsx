import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import video1 from '@assets/video-2023-03-05.mp4';
import video2 from '@assets/video-2023-04-08.mp4';

const videos = [
  { src: video1, id: 1 },
  { src: video2, id: 2 },
];

export default function MediaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section ref={ref} className="py-20 bg-[hsl(43,75%,66%)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <lord-icon
              src="https://cdn.lordicon.com/ldyubhgs.json"
              trigger="loop"
              delay="1500"
              colors="primary:#18ac61,secondary:#264653"
              style={{width: '90px', height: '90px'}}
              data-testid="icon-media-animated">
            </lord-icon>
            <h2 className="font-display text-4xl font-medium text-foreground" data-testid="text-media-headline">
              {t('media.headline')}
            </h2>
          </div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-media-description">
            {t('media.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-2"
                >
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="relative group"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-xl bg-card border border-border mx-auto max-w-sm">
                      <video
                        controls
                        className="w-full h-[500px] md:h-[600px] object-cover"
                        poster=""
                        data-testid={`video-${video.id}`}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
            data-testid="button-prev-video"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
            data-testid="button-next-video"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
