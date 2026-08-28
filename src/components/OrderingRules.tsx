import React from 'react';
import { STORE_INFO, ORDERING_INSTRUCTIONS } from '../data/menuData';
import { WhiskIcon } from './Logo';
import { CreditCard, Calendar, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const OrderingRules: React.FC = () => {
  return (
    <section id="instrucoes" className="py-16 md:py-24 bg-white relative border-t border-[#EBD6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Whisk and title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="flex justify-center mb-1">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF0FC] flex items-center justify-center border border-[#D8B4E2]">
              <WhiskIcon className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#4A1E4B]">
            Informações Importantes & Como Encomendar
          </h2>
          <p className="text-base text-[#6B4775]">
            Para garantir a máxima qualidade e pontualidade na sua comemoração, conheça nossas políticas de atendimento.
          </p>
        </div>

        {/* 2 Primary Essential Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: 50% Entrada e Pagamento */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#FAF0FC] to-[#F7EEF9] border-2 border-[#EBD6F5] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white text-[#B876CE] shadow-2xs">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-[#4A1E4B]">
                  Entrada & Formas de Pagamento
                </h3>
                <p className="text-xs text-[#8C6097]">Condições oficiais do cardápio</p>
              </div>
            </div>

            <p className="text-sm text-[#5A3864] leading-relaxed">
              Trabalhamos com <strong className="text-[#6D2E7B]">50% de entrada no ato da encomenda</strong> e o restante na entrega do pedido.
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-[#4A1E4B] uppercase tracking-wide">
                Aceitamos:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {STORE_INFO.paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="p-2.5 rounded-xl bg-white text-center border border-[#EBD6F5] text-xs font-bold text-[#6D2E7B] shadow-2xs"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Prazo de 5 Dias Úteis */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#FCE7F0] to-[#FAF0FC] border-2 border-[#F6C8D8] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white text-[#E87A90] shadow-2xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-[#4A1E4B]">
                  Prazo de Antecedência
                </h3>
                <p className="text-xs text-[#8C6097]">Produção artesanal fresca</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#F6C8D8] text-xs text-[#6D2E7B] font-medium leading-relaxed">
              <strong className="text-[#E87A90] font-extrabold text-sm block mb-1">
                ⚠️ ATENÇÃO
              </strong>
              Encomendas devem ser feitas no <strong>mínimo de 5 dias úteis de antecedência</strong> para podermos planejar os ingredientes frescos e personalização da sua data.
            </div>

            <p className="text-xs text-[#7E5788]">
              Para datas comemorativas ou feriados, recomendamos solicitar com ainda mais antecedência para garantir vaga na agenda.
            </p>
          </div>
        </div>

        {/* 4 Official Cake Instructions Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="font-script text-2xl text-[#B876CE] font-bold">
              Instruções dos Bolos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ORDERING_INSTRUCTIONS.map((inst) => (
              <div
                key={inst.step}
                className="p-5 rounded-3xl bg-white border border-[#EBD6F5] shadow-xs hover:shadow-md transition-shadow relative"
              >
                <div className="w-8 h-8 rounded-full bg-[#B876CE] text-white font-serif font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                  {inst.step}
                </div>
                <h4 className="font-serif font-bold text-base text-[#4A1E4B] mb-1.5">
                  {inst.title}
                </h4>
                <p className="text-xs text-[#6B4775] leading-relaxed">
                  {inst.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
