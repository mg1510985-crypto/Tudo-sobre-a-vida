import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, ChevronRight } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already installed or user dismissed banner for this session
  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <>
      {/* Subtle top notification for installation */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-fuchsia-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              <strong>Aplicação Beleza Capilar Angola:</strong> Instala no teu telemóvel para aceder aos teus guias sem precisar de abrir o navegador.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instalar Agora</span>
              </button>
            )}

            <button
              onClick={() => setShowGuide(true)}
              className="underline text-amber-200 hover:text-white font-medium text-xs px-1"
            >
              Como Instalar
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="text-purple-300 hover:text-white p-1"
              aria-label="Fechar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal for Android & iOS */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm">
                  BCA
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Instalar no Telemóvel
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-600">
              {/* Android Guide */}
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-950 text-sm flex items-center gap-1.5 mb-1.5">
                  <Smartphone className="w-4 h-4 text-purple-700" />
                  No Android (Google Chrome ou Samsung Internet)
                </h4>
                <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
                  <li>Toca no botão do menu (<strong>3 pontos</strong> no canto superior direito).</li>
                  <li>Clica em <strong>“Instalar aplicação”</strong> ou <strong>“Adicionar ao ecrã principal”</strong>.</li>
                  <li>Confirma a instalação. O ícone oficial da <strong>Beleza Capilar Angola</strong> aparecerá nas tuas aplicações!</li>
                </ol>
                {isInstallable && (
                  <button
                    onClick={() => {
                      install();
                      setShowGuide(false);
                    }}
                    className="mt-3 w-full py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 text-xs"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    Instalar com 1 Toque
                  </button>
                )}
              </div>

              {/* iOS Guide */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1.5">
                  No iPhone ou iPad (Safari)
                </h4>
                <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
                  <li>No navegador Safari, toca no botão <strong>Partilhar</strong> (quadrado com seta para cima).</li>
                  <li>Desce a lista de opções e seleciona <strong>“Adicionar ao Ecrã Principal”</strong>.</li>
                  <li>Toca em <strong>“Adicionar”</strong> no canto superior direito.</li>
                </ol>
              </div>

              {/* Offline note */}
              <div className="flex items-start gap-2 text-slate-500 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Funciona offline! Uma vez instalada, podes aceder ao catálogo e reler os teus conteúdos mesmo com conexões lentas em Angola.</span>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
