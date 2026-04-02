import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, MapPin, CreditCard, DollarSign } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductCard from '@/components/shared/ProductCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { HERO_BANNERS, CATEGORIES, getFeaturedProducts, getOfferProducts } from '@/data/mockData';
import { motion } from 'framer-motion';

const DEPT_EMOJIS = {
  Eletronicos: '🖥️',
  Alimentos: '🛢️',
  Bebidas: '🍷',
  Limpeza: '🧹',
  Higiene: '🧴',
  Casa: '🏠',
};

const VANTAGENS = [
  { icon: DollarSign, title: 'MENOR PREÇO', subtitle: 'Garantido todo dia', color: 'text-brand-yellow' },
  { icon: ShoppingCart, title: 'ATACADO E VAREJO', subtitle: 'Para família e negócios', color: 'text-brand-yellow' },
  { icon: MapPin, title: 'ENTREGA RÁPIDA', subtitle: 'Em toda a região', color: 'text-brand-yellow' },
  { icon: CreditCard, title: 'CARTÃO DA LOJA', subtitle: 'Benefícios exclusivos', color: 'text-brand-yellow' },
];

const HERO_SLIDES = [
  {
    badge: 'O melhor, disparado',
    title: 'OFERTAS DA\nSEMANA',
    subtitle: 'Qualidade de supermercado com preço de atacado. Os melhores produtos para você.',
    cta: 'Ver ofertas da semana',
    link: '/products?offers=true',
    bg: 'bg-gradient-to-br from-[#0D1B3E] to-[#1a2d5a]',
    emoji: '🛒',
  },
  {
    badge: 'Festival de Produtos',
    title: 'PREÇOS\nIMBATÍVEIS',
    subtitle: 'Eletrônicos, alimentos, bebidas e muito mais com os melhores preços do mercado.',
    cta: 'Ver promoções',
    link: '/products',
    bg: 'bg-gradient-to-br from-[#8B1A1A] to-[#5a0e0e]',
    emoji: '🔥',
  },
  {
    badge: 'Novidades em Casa',
    title: 'QUALIDADE\nTODO DIA',
    subtitle: 'Produtos selecionados com garantia de qualidade para o seu dia a dia.',
    cta: 'Ver produtos',
    link: '/products?category=Casa',
    bg: 'bg-gradient-to-br from-[#1a5c31] to-[#0d3d1f]',
    emoji: '🏠',
  },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [f, o] = await Promise.all([getFeaturedProducts(), getOfferProducts()]);
    setFeatured(f);
    setOffers(o);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div data-testid="home-page">
      {/* HERO CAROUSEL */}
      <section data-testid="hero-carousel">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {HERO_SLIDES.map((slide, i) => (
              <CarouselItem key={i}>
                <div className={`relative h-[300px] sm:h-[380px] md:h-[460px] ${slide.bg} overflow-hidden`}>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 100%)' }} />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex items-center justify-between">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-lg"
                      >
                        <span className="inline-block bg-brand-yellow text-navy text-xs font-bold px-3 py-1 rounded mb-4 font-heading tracking-wider">
                          {slide.badge}
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-4 font-heading" style={{ whiteSpace: 'pre-line' }}>
                          {slide.title.split('\n')[0]}<br />
                          <em className="text-brand-yellow not-italic">{slide.title.split('\n')[1]}</em>
                        </h2>
                        <p className="text-sm md:text-base text-white/70 mb-6 max-w-md">{slide.subtitle}</p>
                        <Link to={slide.link}>
                          <button className="bg-brand-yellow hover:bg-yellow-400 text-navy font-bold px-6 py-3 rounded-md text-sm font-heading tracking-wider transition-colors" data-testid={`hero-cta-${i + 1}`}>
                            {slide.cta}
                          </button>
                        </Link>
                      </motion.div>
                      <div className="hidden md:flex items-center justify-center">
                        <span className="text-[120px] lg:text-[180px] opacity-80 select-none">{slide.emoji}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 hidden sm:flex bg-white/20 hover:bg-white/40 border-0 text-white" />
          <CarouselNext className="right-4 hidden sm:flex bg-white/20 hover:bg-white/40 border-0 text-white" />
        </Carousel>
      </section>

      {/* VANTAGENS STRIP */}
      <section className="bg-navy" data-testid="vantagens-strip">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {VANTAGENS.map((v, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 md:px-6">
                <v.icon className="h-7 w-7 text-brand-yellow flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-heading text-white tracking-wider">{v.title}</p>
                  <p className="text-[10px] md:text-xs text-white/50">{v.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTAMENTOS */}
      <section className="bg-[#F4F4F5] py-10 md:py-14" data-testid="categories-section">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="mb-6">
            <span className="label-section">Explore</span>
            <h2 className="title-section mt-1">Nossos Departamentos</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.name}`}
                className="flex flex-col items-center gap-2 p-4 md:p-6 rounded-lg bg-white border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                data-testid={`category-${cat.name}`}
              >
                <span className="text-3xl md:text-4xl">{DEPT_EMOJIS[cat.name] || '📦'}</span>
                <span className="text-xs font-bold text-navy group-hover:text-brand-red transition-colors text-center font-heading tracking-wider">
                  {cat.label.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTAS DA SEMANA */}
      <section className="py-10 md:py-14" data-testid="offers-section">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="label-section">Economize mais</span>
              <h2 className="title-section mt-1">Ofertas da Semana</h2>
            </div>
            <Link to="/products?offers=true" className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1 font-heading tracking-wider">
              VER TODAS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              : offers.slice(0, 5).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* BANNER ENCARTE */}
      <section className="bg-navy py-12 md:py-16" data-testid="promo-banner">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="font-heading text-brand-yellow text-xs tracking-wider">APROVEITE</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mt-2 mb-2">
                ENCARTE DIGITAL<br /><em className="text-brand-yellow not-italic">NA PALMA DA MÃO</em>
              </h2>
              <p className="text-white/60 text-sm max-w-md">
                Confira nossas promoções antes de sair de casa. Tudo rápido e fácil.
              </p>
              <Link to="/products?offers=true" className="inline-block mt-5">
                <button className="bg-brand-yellow hover:bg-yellow-400 text-navy font-bold px-6 py-3 rounded-md text-sm font-heading tracking-wider transition-colors" data-testid="encarte-cta">
                  VER ENCARTES DIGITAIS
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-[280px]">
              {['🔥', '🥩', '🍷', '🥦'].map((emoji, i) => (
                <div key={i} className="bg-white/5 border border-brand-yellow/20 rounded-lg p-5 flex items-center justify-center text-4xl">
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIS VENDIDOS */}
      <section className="py-10 md:py-14" data-testid="featured-section">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="label-section">Destaque</span>
              <h2 className="title-section mt-1">Mais Vendidos</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1 font-heading tracking-wider">
              VER TODOS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.slice(0, 10).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-brand-red py-12 md:py-16" data-testid="newsletter-section">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 text-center">
          <span className="font-heading text-white/80 text-xs tracking-wider">FIQUE POR DENTRO</span>
          <h2 className="text-2xl md:text-3xl font-heading text-white mt-2 mb-3">RECEBA AS MELHORES OFERTAS</h2>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
            Cadastre seu e-mail e seja o primeiro a saber sobre nossas promoções e eventos especiais.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 h-12 px-4 rounded-l-md text-sm outline-none"
              data-testid="newsletter-email"
            />
            <button className="bg-brand-yellow hover:bg-yellow-400 text-navy font-bold px-6 rounded-r-md text-sm font-heading tracking-wider transition-colors whitespace-nowrap" data-testid="newsletter-submit">
              QUERO RECEBER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
