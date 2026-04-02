import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/mockData';

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-navy-dark text-white mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-heading tracking-wider">NOVO</span>
                <span className="text-xl font-heading text-white tracking-wide">ATACAREJO</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Qualidade de supermercado com preço de atacado. Novo Atacarejo com os melhores preços.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-brand-yellow text-sm tracking-wider mb-4">DEPARTAMENTOS</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.name}`} className="text-sm text-white/60 hover:text-brand-yellow transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-brand-yellow text-sm tracking-wider mb-4">INSTITUCIONAL</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-white/60">Quem Somos</span></li>
              <li><span className="text-sm text-white/60">Nossas Lojas</span></li>
              <li><span className="text-sm text-white/60">Política de Privacidade</span></li>
              <li><span className="text-sm text-white/60">Fale Conosco</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-brand-yellow text-sm tracking-wider mb-4">ATENDIMENTO</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-white/60">Central de Ajuda</span></li>
              <li><span className="text-sm text-white/60">Trocas e Devoluções</span></li>
              <li><span className="text-sm text-white/60">Rastreio de Pedidos</span></li>
              <li className="pt-2">
                <span className="text-xs text-white/40">Fale conosco</span>
                <p className="text-lg font-bold text-brand-yellow font-heading tracking-wider">0800 000 0000</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; 2026 Novo Atacarejo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/30">Dados mockados para demonstração</p>
        </div>
      </div>
    </footer>
  );
}
