import { useState } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: '', inStock: true });

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditProduct(null);
    setForm({ name: '', price: '', category: CATEGORIES[0].name, inStock: true });
    setDialogOpen(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({ name: product.name, price: String(product.price), category: product.category, inStock: product.inStock });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Preencha todos os campos'); return; }
    if (editProduct) {
      setProducts((prev) => prev.map((p) => p.id === editProduct.id ? { ...p, name: form.name, price: Number(form.price), category: form.category, inStock: form.inStock } : p));
      toast.success('Produto atualizado');
    } else {
      const newProduct = {
        id: `prod-${Date.now()}`, name: form.name, price: Number(form.price), category: form.category, inStock: form.inStock,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', images: [], description: `Novo produto: ${form.name}`,
        isPromo: false, isFeatured: false, isOffer: false, rating: 0, reviews: 0, discount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success('Produto criado');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id) => { setProducts((prev) => prev.filter((p) => p.id !== id)); toast.success('Produto removido'); };

  return (
    <div data-testid="admin-products-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-navy text-2xl tracking-wider">PRODUTOS</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar produto..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9" data-testid="admin-product-search" />
          </div>
          <button onClick={openNew} className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-md text-xs font-heading tracking-wider transition-colors flex items-center gap-1" data-testid="add-product-button">
            <Plus className="h-4 w-4" /> NOVO
          </button>
        </div>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-heading text-xs tracking-wider"></TableHead>
              <TableHead className="font-heading text-xs tracking-wider">NOME</TableHead>
              <TableHead className="font-heading text-xs tracking-wider">CATEGORIA</TableHead>
              <TableHead className="font-heading text-xs tracking-wider">PREÇO</TableHead>
              <TableHead className="font-heading text-xs tracking-wider">STATUS</TableHead>
              <TableHead className="text-right font-heading text-xs tracking-wider">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 20).map((product) => (
              <TableRow key={product.id} data-testid={`admin-product-row-${product.id}`}>
                <TableCell><img src={product.imageUrl} alt="" className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-semibold text-navy" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{product.name}</TableCell>
                <TableCell className="text-gray-500" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{product.category}</TableCell>
                <TableCell className="font-bold text-brand-red">R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={product.inStock ? 'bg-green-100 text-green-700 font-bold text-xs' : 'bg-red-100 text-red-700 font-bold text-xs'}>
                    {product.inStock ? 'Em Estoque' : 'Esgotado'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)} data-testid={`edit-product-${product.id}`}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-brand-red" onClick={() => handleDelete(product.id)} data-testid={`delete-product-${product.id}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length > 20 && (
          <div className="text-center py-3 text-sm text-gray-400 border-t" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>
            Mostrando 20 de {filtered.length} produtos
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-testid="product-dialog">
          <DialogHeader>
            <DialogTitle className="font-heading text-navy tracking-wider">{editProduct ? 'EDITAR PRODUTO' : 'NOVO PRODUTO'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-navy">Nome</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="mt-1.5" data-testid="product-form-name" />
            </div>
            <div>
              <Label className="text-sm font-medium text-navy">Preço (R$)</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="mt-1.5" data-testid="product-form-price" />
            </div>
            <div>
              <Label className="text-sm font-medium text-navy">Categoria</Label>
              <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                <SelectTrigger className="mt-1.5" data-testid="product-form-category"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (<SelectItem key={cat.id} value={cat.name}>{cat.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <button onClick={handleSave} className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-md text-sm font-heading tracking-wider transition-colors" data-testid="product-form-save">
              {editProduct ? 'SALVAR' : 'CRIAR'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
