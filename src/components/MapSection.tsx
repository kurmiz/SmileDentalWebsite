import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const MapSection = () => {
  return (
    <section id="location" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Find Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            Visit Our Clinic
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8!2d83.4539!3d27.7006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAyLjIiTiA4M8KwMjcnMTQuMCJF!5e0!3m2!1sen!2snp!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dental clinic location in Butwal near Traffic Chowk"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Location</h3>
                <p className="text-muted-foreground">Near Traffic Chowk, Butwal-11</p>
                <p className="text-muted-foreground">Rupandehi, Lumbini Province, Nepal</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Opening Hours</h3>
                <p className="text-muted-foreground">Sun – Fri: 9:00 AM – 6:00 PM</p>
                <p className="text-muted-foreground">Saturday: 10:00 AM – 2:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Contact</h3>
                <p className="text-muted-foreground">+977 980-0000000</p>
                <p className="text-muted-foreground">info@smiledentalbutwal.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
