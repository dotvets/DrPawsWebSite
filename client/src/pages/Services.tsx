import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import ECGAnimation from '@/components/ECGAnimation';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';
import {
  Stethoscope,
  Scissors,
  Microscope,
  Syringe,
  Pill,
  Plane,
  Home,
  Heart,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import servicesHeroImage from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';
import teamImage from '@assets/generated_images/Veterinary_team_professional_photo_a4845f6b.png';
import vetExamImage from '@assets/generated_images/Vet_examining_golden_retriever_19654044.png';
import consultationImage from '@assets/generated_images/Vet_consultation_with_cat_owner_7978144f.png';

export default function Services() {
  const { t, language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const heroRef = useRef(null);
  const servicesRef1 = useRef(null);
  const imageRef1 = useRef(null);
  const servicesRef2 = useRef(null);
  const imageRef2 = useRef(null);
  const servicesRef3 = useRef(null);
  const homeCareRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const servicesInView1 = useInView(servicesRef1, { once: false, amount: 0.2 });
  const imageInView1 = useInView(imageRef1, { once: false, amount: 0.3 });
  const servicesInView2 = useInView(servicesRef2, { once: false, amount: 0.2 });
  const imageInView2 = useInView(imageRef2, { once: false, amount: 0.3 });
  const servicesInView3 = useInView(servicesRef3, { once: false, amount: 0.2 });
  const homeCareInView = useInView(homeCareRef, { once: false, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedCards(prev => {
      // If the clicked card is already open, close it
      if (prev[id]) {
        return { [id]: false };
      }
      // Otherwise, close all others and open only this one
      return { [id]: true };
    });
  };

  const services = [
    {
      id: 1,
      icon: Stethoscope,
      title: language === 'ar' ? 'الفحص الطبي الدوري' : 'Periodic Medical Examination',
      preview: language === 'ar' 
        ? 'في د. باوز، نؤمن بأن الرعاية الوقائية أساسية لحياة صحية مديدة لجميع الحيوانات الأليفة. فحوصاتنا الدورية، المعروفة أيضًا باسم فحوصات الصحة العامة أو الفحوصات الروتينية، تُعدّ جزءًا حيويًا من خدماتنا البيطرية الشاملة.'
        : 'At Dr. Paws, we believe preventative care is essential for a long and healthy life for all pets. Our periodic pet examinations, also known as wellness exams or checkups, are a crucial part of our comprehensive veterinary services.',
      fullContent: language === 'ar'
        ? `تُتيح هذه الزيارات الروتينية لأطبائنا تقييم صحة حيوانك الأليف بشكل عام، واكتشاف المشاكل المحتملة في وقت مبكر، وتقديم توصيات مُخصّصة لرعايتهم المُستمرة.

**الفحوصات الدورية للكلاب:**
خلال الفحص الطبي الدوري للكلاب، نُجري فحصًا بدنيًا شاملاً.

**الفحوصات الدورية للقطط:**
تُجرى الفحوصات الطبية الدورية للقطط بنهج لطيف وصبور، لتقليل التوتر على قطتك.

**الفحوصات الدورية للطيور:**
تتطلب الفحوصات الطبية الدورية للطيور معرفة متخصصة وتقنيات تعامل خاصة.

الفحوصات المنتظمة ضرورية للحفاظ على صحة حيوانك الأليف ومنع المشاكل الصحية الخطيرة.`
        : `These routine visits allow our veterinarians to assess your pet's overall health, detect potential problems early, and provide personalized recommendations for their ongoing care.

**Canine Periodic Pet Examinations:**
During a canine periodic medical examination, we perform a thorough physical examination.

**Feline Periodic Pet Examinations:**
Feline periodic medical examinations are performed with a gentle and patient approach, minimizing stress for your cat.

**Avian Periodic Pet Examinations:**
Avian periodic medical examinations require specialized knowledge and handling techniques.

Regular checkups are vital for maintaining your pet's well-being and preventing serious health issues.`,
      features: language === 'ar' ? [
        'العلامات الحيوية: فحص درجة الحرارة والنبض ومعدل التنفس',
        'سماع القلب والرئتين: الاستماع إلى القلب والرئتين',
        'فحص العيون: فحص العيون للكشف عن إعتام عدسة العين أو الجلوكوما',
        'فحص الأذنين: فحص الأذنين للكشف عن الالتهابات أو العث',
        'فحص الفم: تقييم الأسنان واللثة للكشف عن تراكم الجير',
        'فحص الجلد: فحص الجلد والفراء',
        'جس البطن: جس البطن للتحقق من تضخم الأعضاء',
        'تقييم الجهاز العضلي الهيكلي: تقييم المفاصل والعضلات'
      ] : [
        'Vital Signs: Checking temperature, pulse, and respiration rate',
        'Cardiopulmonary Auscultation: Listening to the heart and lungs',
        'Ophthalmologic Examination: Examining the eyes for cataracts, glaucoma',
        'Otoscopic Examination: Examining the ears for infections, mites',
        'Oral Examination: Assessing teeth and gums for tartar buildup',
        'Dermatological Examination: Examining skin and coat',
        'Abdominal Palpation: Checking for organ enlargement, masses',
        'Musculoskeletal Evaluation: Assessing joints and muscles'
      ],
    },
    {
      id: 2,
      icon: Sparkles,
      title: language === 'ar' ? 'خدمات العناية بالنظافة والمظهر' : 'Shower & Grooming Services',
      preview: language === 'ar'
        ? 'يُساهم الحفاظ على نظافة ومظهر حيوانك الأليف بشكل كبير في صحته العامة وراحته ورفاهيته. في د. باوز، نُقدّم مجموعة من خدمات عيادة رعاية نظافة الحيوانات الفعّالة والمُصمّمة للحفاظ على مظهر حيوانك الأليف بأفضل حال.'
        : 'Maintaining your pet\'s hygiene and appearance contributes significantly to their overall health, comfort, and well-being. At Dr. Paws, we offer a range of gentle and effective pet clean up services, designed to keep your pet looking and feeling their best.',
      fullContent: language === 'ar'
        ? `هذه الخدمات، على الرغم من أنها ليست طبية بحتة، إلا أنها جزء مهم من الرعاية الوقائية وتُكمّل خدماتنا البيطرية الأخرى.

خدماتنا للعناية بالنظافة تساعد في منع الانزعاج المؤلم والالتهابات ومشاكل الجلد مع الحفاظ على راحة حيوانك الأليف وصحته. نستخدم منتجات عالية الجودة وآمنة للحيوانات الأليفة وتقنيات تُقلّل التوتر.`
        : `These pet clean up services, while not strictly medical, are an important part of preventative care and complement our other veterinary services.

Our grooming services help prevent painful discomfort, infections, and skin problems while keeping your pet comfortable and healthy. We use high-quality, pet-safe products and techniques that minimize stress for your beloved companion.`,
      features: language === 'ar' ? [
        'تقليم الأظافر: تقليم منتظم لمنع النمو الزائد ومشاكل المفاصل',
        'تنظيف الأذنين: تنظيف لطيف لمنع الالتهابات وإزالة تراكم الشمع',
        'الاستحمام والتجفيف: خدمات مُهدّئة باستخدام شامبو وبلسم آمن',
        'تمشيط وقص الشعر: قصات شعر خاصة بالسلالات وخدمات فك التشابك'
      ] : [
        'Nail Clipping: Regular nail trims to prevent overgrowth and joint problems',
        'Ear Cleaning: Gentle cleaning to prevent infections and remove wax buildup',
        'Bath and Drying: Soothing services using pet-safe shampoos and conditioners',
        'Hair Combing and Cutting: Breed-specific haircuts and de-matting services'
      ],
    },
    {
      id: 3,
      icon: Microscope,
      title: language === 'ar' ? 'الاختبارات التشخيصية' : 'Diagnostic Tests',
      preview: language === 'ar'
        ? 'يُعدّ التشخيص الدقيق وفي الوقت المناسب أمرًا بالغ الأهمية للعلاج الفعّال. في مركز تحليل الحيوانات في د.باوز، نُقدّم مجموعة شاملة من خدمات التشخيص البيطرية لتقييم صحة حيوانك الأليف بسرعة ودقة.'
        : 'Accurate and timely diagnosis is crucial for effective treatment. At Dr. Paws, we offer a comprehensive range of diagnostic veterinary services to quickly and accurately assess your pet\'s health.',
      fullContent: language === 'ar'
        ? `مركز تحليل الحيوانات في د.باوز مُجهز بأحدث تقنيات التشخيص، مما يُتيح لنا إجراء مجموعة مُتنوعة من الاختبارات.

**التحاليل:**
• اختبارات الدم الكيميائية: تقييم وظائف الأعضاء (الكبد والكلى والبنكرياس)
• صورة الدم الكاملة: معلومات حول خلايا الدم والمكونات
• تحليل البول: تقييم وظائف الكلى والكشف عن الالتهابات
• فحوصات الطفيليات المعوية: فحص مجهري لعينات البراز
• فحوصات الأمراض الفطرية: اختبارات متنوعة
• فحوصات الأمراض الفيروسية: طرق تشخيصية متنوعة

**التصوير:**
• الأشعة السينية: صور تفصيلية للعظام والمفاصل والأعضاء
• أشعة الأسنان: تقييم صحة الأسنان
• الموجات فوق الصوتية: صور حية للأعضاء الداخلية

**التشخيصات المتقدمة:**
• الفحص المجهري: تحديد الخلايا والبكتيريا والطفيليات
• التنظير الداخلي والخارجي: رؤية داخل الأعضاء

تُمكّن هذه الخدمات التشخيصية البيطرية الشاملة أطباءنا من تحديد سبب مرض أو إصابة حيوانك الأليف ووضع خطة علاج دقيقة وفعّالة.`
        : `Our state-of-the-art facility is equipped with advanced diagnostic technology, allowing us to perform a variety of tests.

**Laboratory Testing:**
• Chemical Blood Tests: Evaluate organ function (liver, kidneys, pancreas)
• Complete Blood Count (CBC): Information about blood cells and components
• Urine Analysis: Assess kidney function and detect infections
• Intestinal Parasite Examinations: Microscopic examination of fecal samples
• Fungal Disease Examinations: Tests including microscopic examination and cultures
• Viral Disease Examinations: Various diagnostic methods to detect viral infections

**Imaging:**
• X-rays (Radiography): Detailed images of bones, joints, and internal organs
• Dental X-rays: Assess health of teeth and surrounding bone structures
• Ultrasound: Real-time images of internal organs

**Advanced Diagnostics:**
• Microscopic Examination: Identify cells, bacteria, parasites, or abnormalities
• Internal and External Endoscopy: Visualize inside of organs or body cavities

These comprehensive diagnostic veterinary services enable our veterinarians to pinpoint the cause of your pet's illness or injury and develop a precise and effective treatment plan.`,
      features: language === 'ar' ? [
        'التحاليل: فحوصات الدم، صورة الدم الكاملة، تحليل البول',
        'التصوير: الأشعة السينية، أشعة الأسنان، الموجات فوق الصوتية',
        'التشخيصات المتقدمة: الفحص المجهري، التنظير',
        'الكشف عن الطفيليات والأمراض: فحوصات شاملة'
      ] : [
        'Laboratory Testing: Blood tests, CBC, urine analysis',
        'Imaging: X-rays, Dental X-rays, Ultrasound',
        'Advanced Diagnostics: Microscopy, Endoscopy',
        'Parasite & Disease Detection: Comprehensive examinations'
      ],
    },
    {
      id: 4,
      icon: Scissors,
      title: language === 'ar' ? 'العمليات الجراحية' : 'Medical Surgeries',
      preview: language === 'ar'
        ? 'في د. باوز، يُجري أطباؤنا ذوو الخبرة الواسعة مجموعة واسعة من العمليات الجراحية باستخدام أحدث التقنيات والمعدات المتطورة. نتفهم أن جراحة الحيوانات الأليفة قد تكون وقتًا عصيبًا لكل من الحيوانات الأليفة وأصحابها.'
        : 'At Dr. Paws, our experienced veterinarians perform a wide range of medical surgeries using the latest techniques and state-of-the-art equipment. We understand that pet surgery can be a stressful time for both pets and their owners.',
      fullContent: language === 'ar'
        ? `نحن ملتزمون بتوفير بيئة آمنة ومريحة وداعمة طوال العملية.

**تشمل خدمات عيادة الجراحة البيطرية:**

• **عمليات التعقيم (الخصي/استئصال المبيض):** إجراءات روتينية تساعد في منع الحمل غير المرغوب فيه وتوفر فوائد صحية عديدة.

• **جراحة العظام للحيوانات الأليفة:** نعالج الكسور وتمزق الأربطة (تمزق الرباط الصليبي) وخلل تنسج الورك والكوع.

• **عمليات الجهاز الهضمي:** علاج حالات المعدة والأمعاء والكبد والبنكرياس بما في ذلك إزالة الأجسام الغريبة والخزعات.

• **تجميل الأنف (للسلالات قصيرة الأنف):** مصمم للسلالات قصيرة الأنف مثل كلاب البولدوج والباج والبوكسر لتحسين التنفس.

• **عمليات المسالك البولية:** معالجة حصوات المثانة وانسداد المسالك البولية.

قبل أي إجراء جراحي، نُجري تقييمًا شاملاً قبل الجراحة. نُعطي الأولوية لإدارة الألم طوال العملية الجراحية ونوفر رعاية شاملة بعد العملية.`
        : `We are committed to providing a safe, comfortable, and supportive environment throughout the entire process.

**Our comprehensive pet surgery services include:**

• **Sterilization Operations (Spay/Neuter):** Routine procedures that prevent unwanted litters and offer numerous health benefits.

• **Orthopedic surgery for pets:** We address fractures, ligament tears (cruciate ligament ruptures), hip and elbow dysplasia to restore mobility.

• **Digestive System Operations:** Treatment of conditions affecting the stomach, intestines, liver, pancreas including foreign body removal and biopsies.

• **Rhinoplasty (for Brachycephalic Breeds):** Designed for short-nosed breeds like Bulldogs, Pugs, and Boxers to improve breathing.

• **Urinary Tract Operations:** Address bladder stones, urinary obstructions, and other urinary system issues.

Prior to any pet surgery procedure, we conduct a thorough pre-surgical evaluation. We prioritize pain management throughout the surgical process and provide comprehensive post-operative care.`,
      features: language === 'ar' ? [
        'عمليات التعقيم (الخصي/استئصال المبيض)',
        'جراحة العظام: الكسور وتمزق الأربطة وخلل التنسج',
        'عمليات الجهاز الهضمي: إزالة الأجسام الغريبة والخزعات',
        'تجميل الأنف للسلالات قصيرة الأنف',
        'عمليات المسالك البولية: حصوات المثانة والانسداد'
      ] : [
        'Sterilization Operations (Spay/Neuter)',
        'Orthopedic Surgery: Fractures, ligament repairs, dysplasia',
        'Digestive System Operations: Foreign body removal, biopsies',
        'Rhinoplasty for Brachycephalic Breeds',
        'Urinary Tract Operations: Bladder stones, obstructions'
      ],
    },
    {
      id: 5,
      icon: Stethoscope,
      title: language === 'ar' ? 'خدمات طب الأسنان' : 'Dental Services',
      preview: language === 'ar'
        ? 'تُعدّ صحة الفم الجيدة أمرًا بالغ الأهمية لصحة ورفاهية حيوانك الأليف بشكل عام. يُقدّم د. باوز خدمات بيطرية شاملة للأسنان مُصمّمة للحفاظ على صحة أسنان ولثة حيوانك الأليف طوال حياته.'
        : 'Good oral hygiene is crucial for your pet\'s overall health and well-being. Dr. Paws offers comprehensive dental veterinary services designed to keep your pet\'s teeth and gums healthy throughout their lives.',
      fullContent: language === 'ar'
        ? `خدماتنا ضرورية لمنع أمراض اللثة التي يُمكن أن تُؤدّي إلى مشاكل صحية خطيرة تؤثر على القلب والكلى.

**تشمل خدماتنا:**

• **تنظيف الأسنان الاحترافي (الوقاية):** حجر الزاوية في الرعاية الوقائية للأسنان. نزيل تراكم البلاك والجير من فوق وتحت خط اللثة ونُلمّع الأسنان.

• **الفحوصات الشاملة للأسنان:** فحوصات منتظمة للكشف المُبكّر عن مشاكل الأسنان وقد نوصي بأشعة سينية للأسنان.

• **كشط وتنعيم الجذور:** يُزيل تراكم الجير ويُنعّم أسطح جذور الأسنان لعلاج أمراض اللثة.

• **خلع الأسنان:** في حالات أمراض الأسنان الشديدة، يُجري أطباؤنا عمليات الخلع مع الاهتمام الدقيق بإدارة الألم.

• **جراحة الفم:** إجراءات متقدمة لمشاكل الأسنان المعقدة مثل أورام الفم أو كسور الفك.

العناية المنتظمة بالأسنان ضرورية للحفاظ على صحة فم حيوانك الأليف وتحسين جودة حياته.`
        : `Our dental services are essential for preventing periodontal disease, which can lead to serious health problems affecting the heart, kidneys, and other organs.

**Our services include:**

• **Professional Teeth Cleaning (Prophylaxis):** The cornerstone of preventative dental care. We remove plaque and tartar buildup from above and below the gum line, then polish teeth.

• **Comprehensive Dental Check-ups:** Regular examinations for early detection of dental problems. We may recommend dental X-rays to evaluate tooth roots and surrounding bone.

• **Scaling and Root Planing:** Removes tartar buildup and smooths tooth root surfaces. Particularly important for treating periodontal disease.

• **Tooth Extractions:** In cases of severe dental disease or fractured teeth, performed with careful attention to pain management.

• **Oral Surgery:** Advanced procedures for complex dental issues such as oral tumors or jaw fractures.

Regular dental care is essential for maintaining your pet's oral health, improving their quality of life, and contributing to their overall well-being.`,
      features: language === 'ar' ? [
        'تنظيف الأسنان الاحترافي (الوقاية)',
        'الفحوصات الشاملة للأسنان والأشعة السينية',
        'كشط وتنعيم الجذور',
        'خلع الأسنان',
        'جراحة الفم المتقدمة'
      ] : [
        'Professional Teeth Cleaning (Prophylaxis)',
        'Comprehensive Dental Check-ups and X-rays',
        'Scaling and Root Planing',
        'Tooth Extractions',
        'Advanced Oral Surgery'
      ],
    },
    {
      id: 6,
      icon: Syringe,
      title: language === 'ar' ? 'التطعيمات الدورية' : 'Periodic Vaccinations',
      preview: language === 'ar'
        ? 'تُعدّ تطعيمات الحيوانات الأليفة حجر الزاوية في الخدمات البيطرية الوقائية، حيث تحمي حيوانك الأليف من مجموعة من الأمراض المُعدية التي يُحتمل أن تُهدّد حياته. في د. باوز، نُخصّص بروتوكولات تطعيماتنا بناءً على احتياجات حيوانك الفريدة.'
        : 'Pet vaccinations are a cornerstone of preventative veterinary services, protecting your pet from a range of contagious and potentially life-threatening diseases. At Dr. Paws, we tailor our vaccination protocols based on your pet\'s unique needs.',
      fullContent: language === 'ar'
        ? `نتفهم أن كل حيوان أليف فريد من نوعه، لذلك نُخصّص بروتوكولاتنا بناءً على نوع حيوانك وعمره ونمط حياته.

**تطعيمات القطط الثلاثي والرباعي:**
الحماية ضد فيروس الهربس (التهابات الجهاز التنفسي) والكاليسيفايروس (مشاكل تنفسية) والبانليفوبينيا (طاعون القطط). التطعيم الرباعي يضيف الحماية ضد لوكيميا القطط.

الفوائد: الحماية من الأمراض القاتلة، تقوية جهاز المناعة، الوقاية من انتشار الأمراض بين القطط.

**تطعيم الكلاب الخماسي:**
الحماية ضد خمسة أمراض: داء الكلب، داء البارفو، داء الأدنو الفيروسي، داء البارافلو، وداء البورديتيلا.

الفوائد: الحماية من الأمراض القاتلة، تقوية المناعة، منع انتشار الأمراض بين الكلاب.

**تطعيم السعار:**
من أهم التطعيمات للكلاب والقطط، يحمي من مرض فيروسي يصيب الجهاز العصبي ويمكن انتقاله للإنسان.

**تطعيمات الديدان:**
أدوية للقضاء على الديدان المعوية تُعطى بشكل دوري حسب توجيهات الطبيب البيطري.`
        : `We understand that every pet is unique, so we customize protocols based on your pet's species, age, lifestyle, and individual risk factors.

**Trivalent and Quadrivalent Cat Vaccines:**
Protection against feline herpesvirus (upper respiratory infections), calicivirus (respiratory problems), and panleukopenia (feline distemper). The quadrivalent vaccine adds protection against Feline Leukemia.

Benefits: Protection from fatal diseases, strengthening immunity, preventing disease spread among cats.

**Canine Pentavalent Vaccine:**
Protection against five diseases: Rabies, Parvovirus, Adenovirus, Parainfluenza, and Bordetella.

Benefits: Protection from fatal diseases, strengthening immunity, preventing disease spread among dogs.

**Rabies Vaccine:**
One of the most important vaccines for both dogs and cats, protecting against this viral disease that can be transmitted to humans.

**Deworming Medications:**
Medications to eliminate intestinal worms, given periodically as directed by the veterinarian.`,
      features: language === 'ar' ? [
        'تطعيمات القطط الثلاثي والرباعي',
        'تطعيم الكلاب الخماسي',
        'تطعيم السعار للكلاب والقطط',
        'أدوية الديدان'
      ] : [
        'Trivalent & Quadrivalent Cat Vaccines',
        'Canine Pentavalent Vaccine',
        'Rabies Vaccine for Dogs and Cats',
        'Deworming Medications'
      ],
    },
    {
      id: 7,
      icon: Plane,
      title: language === 'ar' ? 'إجراءات سفر الحيوانات الأليفة' : 'Pet Travel Procedures',
      preview: language === 'ar'
        ? 'يُمكن أن يكون السفر مع حيوانك الأليف تجربة مُجزية، ولكنه يتطلب تخطيطًا دقيقًا والالتزام بلوائح مُحددة. يُقدّم د. باوز خدمات شاملة لإجراءات سفر الحيوانات الأليفة لضمان سفر سلس وآمن.'
        : 'Traveling with your pet can be a rewarding experience, but it requires careful planning and adherence to specific regulations. Dr. Paws offers comprehensive pet travel procedures services to ensure smooth and safe pet travel.',
      fullContent: language === 'ar'
        ? `نتفهم أن لكل وجهة متطلبات فريدة، وفريقنا ذو الخبرة هنا لإرشادك سواء في الداخل أو دوليًا.

**تشمل خدماتنا البيطرية لإجراءات سفر الحيوانات الأليفة:**

• **الشهادات الصحية:** وثيقة رسمية تُثبت أن حيوانك الأليف يتمتع بصحة جيدة وخالٍ من الأمراض المُعدية، مطلوبة للسفر عبر حدود الولايات أو دوليًا. نُجري فحصًا بدنيًا شاملاً.

• **اختبار داء الكَلَب لأغراض السفر:** العديد من البلدان تتطلب إثباتًا للتطعيم ضد داء الكَلَب و/أو اختبارًا لمعايرة داء الكَلَب. نُقدّم الوثائق الرسمية المطلوبة للسفر الدولي. ملاحظة: غالبًا ما تكون هناك فترات انتظار.

• **ملء نماذج الشهادات:** نساعدك في ملء نماذج الشهادات الضرورية بدقة وكفاءة. نبقى على اطلاع بأحدث اللوائح بما في ذلك الدول الأوروبية والشهادات المُصدّقة من USDA APHIS.

نوصي بالاتصال بنا قبل أسابيع أو حتى أشهر من موعد سفرك لإتاحة وقت كافٍ للفحوصات والاختبارات والأوراق.`
        : `We understand that each destination has unique requirements, and our experienced team is here to guide you through the process, both domestically and internationally.

**Our pet travel veterinary services include:**

• **Health Certificates:** Official document verifying that your pet is healthy and free from contagious diseases, required for travel across state lines or internationally. We perform thorough physical examinations.

• **Rabies Testing for Travel Purposes:** Many countries require proof of rabies vaccination and/or a rabies titer test. We administer vaccinations and perform titer tests, providing official documentation. Note: waiting periods often apply.

• **Filling out Certificate Forms:** Our experienced team assists with completing complex paperwork. We stay up-to-date on regulations for various destinations, including European countries and those requiring USDA APHIS endorsed certificates.

We recommend contacting us several weeks or even months before your planned travel date to allow ample time for examinations, testing, and paperwork.`,
      features: language === 'ar' ? [
        'الشهادات الصحية للسفر المحلي والدولي',
        'اختبار وتطعيم داء الكَلَب للسفر',
        'ملء نماذج الشهادات والتصديق من USDA'
      ] : [
        'Health Certificates for domestic and international travel',
        'Rabies Testing and Vaccination for Travel',
        'Certificate Forms completion and USDA endorsement'
      ],
    },
    {
      id: 8,
      icon: Home,
      title: language === 'ar' ? 'خدمات الإقامة' : 'Boarding Services',
      preview: language === 'ar'
        ? 'في د. باوز، نتفهم أن ترك حيوانك الأليف قد يكون مُرهقًا. لهذا السبب نُقدّم خدمات الإقامة وفندقة الحيوانات المُريحة والرعاية كجزء من خدماتنا البيطرية الشاملة.'
        : 'At Dr. Paws, we understand that leaving your pet behind can be stressful. That\'s why we offer comfortable and caring boarding services as part of our comprehensive veterinary services, providing a true home away from home.',
      fullContent: language === 'ar'
        ? `نُلبي مجموعة مُتنوعة من الاحتياجات مع خيارات إقامة مُتخصّصة:

**فندق علاجي للحيوانات الأليفة:**
مصمم للحيوانات الأليفة التي تتطلب رعاية طبية مُتخصّصة:
• التعافي بعد الجراحة: مُراقبة دقيقة وإدارة للألم ومُساعدة في الحركة
• إدارة الحالات المُزمنة: رعاية فردية للسكري وأمراض الكلى والقلب
• الحيوانات التي تتطلب مُراقبة دقيقة: ملاحظة مُتكررة ومراقبة العلامات الحيوية

**فندق للحيوانات وعلاج الفطريات:**
إيواء متخصص للحيوانات التي تخضع لعلاج من الالتهابات الفطرية:
• العزل: بيئة مُنفصلة ومعزولة لمنع انتقال العدوى
• بروتوكولات تنظيف وتطهير متخصصة: نظافة صارمة
• إعطاء الأدوية المُضادة للفطريات: وفقًا لتعليمات الطبيب
• مُراقبة تقدّم العلاج: ملاحظة دقيقة لضمان الفعالية

خدمات الإقامة لدينا تضمن حصول حيوانك الأليف على رعاية احترافية وانتباه أثناء غيابك.`
        : `We cater to a variety of needs with specialized boarding options:

**Therapeutic Pet Hotel:**
Designed for pets requiring specialized medical care:
• Post-surgical recovery: Close monitoring, pain management, mobility assistance
• Management of chronic conditions: Individualized care for diabetes, kidney disease, heart disease
• Pets requiring close monitoring: Frequent observation, vital signs monitoring, medication administration

**Pet Hotel and Fungi Treatment:**
Specialized boarding for pets undergoing fungal infection treatment:
• Isolation: Separate environment to prevent cross-contamination
• Specialized cleaning and disinfection protocols: Strict hygiene to prevent fungal spores
• Administration of antifungal medications: Prescribed medications according to veterinarian's instructions
• Monitoring of treatment progress: Close observation to ensure treatment effectiveness

Our boarding services ensure your pet receives professional care and attention while you're away.`,
      features: language === 'ar' ? [
        'فندق علاجي: التعافي بعد الجراحة وإدارة الحالات المزمنة',
        'إقامة متخصصة لعلاج الفطريات: بيئة معزولة مع بروتوكولات صارمة'
      ] : [
        'Therapeutic Pet Hotel: Post-surgical recovery and chronic condition management',
        'Specialized Fungi Treatment Boarding: Isolated environment with strict protocols'
      ],
    },
    {
      id: 9,
      icon: Heart,
      title: language === 'ar' ? 'العناية المركزة' : 'Intensive Care',
      preview: language === 'ar'
        ? 'في عيادة د. باوز البيطرية، نتفهم أن الأمراض والإصابات الخطيرة تتطلب رعاية مُتخصّصة. وحدة العناية المركزة للحيوانات الأليفة لدينا مُصمّمة لتوفير مُراقبة وعلاج مُتقدّمين للحيوانات الأليفة في الحالات التي تُهدّد حياتها.'
        : 'At Dr. Paws Veterinary Clinic, we understand that critical illnesses and injuries require specialized care. Our pet intensive care unit (ICU) is a dedicated space designed to provide advanced monitoring and treatment for pets in life-threatening conditions.',
      fullContent: language === 'ar'
        ? `فريقنا البيطري مُدرّب على طب الحالات الحرجة ويستخدم أحدث المُعدّات لتوفير رعاية على مدار الساعة.

**تُركّز خدمات مركز العناية بالحيوانات على إدارة وعلاج:**

• **فشل الأعضاء:**
  - الفشل الكلوي: علاج مُتقدّم بالسوائل وإدارة للكهارل ورعاية داعمة
  - الفشل الكبدي: علاجات متخصصة لدعم وظائف الكبد
  - فشل القلب: مُراقبة مُتقدّمة للقلب وعلاج بالأكسجين

• **الاضطرابات الأيضية:** إدارة حالات معقدة مثل داء السكري ومرض كوشينغ ومرض أديسون.

• **أمراض الغدد الصماء:** رعاية متخصصة لقصور الغدة الدرقية وفرط نشاط الغدة الدرقية والسكري الكاذب.

• **الإصابات الشديدة:** رعاية فورية شاملة للكسور والإصابات الداخلية والجروح الشديدة.

• **حالات حرجة أخرى:** الإنتان، ضيق التنفس، الحالات العصبية، مُضاعفات ما بعد الجراحة.

فريقنا مُكرس لتوفير رعاية بيطرية مركزة لإعطاء حيوانك الأليف أفضل فرصة للتعافي.`
        : `Our experienced veterinary team is trained in critical care medicine and utilizes state-of-the-art equipment to provide around-the-clock care.

**Our ICU services focus on managing and treating:**

• **Organ Failure:**
  - Kidney Failure: Advanced fluid therapy, electrolyte management, supportive care
  - Liver Failure: Specialized treatments to support liver function and manage complications
  - Heart Failure: Advanced cardiac monitoring, oxygen therapy, medication management

• **Metabolic Disorders:** Management of complex conditions such as diabetes mellitus, Cushing's disease, and Addison's disease.

• **Endocrine Diseases:** Specialized care for hypothyroidism, hyperthyroidism, and diabetes insipidus to regulate hormone levels.

• **Severe Injuries:** Immediate comprehensive care for traumatic injuries, including fractures, internal injuries, and severe wounds.

• **Other Critical Conditions:** Sepsis, respiratory distress, neurological conditions, post-operative complications.

Our team is dedicated to providing compassionate and intensive veterinary services to give your pet the best possible chance of recovery.`,
      features: language === 'ar' ? [
        'علاج فشل الأعضاء: الكلى والكبد والقلب',
        'الاضطرابات الأيضية: السكري وكوشينغ وأديسون',
        'أمراض الغدد الصماء: اضطرابات الغدة الدرقية والسكري الكاذب',
        'الإصابات الشديدة: الكسور والإصابات الداخلية',
        'حالات حرجة: الإنتان وضيق التنفس والرعاية العصبية'
      ] : [
        'Organ Failure Treatment: Kidney, Liver, Heart',
        'Metabolic Disorders: Diabetes, Cushing\'s, Addison\'s disease',
        'Endocrine Diseases: Thyroid disorders, diabetes insipidus',
        'Severe Injuries: Trauma care, fractures, internal injuries',
        'Critical Conditions: Sepsis, respiratory distress, neurological care'
      ],
    },
    {
      id: 10,
      icon: AlertCircle,
      title: language === 'ar' ? 'خدمات الطوارئ' : 'Emergency Services',
      preview: language === 'ar'
        ? 'يُمكن أن تكون حالات الطوارئ للحيوانات الأليفة تجربة مُخيفة. في د. باوز، نتفهم مدى إلحاح وضغط هذه المواقف. نُقدّم خدمات بيطرية من خلال عيادة بيطرية طوارئ للحيوانات الأليفة.'
        : 'Pet emergencies can be a frightening experience for both you and your beloved companion. At Dr. Paws, we understand the urgency and stress of these situations. We provide veterinary services through our emergency pet clinic during our regular business hours.',
      fullContent: language === 'ar'
        ? `فريقنا المُتخصّص مُستعد للتعامل مع مجموعة واسعة من الحالات الطبية الطارئة.

**أمثلة على حالات الطوارئ التي نُعالجها:**

• **الصدمات (الاصطدام بسيارة، السقوط):** تقييم وعلاج فوري للكسور والإصابات الداخلية والحالات المُتعلّقة بالصدمات.

• **صعوبة التنفس:** حالة طارئة تُهدّد الحياة. إذا كان حيوانك الأليف يُعاني من صعوبة في التنفس أو يلهث أو لديه لثة زرقاء، اطلب رعاية فورية.

• **نزيف حاد:** تدخل بيطري سريع للنزيف غير المُسيطر عليه.

• **التسمم:** علاج لابتلاع مواد سامة. اتصل بنا أو بخط المُساعدة الخاص بالتسمم فورًا.

• **النوبات:** تحديد السبب والعلاج المُناسب للنوبات العصبية أو الأيضية.

• **الانتفاخ (توسع المعدة والالتواء):** حالة تُهدّد الحياة شائعة في الكلاب الكبيرة تتطلب تدخلاً فوريًا.

**أرقام الطوارئ:**
فرع الصحافة: 05520 30564
فرع الماثر: 05313 53667

سيُقدّم فريقنا إرشادات ويستعد لوصولك. هدفنا توفير رعاية سريعة وفعّالة عندما يكون حيوانك الأليف في أمس الحاجة إليها.`
        : `Our dedicated team is prepared to handle a wide range of urgent medical situations.

**Examples of emergencies we treat include:**

• **Trauma (Hit by Car, Falls):** Immediate assessment and treatment of fractures, internal injuries, and trauma-related conditions.

• **Difficulty Breathing:** Life-threatening respiratory distress. If your pet is struggling to breathe, gasping, or has blue-tinged gums, seek immediate care.

• **Severe Bleeding:** Prompt intervention for uncontrolled internal or external bleeding.

• **Poisoning:** Treatment for toxic substance ingestion. Contact us or the Pet Poison Helpline immediately if suspected.

• **Seizures:** Evaluation and treatment to determine cause and appropriate management.

• **Bloat (Gastric Dilatation-Volvulus):** Life-threatening condition requiring immediate intervention, common in large breed dogs.

**Emergency Contact:**
Al-Sahafa Branch: 05520 30564
Al-Mather Branch: 05313 53667

If your pet is experiencing any urgent medical issues, please call our emergency pet clinic immediately. Our emergency team will provide guidance and prepare for your arrival. Our goal is to provide swift, effective, and compassionate care when your pet needs it most.`,
      features: language === 'ar' ? [
        'الصدمات: الاصطدام بسيارة، السقوط، الحوادث',
        'صعوبة التنفس: ضيق التنفس',
        'نزيف حاد: داخلي وخارجي',
        'التسمم: ابتلاع مواد سامة',
        'النوبات: طوارئ عصبية',
        'الانتفاخ: توسع المعدة والالتواء'
      ] : [
        'Trauma: Hit by car, falls, accidents',
        'Difficulty Breathing: Respiratory distress',
        'Severe Bleeding: Internal and external',
        'Poisoning: Toxic substance ingestion',
        'Seizures: Neurological emergencies',
        'Bloat: Gastric Dilatation-Volvulus'
      ],
      emergency: true,
    },
    {
      id: 11,
      icon: Pill,
      title: language === 'ar' ? 'خدمات الرعاية المنزلية' : 'Home Care Services',
      preview: language === 'ar'
        ? 'نتفهم أن زيارة عيادة بيطرية قد تكون صعبة بالنسبة لبعض الحيوانات الأليفة وأصحابها. سواء كان حيوانك الأليف يُعاني من القلق أثناء السفر أو لديه مشاكل في الحركة أو كنت تُفضّل راحة الرعاية في المنزل، يُقدّم د. باوز خدمات بيطرية للرعاية المنزلية.'
        : 'We understand that visiting a veterinary clinic can be challenging for some pets and their owners. Whether your pet experiences anxiety during travel, has mobility issues, or you simply prefer the convenience of in-home care, Dr. Paws offers compassionate home care veterinary services.',
      fullContent: language === 'ar'
        ? `نجلب خبرتنا إليك مُباشرةً، مما يضمن حصول حيوانك الأليف على الاهتمام الضروري مع تقليل التوتر.

**قد تشمل خدمات الرعاية المنزلية:**

• **الفحوصات الصحية:** فحوصات صحية روتينية في راحة منزلك، تقييم صحة حيوانك الأليف بشكل عام وفحص العلامات الحيوية. مُفيد بشكل خاص للحيوانات الأليفة الكبيرة في السن أو تلك التي تُعاني من قيود في الحركة.

• **التطعيمات:** إعطاء التطعيمات الضرورية في المنزل، حماية حيوانك الأليف من الأمراض دون ضغوط زيارة العيادة.

• **جمع العينات:** جمع عينات الدم أو البول أو البراز في منزلك للاختبارات التشخيصية، مما يُقلّل من التوتر على حيوانك الأليف.

خدماتنا البيطرية للرعاية المنزلية مُصمّمة لتوفير رعاية يسهل الوصول إليها، مما يضمن حصول حيوانك الأليف على الاهتمام الضروري في بيئة مألوفة ومريحة. يُرجى الاتصال بنا لمُناقشة احتياجات حيوانك الأليف.`
        : `We bring our expertise directly to you, ensuring your pet receives the necessary attention while minimizing stress.

**Our home care services may include:**

• **Wellness Exams:** Routine wellness exams in the comfort of your home, assessing overall health, checking vital signs, and discussing any concerns. Especially beneficial for senior pets or those with mobility limitations.

• **Vaccinations:** Administer necessary vaccinations at home, protecting your pet from preventable diseases without the stress of a clinic visit.

• **Sample Collection:** Collect blood, urine, or fecal samples in your home for diagnostic testing, minimizing stress for your pet.

Our home care veterinary services are designed to provide accessible and compassionate care, ensuring your pet receives the necessary attention in a familiar, comfortable environment. Please contact us to discuss your pet's needs and determine if a home visit is the right option.`,
      features: language === 'ar' ? [
        'الفحوصات الصحية: تقييمات صحية روتينية في المنزل',
        'التطعيمات: خدمات التطعيم في المنزل',
        'جمع العينات: الدم والبول والبراز للاختبارات'
      ] : [
        'Wellness Exams: Routine health assessments at home',
        'Vaccinations: In-home vaccination services',
        'Sample Collection: Blood, urine, fecal samples for testing'
      ],
    },
  ];

  const ServiceCard = ({ service, isInView }: { service: typeof services[0]; isInView: boolean }) => {
    const Icon = service.icon;
    const isExpanded = expandedCards[service.id];
    
    const lordIconConfig: Record<number, string> = {
      1: 'https://cdn.lordicon.com/fdjmqgqo.json',
      2: 'https://cdn.lordicon.com/qrbnmuva.json',
      3: 'https://cdn.lordicon.com/xtqxtpiq.json',
      4: 'https://cdn.lordicon.com/ebchswfj.json',
      5: 'https://cdn.lordicon.com/qgvewybt.json',
      6: 'https://cdn.lordicon.com/ssjzuqhe.json',
      7: 'https://cdn.lordicon.com/xvidkckm.json',
      8: 'https://cdn.lordicon.com/nejoxqhx.json',
      9: 'https://cdn.lordicon.com/rqeluyar.json',
      10: 'https://cdn.lordicon.com/njkwpvad.json',
      11: 'https://cdn.lordicon.com/npehekun.json',
    };
    
    const hasLordIcon = lordIconConfig[service.id];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="h-full"
      >
        <Card
          className={`h-full flex flex-col hover-elevate ${
            service.emergency ? 'border-[#e9c46a]' : ''
          }`}
          data-testid={`card-service-${service.id}`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <CardHeader>
            <CardTitle
              className={`text-[#18ac61] ${
                hasLordIcon ? 'flex items-center gap-3' : ''
              }`}
              data-testid={`title-service-${service.id}`}
            >
              {hasLordIcon && (
                <lord-icon
                  src={lordIconConfig[service.id]}
                  trigger="loop"
                  delay="1500"
                  style={{ width: '60px', height: '60px' }}
                />
              )}
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            {/* Preview text - always visible */}
            <p
              className="text-foreground/80 mb-4"
              data-testid={`preview-service-${service.id}`}
            >
              {service.preview}
            </p>

            {/* Expanded content - shown when Read More is clicked */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key={`expanded-${service.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Full content */}
                  {service.fullContent && (
                    <div className="mb-4 text-foreground/80 whitespace-pre-line">
                      {service.fullContent}
                    </div>
                  )}

                  {/* Features list */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground/70 flex items-start gap-2"
                        data-testid={`feature-service-${service.id}-${idx}`}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#18ac61] mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Read More / Show Less button */}
            {service.fullContent && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(service.id)}
                className="mb-4 mt-auto"
                data-testid={`button-expand-${service.id}`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    {language === 'ar' ? 'عرض أقل' : 'Show less'}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    {language === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                  </>
                )}
              </Button>
            )}

            {/* Book appointment button */}
            <Link href="/book-now">
              <Button
                className="w-full"
                data-testid={`button-book-${service.id}`}
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
      <ECGAnimation />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[400px] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
            <img
              src={servicesHeroImage}
              alt="Veterinary Services"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-20 text-center px-6"
          >
            <h1
              className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
              data-testid="text-services-header"
            >
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h1>
            <p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              data-testid="text-services-subheader"
            >
              {language === 'ar' 
                ? 'نقدم نطاقًا كاملاً من الرعاية لحيواناتكم الأليفة، من الفحوصات الروتينية إلى العلاجات المتقدمة'
                : 'Comprehensive & Specialized Care for Your Pets'
              }
            </p>
          </motion.div>
        </section>

        {/* Services Grid 1 */}
        <section ref={servicesRef1} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} isInView={servicesInView1} />
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 1 */}
        <motion.section
          ref={imageRef1}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={imageInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={vetExamImage}
                  alt="Veterinary examination"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-services-1"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={imageInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="space-y-6"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <h2 className="text-3xl font-bold text-primary">
                  {language === 'ar' ? 'رعاية شاملة ومتخصصة' : 'Comprehensive & Specialized Care'}
                </h2>
                <p className="text-lg text-foreground/90">
                  {language === 'ar' 
                    ? 'في عيادات د. باوز، نقدم مجموعة واسعة من الخدمات البيطرية المتخصصة باستخدام أحدث المعدات والتقنيات لضمان صحة وسعادة حيوانك الأليف.'
                    : 'At Dr. Paws, we offer a wide range of specialized veterinary services using the latest equipment and technology to ensure your pet\'s health and happiness.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Grid 2 */}
        <section ref={servicesRef2} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(3, 7).map((service) => (
                <ServiceCard key={service.id} service={service} isInView={servicesInView2} />
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <motion.section
          ref={imageRef2}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={imageInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="md:order-2"
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={consultationImage}
                  alt="Veterinary consultation"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-services-2"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={imageInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="space-y-6 md:order-1"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <h2 className="text-3xl font-bold text-primary">
                  {language === 'ar' ? 'فريق محترف ومتفاني' : 'Professional & Dedicated Team'}
                </h2>
                <p className="text-lg text-foreground/90">
                  {language === 'ar' 
                    ? 'فريقنا من الأطباء البيطريين ذوي الخبرة ملتزم بتقديم أفضل رعاية ممكنة لحيواناتكم الأليفة مع الاهتمام بكل التفاصيل.'
                    : 'Our team of experienced veterinarians is committed to providing the best possible care for your pets with attention to every detail.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Grid 3 */}
        <section ref={servicesRef3} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(7, 10).map((service) => (
                <ServiceCard key={service.id} service={service} isInView={servicesInView3} />
              ))}
            </div>
          </div>
        </section>

        {/* Home Care Section */}
        <motion.section
          ref={homeCareRef}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={homeCareInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={teamImage}
                  alt="Veterinary team"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-home-care-left"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={homeCareInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <ServiceCard service={services[10]} isInView={homeCareInView} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={homeCareInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={vetExamImage}
                  alt="Home care service"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-home-care-right"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <HeartbeatDivider />
      <Footer />
    </div>
  );
}
