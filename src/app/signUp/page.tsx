import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/signin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#f8f9fa] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-48 h-48 mx-auto mb-8 relative">
            <svg width="180" height="180" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="58" fill="#e9ecef" />
              <ellipse cx="60" cy="68" rx="26" ry="30" fill="#6f42c1" />
              <ellipse cx="60" cy="68" rx="20" ry="24" fill="#5a32a3" />
              <circle cx="60" cy="48" r="18" fill="#6f42c1" />
              <circle cx="52" cy="44" r="3" fill="#1a1a2e" />
              <circle cx="68" cy="44" r="3" fill="#1a1a2e" />
              <rect x="44" y="62" width="8" height="8" rx="2" fill="#3dbf7a" opacity="0.9" />
              <rect x="68" y="62" width="8" height="8" rx="2" fill="#e07b39" opacity="0.9" />
              <rect x="50" y="78" width="8" height="8" rx="2" fill="#4dabf7" opacity="0.9" />
              <rect x="62" y="78" width="8" height="8" rx="2" fill="#ffd43b" opacity="0.9" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Join Automate NG</h2>
          <p className="text-muted-foreground">Start automating your customer conversations.</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-background overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#37b24d] flex items-center justify-center">
              <svg width="12" height="16" viewBox="0 0 12 20" fill="none">
                <path d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-xl text-[#1a1a2e]">
              Automate<span className="text-[#37b24d]">NG</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Create your account</h1>
          <p className="text-[#6b7280] text-sm mb-8">Fill in your details to get started.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                />
              </div>
            </div>
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
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
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
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#6b7280] mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#37b24d] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
