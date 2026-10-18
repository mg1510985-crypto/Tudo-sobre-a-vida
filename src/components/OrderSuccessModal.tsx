import React from 'react';
import { Order, AdminSettings } from '../types';
import { CheckCircle2, MessageCircle, Copy, ArrowRight, Clock, Download, Check } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onGoToDownloads: () => void;
  settings: AdminSettings;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onGoToDownloads,
  settings,
}) => {
  const [copiedRef, setCopiedRef] = React.useState(false);

  if (!order) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(order.reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSendWhatsAppProof = () => {
    const cleanPhone = settings.officialWhatsApp.replace(/[^0-9]/g, '');
    const itemsList = order.items.map(i => i.title).join(', ');
    const msg = encodeURIComponent(
      `Olá ${settings.ownerName}! Acabei de fazer a encomenda na Beleza Capilar Angola.\n\n` +
      `• Referência: ${order.reference}\n` +
      `• Cliente: ${order.customerName}\n` +
      `• Guias: ${itemsList}\n` +
      `• Total: ${order.totalKz.toLocaleString('pt-AO')} Kz\n` +
      `• Método: ${order.paymentMethod === 'multicaixa_express' ? 'Multicaixa Express' : 'Transferência IBAN'}\n\n` +
      `Estou a enviar este comprovativo para que possa confirmar o pagamento e libertar os meus downloads em PDF. Muito obrigado(a)!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-purple-700" />
        </div>

        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            Encomenda Registada com Sucesso!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Obrigado, <strong>{order.customerName}</strong>! A tua encomenda foi registada no nosso sistema em Luanda.
          </p>
        </div>

        {/* Reference Highlight Box */}
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Referência da Encomenda:</span>
            <button
              onClick={handleCopyRef}
              className="text-[11px] text-purple-900 hover:underline flex items-center gap-1 font-semibold"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="text-lg font-extrabold text-purple-950 font-mono tracking-wider">
            {order.reference}
          </div>

          <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between text-xs text-slate-700">
            <span>Total a Liquidar:</span>
            <span className="font-bold font-mono text-purple-900">{order.totalKz.toLocaleString('pt-AO')} Kz</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-800 font-medium pt-1">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Estado Atual: <strong>Pendente (Aguardando Verificação)</strong></span>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="text-left text-xs text-slate-600 space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <strong className="text-slate-900 block">Próximos passos imediatos:</strong>
          <ol className="list-decimal list-inside space-y-1 text-slate-700">
            <li>Efetua o pagamento de <strong>{order.totalKz.toLocaleString('pt-AO')} Kz</strong> via Express ou IBAN.</li>
            <li>Envia o comprovativo para o WhatsApp oficial de {settings.ownerName}.</li>
            <li>Assim que validado pelo administrador, o botão de download dos teus ficheiros PDF será desbloqueado.</li>
          </ol>
        </div>

        {/* WhatsApp direct button */}
        <button
          onClick={handleSendWhatsAppProof}
          className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Enviar Comprovativo no WhatsApp</span>
        </button>

        {/* Secondary buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onGoToDownloads();
            }}
            className="py-2.5 px-3 rounded-xl bg-purple-950 text-white text-xs font-semibold hover:bg-purple-900 transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Ver Meus Downloads</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
          >
            Continuar a Navegar
          </button>
        </div>

      </div>
    </div>
  );
};
