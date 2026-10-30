import { useRef } from "react";
import { content } from "../content";
import { Hearts } from "./Hearts";

type FooterSectionProps = {
  onOpenQuiz: () => void;
};

export function FooterSection({ onOpenQuiz }: FooterSectionProps) {
  const startY = useRef(0);

  return (
    <section
      className="snap-section relative flex h-dvh w-full flex-col overflow-hidden"
      onTouchStart={(e) => {
        startY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const dy = startY.current - e.changedTouches[0].clientY;
        if (dy > 70) onOpenQuiz();
      }}
    >
      <img src="/images/footer.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0c0507] via-[#0c0507]/55 to-[#0c0507]/25" />
      <Hearts count={10} />

      <div className="relative mt-auto flex flex-col items-center px-8 pb-10 pt-20 text-center">
        <div className="gold-line mx-auto my-6 w-24" />
        <p className="font-script text-5xl text-gold">{content.footer.closing}</p>

        <button
          type="button"
          onClick={onOpenQuiz}
          className="mt-10 flex flex-col items-center gap-1 text-cream"
        >
          <span className="chevron-nudge text-2xl">⌃</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold">
            {content.footer.hint}
          </span>
          <span className="mt-1 text-[10px] text-cream/50">hay una pregunta para ti</span>
        </button>
      </div>
    </section>
  );
}
