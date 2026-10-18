import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { downloadGuidePDF } from '../services/pdfGenerator';
import { Order, Guide, AdminSettings } from '../types';
import { Download, Search, CheckCircle, Clock, AlertTriangle, FileText, ArrowRight, Smartphone, RefreshCw, MessageCircle } from 'lucide-react';

interface MyDownloadsViewProps {
  settings: AdminSettings;
  onExploreCatalog: () => void;
}

export const MyDownloadsView: React.FC<MyDownloadsViewProps> = ({
  settings,
  onExploreCatalog,
}) => {
  const [referenceQuery, setReferenceQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [allGuides, setAllGuides] = useState<Guide[]>([]);

  useEffect(() => {
    setAllGuides(storage.getGuides());
  }, []);

  const handleSearchOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchFeedback(null);
    setDownloadSuccess(null);

    const clean = referenceQuery.trim().toUpperCase();
    if (!clean) {
      setSearchFeedback({ type: 'error', message: 'Por favor, introduz o código de referência da tua encomenda (ex: BCA-2026-XXXX).' });
      return;
    }

    const found = storage.getOrderByReference(clean);
    if (found) {
      setActiveOrder(found);
      setSearchFeedback({ type: 'success', message: `Encomenda localizada para ${found.customerName}!` });
    } else {
      setActiveOrder(null);
      setSearchFeedback({
        type: 'error',
        message: 'Nenhuma encomenda encontrada com esta referência. Confirma se digitaste corretamente ou fala connosco no WhatsApp.',
      });
    }
  };

  const handleDownload = async (item: { guideId: string; title: string }) => {
    if (!activeOrder) return;

    if (activeOrder.status !== 'pago') {
      alert('O pagamento desta encomenda ainda não foi confirmado pelo administrador. Por favor aguarda a confirmação de Manuel Marcolino Miranda.');
      return;
    }

    try {
      setDownloadingId(item.guideId);
      setDownloadSuccess(null);

      // Find full guide data
      const guideData = allGuides.find(g => g.id === item.guideId);
      if (!guideData) {
        throw new Error('Guia não encontrado no catálogo.');
      }

      // Generate and download real PDF
      await downloadGuidePDF(guideData, activeOrder, activeOrder.customerName);
      storage.recordDownload(activeOrder.id);

      setDownloadSuccess(`Download do "${item.title}" concluído com sucesso para o teu telemóvel/computador!`);
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao gerar o download do PDF. Tenta novamente.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleWhatsAppContact = () => {
    const cleanPhone = settings.officialWhatsApp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Olá ${settings.ownerName}! Preciso de apoio com a minha encomenda ${activeOrder?.reference || referenceQuery} na Beleza Capilar Angola.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 uppercase tracking-widest bg-purple-100/70 px-3 py-1 rounded-full">
            <Download className="w-3.5 h-3.5 text-purple-700" />
            <span>Biblioteca Digital do Cliente</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Os Meus Downloads
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Acede aos ficheiros completos dos teus guias adquiridos. Introduz a referência que recebeste no momento da compra (ex.: <strong>BCA-2026-XXXX</strong>).
          </p>
        </div>

        {/* Search Reference Form */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
          <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={referenceQuery}
                onChange={(e) => setReferenceQuery(e.target.value.toUpperCase())}
                placeholder="Introduz a referência: BCA-2026-XXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>Consultar Ficheiros</span>
            </button>
          </form>

          {searchFeedback && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
                searchFeedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {searchFeedback.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{searchFeedback.message}</span>
            </div>
          )}
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Active Order Details & File Downloads */}
        {activeOrder && (
          <div className="bg-white rounded-3xl border border-purple-100 shadow-md overflow-hidden space-y-6">
            
            {/* Order Status Banner */}
            <div className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              activeOrder.status === 'pago' ? 'bg-emerald-50 border-b border-emerald-100' : 'bg-amber-50 border-b border-amber-100'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Cliente: {activeOrder.customerName} · Ref: {activeOrder.reference}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900">
                  {activeOrder.status === 'pago' ? 'Pagamento Confirmado — Downloads Autorizados' : 'Pagamento Pendente — A Aguardar Verificação'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeOrder.status === 'pago' ? (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Pago</span>
                  </span>
                ) : (
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pendente</span>
                  </span>
                )}
              </div>
            </div>

            {/* List of Files */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Ficheiros Disponíveis para Download ({activeOrder.items.length}):
              </h4>

              <div className="space-y-3">
                {activeOrder.items.map((item, idx) => {
                  const isReady = activeOrder.status === 'pago';
                  const isBusy = downloadingId === item.guideId;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-purple-700" />
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                            {item.title}
                          </h5>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Formato: PDF Digital de Alta Resolução · Licenciado para {activeOrder.customerName}
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto">
                        {isReady ? (
                          <button
                            onClick={() => handleDownload(item)}
                            disabled={isBusy}
                            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                          >
                            {isBusy ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                                <span>A Gerar PDF...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5 text-amber-300" />
                                <span>Descarregar PDF</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-700 bg-amber-100/60 px-3 py-1.5 rounded-lg text-[11px] font-medium">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>Download Bloqueado (Aguardando Pagamento)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status explanation when pending */}
              {activeOrder.status !== 'pago' && (
                <div className="mt-4 p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Como desbloquear o teu download:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Por razões de segurança e proteção de direitos de autor, o ficheiro completo em PDF só fica acessível após confirmação real do pagamento pelo proprietário <strong>{settings.ownerName}</strong>.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Se já realizaste o pagamento no Multicaixa Express ({settings.multicaixaPhone}) ou no IBAN ({settings.iban}), clica no botão abaixo para enviar o teu comprovativo pelo WhatsApp.
                  </p>
                  <button
                    onClick={handleWhatsAppContact}
                    className="mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Avisar {settings.ownerName} no WhatsApp</span>
                  </button>
                </div>
              )}

              {/* Downloads Policy Info */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                <Smartphone className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  Os ficheiros PDF podem ser guardados no armazenamento do teu telemóvel Android, na pasta &ldquo;Transferências/Downloads&rdquo;, e lidos com qualquer leitor de PDF mesmo sem rede.
                </span>
              </div>

            </div>

          </div>
        )}

        {/* Free Mini-Guide Callout */}
        <div className="p-6 bg-gradient-to-r from-purple-900 to-fuchsia-950 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold block mb-1">
              Conteúdo Gratuito para Começar
            </span>
            <h4 className="font-display text-base sm:text-lg font-bold">
              Queres testar o download antes de comprar?
            </h4>
            <p className="text-xs text-purple-200 mt-1 max-w-md">
              Descarrega já o Mini-Guia com os 5 Princípios do Cabelo Saudável sem necessidade de pagamento.
            </p>
          </div>

          <button
            onClick={onExploreCatalog}
            className="py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs flex items-center gap-2 transition shrink-0 shadow-sm"
          >
            <span>Ver Guias no Catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
