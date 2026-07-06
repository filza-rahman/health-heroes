import { useEffect, useState } from 'react';

export function ParticleEffect({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1500);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float-up 1.5s ease-out forwards`,
          }}
        >
          {['🎉', '⭐', '✨', '🎊'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
