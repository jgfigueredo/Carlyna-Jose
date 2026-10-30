import { motion } from "framer-motion";
import { content } from "../content";
import { Hearts } from "./Hearts";

type OpeningProps = {
  onOpen: () => void;
};

export function Opening({ onOpen }: OpeningProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#4a1c28_0%,#1a0b0e_45%,#0c0507_100%)]" />
      <div className="vignette absolute inset-0" />
      <Hearts count={16} />

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -0.6 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="paper paper-grain relative w-full max-w-[340px] overflow-hidden rounded-[28px] px-7 pb-8 pt-9 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute left-4 right-4 top-3 flex justify-between text-[10px] tracking-[0.35em] text-[#8a6a55]">
          <span>J</span>
          <span>C</span>
        </div>

        <p className="mt-3 text-center font-serif text-[11px] uppercase tracking-[0.45em] text-[#8a6a55]">
          {content.date}
        </p>

        <p className="mt-8 text-center font-serif text-sm uppercase tracking-[0.55em] text-burgundy">
          Para
        </p>
        <h1 className="mt-1 text-center font-script text-[4.4rem] leading-[0.9] text-[#4a1520]">
          {content.to}
        </h1>

        <div className="gold-line mx-auto my-5 w-28" />

        <p className="text-center font-serif text-sm italic text-burgundy/80">de</p>
        <p className="mt-1 text-center font-script text-4xl text-[#4a1520]">{content.from}</p>

        <div className="mt-8 flex justify-center">
          <div className="seal-glow relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d46a6a,#7a1f2b_62%,#4a1018)]">
            <span className="font-script text-2xl text-[#f6e2b8]">
              J<span className="mx-0.5 text-base">♥</span>C
            </span>
          </div>
        </div>

        <p className="mt-6 text-center font-serif text-xs italic leading-relaxed text-[#7a5a48]">
          Una carta para abrir con el corazón.
        </p>
      </motion.div>

      <motion.p
        className="pulse-soft relative z-10 mt-10 font-sans text-[11px] uppercase tracking-[0.42em] text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        toca para continuar
      </motion.p>
    </motion.button>
  );
}
