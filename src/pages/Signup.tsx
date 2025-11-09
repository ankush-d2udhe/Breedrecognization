import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, AlertCircle, CheckCircle, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t, setLanguage } = useLanguage();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again.`);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      });

      if (error) {
        if (error.message.includes('security purposes')) {
          setCooldown(35);
          const timer = setInterval(() => {
            setCooldown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
        setError(error.message);
        return;
      }

      // Set the selected language for the user
      setLanguage(selectedLanguage);
      setSuccess('Account created! Please check your email to verify.');
    } catch (err: unknown) {
      // Log the full error to the console to help diagnose network / CORS / fetch failures
      console.error('Signup failed:', err);

      // Surface a more specific message to the user when available
      if (err instanceof Error) {
        setError(`Signup failed: ${err.message}`);
      } else {
        try {
          setError(`Signup failed: ${JSON.stringify(err)}`);
        } catch {
          setError('Signup failed. Please try again.');
        }
      }
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
            <CardTitle className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-800 mb-2`}>Create Account</CardTitle>
            <p className={`text-green-600 font-medium ${isMobile ? 'text-sm' : ''}`}>Join FarmSenseGlow</p>
          </CardHeader>
          
          <CardContent className={`${isMobile ? 'space-y-4 px-4 pb-6' : 'space-y-6'}`}>
            {error && (
              <div className={`flex items-center gap-2 ${isMobile ? 'p-2' : 'p-3'} bg-red-50 border border-red-200 rounded-lg text-red-700`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className={`flex items-center gap-2 ${isMobile ? 'p-2' : 'p-3'} bg-green-50 border border-green-200 rounded-lg text-green-700`}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="language" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>
                  <Globe className="w-4 h-4 inline mr-1" />
                  Select Language
                </Label>
                <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
                  <SelectTrigger className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 ${isMobile ? 'h-11 text-base' : ''}`}>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="mr">मराठी</SelectItem>
                  </SelectContent>
                </Select>
                <p className={`text-green-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Choose your preferred language for the website</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 ${isMobile ? 'h-11 text-base' : ''}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 ${isMobile ? 'h-11 text-base' : ''}`}
                />
              </div>

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
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={`text-green-700 font-medium ${isMobile ? 'text-sm' : ''}`}>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`border-green-200 focus:border-amber-400 focus:ring-amber-400 ${isMobile ? 'h-11 text-base' : ''}`}
                />
              </div>

              <div className={`${isMobile ? 'space-y-2 pt-1' : 'space-y-3 pt-2'}`}>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold ${isMobile ? 'py-3 h-12 text-base' : 'py-3'}`}
                  disabled={isLoading || cooldown > 0}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Creating Account...
                    </>
                  ) : cooldown > 0 ? (
                    `Wait ${cooldown}s`
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>

            <div className={`text-center ${isMobile ? 'pt-3' : 'pt-4'} border-t border-green-100`}>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600 mb-2`}>
                Already have an account?
              </p>
              <Link to="/login">
                <Button
                  variant="outline"
                  className={`border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold ${isMobile ? 'py-2 h-10 text-sm' : 'py-2'}`}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;