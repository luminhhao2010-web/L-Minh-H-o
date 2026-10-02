import React from 'react';

interface MascotKienSangProps {
  size?: number | string;
  expression?: 'waving' | 'celebrate' | 'thinking' | 'captain' | 'happy';
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export const MascotKienSang: React.FC<MascotKienSangProps> = ({
  size = 80,
  expression = 'waving',
  className = '',
  showBadge = false,
  badgeText = 'Kiến Sáng'
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: pixelSize, height: pixelSize }}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bodyOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="60%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#E03E00" />
          </linearGradient>
          <linearGradient id="bellyWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF0E5" />
          </linearGradient>
          <linearGradient id="backpackBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0077CC" />
          </linearGradient>
          <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#FFB700" />
          </linearGradient>
        </defs>

        {/* Backdrop gentle glow */}
        <circle cx="100" cy="100" r="90" fill="#00E5FF" fillOpacity="0.08" />

        {/* Backpack behind body */}
        <g id="backpack">
          <rect x="42" y="86" width="30" height="42" rx="10" fill="url(#backpackBlue)" stroke="#0A2540" strokeWidth="4" />
          <rect x="46" y="92" width="22" height="14" rx="4" fill="#004080" />
          <path d="M50 110 H64" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Ant Antennae */}
        <g id="antennae">
          {/* Left antenna */}
          <path d="M82 45 C 72 25, 60 22, 52 28" stroke="#D33800" strokeWidth="6" strokeLinecap="round" />
          <circle cx="52" cy="28" r="8" fill="#00E5FF" stroke="#0A2540" strokeWidth="3" />

          {/* Right antenna */}
          <path d="M118 45 C 128 25, 140 22, 148 28" stroke="#D33800" strokeWidth="6" strokeLinecap="round" />
          <circle cx="148" cy="28" r="8" fill="#00E5FF" stroke="#0A2540" strokeWidth="3" />
        </g>

        {/* Ant Thorax & Abdomen (Body) */}
        <g id="body">
          {/* Lower abdomen */}
          <ellipse cx="100" cy="138" rx="42" ry="36" fill="url(#bodyOrange)" stroke="#0A2540" strokeWidth="5" />
          {/* White belly patch */}
          <ellipse cx="100" cy="138" rx="26" ry="22" fill="url(#bellyWhite)" />
          <path d="M85 130 Q100 134 115 130" stroke="#FFD1B3" strokeWidth="2" fill="none" />
          <path d="M88 140 Q100 144 112 140" stroke="#FFD1B3" strokeWidth="2" fill="none" />

          {/* Backpack Straps */}
          <path d="M72 105 Q 70 125 78 142" stroke="#00A3CC" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M128 105 Q 130 125 122 142" stroke="#00A3CC" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>

        {/* Feet / Shoes */}
        <g id="feet">
          <ellipse cx="80" cy="172" rx="16" ry="10" fill="#0A2540" />
          <ellipse cx="80" cy="170" rx="14" ry="8" fill="#FF5500" />
          <ellipse cx="120" cy="172" rx="16" ry="10" fill="#0A2540" />
          <ellipse cx="120" cy="170" rx="14" ry="8" fill="#FF5500" />
        </g>

        {/* Head */}
        <g id="head">
          <ellipse cx="100" cy="74" rx="44" ry="40" fill="url(#bodyOrange)" stroke="#0A2540" strokeWidth="5" />

          {/* Cheeks */}
          <circle cx="72" cy="85" r="7" fill="#FFAA80" fillOpacity="0.7" />
          <circle cx="128" cy="85" r="7" fill="#FFAA80" fillOpacity="0.7" />

          {/* Big anime sparkle eyes */}
          {/* Left Eye */}
          <ellipse cx="82" cy="68" rx="11" ry="15" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3.5" />
          <ellipse cx="84" cy="67" rx="7" ry="10" fill="#0A2540" />
          <circle cx="82" cy="63" r="3.5" fill="#FFFFFF" />
          <circle cx="86" cy="72" r="1.5" fill="#00E5FF" />

          {/* Right Eye */}
          <ellipse cx="118" cy="68" rx="11" ry="15" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3.5" />
          <ellipse cx="116" cy="67" rx="7" ry="10" fill="#0A2540" />
          <circle cx="114" cy="63" r="3.5" fill="#FFFFFF" />
          <circle cx="118" cy="72" r="1.5" fill="#00E5FF" />

          {/* Eyebrows */}
          {expression === 'thinking' ? (
            <>
              <path d="M72 50 Q82 54 90 52" stroke="#661A00" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M110 48 Q120 44 128 50" stroke="#661A00" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M74 52 Q82 46 90 50" stroke="#661A00" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M110 50 Q118 46 126 52" stroke="#661A00" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Mouth */}
          {expression === 'thinking' ? (
            <ellipse cx="100" cy="90" rx="6" ry="6" fill="#7A1800" />
          ) : (
            <g id="mouth">
              <path d="M88 84 Q100 102 112 84 Z" fill="#D32F2F" stroke="#0A2540" strokeWidth="3" />
              <path d="M92 86 Q100 95 108 86" fill="#FF8A80" />
            </g>
          )}
        </g>

        {/* Arms and Hands */}
        <g id="arms">
          {expression === 'waving' || expression === 'celebrate' || expression === 'happy' ? (
            <>
              {/* Right Hand Waving */}
              <path d="M136 95 Q158 85 162 65" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="164" cy="62" r="11" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
              {/* Thumbs up / Fingers */}
              <circle cx="168" cy="54" r="5" fill="#FFFFFF" stroke="#0A2540" strokeWidth="2.5" />
              <path d="M158 62 H170" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />

              {/* Left Arm Resting / Holding Strap */}
              <path d="M64 95 Q52 110 65 125" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="67" cy="126" r="10" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
            </>
          ) : expression === 'thinking' ? (
            <>
              {/* Hand on chin */}
              <path d="M136 95 Q130 115 112 106" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="110" cy="104" r="9" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
              {/* Left Arm */}
              <path d="M64 95 Q52 115 65 128" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="65" cy="128" r="9" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
              {/* Lightbulb for thinking */}
              <g transform="translate(142, 25)">
                <circle cx="14" cy="14" r="12" fill="#FFD700" stroke="#0A2540" strokeWidth="2.5" />
                <rect x="10" y="24" width="8" height="6" rx="2" fill="#FFA000" />
                <path d="M8 8 L4 4 M20 8 L24 4 M14 2 L14 -2" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </>
          ) : (
            /* Captain Sailor Pose */
            <>
              <path d="M136 95 Q150 82 135 68" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="132" cy="65" r="10" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
              <path d="M64 95 Q50 110 65 125" stroke="#FF5500" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="65" cy="125" r="10" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
            </>
          )}
        </g>

        {/* Sailor / Captain Hat if captain or celebration */}
        {expression === 'captain' && (
          <g id="captainHat" transform="translate(0, -6)">
            {/* White cap top */}
            <ellipse cx="100" cy="38" rx="34" ry="16" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3.5" />
            {/* Navy cap band */}
            <path d="M68 40 Q100 47 132 40 L134 47 Q100 55 66 47 Z" fill="#002244" stroke="#0A2540" strokeWidth="2" />
            {/* Gold anchor crest */}
            <circle cx="100" cy="46" r="6" fill="#FFD700" />
            <path d="M100 42 V50 M96 48 Q100 52 104 48" stroke="#0A2540" strokeWidth="1.5" fill="none" />
            {/* Black visor */}
            <path d="M64 45 Q100 62 136 45" stroke="#0A2540" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Sparkles / Gold Stars for Celebration */}
        {expression === 'celebrate' && (
          <g id="celebrationStars">
            <polygon points="175,25 178,32 185,33 180,38 181,45 175,41 169,45 170,38 165,33 172,32" fill="#FFD700" />
            <polygon points="28,45 30,50 35,51 31,55 32,60 28,57 24,60 25,55 21,51 26,50" fill="#00E5FF" />
            <circle cx="165" cy="95" r="4" fill="#FFD700" />
          </g>
        )}
      </svg>

      {/* Optional Badge label */}
      {showBadge && (
        <span className="absolute -bottom-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md border border-white/40 tracking-wide uppercase whitespace-nowrap">
          {badgeText}
        </span>
      )}
    </div>
  );
};
