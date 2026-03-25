import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 text-primary-foreground/70 text-sm">
          <div>
            <h3 className="text-lg font-extrabold text-primary-foreground mb-3">
              <span className="text-primary">Smile</span> Dental
            </h3>
            <p>{t(
              "Providing quality dental care in Butwal since 2015. Your trusted family dentist.",
              "२०१५ देखि बुटवलमा गुणस्तरीय दन्त सेवा प्रदान गर्दै। तपाईंको भरपर्दो पारिवारिक दन्त चिकित्सक।"
            )}</p>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-3">{t("Quick Links", "द्रुत लिंकहरू")}</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-primary transition-colors">{t("Services", "सेवाहरू")}</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">{t("Our Team", "हाम्रो टोली")}</a></li>
              <li><a href="#results" className="hover:text-primary transition-colors">{t("Before & After", "अगाडि र पछाडि")}</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">{t("Book Appointment", "अपोइन्टमेन्ट")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-3">{t("Contact", "सम्पर्क")}</h4>
            <p>Near Traffic Chowk, Butwal-11</p>
            <p>Rupandehi, Nepal</p>
            <p className="mt-2">+977 980-0000000</p>
            <p>info@smiledentalbutwal.com</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} Smile Dental Clinic, Butwal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
