import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import video1 from '@assets/video-2023-03-05.mp4';
import video2 from '@assets/video-2023-04-08.mp4';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function MediaSection() {
  const ref = useRef(null);
  const tiktokIframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  const handlePlayPause = () => {
    if (tiktokIframeRef.current) {
      const message = {
        'x-tiktok-player': true,
        'type': isPlaying ? 'pause' : 'play'
      };
      tiktokIframeRef.current.contentWindow?.postMessage(message, '*');
      setIsPlaying(!isPlaying);
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <motion.div variants={item}>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border border-border">
                <video
                  controls
                  className="w-full aspect-video object-cover"
                  poster=""
                  data-testid="video-1"
                >
                  <source src={video1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border border-border">
                <video
                  controls
                  className="w-full aspect-video object-cover"
                  poster=""
                  data-testid="video-2"
                >
                  <source src={video2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group mx-auto w-80"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border border-border">
                <div className="w-full h-[500px] overflow-hidden">
                  <iframe
                    ref={tiktokIframeRef}
                    src="https://www.tiktok.com/player/v1/7552593633812303122?controls=1"
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Dr. Paws TikTok Video"
                    data-testid="video-tiktok-1"
                    style={{ overflow: 'hidden' }}
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Button
                    size="icon"
                    variant="default"
                    onClick={handlePlayPause}
                    className="rounded-full shadow-lg"
                    data-testid="button-tiktok-play-pause"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
