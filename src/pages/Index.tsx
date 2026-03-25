import { LanguageContext, useLanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DoctorSection from "@/components/DoctorSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingForm from "@/components/BookingForm";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const languageCtx = useLanguageProvider();

  return (
    <LanguageContext.Provider value={languageCtx}>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <DoctorSection />
        <BeforeAfterSlider />
        <TestimonialsSection />
        <BookingForm />
        <MapSection />
        <Footer />
        <WhatsAppBubble />
        <ChatBot />
      </div>
    </LanguageContext.Provider>
  );
};

export default Index;
