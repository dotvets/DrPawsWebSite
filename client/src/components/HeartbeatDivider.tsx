export default function HeartbeatDivider() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-20 flex items-center justify-center">
        <svg
          className="w-full h-full"
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
                dur="3s"
                repeatCount="indefinite"
              />
              <path
                d="M0,50 L80,50 L90,50 L95,20 L100,80 L105,50 L115,50 L120,40 L125,60 L130,50 L400,50"
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
      </div>
    </div>
  );
}
