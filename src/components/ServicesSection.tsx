import { motion } from "framer-motion";
import { Smile, Shield, Sparkles, Syringe, HeartPulse, Baby, PhoneCall, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const services = [
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    titleNp: "दाँत सेतो बनाउने",
    description: "Professional whitening for a brighter, confident smile.",
    descNp: "उज्ज्वल, आत्मविश्वासपूर्ण मुस्कानको लागि व्यावसायिक दाँत सेतो बनाउने।",
    price: "From Rs. 3,000",
  },
  {
    icon: Syringe,
    title: "Dental Implants",
    titleNp: "डेन्टल इम्प्लान्ट",
    description: "Permanent tooth replacement. Lifetime warranty. Natural look.",
    descNp: "स्थायी दाँत प्रतिस्थापन। जीवनभर वारेन्टी। प्राकृतिक रूप।",
    price: "From Rs. 25,000",
  },
  {
    icon: HeartPulse,
    title: "Root Canal (RCT)",
    titleNp: "रुट क्यानाल",
    description: "Pain-free root canal with modern technology. No more fear!",
    descNp: "आधुनिक प्रविधिसँग दर्दरहित रुट क्यानाल। अब डर नमान्नुहोस्!",
    price: "From Rs. 5,000",
  },
  {
    icon: Smile,
    title: "Cosmetic Dentistry",
    titleNp: "कस्मेटिक डेन्टिस्ट्री",
    description: "Veneers, bonding, and complete smile makeover solutions.",
    descNp: "भिनियर, बन्डिङ, र पूर्ण मुस्कान परिवर्तन समाधान।",
    price: "From Rs. 8,000",
  },
  {
    icon: Shield,
    title: "Dental Checkup",
    titleNp: "दाँत जाँच",
    description: "Comprehensive oral examination and cleaning.",
    descNp: "व्यापक मौखिक जाँच र सफाई।",
    price: "From Rs. 500",
  },
  {
    icon: Baby,
    title: "Kids Dentistry",
    titleNp: "बाल दन्त चिकित्सा",
    description: "Gentle dental care for children in a friendly environment.",
    descNp: "मैत्रीपूर्ण वातावरणमा बच्चाहरूको लागि कोमल दन्त हेरचाह।",
    price: "From Rs. 500",
  },
];

const ServicesSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t("Our Services", "हाम्रा सेवाहरू")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            {t("Complete Dental Care", "सम्पूर्ण दन्त सेवा")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            {t(
              "From routine checkups to advanced cosmetic procedures — all under one roof.",
              "नियमित जाँचदेखि उन्नत कस्मेटिक प्रक्रियाहरूसम्म — सबै एकै ठाउँमा।"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card card-hover rounded-2xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {lang === "en" ? service.title : service.titleNp}
              </h3>
              {lang === "en" && (
                <p className="text-sm font-nepali text-muted-foreground">{service.titleNp}</p>
              )}
              <p className="text-muted-foreground text-sm mt-2">
                {lang === "en" ? service.description : service.descNp}
              </p>
              <p className="text-primary font-bold mt-4">{service.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Emergency CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card rounded-2xl p-6 md:p-8 border-2 border-destructive/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {t("Dental Emergency?", "दन्त आपतकालीन?")}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "In pain? Don't wait — call us now for immediate care.",
                  "दुखाई छ? तुरुन्तै कल गर्नुहोस् — हामी तयार छौं।"
                )}
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold text-base px-8 py-6 shrink-0 w-full md:w-auto"
            asChild
          >
            <a href="tel:+977-9800000000" className="emergency-call">
              <PhoneCall className="w-5 h-5 mr-2" />
              {t("Call Now — Emergency", "तुरुन्तै कल गर्नुहोस्")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
