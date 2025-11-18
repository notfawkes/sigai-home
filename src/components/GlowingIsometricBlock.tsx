export function GlowingIsometricBlock() {
  return (
    <div 
      className="relative"
      style={{
        width: '140px',
        height: '80px',
      }}
    >
      {/* 3D Perspective Cuboid - 3/4 view showing top and front faces */}
      <svg
        width="140"
        height="80"
        viewBox="0 0 140 80"
        style={{
          filter: `
            drop-shadow(0px 5px 25px rgba(167, 221, 249, 0.7))
            drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.3))
          `,
        }}
      >
        <defs>
          {/* Iridescent gradient for the block */}
          <linearGradient id="iridescent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E1D5E7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F8E0E0" stopOpacity="0.9" />
          </linearGradient>
          
          {/* Slightly darker gradient for front face */}
          <linearGradient id="front-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D0E7EA" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D1C5D7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E8D0D0" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        
        {/* Top face of the cuboid (3/4 perspective) */}
        <path
          d="M 20 25 L 120 15 L 135 30 L 35 40 Z"
          fill="url(#iridescent-gradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          rx="4"
        />
        
        {/* Front face of the cuboid */}
        <path
          d="M 20 25 L 35 40 L 35 75 L 20 65 Z"
          fill="url(#front-gradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          rx="4"
        />
        
        {/* Right face of the cuboid */}
        <path
          d="M 35 40 L 135 30 L 135 65 L 35 75 Z"
          fill="url(#front-gradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          opacity="0.9"
          rx="4"
        />
        
        {/* Highlight overlay on top face */}
        <path
          d="M 20 25 L 120 15 L 135 30 L 35 40 Z"
          fill="url(#iridescent-gradient)"
          opacity="0.3"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>
    </div>
  );
}
