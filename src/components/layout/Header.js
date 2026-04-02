import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronDown, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/data/mockData';

export default function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header data-testid="main-header" className="sticky top-0 z-50 w-full">
      {/* Topbar amarela */}
      <div className="bg-brand-yellow text-navy text-xs font-semibold hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-8">
          <span>Qualidade de supermercado, precinho de atacado</span>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:underline">Produtos</Link>
            <Link to="/products?offers=true" className="hover:underline">Ofertas</Link>
            {isAuthenticated && isAdmin ? (
              <Link to="/admin/dashboard" className="opacity-50 hover:opacity-100">Admin</Link>
            ) : (
              <Link to="/admin/login" className="opacity-50 hover:opacity-100">Admin</Link>
            )}
          </div>
        </div>
      </div>

      {/* Header principal azul marinho */}
      <div className="bg-navy">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-[72px] gap-4">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" data-testid="mobile-menu-button">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-navy border-navy-light">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col p-6 gap-1">
                <span className="font-heading text-brand-yellow text-xl mb-4">Novo Atacarejo</span>
                <Link to="/products?offers=true" className="px-3 py-2.5 rounded-md text-sm font-semibold text-brand-yellow hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(false)}>Ofertas</Link>
                <Link to="/products" className="px-3 py-2.5 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(false)}>Todos os Produtos</Link>
                <div className="border-t border-white/10 my-2" />
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-white/40 mb-1">Categorias</p>
                {CATEGORIES.map((cat) => (
                  <Link key={cat.id} to={`/products?category=${cat.name}`} className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(false)} data-testid={`mobile-cat-${cat.name}`}>{cat.label}</Link>
                ))}
                {isAuthenticated && isAdmin && (
                  <>
                    <div className="border-t border-white/10 my-2" />
                    <Link to="/admin/dashboard" className="px-3 py-2.5 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(false)}>Painel Admin</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" data-testid="logo-link">
            <div className="flex items-center gap-2">
              <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-heading tracking-wider">NOVO</span>
              <span className="text-xl md:text-2xl font-heading text-white tracking-wide">Atacarejo</span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-lg items-center mx-4">
            <div className="relative w-full flex">
              <Input
                data-testid="search-input"
                placeholder="Buscar produtos, ofertas, departamentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 bg-white border-0 rounded-r-none text-sm pr-4 focus-visible:ring-brand-yellow focus-visible:ring-2"
              />
              <button type="submit" className="h-11 px-4 bg-brand-yellow hover:bg-yellow-dark text-navy rounded-r-md flex items-center justify-center transition-colors" data-testid="search-button">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-white/80 mr-2">
              <Phone className="h-4 w-4" />
              <div className="text-xs leading-tight">
                <span className="block text-white/50">Fale conosco</span>
                <span className="font-bold text-white text-sm">0800 000 0000</span>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1">
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 text-xs" data-testid="admin-panel-button">
                      <User className="h-4 w-4 mr-1" /> Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="text-white/80 hover:text-white hover:bg-white/10 text-xs" data-testid="logout-button">
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/admin/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 text-xs" data-testid="login-button">
                  <User className="h-4 w-4 mr-1" /> Entrar
                </Button>
              </Link>
            )}

            <Link to="/cart" className="relative" data-testid="cart-link">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge data-testid="cart-count" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-brand-yellow text-navy border-2 border-navy font-bold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-navy-dark border-t border-white/10 hidden md:block" data-testid="desktop-nav">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center h-11 gap-1">
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-heading text-white hover:text-brand-yellow transition-colors tracking-wider">
              <Menu className="h-4 w-4" /> DEPARTAMENTOS <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block pt-1 z-50">
              <div className="bg-white rounded-lg shadow-xl border p-2 min-w-[200px]">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.id} to={`/products?category=${cat.name}`} className="block px-3 py-2.5 rounded-md text-sm font-medium text-navy hover:bg-brand-yellow/10 transition-colors" data-testid={`nav-cat-${cat.name}`}>{cat.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/products?offers=true" className="px-4 py-2 text-sm font-heading bg-brand-yellow text-navy rounded-md hover:bg-yellow-400 transition-colors tracking-wider" data-testid="nav-offers">OFERTAS</Link>
          <Link to="/products" className="px-4 py-2 text-sm font-heading text-white hover:text-brand-yellow transition-colors tracking-wider" data-testid="nav-products">PRODUTOS</Link>
          <Link to="/cart" className="px-4 py-2 text-sm font-heading text-white hover:text-brand-yellow transition-colors tracking-wider">CARRINHO</Link>
        </div>
      </nav>
    </header>
  );
}
