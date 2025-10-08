import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HeartbeatDivider from '@/components/HeartbeatDivider';
import Footer from '@/components/Footer';
import { Heart, Users, Building2, Stethoscope, Upload } from 'lucide-react';
import teamImage from '@assets/generated_images/Veterinary_team_professional_photo_a4845f6b.png';
import vetExamImage from '@assets/generated_images/Vet_examining_golden_retriever_19654044.png';
import consultationImage from '@assets/generated_images/Vet_consultation_with_cat_owner_7978144f.png';
import equipmentImage from '@assets/generated_images/Modern_veterinary_equipment_room_49dc6345.png';

export default function About() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const visionMissionRef = useRef(null);
  const whyChooseRef = useRef(null);
  const doctorsRef = useRef(null);
  const partnersRef = useRef(null);
  const careersRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const whoWeAreInView = useInView(whoWeAreRef, { once: false, amount: 0.3 });
  const visionMissionInView = useInView(visionMissionRef, { once: false, amount: 0.3 });
  const whyChooseInView = useInView(whyChooseRef, { once: false, amount: 0.3 });
  const doctorsInView = useInView(doctorsRef, { once: false, amount: 0.3 });
  const partnersInView = useInView(partnersRef, { once: false, amount: 0.3 });
  const careersInView = useInView(careersRef, { once: false, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: t('contact.success'),
        description: t('aboutPage.careers.submit'),
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const whyChooseReasons = [
    {
      icon: Heart,
      title: t('aboutPage.whyChoose.reason1.title'),
      description: t('aboutPage.whyChoose.reason1.description'),
    },
    {
      icon: Users,
      title: t('aboutPage.whyChoose.reason2.title'),
      description: t('aboutPage.whyChoose.reason2.description'),
    },
    {
      icon: Building2,
      title: t('aboutPage.whyChoose.reason3.title'),
      description: t('aboutPage.whyChoose.reason3.description'),
    },
    {
      icon: Stethoscope,
      title: t('aboutPage.whyChoose.reason4.title'),
      description: t('aboutPage.whyChoose.reason4.description'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 py-16 space-y-16"
        >
          <motion.div
            ref={heroRef}
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-primary"
              data-testid="text-about-header"
            >
              {t('aboutPage.header')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground"
              data-testid="text-about-subheader"
            >
              {t('aboutPage.subheader')}
            </motion.p>
          </motion.div>

          <motion.section ref={whoWeAreRef} variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={whoWeAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={teamImage}
                  alt="Dr. Paws veterinary team"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-who-we-are"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={whoWeAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary" data-testid="text-who-we-are-title">
                  {t('aboutPage.whoWeAre.title')}
                </h2>
                {t('aboutPage.whoWeAre.subtitle') && (
                  <h3 className="text-2xl font-semibold text-foreground" data-testid="text-who-we-are-subtitle">
                    {t('aboutPage.whoWeAre.subtitle')}
                  </h3>
                )}
                <div className="space-y-4 text-lg text-foreground/90">
                  <p data-testid="text-who-we-are-para1">{t('aboutPage.whoWeAre.para1')}</p>
                  {t('aboutPage.whoWeAre.para2') && (
                    <p data-testid="text-who-we-are-para2">{t('aboutPage.whoWeAre.para2')}</p>
                  )}
                  {t('aboutPage.whoWeAre.para3') && (
                    <p data-testid="text-who-we-are-para3">{t('aboutPage.whoWeAre.para3')}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section ref={visionMissionRef} variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={visionMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="md:order-2"
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={vetExamImage}
                  alt="Veterinarian examining dog"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-vision-mission"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={visionMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:order-1 grid gap-8"
              >
                <Card data-testid="card-vision">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary flex items-center gap-3">
                      <lord-icon
                        src="https://cdn.lordicon.com/zywwafpn.json"
                        trigger="loop"
                        delay="1500"
                        state="morph-turn-on"
                        colors="primary:#545454,secondary:#18ac61"
                        style={{ width: '60px', height: '60px' }}
                      />
                      {t('aboutPage.vision.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-foreground/90">{t('aboutPage.vision.content')}</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-mission">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary flex items-center gap-3">
                      <lord-icon
                        src="https://cdn.lordicon.com/lagziwcr.json"
                        trigger="loop"
                        delay="1500"
                        colors="primary:#545454,secondary:#18ac61"
                        style={{ width: '60px', height: '60px' }}
                      />
                      {t('aboutPage.mission.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-foreground/90">{t('aboutPage.mission.content')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          <motion.section ref={whyChooseRef} variants={itemVariants} className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-primary text-center"
              data-testid="text-why-choose-title"
            >
              {t('aboutPage.whyChoose.title')}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseReasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <Card key={index} className="text-center" data-testid={`card-reason-${index + 1}`}>
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{reason.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{reason.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.section>

          <motion.section ref={doctorsRef} variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={doctorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={consultationImage}
                  alt="Veterinarian consultation with pet owner"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-doctors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={doctorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary flex items-center gap-3" data-testid="text-doctors-title">
                  <lord-icon
                    src="https://cdn.lordicon.com/jfdtmvil.json"
                    trigger="loop"
                    delay="1500"
                    state="in-reveal"
                    colors="primary:#545454,secondary:#18ac61"
                    style={{ width: '60px', height: '60px' }}
                  />
                  {t('aboutPage.doctors.title')}
                </h2>
                <p className="text-lg text-foreground/90" data-testid="text-doctors-description">
                  {t('aboutPage.doctors.description')}
                </p>
                <Card data-testid="card-doctors-placeholder">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground text-lg">{t('aboutPage.doctors.noInfo')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          <motion.section ref={partnersRef} variants={itemVariants} className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-primary flex items-center gap-3"
              data-testid="text-partners-title"
            >
              <lord-icon
                src="https://cdn.lordicon.com/rcuovkuy.json"
                trigger="loop"
                delay="1500"
                colors="primary:#545454,secondary:#18ac61"
                style={{ width: '60px', height: '60px' }}
              />
              {t('aboutPage.partners.title')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card data-testid="card-partners-placeholder">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">{t('aboutPage.partners.noInfo')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          <motion.section ref={careersRef} variants={itemVariants} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={careersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="md:order-2"
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={equipmentImage}
                  alt="Modern veterinary equipment"
                  className="rounded-xl w-full h-auto object-cover shadow-md"
                  data-testid="img-careers"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={careersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:order-1 space-y-4"
              >
                <h2 className="text-3xl font-bold text-primary flex items-center gap-3" data-testid="text-careers-title">
                  <lord-icon
                    src="https://cdn.lordicon.com/dpdqbwcf.json"
                    trigger="loop"
                    delay="1500"
                    colors="primary:#545454,secondary:#18ac61"
                    style={{ width: '60px', height: '60px' }}
                  />
                  {t('aboutPage.careers.title')}
                </h2>
                <p className="text-lg text-foreground/90" data-testid="text-careers-description">
                  {t('aboutPage.careers.description')}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={careersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card data-testid="card-careers-form">
                <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary" data-testid="text-personal-info">
                      {t('aboutPage.careers.personalInfo')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t('aboutPage.careers.fullName')}</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          data-testid="input-full-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('aboutPage.careers.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('aboutPage.careers.phone')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary" data-testid="text-professional-info">
                      {t('aboutPage.careers.professionalInfo')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="resume">{t('aboutPage.careers.resume')}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            data-testid="input-resume"
                            className="flex-1"
                          />
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">{t('aboutPage.careers.position')}</Label>
                        <Input
                          id="position"
                          name="position"
                          data-testid="input-position"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">{t('aboutPage.careers.startDate')}</Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="date"
                          required
                          data-testid="input-start-date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certifications">{t('aboutPage.careers.certifications')}</Label>
                        <Input
                          id="certifications"
                          name="certifications"
                          data-testid="input-certifications"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="education">{t('aboutPage.careers.education')}</Label>
                        <Input
                          id="education"
                          name="education"
                          required
                          data-testid="input-education"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="experience">{t('aboutPage.careers.experience')}</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder={t('aboutPage.careers.experiencePlaceholder')}
                          required
                          data-testid="input-experience"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="interests">{t('aboutPage.careers.interests')}</Label>
                        <Textarea
                          id="interests"
                          name="interests"
                          placeholder={t('aboutPage.careers.interestsPlaceholder')}
                          data-testid="input-interests"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="coverLetter">{t('aboutPage.careers.coverLetter')}</Label>
                        <Textarea
                          id="coverLetter"
                          name="coverLetter"
                          data-testid="input-cover-letter"
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      data-testid="button-submit-application"
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? '...' : t('aboutPage.careers.submit')}
                    </Button>
                  </div>
                </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        </motion.div>
      </main>

      <HeartbeatDivider />
      <Footer />
    </div>
  );
}
