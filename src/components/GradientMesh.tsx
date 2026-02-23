"use client";

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradient blobs */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[60vh] w-[60vh] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #3d1a6e 0%, transparent 70%)",
          animation: "mesh-drift-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[50vh] w-[50vh] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #5A1F8E 0%, transparent 70%)",
          animation: "mesh-drift-2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[40vh] w-[40vh] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #C5A55A 0%, transparent 70%)",
          animation: "mesh-drift-3 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -left-1/6 bottom-1/4 h-[45vh] w-[45vh] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #7B2FBE 0%, transparent 70%)",
          animation: "mesh-drift-4 22s ease-in-out infinite",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Keyframe animations */}
      <style>{`
        @keyframes mesh-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15vw, 10vh) scale(1.1); }
          66% { transform: translate(-5vw, 20vh) scale(0.95); }
        }
        @keyframes mesh-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20vw, -10vh) scale(1.15); }
          66% { transform: translate(10vw, -15vh) scale(0.9); }
        }
        @keyframes mesh-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, -20vh) scale(1.05); }
          66% { transform: translate(-15vw, 5vh) scale(1.1); }
        }
        @keyframes mesh-drift-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20vw, 15vh) scale(1.1); }
          66% { transform: translate(5vw, -10vh) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
