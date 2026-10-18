import React from 'react';
import { Search, MessageCircle, BookOpen, Share2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_beleza_angola_1792286558042.jpg';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExploreGuides: () => void;
  onOpenWhatsApp: () => void;
  onOpenShareModal: () => void;
  ownerName: string;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onExploreGuides,
  onOpenWhatsApp,
  onOpenShareModal,
  ownerName,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-slate-900 text-white pt-8 pb-12 sm:pt-14 sm:pb-20">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Plataforma Digital Educativa</span>
              <span aria-hidden="true" className="text-purple-400">·</span>
              <span>Luanda, Angola</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Aprende a cuidar do teu cabelo com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200">
                conhecimento e simplicidade
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Guias digitais, e-books e rotinas práticas sobre cuidados com cabelo natural, crespo e tranças em Angola por <strong className="text-white font-medium">{ownerName}</strong>. Conteúdo honesto para descarregar em PDF diretamente no teu telemóvel.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar guias (ex.: cabelo crespo, tranças, cronograma, quebra)..."
                className="w-full bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-300 hover:text-white px-1.5 py-0.5"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreGuides}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ver Guias Disponíveis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </button>

              <button
                onClick={onOpenShareModal}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 backdrop-blur-xs transition border border-white/10"
              >
                <Share2 className="w-4 h-4 text-rose-300" />
                <span>Partilhar</span>
              </button>
            </div>

            {/* Trust points strip */}
            <div className="pt-4 border-t border-purple-800/40 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-purple-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pagamento Multicaixa Express & IBAN</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Download Imediato em PDF</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Leitura no Android sem Internet</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-purple-900/50">
              
              <div className="aspect-4/3 w-full overflow-hidden bg-purple-950">
                <img
                  src={heroImage}
                  alt="Beleza Capilar Angola - Cuidados com cabelo afro e crespo por Manuel Marcolino Miranda"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Bottom Strip */}
              <div className="p-4 bg-gradient-to-t from-purple-950 to-purple-900/90 border-t border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span>Edição Digital Oficial 2026</span>
                  <span className="text-white">Moeda: Kwanza (Kz)</span>
                </div>
                <p className="text-xs text-purple-200">
                  Conteúdos preparados especificamente para o clima, textura e produtos disponíveis no mercado angolano.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
