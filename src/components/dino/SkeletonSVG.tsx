export function SkeletonSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 500"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* T-Rex-inspired skeleton line art */}
      {/* Spine */}
      <path d="M60 320 C 180 260, 320 220, 480 210 C 620 200, 740 210, 860 260 C 940 295, 1000 340, 1060 400" />
      {/* Skull */}
      <path d="M60 320 C 30 305, 20 285, 40 265 L 105 250 L 130 240 L 140 260 L 120 280 L 95 285 L 60 320 Z" />
      <circle cx="85" cy="272" r="4" />
      <path d="M40 285 L 30 300 L 45 305" />
      {/* Teeth */}
      <path
        d="M55 305 L 58 315 M 65 305 L 68 315 M 75 305 L 78 315 M 85 305 L 88 315 M 95 305 L 98 315"
        strokeWidth="0.8"
      />
      {/* Ribs */}
      <path d="M300 235 C 290 300, 300 370, 340 410" />
      <path d="M350 225 C 340 300, 350 380, 390 425" />
      <path d="M400 220 C 390 300, 400 385, 440 430" />
      <path d="M450 215 C 440 300, 450 385, 490 430" />
      <path d="M500 213 C 490 300, 500 385, 540 428" />
      <path d="M550 213 C 540 300, 550 383, 590 425" />
      <path d="M600 215 C 590 300, 600 380, 640 420" />
      <path d="M650 220 C 640 298, 650 375, 690 415" />
      {/* Tail */}
      <path d="M860 260 C 980 270, 1080 300, 1180 360" />
      <path
        d="M900 280 L 908 300 M 940 290 L 946 312 M 980 305 L 986 328 M 1020 325 L 1026 350 M 1060 350 L 1064 375 M 1100 375 L 1104 400"
        strokeWidth="0.8"
      />
      {/* Back leg */}
      <path d="M700 340 L 720 430 L 690 490 L 730 495" />
      <path d="M760 350 L 785 440 L 760 495 L 800 500" />
      {/* Front tiny arm */}
      <path d="M380 340 L 400 375 L 420 385" />
      <path d="M405 375 L 425 385 M 405 375 L 425 380" strokeWidth="0.7" />
      {/* Pelvis */}
      <path d="M720 300 C 740 320, 760 335, 780 330" />
    </svg>
  );
}
