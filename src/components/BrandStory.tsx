import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { WhiskIcon } from './Logo';
import { Heart, Instagram, MessageCircle, Sparkles, ShieldCheck, Star } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-gradient-to-b from-white via-[#FAF0FC] to-[#FAF6FB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo of the Confectioner with Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Outer decorative ring & badge */}
              <div className="w-72 h-72 sm:w-84 sm:h-84 rounded-full p-2.5 bg-gradient-to-tr from-[#B876CE] via-[#E87A90] to-[#EBD6F5] shadow-xl relative">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-[#FAF0FC]">
                  <img
                    src={STORE_INFO.founderPhoto}
                    alt="Confeiteira Confeitaria Deliciê"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating whisk badge */}
              <div className="absolute -bottom-4 right-4 bg-white p-3 rounded-2xl shadow-lg border border-[#EBD6F5] flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FAF0FC] flex items-center justify-center">
                  <WhiskIcon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-extrabold text-[#4A1E4B]">Feito à Mão</p>
                  <p className="text-[10px] text-[#8C6097]">com amor e carinho</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Quote & Commitment */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#6D2E7B] border border-[#EBD6F5] text-xs font-bold shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-[#E87A90] fill-current" />
              <span>Conheça Nossa História & Dedicação</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#4A1E4B] leading-tight">
              Adoçando momentos e celebrando sonhos.
            </h2>

            {/* Official Quote from the Menu image */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#EBD6F5] shadow-sm">
              <span className="absolute top-3 left-4 text-4xl font-serif text-[#E87A90]/30 select-none">“</span>
              <p className="font-serif italic text-lg sm:text-xl text-[#5A2C60] leading-relaxed relative z-10">
                {STORE_INFO.founderQuote}
              </p>
              <div className="mt-4 pt-3 border-t border-[#F0DCF5] flex items-center justify-between">
                <span className="font-script text-xl text-[#B876CE] font-bold">
                  Confeitaria Deliciê
                </span>
                <span className="text-xs text-[#8C6097] font-semibold">
                  (74) 99946-0882
                </span>
              </div>
            </div>

            {/* Guarantees Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-[#EBD6F5] text-left">
                <div className="text-[#B876CE] font-bold text-sm mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-[#FFD166]" />
                  <span>Sabor Inigualável</span>
                </div>
                <p className="text-xs text-[#7E5788]">
                  Receitas com ingredientes premium, recheios fartos e equilíbrio perfeito de doçura.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-[#EBD6F5] text-left">
                <div className="text-[#B876CE] font-bold text-sm mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#B876CE]" />
                  <span>Higiene & Cuidado</span>
                </div>
                <p className="text-xs text-[#7E5788]">
                  Produção artesanal rigorosa em ambiente higienizado e embalagens seguras.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-[#EBD6F5] text-left">
                <div className="text-[#B876CE] font-bold text-sm mb-1 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#E87A90]" />
                  <span>Personalização</span>
                </div>
                <p className="text-xs text-[#7E5788]">
                  Bolos temáticos criados exclusivamente para combinar com a estética da sua festa.
                </p>
              </div>
            </div>

            {/* Social Connection */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF0FC] text-[#6D2E7B] border border-[#D8B4E2] text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
              >
                <Instagram className="w-4 h-4 text-[#E87A90]" />
                <span>Seguir no Instagram @{STORE_INFO.instagram}</span>
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
