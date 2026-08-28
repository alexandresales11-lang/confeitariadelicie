import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, DEFAULT_CAKE_FALLBACK } from '../data/menuData';
import { MenuItem, CartItem } from '../types';
import { Search, Plus, Check, Sparkles, Filter, Info, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MenuCatalogProps {
  onAddToCart: (item: CartItem) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({ onAddToCart, onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Itens' },
    { id: 'bolos-cafe', label: 'Bolos pra Café' },
    { id: 'bolos-especiais', label: 'Bolos Vulcão & Kit Kat' },
    { id: 'docinhos', label: 'Docinhos no Cento' },
    { id: 'docinhos-copo', label: 'Docinhos no Copo & Trufas' },
    { id: 'sobremesas-salgados', label: 'Pudim & Empadas' },
    { id: 'cestas', label: 'Cestas de Presente' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOptionChange = (itemId: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: optionIndex }));
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();

    let finalPrice = item.price;
    let optionLabel = '';

    if (item.options && item.options.length > 0) {
      const chosenIdx = selectedOptions[item.id] ?? 0;
      finalPrice = item.options[chosenIdx].price;
      optionLabel = ` (${item.options[chosenIdx].label})`;
    }

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      title: `${item.name}${optionLabel}`,
      subtitle: item.description,
      unitPrice: finalPrice,
      quantity: 1,
      totalPrice: finalPrice,
      notes: item.pricePerHundred ? 'Preço referente a 1 cento (100 un)' : undefined,
    };

    onAddToCart(cartItem);

    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);

    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#B876CE', '#E87A90'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0FC] text-[#6D2E7B] border border-[#EBD6F5] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B876CE]" />
            <span>Cardápio Completo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#4A1E4B]">
            Delícias Feitas com Amor
          </h2>
          <p className="text-base text-[#6B4775]">
            Explore nossos bolos caseiros, docinhos finos, trufas especiais, pudins cremosos e cestas de presente.
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="space-y-4 mb-10">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C6097] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar doce, bolo, sabor..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#D8B4E2] bg-[#FAF6FB] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C6097] hover:text-[#4A1E4B]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#6D2E7B] text-white shadow-xs'
                      : 'bg-[#FAF0FC] text-[#5A3864] border border-[#EBD6F5] hover:bg-[#F3DFF8]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6FB] rounded-3xl border border-[#EBD6F5] p-8">
            <p className="text-sm font-bold text-[#4A1E4B]">Nenhum item encontrado com esses filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#B876CE] hover:underline"
            >
              Ver todos os itens do cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const chosenOptionIndex = selectedOptions[item.id] ?? 0;
              const currentPrice =
                item.options && item.options.length > 0
                  ? item.options[chosenOptionIndex].price
                  : item.price;
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group rounded-3xl bg-white border border-[#EBD6F5] p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-[#D8B4E2] hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    {/* Image / Header placeholder with badge */}
                    <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#FAF0FC]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_CAKE_FALLBACK;
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B876CE]">
                          <Sparkles className="w-8 h-8 opacity-40" />
                        </div>
                      )}

                      {/* Tag Badge */}
                      {item.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#6D2E7B] text-[10px] font-extrabold shadow-2xs">
                          {item.badge}
                        </span>
                      )}

                      {item.pricePerHundred && (
                        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#6D2E7B]/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-2xs">
                          Cento (100 un)
                        </span>
                      )}
                    </div>

                    {/* Title & Desc */}
                    <div>
                      <h3 className="font-serif font-black text-lg text-[#4A1E4B] group-hover:text-[#B876CE] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-[#6B4775] line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Size Selector for items like Vulcão, Kit Kat, Acetato, Pudim */}
                    {item.options && item.options.length > 0 && (
                      <div
                        className="pt-1 flex gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.options.map((opt, idx) => {
                          const isOptionActive = chosenOptionIndex === idx;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => handleOptionChange(item.id, idx)}
                              className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-extrabold transition-all ${
                                isOptionActive
                                  ? 'bg-[#B876CE] text-white shadow-2xs'
                                  : 'bg-[#FAF0FC] text-[#6D2E7B] hover:bg-[#EBD6F5]'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 mt-3 border-t border-[#F0DCF5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-[#8C6097] block">
                        {item.unitLabel}
                      </span>
                      <span className="font-serif font-black text-lg sm:text-xl text-[#4A1E4B]">
                        R$ {currentPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(item, e)}
                      aria-label={`Adicionar ${item.name}`}
                      className={`p-2.5 rounded-2xl transition-all active:scale-95 shadow-xs ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#FAF0FC] hover:bg-[#6D2E7B] text-[#6D2E7B] hover:text-white border border-[#E4C4EE]'
                      }`}
                    >
                      {isJustAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footnote on Minimums & Conditions */}
        <div className="mt-12 p-4 rounded-2xl bg-[#FAF0FC] border border-[#EBD6F5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B4775]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Info className="w-4 h-4 text-[#B876CE] shrink-0" />
            <span>
              <strong>Docinhos tradicionais:</strong> Encomendas a partir de <strong>30 unidades</strong> (valores da tabela referentes ao cento).
            </span>
          </div>
          <div className="font-bold text-[#6D2E7B] whitespace-nowrap">
            WhatsApp para dúvidas: (74) 99946-0882
          </div>
        </div>
      </div>
    </section>
  );
};
