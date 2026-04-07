'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useToast } from '@/app/components/ToastContext';
import { useAuth } from '@/app/components/AuthContext';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/');
    }
  }, [authLoading, router, user]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          showToast(error.message, 'error');
          return;
        }
        showToast('Check your email for confirmation!', 'success');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          showToast(error.message, 'error');
          return;
        }
        router.replace('/');
      }
    } catch (err) {
      console.error('Supabase auth request failed', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to reach authentication service. Please try again.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen"
    >
      <form onSubmit={handleAuth} className="p-8 panel-surface-soft border border-theme rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-theme bg-background"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-theme bg-background"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-neon-pink text-theme rounded-xl font-bold"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
        </button>
        <button 
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-muted-theme"
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </form>
    </motion.div>
  );
}
