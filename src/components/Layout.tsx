import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedBackground from './AnimatedBackground';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/breed-recognition", label: t('nav.breedRecognition') },
    { path: "/disease-prediction", label: t('nav.diseasePrediction') },
    { path: "/ai-chatbot", label: t('nav.aiChatbot') },
    { path: "/nearby-hospitals", label: t('nav.nearbyHospitals') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Use animated background on Home, otherwise use the cow field photo as the background */}
      {location.pathname === '/' ? (
        <AnimatedBackground className="animated-bg-hidden-mobile" />
      ) : (
        <div className="fixed inset-0 pointer-events-none -z-20 hidden sm:block">
          <img
            src="https://wallpapers.com/images/high/field-full-of-cow-ufjpphyqw0h22hu5.webp"
            alt="Field of cows background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-green-800/95 via-emerald-700/95 to-green-800/95 backdrop-blur-md border-b-2 border-amber-400/30 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className={`text-white font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>🐄</span>
              </div>
              <div className="flex flex-col">
                <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>{t('app.title')}</span>
                <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-amber-200`}>{t('app.subtitle')}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 bg-white/10 rounded-full p-1 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setActiveTab(item.path)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    activeTab === item.path
                      ? "bg-amber-400 text-green-800 shadow-md font-semibold"
                      : "text-white hover:bg-white/20 hover:text-amber-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button & User Menu */}
            <div className="flex items-center space-x-2">
              {!isMobile && (
                <div className="text-amber-200 font-medium text-sm">
                  {t('auth.welcome')}, {user?.email?.split('@')[0] || 'Farmer'}
                </div>
              )}
              
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "sm"}
                onClick={handleSignOut}
                className={`border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-green-800 transition-all ${isMobile ? 'px-2' : ''}`}
              >
                <LogOut className={`w-4 h-4 ${!isMobile ? 'mr-1' : ''}`} />
                {!isMobile && 'Sign Out'}
              </Button>
              
              {/* Mobile Menu Toggle */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="mt-3 pb-3 border-t border-white/20">
              <div className="text-amber-200 text-sm mb-3 px-2">
                {t('auth.welcome')}, {user?.email?.split('@')[0] || 'Farmer'}
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setActiveTab(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`block px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                      activeTab === item.path
                        ? "bg-amber-400 text-green-800 shadow-md font-semibold"
                        : "text-white hover:bg-white/20 hover:text-amber-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;