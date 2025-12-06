import React from "react";
import {
  Download,
  BarChart,
  Zap,
  Sparkles,
  Fingerprint,
  BookOpen,
} from "lucide-react";
import FeatureSection from "./FeatureBlocks/FeatureSection";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProfessionalBusiness from "./FeatureBlocks/ProfessionalBusiness";
import HeroSection3 from "../Steps";

export default function Features() {
  const features = [
    {
      id: "A",
      title: "AI-Powered Answer Evaluation",
      description:
        "Instantly analyze handwritten or typed student submissions with AI-driven accuracy. SmartEval evaluates content, correctness, structure, and writing clarity — delivering results in seconds.",
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-600",
      width: "lg:col-span-2",
    },
    {
      id: "B",
      title: "Performance Dashboards",
      description:
        "Visualize student progress with automatic charts and insights. Track learning gaps, compare class performance, and generate reports instantly.",
      icon: <BarChart className="w-6 h-6" />,
      gradient: "from-blue-600 to-cyan-600",
      width: "lg:col-span-1",
    },
    {
      id: "C",
      title: "Plagiarism & AI Content Check",
      description:
        "Detect copied, AI-generated, or rephrased answers with high accuracy. SmartEval ensures academic honesty by comparing submissions across databases and AI patterns.",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-orange-600 to-red-600",
      width: "lg:col-span-1",
    },
    {
      id: "D",
      title: "Handwriting Verification",
      description:
        "Verify whether the uploaded answers are written by the same student. Our handwriting recognition model analyzes patterns and prevents impersonation or outsourced writing.",
      icon: <Fingerprint className="w-6 h-6" />,
      gradient: "from-green-600 to-emerald-600",
      width: "lg:col-span-2",
    },
    {
      id: "E",
      title: "Smart Grading Automation",
      description:
        "Generate accurate marks, feedback, and evaluation summaries automatically. Reduce teacher workload and speed up the checking process by 10x.",
      icon: <BookOpen className="w-6 h-6" />,
      gradient: "from-violet-600 to-indigo-600",
      width: "lg:col-span-2 lg:col-start-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/80">
                AI-Powered Tools
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Powerful AI Tools
              </span>
              <br />
              <span className="text-white">for Modern Academic Evaluation</span>
            </h1>

            <p className="text-xl text-white/70 max-w-3xl">
              All in one intelligent workspace designed to transform how
              educators evaluate and analyze student work.
            </p>
          </div>

          <div className="lg:w-auto">
            <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
              <span>Explore All Features</span>
              <IoIosArrowRoundForward className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS GRID */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`${feature.width} relative group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`}
                  ></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                </div>

                {/* Corner Accents */}
                <div
                  className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl`}
                ></div>
                <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-transparent to-white rounded-full"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-50`}
                        ></div>
                        <div
                          className={`relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} text-white font-bold text-lg`}
                        >
                          {feature.id}
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 border border-white/10`}
                      >
                        {feature.icon}
                      </div>
                    </div>

                    <div className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                      AI-Powered
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-8 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-auto">
                    <button className="group/btn relative overflow-hidden w-14 h-14 rounded-full transition-all duration-300 hover:w-44">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300`}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center gap-3 px-4">
                        <span className="text-white font-medium translate-x-12 group-hover/btn:translate-x-0 transition-transform duration-300 whitespace-nowrap">
                          Learn More
                        </span>
                        <div className="relative">
                          <div className="absolute -ins-2 bg-white/20 rounded-full blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-900">
                            <IoIosArrowRoundForward className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/20">
                      +99% Accuracy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20"></div>
          <div className="relative z-10 p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Evaluation Process?
              </h2>
              <p className="text-xl text-white/70 mb-10">
                Join thousands of educators who trust SmartEval for accurate,
                efficient, and intelligent assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center gap-3">
                    Start Free Trial
                    <IoIosArrowRoundForward className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <FeatureSection />

        {/* Read More Button */}
        <div className="flex justify-center mb-20">
          <button className="group relative overflow-hidden px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <span className="flex items-center gap-3 text-white font-medium">
              Read More Features
              <IoIosArrowRoundForward className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>
          </button>
        </div>

        <ProfessionalBusiness />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
