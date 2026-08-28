/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CakeBuilder } from './components/CakeBuilder';
import { PartyKitSection } from './components/PartyKitSection';
import { MenuCatalog } from './components/MenuCatalog';
import { BrandStory } from './components/BrandStory';
import { OrderingRules } from './components/OrderingRules';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CartItem, MenuItem } from './types';
import { STORE_INFO } from './data/menuData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('delicie_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('delicie_cart_v1', JSON.stringify(cartItems));
    } catch {
      // storage quota or private mode
    }
  }, [cartItems]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if exact same item exists (except unique custom cakes)
      if (!newItem.isCustomCake) {
        const existingIndex = prevItems.findIndex(
          (i) => i.title === newItem.title && i.subtitle === newItem.subtitle && !i.isCustomCake
        );

        if (existingIndex > -1) {
          const updated = [...prevItems];
          const existing = updated[existingIndex];
          const updatedQty = existing.quantity + newItem.quantity;
          updated[existingIndex] = {
            ...existing,
            quantity: updatedQty,
            totalPrice: existing.unitPrice * updatedQty,
          };
          return updated;
        }
      }
      return [...prevItems, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCakeBuilder = () => {
    const el = document.getElementById('monte-seu-bolo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6FB] text-[#38243E]">
      {/* Top Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCakeBuilder={scrollToCakeBuilder}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with Scallop Badge & Whisk */}
        <Hero
          onOpenCakeBuilder={scrollToCakeBuilder}
          onExploreMenu={scrollToCatalog}
        />

        {/* Interactive Monte seu Bolo Builder */}
        <CakeBuilder onAddToCart={handleAddToCart} />

        {/* Kits Festa Section (Pequeno, Médio, Grande) */}
        <PartyKitSection onAddToCart={handleAddToCart} />

        {/* Complete Filterable Menu Catalog */}
        <MenuCatalog
          onAddToCart={handleAddToCart}
          onSelectItem={(item) => setSelectedMenuItem(item)}
        />

        {/* Brand Story with Professional Photo and Quote */}
        <BrandStory />

        {/* Official Ordering Rules and Payment Policies */}
        <OrderingRules />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Actions for Quick Mobile Bag & WhatsApp Access */}
      <FloatingActions
        cartCount={totalCartCount}
        totalCartValue={totalCartValue}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCakeBuilder={scrollToCakeBuilder}
      />

      {/* Shopping Cart Drawer & WhatsApp Order Form */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
