import React, { useState, useEffect } from "react";

// **Loading Screen CSS**
const loadingCSS = `
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  z-index: 1000;
  backdrop-filter: blur(6px);
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.loading-bar {
  width: 30%;
  max-width: 200px;
  height: 4px;
  border-radius: 6px;
  overflow: hidden;
  background: linear-gradient(45deg, #333, #666);
  position: relative;
}

.loading-progress {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #fff, #b3e02d);
  animation: load 2s ease-in-out forwards;
  border-radius: 6px;
}

@keyframes load {
  0% { width: 0%; }
  50% { width: 60%; }
  100% { width: 100%; }
}
`;

// **Magnifying Glass CSS**
const magnifyingGlassCSS = `
.magnifying-glass {
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 30px;
  animation: pulse 1.5s infinite alternate ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(1.05); opacity: 1; }
}

.magnifying-glass-circle {
  width: 80px;
  height: 80px;
  border: 5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.2) 10%, rgba(0, 0, 0, 0.1) 60%);
  box-shadow: 
    inset 0px 0px 10px rgba(255, 255, 255, 0.3),
    0px 0px 10px rgba(255, 255, 255, 0.5);
}

.magnifying-glass-reflection {
  position: absolute;
  top: 12%;
  left: 15%;
  width: 30%;
  height: 30%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
}

.magnifying-glass-handle {
  width: 12px;
  height: 50px;
  background: linear-gradient(90deg, #8B5A2B, #5A3D1E);
  position: absolute;
  top: 65px;
  left: 70px;
  transform: rotate(-45deg);
  border-radius: 6px;
  box-shadow: 
    inset 0px 0px 5px rgba(0, 0, 0, 0.3),
    2px 2px 6px rgba(0, 0, 0, 0.5);
}
`;

// **Magnifying Glass Component**
const MagnifyingGlass = () => (
  <div className="magnifying-glass">
    <div className="magnifying-glass-circle">
      <div className="magnifying-glass-reflection"></div>
    </div>
    <div className="magnifying-glass-handle"></div>
  </div>
);

// **Loading Screen Component**
const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = loadingCSS + magnifyingGlassCSS;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (!isLoading) return null; // ✅ Hides the component completely when done

  return (
    <div className="loading-container">
      <MagnifyingGlass />
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
