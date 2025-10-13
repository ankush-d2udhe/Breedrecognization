import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Auth
    'auth.login': 'Sign In',
    'auth.signup': 'Create Account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.createAccount': 'Create Account',
    'auth.signIn': 'Sign In',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.language': 'Select Language',
    'auth.languageHelp': 'Choose your preferred language for the website',
    'auth.accountCreated': 'Account created! Please check your email to verify.',
    'auth.passwordMismatch': 'Passwords do not match',
    'auth.signupFailed': 'Signup failed. Please try again.',
    'auth.loginFailed': 'Login failed. Please try again.',
    'auth.welcome': 'Welcome',
    'auth.signOut': 'Sign Out',
    
    // App Title
    'app.title': 'FarmSenseGlow',
    'app.subtitle': 'Smart Livestock AI',
    'app.tagline': 'Breed Recognition System',
    
    // Navigation
    'nav.home': 'Home',
    'nav.breedRecognition': 'Breed Recognition',
    'nav.diseasePrediction': 'Disease Prediction',
    'nav.aiChatbot': 'AI Chatbot',
    'nav.nearbyHospitals': 'Nearby Hospitals',
    
    // Home Page
    'home.heroTitle': 'Revolutionizing Livestock Management',
    'home.heroSubtitle': 'Smart AI for Cattle & Buffalo Farmers',
    'home.startRecognition': 'Start Recognition',
    'home.diseasePrediction': 'Disease Prediction',
    'home.aboutTitle': 'Revolutionizing Livestock Management',
    'home.aboutDescription': 'Our advanced AI system helps farmers identify breeds, predict diseases, and connect with veterinary services - all in one comprehensive platform designed specifically for the modern agricultural community.',
    'home.accuracy': '90%+ Accuracy',
    'home.accuracyDesc': 'State-of-the-art AI models trained on millions of livestock images with continuous learning',
    'home.instantResults': 'Instant Results',
    'home.instantResultsDesc': 'Get breed identification and disease predictions in seconds',
    'home.multiLanguage': 'Multi-Language',
    'home.multiLanguageDesc': 'Available in English, Hindi, and Marathi for all farmers',
    
    // AI Chatbot
    'chatbot.title': 'AI Farming Assistant',
    'chatbot.subtitle': 'Ask questions about livestock care',
    'chatbot.placeholder': 'Ask about cattle care, diseases, breeding...',
    'chatbot.send': 'Send',
    'chatbot.thinking': 'AI is thinking...',
    
    // Nearby Hospitals
    'hospitals.title': 'Nearby Veterinary Hospitals',
    'hospitals.subtitle': 'Find veterinary care near you',
    'hospitals.search': 'Search Location',
    'hospitals.findHospitals': 'Find Hospitals',
    'hospitals.distance': 'Distance',
    'hospitals.phone': 'Phone',
    'hospitals.directions': 'Get Directions',
    
    // Disease Prediction
    'disease.title': 'Disease Prediction',
    'disease.subtitle': 'AI-powered livestock disease detection',
    'disease.uploadImage': 'Upload Animal Photo',
    'disease.analyzing': 'Analyzing...',
    'disease.analyze': 'Analyze Disease',
    'disease.changeImage': 'Change Image',
    
    // Breed Recognition
    'breed.title': 'AI Breed Recognition',
    'breed.subtitle': 'Advanced AI-powered breed identification',
    'breed.uploadPhoto': 'Upload Animal Photo',
    'breed.identify': 'Identify Breed',
    'breed.analyzing': 'Analyzing Breed...',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
  },
  
  hi: {
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    
    // Auth
    'auth.login': 'साइन इन',
    'auth.signup': 'खाता बनाएं',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.createAccount': 'खाता बनाएं',
    'auth.signIn': 'साइन इन',
    'auth.dontHaveAccount': 'खाता नहीं है?',
    'auth.alreadyHaveAccount': 'पहले से खाता है?',
    'auth.language': 'भाषा चुनें',
    'auth.languageHelp': 'वेबसाइट के लिए अपनी पसंदीदा भाषा चुनें',
    'auth.accountCreated': 'खाता बनाया गया! कृपया सत्यापन के लिए अपना ईमेल जांचें।',
    'auth.passwordMismatch': 'पासवर्ड मेल नहीं खाते',
    'auth.signupFailed': 'साइनअप असफल। कृपया पुनः प्रयास करें।',
    'auth.loginFailed': 'लॉगिन असफल। कृपया पुनः प्रयास करें।',
    'auth.welcome': 'स्वागत',
    'auth.signOut': 'साइन आउट',
    
    // App Title
    'app.title': 'फार्मसेंसग्लो',
    'app.subtitle': 'स्मार्ट पशुधन AI',
    'app.tagline': 'नस्ल पहचान प्रणाली',
    
    // Navigation
    'nav.home': 'होम',
    'nav.breedRecognition': 'नस्ल पहचान',
    'nav.diseasePrediction': 'रोग भविष्यवाणी',
    'nav.aiChatbot': 'AI चैटबॉट',
    'nav.nearbyHospitals': 'नजदीकी अस्पताल',
    
    // Home Page
    'home.heroTitle': 'पशुधन प्रबंधन में क्रांति',
    'home.heroSubtitle': 'गाय और भैंस किसानों के लिए स्मार्ट AI',
    'home.startRecognition': 'पहचान शुरू करें',
    'home.diseasePrediction': 'रोग भविष्यवाणी',
    'home.aboutTitle': 'पशुधन प्रबंधन में क्रांति',
    'home.aboutDescription': 'हमारी उन्नत AI प्रणाली किसानों को नस्लों की पहचान करने, बीमारियों की भविष्यवाणी करने और पशु चिकित्सा सेवाओं से जुड़ने में मदद करती है - सभी एक व्यापक मंच में जो विशेष रूप से आधुनिक कृषि समुदाय के लिए डिज़ाइन किया गया है।',
    'home.accuracy': '90%+ सटीकता',
    'home.accuracyDesc': 'निरंतर सीखने के साथ लाखों पशुधन छवियों पर प्रशिक्षित अत्याधुनिक AI मॉडल',
    'home.instantResults': 'तत्काल परिणाम',
    'home.instantResultsDesc': 'सेकंडों में नस्ल पहचान और रोग भविष्यवाणी प्राप्त करें',
    'home.multiLanguage': 'बहु-भाषा',
    'home.multiLanguageDesc': 'सभी किसानों के लिए अंग्रेजी, हिंदी और मराठी में उपलब्ध',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
  },
  
  mr: {
    // Common
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यश',
    'common.cancel': 'रद्द करा',
    'common.save': 'जतन करा',
    'common.delete': 'हटवा',
    'common.edit': 'संपादित करा',
    'common.back': 'परत',
    'common.next': 'पुढे',
    'common.previous': 'मागे',
    
    // Auth
    'auth.login': 'साइन इन',
    'auth.signup': 'खाते तयार करा',
    'auth.email': 'ईमेल पत्ता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्डची पुष्टी करा',
    'auth.createAccount': 'खाते तयार करा',
    'auth.signIn': 'साइन इन',
    'auth.dontHaveAccount': 'खाते नाही?',
    'auth.alreadyHaveAccount': 'आधीच खाते आहे?',
    'auth.language': 'भाषा निवडा',
    'auth.languageHelp': 'वेबसाइटसाठी तुमची पसंतीची भाषा निवडा',
    'auth.accountCreated': 'खाते तयार केले! कृपया सत्यापनासाठी तुमचा ईमेल तपासा.',
    'auth.passwordMismatch': 'पासवर्ड जुळत नाहीत',
    'auth.signupFailed': 'साइनअप अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    'auth.loginFailed': 'लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    'auth.welcome': 'स्वागत',
    'auth.signOut': 'साइन आउट',
    
    // App Title
    'app.title': 'फार्मसेन्सग्लो',
    'app.subtitle': 'स्मार्ट पशुधन AI',
    'app.tagline': 'जाती ओळख प्रणाली',
    
    // Navigation
    'nav.home': 'होम',
    'nav.breedRecognition': 'जाती ओळख',
    'nav.diseasePrediction': 'रोग अंदाज',
    'nav.aiChatbot': 'AI चॅटबॉट',
    'nav.nearbyHospitals': 'जवळची रुग्णालये',
    
    // Home Page
    'home.heroTitle': 'पशुधन व्यवस्थापनात क्रांती',
    'home.heroSubtitle': 'गाय आणि म्हशी शेतकऱ्यांसाठी स्मार्ट AI',
    'home.startRecognition': 'ओळख सुरू करा',
    'home.diseasePrediction': 'रोग अंदाज',
    'home.aboutTitle': 'पशुधन व्यवस्थापनात क्रांती',
    'home.aboutDescription': 'आमची प्रगत AI प्रणाली शेतकऱ्यांना जाती ओळखण्यास, रोगांचा अंदाज लावण्यास आणि पशुवैद्यकीय सेवांशी जोडण्यास मदत करते - हे सर्व एका व्यापक प्लॅटफॉर्मवर जे विशेषतः आधुनिक कृषी समुदायासाठी डिझाइन केले आहे.',
    'home.accuracy': '90%+ अचूकता',
    'home.accuracyDesc': 'सतत शिकण्यासह लाखो पशुधन प्रतिमांवर प्रशिक्षित अत्याधुनिक AI मॉडेल',
    'home.instantResults': 'तत्काळ परिणाम',
    'home.instantResultsDesc': 'सेकंदांत जाती ओळख आणि रोग अंदाज मिळवा',
    'home.multiLanguage': 'बहु-भाषा',
    'home.multiLanguageDesc': 'सर्व शेतकऱ्यांसाठी इंग्रजी, हिंदी आणि मराठीत उपलब्ध',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('farmSenseLanguage');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('farmSenseLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};