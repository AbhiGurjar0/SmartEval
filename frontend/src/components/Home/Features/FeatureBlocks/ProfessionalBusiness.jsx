import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Download, Sparkles, Users, Clock, Shield, Zap, ArrowRight, Play, BarChart, CheckCircle } from "lucide-react";

// --- PARTICLE CARD COMPONENT (The Animation Engine) ---
// (Keeping your existing ParticleCard component as is, but adding enhanced features)
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = 16, // Increased from 12
  glowColor = "132, 0, 255",
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  enableStars = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableStars) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 120, // Increased movement
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 80); // Faster generation

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, enableStars]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableStars) animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -12; // Increased sensitivity
        const rotateY = ((x - centerX) / centerX) * 12;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.08; // Increased magnetism
        const magnetY = (y - centerY) * 0.08;
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.6) 0%, rgba(${glowColor}, 0.3) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1.5, // Larger ripple
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );

      // Add multiple smaller particles on click
      for (let i = 0; i < 5; i++) {
        const clickParticle = document.createElement("div");
        clickParticle.style.cssText = `
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(${glowColor}, 0.8);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          z-index: 1000;
        `;
        
        element.appendChild(clickParticle);
        
        gsap.to(clickParticle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => clickParticle.remove(),
        });
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    enableStars,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const createParticleElement = (x, y, color = "132, 0, 255") => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${color}, 1) 30%, rgba(${color}, 0.3) 100%);
    box-shadow: 0 0 15px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
    filter: blur(0.5px);
  `;
  return el;
};

// --- MAIN SECTION COMPONENT ---
const ProfessionalBusiness = () => {
  const customGlowColor = "132, 0, 255";
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stats = [
    { value: "90%", label: "Time Saved", icon: <Clock className="w-4 h-4" /> },
    { value: "99.8%", label: "Accuracy", icon: <CheckCircle className="w-4 h-4" /> },
    { value: "50K+", label: "Evaluations", icon: <BarChart className="w-4 h-4" /> },
    { value: "24/7", label: "Availability", icon: <Shield className="w-4 h-4" /> },
  ];

  const features = [
    "AI-Powered Plagiarism Detection",
    "Handwriting Verification",
    "Real-time Grading",
    "Detailed Analytics",
    "Multi-Format Support",
    "Secure Cloud Storage"
  ];

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <style>{`
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 3px;
          background: radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%),
              rgba(${customGlowColor}, calc(var(--glow-intensity, 0) * 1)) 0%,
              rgba(${customGlowColor}, calc(var(--glow-intensity, 0) * 0.4)) 40%,
              transparent 70%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          opacity: 0;
        }
        
        .card--border-glow:hover::after {
          opacity: 1;
          padding: 2px;
        }
        
        .card--border-glow {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(30, 30, 46, 0.8) 0%, rgba(15, 15, 30, 0.9) 100%);
        }
        
        .card--border-glow:hover {
          box-shadow: 0 20px 40px rgba(46, 24, 78, 0.4), 
                      0 0 60px rgba(${customGlowColor}, 0.3),
                      0 0 100px rgba(${customGlowColor}, 0.1);
          transform: translateY(-4px);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(${customGlowColor}, 0.5);
        }
      `}</style>

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/80">Student-Centric Innovation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Built by Students,
              </span>
              <br />
              <span className="text-white">for Students</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Empowering educators with intelligent tools designed by the very learners they serve
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
            {/* Left Column - Text & Features */}
            <div className="space-y-8">
              {/* Introduction */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10">
                    <Sparkles className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Revolutionizing Academic Evaluation</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Watch how SmartEval automates assignment evaluation — from plagiarism detection
                  to handwriting verification and AI-assisted scoring.
                </p>
                <p className="text-white/70">
                  Our workflow helps teachers save time, maintain fairness, 
                  and provide detailed insights for every student submission.
                </p>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Core Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                    <div className="flex justify-center mb-2 text-purple-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Card */}
            <div className="relative">
              <ParticleCard
                className="relative flex flex-col justify-center items-center rounded-3xl shadow-xl 
                           border border-white/10 h-[500px] w-full overflow-hidden
                           card--border-glow"
                glowColor={customGlowColor}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                enableStars={true}
                particleCount={20}
              >
                {/* Video Container */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
                      <div className="relative z-10 text-center">
                        <button
                          onClick={handlePlayVideo}
                          className="group relative w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center hover:scale-110 transition-all duration-300"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <p className="mt-4 text-white/80 text-sm">Click to watch demo</p>
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-waves-on-a-dark-background-3649-large.mp4" type="video/mp4" />
                    </video>
                  )}
                  
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20"></div>
                  
                  {/* Animated Lines Overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-300"></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-600"></div>
                    <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-900"></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="self-start">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10">
                      <span className="text-sm font-medium text-white flex items-center gap-2">
                        <Zap className="w-3 h-3" />
                        LIVE DEMO
                      </span>
                    </div>
                  </div>

                  {/* Center Content */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4 text-glow">
                      SmartEval in Action
                    </h3>
                    <p className="text-white/70 mb-6">
                      Experience the future of academic evaluation with our interactive demo
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-sm text-white/60">Real-time Processing</span>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">0.5s</div>
                      <div className="text-xs text-white/50">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99%</div>
                      <div className="text-xs text-white/50">Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">10x</div>
                      <div className="text-xs text-white/50">Faster Grading</div>
                    </div>
                  </div>
                </div>
              </ParticleCard>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10"></div>
            <div className="relative z-10 p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Join the Education Revolution
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  Thousands of educators are already transforming their evaluation process with SmartEval
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                    <span className="flex items-center gap-3">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <Download className="w-5 h-5" />
                      Download Whitepaper
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalBusiness;