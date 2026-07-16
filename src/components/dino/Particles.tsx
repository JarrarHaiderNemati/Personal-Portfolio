import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.5,
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "var(--amber)",
            opacity: p.opacity,
            filter: "blur(0.3px)",
            boxShadow: "0 0 6px var(--amber)",
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
