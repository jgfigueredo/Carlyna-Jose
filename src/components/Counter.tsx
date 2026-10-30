import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  years: number;
  months: number;
  leftoverDays: number;
};

function compute(from: Date, to: Date): Parts {
  const diff = Math.max(0, to.getTime() - from.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let leftoverDays = to.getDate() - from.getDate();

  if (leftoverDays < 0) {
    months -= 1;
    const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    leftoverDays += prev;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { days, hours, minutes, seconds, years, months, leftoverDays };
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/5 px-1.5 py-3 backdrop-blur">
      <span className="font-serif text-[1.65rem] tabular-nums text-cream">{display}</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-gold">{label}</span>
    </div>
  );
}

export function Counter() {
  const start = new Date(content.startDate);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = compute(start, now);
  const startLabel = start.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const human = [
    parts.years > 0 ? `${parts.years} ${parts.years === 1 ? "año" : "años"}` : null,
    parts.months > 0 ? `${parts.months} ${parts.months === 1 ? "mes" : "meses"}` : null,
    `${parts.leftoverDays} ${parts.leftoverDays === 1 ? "día" : "días"}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="snap-section relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#12080b] px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#6b2d3c33,transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        className="relative w-full max-w-[380px] text-center"
      >
        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-gold">
          Nuestro tiempo
        </p>
        <h3 className="mt-3 font-serif text-3xl text-cream">Llevamos juntos</h3>
        <p className="heart-beat mt-3 text-3xl text-rose">♥</p>

        <p className="mt-2 font-script text-3xl text-gold">{human}</p>

        <div className="mt-8 grid grid-cols-4 gap-2">
          <Unit value={parts.days} label="días" />
          <Unit value={parts.hours} label="horas" />
          <Unit value={parts.minutes} label="minutos" />
          <Unit value={parts.seconds} label="segundos" />
        </div>

        <p className="mt-8 font-serif text-sm italic text-cream/70">
          Desde el {startLabel}.
          <br />
          Cada segundo, te elijo otra vez.
        </p>
      </motion.div>
    </section>
  );
}
