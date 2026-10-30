import { motion } from "framer-motion";
import { content } from "../content";

export function Banner() {
  return (
    <section className="snap-section relative h-dvh w-full overflow-hidden">
      <img
        src="/images/banner.jpg"
        alt="Jose y Carlyna"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-wine via-wine/35 to-wine/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,4,6,0.45)_100%)]" />

      <div className="relative flex h-full flex-col justify-end px-7 pb-14 pt-[max(3rem,env(safe-area-inset-top))]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-serif text-[11px] uppercase tracking-[0.5em] text-gold">
            {content.date}
          </p>
          <h2 className="mt-3 font-script text-6xl leading-none text-cream">
            {content.to}
            <span className="mx-2 text-3xl text-gold">&</span>
            {content.from}
          </h2>
          <p className="mt-4 max-w-[16rem] font-serif text-lg italic text-cream/80">
            {content.bannerCaption}
          </p>
          <div className="gold-line mt-6 w-24" />
          <p className="chevron-nudge mt-8 text-center text-cream/50">⌃</p>
        </motion.div>
      </div>
    </section>
  );
}
