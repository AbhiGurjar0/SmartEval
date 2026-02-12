import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-6 py-20 text-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 animate-spin-slow rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHYtNHptLTQtNGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative z-10 flex max-w-6xl flex-col items-center">
        {/* Animated badge */}
        <div className="mb-8 animate-fade-in-up">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            AI-Powered Evaluation Platform
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="mb-8 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Smarter Evaluation
          </span>
          <br />
          <span className="text-white">for Smarter Learning</span>
        </h1>

        {/* Subheading with animation */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 text-xl font-light text-white/90">
          <span className="animate-fade-in-up animation-delay-100">
            Detect.
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40"></span>
          <span className="animate-fade-in-up animation-delay-200">
            Verify.
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40"></span>
          <span className="animate-fade-in-up animation-delay-300">
            Evaluate.
          </span>
        </div>

        {/* Description */}
        <p className="mb-12 max-w-2xl text-lg text-white/80 sm:text-xl">
          SmartEval combines advanced AI to check plagiarism, verify
          handwriting, and detect AI-generated content — revolutionizing
          assignment evaluation with precision and efficiency.
        </p>

       
        {/* Stats or additional info */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="animate-fade-in-up animation-delay-300">
            <div className="text-3xl font-bold text-white">99%</div>
            <div className="text-sm text-white/60">Accuracy Rate</div>
          </div>
          <div className="animate-fade-in-up animation-delay-400">
            <div className="text-3xl font-bold text-white">50K+</div>
            <div className="text-sm text-white/60">Evaluations</div>
          </div>
          <div className="animate-fade-in-up animation-delay-500">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm text-white/60">Real-time Processing</div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes shine {
          to {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-out;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
