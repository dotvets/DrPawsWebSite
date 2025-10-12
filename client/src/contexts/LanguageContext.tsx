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
    'services.wellness.title': 'Wellness Exams',
    'services.wellness.description': 'Comprehensive health checkups to keep your pet in optimal condition.',
    'services.emergency.title': 'Emergency Care',
    'services.emergency.description': '24/7 emergency services for urgent medical situations.',
    'services.vaccinations.title': 'Vaccinations',
    'services.vaccinations.description': 'Complete vaccination programs to protect your pets from diseases.',
    'services.surgery.title': 'Surgery',
    'services.surgery.description': 'Advanced surgical procedures with state-of-the-art equipment.',
    'services.diagnostics.title': 'Diagnostics',
    'services.diagnostics.description': 'Advanced diagnostic imaging and laboratory services.',
    'services.dental.title': 'Dental Care',
    'services.dental.description': 'Professional dental cleaning and oral health services.',
    
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
    
    // Reviews
    'reviews.headline': 'What Our Customers Say',
    'reviews.1.name': 'Ahmed Al-Rashid',
    'reviews.1.text': 'Excellent service! The staff was very caring and professional with my cat. Highly recommend Dr. Paws!',
    'reviews.2.name': 'Sarah Johnson',
    'reviews.2.text': 'My dog received the best care here. The doctors are knowledgeable and the clinic is very clean.',
    'reviews.3.name': 'Mohammed Hassan',
    'reviews.3.text': 'Great experience overall. The veterinarian explained everything clearly and my pet feels much better.',
    'reviews.4.name': 'Emily Rodriguez',
    'reviews.4.text': 'The emergency service was outstanding. They took care of my rabbit immediately and professionally.',
    'reviews.5.name': 'Khalid Abdullah',
    'reviews.5.text': 'Best veterinary clinic in Riyadh! The staff is friendly and they truly care about animals.',
    'reviews.6.name': 'Jennifer Lee',
    'reviews.6.text': 'Very impressed with the facilities and the level of care. My parrot received excellent treatment.',
    'reviews.7.name': 'Omar Saeed',
    'reviews.7.text': 'Professional team and modern equipment. They made my pet feel comfortable during the visit.',
    'reviews.8.name': 'Lisa Martinez',
    'reviews.8.text': 'Wonderful experience! The grooming service was perfect and my dog looks amazing. Thank you!',
    
    // Contact
    'contact.headline': 'Contact Us',
    'contact.subheadline': 'Contact Dr. Paws Veterinary Clinic & Schedule Your Pet\'s Appointment Today!',
    'contact.name': 'Name',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Thank you! We will contact you soon.',
    
    // Book Now Page
    'bookNow.title': 'Book Now',
    'bookNow.welcome': 'We\'re happy that you want to book and be part of our family.',
    'bookNow.chooseBranch': 'Choose from our branches for booking',
    'bookNow.riyadh': 'Riyadh',
    'bookNow.riyadhBranches': 'Riyadh Branches',
    'bookNow.matherBranch': 'Al-Mather Branch',
    'bookNow.sahafahBranch': 'Al-Sahafa Branch',
    'bookNow.jeddah': 'Jeddah',
    'bookNow.jeddahBranches': 'Jeddah Branches',
    'bookNow.comingSoon': 'Coming Soon',
    'bookNow.helpTitle': 'Booking Form Guide',
    'bookNow.helpNote': 'Note: The booking form is in English. Here are translations of the key fields to help you:',
    'bookNow.field.selectDate': 'Select Date',
    'bookNow.field.selectTime': 'Select Time',
    'bookNow.field.petName': 'Pet Name',
    'bookNow.field.ownerName': 'Owner Name',
    'bookNow.field.phoneNumber': 'Phone Number',
    'bookNow.field.email': 'Email',
    'bookNow.field.petType': 'Pet Type',
    'bookNow.field.service': 'Service',
    'bookNow.field.notes': 'Notes/Comments',
    'bookNow.field.submit': 'Submit/Book',
    
    // About Page
    'aboutPage.header': 'Dr. Paws Veterinary Care Center',
    'aboutPage.subheader': 'Expertise You Can Trust',
    'aboutPage.whoWeAre.title': 'About Dr. Paws – Who We Are',
    'aboutPage.whoWeAre.subtitle': 'Dr. Paws Veterinary Clinic: Your Partner in Pet Care',
    'aboutPage.whoWeAre.para1': 'We believe that every pet deserves a happy and healthy life. More than just a veterinary clinic, we are your partners in caring for your furry friend. Our dedicated team is committed to providing comprehensive, high-quality care, from routine check-ups to complex surgeries.',
    'aboutPage.whoWeAre.para2': 'With years of experience in veterinary care, Dr. Paws offers a wide range of services to meet all your pet\'s needs. Using the latest technology and equipment, we diagnose and treat various health conditions, ensuring your pet\'s health and well-being throughout their life. We are proud to be a trusted clinic for veterinary care in Riyadh.',
    'aboutPage.whoWeAre.para3': 'We strive to create a welcoming and comfortable environment for both you and your furry companions, making every visit a positive experience. We are proud to be a trusted veterinary care center in the Riyadh community.',
    'aboutPage.vision.title': 'Our Vision',
    'aboutPage.vision.content': 'Dr. Paws clinics strive to be the premier destination for pet care, providing the highest quality healthcare for our furry friends.',
    'aboutPage.mission.title': 'Our Mission',
    'aboutPage.mission.content': 'Our mission is to deliver compassionate, advanced veterinary care. We are committed to providing the highest quality medical services to pets, from routine check-ups to specialized treatments, all carried out by our experienced team in a caring environment.',
    'aboutPage.whyChoose.title': 'Why Choose Dr. Paws Veterinary Clinic?',
    'aboutPage.whyChoose.reason1.title': 'Compassionate Care',
    'aboutPage.whyChoose.reason1.description': 'We treat every pet as if they were our own, with kindness, respect, and understanding.',
    'aboutPage.whyChoose.reason2.title': 'Experienced Team',
    'aboutPage.whyChoose.reason2.description': 'Our veterinarians and support staff have years of experience and are passionate about animal health.',
    'aboutPage.whyChoose.reason3.title': 'State-of-the-Art Facility',
    'aboutPage.whyChoose.reason3.description': 'We utilize advanced technology and equipment to provide the best possible care.',
    'aboutPage.whyChoose.reason4.title': 'Personalized Approach',
    'aboutPage.whyChoose.reason4.description': 'We tailor our treatment plans to meet the unique needs of each pet.',
    'aboutPage.doctors.title': 'Our Doctors',
    'aboutPage.doctors.description': 'Our team of experienced and compassionate veterinarians is the heart of Dr. Paws Veterinary Care Center. They are dedicated to providing the highest standard of care and are passionate about improving the lives of animals. With diverse areas of expertise, our doctors work collaboratively to ensure your pet receives the best possible treatment.',
    'aboutPage.doctors.noInfo': 'Doctor profiles coming soon',
    'aboutPage.partners.title': 'Our Partners',
    'aboutPage.partners.noInfo': 'Partner information coming soon',
    'aboutPage.careers.title': 'Careers / Join Our Team',
    'aboutPage.careers.description': 'Looking for a rewarding career in animal health? Dr. Paws Veterinary Care Center offers exciting opportunities for professional growth and development in a dynamic and fast-paced environment.',
    'aboutPage.careers.personalInfo': 'Personal Information',
    'aboutPage.careers.fullName': 'Full Name',
    'aboutPage.careers.email': 'Email Address',
    'aboutPage.careers.phone': 'Phone Number',
    'aboutPage.careers.professionalInfo': 'Professional Information',
    'aboutPage.careers.resume': 'Resume/CV Upload',
    'aboutPage.careers.coverLetter': 'Cover Letter (Optional)',
    'aboutPage.careers.position': 'Desired Position (if known)',
    'aboutPage.careers.startDate': 'Available Start Date',
    'aboutPage.careers.experience': 'Relevant Experience',
    'aboutPage.careers.experiencePlaceholder': 'e.g., veterinary technician, veterinary assistant, receptionist',
    'aboutPage.careers.certifications': 'Veterinary Certifications (if applicable)',
    'aboutPage.careers.education': 'Education Level and Institution',
    'aboutPage.careers.interests': 'Areas of Interest',
    'aboutPage.careers.interestsPlaceholder': 'e.g., surgery, internal medicine, emergency care',
    'aboutPage.careers.submit': 'Submit Application',
    
    // Services Page
    'servicesPage.header': 'Our Services',
    'servicesPage.subheader': 'Experience exceptional veterinary services at Dr. Paws. We offer a full range of care for your pets, from routine checkups to advanced treatments.',
    'servicesPage.bookAppointment': 'Book an appointment',
    
    'servicesPage.examinations.title': 'Periodic Medical Examinations',
    'servicesPage.examinations.description': 'At Dr. Paws, we believe preventative care is essential for a long and healthy life for all pets. Our periodic pet examinations, also known as wellness exams or checkups, are a crucial part of our comprehensive veterinary services. They allow our veterinarians to assess your pet\'s overall health, detect potential problems early, and provide personalized recommendations.',
    'servicesPage.examinations.canine': 'Canine Examinations: Vital signs, cardiopulmonary auscultation, ophthalmologic, otoscopic, oral, dermatological, abdominal, and musculoskeletal evaluations.',
    'servicesPage.examinations.feline': 'Feline Examinations: Gentle checkups covering vital signs, eyes, ears, oral health, abdomen, coat, and skin.',
    'servicesPage.examinations.avian': 'Avian Examinations: Specialized care including physical examination, feather and beak assessment, weight, gland checks, and abdominal palpation.',
    
    'servicesPage.grooming.title': 'Shower & Grooming Services',
    'servicesPage.grooming.description': 'Maintain your pet\'s hygiene and comfort with our grooming and cleaning services.',
    'servicesPage.grooming.feature1': 'Nail clipping',
    'servicesPage.grooming.feature2': 'Ear cleaning',
    'servicesPage.grooming.feature3': 'Bath and drying with safe shampoos',
    'servicesPage.grooming.feature4': 'Hair combing and grooming (breed-specific)',
    
    'servicesPage.diagnostics.title': 'Diagnostic Tests',
    'servicesPage.diagnostics.description': 'We provide accurate, rapid diagnostic testing with advanced technology:',
    'servicesPage.diagnostics.lab': 'Laboratory Testing: Blood chemistry, CBC, urine analysis, parasite and fungal testing',
    'servicesPage.diagnostics.imaging': 'Imaging: X-rays, dental X-rays, ultrasound',
    'servicesPage.diagnostics.advanced': 'Advanced Diagnostics: Microscopy and endoscopy',
    
    'servicesPage.surgery.title': 'Medical Surgeries',
    'servicesPage.surgery.description': 'Our surgical team performs a wide range of operations using modern, safe techniques:',
    'servicesPage.surgery.feature1': 'Sterilization (spay/neuter)',
    'servicesPage.surgery.feature2': 'Orthopedic surgery',
    'servicesPage.surgery.feature3': 'Digestive system operations',
    'servicesPage.surgery.feature4': 'Rhinoplasty (for brachycephalic breeds)',
    'servicesPage.surgery.feature5': 'Urinary tract surgery',
    
    'servicesPage.dental.title': 'Dental Services',
    'servicesPage.dental.description': 'Comprehensive dental care to protect your pet\'s teeth and gums:',
    'servicesPage.dental.feature1': 'Professional teeth cleaning',
    'servicesPage.dental.feature2': 'Dental check-ups',
    'servicesPage.dental.feature3': 'Scaling and root planing',
    'servicesPage.dental.feature4': 'Tooth extractions and oral surgery',
    
    'servicesPage.vaccination.title': 'Periodic Vaccinations',
    'servicesPage.vaccination.description': 'Protect your pets with essential vaccinations and deworming schedules:',
    'servicesPage.vaccination.feature1': 'Cat vaccines (Trivalent & Quadrivalent)',
    'servicesPage.vaccination.feature2': 'Dog vaccines (Pentavalent & Rabies)',
    'servicesPage.vaccination.feature3': 'Deworming medications',
    
    'servicesPage.travel.title': 'Pet Travel Procedures',
    'servicesPage.travel.description': 'Comprehensive travel assistance for domestic and international trips:',
    'servicesPage.travel.feature1': 'Health certificates',
    'servicesPage.travel.feature2': 'Rabies testing and documentation',
    'servicesPage.travel.feature3': 'Assistance with travel forms and destination requirements',
    
    'servicesPage.boarding.title': 'Boarding Services',
    'servicesPage.boarding.description': 'Comfortable and safe accommodation options for your pets:',
    'servicesPage.boarding.therapeutic': 'Therapeutic Pet Hotel: Post-surgery care, chronic condition management, and close monitoring',
    'servicesPage.boarding.fungi': 'Fungi Treatment Hotel: Isolated treatment rooms with specialized disinfection and medication',
    
    'servicesPage.intensiveCare.title': 'Intensive Care',
    'servicesPage.intensiveCare.description': 'Dedicated ICU care for critical pets:',
    'servicesPage.intensiveCare.feature1': 'Organ failure management (kidney, liver, heart)',
    'servicesPage.intensiveCare.feature2': 'Metabolic and endocrine disorders',
    'servicesPage.intensiveCare.feature3': 'Severe injuries and trauma',
    'servicesPage.intensiveCare.feature4': 'Post-operative care',
    
    'servicesPage.emergency.title': 'Emergency Services',
    'servicesPage.emergency.description': '24/7 emergency care for urgent cases such as:',
    'servicesPage.emergency.feature1': 'Trauma',
    'servicesPage.emergency.feature2': 'Breathing difficulties',
    'servicesPage.emergency.feature3': 'Bleeding or poisoning',
    'servicesPage.emergency.feature4': 'Seizures and bloat',
    'servicesPage.emergency.numbers': 'Emergency Numbers:',
    'servicesPage.emergency.sahafa': 'Al-Sahafa Branch: 05520 30564',
    'servicesPage.emergency.mather': 'Al-Mather Branch: 05313 53667',
    
    'servicesPage.homeCare.title': 'Home Care Services',
    'servicesPage.homeCare.description': 'Convenient veterinary care at home:',
    'servicesPage.homeCare.feature1': 'Wellness exams',
    'servicesPage.homeCare.feature2': 'Vaccinations',
    'servicesPage.homeCare.feature3': 'Sample collection (blood, urine, fecal)',
    
    // Footer
    'footer.description': 'From wellness exams to advanced treatments, Dr. Paws provides comprehensive veterinary care for your pet\'s every need.',
    'footer.contactInfo': 'Contact Information',
    'footer.call': 'Call',
    'footer.generalPhone': '920 003 045',
    'footer.emergency': 'Emergency: 24/7',
    'footer.mobile': 'Mobile',
    'footer.sahafahBranch': 'Al-Sahafa Branch',
    'footer.sahafahAddress': 'Dr.Paws Veterinary Clinic, Al Thoumamah Rd, As Sahafah, Riyadh 13315',
    'footer.sahafahPhone': '05520 30564',
    'footer.sahafahMapUrl': 'https://www.google.com/maps/search/?api=1&query=Dr.Paws+Veterinary+Clinic,Al+Thoumamah+Rd,As+Sahafah,Riyadh+13315',
    'footer.matherBranch': 'Al-Mather Branch',
    'footer.matherAddress': 'Dr.Paws Veterinary Clinic, Prince Sultan Bin Abdulaziz Rd, Al Mathar Ash Shamali, Riyadh 12314',
    'footer.matherPhone': '0531353667',
    'footer.matherMapUrl': 'https://www.google.com/maps/search/?api=1&query=Dr.Paws+Veterinary+Clinic,Prince+Sultan+Bin+Abdulaziz+Rd,Al+Mathar+Ash+Shamali,Riyadh+12314',
    'footer.hours': 'Working Hours',
    'footer.satThu': 'Sat – Thu: 09:00 AM – 10:00 PM',
    'footer.fri': 'Fri: 03:00 PM – 10:00 PM',
    'footer.email': 'info@drpaws-sa.com',
    'footer.follow': 'Stay in touch',
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
    'services.wellness.title': 'الفحوصات الصحية',
    'services.wellness.description': 'فحوصات صحية شاملة للحفاظ على حيوانك الأليف في حالة مثالية.',
    'services.emergency.title': 'الرعاية الطارئة',
    'services.emergency.description': 'خدمات طوارئ على مدار الساعة للحالات الطبية العاجلة.',
    'services.vaccinations.title': 'التطعيمات',
    'services.vaccinations.description': 'برامج تطعيم كاملة لحماية حيواناتك من الأمراض.',
    'services.surgery.title': 'الجراحة',
    'services.surgery.description': 'إجراءات جراحية متقدمة بأحدث المعدات.',
    'services.diagnostics.title': 'التشخيص',
    'services.diagnostics.description': 'تصوير تشخيصي متقدم وخدمات مخبرية.',
    'services.dental.title': 'العناية بالأسنان',
    'services.dental.description': 'تنظيف أسنان احترافي وخدمات صحة الفم.',
    
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
    
    // Reviews
    'reviews.headline': 'آراء عملائنا',
    'reviews.1.name': 'أحمد الرشيد',
    'reviews.1.text': 'خدمة ممتازة! الطاقم كان رائعًا ومهنيًا جدًا مع قطتي. أنصح بشدة بعيادة د. باوز!',
    'reviews.2.name': 'سارة جونسون',
    'reviews.2.text': 'كلبي حصل على أفضل رعاية هنا. الأطباء ذوو خبرة والعيادة نظيفة جدًا.',
    'reviews.3.name': 'محمد حسن',
    'reviews.3.text': 'تجربة رائعة بشكل عام. الطبيب البيطري شرح كل شيء بوضوح وحيواني الأليف يشعر بتحسن كبير.',
    'reviews.4.name': 'إميلي رودريجيز',
    'reviews.4.text': 'خدمة الطوارئ كانت مميزة. اهتموا بأرنبي فورًا وبشكل احترافي.',
    'reviews.5.name': 'خالد عبدالله',
    'reviews.5.text': 'أفضل عيادة بيطرية في الرياض! الطاقم ودود ويهتمون حقًا بالحيوانات.',
    'reviews.6.name': 'جينيفر لي',
    'reviews.6.text': 'معجبة جدًا بالمرافق ومستوى الرعاية. ببغائي حصل على علاج ممتاز.',
    'reviews.7.name': 'عمر سعيد',
    'reviews.7.text': 'فريق محترف ومعدات حديثة. جعلوا حيواني الأليف يشعر بالراحة خلال الزيارة.',
    'reviews.8.name': 'ليزا مارتينيز',
    'reviews.8.text': 'تجربة رائعة! خدمة التجميل كانت مثالية وكلبي يبدو رائعًا. شكرًا لكم!',
    
    // Contact
    'contact.headline': 'تواصل معنا',
    'contact.subheadline': 'بادر بحجز موعد لحيوانك الأليف في عيادة د. باوز البيطرية اليوم!',
    'contact.name': 'الاسم',
    'contact.phone': 'رقم الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.submit': 'إرسال',
    'contact.success': 'شكراً لك! سنتواصل معك قريباً.',
    
    // Book Now Page
    'bookNow.title': 'احجز الآن',
    'bookNow.welcome': 'نحن سعداء لرغبتك في الحجز وأن تصبح جزءًا من عائلتنا.',
    'bookNow.chooseBranch': 'اختر من فروعنا للحجز',
    'bookNow.riyadh': 'الرياض',
    'bookNow.riyadhBranches': 'فروع الرياض',
    'bookNow.matherBranch': 'فرع المعذر',
    'bookNow.sahafahBranch': 'فرع الصحافة',
    'bookNow.jeddah': 'جدة',
    'bookNow.jeddahBranches': 'فروع جدة',
    'bookNow.comingSoon': 'قريباً',
    'bookNow.helpTitle': 'دليل نموذج الحجز',
    'bookNow.helpNote': 'ملاحظة: نموذج الحجز باللغة الإنجليزية. إليك ترجمة الحقول الرئيسية لمساعدتك:',
    'bookNow.field.selectDate': 'اختر التاريخ',
    'bookNow.field.selectTime': 'اختر الوقت',
    'bookNow.field.petName': 'اسم الحيوان الأليف',
    'bookNow.field.ownerName': 'اسم المالك',
    'bookNow.field.phoneNumber': 'رقم الهاتف',
    'bookNow.field.email': 'البريد الإلكتروني',
    'bookNow.field.petType': 'نوع الحيوان الأليف',
    'bookNow.field.service': 'الخدمة',
    'bookNow.field.notes': 'ملاحظات/تعليقات',
    'bookNow.field.submit': 'إرسال/حجز',
    
    // About Page
    'aboutPage.header': 'عيادات د. باوز البيطرية بالرياض',
    'aboutPage.subheader': 'خبرة نضعها بين أيديكم بكل ثقة',
    'aboutPage.whoWeAre.title': 'من نحن؟',
    'aboutPage.whoWeAre.subtitle': '',
    'aboutPage.whoWeAre.para1': 'تُقدّم عيادات د. باوز، أفضل عيادة بيطرية بالرياض، رعاية بيطرية استثنائية تجمع بين الخبرة والتقنية الحديثة، مع لمسة حانية تُعبّر عن اهتمامنا العميق بصحة حيواناتكم الأليفة. من الفحوصات الروتينية إلى التشخيصات المتقدمة والعلاجات المتخصصة، نُوفّر رعاية شاملة في بيئة مريحة وودية، لضمان تجربة إيجابية لكم ولحيواناتكم الأليفة في كل زيارة.',
    'aboutPage.whoWeAre.para2': '',
    'aboutPage.whoWeAre.para3': '',
    'aboutPage.vision.title': 'رؤيتنا',
    'aboutPage.vision.content': 'تسعى عيادات دكتور باوز إلى أن تكون المرجع الأول والأفضل في مجال الرعاية البيطرية، حيث تقدم أعلى مستوى من الرعاية الصحية للحيوانات الأليفة.',
    'aboutPage.mission.title': 'مهمتنا',
    'aboutPage.mission.content': 'توفير رعاية بيطرية شاملة وعالية الجودة للحيوانات الأليفة، مع التركيز على صحة ورفاهية الحيوان، وتقديم أفضل الخدمات الطبية للحيوانات الأليفة، بدءًا من الفحوصات الروتينية وحتى الجراحات المعقدة، وذلك من خلال فريق عمل متخصص وبيئة مريحة لأليفك.',
    'aboutPage.whyChoose.title': 'لماذا تختار عيادات د. باوز البيطرية؟',
    'aboutPage.whyChoose.reason1.title': 'رعاية شاملة وحنونة',
    'aboutPage.whyChoose.reason1.description': 'نعامل كل حيوان أليف كما لو كان حيواننا الأليف، باللطف والاحترام والتفهّم.',
    'aboutPage.whyChoose.reason2.title': 'فريق ذو خبرة',
    'aboutPage.whyChoose.reason2.description': 'يتمتع أطباؤنا البيطريون وطاقم الدعم لدينا بخبرة سنوات عديدة وشغف تجاه الحيوانات الأليفة.',
    'aboutPage.whyChoose.reason3.title': 'عيادات متطورة وحديثة',
    'aboutPage.whyChoose.reason3.description': 'حيث نستخدم أحدث التقنيات والمعدات لتوفير أفضل رعاية ممكنة.',
    'aboutPage.whyChoose.reason4.title': 'خطة علاجية تناسب أليفك',
    'aboutPage.whyChoose.reason4.description': 'نُعدل خطط العلاج لتلبية الاحتياجات الفريدة لكل حيوان أليف.',
    'aboutPage.doctors.title': 'فريق العمل',
    'aboutPage.doctors.description': 'في عيادات د. باوز، أفضل عيادة بيطرية بالرياض، يجمع فريقنا من الأطباء البيطريين بين الخبرة العالية والتعاطف العميق لتقديم رعاية شاملة ومتخصصة. ملتزمون بتطبيق أعلى معايير الجودة في كل جوانب الرعاية، وشغفهم بصحة الحيوانات هو الدافع الأساسي لعملهم. خبراتهم المتنوعة تُمكّنهم من توفير أفضل الحلول العلاجية لحيوانكم الأليف.',
    'aboutPage.doctors.noInfo': 'ملفات تعريف الأطباء قريباً',
    'aboutPage.partners.title': 'شركاؤنا',
    'aboutPage.partners.noInfo': 'معلومات الشركاء قريباً',
    'aboutPage.careers.title': 'الوظائف',
    'aboutPage.careers.description': 'عيادة د. باوز، أفضل عيادة بيطرية بالرياض، تدعوك للانضمام إلى فريقها المتميز. نوفر لك بيئة عمل داعمة ومُحفّزة تُساعدك على التطور المهني واكتساب الخبرات القيمة في مجال صحة الحيوان.',
    'aboutPage.careers.personalInfo': 'المعلومات الشخصية',
    'aboutPage.careers.fullName': 'الاسم الكامل',
    'aboutPage.careers.email': 'البريد الإلكتروني',
    'aboutPage.careers.phone': 'رقم الهاتف',
    'aboutPage.careers.professionalInfo': 'المعلومات المهنية',
    'aboutPage.careers.resume': 'تحميل السيرة الذاتية',
    'aboutPage.careers.coverLetter': 'الخطاب التعريفي (اختياري)',
    'aboutPage.careers.position': 'الوظيفة المطلوبة (إن وجدت)',
    'aboutPage.careers.startDate': 'تاريخ البدء المتاح',
    'aboutPage.careers.experience': 'الخبرة ذات الصلة',
    'aboutPage.careers.experiencePlaceholder': 'مثلاً: فني بيطري، مساعد بيطري، موظف استقبال',
    'aboutPage.careers.certifications': 'الشهادات البيطرية (إن وجدت)',
    'aboutPage.careers.education': 'المستوى التعليمي والمؤسسة',
    'aboutPage.careers.interests': 'مجالات الاهتمام',
    'aboutPage.careers.interestsPlaceholder': 'مثلاً: الجراحة، الطب الباطني، رعاية الطوارئ',
    'aboutPage.careers.submit': 'إرسال الطلب',
    
    // Services Page
    'servicesPage.header': 'خدماتنا',
    'servicesPage.subheader': 'اختبر خدمات بيطرية استثنائية في د. باوز. نقدم مجموعة كاملة من الرعاية لحيواناتك الأليفة، من الفحوصات الروتينية إلى العلاجات المتقدمة.',
    'servicesPage.bookAppointment': 'احجز موعد',
    
    'servicesPage.examinations.title': 'الفحوصات الطبية الدورية',
    'servicesPage.examinations.description': 'في د. باوز، نؤمن بأن الرعاية الوقائية ضرورية لحياة طويلة وصحية لجميع الحيوانات الأليفة. فحوصاتنا الدورية للحيوانات الأليفة، والمعروفة أيضًا باسم فحوصات الصحة أو الفحوصات، هي جزء أساسي من خدماتنا البيطرية الشاملة. فهي تسمح لأطبائنا البيطريين بتقييم الصحة العامة لحيوانك الأليف، واكتشاف المشاكل المحتملة مبكرًا، وتقديم توصيات شخصية.',
    'servicesPage.examinations.canine': 'فحوصات الكلاب: العلامات الحيوية، تسمع القلب والرئتين، فحوصات العيون، الأذن، الفم، الجلد، البطن، والعضلات والعظام.',
    'servicesPage.examinations.feline': 'فحوصات القطط: فحوصات لطيفة تغطي العلامات الحيوية، العيون، الأذنين، صحة الفم، البطن، الفراء، والجلد.',
    'servicesPage.examinations.avian': 'فحوصات الطيور: رعاية متخصصة تشمل الفحص البدني، تقييم الريش والمنقار، الوزن، فحص الغدد، وجس البطن.',
    
    'servicesPage.grooming.title': 'خدمات الاستحمام والتجميل',
    'servicesPage.grooming.description': 'حافظ على نظافة وراحة حيوانك الأليف مع خدمات التجميل والتنظيف لدينا.',
    'servicesPage.grooming.feature1': 'قص الأظافر',
    'servicesPage.grooming.feature2': 'تنظيف الأذنين',
    'servicesPage.grooming.feature3': 'الاستحمام والتجفيف بشامبو آمن',
    'servicesPage.grooming.feature4': 'تمشيط وتجميل الشعر (حسب السلالة)',
    
    'servicesPage.diagnostics.title': 'الفحوصات التشخيصية',
    'servicesPage.diagnostics.description': 'نوفر اختبارات تشخيصية دقيقة وسريعة بتقنية متقدمة:',
    'servicesPage.diagnostics.lab': 'الفحوصات المخبرية: كيمياء الدم، تعداد الدم الكامل، تحليل البول، فحوصات الطفيليات والفطريات',
    'servicesPage.diagnostics.imaging': 'التصوير: الأشعة السينية، الأشعة السينية للأسنان، الموجات فوق الصوتية',
    'servicesPage.diagnostics.advanced': 'التشخيصات المتقدمة: الفحص المجهري والتنظير الداخلي',
    
    'servicesPage.surgery.title': 'العمليات الجراحية الطبية',
    'servicesPage.surgery.description': 'يقوم فريقنا الجراحي بإجراء مجموعة واسعة من العمليات باستخدام تقنيات حديثة وآمنة:',
    'servicesPage.surgery.feature1': 'التعقيم (الإخصاء)',
    'servicesPage.surgery.feature2': 'جراحة العظام',
    'servicesPage.surgery.feature3': 'عمليات الجهاز الهضمي',
    'servicesPage.surgery.feature4': 'تجميل الأنف (للسلالات قصيرة الأنف)',
    'servicesPage.surgery.feature5': 'جراحة المسالك البولية',
    
    'servicesPage.dental.title': 'خدمات الأسنان',
    'servicesPage.dental.description': 'رعاية شاملة للأسنان لحماية أسنان ولثة حيوانك الأليف:',
    'servicesPage.dental.feature1': 'تنظيف أسنان احترافي',
    'servicesPage.dental.feature2': 'فحوصات الأسنان',
    'servicesPage.dental.feature3': 'تقليح وتخطيط الجذور',
    'servicesPage.dental.feature4': 'خلع الأسنان وجراحة الفم',
    
    'servicesPage.vaccination.title': 'التطعيمات الدورية',
    'servicesPage.vaccination.description': 'احمِ حيواناتك الأليفة بالتطعيمات الأساسية وجداول التخلص من الديدان:',
    'servicesPage.vaccination.feature1': 'لقاحات القطط (الثلاثي والرباعي)',
    'servicesPage.vaccination.feature2': 'لقاحات الكلاب (الخماسي وداء الكلب)',
    'servicesPage.vaccination.feature3': 'أدوية التخلص من الديدان',
    
    'servicesPage.travel.title': 'إجراءات سفر الحيوانات الأليفة',
    'servicesPage.travel.description': 'مساعدة شاملة للسفر المحلي والدولي:',
    'servicesPage.travel.feature1': 'شهادات صحية',
    'servicesPage.travel.feature2': 'فحص داء الكلب والوثائق',
    'servicesPage.travel.feature3': 'المساعدة في نماذج السفر ومتطلبات الوجهة',
    
    'servicesPage.boarding.title': 'خدمات الإيواء',
    'servicesPage.boarding.description': 'خيارات إقامة مريحة وآمنة لحيواناتك الأليفة:',
    'servicesPage.boarding.therapeutic': 'فندق الحيوانات العلاجي: رعاية ما بعد الجراحة، إدارة الحالات المزمنة، ومراقبة عن كثب',
    'servicesPage.boarding.fungi': 'فندق علاج الفطريات: غرف علاج معزولة مع تعقيم متخصص وأدوية',
    
    'servicesPage.intensiveCare.title': 'الرعاية المركزة',
    'servicesPage.intensiveCare.description': 'رعاية وحدة العناية المركزة المخصصة للحيوانات الأليفة الحرجة:',
    'servicesPage.intensiveCare.feature1': 'إدارة فشل الأعضاء (الكلى، الكبد، القلب)',
    'servicesPage.intensiveCare.feature2': 'اضطرابات التمثيل الغذائي والغدد الصماء',
    'servicesPage.intensiveCare.feature3': 'الإصابات والصدمات الشديدة',
    'servicesPage.intensiveCare.feature4': 'رعاية ما بعد الجراحة',
    
    'servicesPage.emergency.title': 'خدمات الطوارئ',
    'servicesPage.emergency.description': 'رعاية طوارئ على مدار الساعة طوال أيام الأسبوع للحالات العاجلة مثل:',
    'servicesPage.emergency.feature1': 'الصدمات',
    'servicesPage.emergency.feature2': 'صعوبات التنفس',
    'servicesPage.emergency.feature3': 'النزيف أو التسمم',
    'servicesPage.emergency.feature4': 'النوبات والانتفاخ',
    'servicesPage.emergency.numbers': 'أرقام الطوارئ:',
    'servicesPage.emergency.sahafa': 'فرع الصحافة: 0552030564',
    'servicesPage.emergency.mather': 'فرع المعذر: 0531353667',
    
    'servicesPage.homeCare.title': 'خدمات الرعاية المنزلية',
    'servicesPage.homeCare.description': 'رعاية بيطرية مريحة في المنزل:',
    'servicesPage.homeCare.feature1': 'فحوصات صحية',
    'servicesPage.homeCare.feature2': 'التطعيمات',
    'servicesPage.homeCare.feature3': 'جمع العينات (الدم، البول، البراز)',
    
    // Footer
    'footer.description': 'من الفحوصات الروتينية إلى الجراحات المتقدمة، تقدم د. باوز رعاية بيطرية متكاملة لجميع احتياجات حيوانك الأليف.',
    'footer.contactInfo': 'معلومات التواصل',
    'footer.call': 'الاتصال',
    'footer.generalPhone': '920003045',
    'footer.emergency': 'الطوارئ: متوفرون لخدمتكم على مدار الساعة طوال أيام الأسبوع',
    'footer.mobile': 'جوال',
    'footer.sahafahBranch': 'فرع الصحافة',
    'footer.sahafahAddress': 'عيادة د. باوز البيطرية، طريق الثمامة، حي الصحافة، الرياض 13315',
    'footer.sahafahPhone': '0552030564',
    'footer.sahafahMapUrl': 'https://www.google.com/maps/search/?api=1&query=Dr.Paws+Veterinary+Clinic,Al+Thoumamah+Rd,As+Sahafah,Riyadh+13315',
    'footer.matherBranch': 'فرع المعذر',
    'footer.matherAddress': 'عيادة د. باوز البيطرية، طريق الأمير سلطان بن عبدالعزيز، المعذر الشمالية، الرياض 12314',
    'footer.matherPhone': '0531353667',
    'footer.matherMapUrl': 'https://www.google.com/maps/search/?api=1&query=Dr.Paws+Veterinary+Clinic,Prince+Sultan+Bin+Abdulaziz+Rd,Al+Mathar+Ash+Shamali,Riyadh+12314',
    'footer.hours': 'ساعات العمل',
    'footer.satThu': 'من السبت إلى الخميس: من 9:00 صباحًا حتى 10:00 مساءً',
    'footer.fri': 'يوم الجمعة: من 3:00 مساءً حتى 10:00 مساءً',
    'footer.email': 'info@drpaws-sa.com',
    'footer.follow': 'تابعنا',
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
    const translationKey = key as keyof typeof translations['en'];
    if (translationKey in translations[language]) {
      return translations[language][translationKey] as string;
    }
    if (translationKey in translations.en) {
      return translations.en[translationKey] as string;
    }
    return key;
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
