/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { storage } from './services/storage';
import { downloadGuidePDF } from './services/pdfGenerator';
import { Guide, Order, AdminSettings, PromoCode } from './types';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SamplePreviewModal } from './components/SamplePreviewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { MyDownloadsView } from './components/MyDownloadsView';
import { OrderTrackerView } from './components/OrderTrackerView';
import { EducationalHub } from './components/EducationalHub';
import { SocialShareModal } from './components/SocialShareModal';
import { AdminPortal } from './components/AdminPortal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LegalModal } from './components/LegalModals';
import { Footer } from './components/Footer';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';

import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('catalogo');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(storage.getSettings());
  const [cart, setCart] = useState<Guide[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [sampleGuide, setSampleGuide] = useState<Guide | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPromo, setCheckoutPromo] = useState<PromoCode | undefined>(undefined);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacidade' | 'termos' | 'reembolso' | 'contacto' | null>(null);

  // Admin status
  const [isAdmin, setIsAdmin] = useState(false);

  // Free download feedback
  const [freeDownloadNotice, setFreeDownloadNotice] = useState<string | null>(null);

  const refreshAll = () => {
    setGuides(storage.getGuides());
    setSettings(storage.getSettings());
    setIsAdmin(storage.isAdminLoggedIn());
  };

  useEffect(() => {
    refreshAll();

    const handleUpdate = () => refreshAll();
    window.addEventListener('bca_storage_updated', handleUpdate);
    return () => window.removeEventListener('bca_storage_updated', handleUpdate);
  }, []);

  // Cart operations
  const handleAddToCart = (guide: Guide) => {
    if (guide.isFree) {
      handleDirectDownloadFree(guide);
      return;
    }

    if (!cart.some(item => item.id === guide.id)) {
      setCart([...cart, guide]);
      setIsCartOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleRemoveFromCart = (guideId: string) => {
    setCart(cart.filter(item => item.id !== guideId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Direct Free Guide Download
  const handleDirectDownloadFree = async (guide: Guide) => {
    try {
      setFreeDownloadNotice(`A gerar download gratuito do "${guide.title}"...`);
      await downloadGuidePDF(guide, undefined, 'Leitor Estimado');
      setFreeDownloadNotice(`Download gratuito do "${guide.title}" concluído com sucesso!`);
      setTimeout(() => setFreeDownloadNotice(null), 4000);
    } catch (e) {
      console.error(e);
      alert('Erro ao transferir ficheiro gratuito. Tente novamente.');
      setFreeDownloadNotice(null);
    }
  };

  // Open Checkout
  const handleProceedToCheckout = (promo?: PromoCode, discount: number = 0) => {
    setCheckoutPromo(promo);
    setCheckoutDiscount(discount);
    setIsCheckoutOpen(true);
  };

  // Order Completed
  const handleOrderCompleted = (order: Order) => {
    setCart([]);
    setSuccessOrder(order);
  };

  // WhatsApp trigger
  const handleOpenWhatsApp = () => {
    const cleanPhone = settings.officialWhatsApp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Olá ${settings.ownerName}! Estou no site da Beleza Capilar Angola e gostaria de mais informações sobre os guias digitais de cuidados com o cabelo.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Admin access button handler
  const handleOpenAdmin = () => {
    if (isAdmin) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      
      {/* PWA Install Banner at very top */}
      <PWAInstallBanner />

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Free download floating notification */}
      {freeDownloadNotice && (
        <div className="fixed top-16 right-4 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-top-2">
          {freeDownloadNotice}
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.length}
        openCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'catalogo' && (
          <>
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreGuides={() => {
                const el = document.getElementById('catalogo');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenWhatsApp={handleOpenWhatsApp}
              onOpenShareModal={() => setIsShareOpen(true)}
              ownerName={settings.ownerName}
            />

            <ProductCatalog
              guides={guides}
              searchQuery={searchQuery}
              onSelectGuide={(g) => setSelectedGuide(g)}
              onPreviewSample={(g) => setSampleGuide(g)}
              onAddToCart={handleAddToCart}
              onDirectDownloadFree={handleDirectDownloadFree}
              cartItemIds={cart.map(c => c.id)}
            />

            <EducationalHub />
          </>
        )}

        {currentView === 'dicas' && (
          <EducationalHub />
        )}

        {currentView === 'downloads' && (
          <MyDownloadsView
            settings={settings}
            onExploreCatalog={() => setCurrentView('catalogo')}
          />
        )}

        {currentView === 'rastreio' && (
          <OrderTrackerView
            settings={settings}
            onGoToDownloads={() => setCurrentView('downloads')}
          />
        )}

        {currentView === 'admin' && (
          isAdmin ? (
            <AdminPortal
              onLogout={() => {
                storage.logoutAdmin();
                setIsAdmin(false);
                setCurrentView('catalogo');
              }}
              onRefreshSettings={refreshAll}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Sessão terminada ou não autorizada</h3>
              <p className="text-xs text-slate-500">Inicia sessão para gerir o painel da Beleza Capilar Angola.</p>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="py-2.5 px-5 bg-purple-950 text-white rounded-xl text-xs font-bold"
              >
                Iniciar Sessão de Administrador
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating WhatsApp Action Button for Easy Access */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Falar no WhatsApp com Manuel Marcolino Miranda"
        className="fixed bottom-5 right-5 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center border-2 border-white"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modals */}
      <ProductDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
        onAddToCart={handleAddToCart}
        onPreviewSample={(g) => setSampleGuide(g)}
        isInCart={selectedGuide ? cart.some(c => c.id === selectedGuide.id) : false}
        whatsappNumber={settings.officialWhatsApp}
        ownerName={settings.ownerName}
      />

      <SamplePreviewModal
        guide={sampleGuide}
        onClose={() => setSampleGuide(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedPromo={checkoutPromo}
        discountAmount={checkoutDiscount}
        settings={settings}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
        onGoToDownloads={() => {
          setSuccessOrder(null);
          setCurrentView('downloads');
        }}
        settings={settings}
      />

      <SocialShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        settings={settings}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdmin(true);
          setCurrentView('admin');
        }}
        ownerName={settings.ownerName}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        settings={settings}
      />

    </div>
  );
}
