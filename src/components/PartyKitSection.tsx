import React from 'react';
import { PARTY_KITS } from '../data/menuData';
import { CartItem, PartyKit } from '../types';
import { Gift, Check, Clock, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PartyKitSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export const PartyKitSection: React.FC<PartyKitSectionProps> = ({ onAddToCart }) => {
  const handleAddKit = (kit: PartyKit) => {
    const item: CartItem = {
      id: `kit-${kit.id}-${Date.now()}`,
      title: kit.name,
      subtitle: `${kit.salgados} Salgados, ${kit.docinhos} Docinhos, 1 Bolo (${kit.boloFatias} fatias), ${kit.refri} e ${kit.topo}`,
      unitPrice: kit.price,
      quantity: 1,
      totalPrice: kit.price,
      notes: `Kit Festa com antecedência mínima de 5 dias úteis`,
    };

    onAddToCart(item);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#B876CE', '#E87A90', '#FDE8EE'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="kits-festa" className="py-16 md:py-24 bg-gradient-to-b from-[#FAF6FB] via-[#FAF0FC] to-[#FAF6FB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#6D2E7B] border border-[#EBD6F5] text-xs font-bold shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-[#B876CE]" />
            <span>Praticidade & Economia para sua Comemoração</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#4A1E4B]">
            Kits Festa Completos
          </h2>
          <p className="text-base text-[#6B4775]">
            Com o kit festa você pode surpreender alguém de uma forma muito especial! Salgadinhos quentinhos, docinhos tradicionais, bolo decorado, refrigerante e topo temático.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PARTY_KITS.map((kit) => {
            const isPopular = kit.popular;
            return (
              <div
                key={kit.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-[#B876CE] shadow-xl md:-translate-y-2'
                    : 'bg-white/90 border border-[#EBD6F5] shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#B876CE] to-[#E87A90] text-white text-xs font-black shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MAIS PEDIDO</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top info */}
                  <div className="text-center pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B876CE] block">
                      {kit.badge}
                    </span>
                    <h3 className="font-serif font-black text-2xl text-[#4A1E4B] mt-1">
                      {kit.name}
                    </h3>
                    <p className="text-xs text-[#8C6097] mt-1">
                      Recomendado para <strong>{kit.recommendedGuests}</strong>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center py-4 bg-[#FAF0FC] rounded-2xl border border-[#EBD6F5]">
                    <span className="text-xs font-semibold text-[#8C6097]">Investimento</span>
                    <div className="text-3xl sm:text-4xl font-serif font-black text-[#6D2E7B]">
                      R$ {kit.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-semibold text-[#E87A90] mt-0.5">
                      50% no pedido (R$ {(kit.price / 2).toFixed(2)}) + 50% na entrega
                    </div>
                  </div>

                  {/* Content List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-black text-[#4A1E4B] uppercase tracking-wide">
                      O Kit contém:
                    </p>
                    <ul className="space-y-2.5 text-xs text-[#5A3864]">
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FCE7F0] text-[#E87A90] flex items-center justify-center text-[10px] font-bold shrink-0">
                          ♥
                        </span>
                        <span>
                          <strong>{kit.salgados}</strong> Salgados sequinhos e fritos
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FCE7F0] text-[#E87A90] flex items-center justify-center text-[10px] font-bold shrink-0">
                          ♥
                        </span>
                        <span>
                          <strong>{kit.docinhos}</strong> Docinhos tradicionais
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FAF0FC] text-[#B876CE] flex items-center justify-center text-[10px] font-bold shrink-0">
                          🎂
                        </span>
                        <span>
                          <strong>1 Bolo</strong> de <strong>{kit.boloFatias} fatias</strong>
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FAF0FC] text-[#B876CE] flex items-center justify-center text-[10px] font-bold shrink-0">
                          🥤
                        </span>
                        <span>{kit.refri}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FAF0FC] text-[#B876CE] flex items-center justify-center text-[10px] font-bold shrink-0">
                          ✨
                        </span>
                        <span>{kit.topo}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Notice */}
                  <div className="p-2.5 rounded-xl bg-[#FAF6FB] border border-[#EBD6F5] text-[11px] text-[#8C6097] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B876CE] shrink-0" />
                    <span>{kit.prazo}</span>
                  </div>
                </div>

                {/* Add to order CTA */}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleAddKit(kit)}
                    className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#6D2E7B] hover:bg-[#582164] text-white shadow-md'
                        : 'bg-[#FAF0FC] hover:bg-[#F3DFF8] text-[#6D2E7B] border border-[#D8B4E2]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar {kit.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
