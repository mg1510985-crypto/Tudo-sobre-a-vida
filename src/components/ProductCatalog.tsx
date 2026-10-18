import React, { useState } from 'react';
import { Guide, GuideCategory } from '../types';
import { BookOpen, ShoppingBag, Eye, Download, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ProductCatalogProps {
  guides: Guide[];
  searchQuery: string;
  onSelectGuide: (guide: Guide) => void;
  onPreviewSample: (guide: Guide) => void;
  onAddToCart: (guide: Guide) => void;
  onDirectDownloadFree: (guide: Guide) => void;
  cartItemIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  guides,
  searchQuery,
  onSelectGuide,
  onPreviewSample,
  onAddToCart,
  onDirectDownloadFree,
  cartItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>('todos');

  // Filter categories
  const categories: { id: GuideCategory; label: string }[] = [
    { id: 'todos', label: 'Todos os Guias' },
    { id: 'cabelo-natural', label: 'Cabelo Natural' },
    { id: 'cabelos-crespos', label: 'Crespos (Tipo 4)' },
    { id: 'rotinas-semanais', label: 'Rotinas & 7 Dias' },
    { id: 'trancas-protecao', label: 'Tranças & Proteção' },
    { id: 'cronograma-capilar', label: 'Cronograma' },
    { id: 'pacotes-completos', label: 'Pacotes Promocionais' },
  ];

  // Filtering logic
  const filteredGuides = guides.filter(guide => {
    if (!guide.isActive) return false;
    const matchesCategory = selectedCategory === 'todos' || guide.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      guide.title.toLowerCase().includes(query) ||
      guide.shortDescription.toLowerCase().includes(query) ||
      guide.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Catálogo Oficial de Guias Digitais</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Guias e Conteúdos Educativos em Angola
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Todos os materiais são em formato PDF de alta resolução, prontos para ler no telemóvel Android sem consumir dados móveis adicionais.
          </p>
        </div>

        {/* Category Tabs (Interactive Filter Controls) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-purple-950 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {filteredGuides.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">Nenhum guia encontrado</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tenta pesquisar por outro termo ou seleciona a categoria &ldquo;Todos os Guias&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGuides.map((guide) => {
              const inCart = cartItemIds.includes(guide.id);

              return (
                <div
                  key={guide.id}
                  className="group bg-white rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Card Cover Media */}
                  <div className="relative aspect-4/3 w-full bg-purple-900/10 overflow-hidden">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient scrim for text legibility if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Quick Preview Badge */}
                    <button
                      onClick={() => onPreviewSample(guide)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-purple-950 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs flex items-center gap-1 transition"
                    >
                      <Eye className="w-3 h-3 text-purple-700" />
                      <span>Ler Amostra</span>
                    </button>

                    {guide.isFree && (
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        GRÁTIS
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2 font-medium">
                        <span>{guide.format}</span>
                        <span aria-hidden="true">·</span>
                        <span>{guide.pages} páginas</span>
                        {guide.originalPriceKz && guide.originalPriceKz > guide.priceKz && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-700 font-semibold">Preço Promocional</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-purple-900 transition-colors line-clamp-2">
                        {guide.title}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {guide.shortDescription}
                      </p>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      
                      <div className="flex items-baseline justify-between mb-3.5">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">
                          Preço em Angola:
                        </span>
                        
                        <div className="text-right">
                          {guide.isFree ? (
                            <span className="text-lg font-bold text-emerald-700 font-mono tabular-nums">
                              0 Kz (Livre)
                            </span>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              {guide.originalPriceKz && (
                                <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                                  {guide.originalPriceKz.toLocaleString('pt-AO')} Kz
                                </span>
                              )}
                              <span className="text-lg font-extrabold text-purple-950 font-mono tabular-nums">
                                {guide.priceKz.toLocaleString('pt-AO')} Kz
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectGuide(guide)}
                          className="w-full py-2 px-2 rounded-xl border border-purple-200 text-purple-900 text-xs font-semibold hover:bg-purple-50 transition text-center flex items-center justify-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Detalhes</span>
                        </button>

                        {guide.isFree ? (
                          <button
                            onClick={() => onDirectDownloadFree(guide)}
                            className="w-full py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onAddToCart(guide)}
                            className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs ${
                              inCart
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : 'bg-purple-950 hover:bg-purple-900 text-white'
                            }`}
                          >
                            {inCart ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-purple-700" />
                                <span>No Carrinho</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                                <span>Comprar</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
