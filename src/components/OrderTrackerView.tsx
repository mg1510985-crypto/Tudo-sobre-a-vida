import React, { useState } from 'react';
import { storage } from '../services/storage';
import { Order, AdminSettings } from '../types';
import { Search, CheckCircle, Clock, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';

interface OrderTrackerViewProps {
  settings: AdminSettings;
  onGoToDownloads: (ref?: string) => void;
}

export const OrderTrackerView: React.FC<OrderTrackerViewProps> = ({
  settings,
  onGoToDownloads,
}) => {
  const [refInput, setRefInput] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = refInput.trim().toUpperCase();
    if (!clean) return;

    const order = storage.getOrderByReference(clean);
    setFoundOrder(order || null);
  };

  const handleSendProof = () => {
    if (!foundOrder) return;
    const cleanPhone = settings.officialWhatsApp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Olá ${settings.ownerName}! Gostaria de saber o estado da minha encomenda ${foundOrder.reference} (${foundOrder.totalKz.toLocaleString('pt-AO')} Kz). Segue o meu comprovativo.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-[75vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 uppercase tracking-widest bg-purple-100/70 px-3 py-1 rounded-full">
            <Search className="w-3.5 h-3.5 text-purple-700" />
            <span>Acompanhamento em Tempo Real</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Consultar Estado da Encomenda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Introduz a referência fornecida após a tua compra (ex.: <strong>BCA-2026-XXXX</strong>) para verificar se o teu pagamento já foi validado.
          </p>
        </div>

        {/* Input box */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              required
              value={refInput}
              onChange={(e) => setRefInput(e.target.value.toUpperCase())}
              placeholder="Referência: BCA-2026-XXXX"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm"
            >
              <span>Verificar</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        </div>

        {/* Result */}
        {searched && (
          <div>
            {foundOrder ? (
              <div className="bg-white rounded-3xl border border-purple-100 shadow-md p-6 space-y-5 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Referência:
                    </span>
                    <strong className="text-lg font-mono text-purple-950 font-bold">
                      {foundOrder.reference}
                    </strong>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${
                    foundOrder.status === 'pago'
                      ? 'bg-emerald-100 text-emerald-800'
                      : foundOrder.status === 'pendente'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {foundOrder.status === 'pago' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{foundOrder.status}</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div><strong>Cliente:</strong> {foundOrder.customerName}</div>
                  <div><strong>WhatsApp:</strong> {foundOrder.customerWhatsApp}</div>
                  <div><strong>Guias Adquiridos:</strong> {foundOrder.items.map(i => i.title).join(', ')}</div>
                  <div><strong>Total:</strong> <span className="font-mono font-bold text-slate-900">{foundOrder.totalKz.toLocaleString('pt-AO')} Kz</span></div>
                  <div><strong>Data:</strong> {new Date(foundOrder.createdAt).toLocaleDateString('pt-AO')}</div>
                </div>

                {foundOrder.status === 'pago' ? (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-3">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Pagamento confirmado! Os teus downloads em PDF estão libertados.</span>
                    </p>
                    <button
                      onClick={() => onGoToDownloads(foundOrder.reference)}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                    >
                      <span>Ir para os Meus Downloads</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-3">
                    <p className="font-medium">
                      O teu pedido está pendente de verificação bancária. Se já pagaste, envia o comprovativo ao Manuel Marcolino Miranda.
                    </p>
                    <button
                      onClick={handleSendProof}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enviar Comprovativo no WhatsApp</span>
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">Nenhuma encomenda localizada</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Confirma se digitaste os caracteres da referência com atenção (ex: BCA-2026-XXXX).
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
