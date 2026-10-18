import React from 'react';
import { AdminSettings } from '../types';
import { X, ShieldCheck, FileText, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

interface LegalModalProps {
  type: 'privacidade' | 'termos' | 'reembolso' | 'contacto' | null;
  onClose: () => void;
  settings: AdminSettings;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  settings,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 my-auto max-h-[90vh] overflow-y-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {type === 'privacidade' && <ShieldCheck className="w-5 h-5 text-purple-700" />}
            {type === 'termos' && <FileText className="w-5 h-5 text-purple-700" />}
            {type === 'reembolso' && <RefreshCw className="w-5 h-5 text-purple-700" />}
            {type === 'contacto' && <Mail className="w-5 h-5 text-purple-700" />}

            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              {type === 'privacidade' && 'Política de Privacidade e Proteção de Dados'}
              {type === 'termos' && 'Termos de Utilização de Produtos Digitais'}
              {type === 'reembolso' && 'Política de Reembolso e Garantia'}
              {type === 'contacto' && 'Contactos Oficiais & Apoio ao Cliente'}
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

        {/* Content */}
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          
          {type === 'privacidade' && (
            <>
              <p>
                A <strong>Beleza Capilar Angola</strong>, sob a titularidade e responsabilidade de <strong>{settings.ownerName}</strong>, com sede em {settings.city}, Angola, está comprometida com a transparência e a segurança das informações dos seus utilizadores.
              </p>
              <h4 className="font-bold text-slate-900">1. Dados Recolhidos</h4>
              <p>
                Recolhemos unicamente os dados estritamente necessários para a entrega e suporte dos produtos digitais adquiridos: nome completo, contacto de WhatsApp e endereço de correio eletrónico (opcional).
              </p>
              <h4 className="font-bold text-slate-900">2. Segurança de Pagamentos</h4>
              <p>
                Nunca solicitamos, guardamos ou processamos códigos secretos de telemóvel, senhas de cartões multicaixa, PINs bancários ou dados confidenciais de acesso a contas. Todas as operações de pagamento ocorrem diretamente nas aplicações oficiais dos bancos angolanos (Multicaixa Express ou Internet Banking).
              </p>
              <h4 className="font-bold text-slate-900">3. Não Partilha de Dados</h4>
              <p>
                Os seus dados de contacto nunca serão vendidos, cedidos ou partilhados com terceiros para fins de marketing sem o seu consentimento explícito.
              </p>
            </>
          )}

          {type === 'termos' && (
            <>
              <p>
                Ao encomendar e descarregar qualquer guia ou produto digital na <strong>Beleza Capilar Angola</strong>, o cliente concorda com os seguintes termos:
              </p>
              <h4 className="font-bold text-slate-900">1. Propriedade Intelectual</h4>
              <p>
                Todos os textos, e-books, ilustrações, cronogramas e materiais disponibilizados são da autoria e propriedade intelectual exclusiva de <strong>{settings.ownerName}</strong> e da marca <strong>Beleza Capilar Angola</strong>.
              </p>
              <h4 className="font-bold text-slate-900">2. Licença de Uso Pessoal</h4>
              <p>
                A compra confere uma licença individual, pessoal e intransmissível. É expressamente proibida a revenda, partilha pública em grupos, cópia desautorizada ou distribuição comercial dos ficheiros PDF sem autorização prévia por escrito do autor.
              </p>
              <h4 className="font-bold text-slate-900">3. Liberação de Ficheiros</h4>
              <p>
                Os ficheiros digitais completos são libertados exclusivamente após a confirmação do pagamento no sistema.
              </p>
            </>
          )}

          {type === 'reembolso' && (
            <>
              <p>
                Prezamos pela transparência e honestidade em todas as relações com os nossos clientes em Angola.
              </p>
              <h4 className="font-bold text-slate-900">1. Natureza dos Produtos Digitais</h4>
              <p>
                Por se tratar de conteúdos de entrega digital imediata em formato PDF que podem ser guardados no dispositivo, não realizamos devoluções automáticas após o download efetivo do material.
              </p>
              <h4 className="font-bold text-slate-900">2. Incompatibilidade ou Ficheiro Corrompido</h4>
              <p>
                Caso ocorra qualquer dificuldade técnica comprovada no download ou abertura do ficheiro no seu telemóvel Android, a nossa equipa reenviará o material diretamente por WhatsApp ou email no prazo máximo de 24 horas.
              </p>
              <h4 className="font-bold text-slate-900">3. Cancelamento Antes da Entrega</h4>
              <p>
                Se realizou o pedido por engano e ainda não descarregou o ficheiro, entre em contacto imediatamente com o nosso WhatsApp para ajustarmos a sua encomenda.
              </p>
            </>
          )}

          {type === 'contacto' && (
            <div className="space-y-4">
              <p>
                Precisas de ajuda com a tua encomenda, dúvidas sobre qual o melhor guia para o teu cabelo ou esclarecimentos sobre pagamentos?
              </p>
              
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>WhatsApp Oficial: <strong>{settings.officialWhatsApp}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Email de Apoio: <strong>{settings.supportEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Localização: <strong>{settings.city}, {settings.country}</strong></span>
                </div>
              </div>

              <p className="text-slate-500 text-[11px]">
                Horário de Atendimento no WhatsApp: Segunda a Sábado, das 08h às 19h (Hora de Luanda).
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-950 text-white rounded-xl text-xs font-semibold hover:bg-purple-900 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
