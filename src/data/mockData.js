const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1595303526913-c7037797ebe7?w=500',
  'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=500',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
  'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=500',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
];

export const CATEGORIES = [
  { id: '1', name: 'Eletronicos', label: 'Eletrônicos', icon: 'Monitor', count: 12 },
  { id: '2', name: 'Alimentos', label: 'Alimentos', icon: 'Apple', count: 15 },
  { id: '3', name: 'Bebidas', label: 'Bebidas', icon: 'Wine', count: 8 },
  { id: '4', name: 'Limpeza', label: 'Limpeza', icon: 'Sparkles', count: 10 },
  { id: '5', name: 'Higiene', label: 'Higiene', icon: 'Heart', count: 5 },
  { id: '6', name: 'Casa', label: 'Casa & Decoração', icon: 'Home', count: 9 },
];

const PRODUCT_NAMES = [
  { name: 'Smart TV LED 55"', cat: 'Eletronicos', price: 2499 },
  { name: 'Notebook Gamer', cat: 'Eletronicos', price: 4999 },
  { name: 'Smartphone 5G', cat: 'Eletronicos', price: 1899 },
  { name: 'Fone Bluetooth', cat: 'Eletronicos', price: 199 },
  { name: 'Arroz Integral 5kg', cat: 'Alimentos', price: 29 },
  { name: 'Feijão Preto 1kg', cat: 'Alimentos', price: 12 },
  { name: 'Óleo de Soja 900ml', cat: 'Alimentos', price: 8 },
  { name: 'Açúcar Cristal 5kg', cat: 'Alimentos', price: 18 },
  { name: 'Refrigerante Cola 2L', cat: 'Bebidas', price: 9 },
  { name: 'Suco Natural 1L', cat: 'Bebidas', price: 12 },
  { name: 'Água Mineral 500ml', cat: 'Bebidas', price: 3 },
  { name: 'Cerveja Pack 12un', cat: 'Bebidas', price: 45 },
  { name: 'Detergente Líquido', cat: 'Limpeza', price: 4 },
  { name: 'Sabão em Pó 1kg', cat: 'Limpeza', price: 15 },
  { name: 'Desinfetante 500ml', cat: 'Limpeza', price: 7 },
  { name: 'Amaciante 2L', cat: 'Limpeza', price: 14 },
  { name: 'Shampoo 400ml', cat: 'Higiene', price: 22 },
  { name: 'Condicionador 400ml', cat: 'Higiene', price: 24 },
  { name: 'Sabonete Pack', cat: 'Higiene', price: 8 },
  { name: 'Pasta de Dente', cat: 'Higiene', price: 6 },
  { name: 'Tablet 10"', cat: 'Eletronicos', price: 1599 },
  { name: 'Mouse Gamer RGB', cat: 'Eletronicos', price: 149 },
  { name: 'Teclado Mecânico', cat: 'Eletronicos', price: 299 },
  { name: 'Webcam HD 1080p', cat: 'Eletronicos', price: 189 },
  { name: 'Café Torrado 500g', cat: 'Alimentos', price: 25 },
  { name: 'Leite Integral 1L', cat: 'Alimentos', price: 6 },
  { name: 'Manteiga 200g', cat: 'Alimentos', price: 14 },
  { name: 'Queijo Mussarela', cat: 'Alimentos', price: 35 },
  { name: 'Energético 250ml', cat: 'Bebidas', price: 8 },
  { name: 'Chá Gelado 1.5L', cat: 'Bebidas', price: 7 },
  { name: 'Monitor LED 27"', cat: 'Eletronicos', price: 1299 },
  { name: 'Headset Gamer', cat: 'Eletronicos', price: 249 },
  { name: 'SSD 1TB NVMe', cat: 'Eletronicos', price: 499 },
  { name: 'Memória RAM 16GB', cat: 'Eletronicos', price: 349 },
  { name: 'Macarrão 500g', cat: 'Alimentos', price: 5 },
  { name: 'Molho de Tomate', cat: 'Alimentos', price: 4 },
  { name: 'Azeite Extra Virgem', cat: 'Alimentos', price: 32 },
  { name: 'Vinho Tinto 750ml', cat: 'Bebidas', price: 49 },
  { name: 'Esponja Multiuso', cat: 'Limpeza', price: 3 },
  { name: 'Almofada Decorativa', cat: 'Casa', price: 39 },
  { name: 'Luminária de Mesa', cat: 'Casa', price: 89 },
  { name: 'Tapete 1.5x2m', cat: 'Casa', price: 159 },
  { name: 'Jogo de Toalhas', cat: 'Casa', price: 69 },
  { name: 'Panela Antiaderente', cat: 'Casa', price: 79 },
  { name: 'Cortina Blackout', cat: 'Casa', price: 129 },
];

