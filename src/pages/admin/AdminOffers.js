import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PRODUCTS } from '@/data/mockData';
import { toast } from 'sonner';

const initialOffers = PRODUCTS.filter((p) => p.isOffer).slice(0, 8).map((p, i) => ({
  id: `offer-${i + 1}`, product: p, discount: Math.floor(Math.random() * 25) + 10, active: i < 6, expiresAt: '2026-03-01',
}));

export default function AdminOffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOffer, setEditOffer] = useState(null);
  const [form, setForm] = useState({ discount: '', expiresAt: '' });

  const openNew = () => { setEditOffer(null); setForm({ discount: '15', expiresAt: '2026-04-01' }); setDialogOpen(true); };
  const openEdit = (offer) => { setEditOffer(offer); setForm({ discount: String(offer.discount), expiresAt: offer.expiresAt }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.discount) { toast.error('Preencha o desconto'); return; }
    if (editOffer) {
      setOffers((prev) => prev.map((o) => o.id === editOffer.id ? { ...o, discount: Number(form.discount), expiresAt: form.expiresAt } : o));
      toast.success('Oferta atualizada');
    } else {
      const available = PRODUCTS.find((p) => !offers.some((o) => o.product.id === p.id));
      if (!available) { toast.error('Não há produtos disponíveis'); setDialogOpen(false); return; }
      setOffers((prev) => [{ id: `offer-${Date.now()}`, product: available, discount: Number(form.discount), active: true, expiresAt: form.expiresAt }, ...prev]);
      toast.success('Oferta criada');
    }
    setDialogOpen(false);
  };

  const toggleActive = (id) => { setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))); };
  const handleDelete = (id) => { setOffers((prev) => prev.filter((o) => o.id !== id)); toast.success('Oferta removida'); };

  return (
    <div data-testid="admin-offers-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-navy text-2xl tracking-wider">OFERTAS</h1>
        <button onClick={openNew} className="bg-brand-red hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-xs font-heading tracking-wider transition-colors flex items-center gap-1" data-testid="add-offer-button">
          <Plus className="h-4 w-4" /> NOVA OFERTA
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="offers-grid">
        {offers.map((offer) => (
          <Card key={offer.id} className={`border overflow-hidden ${!offer.active ? 'opacity-60' : ''}`} data-testid={`offer-card-${offer.id}`}>
            <div className="relative">
              <img src={offer.product.imageUrl} alt={offer.product.name} className="w-full h-40 object-cover" />
              <Badge className="absolute top-2 left-2 bg-brand-yellow text-navy font-bold">-{offer.discount}%</Badge>
              {!offer.active && <Badge className="absolute top-2 right-2 bg-gray-800 text-white">Inativa</Badge>}
            </div>
            <CardContent className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-red mb-1">{offer.product.category}</p>
              <h3 className="font-semibold text-sm text-navy line-clamp-1 mb-1" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>{offer.product.name}</h3>
              <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Barlow', sans-serif", textTransform: 'none' }}>Expira: {offer.expiresAt}</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-lg font-black text-brand-red font-heading">R$ {(offer.product.price * (1 - offer.discount / 100)).toFixed(2).replace('.', ',')}</span>
                <span className="text-xs text-gray-400 line-through">R$ {offer.product.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-1">
                <button className="flex-1 flex items-center justify-center gap-1 bg-navy hover:bg-navy-light text-white text-[10px] font-bold py-2 rounded-md font-heading tracking-wider transition-colors" onClick={() => toggleActive(offer.id)} data-testid={`toggle-offer-${offer.id}`}>
                  <Tag className="h-3 w-3" /> {offer.active ? 'DESATIVAR' : 'ATIVAR'}
                </button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(offer)} data-testid={`edit-offer-${offer.id}`}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-brand-red" onClick={() => handleDelete(offer.id)} data-testid={`delete-offer-${offer.id}`}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-testid="offer-dialog">
          <DialogHeader>
            <DialogTitle className="font-heading text-navy tracking-wider">{editOffer ? 'EDITAR OFERTA' : 'NOVA OFERTA'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-navy">Desconto (%)</Label>
              <Input type="number" value={form.discount} onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))} className="mt-1.5" data-testid="offer-form-discount" />
            </div>
            <div>
              <Label className="text-sm font-medium text-navy">Data de Expiração</Label>
              <Input type="date" value={form.expiresAt} onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))} className="mt-1.5" data-testid="offer-form-expires" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <button onClick={handleSave} className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-md text-sm font-heading tracking-wider transition-colors" data-testid="offer-form-save">
              {editOffer ? 'SALVAR' : 'CRIAR'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
