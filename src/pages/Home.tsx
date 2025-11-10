import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import SplitText from "@/components/SplitText";
import MagicBento from "@/components/MagicBento";

const Home = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("bunch-effect");
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const bentoItems = [
    {
      id: "breed-recognition",
      title: "AI Breed Recognition",
      description: "Upload images to identify cattle and buffalo breeds with 95%+ accuracy using advanced AI models.",
      icon: "🐄",
      size: "large" as const,
      color: "accent" as const,
      children: (
        <Link to="/breed-recognition">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Start Recognition
          </Button>
        </Link>
      )
    },
    {
      id: "disease-prediction",
      title: "Disease Prediction",
      description: "Early detection of livestock diseases through AI-powered image analysis.",
      icon: "🔬",
      size: "medium" as const,
      color: "primary" as const,
      children: (
        <Link to="/disease-prediction">
          <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
            Analyze Health
          </Button>
        </Link>
      )
    },
    {
      id: "ai-chatbot",
      title: "AI Farming Assistant",
      description: "Get instant answers to your farming questions in multiple languages.",
      icon: "🤖",
      size: "medium" as const,
      color: "secondary" as const,
      children: (
        <Link to="/ai-chatbot">
          <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
            Ask Questions
          </Button>
        </Link>
      )
    },
    {
      id: "hospital-locator",
      title: "Veterinary Hospitals",
      description: "Find nearby veterinary hospitals with GPS-based location services.",
      icon: "🏥",
      size: "wide" as const,
      color: "warning" as const,
      children: (
        <Link to="/nearby-hospitals">
          <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
            Find Hospitals
          </Button>
        </Link>
      )
    },
    {
      id: "marketplace",
      title: "Cattle Marketplace",
      description: "Buy and sell cattle with verified breed information and health records.",
      icon: "🛒",
      size: "small" as const,
      color: "success" as const,
      children: (
        <Link to="/marketplace">
          <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            Browse Market
          </Button>
        </Link>
      )
    },
    {
      id: "accuracy-stats",
      title: "95%+ Accuracy",
      description: "State-of-the-art AI models trained on millions of livestock images.",
      icon: "📊",
      size: "small" as const,
      color: "neutral" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100 relative">
      {/* (Removed per-page full-screen background to allow Layout background to show) */}
      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'h-screen' : 'h-screen'} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0">
          <img 
            src="https://wallpapercave.com/wp/wp2118452.jpg" 
            alt="Cattle in field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className={`relative z-10 text-center text-white ${isMobile ? 'max-w-sm' : 'max-w-4xl'} mx-auto px-4`}>
          <SplitText 
            text={t('home.heroTitle') || 'Revolutionizing Livestock Management'}
            className={`hero-title-white mb-6 ${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'}`}
            delay={0.5}
            stagger={0.08}
          />
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} mb-8 fade-in-up`}>
            {t('home.heroSubtitle')}
          </p>
          <div className={`${isMobile ? 'space-y-3' : 'space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center'} fade-in-up`}>
            <Link to="/breed-recognition" className={isMobile ? 'block' : ''}>
              <Button size={isMobile ? "default" : "lg"} className={`gradient-primary glow-primary ${isMobile ? 'w-full text-base px-6 py-3 h-12' : 'text-lg px-8 py-4'}`}>
                {t('home.startRecognition')}
              </Button>
            </Link>
            <Link to="/disease-prediction" className={isMobile ? 'block' : ''}>
              <Button size={isMobile ? "default" : "lg"} variant="outline" className={`bg-white/10 border-white/30 text-white hover:bg-white/20 glow-hover ${isMobile ? 'w-full text-base px-6 py-3 h-12' : 'text-lg px-8 py-4'}`}>
                {t('home.diseasePrediction')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with MagicBento */}
      <section className={`${isMobile ? 'py-12' : 'py-20'} relative z-10`}>
        <div className="container mx-auto px-4">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'} fade-in-up`}>
            <SplitText 
              text="Smart Farming Solutions"
              className={`page-title mb-6 ${isMobile ? 'text-2xl' : 'text-4xl'}`}
              delay={0.2}
              stagger={0.06}
            />
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-muted-foreground max-w-3xl mx-auto`}>
              Comprehensive AI-powered tools for modern livestock management and farming excellence.
            </p>
          </div>
          
          <MagicBento items={bentoItems} className="max-w-6xl mx-auto" />
        </div>
      </section>
    </div>
  );
};

export default Home;