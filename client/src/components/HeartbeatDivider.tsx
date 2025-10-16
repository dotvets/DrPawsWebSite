import drPawsLogo from '@assets/dr-paws-logo.svg';

export default function HeartbeatDivider() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-32 md:h-36 flex items-center justify-center">
        {/* Full-width heartbeat line background */}
        <svg
          className="w-full h-full absolute inset-0"
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
                dur="12s"
                repeatCount="indefinite"
              />
              <path
                className="ecg-path"
                d="M0,70 L60,70 L65,65 L70,70 L75,70 L80,70 L85,50 L90,90 L95,70 L100,70 L105,75 L110,70 L115,70 L400,70"
                fill="none"
                stroke="#18ac61"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
        
        {/* Moving logo - much slower */}
        <div className="ecg-moving-content">
          <img 
            src={drPawsLogo} 
            alt="Dr. Paws" 
            className="h-5 md:h-6"
          />
        </div>
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .ecg-path {
            stroke-width: 2.5;
          }
        }
        
        .ecg-moving-content {
          animation: ecg-content-move 40s linear infinite;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          will-change: transform;
        }
        
        @keyframes ecg-content-move {
          0% {
            transform: translate(-100%, -50%);
          }
          100% {
            transform: translate(100vw, -50%);
          }
        }
      `}</style>
    </div>
  );
}
