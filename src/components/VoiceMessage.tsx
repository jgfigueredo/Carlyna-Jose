import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const BAR_COUNT = 28;

export function VoiceMessage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => {
      setDuration(audio.duration || 0);
      setReady(true);
    };
    const onEnded = () => setPlaying(false);
    const onError = () => setMissing(true);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <section className="snap-section relative flex h-dvh w-full flex-col justify-center overflow-hidden bg-wine px-6">
      <audio ref={audioRef} src={content.voice.src} preload="metadata" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        className="relative mx-auto w-full max-w-[380px]"
      >
        <p className="text-center font-serif text-[11px] uppercase tracking-[0.4em] text-gold">
          Escúchame
        </p>
        <h3 className="mt-2 text-center font-serif text-3xl text-cream">
          {content.voice.title}
        </h3>
        <p className="mt-2 text-center font-serif italic text-rose">{content.from}</p>

        <div className="mt-10 rounded-[28px] bg-linear-to-b from-[#2a151a] to-[#14080c] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              disabled={missing}
              className="heart-beat flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose text-wine shadow-lg disabled:opacity-50"
              aria-label={playing ? "Pausar mensaje" : "Reproducir mensaje"}
            >
              {playing ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex h-10 items-center gap-[3px]">
                {Array.from({ length: BAR_COUNT }).map((_, i) => {
                  const base = 30 + ((i * 47) % 70);
                  const active = playing || (ready && progress > 0);
                  return (
                    <span
                      key={i}
                      className={`w-[3px] rounded-full ${i / BAR_COUNT < (duration ? progress / duration : 0)
                          ? "bg-gold"
                          : "bg-cream/25"
                        } ${active ? "wave-bar" : ""}`}
                      style={{
                        height: `${base}%`,
                        animationDelay: `${(i % 8) * 0.08}s`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-rose">
                <span>{formatTime(progress)}</span>
                <span>{missing ? "—" : formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center font-serif text-sm italic text-cream/70">
            {missing
              ? "Tu voz va aquí. Agrega el archivo mensaje.mp3 y este corazón hablará."
              : "Cierra los ojos. Esto es solo para ti."}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
