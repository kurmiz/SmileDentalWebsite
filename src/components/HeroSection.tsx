import { motion } from "framer-motion";
import { Phone, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/hero-dental.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern dental clinic interior in Butwal"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              {t("Trusted by 5,000+ Patients in Butwal", "बुटवलमा ५,०००+ बिरामीहरूले भरोसा गरेको")}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground mb-4">
            {t("Your Smile,", "तपाईंको मुस्कान,")}{" "}
            <span className="text-accent">{t("Our Passion", "हाम्रो जोश")}</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-2 font-medium font-nepali">
            {t("बुटवलको सबैभन्दा भरपर्दो डेन्टल क्लिनिक", "बुटवलको सबैभन्दा भरपर्दो डेन्टल क्लिनिक")}
          </p>
          <p className="text-base md:text-lg text-primary-foreground/70 mb-8 max-w-md">
            {t(
              "Advanced cosmetic & general dentistry near Traffic Chowk, Butwal. Pain-free treatments with modern equipment.",
              "ट्राफिक चोक, बुटवल नजिक उन्नत कस्मेटिक र सामान्य दन्त चिकित्सा। आधुनिक उपकरणसँग दर्दरहित उपचार।"
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-bold px-8 py-6 rounded-xl shadow-lg nav-lift"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t("Book Appointment", "अपोइन्टमेन्ट बुक गर्नुहोस्")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-xl nav-lift"
              asChild
            >
              <a href="tel:+977-9800000000">
                <Phone className="w-5 h-5 mr-2" />
                {t("Call Now", "कल गर्नुहोस्")}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-8 mt-12"
          >
            {[
              { value: "10+", label: t("Years Experience", "वर्ष अनुभव") },
              { value: "5K+", label: t("Happy Patients", "खुसी बिरामीहरू") },
              { value: "4.9", label: t("Google Rating", "गुगल रेटिङ") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-accent">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
