import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import SplitText from "@/components/SplitText";

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

  const features = [
    {
      title: "Breed Recognition",
      description: "Upload images or videos to identify cattle and buffalo breeds with AI precision.",
      icon: "🐄",
      gradient: "gradient-primary",
    },
    {
      title: "Disease Prediction",
      description: "Early detection of diseases through image analysis and symptom evaluation.",
      icon: "🔬",
      gradient: "gradient-hero",
    },
    {
      title: "AI Chatbot",
      description: "Get instant answers to your farming questions in multiple languages.",
      icon: "🤖",
      gradient: "gradient-wave",
    },
    {
      title: "Hospital Locator",
      description: "Find nearby veterinary hospitals with GPS-based location services.",
      icon: "🏥",
      gradient: "gradient-earth",
    },
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

      {/* About Section */}
      <section className={`${isMobile ? 'py-12' : 'py-20'} bg-gradient-to-r from-green-100/80 via-amber-50/80 to-green-100/80 backdrop-blur-sm relative z-10`}>
        <div className="container mx-auto px-4">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'} fade-in-up`}>
            <SplitText 
              text={t('home.aboutTitle')}
              className={`page-title mb-6 ${isMobile ? 'text-2xl' : 'text-4xl'}`}
              delay={0.2}
              stagger={0.06}
            />
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-muted-foreground max-w-3xl mx-auto`}>
              {t('home.aboutDescription')}
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'}`}>
            <div className="text-center fade-in-up">
              <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                📊
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`}>{t('home.accuracy')}</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>{t('home.accuracyDesc')}</p>
            </div>
            <div className="text-center fade-in-up">
              <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                ⚡
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`}>{t('home.instantResults')}</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>{t('home.instantResultsDesc')}</p>
            </div>
            <div className="text-center fade-in-up">
              <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} gradient-earth rounded-full flex items-center justify-center mx-auto mb-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                🌍
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`}>{t('home.multiLanguage')}</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>{t('home.multiLanguageDesc')}</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;