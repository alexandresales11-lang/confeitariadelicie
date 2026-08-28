import React, { useState } from 'react';
import { CAKE_SIZES, CAKE_FILLINGS, STORE_INFO } from '../data/menuData';
import { CakeSizeOption, CustomCakeConfig, CartItem } from '../types';
import { Cake, Sparkles, Check, Info, ShoppingBag, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CakeBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

export const CakeBuilder: React.FC<CakeBuilderProps> = ({ onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(CAKE_SIZES[2]); // 15cm default
  const [selectedBatter, setSelectedBatter] = useState<'Tradicional' | 'Chocolatudo (+ acréscimo)'>('Tradicional');
  const [selectedFillings, setSelectedFillings] = useState<string[]>(['4 Leites', 'Geleia de Morango']);
  const [themeNotes, setThemeNotes] = useState<string>('');
  const [candleNumber, setCandleNumber] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'tamanho' | 'massa' | 'recheios' | 'personalizacao'>('tamanho');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isChocolatudo = selectedBatter.includes('Chocolatudo');
  // Base price + optional small add-on estimate for chocolatudo if chosen
  const basePrice = selectedSize.price;
  const chocolatudoSurcharge = isChocolatudo ? 15 : 0;
  const totalPrice = basePrice + chocolatudoSurcharge;

  const toggleFilling = (fillingName: string) => {
    if (selectedFillings.includes(fillingName)) {
      setSelectedFillings(selectedFillings.filter((f) => f !== fillingName));
    } else {
      if (selectedFillings.length >= 2) {
        // Replace second or alert max 2
        setSelectedFillings([selectedFillings[0], fillingName]);
      } else {
        setSelectedFillings([...selectedFillings, fillingName]);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedFillings.length === 0) {
      alert('Por favor, escolha ao menos 1 recheio para o seu bolo.');
      return;
    }

    const config: CustomCakeConfig = {
      size: selectedSize,
      batter: selectedBatter,
      fillings: selectedFillings,
      hasBrigadeiroSpecialFilling: selectedFillings.some((f) => f.toLowerCase().includes('brigadeiro')),
      themeNotes: themeNotes.trim(),
      candleNumber: candleNumber.trim(),
      calculatedPrice: totalPrice,
    };

    const cartItem: CartItem = {
      id: `custom-cake-${Date.now()}`,
      title: `Bolo Personalizado ${selectedSize.sizeCm}cm (${selectedSize.slicesLabel})`,
      subtitle: `Massa ${selectedBatter} • Recheios: ${selectedFillings.join(' + ')}${
        themeNotes ? ` • Tema: ${themeNotes}` : ''
      }`,
      unitPrice: totalPrice,
      quantity: 1,
      totalPrice: totalPrice,
      isCustomCake: true,
      customCakeDetails: config,
      notes: themeNotes,
    };

    onAddToCart(cartItem);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B876CE', '#E87A90', '#FDE8EE', '#F3DFF8', '#FFD166'],
      });
    } catch {
      // ignore if blocked
    }

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleDirectWhatsApp = () => {
    if (selectedFillings.length === 0) {
      alert('Por favor, selecione ao menos 1 recheio antes de enviar.');
      return;
    }

    const message = `Olá, Confeitaria Deliciê! Gostaria de encomendar um Bolo Personalizado:
🎂 *Tamanho*: ${selectedSize.sizeCm} cm (rende ${selectedSize.slicesLabel})
🧁 *Massa*: ${selectedBatter}
🍯 *Recheios (até 2)*: ${selectedFillings.join(' e ')}
${themeNotes ? `🎨 *Tema/Decoração*: ${themeNotes}\n` : ''}${
      candleNumber ? `✨ *Nome/Vela/Idade*: ${candleNumber}\n` : ''
    }💰 *Valor estimado*: R$ ${totalPrice.toFixed(2)} (50% de entrada: R$ ${(totalPrice / 2).toFixed(2)})

Gostaria de verificar a disponibilidade para a minha data!`;

    window.open(`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="monte-seu-bolo" className="py-16 md:py-24 bg-white relative">
      {/* Decorative background border wave */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0FC] text-[#6D2E7B] border border-[#EBD6F5] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B876CE]" />
            <span>Exclusivo e Sob Medida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#4A1E4B]">
            Monte seu Bolo Personalizado
          </h2>
          <p className="text-base text-[#6B4775]">
            Escolha o tamanho ideal para sua festa, o tipo de massa fofinha e combine até{' '}
            <strong className="text-[#6D2E7B]">2 recheios artesanais</strong> deliciosos.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step navigation tabs */}
            <div className="flex rounded-2xl bg-[#FAF0FC] p-1.5 border border-[#EBD6F5] gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('tamanho')}
                className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'tamanho'
                    ? 'bg-white text-[#6D2E7B] shadow-xs'
                    : 'text-[#8C6097] hover:text-[#4A1E4B]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#EBD6F5] text-[#6D2E7B] text-xs flex items-center justify-center font-black">
                  1
                </span>
                Tamanho
              </button>

              <button
                onClick={() => setActiveTab('massa')}
                className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'massa'
                    ? 'bg-white text-[#6D2E7B] shadow-xs'
                    : 'text-[#8C6097] hover:text-[#4A1E4B]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#EBD6F5] text-[#6D2E7B] text-xs flex items-center justify-center font-black">
                  2
                </span>
                Massa
              </button>

              <button
                onClick={() => setActiveTab('recheios')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'recheios'
                    ? 'bg-white text-[#6D2E7B] shadow-xs'
                    : 'text-[#8C6097] hover:text-[#4A1E4B]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#EBD6F5] text-[#6D2E7B] text-xs flex items-center justify-center font-black">
                  3
                </span>
                Recheios ({selectedFillings.length}/2)
              </button>

              <button
                onClick={() => setActiveTab('personalizacao')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'personalizacao'
                    ? 'bg-white text-[#6D2E7B] shadow-xs'
                    : 'text-[#8C6097] hover:text-[#4A1E4B]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#EBD6F5] text-[#6D2E7B] text-xs flex items-center justify-center font-black">
                  4
                </span>
                Tema
              </button>
            </div>

            {/* TAB 1: TAMANHO DO BOLO */}
            {activeTab === 'tamanho' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#4A1E4B]">Escolha o Tamanho do Bolo</h3>
                  <span className="text-xs text-[#8C6097]">Preços e rendimento oficial</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CAKE_SIZES.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all relative ${
                          isSelected
                            ? 'border-[#B876CE] bg-[#FAF0FC] shadow-sm'
                            : 'border-[#F0DCF5] bg-white hover:border-[#D8B4E2] hover:bg-[#FCF9FD]'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B876CE] text-white flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}

                        <p className="font-serif font-black text-xl text-[#4A1E4B]">
                          {size.sizeCm} <span className="text-sm font-sans font-bold">cm</span>
                        </p>
                        <p className="text-xs font-bold text-[#B876CE] mt-0.5">
                          Rende {size.slicesLabel}
                        </p>
                        <div className="mt-2 pt-2 border-t border-[#F0DCF5] flex items-center justify-between">
                          <span className="text-sm font-black text-[#6D2E7B]">
                            R$ {size.price.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF0FC] border border-[#EBD6F5] text-xs text-[#6B4775] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#B876CE] shrink-0 mt-0.5" />
                  <span>
                    <strong>Dica de ouro:</strong> O número de fatias é estimado com base em fatias padrão de festa (cerca de 100g). Pode variar de acordo com a espessura de corte.
                  </span>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveTab('massa')}
                    className="px-6 py-2.5 rounded-full bg-[#6D2E7B] text-white text-xs font-bold hover:bg-[#5A2466] transition-all"
                  >
                    Próximo: Escolher Massa →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ESCOLHA DA MASSA */}
            {activeTab === 'massa' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#4A1E4B]">Escolha o Tipo de Massa</h3>
                  <span className="text-xs text-[#8C6097]">Massa caseira e fofinha</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedBatter('Tradicional')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedBatter === 'Tradicional'
                        ? 'border-[#B876CE] bg-[#FAF0FC] shadow-sm'
                        : 'border-[#F0DCF5] bg-white hover:border-[#D8B4E2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-black text-lg text-[#4A1E4B]">Massa Tradicional</span>
                      {selectedBatter === 'Tradicional' && (
                        <Check className="w-5 h-5 text-[#B876CE]" />
                      )}
                    </div>
                    <p className="text-xs text-[#6B4775] mb-2">
                      Massa branca tradicional fofinha e molhadinha, leve aroma de baunilha.
                    </p>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#EBD6F5]/60 text-[#6D2E7B] text-xs font-bold">
                      Incluso no valor base
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedBatter('Chocolatudo (+ acréscimo)')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedBatter.includes('Chocolatudo')
                        ? 'border-[#B876CE] bg-[#FAF0FC] shadow-sm'
                        : 'border-[#F0DCF5] bg-white hover:border-[#D8B4E2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-black text-lg text-[#4A1E4B]">Massa Chocolatuda</span>
                      {selectedBatter.includes('Chocolatudo') && (
                        <Check className="w-5 h-5 text-[#B876CE]" />
                      )}
                    </div>
                    <p className="text-xs text-[#6B4775] mb-2">
                      Massa escura rica em cacau nobre 50%, perfeita para quem ama chocolate intenso.
                    </p>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#FCE7F0] text-[#E87A90] text-xs font-bold">
                      + R$ 15,00 (acréscimo)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('tamanho')}
                    className="px-5 py-2 rounded-full border border-[#D8B4E2] text-[#6D2E7B] text-xs font-bold hover:bg-[#FAF0FC]"
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={() => setActiveTab('recheios')}
                    className="px-6 py-2.5 rounded-full bg-[#6D2E7B] text-white text-xs font-bold hover:bg-[#5A2466]"
                  >
                    Próximo: Escolher Recheios →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: ESCOLHA DE RECHEIOS (ATÉ 2) */}
            {activeTab === 'recheios' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#4A1E4B]">
                      Escolha até 2 Recheios Artesanais
                    </h3>
                    <p className="text-xs text-[#8C6097]">
                      Selecionados: <strong className="text-[#6D2E7B]">{selectedFillings.length} de 2</strong>
                    </p>
                  </div>
                  {selectedFillings.length > 0 && (
                    <button
                      onClick={() => setSelectedFillings([])}
                      className="text-xs text-[#E87A90] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RefreshCw className="w-3 h-3" /> Limpar seleção
                    </button>
                  )}
                </div>

                {/* Selected Fillings Badges */}
                <div className="p-3 rounded-2xl bg-[#FAF0FC] border border-[#EBD6F5] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#6D2E7B]">Recheios do seu bolo:</span>
                  {selectedFillings.length === 0 ? (
                    <span className="text-xs text-[#8C6097] italic">Nenhum selecionado ainda (clique nas opções abaixo)</span>
                  ) : (
                    selectedFillings.map((name, index) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4A1E4B] border border-[#D8B4E2] text-xs font-extrabold shadow-2xs"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#B876CE] text-white text-[10px] flex items-center justify-center">
                          {index + 1}
                        </span>
                        {name}
                        <button
                          onClick={() => toggleFilling(name)}
                          className="text-[#E87A90] hover:text-red-700 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* 21 Recheios Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {CAKE_FILLINGS.map((filling) => {
                    const isSelected = selectedFillings.includes(filling.name);
                    return (
                      <button
                        key={filling.id}
                        type="button"
                        onClick={() => toggleFilling(filling.name)}
                        className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#B876CE] text-white border-[#B876CE] shadow-xs'
                            : 'bg-white text-[#4A1E4B] border-[#F0DCF5] hover:border-[#D8B4E2] hover:bg-[#FAF0FC]'
                        }`}
                      >
                        <span className="truncate pr-1">{filling.name}</span>
                        {isSelected ? (
                          <Check className="w-4 h-4 shrink-0 text-white" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#D8B4E2] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('massa')}
                    className="px-5 py-2 rounded-full border border-[#D8B4E2] text-[#6D2E7B] text-xs font-bold hover:bg-[#FAF0FC]"
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={() => setActiveTab('personalizacao')}
                    className="px-6 py-2.5 rounded-full bg-[#6D2E7B] text-white text-xs font-bold hover:bg-[#5A2466]"
                  >
                    Próximo: Tema & Personalização →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: TEMA E DETALHES */}
            {activeTab === 'personalizacao' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#4A1E4B]">Decoração & Detalhes do Bolo</h3>
                  <span className="text-xs text-[#8C6097]">Opcional</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A1E4B] mb-1">
                      Tema / Estilo de Decoração / Cores Desejadas:
                    </label>
                    <input
                      type="text"
                      value={themeNotes}
                      onChange={(e) => setThemeNotes(e.target.value)}
                      placeholder="Ex: Tema Flores Rosas, Safari Baby, Bento Cake com frase, Dourado com glitter..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A1E4B] mb-1">
                      Nome e Idade para o Topo (se aplicável):
                    </label>
                    <input
                      type="text"
                      value={candleNumber}
                      onChange={(e) => setCandleNumber(e.target.value)}
                      placeholder="Ex: Júlia • 7 anos"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF0FC] border border-[#EBD6F5] text-xs text-[#6B4775]">
                  <p className="font-semibold text-[#6D2E7B] mb-1">📋 Informações importantes para seu pedido:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    <li>Encomendas devem ser feitas no mínimo de 5 dias úteis antes.</li>
                    <li>Trabalhamos com 50% de entrada no ato da encomenda e o restante na entrega.</li>
                  </ul>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('recheios')}
                    className="px-5 py-2 rounded-full border border-[#D8B4E2] text-[#6D2E7B] text-xs font-bold hover:bg-[#FAF0FC]"
                  >
                    ← Voltar aos Recheios
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visual Cake Summary & Order Actions (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl bg-gradient-to-b from-[#FAF0FC] to-[#F7EEF9] border-2 border-[#EBD6F5] p-6 shadow-md space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EBD6F5]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white text-[#B876CE] shadow-2xs">
                    <Cake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#4A1E4B]">Resumo da sua Escolha</h4>
                    <p className="text-[11px] text-[#8C6097]">Bolo Artesanal Deliciê</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-[#6D2E7B] text-xs font-black border border-[#D8B4E2]">
                  {selectedSize.sizeCm} cm
                </span>
              </div>

              {/* Visual Cake Representation */}
              <div className="py-2 flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center">
                  {/* Top cherry/candle illustration */}
                  <div className="text-center -mb-2 z-10 animate-bounce">
                    <span className="text-xl">🌸</span>
                  </div>

                  {/* Cake Top Layer */}
                  <div
                    className="h-8 rounded-t-xl border border-white/80 shadow-xs flex items-center justify-center text-[11px] font-bold text-white transition-all"
                    style={{
                      width: `${Math.min(180, 70 + selectedSize.sizeCm * 3.5)}px`,
                      background:
                        selectedBatter === 'Tradicional'
                          ? 'linear-gradient(135deg, #FDE8EE 0%, #E8A5DF 100%)'
                          : 'linear-gradient(135deg, #5A3528 0%, #3B2117 100%)',
                    }}
                  >
                    <span className="text-[#4A1E4B] text-[10px] font-extrabold drop-shadow-2xs">
                      {selectedBatter === 'Tradicional' ? 'Baunilha' : 'Chocolatudo'}
                    </span>
                  </div>

                  {/* Cake Filling Layer 1 */}
                  <div
                    className="h-4 bg-gradient-to-r from-[#D89EE8] via-[#FCE7F0] to-[#D89EE8] border-y border-white/90 shadow-2xs flex items-center justify-center text-[9px] font-bold text-[#6D2E7B]"
                    style={{
                      width: `${Math.min(180, 70 + selectedSize.sizeCm * 3.5)}px`,
                    }}
                  >
                    {selectedFillings[0] || 'Recheio 1'}
                  </div>

                  {/* Cake Filling Layer 2 (if selected) */}
                  {selectedFillings[1] && (
                    <div
                      className="h-4 bg-gradient-to-r from-[#FDE8EE] via-[#E87A90]/40 to-[#FDE8EE] border-b border-white/90 flex items-center justify-center text-[9px] font-bold text-[#6D2E7B]"
                      style={{
                        width: `${Math.min(180, 70 + selectedSize.sizeCm * 3.5)}px`,
                      }}
                    >
                      {selectedFillings[1]}
                    </div>
                  )}

                  {/* Cake Bottom Layer */}
                  <div
                    className="h-10 rounded-b-xl border border-white/80 shadow-md flex items-center justify-center text-[10px] font-bold text-white transition-all"
                    style={{
                      width: `${Math.min(180, 70 + selectedSize.sizeCm * 3.5)}px`,
                      background:
                        selectedBatter === 'Tradicional'
                          ? 'linear-gradient(135deg, #FDE8EE 0%, #D89EE8 100%)'
                          : 'linear-gradient(135deg, #5A3528 0%, #3B2117 100%)',
                    }}
                  >
                    <span className="text-[#4A1E4B] text-[10px] font-extrabold drop-shadow-2xs">
                      {selectedSize.sizeCm} cm • {selectedSize.slicesLabel}
                    </span>
                  </div>

                  {/* Cake Tray / Base Plate */}
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#E0C3FC] via-[#FFF9F2] to-[#E0C3FC] border border-[#D8B4E2] shadow-xs mt-0.5"
                    style={{
                      width: `${Math.min(220, 95 + selectedSize.sizeCm * 3.5)}px`,
                    }}
                  />
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs text-[#5A3864] bg-white/80 p-3.5 rounded-2xl border border-[#EBD6F5]">
                <div className="flex justify-between">
                  <span className="text-[#8C6097]">Diâmetro:</span>
                  <span className="font-bold">{selectedSize.sizeCm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6097]">Rendimento:</span>
                  <span className="font-bold text-[#6D2E7B]">{selectedSize.slicesLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6097]">Massa:</span>
                  <span className="font-bold">{selectedBatter}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[#8C6097]">Recheios:</span>
                  <span className="font-bold text-right max-w-[180px]">
                    {selectedFillings.length > 0 ? selectedFillings.join(', ') : 'Nenhum'}
                  </span>
                </div>
                {themeNotes && (
                  <div className="flex justify-between items-start pt-1 border-t border-[#F0DCF5]">
                    <span className="text-[#8C6097]">Tema:</span>
                    <span className="font-bold text-right truncate max-w-[180px]">{themeNotes}</span>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown & 50% Deposit notice */}
              <div className="pt-2 space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#4A1E4B]">
                  R$ {totalPrice.toFixed(2)}
                </div>
                <p className="text-xs font-semibold text-[#6D2E7B]">
                  Entrada (50%): <strong className="text-[#E87A90]">R$ {(totalPrice / 2).toFixed(2)}</strong> no pedido
                </p>
                <p className="text-[11px] text-[#8C6097]">
                  Restante de R$ {(totalPrice / 2).toFixed(2)} no ato da entrega
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600'
                      : 'bg-gradient-to-r from-[#B876CE] via-[#AF63D1] to-[#E87A90] hover:opacity-95'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Bolo Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar Bolo à Sacola</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3 rounded-full font-bold text-xs text-[#4A1E4B] bg-white hover:bg-[#FAF0FC] border border-[#D8B4E2] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Pedir Diretamente no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
