import React, { useState } from 'react';
import { storage } from '../services/storage';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  ownerName: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  ownerName,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = storage.loginAdmin(password);
    if (success) {
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Palavra-passe incorreta. Acesso reservado ao proprietário.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-900 text-amber-300 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Acesso do Proprietário
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <p className="text-xs text-slate-600">
            Painel administrativo privado de <strong>{ownerName}</strong> para validação de pagamentos e edição de guias.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Palavra-passe de Acesso:
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduz a palavra-passe..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:bg-white"
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
            <p className="text-[10px] text-slate-400 mt-1.5">
              Credencial padrão de configuração: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">angola2026</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Entrar no Painel Privado
          </button>
        </form>

      </div>
    </div>
  );
};
