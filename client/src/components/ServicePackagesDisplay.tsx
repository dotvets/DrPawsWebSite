import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import type { ServicePackage } from '@shared/schema';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

interface ServicePackagesDisplayProps {
  showHeader?: boolean;
  onPackageClick?: () => void;
  className?: string;
  asSection?: boolean;
}

export default function ServicePackagesDisplay({ 
  showHeader = true, 
  onPackageClick,
  className = "",
  asSection = true
}: ServicePackagesDisplayProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/service-packages"],
  });

  const handlePackageClick = () => {
    if (onPackageClick) {
      onPackageClick();
    } else {
      setLocation('/book-now');
    }
  };

  const getPackageName = (pkg: ServicePackage) => {
    return language === 'ar' && pkg.nameAr ? pkg.nameAr : pkg.name;
  };

  const getPackagePeriod = (pkg: ServicePackage) => {
    return language === 'ar' && pkg.periodAr ? pkg.periodAr : pkg.period;
  };

  const getPackageFeatures = (pkg: ServicePackage) => {
    if (language === 'ar' && pkg.featuresAr && pkg.featuresAr.length > 0) {
      return pkg.featuresAr;
    }
    return pkg.features || [];
  };

  const WrapperComponent = asSection ? 'section' : 'div';
  const wrapperClassName = asSection ? `py-20 bg-background ${className}` : className;

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
            <div className="flex items-center justify-center gap-4 mb-4">
              <lord-icon
                src="https://cdn.lordicon.com/qopeqxee.json"
                trigger="loop"
                delay="1500"
                state="in-reveal"
                colors="primary:#18ac61,secondary:#264653"
                style={{width: '90px', height: '90px'}}
                data-testid="icon-paw-animated">
              </lord-icon>
              <h2 className="font-display text-4xl font-medium text-foreground" data-testid="text-packages-headline">
                {t('packages.headline')}
              </h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto" data-testid="text-packages-description">
              {t('packages.description')}
            </p>
          </motion.div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60" data-testid="text-loading-packages">Loading packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60" data-testid="text-no-packages">No packages available at the moment.</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div key={pkg.id} variants={item}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Card className={`h-full flex flex-col hover-elevate relative ${pkg.popular ? 'border-primary' : ''}`} data-testid={`card-package-${index}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground" data-testid="badge-most-popular">
                        {t('packages.popular')}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2" data-testid={`text-package-name-${index}`}>{getPackageName(pkg)}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary" data-testid={`text-package-price-${index}`}>{pkg.price}</span>
                      <span className="text-lg text-foreground/60"> {getPackagePeriod(pkg)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {getPackageFeatures(pkg).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2" data-testid={`feature-${index}-${featureIndex}`}>
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button 
                        className="w-full" 
                        variant={pkg.popular ? 'default' : 'outline'}
                        size="lg"
                        onClick={handlePackageClick}
                        data-testid={`button-book-now-${index}`}
                      >
                        {t('packages.bookNow')}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </WrapperComponent>
  );
}
