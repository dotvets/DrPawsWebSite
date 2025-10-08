import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User } from 'lucide-react';
import { Link } from 'wouter';

interface BlogPost {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  emoji: string;
  date: string;
  author: string;
  category: string;
  categoryAr: string;
}

export default function Blog() {
  const { language } = useLanguage();

  const heroRef = useRef(null);
  const postsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const postsInView = useInView(postsRef, { once: false, amount: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      titleEn: "Summer Care Tips for Dogs",
      titleAr: "نصائح العناية الصيفية للكلاب",
      contentEn: "Hot Saudi summers can be tough for dogs! Make sure your furry friend stays cool by keeping them hydrated, walking during early mornings, and avoiding hot pavements. Regular grooming helps reduce body heat and keeps them comfortable. Visit Dr. Paws for a summer health check and professional grooming.",
      contentAr: "الصيف في السعودية قد يكون صعبًا على الكلاب! احرص على بقاء كلبك رطبًا، ونزهه في الصباح الباكر وتجنب الطرق الساخنة. العناية الدورية بالشعر تساعد على تقليل حرارة الجسم وجعل كلبك مرتاحًا. قم بزيارة عيادات د. باوز لفحص صيفي شامل وخدمة تجميل احترافية.",
      emoji: "🐕",
      date: "2025-01-15",
      author: "Dr. Paws Team",
      category: "Pet Care",
      categoryAr: "رعاية الحيوانات"
    },
    {
      id: 2,
      titleEn: "Why Regular Check-ups Matter for Cats",
      titleAr: "أهمية الفحوصات الدورية للقطط",
      contentEn: "Cats often hide signs of illness. Regular veterinary check-ups can detect problems early, keeping your cat healthy and happy. Dr. Paws offers gentle, stress-free examinations to ensure your feline friend's well-being.",
      contentAr: "القطط غالبًا ما تُخفي علامات المرض، لذلك الفحص البيطري الدوري يساعد في اكتشاف أي مشكلة مبكرًا لضمان صحتها وسعادتها. في عيادات د. باوز، نقدم فحوصات لطيفة وخالية من التوتر لحيوانك الأليف.",
      emoji: "🐱",
      date: "2025-01-10",
      author: "Dr. Paws Team",
      category: "Health",
      categoryAr: "الصحة"
    },
    {
      id: 3,
      titleEn: "Caring for Your Pet Birds at Home",
      titleAr: "رعاية طيورك الأليفة في المنزل",
      contentEn: "Birds need special care — clean cages, fresh food, and daily interaction. Watch for changes in feathers or appetite, as they can indicate illness. Dr. Paws provides expert avian care and health consultations for all bird species.",
      contentAr: "الطيور تحتاج إلى عناية خاصة — نظّف القفص بانتظام، وقدّم طعامًا طازجًا وتفاعل معها يوميًا. راقب أي تغيّر في الريش أو الشهية لأنها قد تدل على مرض. يقدم د. باوز رعاية متخصصة واستشارات صحية لجميع أنواع الطيور.",
      emoji: "🐦",
      date: "2025-01-05",
      author: "Dr. Paws Team",
      category: "Pet Care",
      categoryAr: "رعاية الحيوانات"
    },
    {
      id: 4,
      titleEn: "Importance of Vaccinations for Pets",
      titleAr: "أهمية التطعيمات للحيوانات الأليفة",
      contentEn: "Vaccines protect your pet from dangerous diseases like rabies and parvovirus. Keeping vaccinations up to date ensures long-term safety. Schedule your pet's vaccination today at Dr. Paws and keep them protected year-round.",
      contentAr: "اللقاحات تحمي حيوانك الأليف من الأمراض الخطيرة مثل السعار والبارفو. الالتزام بجدول التطعيمات يحافظ على صحته على المدى الطويل. احجز موعد التطعيم اليوم في عيادات د. باوز لضمان حمايته طوال العام.",
      emoji: "💉",
      date: "2024-12-28",
      author: "Dr. Paws Team",
      category: "Health",
      categoryAr: "الصحة"
    },
    {
      id: 5,
      titleEn: "Healthy Nutrition Tips for Cats, Dogs & Birds",
      titleAr: "نصائح التغذية الصحية للقطط والكلاب والطيور",
      contentEn: "A balanced diet supports immunity, energy, and mood. Choose vet-approved food suitable for your pet's species, age, and activity level. Dr. Paws nutrition experts can guide you to the perfect feeding plan.",
      contentAr: "النظام الغذائي المتوازن يعزز المناعة والطاقة والمزاج العام. اختر طعامًا معتمدًا من الطبيب البيطري ومناسبًا لنوع الحيوان وعمره ونشاطه. يمكن لخبراء التغذية في د. باوز مساعدتك في إعداد النظام الغذائي المثالي.",
      emoji: "🍽️",
      date: "2024-12-20",
      author: "Dr. Paws Team",
      category: "Nutrition",
      categoryAr: "التغذية"
    }
  ];

  const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
    const title = language === 'ar' ? post.titleAr : post.titleEn;
    const content = language === 'ar' ? post.contentAr : post.contentEn;
    const category = language === 'ar' ? post.categoryAr : post.category;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      >
        <Card 
          className="h-full flex flex-col hover-elevate transition-all duration-300"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-4xl" data-testid={`emoji-${post.id}`}>{post.emoji}</span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium bg-[#18ac61]/10 text-[#18ac61]"
                data-testid={`category-${post.id}`}
              >
                {category}
              </span>
            </div>
            <CardTitle 
              className="text-2xl font-display text-[#264653]"
              data-testid={`title-${post.id}`}
            >
              {title}
            </CardTitle>
            <div className={`flex items-center gap-4 text-sm text-muted-foreground flex-wrap ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Calendar className="w-4 h-4" />
                <span data-testid={`date-${post.id}`}>
                  {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <User className="w-4 h-4" />
                <span data-testid={`author-${post.id}`}>{post.author}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p 
              className="text-foreground/80 leading-relaxed mb-6"
              data-testid={`content-${post.id}`}
            >
              {content}
            </p>
            <Link href="/#contact">
              <Button 
                className="w-full mt-auto"
                data-testid={`button-book-${post.id}`}
              >
                {language === 'ar' ? 'احجز موعد' : 'Book an Appointment'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative py-20 bg-gradient-to-br from-[#18ac61]/5 to-[#e9c46a]/5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <h1
                className="font-display text-5xl md:text-6xl font-bold text-[#264653] mb-6"
                data-testid="text-blog-header"
              >
                {language === 'ar' ? 'مدونة د. باوز' : 'Dr. Paws Blog'}
              </h1>
              <p
                className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto"
                data-testid="text-blog-subheader"
              >
                {language === 'ar' 
                  ? 'نصائح ومعلومات مفيدة لرعاية حيواناتك الأليفة'
                  : 'Helpful Tips & Information for Your Pet Care'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section ref={postsRef} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-[#264653]"
        >
          <div className="max-w-4xl mx-auto px-6 text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'ar' ? 'هل لديك استفسار؟' : 'Have a Question?'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {language === 'ar' 
                ? 'فريقنا البيطري هنا لمساعدتك'
                : 'Our Veterinary Team is Here to Help'
              }
            </p>
            <Link href="/#contact">
              <Button 
                size="lg"
                className="bg-[#18ac61] hover:bg-[#18ac61]/90 text-white px-8 py-6 text-lg"
                data-testid="button-contact-cta"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
