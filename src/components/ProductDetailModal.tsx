import React from 'react';
import { Guide } from '../types';
import { X, BookOpen, ShoppingBag, MessageCircle, Eye, CheckCircle2, FileText, Globe, User } from 'lucide-react';

interface ProductDetailModalProps {
  guide: Guide | null;
  onClose: () => void;
  onAddToCart: (guide: Guide) => void;
  onPreviewSample: (guide: Guide) => void;
  isInCart: boolean;
  whatsappNumber: string;
  ownerName: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  guide,
  onClose,
  onAddToCart,
  onPreviewSample,
  isInCart,
  whatsappNumber,
  ownerName,
}) => {
  if (!guide) return null;

  const handleWhatsAppOrder = () => {
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Olá ${ownerName}! Tenho interesse em adquirir o guia "${guide.title}" (${guide.priceKz.toLocaleString('pt-AO')} Kz) na Beleza Capilar Angola. Pode fornecer-me as instruções de pagamento pelo Multicaixa Express ou IBAN?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-purple-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
              Detalhes do Guia Digital
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            
            {/* Cover Column */}
            <div className="sm:col-span-5">
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-md bg-purple-900 border border-purple-200">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sample excerpt button below cover */}
              <button
                onClick={() => {
                  onClose();
                  onPreviewSample(guide);
                }}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-purple-200"
              >
                <Eye className="w-4 h-4 text-purple-700" />
                <span>Ler Amostra Gratuita</span>
              </button>
            </div>

            {/* Info Column */}
            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs text-purple-700 font-semibold mb-1">
                  Beleza Capilar Angola · Autor: {ownerName}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {guide.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {guide.description}
                </p>

                {/* Technical details list */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Formato: <strong>{guide.format}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Extensão: <strong>{guide.pages} páginas ilustradas</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Idioma: <strong>Português (Contexto Angola)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Autor: <strong>{ownerName}</strong></span>
                  </div>
                </div>
              </div>

              {/* Price display */}
              <div className="mt-5 p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">Preço de aquisição:</span>
                <div className="text-right">
                  {guide.isFree ? (
                    <span className="text-lg font-bold text-emerald-700 font-mono">0 Kz (Gratuito)</span>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      {guide.originalPriceKz && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          {guide.originalPriceKz.toLocaleString('pt-AO')} Kz
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-purple-950 font-mono">
                        {guide.priceKz.toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Table of Contents Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Conteúdo Programático do Guia</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {guide.tableOfContents.map((chapter, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold font-mono">{(i + 1).toString().padStart(2, '0')}.</span>
                  <span>{chapter}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comprar pelo WhatsApp</span>
          </button>

          {!guide.isFree && (
            <button
              onClick={() => {
                onAddToCart(guide);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>{isInCart ? 'Ver no Carrinho' : 'Adicionar ao Carrinho'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
