import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/shared/ProductCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRelatedProducts } from '@/data/mockData';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setQty(1);
    setSelectedImage(0);
    const [p, r] = await Promise.all([getProductById(id), getRelatedProducts(id)]);
    setProduct(p);
    setRelated(r);
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, qty);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-20 text-center" data-testid="product-not-found">
        <h2 className="font-heading text-navy text-xl">PRODUTO NÃO ENCONTRADO</h2>
        <Link to="/products" className="text-brand-red hover:underline text-sm font-bold font-heading tracking-wider mt-2 inline-block">
          VOLTAR AOS PRODUTOS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10" data-testid="product-detail-page">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6" data-testid="breadcrumb" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>
        <Link to="/" className="hover:text-navy transition-colors">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="hover:text-navy transition-colors">Produtos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-navy transition-colors">{product.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-navy font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F8F8F8] border mb-3">
            <img src={product.images?.[selectedImage] || product.imageUrl} alt={product.name} className="w-full h-full object-cover" data-testid="product-main-image" />
            {product.isPromo && product.discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-brand-yellow text-navy font-bold text-sm px-3 py-1">
                -{product.discount}% OFF
              </Badge>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-navy' : 'border-transparent hover:border-gray-300'
                  }`}
                  data-testid={`thumbnail-${i}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <p className="label-section mb-2">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-heading text-navy mb-3" data-testid="product-name" style={{ textTransform: 'none' }}>
            {product.name}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-navy">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} avaliações)</span>
            </div>
          )}

          <Separator className="my-4" />

          <div className="mb-4">
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through mb-1">De R$ {product.originalPrice.toFixed(2)}</div>
            )}
            <div className="flex items-end gap-2">
              <span className="text-sm text-brand-red font-medium">R$</span>
              <span className="text-4xl md:text-5xl font-black text-brand-red font-heading" data-testid="product-price">
                {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            {product.isPromo && (
              <p className="text-sm text-green-600 font-semibold mt-1">
                Economize R$ {(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6" data-testid="product-description" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty((q) => Math.max(1, q - 1))} data-testid="qty-decrease">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-sm font-semibold" data-testid="qty-value">{qty}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty((q) => q + 1)} data-testid="qty-increase">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-navy hover:bg-navy-light disabled:opacity-50 text-white font-bold py-3 rounded-md text-sm font-heading tracking-wider transition-colors"
              data-testid="add-to-cart-button"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? 'ADICIONAR AO CARRINHO' : 'PRODUTO ESGOTADO'}
            </button>
          </div>

          <div className="rounded-lg bg-[#F4F4F5] p-4 space-y-2 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div className="flex justify-between">
              <span className="text-gray-500">Disponibilidade</span>
              <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-brand-red'}`}>
                {product.inStock ? 'Em estoque' : 'Esgotado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Frete</span>
              <span className="font-semibold">Calcular no checkout</span>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 md:mt-16" data-testid="related-products">
          <span className="label-section">Veja também</span>
          <h2 className="title-section mt-1 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
