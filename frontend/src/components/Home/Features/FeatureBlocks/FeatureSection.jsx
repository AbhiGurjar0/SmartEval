import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Sparkles,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const features = [
  { 
    id: 1, 
    title: "AI-Powered Checks", 
    description: "Advanced AI algorithms for accurate plagiarism and handwriting detection",
    tag: "ACCURACY", 
    highlight: true, 
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-purple-600 to-pink-600",
    stats: "99.8%"
  },
  { 
    id: 2, 
    title: "Secure & Reliable", 
    description: "Enterprise-grade security with encrypted data storage and backups",
    tag: "SECURITY", 
    highlight: false, 
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-blue-600 to-cyan-600",
    stats: "100%"
  },
  { 
    id: 3, 
    title: "Saves Teachers' Time", 
    description: "Reduce evaluation time by up to 90% with automated grading",
    tag: "EFFICIENCY", 
    highlight: true, 
    icon: <Clock className="w-6 h-6" />,
    gradient: "from-green-600 to-emerald-600",
    stats: "90%"
  },
  { 
    id: 4, 
    title: "Real-Time Tracking", 
    description: "Live progress monitoring and instant result generation",
    tag: "PERFORMANCE", 
    highlight: false, 
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "from-orange-600 to-red-600",
    stats: "Real-time"
  },
  { 
    id: 5, 
    title: "Smart Insights", 
    description: "Detailed analytics and actionable feedback for student growth",
    tag: "ANALYTICS", 
    highlight: true, 
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-violet-600 to-indigo-600",
    stats: "AI-Driven"
  },
  { 
    id: 6, 
    title: "Quick Setup", 
    description: "Get started in minutes with seamless integration options",
    tag: "CONVENIENCE", 
    highlight: false, 
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-yellow-600 to-amber-600",
    stats: "5 min"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
    rotateX: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

function FeatureSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHYtNHptLTQtNGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">Key Features</span>
          </div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              A Seamless User
            </span>
            <br />
            <span className="text-white">Experience</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/60 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how SmartEval transforms academic evaluation with cutting-edge technology
            and intuitive design
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative group"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300">
                
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`}></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                </div>

                {/* Glow Effects */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 border border-white/10`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-white/60">
                          {feature.tag}
                        </span>
                      </div>
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {feature.stats}
                      </div>
                      <div className="text-xs text-white/40 mt-1">
                        Efficiency
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 mb-8 flex-grow">
                    {feature.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-white/70">
                          Advanced AI algorithms
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button className="group/btn w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <span className="text-sm font-medium text-white">
                        Learn More
                      </span>
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Highlight Badge */}
                {feature.highlight && (
                  <div className="absolute -top-3 -right-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md"></div>
                      <div className="relative px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white">
                        POPULAR
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 transition-all duration-300"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10"></div>
            <div className="relative z-10 p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Experience the Future of Evaluation?
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  Join thousands of educators transforming their assessment process
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                    <span className="flex items-center gap-3">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                    Request Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
}

export default FeatureSection;