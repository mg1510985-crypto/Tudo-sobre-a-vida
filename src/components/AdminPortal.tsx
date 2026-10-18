import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { Order, Guide, AdminSettings, PromoCode, OrderStatus } from '../types';
import { 
  Lock, LogOut, CheckCircle2, Clock, XCircle, DollarSign, 
  ShoppingBag, BookOpen, Settings as SettingsIcon, Tag, 
  Download, Upload, Plus, Edit2, Trash2, Smartphone, 
  FileText, ExternalLink, RefreshCw, KeyRound
} from 'lucide-react';

interface AdminPortalProps {
  onLogout: () => void;
  onRefreshSettings: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onLogout,
  onRefreshSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'encomendas' | 'catalogo' | 'configuracoes' | 'promos' | 'publicacao'>('encomendas');
  
  // Data state
  const [orders, setOrders] = useState<Order[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(storage.getSettings());
  const [promos, setPromos] = useState<PromoCode[]>([]);

  // Filter orders
  const [orderFilter, setOrderFilter] = useState<'todos' | 'pendente' | 'pago' | 'cancelado'>('todos');

  // Editing Guide modal/state
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [isCreatingGuide, setIsCreatingGuide] = useState(false);

  // Settings form
  const [settingsForm, setSettingsForm] = useState<AdminSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New Promo form
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState<number>(10);

  // Backup state
  const [backupNotice, setBackupNotice] = useState<string | null>(null);

  const loadAllData = () => {
    setOrders(storage.getOrders());
    setGuides(storage.getGuides());
    const currentSettings = storage.getSettings();
    setSettings(currentSettings);
    setSettingsForm(currentSettings);
    setPromos(storage.getPromoCodes());
  };

  useEffect(() => {
    loadAllData();

    const handleUpdate = () => loadAllData();
    window.addEventListener('bca_storage_updated', handleUpdate);
    return () => window.removeEventListener('bca_storage_updated', handleUpdate);
  }, []);

  // ORDER ACTIONS
  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    storage.updateOrderStatus(orderId, status);
    loadAllData();
  };

