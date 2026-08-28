import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';

interface FloatingActionsProps {
  cartCount: number;
  totalCartValue: number;
  onOpenCart: () => void;
  onOpenCakeBuilder: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartCount,
  totalCartValue,
  onOpenCart,
  onOpenCakeBuilder,
}) => {
  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Cart Notification Pill (if items in cart) */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#6D2E7B] text-white shadow-xl hover:bg-[#582164] transition-all hover:scale-105 active:scale-95 border-2 border-white/80"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E87A90] text-white text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <div className="text-left text-xs">
            <p className="font-black leading-none">Ver Sacola</p>
            <p className="text-[10px] text-[#EBD6F5] mt-0.5">
              R$ {totalCartValue.toFixed(2)}
            </p>
          </div>
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={STORE_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
