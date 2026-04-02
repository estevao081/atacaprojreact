import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4" data-testid="admin-login-page">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-heading tracking-wider">NOVO</span>
              <span className="text-3xl font-heading text-white tracking-wide">
                MODERN<span className="text-brand-yellow">STORE</span>
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/50 font-heading tracking-wider">PAINEL ADMINISTRATIVO</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h2 className="font-heading text-navy text-xl tracking-wider mb-6">ENTRAR</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-navy">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@marketplace.com"
                required
                className="mt-1.5 focus-visible:ring-navy"
                data-testid="admin-login-email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-navy">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
                className="mt-1.5 focus-visible:ring-navy"
                data-testid="admin-login-password"
              />
            </div>
            {error && (
              <p className="text-sm text-brand-red font-medium" data-testid="login-error">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy hover:bg-navy-light disabled:opacity-50 text-white font-bold py-3 rounded-md text-sm font-heading tracking-wider transition-colors"
              data-testid="admin-login-submit"
            >
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>
            Demo: admin@marketplace.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
