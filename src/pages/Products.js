import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/shared/ProductCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { CATEGORIES, getProducts } from '@/data/mockData';

function FilterPanel({ filters, setFilters, className = '' }) {
  return (
    <div className={className}>
      <h3 className="font-heading text-navy text-lg tracking-wider mb-4">FILTROS</h3>
      <div className="space-y-5">
        <div>
          <p className="label-section mb-2">Categoria</p>
          <div className="space-y-1">
            <button
              onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.category === 'all' ? 'bg-navy text-brand-yellow font-bold' : 'hover:bg-[#F4F4F5] text-navy'
              }`}
              data-testid="filter-cat-all"
            >
              Todas
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilters((f) => ({ ...f, category: cat.name }))}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.category === cat.name ? 'bg-navy text-brand-yellow font-bold' : 'hover:bg-[#F4F4F5] text-navy'
                }`}
                data-testid={`filter-cat-${cat.name}`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <p className="label-section mb-2">Faixa de Preço</p>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : null }))}
              className="h-9 text-sm"
              data-testid="filter-min-price"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : null }))}
              className="h-9 text-sm"
              data-testid="filter-max-price"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const offersParam = searchParams.get('offers');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryParam,
    search: searchParam,
    sortBy: 'default',
    minPrice: null,
    maxPrice: null,
  });
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: categoryParam, search: searchParam }));
  }, [categoryParam, searchParam]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const result = await getProducts({
      ...filters,
      category: filters.category === 'all' ? null : filters.category,
    });
    if (offersParam) {
      setProducts(result.filter((p) => p.isOffer));
    } else {
      setProducts(result);
    }
    setLoading(false);
  }, [filters, offersParam]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const clearFilters = () => {
    setFilters({ category: 'all', search: '', sortBy: 'default', minPrice: null, maxPrice: null });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.search || filters.minPrice || filters.maxPrice;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10" data-testid="products-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="label-section">
            {offersParam ? 'Economize' : 'Explore'}
          </span>
          <h1 className="title-section mt-1">
            {offersParam ? 'OFERTAS' : filters.category !== 'all' ? filters.category.toUpperCase() : 'TODOS OS PRODUTOS'}
          </h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1" style={{ textTransform: 'none', fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>
              {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select value={filters.sortBy} onValueChange={(v) => setFilters((f) => ({ ...f, sortBy: v }))}>
            <SelectTrigger className="w-[160px] h-9 text-sm" data-testid="sort-select">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Relevância</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
              <SelectItem value="name">Nome A-Z</SelectItem>
              <SelectItem value="rating">Avaliação</SelectItem>
            </SelectContent>
          </Select>
          <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden border-navy text-navy" data-testid="mobile-filter-button">
                <SlidersHorizontal className="h-4 w-4 mr-1" /> Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
              <SheetTitle className="sr-only">Filtros</SheetTitle>
              <FilterPanel filters={filters} setFilters={setFilters} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap" data-testid="active-filters">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-navy text-white rounded-full text-xs font-medium">
              Busca: "{filters.search}"
              <button onClick={() => setFilters((f) => ({ ...f, search: '' }))}><X className="h-3 w-3" /></button>
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-navy text-white rounded-full text-xs font-medium">
              {filters.category}
              <button onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}><X className="h-3 w-3" /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs font-bold text-brand-red hover:underline font-heading tracking-wider" data-testid="clear-filters">
            LIMPAR FILTROS
          </button>
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden md:block w-56 flex-shrink-0" data-testid="desktop-filters">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20" data-testid="no-products">
              <p className="text-lg font-heading text-navy">NENHUM PRODUTO ENCONTRADO</p>
              <p className="text-sm text-gray-500 mb-4" style={{ textTransform: 'none', fontFamily: "'Barlow', sans-serif" }}>Tente ajustar seus filtros</p>
              <Button variant="outline" onClick={clearFilters} className="border-navy text-navy">Limpar filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
