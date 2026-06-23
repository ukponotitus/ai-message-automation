import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Facebook, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { login, setUser, refreshBusinesses } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/onboarding';

  useEffect(() => {
    if (FACEBOOK_APP_ID && !(window as any).FB) {
      const fbScript = document.createElement('script');
      fbScript.src = `https://connect.facebook.net/en_US/sdk.js`;
      fbScript.async = true;
      fbScript.defer = true;
      fbScript.onload = () => {
        (window as any).FB.init({
          appId: FACEBOOK_APP_ID,
          version: 'v19.0',
          xfbml: true,
          autoLogAppEvents: true,
        });
      };
      document.body.appendChild(fbScript);
    }

    if (GOOGLE_CLIENT_ID && !(window as any).google) {
      const googleScript = document.createElement('script');
      googleScript.src = 'https://accounts.google.com/gsi/client';
      googleScript.async = true;
      googleScript.defer = true;
      document.body.appendChild(googleScript);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirect.startsWith('http') ? '/onboarding' : redirect);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('Google Login is not configured. Add VITE_GOOGLE_CLIENT_ID to .env');
      return;
    }

    const google = (window as any).google;
    if (google?.accounts?.oauth2) {
      setSocialLoading('google');
      setError('');

      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (response: any) => {
          if (response.access_token) {
            try {
              const data = await api.post<{ access: string; user: any }>('/auth/google/', {
                access_token: response.access_token,
              });
              localStorage.setItem('access_token', data.access);
              setUser(data.user);
              await refreshBusinesses();
              navigate(redirect);
            } catch (err: any) {
              setError(err?.message || 'Google login failed');
            }
          }
          setSocialLoading(null);
        },
      });
      client.requestAccessToken();
    } else {
      setError('Google Identity Services not loaded. Check your internet or ad blocker.');
    }
  };

  const handleFacebookLogin = () => {
    if (!FACEBOOK_APP_ID) {
      setError('Facebook Login is not configured. Add VITE_FACEBOOK_APP_ID to .env');
      return;
    }

    const FB = (window as any).FB;
    if (FB) {
      setSocialLoading('facebook');
      setError('');

      FB.login(async (response: any) => {
        if (response.authResponse?.accessToken) {
          try {
            const data = await api.post<{ access: string; user: any }>('/auth/facebook/', {
              access_token: response.authResponse.accessToken,
            });
            localStorage.setItem('access_token', data.access);
            setUser(data.user);
            await refreshBusinesses();
            navigate('/onboarding');
          } catch (err: any) {
            setError(err?.message || 'Facebook login failed');
          }
        } else {
          setError('Facebook login cancelled or failed');
        }
        setSocialLoading(null);
      }, { scope: 'email,public_profile' });
    } else {
      setError('Facebook SDK not loaded yet. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-80 h-80 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#37b24d] to-[#2d9a3e] rounded-full opacity-20 blur-3xl" />
            <div className="relative flex items-center justify-center h-full">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" fill="#37b24d" opacity="0.2" />
                <circle cx="100" cy="100" r="60" fill="#37b24d" opacity="0.4" />
                <path d="M70 90 L80 70 L90 65 L100 70 L110 65 L120 70 L130 90 L125 120 L115 140 L95 145 L75 140 L65 120 Z" fill="#37b24d" stroke="#2d9a3e" strokeWidth="2" />
                <circle cx="95" cy="85" r="4" fill="#1a1a2e" />
                <circle cx="105" cy="85" r="4" fill="#1a1a2e" />
                <path d="M90 100 Q100 105 110 100" stroke="#1a1a2e" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">Welcome back</h2>
          <p className="text-muted-foreground text-lg">Let's get you signed in</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-[#1a1a2e]">Welcome back</h1>
              <Link to="/signup" className="px-4 py-2 text-sm border-2 border-[#37b24d] text-[#37b24d] rounded-lg hover:bg-[#37b24d] hover:text-white transition-all">
                GET STARTED FREE
              </Link>
            </div>
            <p className="text-muted-foreground">Let's get you signed in</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#37b24d] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#2d9a3e] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-[#9ca3af]">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={socialLoading === 'google'}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {socialLoading === 'google' ? <Loader2 size={16} className="animate-spin" /> : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span className="font-medium text-sm">Sign In With Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={socialLoading === 'facebook'}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {socialLoading === 'facebook' ? <Loader2 size={16} className="animate-spin" /> : <Facebook className="w-5 h-5 text-[#1877f2]" />}
              <span className="font-medium text-sm">Sign In With Facebook</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6b7280]">
              New here?{' '}
              <Link to="/signup" className="text-[#37b24d] hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}