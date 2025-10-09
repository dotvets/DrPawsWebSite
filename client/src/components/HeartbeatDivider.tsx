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
                d="M0,50 L50,50 L70,35 L90,65 L110,50 L130,50 L150,15 L160,85 L170,50 L220,50 L240,35 L260,65 L280,50 L300,50 L320,50 L340,15 L350,85 L360,50 L400,50"
                fill="none"
                stroke="#18ac61"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="200"
                y="105"
                fill="black"
                fillOpacity="0.8"
                fontSize="16"
                fontFamily="Poppins, sans-serif"
                fontWeight="300"
                letterSpacing="1"
                textAnchor="middle"
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
            stroke-width: 3;
          }
        }
      `}</style>
    </div>
  );
}
