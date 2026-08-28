import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { Logo, WhiskIcon } from './Logo';
import { Instagram, MessageCircle, Heart, ArrowUp, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1231] text-white pt-16 pb-12 border-t-4 border-[#B876CE] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#B876CE]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center p-1 border border-white/20">
                <WhiskIcon className="w-7 h-7 text-[#EBD6F5]" />
              </div>
              <div>
                <span className="font-script text-[#EBD6F5] text-sm block">Confeitaria</span>
                <span className="font-serif font-black text-xl tracking-wider text-white">DELICIÊ</span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-serif italic">
              "{STORE_INFO.founderQuote}"
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Deliciê"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E87A90] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Deliciê"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#EBD6F5]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <a href="#monte-seu-bolo" className="hover:text-white hover:underline transition-all">
                  🎂 Monte seu Bolo Personalizado
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white hover:underline transition-all">
                  🧁 Cardápio de Doces & Bolos
                </a>
              </li>
              <li>
                <a href="#kits-festa" className="hover:text-white hover:underline transition-all">
                  🎉 Kits Festa Completos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white hover:underline transition-all">
                  🌸 Conheça a Confeiteira
                </a>
              </li>
              <li>
                <a href="#instrucoes" className="hover:text-white hover:underline transition-all">
                  📋 Instruções & Regras de Pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ordering Rules */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#EBD6F5]">
              Regras do Cardápio
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li className="flex items-start gap-1.5">
                <span className="text-[#E87A90] font-bold">•</span>
                <span>50% de entrada no ato da encomenda e o restante na entrega.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#E87A90] font-bold">•</span>
                <span>Encomendas com no mínimo <strong>5 dias úteis</strong> antes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#E87A90] font-bold">•</span>
                <span>Você pode escolher até 2 recheios nos bolos personalizados.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#E87A90] font-bold">•</span>
                <span>Docinhos tradicionais a partir de 30 unidades.</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact and Payments */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#EBD6F5]">
              Contato & Pagamento
            </h4>
            <div className="space-y-2 text-xs text-white/75">
              <p>
                <strong className="text-white">WhatsApp:</strong>{' '}
                <a href={STORE_INFO.whatsappUrl} className="hover:underline text-[#EBD6F5]">
                  {STORE_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <strong className="text-white">Instagram:</strong>{' '}
                <a href={STORE_INFO.instagramUrl} className="hover:underline text-[#EBD6F5]">
                  @{STORE_INFO.instagram}
                </a>
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-white/90 block mb-1">
                  Formas de Pagamento:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80">
                    Pix
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80">
                    Cartão Débito/Crédito
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80">
                    Dinheiro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <span>Confeitaria Deliciê © {new Date().getFullYear()}</span>
            <span>• Feito com</span>
            <Heart className="w-3.5 h-3.5 text-[#E87A90] fill-current" />
            <span>para tornar sua comemoração inesquecível.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#EBD6F5] hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
