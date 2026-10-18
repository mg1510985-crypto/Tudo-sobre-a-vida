import React from 'react';
import { Guide } from '../types';
import { X, BookOpen, ShoppingBag, Sparkles, CheckCircle } from 'lucide-react';

interface SamplePreviewModalProps {
  guide: Guide | null;
  onClose: () => void;
  onAddToCart: (guide: Guide) => void;
}

export const SamplePreviewModal: React.FC<SamplePreviewModalProps> = ({
  guide,
  onClose,
  onAddToCart,
}) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-900 to-purple-950 text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <div>
              <span className="text-[10px] text-amber-200 uppercase tracking-widest font-bold block">
                Amostra Demonstrativa Gratuita
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-sm">
                {guide.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white p-1 rounded-full transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reader Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/50">
          
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Extrato Exclusivo</span>
            </div>

            <h4 className="font-display text-xl font-bold text-slate-900 mb-4">
              {guide.sampleExcerpt.chapterTitle}
            </h4>

            <p className="text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">
              {guide.sampleExcerpt.text}
            </p>
          </div>

          {/* Key Insights Callout */}
          <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200">
            <h5 className="text-xs font-bold text-purple-950 uppercase tracking-wider mb-3">
              Conhecimentos destacados nesta edição:
            </h5>
            <ul className="space-y-2 text-xs text-slate-700">
              {guide.sampleExcerpt.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value pitch */}
          <div className="text-center p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <p className="text-xs text-amber-900 font-medium">
              Esta é apenas uma pequena fração do material completo de <strong>{guide.pages} páginas</strong>.
              Garante a tua cópia completa em PDF para teres o manual sempre no teu telemóvel.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Preço do guia completo: <strong className="text-purple-950 text-sm">{guide.priceKz.toLocaleString('pt-AO')} Kz</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Fechar Leitura
            </button>
            <button
              onClick={() => {
                onAddToCart(guide);
                onClose();
              }}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Adquirir Guia Completo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
