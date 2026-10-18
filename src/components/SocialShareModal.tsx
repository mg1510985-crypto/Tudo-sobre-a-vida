import React, { useState } from 'react';
import { AdminSettings } from '../types';
import { X, Copy, Check, MessageCircle, Share2, Facebook, Sparkles } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdminSettings;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [copiedTextIndex, setCopiedTextIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const promotionalPosts = [
    {
      title: 'Post para Grupos de WhatsApp & Estado',
      text: `✨ Queres aprender a cuidar do teu cabelo natural, crespo ou com tranças sem complicações em Angola? 🇦🇴\n\nConhece os Guias Digitais da *BELEZA CAPILAR ANGOLA* por *${settings.ownerName}*! Manuais práticos em PDF para descarregar direto no telemóvel, com dicas de lavagem, selagem e prevenção de quebra.\n\n👉 Acede aqui: ${appUrl}\n💬 Atendimento via WhatsApp: ${settings.officialWhatsApp}`
    },
    {
      title: 'Publicação Curta para o Facebook',
      text: `Aprende a cuidar do teu cabelo com conhecimento e simplicidade! 🌸\n\nChegou a Beleza Capilar Angola: e-books e calendários semanais pensados para a realidade dos nossos fios no clima de Angola. Pagamento fácil via Multicaixa Express e transferência bancária!\n\nConfere o catálogo completo: ${appUrl}`
    },
    {
      title: 'Dica Rápida de Engajamento para Redes',
      text: `Sabias que desembaraçar o cabelo seco é a maior causa de quebra em fios crespos? 💡\nNo Guia de Desembaraço da Beleza Capilar Angola, ${settings.ownerName} ensina o método indolor passo a passo. Descarrega o teu guia hoje mesmo em: ${appUrl}`
    }
  ];

  const handleCopyPost = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTextIndex(index);
    setTimeout(() => setCopiedTextIndex(null), 2500);
  };

  const handleShareWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Conhece a Beleza Capilar Angola por ${settings.ownerName}! Guias digitais práticos sobre cuidados com cabelo natural, crespo e tranças: ${appUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebookDirect = () => {
    const shareUrl = encodeURIComponent(appUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-100 bg-gradient-to-r from-purple-950 to-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-300" />
            <h3 className="font-display text-base font-bold text-white">
              Kit de Divulgação Social
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Share Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Partilha Imediata com 1 Toque:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShareWhatsAppDirect}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Partilhar no WhatsApp</span>
              </button>

              <button
                onClick={handleShareFacebookDirect}
                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Facebook className="w-4 h-4" />
                <span>Partilhar no Facebook</span>
              </button>
            </div>
          </div>

          {/* Pre-crafted Promotional Posts for Copying */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-950 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Textos Promocionais Prontos para Copiar:</span>
            </div>

            {promotionalPosts.map((post, idx) => {
              const isCopied = copiedTextIndex === idx;

              return (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">{post.title}</span>
                    <button
                      onClick={() => handleCopyPost(post.text, idx)}
                      className="text-xs font-semibold text-purple-800 hover:text-purple-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-purple-200 transition"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Texto Copiado!' : 'Copiar Texto'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 font-mono whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-100 max-h-36 overflow-y-auto">
                    {post.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
