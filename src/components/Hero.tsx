import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { WhiskIcon, ScallopBadgeLogo } from './Logo';
import { Sparkles, Heart, ChevronRight, Cake, Award, Gift } from 'lucide-react';

interface HeroProps {
  onOpenCakeBuilder: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCakeBuilder, onExploreMenu }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20 bg-gradient-to-b from-[#FAF0FC] via-[#FBF5FD] to-[#FAF6FB]">
      {/* Background Decorative Circles & Pastel Bokeh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-8 w-72 h-72 rounded-full bg-[#EAD6EE]/50 blur-3xl" />
        <div className="absolute top-32 right-12 w-80 h-80 rounded-full bg-[#FCE7F0]/60 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#F3DFF8]/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand, Pitch & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E4C4EE] shadow-xs text-xs font-bold text-[#6D2E7B]">
              <span className="flex h-2 w-2 rounded-full bg-[#E87A90] animate-ping" />
              <span>Confeitaria Artesanal de Alto Padrão</span>
              <span className="text-[#C485DA]">•</span>
              <span className="text-[#9647A6]">Encomendas Abertas</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#4A1E4B] tracking-tight leading-[1.15]">
                Tornando sua <br className="hidden sm:inline" />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B876CE] via-[#C979D2] to-[#E87A90]">
                  comemoração
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#E87A90]/40"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>{' '}
                mais doce.
              </h1>
            </div>

            {/* Subtext with the Brand Philosophy */}
            <p className="text-base sm:text-lg text-[#6B4775] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Bolos personalizados com até 2 recheios à sua escolha, docinhos tradicionais no cento,
              bolos caseiros para o café e kits festa completos feitos com todo amor e dedicação.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 border border-[#EBD6F5] shadow-xs">
                <div className="p-2 rounded-xl bg-[#FAF0FC] text-[#B876CE]">
                  <Cake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#4A1E4B]">10cm a 35cm</p>
                  <p className="text-[11px] text-[#7E5788]">Até 80 fatias</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 border border-[#EBD6F5] shadow-xs">
                <div className="p-2 rounded-xl bg-[#FCE7F0] text-[#E87A90]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#4A1E4B]">21 Recheios</p>
                  <p className="text-[11px] text-[#7E5788]">Combine até 2</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 border border-[#EBD6F5] shadow-xs">
                <div className="p-2 rounded-xl bg-[#FAF0FC] text-[#6D2E7B]">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#4A1E4B]">Kits Festa</p>
                  <p className="text-[11px] text-[#7E5788]">A partir de R$ 185</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onOpenCakeBuilder}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#B876CE] via-[#AF63D1] to-[#E87A90] hover:opacity-95 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Monte seu Bolo Personalizado</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-base font-bold text-[#6D2E7B] bg-white hover:bg-[#FAF0FC] border-2 border-[#D8B4E2] transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Ver Cardápio Completo</span>
                <ChevronRight className="w-4 h-4 text-[#B876CE]" />
              </button>
            </div>

            {/* Quick Policies micro notice */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-[#8C6097]">
              <span className="flex items-center gap-1">
                <span className="text-[#E87A90]">✔</span> 50% de entrada no ato
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#E87A90]">✔</span> Encomendas com 5 dias úteis
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#E87A90]">✔</span> Pix, Cartão e Dinheiro
              </span>
            </div>
          </div>

          {/* Right Column: Visual Composition with Scallop Badge & Confectionery Highlights */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Visual Display Container */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Central Scallop Badge / Logo Highlight */}
              <div className="relative mx-auto rounded-3xl bg-white p-6 shadow-xl border border-[#EBD6F5] text-center overflow-hidden">
                {/* Background soft wavy graphic */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAF0FC] to-transparent -z-0" />

                {/* Whisk Header Logo */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="w-14 h-14 rounded-full bg-[#FAF0FC] flex items-center justify-center border border-[#D8B4E2] shadow-xs mb-1">
                    <WhiskIcon className="w-9 h-9" />
                  </div>
                  <span className="font-script text-[#B876CE] text-xl font-bold">Confeitaria</span>
                  <span className="font-serif font-black text-2xl tracking-widest text-[#6D2E7B] uppercase -mt-1">
                    DELICIÊ
                  </span>
                </div>

                {/* Scalloped Stamp Badge */}
                <div className="my-5 flex justify-center">
                  <ScallopBadgeLogo showPhone={true} />
                </div>

                {/* Emotional Card Footer */}
                <div className="pt-3 border-t border-[#F0DCF5]">
                  <p className="font-script text-[#B876CE] text-lg leading-tight">
                    "Feito com carinho para adoçar sua vida"
                  </p>
                  <p className="text-xs text-[#8C6097] mt-1 font-semibold">
                    Atendimento via WhatsApp: {STORE_INFO.phoneDisplay}
                  </p>
                </div>
              </div>

              {/* Floating Mini Highlights */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-lg border border-[#EBD6F5] flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0FC] flex items-center justify-center text-[#B876CE]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4A1E4B]">100% Artesanal</p>
                  <p className="text-[11px] text-[#8C6097]">Ingredientes selecionados</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white p-3 rounded-2xl shadow-lg border border-[#EBD6F5] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FCE7F0] flex items-center justify-center text-[#E87A90]">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-[#4A1E4B]">Sabor Inesquecível</p>
                  <p className="text-[10px] text-[#8C6097]">Amor em cada detalhe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
