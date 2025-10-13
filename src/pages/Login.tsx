import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      navigate('/', { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center relative p-2 sm:p-4">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Cattle background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-emerald-800/75 to-green-900/85"></div>
      </div>
      
      <div className={`w-full ${isMobile ? 'max-w-sm mx-2' : 'max-w-md'} relative z-10`}>
        <Card className="bg-white/95 backdrop-blur-sm border-amber-200 shadow-2xl">
          <CardHeader className={`text-center ${isMobile ? 'pb-4 pt-6' : 'pb-6'}`}>
            <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
              <span className={`text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>🐄</span>
            </div>
            <CardTitle className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-800 mb-2`}>{t('app.title')}</CardTitle>
            <p className={`text-green-600 font-medium ${isMobile ? 'text-sm' : ''}`}>{t('app.tagline')}</p>
          </CardHeader>
          
          <CardContent className={`${isMobile ? 'space-y-4 px-4 pb-6' : 'space-y-6'}`}>
            {error && (
              <div className={`flex items-center gap-2 ${isMobile ? 'p-2' : 'p-3'} bg-red-50 border border-red-200 rounded-lg text-red-700`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 ${isMobile ? 'h-11 text-base' : ''}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 pr-10 ${isMobile ? 'h-11 text-base' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className={`${isMobile ? 'space-y-2 pt-1' : 'space-y-3 pt-2'}`}>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold ${isMobile ? 'py-3 h-12 text-base' : 'py-3'}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>


              </div>
            </form>

            <div className={`text-center ${isMobile ? 'pt-3' : 'pt-4'} border-t border-green-100`}>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600 mb-2`}>
                Don't have an account?
              </p>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className={`border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold ${isMobile ? 'py-2 h-10 text-sm' : 'py-2'}`}
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;