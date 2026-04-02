import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DASHBOARD_STATS, MOCK_ORDERS } from '@/data/mockData';

const STATS = [
  { title: 'RECEITA TOTAL', value: `R$ ${DASHBOARD_STATS.totalRevenue.toLocaleString('pt-BR')}`, icon: DollarSign, trend: '+12.5%', color: 'bg-brand-yellow text-navy' },
  { title: 'PEDIDOS', value: DASHBOARD_STATS.totalOrders.toLocaleString('pt-BR'), icon: ShoppingCart, trend: '+8.2%', color: 'bg-navy text-brand-yellow' },
  { title: 'PRODUTOS', value: DASHBOARD_STATS.totalProducts, icon: Package, trend: '+3', color: 'bg-brand-red text-white' },
  { title: 'USUÁRIOS', value: DASHBOARD_STATS.totalUsers.toLocaleString('pt-BR'), icon: Users, trend: '+5.1%', color: 'bg-navy-light text-brand-yellow' },
];

const STATUS_MAP = {
  Entregue: 'bg-green-100 text-green-700',
  Enviado: 'bg-blue-100 text-blue-700',
  Processando: 'bg-amber-100 text-amber-700',
  Cancelado: 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  return (
    <div data-testid="admin-dashboard">
      <h1 className="font-heading text-navy text-2xl tracking-wider mb-6">DASHBOARD</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-testid="stats-grid">
        {STATS.map((stat) => (
          <Card key={stat.title} className="border overflow-hidden" data-testid={`stat-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-heading tracking-wider text-gray-500">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black font-heading text-navy">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">{stat.trend}</span>
                <span className="text-xs text-gray-400" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border" data-testid="recent-orders">
        <CardHeader>
          <CardTitle className="font-heading text-navy text-lg tracking-wider">PEDIDOS RECENTES</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-heading text-xs tracking-wider">PEDIDO</TableHead>
                <TableHead className="font-heading text-xs tracking-wider">CLIENTE</TableHead>
                <TableHead className="font-heading text-xs tracking-wider">DATA</TableHead>
                <TableHead className="font-heading text-xs tracking-wider">TOTAL</TableHead>
                <TableHead className="font-heading text-xs tracking-wider">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ORDERS.map((order) => (
                <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
                  <TableCell className="font-semibold text-navy">{order.id}</TableCell>
                  <TableCell style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{order.customer}</TableCell>
                  <TableCell className="text-gray-400" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{order.date}</TableCell>
                  <TableCell className="font-bold text-brand-red">R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs font-bold ${STATUS_MAP[order.status] || ''}`}>{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
