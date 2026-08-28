import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { X, Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');
  const [added, setAdded] = useState(false);

  const basePrice =
    item.options && item.options.length > 0
      ? item.options[selectedOptionIndex].price
      : item.price;

  const totalPrice = basePrice * quantity;

  const handleAdd = () => {
    const optionText =
      item.options && item.options.length > 0
        ? ` (${item.options[selectedOptionIndex].label})`
        : '';

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      title: `${item.name}${optionText}`,
      subtitle: item.description,
      unitPrice: basePrice,
      quantity: quantity,
      totalPrice: totalPrice,
      notes: itemNotes.trim() || undefined,
    };

    onAddToCart(cartItem);

    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#B876CE', '#E87A90'],
      });
    } catch {
      // ignore
    }

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-[#EBD6F5] overflow-hidden z-10 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A1E4B] shadow-xs"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image preview */}
        <div className="relative aspect-16/9 w-full bg-[#FAF0FC]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#B876CE]">
              <Sparkles className="w-12 h-12 opacity-30" />
            </div>
          )}
          {item.badge && (
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[#6D2E7B] text-xs font-black shadow-xs">
              {item.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#B876CE] uppercase tracking-wider">
              {item.unitLabel}
            </span>
            <h3 className="font-serif font-black text-2xl text-[#4A1E4B] mt-0.5">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs sm:text-sm text-[#6B4775] leading-relaxed mt-1">
                {item.description}
              </p>
            )}
          </div>

          {/* Options (P, M, G, etc.) */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#4A1E4B]">
                Escolha o Tamanho / Variação:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.options.map((opt, idx) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedOptionIndex(idx)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold border transition-all text-center ${
                      selectedOptionIndex === idx
                        ? 'bg-[#B876CE] text-white border-[#B876CE] shadow-2xs'
                        : 'bg-[#FAF0FC] text-[#6D2E7B] border-[#EBD6F5] hover:bg-[#F3DFF8]'
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className="text-[10px] opacity-90">R$ {opt.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Notes */}
          <div>
            <label className="block text-xs font-bold text-[#4A1E4B] mb-1">
              Observações ou Detalhes de Sabor:
            </label>
            <input
              type="text"
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              placeholder="Ex: preferência de confeitos, laço especial..."
              className="w-full px-3 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
            />
          </div>

          {/* Quantity and Price Bar */}
          <div className="pt-3 border-t border-[#F0DCF5] flex items-center justify-between">
            <div className="flex items-center gap-2 bg-[#FAF0FC] px-3 py-1.5 rounded-2xl border border-[#D8B4E2]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-[#6D2E7B] hover:text-[#B876CE] p-1"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-black text-[#4A1E4B] min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[#6D2E7B] hover:text-[#B876CE] p-1"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#8C6097] block">Valor Total</span>
              <span className="font-serif font-black text-2xl text-[#4A1E4B]">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-3.5 rounded-full font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 ${
              added
                ? 'bg-emerald-600'
                : 'bg-gradient-to-r from-[#B876CE] via-[#AF63D1] to-[#E87A90] hover:opacity-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                <span>Adicionado com sucesso!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Adicionar ao Pedido (R$ {totalPrice.toFixed(2)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
