import Data from "@data/sections/hero-1.json";

const LoadingOverlay = () => (
  <>
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="absolute flex justify-center items-center h-screen inset-0 bg-[#A4A1AA33] backdrop-blur-xs">
        <img
          className="w-10"
          src={Data.bread.url}
          alt={Data.bread.alt}
          style={{ animation: "zoom 1s infinite ease-in-out" }}
        />
      </div>
    </div>

    <style jsx>{`
      @keyframes zoom {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }
    `}</style>
  </>
);

export default LoadingOverlay;
