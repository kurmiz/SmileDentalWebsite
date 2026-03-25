import { useState } from "react";
import { Menu, X, Phone, Sun, Moon, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

const serviceItems = [
  { label: "Root Canal (RCT)", labelNp: "रुट क्यानाल", href: "#services" },
  { label: "Dental Implants", labelNp: "डेन्टल इम्प्लान्ट", href: "#services" },
  { label: "Teeth Whitening", labelNp: "दाँत सेतो बनाउने", href: "#services" },
  { label: "Cosmetic Dentistry", labelNp: "कस्मेटिक डेन्टिस्ट्री", href: "#services" },
  { label: "Kids Dentistry", labelNp: "बाल दन्त चिकित्सा", href: "#services" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const scrollTo = (href: string) => {
    setOpen(false);
    setServicesOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t("Home", "गृहपृष्ठ"), href: "#" },
    { label: t("Our Team", "हाम्रो टोली"), href: "#team" },
    { label: t("Results", "नतिजाहरू"), href: "#results" },
    { label: t("Contact", "सम्पर्क"), href: "#booking" },
  ];

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-primary">Smile</span>
          <span className="text-xl font-extrabold text-foreground">Dental</span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 1).map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg nav-lift"
            >
              {l.label}
            </button>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              onBlur={() => setTimeout(() => setServicesOpen(false), 200)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg nav-lift flex items-center gap-1"
            >
              {t("Services", "सेवाहरू")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl glass-card border border-border shadow-lg py-2 z-50"
                >
                  {serviceItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollTo(item.href)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <span className="block">{lang === "en" ? item.label : item.labelNp}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg nav-lift"
            >
              {l.label}
            </button>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="ml-2 px-3 py-1.5 text-xs font-bold rounded-full border border-border hover:border-primary text-foreground transition-all nav-lift flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "नेपाली" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-1 w-9 h-9 rounded-full flex items-center justify-center border border-border hover:border-primary transition-all nav-lift overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4 text-accent" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4 text-accent" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <Button size="sm" className="ml-3 rounded-xl bg-green-600 text-white hover:bg-green-700" asChild>
            <a href="tel:+977-9800000000">
              <Phone className="w-4 h-4 mr-1" /> {t("Call Now", "कल गर्नुहोस्")}
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleLang} className="px-2 py-1 text-xs font-bold rounded-full border border-border text-foreground">
            {lang === "en" ? "ने" : "EN"}
          </button>
          <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center border border-border" aria-label="Toggle theme">
            {theme === "light" ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left px-6 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#services")}
              className="block w-full text-left px-6 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {t("Services", "सेवाहरू")}
            </button>
            <div className="px-6 py-3">
              <Button className="w-full rounded-xl bg-green-600 text-white hover:bg-green-700" asChild>
                <a href="tel:+977-9800000000">
                  <Phone className="w-4 h-4 mr-1" /> {t("Call Now", "कल गर्नुहोस्")}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
