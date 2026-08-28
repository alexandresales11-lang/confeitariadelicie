import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { STORE_INFO } from '../data/menuData';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [generalNotes, setGeneralNotes] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deposit50 = total / 2;

  // Calculate 5 days ahead date helper
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 5);
  const minDateString = minDate.toISOString().split('T')[0];

  const isUnder5Days = eventDate && new Date(eventDate) < minDate;

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    if (!customerName.trim()) {
      alert('Por favor, informe seu nome para identificarmos sua encomenda.');
      return;
    }

    if (!eventDate) {
      alert('Por favor, selecione a data desejada para a encomenda.');
      return;
    }

    const itemsSummary = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}*\n   Qtd: ${item.quantity}x | R$ ${item.totalPrice.toFixed(
            2
          )}${item.subtitle ? `\n   Detalhes: _${item.subtitle}_` : ''}`
      )
      .join('\n\n');

    const formattedDate = eventDate.split('-').reverse().join('/');

    const message = `🌸 *NOVA ENCOMENDA - CONFEITARIA DELICIÊ* 🌸

👤 *Cliente*: ${customerName.trim()}
📱 *Contato*: ${customerPhone.trim() || 'Não informado'}
📅 *Data da Festa/Entrega*: ${formattedDate}${eventTime ? ` às ${eventTime}` : ''}
🚚 *Tipo*: ${deliveryType === 'retirada' ? 'Retirada no Local' : `Entrega no Endereço: ${address.trim() || 'A combinar'}`}
💳 *Forma de Pagamento*: ${paymentMethod}

━━━━━━━━━━━━━━━━━━━━
🎂 *ITENS DO PEDIDO:*
${itemsSummary}
━━━━━━━━━━━━━━━━━━━━

💰 *Valor Total*: R$ ${total.toFixed(2)}
💵 *Entrada 50% (no ato do pedido)*: R$ ${deposit50.toFixed(2)}
🤝 *Restante 50% (na entrega)*: R$ ${deposit50.toFixed(2)}

${generalNotes.trim() ? `📝 *Observações*: ${generalNotes.trim()}\n` : ''}
Aguardo a confirmação da disponibilidade para efetuar o pagamento da entrada de 50%! ✨`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_INFO.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#B876CE] to-[#E87A90] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-serif font-black text-lg sm:text-xl">Sacola de Encomendas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar sacola"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF0FC] text-[#B876CE] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#4A1E4B]">
                  Sua sacola está vazia
                </h3>
                <p className="text-xs text-[#8C6097] max-w-xs mx-auto">
                  Personalize um bolo ou escolha itens do nosso cardápio para montar seu pedido.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#6D2E7B] text-white text-xs font-bold hover:bg-[#582164]"
                >
                  Explorar Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4A1E4B] uppercase tracking-wide">
                      Itens selecionados ({cartItems.length})
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#E87A90] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" /> Limpar tudo
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-[#FAF6FB] border border-[#EBD6F5] space-y-2 relative"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#4A1E4B] line-clamp-2">
                              {item.title}
                            </h4>
                            {item.subtitle && (
                              <p className="text-[11px] text-[#7E5788] line-clamp-2 mt-0.5">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                          <span className="font-serif font-black text-sm text-[#6D2E7B] whitespace-nowrap">
                            R$ {item.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#F0DCF5]">
                          <span className="text-[11px] text-[#8C6097]">
                            R$ {item.unitPrice.toFixed(2)} cada
                          </span>
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-[#D8B4E2]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-[#6D2E7B] hover:text-[#B876CE] p-0.5"
                              aria-label="Diminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black text-[#4A1E4B] min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-[#6D2E7B] hover:text-[#B876CE] p-0.5"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form fields for checkout */}
                <div className="space-y-4 pt-2 border-t border-[#EBD6F5]">
                  <h3 className="text-xs font-black text-[#4A1E4B] uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B876CE]" />
                    <span>Dados para a Encomenda</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: Maria Eduarda"
                        className="w-full px-3 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                        WhatsApp para Contato
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ex: (74) 99999-9999"
                        className="w-full px-3 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                          Data do Evento *
                        </label>
                        <input
                          type="date"
                          value={eventDate}
                          min={minDateString}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                          Horário Estimado
                        </label>
                        <input
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                        />
                      </div>
                    </div>

                    {isUnder5Days && (
                      <div className="p-2 rounded-xl bg-[#FCE7F0] border border-[#F6C8D8] text-[11px] text-[#A6264A] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Atenção: O prazo padrão é de 5 dias úteis. Sujeito à verificação de agenda.</span>
                      </div>
                    )}

                    {/* Delivery Method */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                        Forma de Recebimento
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('retirada')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            deliveryType === 'retirada'
                              ? 'bg-[#B876CE] text-white border-[#B876CE]'
                              : 'bg-white text-[#5A3864] border-[#EBD6F5]'
                          }`}
                        >
                          Retirada no Local
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('entrega')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            deliveryType === 'entrega'
                              ? 'bg-[#B876CE] text-white border-[#B876CE]'
                              : 'bg-white text-[#5A3864] border-[#EBD6F5]'
                          }`}
                        >
                          Entrega (Delivery)
                        </button>
                      </div>
                    </div>

                    {deliveryType === 'entrega' && (
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                          Endereço Completo & Bairro
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Rua, número, bairro e ponto de referência"
                          className="w-full px-3 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                        />
                      </div>
                    )}

                    {/* Payment Method */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                        Forma de Pagamento (Entrada 50%)
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['Pix', 'Cartão', 'Dinheiro'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                              paymentMethod === method
                                ? 'bg-[#6D2E7B] text-white border-[#6D2E7B]'
                                : 'bg-white text-[#5A3864] border-[#EBD6F5]'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4A1E4B] mb-1">
                        Observações Especiais (Opcional)
                      </label>
                      <textarea
                        value={generalNotes}
                        onChange={(e) => setGeneralNotes(e.target.value)}
                        placeholder="Ex: alergias, mensagens no cartão de presente, etc."
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border border-[#D8B4E2] bg-[#FAF6FB] text-xs focus:ring-2 focus:ring-[#B876CE] text-[#4A1E4B]"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Calculation and WhatsApp Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FAF0FC] border-t border-[#EBD6F5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#5A3864]">
                <div className="flex justify-between">
                  <span>Total dos Itens:</span>
                  <span className="font-bold text-sm text-[#4A1E4B]">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#E87A90] font-bold">
                  <span>50% Entrada (no pedido):</span>
                  <span>R$ {deposit50.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8C6097]">
                  <span>50% Restante (na entrega):</span>
                  <span>R$ {deposit50.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Pedido para o WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#8C6097]">
                Seu pedido será enviado formatado diretamente para a confeiteira.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
