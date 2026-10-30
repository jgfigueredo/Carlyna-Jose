import { motion } from "framer-motion";
import { content } from "../content";

export function Letter() {
  const paragraphs = content.letter.body.split("\n\n");

  return (
    <section className="snap-section relative flex min-h-dvh w-full flex-col bg-wine px-4 py-[max(1.2rem,env(safe-area-inset-top))]">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="paper paper-grain relative mx-auto w-full max-w-[400px] overflow-hidden rounded-3xl px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <img
          src="/images/rose.jpg"
          alt=""
          className="pointer-events-none absolute -right-6 -top-4 z-10 h-24 w-24 rotate-12 object-cover opacity-80 mask-[radial-gradient(circle,black_40%,transparent_72%)]"
        />

        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#8a6a55]">
          Una carta para ti
        </p>
        <h3 className="mt-4 font-script text-4xl text-[#4a1520]">{content.letter.greeting}</h3>

        <div className="selectable mt-5 space-y-4 font-serif text-[15px] leading-7 text-[#4a1520]/90">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="mt-8">
          <p className="font-serif italic text-burgundy">{content.letter.signOff}</p>
          <p className="mt-1 font-script text-4xl text-[#4a1520]">{content.letter.signature}</p>
        </div>

        <img
          src="/images/hands.jpg"
          alt=""
          className="mt-6 h-28 w-full rounded-2xl object-cover opacity-90"
        />
      </motion.article>
    </section>
  );
}
