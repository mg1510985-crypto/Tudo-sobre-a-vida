import React, { useState } from 'react';
import { Guide, PromoCode } from '../types';
import { storage } from '../services/storage';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Guide[];
  onRemoveItem: (guideId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedPromo?: PromoCode, discountAmount?: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceKz, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercentage) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (!couponCode.trim()) return;

    const promo = storage.validatePromoCode(couponCode);
    if (promo) {
      setAppliedPromo(promo);
      setCouponSuccess(`Cupão "${promo.code}" aplicado! Desconto de ${promo.discountPercentage}%.`);
    } else {
      setCouponError('Cupão inválido ou expirado. Tenta "BELEZA10".');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedPromo(null);
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-900" />
            <h3 className="font-display text-base font-bold text-slate-900">
              O Teu Carrinho ({cartItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">O teu carrinho está vazio</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Explora o nosso catálogo e seleciona os guias ideais para os cuidados com o teu cabelo.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-semibold hover:bg-purple-800 transition"
              >
                Ver Catálogo de Guias
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-14 h-18 object-cover rounded-lg shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h5>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.format} · {item.pages} págs
                    </div>
                    <div className="text-xs font-bold text-purple-950 font-mono mt-1">
                      {item.priceKz.toLocaleString('pt-AO')} Kz
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition"
                    aria-label={`Remover ${item.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 underline"
                >
                  Esvaziar carrinho
                </button>
              </div>

              {/* Promo code box */}
              <div className="mt-4 p-3 bg-purple-50/70 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950 mb-2">
                  <Tag className="w-3.5 h-3.5 text-purple-700" />
                  <span>Tens um código de desconto?</span>
                </div>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-purple-200 text-xs">
                    <div>
                      <span className="font-bold text-purple-900">{appliedPromo.code}</span>
                      <span className="text-slate-500 text-[11px] ml-1.5">
                        (-{appliedPromo.discountPercentage}%)
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-rose-600 hover:underline text-[11px] font-medium"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Ex: BELEZA10"
                      className="flex-1 bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-purple-600 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Aplicar
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1.5">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-700 mt-1.5">{couponSuccess}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cartItems.length} itens):</span>
                <span className="font-mono tabular-nums">{subtotal.toLocaleString('pt-AO')} Kz</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Desconto ({appliedPromo?.code}):</span>
                  <span className="font-mono tabular-nums">-{discountAmount.toLocaleString('pt-AO')} Kz</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-purple-950 pt-2 border-t border-slate-100">
                <span>Total a Pagar:</span>
                <span className="font-mono tabular-nums text-lg">{total.toLocaleString('pt-AO')} Kz</span>
              </div>
            </div>

            <button
              onClick={() => {
                onProceedToCheckout(appliedPromo || undefined, discountAmount);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-950 to-purple-900 hover:from-purple-900 hover:to-purple-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 active:scale-98 transition"
            >
              <span>Avançar para Pagamento</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dados protegidos · Pagamento verificado em Angola</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
