import React, { useState } from 'react';
import { ArrowRight, Linkedin, Facebook, Twitter, Instagram, Mail, MapPin, Phone, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterCTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      // Add your subscription logic here
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 text-white">
      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHYtNHptLTQtNGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-[1px] rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-medium text-white/80">The Future of Education</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Smarter, Faster & Fair
              </span>
              <br />
              <span className="text-white">Academic Evaluation</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-white/60 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Powered by cutting-edge AI technology that revolutionizes how educators evaluate student work
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  Start Evaluating Smarter
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                Book a Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: '99.8%', label: 'Accuracy Rate' },
                { value: '90%', label: 'Time Saved' },
                { value: '50K+', label: 'Evaluations' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="relative border-t border-white/10 px-4 sm:px-6 lg:px-8 py-16">
        {/* Gradient Overlay */}
        <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md opacity-70"></div>
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                    <span className="text-xl font-bold text-white">S</span>
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">SmartEval</span>
                  <p className="text-sm text-white/60 mt-1">AI-Powered Academic Evaluation</p>
                </div>
              </div>
              <p className="text-white/60 mb-6">
                Transforming education with intelligent assessment tools designed for modern learning environments.
              </p>
              <div className="flex items-center gap-4">
                {[Linkedin, Twitter, Facebook, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 text-white/70" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Product
              </h3>
              <ul className="space-y-4">
                {['AI Features', 'Pricing Plans', 'How It Works', 'Integrations', 'API Docs'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Company
              </h3>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Terms & Conditions', 'Privacy Policy', 'Security'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Contact */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Stay Updated
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-6 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </div>
                <p className="text-sm text-white/40">
                  Get the latest updates, features, and educational insights
                </p>
              </form>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-white/60">
                  <Mail className="w-4 h-4" />
                  <span>support@smarteval.ai</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Bottom Footer */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-white/40 text-center md:text-left">
              © 2025 SmartEval. All rights reserved.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              <a href="#" className="hover:text-white transition-colors duration-300">
                AI-Driven Academic Tools
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">GDPR</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Status</a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-2xl shadow-purple-500/30 hover:shadow-3xl hover:shadow-purple-500/50 transition-all duration-300">
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>
      </motion.div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
      `}</style>
    </div>
  );
};

export default FooterCTASection;