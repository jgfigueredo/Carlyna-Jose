import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../content";
import { Hearts } from "./Hearts";

type QuizProps = {
  onClose: () => void;
};

export function Quiz({ onClose }: QuizProps) {
  const questions = content.quiz.questions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const finished = step >= questions.length;
  const current = questions[step];

  const choose = (optionId: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
    window.setTimeout(() => setStep((s) => s + 1), 220);
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-wine"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#4a1c28_0%,#1a0b0e_55%)]" />
      <Hearts count={8} />

      <div className="relative flex items-center justify-between px-5 pt-[max(1.2rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] uppercase tracking-[0.28em] text-gold"
        >
          Volver
        </button>
        <p className="font-serif text-[11px] uppercase tracking-[0.35em] text-cream/60">
          {finished ? "Fin" : `${step + 1} / ${questions.length}`}
        </p>
        <span className="w-12" />
      </div>

      {!finished && (
        <div className="relative mx-5 mt-3 flex gap-1">
          {questions.map((q, i) => (
            <span
              key={q.id}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold" : "bg-white/10"}`}
            />
          ))}
        </div>
      )}

      <div className="relative flex flex-1 flex-col px-6 pb-8 pt-6">
        <AnimatePresence mode="wait">
          {!finished && current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28 }}
              className="flex flex-1 flex-col"
            >
              <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-gold">
                {content.quiz.subtitle}
              </p>
              <h3 className="mt-4 font-serif text-[1.7rem] leading-snug text-cream">
                {current.question}
              </h3>

              <div className="mt-8 flex flex-col gap-3">
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => choose(opt.id)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left ring-1 transition ${selected
                        ? "bg-gold/20 ring-gold"
                        : "bg-white/5 ring-white/10 active:bg-white/10"
                        }`}
                    >
                      <span className="font-serif text-lg text-cream">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              <p className="heart-beat text-4xl">♥</p>
              <h3 className="mt-4 font-script text-5xl text-gold">
                {content.quiz.finaleTitle}
              </h3>
              <p className="mt-6 max-w-[20rem] font-serif text-lg leading-relaxed text-cream/90">
                {content.quiz.finaleText}
              </p>
              <p className="mt-8 font-script text-4xl text-cream">
                {content.from} + {content.to}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-10 rounded-full bg-cream px-6 py-3 text-xs uppercase tracking-[0.28em] text-wine"
              >
                Guardar esta carta
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
