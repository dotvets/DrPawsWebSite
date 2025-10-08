export default function HeartbeatDivider() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-20 flex items-end justify-start pb-2">
        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 1200 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="ecg-pattern"
              x="0"
              y="0"
              width="400"
              height="100"
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
                d="M0,50 L60,50 L65,45 L70,50 L75,50 L80,50 L85,30 L90,70 L95,50 L100,50 L105,55 L110,50 L115,50 L400,50"
                fill="none"
                stroke="#18ac61"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>
          </defs>
          
          <rect
            x="-400"
            y="0"
            width="2000"
            height="100"
            fill="url(#ecg-pattern)"
          />
        </svg>
        
        <div className="relative z-10 ecg-text-container">
          <p className="ecg-text text-xl font-light tracking-wide text-black/80">
            all about we care
          </p>
        </div>
      </div>
      
      <style>{`
        .ecg-text-container {
          animation: ecg-text-scroll 18s linear infinite;
        }
        
        @keyframes ecg-text-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw - 100%));
          }
        }
        
        .ecg-text {
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}
