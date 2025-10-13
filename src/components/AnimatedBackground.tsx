import React from 'react';

/**
 * AnimatedBackground
 * A subtle, accessible animated background featuring farm / cattle silhouettes.
 * - Hidden on small screens (mobile) to avoid distraction and performance cost
 * - Respects prefers-reduced-motion
 * - Lightweight SVG + CSS animations
 */
const AnimatedBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#062e14" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0a3a1a" stopOpacity="0.06" />
          </linearGradient>

          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* gentle sky overlay */}
        <rect width="100%" height="100%" fill="url(#sky)" />

        {/* distant rolling hills */}
        <g transform="translate(0,420) scale(1)">
          <path d="M0 200 C200 120 400 180 600 150 C800 120 1000 200 1200 170 C1400 140 1600 190 1600 190 L1600 900 L0 900 Z" fill="#e9f6ef" />
          <path d="M0 260 C250 200 500 260 750 220 C1000 180 1250 260 1600 220 L1600 900 L0 900 Z" fill="#dff3e6" opacity="0.9" />
        </g>

        {/* animated cattle silhouettes (three layers) */}
        <g className="cattle-layer cattle-back" transform="translate(0,360)">
          <g className="float slow" transform="translate(100,60) scale(0.9)">
            <path d="M0 40 Q20 10 60 10 Q80 10 100 20 Q120 30 140 28 Q160 26 180 30 Q210 36 240 34 Q260 33 290 40 L290 68 Q250 60 210 64 Q170 68 130 70 Q90 72 60 78 Q30 84 0 80 Z" fill="#cbded0" />
            <circle cx="40" cy="30" r="6" fill="#9bbca7" />
          </g>
          <g className="float slower" transform="translate(600,90) scale(1)">
            <path d="M0 50 Q30 20 80 18 Q120 18 150 30 Q180 42 220 40 Q250 38 290 44 Q320 50 360 48 L360 84 Q320 76 280 80 Q240 84 200 86 Q160 88 120 92 Q80 96 40 94 Q0 92 0 92 Z" fill="#cbded0" />
            <circle cx="110" cy="36" r="6" fill="#9bbca7" />
          </g>
        </g>

        <g className="cattle-layer cattle-front" transform="translate(0,480)">
          <g className="float" transform="translate(300,40) scale(1.05)">
            <path d="M0 50 Q40 10 100 8 Q140 8 180 22 Q220 36 260 34 Q300 32 340 38 Q380 44 420 42 L420 86 Q360 80 300 84 Q240 88 180 92 Q120 96 60 100 Q0 96 0 96 Z" fill="#f7fbf7" />
            <circle cx="70" cy="30" r="6" fill="#d2edd7" />
          </g>
        </g>

        {/* subtle overlay gradient to deepen bottom */}
        <rect y="520" width="100%" height="380" fill="#063014" opacity="0.02" />
      </svg>

      <style>
        {`
        .cattle-layer path { transform-origin: center; }

        /* animation presets */
        .float { animation: floatY 8s ease-in-out infinite alternate; }
        .float.slow { animation-duration: 12s; }
        .float.slower { animation-duration: 18s; }

        @keyframes floatY {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .float, .float.slow, .float.slower { animation: none !important; }
        }

        /* Hide background on small screens to save perf */
        @media (max-width: 640px) {
          .animated-bg-hidden-mobile { display: none; }
        }
        `}
      </style>
    </div>
  );
};

export default AnimatedBackground;
