import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  openCart: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  openCart,
  isAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setCurrentView('catalogo')}
          className="text-left group flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-900 to-fuchsia-900 text-amber-300 flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-purple-950 group-hover:text-purple-800 transition-colors">
            BELEZA CAPILAR ANGOLA
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setCurrentView('catalogo')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'catalogo'
                ? 'text-purple-900 border-b-2 border-purple-900 font-bold'
                : 'hover:text-purple-900'
            }`}
          >
            Catálogo de Guias
          </button>

          <button
            onClick={() => setCurrentView('dicas')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'dicas'
                ? 'text-purple-900 border-b-2 border-purple-900 font-bold'
                : 'hover:text-purple-900'
            }`}
          >
            Dicas & Educação
          </button>

          <button
            onClick={() => setCurrentView('downloads')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'downloads'
                ? 'text-purple-900 border-b-2 border-purple-900 font-bold'
                : 'hover:text-purple-900'
            }`}
          >
            Os Meus Downloads
          </button>

          <button
            onClick={() => setCurrentView('rastreio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'rastreio'
                ? 'text-purple-900 border-b-2 border-purple-900 font-bold'
                : 'hover:text-purple-900'
            }`}
          >
            Consultar Encomenda
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'admin'
                ? 'text-purple-900 border-b-2 border-purple-900 font-bold'
                : 'hover:text-purple-900 text-slate-500'
            }`}
          >
            {isAdmin ? 'Painel Admin (Ativo)' : 'Área do Proprietário'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openCart}
            aria-label={`Carrinho com ${cartCount} itens`}
            className="relative flex items-center gap-2 bg-purple-950 hover:bg-purple-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 ? (
              <span className="bg-amber-400 text-purple-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            ) : (
              <span className="text-purple-300 text-[11px]">0</span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Secondary Navigation Row (Touch ergonomic bar) */}
      <div className="md:hidden flex items-center justify-between border-t border-purple-50 px-2 py-1.5 overflow-x-auto text-[11px] font-medium text-slate-600 bg-purple-50/30">
        <button
          onClick={() => setCurrentView('catalogo')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentView === 'catalogo' ? 'bg-purple-900 text-white font-bold' : ''}`}
        >
          Guias
        </button>
        <button
          onClick={() => setCurrentView('dicas')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentView === 'dicas' ? 'bg-purple-900 text-white font-bold' : ''}`}
        >
          Dicas Gratuitas
        </button>
        <button
          onClick={() => setCurrentView('downloads')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentView === 'downloads' ? 'bg-purple-900 text-white font-bold' : ''}`}
        >
          Downloads
        </button>
        <button
          onClick={() => setCurrentView('rastreio')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentView === 'rastreio' ? 'bg-purple-900 text-white font-bold' : ''}`}
        >
          Rastreio
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-purple-900 ${currentView === 'admin' ? 'bg-purple-900 text-white font-bold' : ''}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
