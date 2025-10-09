import drPawsLogo from '@assets/dr-paws-logo.svg';

export default function HeartbeatDivider() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-32 md:h-36 flex items-center justify-center">
        <div className="ecg-moving-container">
          <div className="flex flex-col items-center">
            <img 
              src={drPawsLogo} 
              alt="Dr. Paws" 
              className="h-5 md:h-6 mb-2"
            />
            <svg
              className="w-full h-12"
              viewBox="0 0 400 100"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ecg-path"
                d="M0,50 L60,50 L65,45 L70,50 L75,50 L80,50 L85,30 L90,70 L95,50 L100,50 L105,55 L110,50 L115,50 L400,50"
                fill="none"
                stroke="#18ac61"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base md:text-xl font-light tracking-wide text-black/80 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              all about we care
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .ecg-path {
            stroke-width: 2.5;
          }
        }
        
        .ecg-moving-container {
          animation: ecg-scroll 7s linear infinite;
          position: absolute;
          width: 400px;
        }
        
        @keyframes ecg-scroll {
          0% {
            transform: translateX(-400px);
          }
          100% {
            transform: translateX(calc(100vw));
          }
        }
      `}</style>
    </div>
  );
}
