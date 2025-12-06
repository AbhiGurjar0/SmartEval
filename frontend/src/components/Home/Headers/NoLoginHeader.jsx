import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScrollDirection from "../../../Hooks/useScrollDirection";
import { 
  Sparkles, 
  Zap, 
  CreditCard, 
  HelpCircle,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

const Header = () => {
  const scrollDirection = useScrollDirection();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollClass = scrollDirection === 'down' 
    ? '-translate-y-full opacity-0'
    : 'translate-y-0 opacity-100';

  const navItems = [
    { id: "features", label: "Features", icon: <Zap className="w-4 h-4" /> },
    { id: "pricing", label: "Pricing", icon: <CreditCard className="w-4 h-4" /> },
    { id: "faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        px-6 sm:px-8 lg:px-12 py-4
        transition-all duration-500 ease-in-out
        ${scrollClass}
        ${isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-gradient-to-b from-black/90 via-black/80 to-transparent'
        }
      `}>
        {/* Logo */}
        <div 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
              SmartEval
            </h1>
            <span className="text-xs text-white/60 -mt-1 hidden sm:block">
              AI-Powered Evaluation
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full 
                text-sm font-medium transition-all duration-300
                ${activeSection === item.id
                  ? 'text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <span className="opacity-80">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              GET STARTED
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-40 bg-black/90 backdrop-blur-lg
        transition-all duration-500 ease-in-out md:hidden
        ${isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
        }
      `}>
        <div className="flex flex-col items-center justify-center h-full px-6">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                SmartEval
              </h1>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center gap-4 px-6 py-4 rounded-xl
                    text-lg font-medium transition-all duration-300
                    ${activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="opacity-80">{item.icon}</span>
                  {item.label}
                  <ChevronDown className="w-4 h-4 ml-auto transform rotate-90" />
                </button>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2 text-lg">
                GET STARTED
                <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            {/* Close Hint */}
            <p className="text-center text-white/40 mt-8 text-sm">
              Tap anywhere outside to close
            </p>
          </div>
        </div>
      </div>

      {/* Floating Indicator */}
      {isScrolled && (
        <div className="fixed top-4 right-4 z-40 md:hidden">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-white/60">SmartEval</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 transform origin-left transition-transform duration-300"
        style={{
          transform: `scaleX(${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1)})`
        }}
      />
    </>
  );
};

export default Header;