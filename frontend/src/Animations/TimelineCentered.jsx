import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Upload, Search, Fingerprint, CheckCircle, Eye, Shield } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TimelineCentered = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  // Memoize steps with icons
  const steps = useMemo(() => [
    {
      title: "Student Login & Upload",
      description: "Students log in and upload handwritten or typed assignments in image or PDF format.",
      icon: <Upload className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      title: "AI Plagiarism Check",
      description: "AI scans submissions across class data and online sources to detect plagiarism or AI-generated text.",
      icon: <Search className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      title: "Handwriting Verification",
      description: "SmartEval analyzes handwriting patterns to confirm the student's identity and prevent impersonation.",
      icon: <Fingerprint className="w-5 h-5" />,
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      title: "AI Evaluation & Scores",
      description: "The system checks accuracy, clarity, and structure, generating AI-suggested scores instantly.",
      icon: <CheckCircle className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      title: "Teacher Review",
      description: "Teachers review AI findings, add feedback, adjust marks, and finalize grades.",
      icon: <Eye className="w-5 h-5" />,
      gradient: "from-violet-500 to-indigo-500",
      delay: 0.4
    },
    {
      title: "Reports & Secure Storage",
      description: "Plagiarism results, handwriting analysis, and final marks are stored securely for future reference.",
      icon: <Shield className="w-5 h-5" />,
      gradient: "from-teal-500 to-blue-500",
      delay: 0.5
    },
  ], []);

  // GSAP Animation
  useGSAP(() => {
    if (!timelineRef.current || !containerRef.current) return;

    // Animate main line
    gsap.fromTo(
      ".timeline-line",
      {
        scaleY: 0,
        transformOrigin: "top center"
      },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    // Animate step circles with staggered effect
    gsap.fromTo(
      ".step-circle",
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate cards with subtle floating effect
    const cards = gsap.utils.toArray(".step-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Process timeline"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white/80">Workflow Process</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Seamless Evaluation
          </span>
          <br />
          <span className="text-white">Step-by-Step Process</span>
        </h2>
        
        <p className="text-xl text-white/60 max-w-3xl mx-auto">
          From submission to final report, experience the future of academic evaluation
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Vertical Line with Gradient */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0 timeline-line bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-600"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shimmer opacity-50"></div>
        </div>

        {/* Animated Dots on the Line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
          {steps.map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
              style={{
                top: `${(index * 100) / (steps.length - 1)}%`,
                transform: `translate(-50%, -50%) scale(${1 + index * 0.05})`
              }}
            ></div>
          ))}
        </div>

        {/* Timeline Steps */}
        <ol className="relative w-full" ref={timelineRef} role="list">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <li
                key={index}
                className={`relative mb-24 last:mb-0 step-card`}
                style={{ animationDelay: `${step.delay}s` }}
              >
                {/* Connector Line */}
                <div className={`absolute top-12 hidden h-0.5 w-24 md:block ${
                  isEven ? 'right-1/2 mr-24' : 'left-1/2 ml-24'
                }`}>
                  <div className="w-full h-full bg-gradient-to-r opacity-30"
                    style={{
                      backgroundImage: isEven 
                        ? 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5))'
                        : 'linear-gradient(90deg, rgba(59, 130, 246, 0.5), transparent)'
                    }}
                  ></div>
                </div>

                {/* Step Circle */}
                <div className={`absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 z-20 step-circle`}>
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} blur-lg opacity-50 animate-pulse`}></div>
                    
                    {/* Main Circle */}
                    <div className={`relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${step.gradient} shadow-lg shadow-current/30 border-2 border-white/20`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 border border-white/10 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`relative ${isEven ? 'md:pr-24' : 'md:pl-24'}`}>
                  <div className={`md:w-[calc(50%-6rem)] ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm p-8 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                      
                      {/* Animated Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5`}></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 left-4 w-1 h-1 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-1 h-1 bg-gradient-to-r from-transparent to-white rounded-full"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Step Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${step.gradient} bg-opacity-10 border border-white/10`}>
                              {step.icon}
                            </div>
                            <span className="text-sm font-medium text-purple-300">
                              Step {index + 1}
                            </span>
                          </div>
                          <div className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                            AI-Powered
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Progress Indicator */}
                        <div className="mt-6 flex items-center gap-2">
                          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-1000`}
                              style={{ width: `${(index + 1) * (100 / steps.length)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-white/40">
                            {Math.round((index + 1) * (100 / steps.length))}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 border border-white/10 backdrop-blur-sm">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Streamline Your Evaluation Process?
              </h3>
              <p className="text-white/60">
                Experience the future of academic assessment today
              </p>
            </div>
            <button className="group px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                Get Started Now
                <div className="relative">
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-5 h-5 flex items-center justify-center rounded-full bg-white text-gray-900">
                    →
                  </div>
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default TimelineCentered;