  // SETTINGS ACTIONS
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.updateSettings(settingsForm);
    setSettings(settingsForm);
    setSettingsSaved(true);
    onRefreshSettings();
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // GUIDE ACTIONS
  const handleSaveGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuide) return;

    storage.saveGuide(editingGuide);
    setEditingGuide(null);
    setIsCreatingGuide(false);
    loadAllData();
  };

  const handleDeleteGuide = (id: string) => {
    if (confirm('Tens a certeza de que queres eliminar este guia do catálogo?')) {
      storage.deleteGuide(id);
      loadAllData();
    }
  };

  // PROMO ACTIONS
  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    storage.savePromoCode({
      id: 'promo-' + Date.now(),
      code: newPromoCode.trim().toUpperCase(),
      discountPercentage: Number(newPromoDiscount),
      isActive: true,
      usageCount: 0,
    });
    setNewPromoCode('');
    loadAllData();
  };

  const handleTogglePromo = (promo: PromoCode) => {
    storage.savePromoCode({ ...promo, isActive: !promo.isActive });
    loadAllData();
  };

  const handleDeletePromo = (id: string) => {
    storage.deletePromoCode(id);
    loadAllData();
  };

  // BACKUP EXPORT / IMPORT
  const handleExportJSON = () => {
    const jsonStr = storage.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_beleza_capilar_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupNotice('Cópia de segurança exportada com sucesso!');
    setTimeout(() => setBackupNotice(null), 3000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const success = storage.importFullBackup(reader.result as string);
        if (success) {
          loadAllData();
          setBackupNotice('Base de dados restaurada com sucesso!');
        } else {
          alert('Ficheiro de cópia de segurança inválido.');
        }
        setTimeout(() => setBackupNotice(null), 3000);
      };
      reader.readAsText(file);
    }
  };

  // METRICS
  const totalRevenueKz = orders
    .filter(o => o.status === 'pago')
    .reduce((sum, o) => sum + o.totalKz, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pendente').length;
  const paidOrdersCount = orders.filter(o => o.status === 'pago').length;

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'todos') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="py-8 sm:py-12 bg-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Admin Header */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-purple-950 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Painel de Administração
                </h2>
                <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full uppercase">
                  Privado
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Proprietário: <strong>{settings.ownerName}</strong> · Beleza Capilar Angola
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminar Sessão</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Faturação Total (Confirmada)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-purple-950 font-mono tabular-nums">
              {totalRevenueKz.toLocaleString('pt-AO')} Kz
            </div>
            <div className="text-[10px] text-emerald-700 font-medium mt-1">
              {paidOrdersCount} encomenda(s) liquidada(s)
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Pagamentos Pendentes</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-600 font-mono tabular-nums">
              {pendingOrdersCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              A aguardar confirmação do comprovativo
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Total de Encomendas</span>
              <ShoppingBag className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {orders.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Histórico completo gravado
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Guias no Catálogo</span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {guides.filter(g => g.isActive).length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Ativos para venda e download
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('encomendas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'encomendas'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Gestão de Encomendas ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('catalogo')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'catalogo'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Catálogo & Preços ({guides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('configuracoes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'configuracoes'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SettingsIcon className="w-4 h-4 text-amber-300" />
            <span>Dados de Pagamento & Manuel Miranda</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'promos'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-300" />
            <span>Cupões de Desconto ({promos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('publicacao')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'publicacao'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-300" />
            <span>Guia de Publicação & APK</span>
          </button>
        </div>

        {/* TAB 1: GESTÃO DE ENCOMENDAS */}
        {activeTab === 'encomendas' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Histórico de Encomendas & Confirmação de Pagamento
                </h3>
                <p className="text-xs text-slate-500">
                  Clica em &ldquo;Confirmar Pagamento&rdquo; para autorizar o download do PDF pelo cliente.
                </p>
              </div>

              {/* Order Status Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                {(['todos', 'pendente', 'pago', 'cancelado'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition ${
                      orderFilter === st ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                Nenhuma encomenda encontrada com o filtro selecionado.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-purple-200 bg-slate-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-purple-950 font-mono text-sm tracking-wide">
                          {order.reference}
                        </strong>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          order.status === 'pago'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'pendente'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('pt-AO')}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700">
                        <strong>Cliente:</strong> {order.customerName} · <strong>WhatsApp:</strong> {order.customerWhatsApp}
                      </div>

                      <div className="text-xs text-slate-500">
                        <strong>Guias:</strong> {order.items.map(i => i.title).join(', ')}
                      </div>

                      {order.paymentProofNote && (
                        <div className="text-[11px] text-purple-900 bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                          <strong>Nota do cliente:</strong> {order.paymentProofNote}
                        </div>
                      )}

                      {order.paymentProofFile && (
                        <div className="pt-1">
                          <a
                            href={order.paymentProofFile}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-purple-700 underline font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Ver Comprovativo Anexado</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Order Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <div className="text-right pr-3 font-mono font-bold text-slate-900 text-sm">
                        {order.totalKz.toLocaleString('pt-AO')} Kz
                      </div>

                      {order.status !== 'pago' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'pago')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmar Pagamento</span>
                        </button>
                      )}

                      {order.status !== 'pendente' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'pendente')}
                          className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-semibold transition"
                        >
                          Marcar Pendente
                        </button>
                      )}

                      {order.status !== 'cancelado' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'cancelado')}
                          className="px-2.5 py-1.5 text-slate-400 hover:text-rose-600 text-xs font-semibold transition"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATÁLOGO & PREÇOS */}
        {activeTab === 'catalogo' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Catálogo Administrável de Guias Digitais
                </h3>
                <p className="text-xs text-slate-500">
                  Edita preços em Kz (incluindo o preço de teste de 1.000 Kz), páginas, títulos e visibilidade.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsCreatingGuide(true);
                  setEditingGuide({
                    id: 'guia-' + Date.now(),
                    title: '',
                    slug: '',
                    shortDescription: '',
                    description: '',
                    category: 'cabelo-natural',
                    priceKz: 1000,
                    pages: 20,
                    format: 'PDF Digital Interativo',
                    coverImage: guides[0]?.coverImage || '',
                    isFeatured: false,
                    isActive: true,
                    sampleExcerpt: {
                      chapterTitle: 'Capítulo 1: Introdução Prática',
                      text: 'Conteúdo demonstrativo introdutório.',
                      keyPoints: ['Dica 1', 'Dica 2', 'Dica 3'],
                    },
                    tableOfContents: ['1. Capítulo 1', '2. Capítulo 2'],
                  });
                }}
                className="py-2 px-3.5 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Novo Guia</span>
              </button>
            </div>

            <div className="space-y-3">
              {guides.map(guide => (
                <div
                  key={guide.id}
                  className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/40"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {guide.title}
                        </h4>
                        {!guide.isActive && (
                          <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                            Inativo
                          </span>
                        )}
                        {guide.isFree && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            Grátis
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {guide.format} · {guide.pages} págs · Categoria: {guide.category}
                      </div>
                      <div className="text-xs font-bold text-purple-950 font-mono mt-1">
                        Preço Atual: {guide.priceKz.toLocaleString('pt-AO')} Kz
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingGuide(guide)}
                      className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-purple-700" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleDeleteGuide(guide.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      aria-label="Eliminar guia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit / Create Guide Modal */}
            {editingGuide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
                <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 my-auto max-h-[90vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">
                      {isCreatingGuide ? 'Adicionar Novo Guia Digital' : `Editar: ${editingGuide.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingGuide(null);
                        setIsCreatingGuide(false);
                      }}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveGuide} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Título do Guia:</label>
                      <input
                        type="text"
                        required
                        value={editingGuide.title}
                        onChange={e => setEditingGuide({ ...editingGuide, title: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-purple-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Preço em Kz:</label>
                        <input
                          type="number"
                          required
                          value={editingGuide.priceKz}
                          onChange={e => setEditingGuide({ ...editingGuide, priceKz: Number(e.target.value) })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Número de Páginas:</label>
                        <input
                          type="number"
                          required
                          value={editingGuide.pages}
                          onChange={e => setEditingGuide({ ...editingGuide, pages: Number(e.target.value) })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Descrição Curta:</label>
                      <textarea
                        rows={2}
                        required
                        value={editingGuide.shortDescription}
                        onChange={e => setEditingGuide({ ...editingGuide, shortDescription: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Descrição Completa:</label>
                      <textarea
                        rows={3}
                        required
                        value={editingGuide.description}
                        onChange={e => setEditingGuide({ ...editingGuide, description: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingGuide.isActive}
                          onChange={e => setEditingGuide({ ...editingGuide, isActive: e.target.checked })}
                          className="rounded text-purple-900"
                        />
                        <span className="font-semibold text-slate-700">Ativo no Catálogo</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingGuide.isFeatured}
                          onChange={e => setEditingGuide({ ...editingGuide, isFeatured: e.target.checked })}
                          className="rounded text-purple-900"
                        />
                        <span className="font-semibold text-slate-700">Em Destaque</span>
                      </label>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGuide(null);
                          setIsCreatingGuide(false);
                        }}
                        className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-purple-950 text-white font-bold rounded-xl hover:bg-purple-900 transition"
                      >
                        Guardar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONFIGURAÇÕES DE PAGAMENTO (MANUEL MARCOLINO MIRANDA) */}
        {activeTab === 'configuracoes' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Configurações de Pagamento e Contactos Oficiais
              </h3>
              <p className="text-xs text-slate-500">
                Altera o IBAN, Multicaixa Express e número de WhatsApp em tempo real sem precisar de modificar o código da aplicação.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dados de pagamento e contactos atualizados com sucesso!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome do Titular:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.ownerName}
                    onChange={e => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-medium"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Proprietário da marca e dos guias.</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome da Marca:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.brandName}
                    onChange={e => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">IBAN Bancário Angolano:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.iban}
                    onChange={e => setSettingsForm({ ...settingsForm, iban: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-mono text-purple-950 font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Ex: AO06.0040.0000.XXXX.XXXX.XXXX.X</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome do Banco:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.bankName}
                    onChange={e => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contacto Multicaixa Express:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.multicaixaPhone}
                    onChange={e => setSettingsForm({ ...settingsForm, multicaixaPhone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-mono text-purple-950 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Oficial de Apoio:</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.officialWhatsApp}
                    onChange={e => setSettingsForm({ ...settingsForm, officialWhatsApp: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-mono text-purple-950 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Link do Facebook:</label>
                  <input
                    type="url"
                    value={settingsForm.facebookUrl}
                    onChange={e => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email de Apoio:</label>
                  <input
                    type="email"
                    value={settingsForm.supportEmail}
                    onChange={e => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
                >
                  Guardar Configurações
                </button>
              </div>
            </form>

            {/* Database Backup Section */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Cópia de Segurança e Restauro da Base de Dados
              </h4>
              <p className="text-xs text-slate-500">
                Guarda um ficheiro com todos os guias, encomendas, pagamentos e definições.
              </p>

              {backupNotice && (
                <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl text-xs border border-purple-200">
                  {backupNotice}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportJSON}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-purple-700" />
                  <span>Exportar Backup (JSON)</span>
                </button>

                <label className="cursor-pointer py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition border border-slate-300">
                  <Upload className="w-3.5 h-3.5 text-purple-700" />
                  <span>Restaurar Backup (JSON)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CUPÕES DE DESCONTO */}
        {activeTab === 'promos' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Gestão de Cupões de Desconto
              </h3>
              <p className="text-xs text-slate-500">
                Cria códigos promocionais para impulsionar as tuas vendas no WhatsApp e Facebook.
              </p>
            </div>

            {/* Create Promo Form */}
            <form onSubmit={handleCreatePromo} className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col sm:flex-row items-end gap-3 text-xs">
              <div className="flex-1 w-full">
                <label className="block font-bold text-purple-950 mb-1">Código do Cupão:</label>
                <input
                  type="text"
                  required
                  value={newPromoCode}
                  onChange={e => setNewPromoCode(e.target.value.toUpperCase())}
                  placeholder="Ex: NOVOANO15"
                  className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 uppercase font-mono font-bold"
                />
              </div>

              <div className="w-full sm:w-40">
                <label className="block font-bold text-purple-950 mb-1">Desconto (%):</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  required
                  value={newPromoDiscount}
                  onChange={e => setNewPromoDiscount(Number(e.target.value))}
                  className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto py-2.5 px-4 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-xl shrink-0"
              >
                Criar Cupão
              </button>
            </form>

            {/* Promo List */}
            <div className="space-y-2">
              {promos.map(promo => (
                <div
                  key={promo.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-purple-950 text-sm">{promo.code}</span>
                    <span className="text-slate-500 font-semibold">Desconto: {promo.discountPercentage}%</span>
                    <span className="text-slate-400">· {promo.usageCount} utilizações</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePromo(promo)}
                      className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${
                        promo.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {promo.isActive ? 'Ativo' : 'Pausado'}
                    </button>

                    <button
                      onClick={() => handleDeletePromo(promo.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GUIA DE PUBLICAÇÃO & CONVERSÃO APK */}
        {activeTab === 'publicacao' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 uppercase tracking-widest bg-purple-50 px-2.5 py-0.5 rounded-full mb-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                <span>Instruções Transparentes de Publicação</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Como Publicar na Web e Converter em APK Android
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Orientações reais para Manuel Marcolino Miranda publicar este projeto com capital zero e gerar a app Android.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              
              {/* Step 1: PWA Immediate Install */}
              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-2">
                <h4 className="font-bold text-purple-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1. A PWA já está funcional e instalável no telemóvel!
                </h4>
                <p>
                  A aplicação possui <strong>Service Worker</strong>, <strong>Manifesto PWA</strong> e ícones de 192px e 512px.
                  Qualquer cliente em Angola com Google Chrome ou Samsung Internet pode aceder ao link da aplicação e clicar em <strong>&ldquo;Instalar aplicação&rdquo;</strong> para tê-la como ícone nativo no ecrã inicial do telemóvel Android.
                </p>
              </div>

              {/* Step 2: Free Cloud Hosting */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  2. Publicação Gratuita na Web (Hospedagem Zero Custos)
                </h4>
                <p>
                  Para colocar a aplicação online com o teu próprio domínio ou subdomínio gratuito:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 ml-1">
                  <li>Cria uma conta gratuita no <strong>Render.com</strong>, <strong>Vercel.com</strong> ou <strong>Railway.app</strong>.</li>
                  <li>Conecta o teu repositório de código (GitHub ou upload direto).</li>
                  <li>Comando de compilação: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">npm run build</code></li>
                  <li>Pasta de saída: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">dist</code></li>
                  <li>A aplicação terá SSL (HTTPS) automático, requisito obrigatório para a instalação PWA e pagamentos seguros.</li>
                </ol>
              </div>

              {/* Step 3: Converting to Native Android APK */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  3. Conversão para APK Android (via PWABuilder ou Bubblewrap)
                </h4>
                <p>
                  Quando quiseres empacotar a aplicação num ficheiro <code className="font-mono bg-slate-200 px-1 rounded">.apk</code> ou publicar na Google Play Store de Angola:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-1">
                  <li><strong>Opção 1 (PWABuilder - Mais Fácil):</strong> Acede a <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-purple-700 underline font-semibold">PWABuilder.com</a>, insere o URL público da tua aplicação e clica em &ldquo;Generate Android Package&rdquo;. Ele gera o ficheiro APK e AAB pronto para download!</li>
                  <li><strong>Opção 2 (Bubblewrap / CLI):</strong> O Google fornece a ferramenta oficial de Trusted Web Activity (TWA) para gerar pacotes Android com alto desempenho.</li>
                </ul>
              </div>

              {/* Transparency Notice */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <strong>Nota de Transparência:</strong>
                <p>
                  Conforme as diretrizes responsáveis do projeto, o ficheiro APK é compilado com a tua chave de assinatura no teu ambiente de publicação. Não fornecemos ficheiros APK gerados sem as tuas chaves de desenvolvedor.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
