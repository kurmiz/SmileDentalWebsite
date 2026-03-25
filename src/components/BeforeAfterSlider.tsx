import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import beforeImg from "@/assets/smile-before.jpg";
import afterImg from "@/assets/smile-after.jpg";

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    },
    [updatePosition]
  );

  return (
    <section id="results" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Real Results</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            See the Transformation
          </h2>
          <p className="text-muted-foreground mt-3">Drag the slider to compare before & after</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-lg"
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMove}
            onTouchStart={() => (isDragging.current = true)}
            onTouchEnd={() => (isDragging.current = false)}
            onTouchMove={handleMove}
          >
            {/* After Image (full) */}
            <img
              src={afterImg}
              alt="After dental treatment"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={800}
              height={800}
            />

            {/* Before Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={beforeImg}
                alt="Before dental treatment"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth || "100%" }}
                loading="lazy"
                width={800}
                height={800}
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L3 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 4L17 10L13 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-foreground/70 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              AFTER
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
