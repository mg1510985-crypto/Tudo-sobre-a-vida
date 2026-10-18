import React, { useState } from 'react';
import { Guide, PromoCode, Order, AdminSettings } from '../types';
import { storage } from '../services/storage';
import { X, Copy, Check, MessageCircle, ShieldCheck, ArrowRight, Upload, Smartphone, Building2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Guide[];
  appliedPromo?: PromoCode;
  discountAmount?: number;
  settings: AdminSettings;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedPromo,
  discountAmount = 0,
  settings,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'dados' | 'pagamento'>('dados');
  
  // Customer info
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'multicaixa_express' | 'transferencia_iban'>('multicaixa_express');
  const [paymentProofNote, setPaymentProofNote] = useState('');
  const [proofFileBase64, setProofFileBase64] = useState<string | undefined>(undefined);
  const [proofFileName, setProofFileName] = useState('');

  // Copy feedbacks
  const [copiedIBAN, setCopiedIBAN] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Temporary reference for checkout preview
  const [previewRef] = useState(() => `BCA-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.priceKz, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleCopy = (text: string, type: 'iban' | 'phone' | 'ref') => {
    navigator.clipboard.writeText(text);
    if (type === 'iban') {
      setCopiedIBAN(true);
      setTimeout(() => setCopiedIBAN(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setProofFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !whatsapp.trim()) {
      alert('Por favor, indica o teu nome e contacto WhatsApp.');
      return;
    }

    const order = storage.createOrder({
      customerName: name.trim(),
      customerWhatsApp: whatsapp.trim(),
      customerEmail: email.trim() || undefined,
      items: cartItems.map(item => ({
        guideId: item.id,
        title: item.title,
        priceKz: item.priceKz,
        format: item.format,
        coverImage: item.coverImage,
      })),
      paymentMethod,
      promoCodeApplied: appliedPromo?.code,
      discountKz: discountAmount,
      paymentProofNote: paymentProofNote.trim() || undefined,
      paymentProofFile: proofFileBase64,
    });

    onOrderCompleted(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-950 to-purple-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
              Finalizar Pedido Digital
            </div>
            <h3 className="font-display text-base font-bold text-white">
              {step === 'dados' ? 'Passo 1 de 2: Dados do Cliente' : 'Passo 2 de 2: Pagamento e Confirmação'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white p-1 rounded-full transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {step === 'dados' ? (
            <div className="space-y-4">
              
              {/* Order Items Review */}
              <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs">
                <span className="font-bold text-purple-950 block mb-1.5">Resumo da Encomenda:</span>
                <ul className="divide-y divide-purple-100">
                  {cartItems.map((item, i) => (
                    <li key={i} className="py-1 flex justify-between text-slate-700">
                      <span className="truncate pr-2">{item.title}</span>
                      <span className="font-mono font-semibold shrink-0">{item.priceKz.toLocaleString('pt-AO')} Kz</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 mt-2 border-t border-purple-200/80 flex justify-between font-bold text-purple-950 text-sm">
                  <span>Total:</span>
                  <span className="font-mono">{total.toLocaleString('pt-AO')} Kz</span>
                </div>
              </div>

              {/* Customer Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  O teu Nome Completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria António"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: +244 923 000 000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white transition"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Necessário para envio de confirmação e suporte direto com Manuel Marcolino Miranda.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email (Opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: seuemail@exemplo.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white transition"
                />
              </div>

              <button
                type="button"
                disabled={!name.trim() || !whatsapp.trim()}
                onClick={() => setStep('pagamento')}
                className="mt-4 w-full py-3.5 rounded-xl bg-purple-950 hover:bg-purple-900 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Avançar para Dados de Pagamento</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Escolhe o Método de Pagamento em Angola:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('multicaixa_express')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                      paymentMethod === 'multicaixa_express'
                        ? 'border-purple-900 bg-purple-50/80 text-purple-950 ring-1 ring-purple-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Smartphone className="w-4 h-4 text-purple-700" />
                      <span>Multicaixa Express</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">Via telemóvel imediato</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia_iban')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                      paymentMethod === 'transferencia_iban'
                        ? 'border-purple-900 bg-purple-50/80 text-purple-950 ring-1 ring-purple-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Building2 className="w-4 h-4 text-purple-700" />
                      <span>Transferência IBAN</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">ATM ou Internet Banking</span>
                  </button>
                </div>
              </div>

              {/* Instructions Box with Owner data */}
              <div className="p-4 bg-purple-900/5 rounded-2xl border border-purple-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
                  <span className="text-xs font-bold text-purple-950 uppercase">
                    Dados Oficiais para Pagamento
                  </span>
                  <span className="text-xs font-extrabold text-purple-950 font-mono">
                    Valor: {total.toLocaleString('pt-AO')} Kz
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Titular da Conta:</span>
                    <strong className="text-slate-900 text-sm">{settings.ownerName}</strong>
                  </div>

                  {paymentMethod === 'multicaixa_express' ? (
                    <div>
                      <span className="text-slate-500 block text-[11px]">Contacto Multicaixa Express:</span>
                      <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-purple-200 mt-0.5">
                        <strong className="text-purple-950 font-mono text-xs">{settings.multicaixaPhone}</strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(settings.multicaixaPhone, 'phone')}
                          className="text-[11px] text-purple-800 hover:text-purple-950 flex items-center gap-1 font-semibold"
                        >
                          {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPhone ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-slate-500 block text-[11px]">IBAN Bancário ({settings.bankName}):</span>
                      <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-purple-200 mt-0.5">
                        <strong className="text-purple-950 font-mono text-[11px] truncate max-w-[260px]">{settings.iban}</strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(settings.iban, 'iban')}
                          className="text-[11px] text-purple-800 hover:text-purple-950 flex items-center gap-1 font-semibold shrink-0 ml-2"
                        >
                          {copiedIBAN ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedIBAN ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reference code to attach in transfer */}
                  <div className="pt-1">
                    <span className="text-slate-500 block text-[11px]">Referência da tua Encomenda:</span>
                    <div className="flex items-center justify-between bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200 mt-0.5">
                      <strong className="text-amber-950 font-mono text-xs">{previewRef}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(previewRef, 'ref')}
                        className="text-[11px] text-amber-900 hover:text-amber-950 flex items-center gap-1 font-semibold"
                      >
                        {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRef ? 'Copiado!' : 'Copiar Referência'}</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Coloca esta referência no descritivo da transferência bancária para validação imediata.
                    </p>
                  </div>
                </div>
              </div>

              {/* Proof / Transaction note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de Transação ou Nota (Opcional):
                </label>
                <input
                  type="text"
                  value={paymentProofNote}
                  onChange={(e) => setPaymentProofNote(e.target.value)}
                  placeholder="Ex: Transação nº 94821 ou 'Feito pelo Express'"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-700"
                />
              </div>

              {/* Upload Proof */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Anexar Comprovativo (Foto ou PDF):
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-300">
                    <Upload className="w-3.5 h-3.5 text-purple-700" />
                    <span>{proofFileName ? 'Substituir Ficheiro' : 'Escolher Comprovativo'}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {proofFileName && (
                    <span className="text-xs text-emerald-700 font-medium truncate max-w-xs">
                      {proofFileName}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct WhatsApp link notice */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Após submeter a encomenda, podes enviar o comprovativo diretamente para o WhatsApp de <strong>{settings.ownerName}</strong> com a mensagem pronta com um só toque!
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('dados')}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  className="flex-1 py-3.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/20 active:scale-98 transition"
                >
                  <span>Concluir e Submeter Encomenda</span>
                  <Check className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
