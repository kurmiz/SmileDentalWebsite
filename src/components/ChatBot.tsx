import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "bot";
  content: string;
}

const quickReplies = [
  "What services do you offer?",
  "How much does cleaning cost?",
  "Mero dat dukhyo",
  "Opening hours?",
];

const botResponses: Record<string, string> = {
  services:
    "We offer: 🦷 Dental Checkup (Rs. 500), Teeth Whitening (Rs. 3,000), Root Canal (Rs. 5,000), Dental Implants (Rs. 25,000), Cosmetic Dentistry, and Kids Dentistry. Would you like to book an appointment?",
  cost:
    "Here are our price ranges:\n• Checkup & Cleaning: Rs. 500 - 1,500\n• Teeth Whitening: Rs. 3,000 - 5,000\n• Root Canal: Rs. 5,000 - 8,000\n• Implants: Rs. 25,000 - 50,000\n\nPrices may vary. Visit us for a free consultation!",
  pain:
    "दुखाई छ भने तुरुन्तै सम्पर्क गर्नुहोस्! 🚨\n\nIf you're in pain, call us immediately at +977 980-0000000. We handle dental emergencies same-day.\n\nIn the meantime: rinse with warm salt water, and avoid very hot/cold foods.",
  hours:
    "🕘 Opening Hours:\n• Sunday - Friday: 9:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 2:00 PM\n\n📍 Near Traffic Chowk, Butwal-11",
  default:
    "Thank you for your message! 😊 I'm Sushma, your dental assistant. I can help with:\n\n• Service information & pricing\n• Booking appointments\n• Emergency guidance\n\nHow can I help you today?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("service") || lower.includes("offer") || lower.includes("sewa") || lower.includes("सेवा"))
    return botResponses.services;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("much") || lower.includes("cleaning") || lower.includes("kati"))
    return botResponses.cost;
  if (lower.includes("pain") || lower.includes("hurt") || lower.includes("dukhyo") || lower.includes("dukh") || lower.includes("dat") || lower.includes("दुख") || lower.includes("दाँत"))
    return botResponses.pain;
  if (lower.includes("hour") || lower.includes("open") || lower.includes("time") || lower.includes("kada") || lower.includes("samay"))
    return botResponses.hours;
  if (lower.includes("book") || lower.includes("appointment"))
    return "Great! You can book directly on our website. Scroll down to the booking form, or call us at +977 980-0000000. We'll confirm within 30 minutes! 📞";
  return botResponses.default;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "नमस्ते! 🙏 I'm Sushma, your dental assistant at Smile Dental Clinic. How can I help you today?\n\nम तपाईंलाई सेवा, मूल्य, वा अपोइन्टमेन्टको बारेमा मद्दत गर्न सक्छु।",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(text);
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Open chat"
          >
            <Bot className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden bg-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{ background: "var(--hero-gradient)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-foreground">Sushma</p>
                  <p className="text-xs text-primary-foreground/70">Dental Assistant · Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-primary-foreground/10 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors font-medium"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Type your message..."
                className="rounded-xl text-sm"
              />
              <Button
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="rounded-xl bg-primary text-primary-foreground shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
