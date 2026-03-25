import { motion } from "framer-motion";
import { GraduationCap, Award, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const doctors = [
  {
    name: "Dr. Suman Karki",
    nameNp: "डा. सुमन कार्की",
    title: "Chief Dental Surgeon",
    titleNp: "प्रमुख दन्त शल्यचिकित्सक",
    degree: "BDS, MDS (Prosthodontics)",
    nmc: "NMC Reg. No. 12345",
    experience: 14,
    education: "IOM, Maharajgunj | BPKIHS, Dharan",
    specialties: ["Dental Implants", "Cosmetic Dentistry", "Full Mouth Rehabilitation"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. Priya Shrestha",
    nameNp: "डा. प्रिया श्रेष्ठ",
    title: "Orthodontist",
    titleNp: "अर्थोडन्टिस्ट",
    degree: "BDS, MDS (Orthodontics)",
    nmc: "NMC Reg. No. 23456",
    experience: 8,
    education: "Manipal College of Dental Sciences, India",
    specialties: ["Braces", "Aligners", "Pediatric Orthodontics"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. Rajesh Pandey",
    nameNp: "डा. राजेश पाण्डेय",
    title: "Endodontist",
    titleNp: "एन्डोडन्टिस्ट",
    degree: "BDS, MDS (Conservative Dentistry)",
    nmc: "NMC Reg. No. 34567",
    experience: 10,
    education: "KIST Medical College, Kathmandu",
    specialties: ["Root Canal", "Dental Microscopy", "Re-treatment"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
  },
];

const DoctorSection = () => {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t("Our Doctors", "हाम्रो डाक्टरहरू")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            {t("Meet Your Dental Experts", "तपाईंका दन्त विशेषज्ञहरूलाई भेट्नुहोस्")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            {t(
              "Experienced, certified dentists you can trust with your smile.",
              "तपाईंको मुस्कानमा भरोसा गर्न सक्ने अनुभवी, प्रमाणित दन्त चिकित्सकहरू।"
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card card-hover rounded-2xl border border-border overflow-hidden group"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-card/90 to-transparent h-20" />
                {/* NMC Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {doc.nmc}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground">{t(doc.name, doc.nameNp)}</h3>
                <p className="text-primary font-semibold text-sm">{t(doc.title, doc.titleNp)}</p>

                {/* Degree */}
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  {doc.degree}
                </div>

                {/* Education */}
                <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-accent shrink-0" />
                  {doc.education}
                </div>

                {/* Experience Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{t("Experience", "अनुभव")}</span>
                    <span className="font-bold text-primary">{doc.experience}+ {t("Years", "वर्ष")}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(doc.experience * 5, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--hero-gradient)" }}
                    />
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {doc.specialties.map((s) => (
                    <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
