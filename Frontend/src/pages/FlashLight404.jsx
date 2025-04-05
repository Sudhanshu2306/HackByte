import React, { useState, useEffect, useRef } from 'react';

function FlashLight404({ onTimeout }) {
  const buttonText = "← Back To Home";
  const homeLink = "/";
  const message = "Oops! It seems you followed a broken link";

  const baseSize = 340; // Adjust this to control overall size
  const [lightOn, setLightOn] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const torchRef = useRef(null);

  // Light beam effect that follows cursor with smooth transition
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Flickering effect for the light with randomness
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setLightOn(false);
      setTimeout(() => setLightOn(true), Math.random() * 50 + 30);
    }, Math.random() * 5000 + 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  // Floating effect for flashlight
  useEffect(() => {
    if (torchRef.current) {
      torchRef.current.style.animation = 'float 6s ease-in-out infinite';
    }
  }, [isVisible]);

  // Component timeout effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTimeout) onTimeout(); // Call the function to switch components
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer
  }, [onTimeout]);

  return (
    <div
      style={{
        background: 'radial-gradient(ellipse at center, #1a2130, #0a0e1a)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontFamily: '"Poppins", "Segoe UI", Roboto, sans-serif',
        color: '#fff',
        overflow: 'hidden',
        margin: 0,
        position: 'relative',
        perspective: '1000px'
      }}
    >
      {/* Dynamic light beam effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(255, 215, 0, ${lightOn ? 0.15 : 0.05}) 0%, 
                    rgba(255, 215, 0, ${lightOn ? 0.08 : 0.02}) 10%, 
                    rgba(10, 14, 26, 0) 30%)`,
        pointerEvents: 'none',
        opacity: 1,
        transition: 'background 0.5s ease',
        zIndex: 1
      }}></div>

      {/* Animated stars background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0))',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        animation: 'animateStars 100s linear infinite',
        opacity: 0.5
      }}></div>

      {/* Dust particles floating effect */}
      <div className="particles" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}></div>

      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          transform: `scale(${isVisible ? 1 : 0.8}) translateY(${isVisible ? 0 : '30px'})`,
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Combined Shape with Shadow */}
        <div
          ref={torchRef}
          style={{
            position: 'relative',
            margin: '0 auto',
            width: `${baseSize * 0.75}px`,
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))',
            transformStyle: 'preserve-3d',
            transform: isHovering ? 'rotateX(5deg) rotateY(-5deg)' : 'rotateX(0) rotateY(0)',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Flashlight body with metallic effect */}
          <div style={{
            width: `${baseSize * 0.75}px`,
            height: `${baseSize * 1.2}px`,
            background: 'linear-gradient(135deg, #FFD700, #E6AF2E 40%, #D4AC0D 60%, #FFD700)',
            borderTopLeftRadius: '10%',
            borderTopRightRadius: '10%',
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.3), inset 5px 0 15px rgba(255,255,255,0.3), inset -5px 0 15px rgba(0,0,0,0.3)'
          }}>
            {/* Metallic texture lines */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 12px)'
            }}></div>

            {/* Reflective highlight */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '10%',
              width: '80%',
              height: '90%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)',
              borderRadius: '10px'
            }}></div>

            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '5%',
              width: '90%',
              height: '10px',
              background: 'linear-gradient(to bottom, #D4AC0D, #FFD700, #D4AC0D)',
              opacity: 0.8,
              borderRadius: '5px'
            }}></div>
          </div>

          {/* Top Circle / Lens with glow effect */}
          <div style={{
            width: `${baseSize * 0.77}px`,
            height: `${baseSize * 0.77}px`,
            borderRadius: '50%',
            background: lightOn
              ? 'radial-gradient(circle, #FFFACD, #FFD700 70%, #E6AF2E)'
              : 'radial-gradient(circle, #e0c365, #D4AC0D)',
            position: 'absolute',
            top: `-${baseSize * 0.2}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            boxShadow: lightOn
              ? 'inset 0 0 30px rgba(255,255,255,0.8), 0 0 30px rgba(255,215,0,0.5)'
              : 'inset 0 0 20px rgba(255,255,255,0.4), 0 0 10px rgba(255,215,0,0.2)',
            transition: 'all 0.1s ease'
          }}>
            {/* Glass texture overlay */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)'
            }}></div>

            <div style={{
              fontSize: `${baseSize * 0.2}px`,
              fontWeight: '900',
              color: '#000',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 2,
              transform: lightOn ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.1s ease'
            }}>404</div>
            <div style={{
              fontSize: `${baseSize * 0.04}px`,
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              position: 'relative',
              zIndex: 2
            }}>Page Not Found</div>
          </div>
        </div>

        {/* Animated light beam effect */}
        <div style={{
          position: 'absolute',
          top: `${baseSize * 0.5}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${baseSize * 2}px`,
          height: `${baseSize * 2}px`,
          background: `radial-gradient(ellipse at top, rgba(255, 215, 0, ${lightOn ? 0.15 : 0.05}) 0%, 
                      rgba(255, 215, 0, 0) 70%)`,
          zIndex: 0,
          pointerEvents: 'none',
          animation: lightOn ? 'pulse 4s ease-in-out infinite' : 'none',
          opacity: lightOn ? 1 : 0.3,
          transition: 'opacity 0.2s ease'
        }}></div>

        {/* Torch Base with detailed styling */}
        <div style={{
          width: `${baseSize * 0.15}px`,
          height: `${baseSize * 0.25}px`,
          background: 'linear-gradient(to bottom, #455A64, #263238)',
          margin: '20px auto',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderBottomLeftRadius: '3px',
          borderBottomRightRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Metallic texture for handle */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.1), rgba(255,255,255,0.1) 20%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0.1))'
          }}></div>

          {/* Grip texture */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: 0,
            width: '100%',
            height: '60%',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 5px)'
          }}></div>

          {/* Power button with glow effect */}
          <div style={{
            width: `${baseSize * 0.03}px`,
            height: `${baseSize * 0.07}px`,
            background: lightOn
              ? 'linear-gradient(to bottom, #FFD700, #FFB300)'
              : 'linear-gradient(to bottom, #D4AC0D, #C29D0B)',
            borderRadius: '2px',
            boxShadow: lightOn
              ? '0 0 10px rgba(255,215,0,0.7)'
              : '0 0 5px rgba(255,215,0,0.3)',
            position: 'relative',
            zIndex: 1,
            transition: 'all 0.2s ease'
          }}></div>
        </div>

        {/* Error message with animated appearance */}
        <div className="message" style={{
          marginTop: '30px',
          fontSize: `${baseSize * 0.045}px`,
          fontWeight: '300',
          textShadow: '0 2px 5px rgba(0,0,0,0.5)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.5s'
        }}>{message}</div>

        {/* Animated button with enhanced hover effects */}
        <a
          href={homeLink}
          className="home-button"
          style={{
            backgroundColor: 'rgba(255,215,0,0.1)',
            color: '#FFD700',
            padding: '12px 30px',
            borderRadius: '30px',
            textDecoration: 'none',
            border: '2px solid #FFD700',
            display: 'inline-block',
            fontSize: `${baseSize * 0.04}px`,
            marginTop: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.7s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,215,0,0.2)';
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,215,0,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            e.currentTarget.style.color = '#FFD700';
          }}
        >
          {/* Button background glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }} className="button-glow"></div>

          {buttonText}
        </a>
      </div>

      {/* Add global styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          
          @keyframes animateStars {
            from { background-position: 0 0; }
            to { background-position: 0 1000px; }
          }
          
          .home-button:hover .button-glow {
            opacity: 1;
          }
          
          .particles {
            background-image: 
              radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
              radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
              radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px),
              radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 1px, transparent 2px);
            background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
            background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
            animation: animateParticles 60s linear infinite;
          }
          
          @keyframes animateParticles {
            0% { background-position: 0 0, 40px 60px, 130px 270px, 70px 100px; }
            100% { background-position: -550px 550px, -350px 410px, -250px 520px, -150px 250px; }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `
      }} />
    </div>
  );
}

export default FlashLight404;