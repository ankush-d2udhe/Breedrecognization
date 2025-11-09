import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BreedRecognition from "./pages/BreedRecognition";
import DiseasePrediction from "./pages/DiseasePrediction";
import AIChatbot from "./pages/AIChatbot";
import NearbyHospitals from "./pages/NearbyHospitals";
import Marketplace from "./pages/MarketplaceNew";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-white text-2xl">🐄</span>
          </div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">FarmSenseGlow</h2>
          <p className="text-green-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="breed-recognition" element={<BreedRecognition />} />
            <Route path="disease-prediction" element={<DiseasePrediction />} />
            <Route path="ai-chatbot" element={<AIChatbot />} />
            <Route path="nearby-hospitals" element={<NearbyHospitals />} />
            <Route path="marketplace" element={<Marketplace />} />
          </Route>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
