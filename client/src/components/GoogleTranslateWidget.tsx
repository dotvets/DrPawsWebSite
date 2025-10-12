import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleTranslateWidget() {
  const { language } = useLanguage();

  useEffect(() => {
    const triggerTranslation = () => {
      // Wait for Google Translate to be fully loaded
      if (typeof window.google === 'undefined' || !window.google.translate) {
        setTimeout(triggerTranslation, 100);
        return;
      }

      // Get the Google Translate frame
      const translateFrame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
      
      if (language === 'ar') {
        // Trigger translation to Arabic
        const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (translateSelect) {
          translateSelect.value = 'ar';
          translateSelect.dispatchEvent(new Event('change'));
        }
      } else {
        // Restore to original (English)
        const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (translateSelect) {
          translateSelect.value = '';
          translateSelect.dispatchEvent(new Event('change'));
        }
      }
    };

    // Delay to ensure Google Translate is initialized
    const timer = setTimeout(triggerTranslation, 500);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: 'absolute',
        left: '-9999px',
        opacity: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
