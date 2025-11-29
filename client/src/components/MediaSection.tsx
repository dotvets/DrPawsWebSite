import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const tiktokVideos = [
  { id: '7552593633812303122', title: 'Dr. Paws TikTok Video 1' },
  { id: '7557361343527963911', title: 'Dr. Paws TikTok Video 2' },
  { id: '7552940508834811143', title: 'Dr. Paws TikTok Video 3' },
  { id: '7553295576721263879', title: 'Dr. Paws TikTok Video 4' },
  { id: '7556635120439233810', title: 'Dr. Paws TikTok Video 5' },
  { id: '7559220822280310024', title: 'Dr. Paws TikTok Video 6' },
  { id: '7558145357599739144', title: 'Dr. Paws TikTok Video 7' },
  { id: '7557789738485288210', title: 'Dr. Paws TikTok Video 8' },
  { id: '7554400143768898834', title: 'Dr. Paws TikTok Video 9' }
];

export default function MediaSection() {
  const ref = useRef(null);
  const tiktokIframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(tiktokVideos.map(() => false));
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    direction: language === 'ar' ? 'rtl' : 'ltr'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const pauseAllVideos = useCallback(() => {
    tiktokIframeRefs.current.forEach((iframe) => {
      if (iframe) {
        iframe.contentWindow?.postMessage({
          'x-tiktok-player': true,
          'type': 'pause'
        }, '*');
      }
    });
    setIsPlaying(tiktokVideos.map(() => false));
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    if (newIndex !== selectedIndex) {
      pauseAllVideos();
    }
    setSelectedIndex(newIndex);
  }, [emblaApi, selectedIndex, pauseAllVideos]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handlePlayPause = (index: number) => {
    const iframe = tiktokIframeRefs.current[index];
    if (iframe) {
      const newPlayingState = !isPlaying[index];
      
      if (newPlayingState) {
        pauseAllVideos();
      }
      
      const message = {
        'x-tiktok-player': true,
        'type': newPlayingState ? 'play' : 'pause'
      };
      iframe.contentWindow?.postMessage(message, '*');
      
      setIsPlaying(prev => {
        const newState = [...prev];
        newState[index] = newPlayingState;
        return newState;
      });
    }
  };

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
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex justify-center"
        >
          <div className="relative mx-auto w-80">
            <div className="overflow-hidden rounded-xl cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex" style={{ touchAction: 'pan-y pinch-zoom' }}>
                {tiktokVideos.map((video, index) => (
                  <div key={video.id} className="flex-[0_0_100%] min-w-0">
                    <div className="relative group px-2">
                      <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border border-border">
                        <div className="w-full h-[500px] overflow-hidden">
                          <iframe
                            ref={(el) => (tiktokIframeRefs.current[index] = el)}
                            src={`https://www.tiktok.com/player/v1/${video.id}?controls=1`}
                            className="w-full h-full pointer-events-none"
                            frameBorder="0"
                            scrolling="no"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                            data-testid={`video-tiktok-${index + 1}`}
                            style={{ overflow: 'hidden' }}
                          />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Button
                            size="icon"
                            variant="default"
                            onClick={() => handlePlayPause(index)}
                            className="rounded-full shadow-lg pointer-events-auto"
                            data-testid={`button-tiktok-play-pause-${index + 1}`}
                          >
                            {isPlaying[index] ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </Button>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {tiktokVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    pauseAllVideos();
                    emblaApi?.scrollTo(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? 'bg-primary w-6'
                      : 'bg-primary/30'
                  }`}
                  data-testid={`button-carousel-dot-${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
