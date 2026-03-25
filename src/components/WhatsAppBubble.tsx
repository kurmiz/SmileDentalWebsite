import { MessageCircle } from "lucide-react";

const WhatsAppBubble = () => {
  const whatsappNumber = "9779800000000";
  const message = encodeURIComponent("Hello! I'd like to book an appointment. नमस्ते!");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <MessageCircle className="w-7 h-7 text-accent-foreground" />
        </div>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-foreground text-primary-foreground text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us on WhatsApp
      </div>
    </a>
  );
};

export default WhatsAppBubble;
