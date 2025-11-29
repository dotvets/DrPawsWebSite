import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Gift, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLanguage } from '@/contexts/LanguageContext';
import confetti from 'canvas-confetti';

interface PromotionalModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PromotionalModal({ open, onClose }: PromotionalModalProps) {
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  });

  // Debounce phone number validation
  useEffect(() => {
    const checkPhone = async () => {
      if (formData.phoneNumber.length >= 10) {
        setIsCheckingPhone(true);
        try {
          const response = await fetch(`/api/opening-discount/check-phone/${formData.phoneNumber}`);
          const data = await response.json();
          if (data.exists) {
            setPhoneError(t('promo.phoneAlreadyRegistered'));
          } else {
            setPhoneError(null);
          }
        } catch (error) {
          console.error('Error checking phone:', error);
        } finally {
          setIsCheckingPhone(false);
        }
      } else {
        setPhoneError(null);
      }
    };

    const timeoutId = setTimeout(checkPhone, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.phoneNumber, t]);

  // Debounce email validation
  useEffect(() => {
    const checkEmail = async () => {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (formData.emailAddress.length > 0) {
        if (!emailRegex.test(formData.emailAddress)) {
          setEmailError(t('promo.invalidEmail'));
          return;
        }

        setIsCheckingEmail(true);
        try {
          const response = await fetch(`/api/opening-discount/check-email/${encodeURIComponent(formData.emailAddress)}`);
          const data = await response.json();
          if (data.exists) {
            setEmailError(t('promo.emailAlreadyRegistered'));
          } else {
            setEmailError(null);
          }
        } catch (error) {
          console.error('Error checking email:', error);
        } finally {
          setIsCheckingEmail(false);
        }
      } else {
        setEmailError(null);
      }
    };

    const timeoutId = setTimeout(checkEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.emailAddress, t]);

  const handleOkClick = () => {
    setShowSuccess(false);
    setSubmittedPhone('');
    if (doNotShowAgain) {
      localStorage.setItem('hasSeenPromoModal', 'true');
    }
    onClose();
  };

  const showCelebration = () => {
    const colors = ['#18ac61', '#f4a261', '#e76f51', '#264653', '#2a9d8f'];
    
    // First burst from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });

    // Left side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
    }, 100);

    // Right side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 100);

    // Final center burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        ticks: 200
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      setPhoneError(t('promo.phoneNumberMustBe10Digits'));
      return;
    }
    
    // Prevent submission if phone or email error exists
    if (phoneError || emailError) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      await apiRequest('POST', '/api/opening-discount', {
        ...formData,
        language
      });

      // Store the phone number for success message
      setSubmittedPhone(formData.phoneNumber);

      // Show celebration effect
      showCelebration();

      // Show success message after celebration
      setTimeout(() => {
        setShowSuccess(true);
        setFormData({ firstName: '', lastName: '', emailAddress: '', phoneNumber: '' });
      }, 1000);
    } catch (error: any) {
      let errorMessage = t('promo.errorGeneric');
      
      if (error instanceof Error) {
        if (error.message.includes('409') || error.message.includes('Phone number already registered')) {
          errorMessage = t('promo.errorDuplicate');
        }
      }
      
      toast({
        title: t('promo.errorTitle'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (doNotShowAgain) {
      localStorage.setItem('hasSeenPromoModal', 'true');
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 overflow-hidden [&>button]:z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {!showSuccess ? (
          <>
            <div className="absolute top-4 z-10 w-full px-4">
              <div className="flex items-center justify-between pt-[15px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="flex items-center gap-2"
                  data-testid="button-language-switcher"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
                
                <div className="flex items-center gap-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <Checkbox 
                    id="doNotShowAgain" 
                    checked={doNotShowAgain}
                    onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
                    data-testid="checkbox-do-not-show"
                  />
                  <Label 
                    htmlFor="doNotShowAgain" 
                    className="text-sm cursor-pointer"
                    data-testid="label-do-not-show"
                  >
                    {t('promo.doNotShowAgain')}
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-8 pt-12 text-center border-b">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-primary mb-2">
                  {t('promo.title')}
                </DialogTitle>
                <DialogDescription className="text-base sm:text-lg text-foreground/90">
                  {t('promo.description')}
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="firstName" className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {t('promo.firstName')} <span className="text-destructive">{t('promo.required')}</span>
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formData.firstName.length}/20
                    </span>
                  </div>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    maxLength={20}
                    required
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    placeholder={t('promo.firstNamePlaceholder')}
                    data-testid="input-first-name"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="lastName" className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {t('promo.lastName')} <span className="text-destructive">{t('promo.required')}</span>
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formData.lastName.length}/20
                    </span>
                  </div>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    maxLength={20}
                    required
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    placeholder={t('promo.lastNamePlaceholder')}
                    data-testid="input-last-name"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="emailAddress" className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {t('promo.email')} <span className="text-destructive">{t('promo.required')}</span>
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formData.emailAddress.length}/50
                    </span>
                  </div>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    maxLength={50}
                    required
                    dir="ltr"
                    placeholder={t('promo.emailPlaceholder')}
                    data-testid="input-email"
                    className={emailError ? 'border-destructive' : ''}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive" data-testid="text-email-error">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="phoneNumber" className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {t('promo.phoneNumber')} <span className="text-destructive">{t('promo.required')}</span>
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formData.phoneNumber.length}/10
                    </span>
                  </div>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                    maxLength={10}
                    required
                    dir="ltr"
                    placeholder={t('promo.phoneNumberPlaceholder')}
                    data-testid="input-phone-number"
                    className={phoneError ? 'border-destructive' : ''}
                  />
                  {phoneError && (
                    <p className="text-sm text-destructive" data-testid="text-phone-error">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !!phoneError || !!emailError}
                data-testid="button-submit-registration"
              >
                {isSubmitting ? t('promo.submitting') : t('promo.submit')}
              </Button>
            </form>
          </>
        ) : (
          <div className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                {t('promo.successSubscription')}
              </h3>
              <p className="text-base sm:text-lg text-foreground/80">
                {t('promo.subscriptionCode')}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary" dir="ltr">
                {submittedPhone}
              </p>
            </div>

            <Button
              onClick={handleOkClick}
              className="w-full mt-6"
              data-testid="button-ok-success"
            >
              {t('promo.okButton')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
