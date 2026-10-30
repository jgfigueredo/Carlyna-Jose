import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";

export function Memories() {
  const photos = content.memories;
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const [drag, setDrag] = useState(0);

  const go = (next: number) => {
    const wrapped = (next + photos.length) % photos.length;
    setIndex(wrapped);
    setDrag(0);
  };

  return (
    <section className="snap-section relative flex h-dvh w-full flex-col overflow-hidden bg-wine px-5 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.35 }}
        className="mb-5 text-center"
      >
        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-gold">Galería</p>
        <h3 className="mt-2 font-serif text-[1.85rem] leading-tight text-cream">
          Recuerdos que no se borran
        </h3>
        <div className="gold-line mx-auto mt-3 w-20" />
      </motion.div>

      <div
        className="relative flex flex-1 items-center"
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX;
          deltaX.current = 0;
        }}
        onTouchMove={(e) => {
          deltaX.current = e.touches[0].clientX - startX.current;
          setDrag(deltaX.current);
        }}
        onTouchEnd={() => {
          if (deltaX.current < -50) go(index + 1);
          else if (deltaX.current > 50) go(index - 1);
          else setDrag(0);
        }}
        onMouseDown={(e) => {
          startX.current = e.clientX;
          deltaX.current = 0;
          const move = (ev: MouseEvent) => {
            deltaX.current = ev.clientX - startX.current;
            setDrag(deltaX.current);
          };
          const up = () => {
            if (deltaX.current < -50) go(index + 1);
            else if (deltaX.current > 50) go(index - 1);
            else setDrag(0);
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
          };
          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        {photos.map((photo, i) => {
          const offset = i - index;
          const isActive = i === index;
          return (
            <motion.figure
              key={photo.src}
              className="absolute left-1/2 top-1/2 w-[78%] max-w-[320px]"
              style={{ zIndex: photos.length - Math.abs(offset) }}
              animate={{
                x: `calc(-50% + ${offset * 18 + (isActive ? drag * 0.2 : 0)}px)`,
                y: "-50%",
                rotate: offset * 4 + (isActive ? drag * 0.02 : 0),
                scale: isActive ? 1 : 0.9,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="rounded-[18px] bg-cream p-2.5 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="aspect-4/5 overflow-hidden rounded-xl bg-[#2a1518]">
                  <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3 text-center font-script text-2xl text-[#4a1520]">
                  {photo.caption}
                </figcaption>
              </div>
            </motion.figure>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/25"
              }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] tracking-[0.25em] text-rose/80">
        DESLIZA LAS FOTOS
      </p>
    </section>
  );
}
