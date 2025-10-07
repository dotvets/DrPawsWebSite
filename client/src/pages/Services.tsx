import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
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
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const services = [
    {
      id: 1,
      icon: Stethoscope,
      title: 'Periodic Medical Examination',
      preview: 'At Dr. Paws, we believe preventative care is essential for a long and healthy life for all pets. Our periodic pet examinations, also known as wellness exams or checkups, are a crucial part of our comprehensive veterinary services.',
      fullContent: `These routine visits allow our veterinarians to assess your pet's overall health, detect potential problems early, and provide personalized recommendations for their ongoing care.

**Canine Periodic Pet Examinations:**
During a canine periodic medical examination, we perform a thorough physical examination, including:

**Feline Periodic Pet Examinations:**
Feline periodic medical examinations are performed with a gentle and patient approach, minimizing stress for your cat. The examination includes vital signs, cardiopulmonary auscultation, ophthalmologic and otoscopic examinations, oral examination, palpation of the abdomen and lymph nodes, and assessment of coat and skin.

**Avian Periodic Pet Examinations:**
Avian periodic medical examinations require specialized knowledge and handling techniques. Our avian exams include physical examination, weight and body condition scoring, examination of the uropygial gland, and palpation of the abdomen.

Regular checkups are vital for maintaining your pet's well-being and preventing serious health issues. We recommend the frequency of these exams based on your pet's species, age, breed, and health history.`,
      features: [
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
      title: 'Shower & Grooming Services',
      preview: 'Maintaining your pet\'s hygiene and appearance contributes significantly to their overall health, comfort, and well-being. At Dr. Paws, we offer a range of gentle and effective pet clean up services, designed to keep your pet looking and feeling their best.',
      fullContent: `These pet clean up services, while not strictly medical, are an important part of preventative care and complement our other veterinary services.

Our grooming services help prevent painful discomfort, infections, and skin problems while keeping your pet comfortable and healthy. We use high-quality, pet-safe products and techniques that minimize stress for your beloved companion.`,
      features: [
        'Nail Clipping: Regular nail trims to prevent overgrowth and joint problems',
        'Ear Cleaning: Gentle cleaning to prevent infections and remove wax buildup',
        'Bath and Drying: Soothing services using pet-safe shampoos and conditioners',
        'Hair Combing and Cutting: Breed-specific haircuts and de-matting services'
      ],
    },
    {
      id: 3,
      icon: Microscope,
      title: 'Diagnostic Tests',
      preview: 'Accurate and timely diagnosis is crucial for effective treatment. At Dr. Paws, we offer a comprehensive range of diagnostic veterinary services to quickly and accurately assess your pet\'s health.',
      fullContent: `Our state-of-the-art facility is equipped with advanced diagnostic technology, allowing us to perform a variety of tests.

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
      features: [
        'Laboratory Testing: Blood tests, CBC, urine analysis',
        'Imaging: X-rays, Dental X-rays, Ultrasound',
        'Advanced Diagnostics: Microscopy, Endoscopy',
        'Parasite & Disease Detection: Comprehensive examinations'
      ],
    },
    {
      id: 4,
      icon: Scissors,
      title: 'Medical Surgeries',
      preview: 'At Dr. Paws, our experienced veterinarians perform a wide range of medical surgeries using the latest techniques and state-of-the-art equipment. We understand that pet surgery can be a stressful time for both pets and their owners.',
      fullContent: `We are committed to providing a safe, comfortable, and supportive environment throughout the entire process.

**Our comprehensive pet surgery services include:**

• **Sterilization Operations (Spay/Neuter):** Routine procedures that prevent unwanted litters and offer numerous health benefits, including reducing the risk of certain cancers and behavioral problems.

• **Orthopedic surgery for pets:** We address fractures, ligament tears (cruciate ligament ruptures), hip and elbow dysplasia, and other orthopedic issues to restore mobility and improve quality of life.

• **Digestive System Operations:** Treatment of conditions affecting the stomach, intestines, liver, pancreas including foreign body removal, biopsies, and bloat treatment.

• **Rhinoplasty (for Brachycephalic Breeds):** Designed for short-nosed breeds like Bulldogs, Pugs, and Boxers to improve breathing and alleviate BOAS.

• **Urinary Tract Operations:** Address bladder stones, urinary obstructions, and other urinary system issues.

Prior to any pet surgery procedure, we conduct a thorough pre-surgical evaluation, including a physical exam, blood work, and other necessary tests. We prioritize pain management throughout the surgical process and provide comprehensive post-operative care to ensure a smooth and comfortable recovery.`,
      features: [
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
      title: 'Dental Services',
      preview: 'Good oral hygiene is crucial for your pet\'s overall health and well-being. Dr. Paws offers comprehensive dental veterinary services designed to keep your pet\'s teeth and gums healthy throughout their lives.',
      fullContent: `Our dental services are essential for preventing periodontal disease, which can lead to serious health problems affecting the heart, kidneys, and other organs.

**Our services include:**

• **Professional Teeth Cleaning (Prophylaxis):** The cornerstone of preventative dental care. We remove plaque and tartar buildup from above and below the gum line using specialized instruments, then polish teeth to create a smooth surface less susceptible to plaque.

• **Comprehensive Dental Check-ups:** Regular examinations for early detection of dental problems, checking for gum disease, tooth decay, oral tumors, and other abnormalities. We may recommend dental X-rays to evaluate tooth roots and surrounding bone.

• **Scaling and Root Planing:** Removes tartar buildup and smooths tooth root surfaces, making it more difficult for plaque to adhere. Particularly important for treating periodontal disease.

• **Tooth Extractions:** In cases of severe dental disease or fractured teeth, performed with careful attention to pain management and patient comfort.

• **Oral Surgery:** Advanced procedures for complex dental issues such as oral tumors or jaw fractures.

Regular dental care is essential for maintaining your pet's oral health, improving their quality of life, and contributing to their overall well-being.`,
      features: [
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
      title: 'Periodic Vaccinations',
      preview: 'Pet vaccinations are a cornerstone of preventative veterinary services, protecting your pet from a range of contagious and potentially life-threatening diseases. At Dr. Paws, we tailor our vaccination protocols based on your pet\'s unique needs.',
      fullContent: `We understand that every pet is unique, so we customize protocols based on your pet's species, age, lifestyle, and individual risk factors.

**Trivalent and Quadrivalent Cat Vaccines:**
Protection against feline herpesvirus (upper respiratory infections), calicivirus (respiratory problems), and panleukopenia (feline distemper). The quadrivalent vaccine adds protection against Feline Leukemia.

Benefits: Protection from fatal diseases, strengthening the immune system, preventing disease spread among cats.

**Canine Pentavalent Vaccine:**
Protection against five diseases: Rabies, Parvovirus, Adenovirus, Parainfluenza, and Bordetella.

Benefits: Protection from fatal diseases, strengthening immunity, preventing disease spread among dogs.

**Rabies Vaccine:**
One of the most important vaccines for both dogs and cats, protecting against this viral disease that affects the nervous system and can be transmitted to humans.

**Deworming Medications:**
Medications to eliminate intestinal worms, given periodically as directed by the veterinarian.

Our veterinary services team will discuss the appropriate vaccination and deworming schedule for your pet and answer any questions you may have.`,
      features: [
        'Trivalent & Quadrivalent Cat Vaccines',
        'Canine Pentavalent Vaccine',
        'Rabies Vaccine for Dogs and Cats',
        'Deworming Medications'
      ],
    },
    {
      id: 7,
      icon: Plane,
      title: 'Pet Travel Procedures',
      preview: 'Traveling with your pet can be a rewarding experience, but it requires careful planning and adherence to specific regulations. Dr. Paws offers comprehensive pet travel procedures services to ensure smooth and safe pet travel.',
      fullContent: `We understand that each destination has unique requirements, and our experienced team is here to guide you through the process, both domestically and internationally.

**Our pet travel veterinary services include:**

• **Health Certificates:** Official document verifying that your pet is healthy and free from contagious diseases, required for travel across state lines or internationally. We perform thorough physical examinations to ensure compliance with health standards.

• **Rabies Testing for Travel Purposes:** Many countries require proof of rabies vaccination and/or a rabies titer test. We administer vaccinations and perform titer tests, providing official documentation that meets specific country requirements. Note: waiting periods often apply after vaccination or testing.

• **Filling out Certificate Forms:** Our experienced team assists with completing complex paperwork for international pet travel. We stay up-to-date on regulations for various destinations, including European countries and those requiring USDA APHIS endorsed certificates.

These veterinary services are designed to make the process as stress-free as possible. We recommend contacting us several weeks or even months before your planned travel date to allow ample time for examinations, testing, and paperwork.`,
      features: [
        'Health Certificates for domestic and international travel',
        'Rabies Testing and Vaccination for Travel',
        'Certificate Forms completion and USDA endorsement'
      ],
    },
    {
      id: 8,
      icon: Home,
      title: 'Boarding Services',
      preview: 'At Dr. Paws, we understand that leaving your pet behind can be stressful. That\'s why we offer comfortable and caring boarding services as part of our comprehensive veterinary services, providing a true home away from home.',
      fullContent: `We cater to a variety of needs with specialized boarding options:

**Therapeutic Pet Hotel:**
Designed for pets requiring specialized medical care during their stay:
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
      features: [
        'Therapeutic Pet Hotel: Post-surgical recovery and chronic condition management',
        'Specialized Fungi Treatment Boarding: Isolated environment with strict protocols'
      ],
    },
    {
      id: 9,
      icon: Heart,
      title: 'Intensive Care',
      preview: 'At Dr. Paws Veterinary Clinic, we understand that critical illnesses and injuries require specialized care. Our pet intensive care unit (ICU) is a dedicated space designed to provide advanced monitoring and treatment for pets in life-threatening conditions.',
      fullContent: `Our experienced veterinary team is trained in critical care medicine and utilizes state-of-the-art equipment to provide around-the-clock care.

**Our ICU services focus on managing and treating:**

• **Organ Failure:**
  - Kidney Failure: Advanced fluid therapy, electrolyte management, supportive care
  - Liver Failure: Specialized treatments to support liver function and manage complications
  - Heart Failure: Advanced cardiac monitoring, oxygen therapy, medication management

• **Metabolic Disorders:** Management of complex conditions such as diabetes mellitus, Cushing's disease, and Addison's disease through careful monitoring and nutritional support.

• **Endocrine Diseases:** Specialized care for hypothyroidism, hyperthyroidism, and diabetes insipidus to regulate hormone levels.

• **Severe Injuries:** Immediate comprehensive care for traumatic injuries, including fractures, internal injuries, and severe wounds with pain management and surgical intervention.

• **Other Critical Conditions:** Sepsis, respiratory distress, neurological conditions, post-operative complications.

Our team is dedicated to providing compassionate and intensive veterinary services to give your pet the best possible chance of recovery.`,
      features: [
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
      title: 'Emergency Services',
      preview: 'Pet emergencies can be a frightening experience for both you and your beloved companion. At Dr. Paws, we understand the urgency and stress of these situations. We provide veterinary services through our emergency pet clinic during our regular business hours.',
      fullContent: `Our dedicated team is prepared to handle a wide range of urgent medical situations.

**Examples of emergencies we treat include:**

• **Trauma (Hit by Car, Falls):** Immediate assessment and treatment of fractures, internal injuries, and trauma-related conditions.

• **Difficulty Breathing:** Life-threatening respiratory distress requiring immediate veterinary care.

• **Severe Bleeding:** Prompt intervention for uncontrolled internal or external bleeding.

• **Poisoning:** Treatment for toxic substance ingestion. Contact us or the Pet Poison Helpline immediately if suspected.

• **Seizures:** Evaluation and treatment to determine cause and appropriate management.

• **Bloat (Gastric Dilatation-Volvulus):** Life-threatening condition requiring immediate intervention, common in large breed dogs.

**Emergency Contact:**
Al-Sahafa Branch Emergency: 05520 30564
Al-Mather Branch Emergency: 05313 53667

If your pet is experiencing any urgent medical issues, please call our emergency pet clinic immediately. Our emergency team will provide guidance and prepare for your arrival. Our goal is to provide swift, effective, and compassionate care when your pet needs it most.`,
      features: [
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
      title: 'Home Care Services',
      preview: 'We understand that visiting a veterinary clinic can be challenging for some pets and their owners. Whether your pet experiences anxiety during travel, has mobility issues, or you simply prefer the convenience of in-home care, Dr. Paws offers compassionate home care veterinary services.',
      fullContent: `We bring our expertise directly to you, ensuring your pet receives the necessary attention while minimizing stress.

**Our home care services may include:**

• **Wellness Exams:** Routine wellness exams in the comfort of your home, assessing overall health, checking vital signs, and discussing any concerns. Especially beneficial for senior pets or those with mobility limitations.

• **Vaccinations:** Administer necessary vaccinations at home, protecting your pet from preventable diseases without the stress of a clinic visit.

• **Sample Collection:** Collect blood, urine, or fecal samples in your home for diagnostic testing, minimizing stress for your pet.

Our home care veterinary services are designed to provide accessible and compassionate care, ensuring your pet receives the necessary attention in a familiar, comfortable environment. Please contact us to discuss your pet's needs and determine if a home visit is the right option.`,
      features: [
        'Wellness Exams: Routine health assessments at home',
        'Vaccinations: In-home vaccination services',
        'Sample Collection: Blood, urine, fecal samples for testing'
      ],
    },
  ];

  const ServiceCard = ({ service }: { service: typeof services[0] }) => {
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
        animate={{ opacity: 1, y: 0 }}
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
            {isExpanded && (
              <motion.div
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

            {/* Emergency contact info */}
            {service.emergency && (
              <div className="mb-4 p-3 bg-[#e9c46a]/10 rounded-md">
                <p className="text-sm font-semibold text-[#264653] mb-2">
                  Emergency Numbers:
                </p>
                <p className="text-sm text-foreground/80">
                  Al-Sahafa Branch: 05520 30564
                </p>
                <p className="text-sm text-foreground/80">
                  Al-Mather Branch: 05313 53667
                </p>
              </div>
            )}

            {/* Book appointment button */}
            <Link href="/#contact">
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
                ? 'رعاية شاملة ومتخصصة لحيواناتكم الأليفة'
                : 'Comprehensive & Specialized Care for Your Pets'
              }
            </p>
          </motion.div>
        </section>

        {/* Services Grid 1 */}
        <section ref={servicesRef1} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 1 */}
        <motion.section
          ref={imageRef1}
          className="py-16 bg-card"
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
        <section ref={servicesRef2} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(3, 7).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <motion.section
          ref={imageRef2}
          className="py-16 bg-card"
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
        <section ref={servicesRef3} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(7, 10).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Home Care Section */}
        <motion.section
          ref={homeCareRef}
          className="py-16 bg-card"
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
                <ServiceCard service={services[10]} />
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

      <Footer />
    </div>
  );
}