function generateProducts() {
  return PRODUCT_NAMES.map((item, i) => {
    const isPromo = i % 3 === 0;
    const isFeatured = i % 5 === 0;
    const isOffer = i % 4 === 0;
    const discount = isPromo ? Math.floor(Math.random() * 25) + 10 : 0;
    const originalPrice = isPromo ? Math.round(item.price / (1 - discount / 100)) : null;

    return {
      id: `prod-${i + 1}`,
      name: item.name,
      description: `Produto de alta qualidade com excelente custo-benefício. ${item.name} ideal para você e sua família. Garantia de satisfação e entrega rápida.`,
      price: item.price,
      originalPrice,
      imageUrl: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
      images: [
        PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(i + 1) % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(i + 2) % PRODUCT_IMAGES.length],
      ],
      category: item.cat,
      inStock: Math.random() > 0.1,
      isPromo,
      isFeatured,
      isOffer,
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 500) + 10,
      discount,
    };
  });
}

export const PRODUCTS = generateProducts();

export const HERO_BANNERS = [
  {
    id: 1,
    title: 'Ofertas da Semana',
    subtitle: 'Até 40% de desconto em eletrônicos',
    cta: 'Ver Ofertas',
    image: 'https://images.unsplash.com/photo-1714224247661-ee250f55a842?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHByb2R1Y2UlMjBzdXBlcm1hcmtldHxlbnwwfHx8fDE3NzUxMDE3NjZ8MA&ixlib=rb-4.1.0&q=85',
    link: '/products?category=Eletronicos',
  },
  {
    id: 2,
    title: 'Atacado & Varejo',
    subtitle: 'Compre mais, pague menos. Preços imbatíveis.',
    cta: 'Comprar Agora',
    image: 'https://images.unsplash.com/photo-1694885156873-6a0823e14848?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHx3aG9sZXNhbGUlMjB3YXJlaG91c2V8ZW58MHx8fHwxNzc1MTAxNzcxfDA&ixlib=rb-4.1.0&q=85',
    link: '/products',
  },
  {
    id: 3,
    title: 'Novidades em Casa',
    subtitle: 'Renove seus ambientes com estilo',
    cta: 'Explorar',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    link: '/products?category=Casa',
  },
];

export const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'João Silva', total: 459.90, status: 'Entregue', date: '2026-02-10' },
  { id: 'ORD-002', customer: 'Maria Santos', total: 1299.00, status: 'Enviado', date: '2026-02-11' },
  { id: 'ORD-003', customer: 'Pedro Costa', total: 89.50, status: 'Processando', date: '2026-02-12' },
  { id: 'ORD-004', customer: 'Ana Oliveira', total: 2499.00, status: 'Entregue', date: '2026-02-09' },
  { id: 'ORD-005', customer: 'Lucas Ferreira', total: 349.90, status: 'Enviado', date: '2026-02-13' },
  { id: 'ORD-006', customer: 'Carla Lima', total: 67.80, status: 'Processando', date: '2026-02-14' },
  { id: 'ORD-007', customer: 'Roberto Alves', total: 899.00, status: 'Cancelado', date: '2026-02-08' },
  { id: 'ORD-008', customer: 'Fernanda Rocha', total: 175.00, status: 'Entregue', date: '2026-02-07' },
];

export const DASHBOARD_STATS = {
  totalRevenue: 158420,
  totalOrders: 1247,
  totalProducts: PRODUCT_NAMES.length,
  totalUsers: 3842,
};

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts(filters = {}) {
  await delay(400);
  let filtered = [...PRODUCTS];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
    );
  }
  if (filters.sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (filters.sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (filters.sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (filters.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return filtered;
}

export async function getProductById(id) {
  await delay(300);
  return PRODUCTS.find((p) => p.id === id) || null;
}

export async function getFeaturedProducts() {
  await delay(400);
  return PRODUCTS.filter((p) => p.isFeatured);
}

export async function getOfferProducts() {
  await delay(400);
  return PRODUCTS.filter((p) => p.isOffer);
}

export async function getRelatedProducts(productId) {
  await delay(300);
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== productId).slice(0, 4);
}
