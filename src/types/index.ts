export type GuideCategory = 
  | 'todos'
  | 'cabelo-natural'
  | 'cabelos-crespos'
  | 'rotinas-semanais'
  | 'trancas-protecao'
  | 'cronograma-capilar'
  | 'pacotes-completos';

export interface Guide {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: GuideCategory;
  priceKz: number;
  originalPriceKz?: number;
  pages: number;
  format: string; // e.g., 'PDF Digital Interativo'
  coverImage: string;
  isFeatured: boolean;
  isActive: boolean;
  isFree?: boolean;
  sampleExcerpt: {
    chapterTitle: string;
    text: string;
    keyPoints: string[];
  };
  tableOfContents: string[];
}

export type OrderStatus = 'pendente' | 'pago' | 'cancelado';

export interface OrderItem {
  guideId: string;
  title: string;
  priceKz: number;
  format: string;
  coverImage: string;
}

export interface Order {
  id: string;
  reference: string; // e.g. BCA-2026-8912
  customerName: string;
  customerWhatsApp: string;
  customerEmail?: string;
  items: OrderItem[];
  subtotalKz: number;
  discountKz: number;
  totalKz: number;
  promoCodeApplied?: string;
  paymentMethod: 'multicaixa_express' | 'transferencia_iban';
  status: OrderStatus;
  paymentProofNote?: string;
  paymentProofFile?: string; // base64 or URL
  createdAt: string;
  updatedAt: string;
  downloadAccessGranted: boolean;
  downloadCount: number;
}

export interface AdminSettings {
  ownerName: string;
  brandName: string;
  iban: string;
  bankName: string;
  multicaixaPhone: string;
  officialWhatsApp: string;
  facebookUrl: string;
  supportEmail: string;
  city: string;
  country: string;
  currency: string;
  initialTestPriceKz: number;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
  usageCount: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  createdAt: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  tips: string[];
  warning?: string;
}
