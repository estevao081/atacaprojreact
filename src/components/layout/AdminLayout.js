import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Package, Tag, LogOut, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Produtos', icon: Package, path: '/admin/products' },
  { label: 'Ofertas', icon: Tag, path: '/admin/offers' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#F4F4F5]" data-testid="admin-layout">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-navy" data-testid="admin-sidebar">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-heading">NOVO</span>
            <span className="text-lg font-heading text-white tracking-wide">
              MODERN<span className="text-brand-yellow">STORE</span>
            </span>
          </Link>
          <p className="text-xs text-white/40 mt-1 font-heading tracking-wider">PAINEL ADMIN</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`admin-nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-yellow text-navy font-bold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-navy text-xs font-bold font-heading">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-white/50 hover:text-brand-red hover:bg-white/5"
            data-testid="admin-logout-button"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-navy">
          <Link to="/" className="flex items-center gap-2 text-white">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-lg font-heading tracking-wide">MODERN<span className="text-brand-yellow">STORE</span></span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white/60 hover:text-white" data-testid="admin-mobile-logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        <nav className="md:hidden flex border-b bg-navy overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-heading tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  active ? 'border-brand-yellow text-brand-yellow' : 'border-transparent text-white/60'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
