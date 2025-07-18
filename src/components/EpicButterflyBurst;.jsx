import React, { useState, useEffect, useCallback } from "react";

const EpicButterflyBurst = () => {
  const [burst, setBurst] = useState(null);
  const [canTrigger, setCanTrigger] = useState(true);

  // Pool de 12 mariposas reutilizables para optimización
  const BUTTERFLY_COUNT = 12;

  const triggerBurst = useCallback(() => {
    if (!canTrigger) return;

    const burstId = Date.now();
    setBurst(burstId);

    // Bloquear nuevos burst por 1.5 segundos
    setCanTrigger(false);
    setTimeout(() => setCanTrigger(true), 1500);

    // Limpiar el burst después de la animación
    setTimeout(() => {
      setBurst(null);
    }, 2500);
  }, [canTrigger]);

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout) return;

      scrollTimeout = setTimeout(() => {
        triggerBurst();
        scrollTimeout = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [triggerBurst]);

  if (!burst) return null;

  // Generar posiciones en círculos perfectos (matemática épica)
  const generateButterflyPositions = () => {
    const positions = [];
    const radius1 = 150; // Círculo interno
    const radius2 = 280; // Círculo externo

    // 6 mariposas en círculo interno
    for (let i = 0; i < 6; i++) {
      const angle = i * 60 * (Math.PI / 180);
      positions.push({
        x: Math.cos(angle) * radius1,
        y: Math.sin(angle) * radius1,
        rotation: angle * (180 / Math.PI) + 90,
        delay: i * 0.1,
        scale: 0.8 + Math.random() * 0.4,
      });
    }

    // 6 mariposas en círculo externo
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 + 30) * (Math.PI / 180); // Offset de 30°
      positions.push({
        x: Math.cos(angle) * radius2,
        y: Math.sin(angle) * radius2,
        rotation: angle * (180 / Math.PI) + 90,
        delay: 0.3 + i * 0.1,
        scale: 0.6 + Math.random() * 0.5,
      });
    }

    return positions;
  };

  const positions = generateButterflyPositions();

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {positions.map((pos, index) => (
          <div
            key={`${burst}-${index}`}
            className="absolute butterfly-burst"
            style={{
              "--end-x": `${pos.x}px`,
              "--end-y": `${pos.y}px`,
              "--rotation": `${pos.rotation}deg`,
              "--delay": `${pos.delay}s`,
              "--scale": pos.scale,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="butterfly-icon"
            >
              {/* Cuerpo */}
              <ellipse cx="50" cy="50" rx="2.5" ry="25" fill="#8B5CF6" />

              {/* Alas superiores */}
              <ellipse
                cx="32"
                cy="32"
                rx="18"
                ry="22"
                fill="#A855F7"
                opacity="0.9"
                transform="rotate(-25 32 32)"
              />
              <ellipse
                cx="68"
                cy="32"
                rx="18"
                ry="22"
                fill="#A855F7"
                opacity="0.9"
                transform="rotate(25 68 32)"
              />

              {/* Alas inferiores */}
              <ellipse
                cx="38"
                cy="68"
                rx="12"
                ry="18"
                fill="#C084FC"
                opacity="0.8"
                transform="rotate(-10 38 68)"
              />
              <ellipse
                cx="62"
                cy="68"
                rx="12"
                ry="18"
                fill="#C084FC"
                opacity="0.8"
                transform="rotate(10 62 68)"
              />

              {/* Antenas */}
              <line
                x1="47"
                y1="25"
                x2="43"
                y2="18"
                stroke="#8B5CF6"
                strokeWidth="1.5"
              />
              <line
                x1="53"
                y1="25"
                x2="57"
                y2="18"
                stroke="#8B5CF6"
                strokeWidth="1.5"
              />
              <circle cx="43" cy="18" r="2" fill="#8B5CF6" />
              <circle cx="57" cy="18" r="2" fill="#8B5CF6" />

              {/* Patrones en alas */}
              <circle cx="32" cy="32" r="4" fill="#DDD6FE" opacity="0.8" />
              <circle cx="68" cy="32" r="4" fill="#DDD6FE" opacity="0.8" />
              <circle cx="38" cy="68" r="3" fill="#F3E8FF" opacity="0.9" />
              <circle cx="62" cy="68" r="3" fill="#F3E8FF" opacity="0.9" />

              {/* Detalles dorados */}
              <circle cx="32" cy="28" r="1.5" fill="#F59E0B" opacity="0.7" />
              <circle cx="68" cy="28" r="1.5" fill="#F59E0B" opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        .butterfly-burst {
          animation: epicBurst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: var(--delay);
          transform: translate(0, 0) rotate(0deg) scale(0);
        }

        .butterfly-icon {
          filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4));
          animation: butterflyFlutter 0.4s ease-in-out infinite alternate;
        }

        @keyframes epicBurst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(var(--scale));
          }
          70% {
            opacity: 1;
            transform: translate(var(--end-x), var(--end-y))
              rotate(var(--rotation)) scale(var(--scale));
          }
          100% {
            opacity: 0;
            transform: translate(
                calc(var(--end-x) * 1.3),
                calc(var(--end-y) * 1.3)
              )
              rotate(calc(var(--rotation) + 180deg)) scale(0.3);
          }
        }

        @keyframes butterflyFlutter {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(1.15);
          }
        }

        /* Efecto de núcleo central */
        .butterfly-burst:nth-child(1)::before,
        .butterfly-burst:nth-child(7)::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.6) 0%,
            transparent 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: coreGlow 0.8s ease-out;
        }

        @keyframes coreGlow {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }

        /* Optimización para móviles */
        @media (max-width: 768px) {
          .butterfly-burst {
            --end-x: calc(var(--end-x) * 0.7);
            --end-y: calc(var(--end-y) * 0.7);
          }

          .butterfly-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default EpicButterflyBurst;
