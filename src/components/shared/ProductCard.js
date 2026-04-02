import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link to={`/product/${product.id}`} className="group block" data-testid={`product-card-${product.id}`}>
        <div className="relative border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          {/* Image */}
          <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {product.isPromo && product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-brand-yellow text-navy text-[10px] font-bold px-2 py-0.5 rounded" data-testid={`promo-badge-${product.id}`}>
                -{product.discount}%
              </Badge>
            )}
            {product.isOffer && (
              <Badge className="absolute top-2 right-2 bg-brand-red text-white text-[9px] font-bold px-2 py-0.5 rounded">
                OFERTA
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-bold font-heading tracking-wider">ESGOTADO</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 md:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-red mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 mb-1 text-navy group-hover:text-brand-red transition-colors" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>
              {product.name}
            </h3>

            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 fill-brand-yellow text-brand-yellow" />
                <span className="text-xs font-medium text-navy">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>
            )}

            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through mb-0.5">
                De R$ {product.originalPrice.toFixed(2)}
              </div>
            )}

            <div className="flex items-end gap-1 mb-3">
              <span className="text-xs text-brand-red font-medium">R$</span>
              <span className="text-xl font-black text-brand-red font-heading" data-testid={`price-${product.id}`}>
                {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-1.5 bg-navy hover:bg-navy-light disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-md transition-colors font-heading tracking-wider"
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              ADICIONAR
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
