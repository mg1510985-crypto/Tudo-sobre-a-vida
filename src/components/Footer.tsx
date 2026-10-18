import React from 'react';
import { AdminSettings } from '../types';
import { Sparkles, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  settings: AdminSettings;
  onOpenLegal: (type: 'privacidade' | 'termos' | 'reembolso' | 'contacto') => void;
  onOpenWhatsApp: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenLegal,
  onOpenWhatsApp,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-purple-950 text-white border-t border-purple-900/80 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-purple-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center font-bold text-xs shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-display text-base font-bold text-white tracking-wide">
                BELEZA CAPILAR ANGOLA
              </span>
            </div>

            <p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              Plataforma digital de venda de guias, e-books e materiais educativos sobre cuidados com cabelo natural, crespo e tranças em Angola. Criada e mantida por <strong>{settings.ownerName}</strong>.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Transações em Kwanza (Kz) · Pagamento Local em Luanda</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Apoio & Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-purple-200/80">
              <li>
                <button
                  onClick={() => onOpenLegal('privacidade')}
                  className="hover:text-white transition"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('termos')}
                  className="hover:text-white transition"
                >
                  Termos de Utilização
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('reembolso')}
                  className="hover:text-white transition"
                >
                  Política de Reembolso
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contacto')}
                  className="hover:text-white transition"
                >
                  Apoio ao Cliente & Contactos
                </button>
              </li>
            </ul>
          </div>

          {/* Owner & WhatsApp Direct */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Atendimento Direto
            </h4>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Dúvidas sobre o teu pedido ou pagamentos via Multicaixa Express? Fala diretamente com Manuel Marcolino Miranda.
            </p>

            <button
              onClick={onOpenWhatsApp}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {settings.officialWhatsApp}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright and admin access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/70">
          <div>
            © {new Date().getFullYear()} <strong>{settings.brandName}</strong>. Todos os direitos reservados. Autor: {settings.ownerName}.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              Desenvolvido com <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> em Luanda, Angola
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-purple-300 hover:text-white underline text-[11px]"
            >
              Área do Proprietário
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
