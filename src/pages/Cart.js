import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item.product.id);
    toast.info(`${item.product.name} removido do carrinho`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-20 text-center" data-testid="empty-cart">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#F4F4F5] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="font-heading text-navy text-2xl">SEU CARRINHO ESTÁ VAZIO</h1>
          <p className="text-gray-500 mb-6 text-sm" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>
            Explore nossos produtos e encontre ofertas incríveis!
          </p>
          <Link to="/products">
            <button className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-3 rounded-md text-sm font-heading tracking-wider transition-colors" data-testid="continue-shopping-button">
              CONTINUAR COMPRANDO <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10" data-testid="cart-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="label-section">Seu pedido</span>
          <h1 className="title-section mt-1">
            CARRINHO <span className="text-gray-400 text-lg font-normal" style={{ textTransform: 'none', fontFamily: "'Barlow', sans-serif" }}>({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { clearCart(); toast.info('Carrinho limpo'); }}
          className="text-gray-400 hover:text-brand-red text-xs"
          data-testid="clear-cart-button"
        >
          Limpar tudo
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 p-4 border rounded-lg bg-white"
                data-testid={`cart-item-${item.product.id}`}
              >
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="hover:text-brand-red transition-colors">
                    <h3 className="font-semibold text-sm md:text-base text-navy line-clamp-1" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{item.product.name}</h3>
                  </Link>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-red mt-0.5">{item.product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} data-testid={`cart-qty-decrease-${item.product.id}`}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold" data-testid={`cart-qty-${item.product.id}`}>{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} data-testid={`cart-qty-increase-${item.product.id}`}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-brand-red font-heading text-lg" data-testid={`cart-item-total-${item.product.id}`}>
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-brand-red" onClick={() => handleRemove(item)} data-testid={`cart-remove-${item.product.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg bg-white p-6 sticky top-36" data-testid="cart-summary">
            <h3 className="font-heading text-navy text-lg tracking-wider mb-4">RESUMO DO PEDIDO</h3>
            <div className="space-y-3 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({itemCount} itens)</span>
                <span className="font-medium">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Frete</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-heading text-navy text-lg">TOTAL</span>
              <span className="font-black text-2xl text-brand-red font-heading" data-testid="cart-total">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              className="w-full bg-brand-yellow hover:bg-yellow-400 text-navy font-bold py-3.5 rounded-md text-sm font-heading tracking-wider transition-colors"
              onClick={() => toast.success('Pedido finalizado com sucesso! (Demo)')}
              data-testid="checkout-button"
            >
              FINALIZAR COMPRA
            </button>
            <Link to="/products" className="block mt-3">
              <Button variant="outline" size="sm" className="w-full border-navy text-navy" data-testid="keep-shopping-button">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
