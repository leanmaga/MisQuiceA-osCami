import React, { useState, useEffect, useCallback } from "react";

const ButterflyScrollAnimation = () => {
  const [butterflies, setButterflies] = useState([]);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  // SVG de mariposa con color lila
  const ButterflyIcon = ({ style }) => (
    <div className="absolute pointer-events-none z-10" style={style}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="butterfly-svg"
      >
        {/* Cuerpo de la mariposa */}
        <ellipse cx="50" cy="50" rx="2" ry="20" fill="#8B5CF6" />

        {/* Alas superiores */}
        <ellipse
          cx="35"
          cy="35"
          rx="15"
          ry="20"
          fill="#A855F7"
          opacity="0.8"
          transform="rotate(-30 35 35)"
        />
        <ellipse
          cx="65"
          cy="35"
          rx="15"
          ry="20"
          fill="#A855F7"
          opacity="0.8"
          transform="rotate(30 65 35)"
        />

        {/* Alas inferiores */}
        <ellipse
          cx="40"
          cy="65"
          rx="10"
          ry="15"
          fill="#C084FC"
          opacity="0.7"
          transform="rotate(-15 40 65)"
        />
        <ellipse
          cx="60"
          cy="65"
          rx="10"
          ry="15"
          fill="#C084FC"
          opacity="0.7"
          transform="rotate(15 60 65)"
        />

        {/* Antenas */}
        <line
          x1="48"
          y1="30"
          x2="45"
          y2="25"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <line
          x1="52"
          y1="30"
          x2="55"
          y2="25"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <circle cx="45" cy="25" r="1.5" fill="#8B5CF6" />
        <circle cx="55" cy="25" r="1.5" fill="#8B5CF6" />

        {/* Decoraciones en las alas */}
        <circle cx="35" cy="35" r="3" fill="#DDD6FE" opacity="0.6" />
        <circle cx="65" cy="35" r="3" fill="#DDD6FE" opacity="0.6" />
        <circle cx="40" cy="65" r="2" fill="#DDD6FE" opacity="0.6" />
        <circle cx="60" cy="65" r="2" fill="#DDD6FE" opacity="0.6" />
      </svg>
    </div>
  );

  const createButterfly = useCallback(() => {
    const id = Math.random().toString(36).substr(2, 9);
    const startX = Math.random() * (window.innerWidth - 40);
    const duration = 3 + Math.random() * 2; // 3-5 segundos
    const delay = Math.random() * 0.5; // 0-0.5 segundos de delay

    return {
      id,
      startX,
      duration,
      delay,
      createdAt: Date.now(),
    };
  }, []);

  const generateButterflies = useCallback(() => {
    const numberOfButterflies = Math.floor(Math.random() * 3) + 2; // 2-4 mariposas
    const newButterflies = Array.from(
      { length: numberOfButterflies },
      createButterfly
    );

    setButterflies((prev) => [...prev, ...newButterflies]);

    // Limpiar mariposas viejas después de 6 segundos
    setTimeout(() => {
      setButterflies((prev) =>
        prev.filter((butterfly) => Date.now() - butterfly.createdAt < 6000)
      );
    }, 6000);
  }, [createButterfly]);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        generateButterflies();

        // Throttle para evitar demasiadas mariposas
        setTimeout(() => {
          isScrolling = false;
        }, 200);
      }
    };

    const throttledScroll = (e) => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      setScrollTimeout(
        setTimeout(() => {
          handleScroll();
        }, 100)
      );
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("touchmove", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("touchmove", throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [generateButterflies, scrollTimeout]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {butterflies.map((butterfly) => (
        <ButterflyIcon
          key={butterfly.id}
          style={{
            left: `${butterfly.startX}px`,
            animationName: "butterflyFly",
            animationDuration: `${butterfly.duration}s`,
            animationDelay: `${butterfly.delay}s`,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes butterflyFly {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateY(75vh) translateX(20px) rotate(5deg) scale(1);
          }
          50% {
            transform: translateY(50vh) translateX(-10px) rotate(-3deg)
              scale(1.1);
          }
          75% {
            transform: translateY(25vh) translateX(15px) rotate(8deg) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) translateX(-5px) rotate(-2deg)
              scale(0.9);
            opacity: 0;
          }
        }

        .butterfly-svg {
          animation: butterflyWings 0.8s ease-in-out infinite alternate;
          filter: drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3));
        }

        @keyframes butterflyWings {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(1.1);
          }
        }

        @media (max-width: 768px) {
          .butterfly-svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default ButterflyScrollAnimation;
