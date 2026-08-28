import React, { useState } from 'react';
import { Logo } from './Logo';
import { STORE_INFO } from '../data/menuData';
import { ShoppingBag, MessageCircle, Instagram, Menu, X, Sparkles, Clock } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCakeBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenCakeBuilder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Monte seu Bolo', href: '#monte-seu-bolo' },
    { label: 'Kits Festa', href: '#kits-festa' },
    { label: 'Sobre a Deliciê', href: '#sobre' },
    { label: 'Instruções', href: '#instrucoes' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-[#EBD6F5] shadow-xs">
      {/* Top micro bar with critical store policies */}
      <div className="bg-gradient-to-r from-[#B876CE] via-[#C987DE] to-[#E87A90] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>
              <strong>Atenção:</strong> Encomendas com no mínimo <strong>5 dias úteis</strong> de antecedência!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
            <span>✨ 50% de entrada no ato da encomenda</span>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              @{STORE_INFO.instagram}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group transition-transform hover:scale-[1.02]">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#5A3864] hover:text-[#B876CE] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B876CE] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Custom cake button */}
            <button
              onClick={onOpenCakeBuilder}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#6D2E7B] bg-[#F3DFF8] hover:bg-[#EBD6F5] border border-[#D8B4E2] transition-all hover:shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B876CE]" />
              Personalizar Bolo
            </button>

            {/* Direct WhatsApp button */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-xs hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir sacola de pedidos"
              className="relative p-2.5 rounded-full bg-[#FAF0FC] hover:bg-[#F3DFF8] text-[#6D2E7B] border border-[#E4C4EE] transition-all active:scale-95 shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#E87A90] text-white text-[11px] font-extrabold shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#6D2E7B] rounded-lg hover:bg-[#F4E6F8]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-[#EBD6F5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#5A3864] hover:bg-[#FAF0FC] hover:text-[#B876CE]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0DCF5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCakeBuilder();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-[#6D2E7B] bg-[#F3DFF8] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#B876CE]" />
              Monte seu Bolo Personalizado
            </button>

            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[#25D366] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp ({STORE_INFO.phoneDisplay})
            </a>

            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-sm font-bold text-[#7A2E78] bg-[#FCE7F0] flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#E87A90]" />
              Instagram @{STORE_INFO.instagram}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
