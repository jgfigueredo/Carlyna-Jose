import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SpotifyLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1DB954" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function MusicPlayer() {
  const songs = content.songs;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = song.src;
    audio.load();
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    }
  }, [index, song.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => setIndex((i) => (i + 1) % songs.length);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [songs.length]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const pct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  const bars = useMemo(
    () => Array.from({ length: 18 }, (_, i) => 8 + ((i * 37) % 18)),
    [],
  );

  return (
    <section className="snap-section relative flex h-dvh w-full flex-col overflow-hidden bg-[#12080b] px-6 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))]">
      <audio ref={audioRef} preload="metadata" />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-burgundy/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.35 }}
        transition={{ duration: 0.7 }}
        className="relative flex h-full flex-col"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-gold">
              Playlist
            </p>
            <h3 className="mt-1 font-serif text-2xl text-cream">{content.playlistName}</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#1DB954]/10 px-2.5 py-1">
            <SpotifyLogo className="h-4 w-4" />
            <span className="text-[10px] font-medium tracking-wide text-[#1DB954]">Spotify</span>
          </div>
        </div>

        <div className="relative mx-auto mt-5 flex h-[min(220px,34dvh)] w-[min(220px,34dvh)] items-center justify-center">
          <div
            className={`vinyl relative h-full w-full rounded-full ${playing ? "vinyl-spin" : ""}`}
          >
            <div className="absolute inset-[28%] overflow-hidden rounded-full border-[3px] border-[#2a1a12] shadow-inner">
              <img src="/images/album.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a] ring-2 ring-gold/70" />
          </div>
          <div
            className="absolute -right-2 top-4 origin-top-right transition-transform duration-500"
            style={{ transform: playing ? "rotate(18deg)" : "rotate(-8deg)" }}
          >
            <div className="h-3 w-3 rounded-full bg-gold shadow" />
            <div className="ml-[5px] h-28 w-[3px] origin-top rounded-full bg-linear-to-b from-gold to-[#8a6a4a]" />
            <div className="-ml-0.5 h-4 w-4 rounded-sm bg-[#c9a07a]" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-serif text-xl text-cream">{song.title}</p>
          <p className="mt-0.5 text-xs tracking-wide text-rose">{song.artist}</p>
        </div>

        <div className="mt-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[#3a2428] accent-gold"
            style={{
              background: `linear-gradient(90deg, #d4af7a ${pct}%, #3a2428 ${pct}%)`,
            }}
          />
          <div className="mt-1 flex justify-between font-sans text-[10px] text-rose/80">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + songs.length) % songs.length)}
            className="text-cream/70"
            aria-label="Anterior"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-wine shadow-lg"
            aria-label={playing ? "Pausar" : "Reproducir"}
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
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % songs.length)}
            className="text-cream/70"
            aria-label="Siguiente"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex-1 space-y-1.5 overflow-auto no-scrollbar">
          {songs.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPlaying(true);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${active ? "bg-white/10" : "bg-transparent"
                  }`}
              >
                <span className="w-4 text-center text-[11px] text-gold">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${active ? "text-cream" : "text-cream/70"}`}>
                    {item.title}
                  </p>
                  <p className="truncate text-[11px] text-rose">{item.artist}</p>
                </div>
                {active && playing ? (
                  <div className="flex h-4 items-end gap-0.5">
                    {bars.slice(0, 4).map((h, bi) => (
                      <span
                        key={bi}
                        className="wave-bar w-0.5 rounded-full bg-[#1DB954]"
                        style={{ height: h, animationDelay: `${bi * 0.12}s` }}
                      />
                    ))}
                  </div>
                ) : (
                  <SpotifyLogo className="h-3.5 w-3.5 opacity-50" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
