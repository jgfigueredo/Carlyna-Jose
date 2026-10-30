type HeartsProps = {
  count?: number;
  className?: string;
};

export function Hearts({ count = 14, className = "" }: HeartsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 7.3 + 4) % 100;
        const delay = (i * 0.65) % 8;
        const duration = 7 + (i % 5);
        const drift = `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 18))}px`;
        const size = 8 + (i % 10);
        return (
          <span
            key={i}
            className="float-heart absolute bottom-0 text-rose-300/80"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${size}px`,
              ["--drift" as string]: drift,
            }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}

export function Petals({ count = 10 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 11 + 6) % 100;
        const delay = (i * 0.9) % 9;
        const duration = 9 + (i % 6);
        const drift = `${(i % 2 === 0 ? 1 : -1) * (30 + (i % 40))}px`;
        return (
          <span
            key={i}
            className="fall-petal absolute -top-8 text-rose-400/70"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--drift" as string]: drift,
              fontSize: `${10 + (i % 8)}px`,
            }}
          >
            ❀
          </span>
        );
      })}
    </div>
  );
}
