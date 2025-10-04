import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.book': 'Book an Appointment',
    
    // Hero
    'hero.headline': 'Dr. Paws Veterinary Clinic',
    'hero.tagline': 'Compassionate Care for Your Beloved Pets',
    'hero.subheadline': 'Providing the Highest Quality Veterinary Care',
    'hero.description': "Dr. Paws Veterinary Clinic offers cutting-edge technology in veterinary care. Through our expert team and advanced diagnostic and treatment equipment, we ensure comprehensive care from routine checkups to precise surgeries.",
    'hero.cta': 'Book Your Appointment Today',
    'hero.readMore': 'Read More',
    
    // About
    'about.headline': 'Committed to Your Pet\'s Well-being, Every Step of the Way',
    'about.description': "At Dr. Paws Veterinary Clinic, we understand the special bond you share with your pets. Our experienced and compassionate team is dedicated to providing comprehensive, high-quality veterinary care to keep your furry companions healthy and happy throughout their lives. We strive to create a comfortable and welcoming environment for both you and your pet.",
    'about.readMore': 'Read More',
    
    // Services
    'services.headline': 'What we offer?',
    'services.description': "Dr. Paws Veterinary Clinic provides a comprehensive range of services to keep your pets healthy at every stage of life. From routine checkups to advanced diagnostics and surgery, we're here for all your pet's healthcare needs.",
    'services.readMore': 'Read more',
    
    // Service Packages
    'packages.headline': 'Service Packages',
    'packages.description': "Choose the perfect care package for your pet's needs. All packages include comprehensive veterinary care tailored to keep your beloved companion healthy and happy.",
    'packages.basic.name': 'Basic Care',
    'packages.basic.price': '299',
    'packages.basic.period': 'SAR/year',
    'packages.basic.feature1': 'Annual Wellness Exam',
    'packages.basic.feature2': 'Basic Vaccinations',
    'packages.basic.feature3': 'Parasite Prevention',
    'packages.basic.feature4': 'Dental Consultation',
    'packages.basic.feature5': 'Nutrition Guidance',
    'packages.complete.name': 'Complete Care',
    'packages.complete.price': '599',
    'packages.complete.period': 'SAR/year',
    'packages.complete.feature1': 'Bi-Annual Wellness Exams',
    'packages.complete.feature2': 'Complete Vaccination Package',
    'packages.complete.feature3': 'Advanced Parasite Prevention',
    'packages.complete.feature4': 'Dental Cleaning Included',
    'packages.complete.feature5': 'Blood Work & Diagnostics',
    'packages.complete.feature6': 'Emergency Care Discount',
    'packages.premium.name': 'Premium Care',
    'packages.premium.price': '999',
    'packages.premium.period': 'SAR/year',
    'packages.premium.feature1': 'Quarterly Wellness Exams',
    'packages.premium.feature2': 'Premium Vaccination Package',
    'packages.premium.feature3': 'Year-Round Parasite Prevention',
    'packages.premium.feature4': 'Professional Dental Care',
    'packages.premium.feature5': 'Comprehensive Lab Work',
    'packages.premium.feature6': 'Priority Emergency Care',
    'packages.premium.feature7': '24/7 Vet Consultation',
    'packages.popular': 'Most Popular',
    'packages.bookNow': 'Book Now',
    
    // Media
    'media.headline': 'Our Media',
    'media.description': 'Take a closer look at our state-of-the-art facilities and see how we provide exceptional care for your beloved pets in a warm and welcoming environment.',
    
    // Why Choose Us
    'why.headline': 'Why Choose Dr. Paws Veterinary Clinic?',
    'why.reason1.title': 'Comprehensive & Affectionate Care',
    'why.reason1.description': 'We treat every pet as if it were our own, with kindness, respect, and understanding.',
    'why.reason2.title': 'Experienced Team',
    'why.reason2.description': 'Our veterinarians and support staff have years of experience and are passionate about animal health.',
    'why.reason3.title': 'State-of-the-Art Facility',
    'why.reason3.description': 'We utilize advanced technology and equipment to provide the best possible care.',
    'why.reason4.title': 'Tailored Plan',
    'why.reason4.description': 'We tailor our treatment plans to meet the unique needs of each pet.',
    'why.readMore': 'Read More',
    
    // Contact
    'contact.headline': 'Contact Us',
    'contact.subheadline': 'Contact Dr. Paws Veterinary Clinic & Schedule Your Pet\'s Appointment Today!',
    'contact.name': 'Name',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Thank you! We will contact you soon.',
    
    // Footer
    'footer.description': 'From wellness exams to advanced treatments, Dr. Paws provides comprehensive veterinary care for your pet\'s every need.',
    'footer.contact': 'Contact Info',
    'footer.hours': 'Working Hours',
    'footer.follow': 'Stay in touch',
    'footer.call': 'Call',
    'footer.emergency': 'Emergency: 24/7',
    'footer.generalPhone': '920 003 045',
    'footer.sahafahBranch': 'Al-Sahafa Branch',
    'footer.sahafahPhone': '0552030564',
    'footer.matherBranch': 'Al-Mather Branch',
    'footer.matherPhone': '0531353667',
    'footer.email': 'Email',
    'footer.address': 'Address',
    'footer.sahafahAddress': 'Al Thumama Road, Al Sahafa, Riyadh 13315, KSA',
    'footer.matherAddress': 'Prince Sultan bin Abdulaziz Road, Northern Mathar, Riyadh 12314',
    'footer.satThu': 'Sat – Thu',
    'footer.satThuHours': '09:00 AM – 10:00 PM',
    'footer.fri': 'Fri',
    'footer.friHours': '03:00 PM – 10:00 PM',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.book': 'احجز موعد',
    
    // Hero
    'hero.headline': 'عيادات د. باوز البيطرية',
    'hero.tagline': 'رعاية من القلب لحيواناتكم الأليفة',
    'hero.subheadline': 'عيادة بيطرية متخصصة تمنحهم أفضل رعاية ممكنة',
    'hero.description': 'عيادة د. باوز تُقدّم أحدث ما توصلت إليه التكنولوجيا في مجال الرعاية البيطرية. من خلال فريقنا الخبير وباستخدام أحدث الأجهزة والتقنيات التشخيصية والعلاجية، نضمن تقديم رعاية شاملة ومتطورة تشمل جميع الخدمات من الفحوصات الروتينية إلى الجراحات الدقيقة.',
    'hero.cta': 'احجز موعدك الآن',
    'hero.readMore': 'اقرأ المزيد',
    
    // About
    'about.headline': 'عيادات د. باوز البيطرية: رعاية متكاملة لصحة حيوانك الأليف',
    'about.description': 'في عيادات د. باوز البيطرية، نتفهم الرابطة الخاصة التي تجمعك بحيوانك الأليف. فريقنا ذو الخبرة والرحمة ملتزم بتقديم رعاية بيطرية شاملة وعالية الجودة للحفاظ على صحة وسعادة رفاقك طوال حياتهم. نسعى لخلق بيئة مريحة وترحيبية لك ولحيوانك الأليف.',
    'about.readMore': 'اقرأ المزيد',
    
    // Services
    'services.headline': 'ماذا نقدم؟',
    'services.description': 'تقدم عيادات د. باوز البيطرية باقة متكاملة من الخدمات البيطرية الشاملة لتلبية احتياجات حيوانك الأليف في جميع مراحل حياته. من الفحوصات الوقائية إلى التشخيصات المتقدمة والجراحات المتخصصة. نحن هنا لضمان صحة أليفك.',
    'services.readMore': 'اقرأ المزيد',
    
    // Service Packages
    'packages.headline': 'باقات الخدمات',
    'packages.description': 'اختر باقة الرعاية المثالية التي تناسب احتياجات حيوانك الأليف. جميع الباقات تشمل رعاية بيطرية شاملة مصممة للحفاظ على صحة وسعادة رفيقك المحبوب.',
    'packages.basic.name': 'الرعاية الأساسية',
    'packages.basic.price': '٢٩٩',
    'packages.basic.period': 'ريال/سنة',
    'packages.basic.feature1': 'فحص صحي سنوي',
    'packages.basic.feature2': 'تطعيمات أساسية',
    'packages.basic.feature3': 'الوقاية من الطفيليات',
    'packages.basic.feature4': 'استشارة الأسنان',
    'packages.basic.feature5': 'إرشادات التغذية',
    'packages.complete.name': 'الرعاية الكاملة',
    'packages.complete.price': '٥٩٩',
    'packages.complete.period': 'ريال/سنة',
    'packages.complete.feature1': 'فحوصات صحية نصف سنوية',
    'packages.complete.feature2': 'باقة تطعيمات كاملة',
    'packages.complete.feature3': 'وقاية متقدمة من الطفيليات',
    'packages.complete.feature4': 'تنظيف الأسنان متضمن',
    'packages.complete.feature5': 'فحوصات الدم والتشخيص',
    'packages.complete.feature6': 'خصم على الرعاية الطارئة',
    'packages.premium.name': 'الرعاية المميزة',
    'packages.premium.price': '٩٩٩',
    'packages.premium.period': 'ريال/سنة',
    'packages.premium.feature1': 'فحوصات صحية ربع سنوية',
    'packages.premium.feature2': 'باقة تطعيمات مميزة',
    'packages.premium.feature3': 'وقاية على مدار العام',
    'packages.premium.feature4': 'رعاية أسنان احترافية',
    'packages.premium.feature5': 'فحوصات مخبرية شاملة',
    'packages.premium.feature6': 'رعاية طارئة ذات أولوية',
    'packages.premium.feature7': 'استشارة بيطرية ٢٤/٧',
    'packages.popular': 'الأكثر شعبية',
    'packages.bookNow': 'احجز الآن',
    
    // Media
    'media.headline': 'الوسائط',
    'media.description': 'ألقِ نظرة فاحصة على مرافقنا الحديثة وشاهد كيف نقدم رعاية استثنائية لحيواناتك الأليفة في بيئة دافئة ومرحبة.',
    
    // Why Choose Us
    'why.headline': 'لماذا تختار عيادات د. باوز البيطرية؟',
    'why.reason1.title': 'رعاية شاملة وحنونة',
    'why.reason1.description': 'نعامل كل حيوان أليف كما لو كان ملكنا، بلطف واحترام وتفهّم.',
    'why.reason2.title': 'فريق ذو خبرة',
    'why.reason2.description': 'أطباؤنا وطاقمنا لديهم سنوات من الخبرة وشغف بصحة الحيوانات الأليفة.',
    'why.reason3.title': 'عيادات متطورة وحديثة',
    'why.reason3.description': 'نستخدم أحدث المعدات والتقنيات لتوفير أفضل رعاية ممكنة.',
    'why.reason4.title': 'خطة علاجية مخصصة',
    'why.reason4.description': 'نضع خطة علاج تناسب الاحتياجات الفريدة لكل حيوان أليف.',
    'why.readMore': 'اقرأ المزيد',
    
    // Contact
    'contact.headline': 'تواصل معنا',
    'contact.subheadline': 'بادر بحجز موعد لحيوانك الأليف في عيادة د. باوز البيطرية اليوم!',
    'contact.name': 'الاسم',
    'contact.phone': 'رقم الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.submit': 'إرسال',
    'contact.success': 'شكراً لك! سنتواصل معك قريباً.',
    
    // Footer
    'footer.description': 'من الفحوصات الروتينية إلى الجراحات المتقدمة، تقدم د. باوز رعاية بيطرية متكاملة لجميع احتياجات حيوانك الأليف.',
    'footer.contact': 'معلومات التواصل',
    'footer.hours': 'مواعيد العمل',
    'footer.follow': 'تابعنا',
    'footer.call': 'اتصل',
    'footer.emergency': 'الطوارئ: ٢٤/٧',
    'footer.generalPhone': '٩٢٠٠٠٣٠٤٥',
    'footer.sahafahBranch': 'فرع الصحافة',
    'footer.sahafahPhone': '٠٥٥٢٠٣٠٥٦٤',
    'footer.matherBranch': 'فرع المعذر',
    'footer.matherPhone': '٠٥٣١٣٥٣٦٦٧',
    'footer.email': 'البريد الإلكتروني',
    'footer.address': 'العنوان',
    'footer.sahafahAddress': 'طريق الثمامة، حي الصحافة، الرياض ١٣٣١٥',
    'footer.matherAddress': 'طريق الأمير سلطان بن عبدالعزيز، المعذر الشمالية، الرياض ١٢٣١٤',
    'footer.satThu': 'الأحد – الخميس',
    'footer.satThuHours': '٠٩:٠٠ صباحاً – ١٠:٠٠ مساءً',
    'footer.fri': 'الجمعة',
    'footer.friHours': '٠٣:٠٠ مساءً – ١٠:٠٠ مساءً',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Set RTL direction and lang attribute when language changes
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
