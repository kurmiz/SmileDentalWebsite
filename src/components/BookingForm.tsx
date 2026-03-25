import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 0 && !/^(98|97|96)\d{8}$/.test(cleaned)) {
      setPhoneError("Please enter a valid Nepali number (98/97/96...)");
    } else {
      setPhoneError("");
    }
    setFormData({ ...formData, phone: cleaned });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (phoneError || formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit Nepali phone number.");
      return;
    }
    if (!formData.service) {
      setError("Please select a service");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        service: formData.service,
        message: formData.message.trim(),
      };

      console.debug("BookingForm payload:", payload);

      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const serverMsg = data?.message || "Failed to create appointment";
        console.error("BookingForm error response:", data);
        throw new Error(serverMsg);
      }

      setSubmitted(true);
      toast.success("Appointment request sent! We'll contact you shortly.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-secondary">
        <div className="container max-w-lg">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center glass-card rounded-2xl p-10 border border-border"
          >
            <CheckCircle className="w-16 h-16 text-trust mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              धन्यवाद! हामी तपाईंलाई चाँडै सम्पर्क गर्नेछौं।
            </p>
            <p className="text-muted-foreground mt-1">
              We'll call you within 30 minutes to confirm your appointment.
            </p>
            <Button className="mt-6" onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", phone: "", service: "", message: "" });
            }}>
              Book Another
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-secondary">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Book Now</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            Schedule Your Visit
          </h2>
          <p className="text-muted-foreground mt-3">
            अपोइन्टमेन्ट बुक गर्नुहोस् — Free consultation for first-time patients!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 md:p-8 border border-border space-y-5"
        >
          {error && (
            <div className="flex gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <User className="w-4 h-4 text-primary" /> Full Name
            </label>
            <Input
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Ram Bahadur"
              maxLength={100}
              className="py-5 rounded-xl"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <Phone className="w-4 h-4 text-primary" /> Phone Number
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 rounded-xl bg-muted text-muted-foreground text-sm font-medium border border-border">
                +977
              </span>
              <Input
                required
                name="phone"
                value={formData.phone}
                onChange={(e) => validatePhone(e.target.value)}
                placeholder="98XXXXXXXX"
                maxLength={10}
                className="py-5 rounded-xl"
                disabled={loading}
              />
            </div>
            {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-primary" /> Service
            </label>
            <Select value={formData.service} onValueChange={handleServiceChange} disabled={loading}>
              <SelectTrigger className="py-5 rounded-xl">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">Dental Checkup</SelectItem>
                <SelectItem value="whitening">Teeth Whitening</SelectItem>
                <SelectItem value="implant">Dental Implant</SelectItem>
                <SelectItem value="rootcanal">Root Canal</SelectItem>
                <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                <SelectItem value="kids">Kids Dentistry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <MessageSquare className="w-4 h-4 text-primary" /> Message (Optional)
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your concern..."
              maxLength={500}
              className="rounded-xl"
              rows={3}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full py-6 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Requesting...
              </>
            ) : (
              "Request Appointment"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            We'll call you within 30 minutes to confirm. No spam, ever.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingForm;
