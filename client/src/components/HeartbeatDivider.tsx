export default function HeartbeatDivider() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-28 md:h-32 flex items-center justify-center">
        <svg
          className="w-full h-full ecg-svg"
          viewBox="0 0 1200 140"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="ecg-pattern"
              x="0"
              y="0"
              width="400"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <animateTransform
                attributeName="patternTransform"
                type="translate"
                from="0 0"
                to="400 0"
                dur="7s"
                repeatCount="indefinite"
              />
              <path
                className="ecg-path"
                d="M0,50 L60,50 L65,45 L70,50 L75,50 L80,50 L85,30 L90,70 L95,50 L100,50 L105,55 L110,50 L115,50 L400,50"
                fill="none"
                stroke="#18ac61"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="20"
                y="100"
                fill="black"
                fillOpacity="0.8"
                fontSize="16"
                fontFamily="Poppins, sans-serif"
                fontWeight="300"
                letterSpacing="1"
                textAnchor="start"
              >
                all about we care
              </text>
            </pattern>
          </defs>
          
          <rect
            x="-400"
            y="0"
            width="2000"
            height="140"
            fill="url(#ecg-pattern)"
          />
        </svg>
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .ecg-path {
            stroke-width: 2.5;
          }
        }
      `}</style>
    </div>
  );
}
