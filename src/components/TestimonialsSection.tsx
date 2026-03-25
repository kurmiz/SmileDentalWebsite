import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const testimonials = [
  {
    name: "Sita Sharma",
    text: "Best dental experience in Butwal! The doctor was very gentle and explained everything clearly.",
    textNp: "बुटवलमा सबैभन्दा राम्रो दन्त अनुभव! डाक्टर धेरै कोमल थिए र सबै कुरा स्पष्ट रूपमा बुझाउनुभयो।",
    rating: 5,
    service: "Teeth Whitening",
    location: "Butwal-11",
    verified: true,
    avatar: "https://ui-avatars.com/api/?name=Sita+Sharma&background=0d9488&color=fff",
  },
  {
    name: "Bikash Poudel",
    text: "I was scared of root canal but it was completely painless here. Best service I've found in Rupandehi!",
    textNp: "मलाई रुट क्यानालको डर थियो तर यहाँ पूर्ण दर्दरहित थियो। रुपन्देहीमा भेटेको सबैभन्दा राम्रो सेवा!",
    rating: 5,
    service: "Root Canal",
    location: "Tilottama",
    verified: true,
    avatar: "https://ui-avatars.com/api/?name=Bikash+Poudel&background=0d9488&color=fff",
  },
  {
    name: "Anita Gurung",
    text: "My kids love coming here. Finally a modern clinic in Butwal with affordable prices!",
    textNp: "मेरा बच्चाहरूलाई यहाँ आउन मन पर्छ। अन्ततः बुटवलमा किफायती मूल्यमा आधुनिक क्लिनिक!",
    rating: 5,
    service: "Kids Dentistry",
    location: "Butwal-13",
    verified: true,
    avatar: "https://ui-avatars.com/api/?name=Anita+Gurung&background=0d9488&color=fff",
  },
  {
    name: "Ram Kumar Yadav",
    text: "Dr. Karki is the best implant specialist. My new teeth look completely natural. Highly recommended!",
    textNp: "डा. कार्की सबैभन्दा राम्रो इम्प्लान्ट विशेषज्ञ हुनुहुन्छ। मेरो नयाँ दाँत पूर्ण प्राकृतिक देखिन्छ।",
    rating: 5,
    service: "Dental Implants",
    location: "Sainamaina",
    verified: true,
    avatar: "https://ui-avatars.com/api/?name=Ram+Kumar&background=0d9488&color=fff",
  },
];

const TestimonialsSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t("Testimonials", "प्रशंसापत्रहरू")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            {t("What Our Patients Say", "हाम्रा बिरामीहरू के भन्छन्")}
          </h2>
          {/* Google Rating Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            <span className="font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">
              {t("on Google Reviews (250+)", "गुगल समीक्षामा (२५०+)")}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t_item, i) => (
            <motion.div
              key={t_item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card card-hover rounded-2xl p-6 border border-border relative"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t_item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                "{lang === "en" ? t_item.text : t_item.textNp}"
              </p>
              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t_item.avatar}
                    alt={t_item.name}
                    className="w-9 h-9 rounded-full"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-foreground text-sm truncate">{t_item.name}</p>
                      {t_item.verified && (
                        <BadgeCheck className="w-4 h-4 text-trust shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {t_item.location}
                      <span className="mx-1">·</span>
                      {t_item.service}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
