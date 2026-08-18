import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import type { BagId, CategoryId } from '../../data/types';
import { CATEGORIES } from '../../data/categories';
import { Button } from '../ui/Button';

interface AddCustomItemProps {
  open: boolean;
  onClose: () => void;
  bags: { id: BagId; name: string; emoji: string }[];
  onAdd: (data: {
    name: string;
    category: CategoryId;
    quantity?: string;
    assignedBag: BagId;
  }) => void;
  defaultBag?: BagId;
}

export function AddCustomItem({ open, onClose, bags, onAdd, defaultBag = 'mum' }: AddCustomItemProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<CategoryId>('postpartum');
  const [assignedBag, setAssignedBag] = useState<BagId>(defaultBag);

  useEffect(() => {
    if (open) {
      setAssignedBag(defaultBag);
    }
  }, [open, defaultBag]);

  const resetForm = () => {
    setName('');
    setQuantity('');
    setCategory('postpartum');
    setAssignedBag(defaultBag);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      category,
      quantity: quantity.trim() || undefined,
      assignedBag,
    });

    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="checklist-overlay-backdrop bg-ink/40 no-print"
        aria-label="Close add item"
        onClick={handleClose}
      />
      <form
        onSubmit={handleSubmit}
        className="checklist-bottom-sheet bg-canvas-pure rounded-t-2xl p-6 space-y-4 shadow-clay-lg max-h-[85vh] overflow-y-auto no-print"
      >
        <h3 className="font-semibold text-lg text-ink">Add your item</h3>

        <div>
          <label htmlFor="custom-name" className="block text-sm text-muted mb-1">
            Item name *
          </label>
          <input
            id="custom-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My prescription meds"
            className="field-input"
            required
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="custom-quantity" className="block text-sm text-muted mb-1">
            Quantity (optional)
          </label>
          <input
            id="custom-quantity"
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 1 case"
            className="field-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="custom-category" className="block text-sm text-muted mb-1">
              Category
            </label>
            <select
              id="custom-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="field-input"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name.split('&')[0].trim()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="custom-bag" className="block text-sm text-muted mb-1">
              Packed in
            </label>
            <select
              id="custom-bag"
              value={assignedBag}
              onChange={(e) => setAssignedBag(e.target.value as BagId)}
              className="field-input"
            >
              {bags.map((bag) => (
                <option key={bag.id} value={bag.id}>
                  {bag.emoji} {bag.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button type="submit" className="flex-1">
            Add item
          </Button>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
