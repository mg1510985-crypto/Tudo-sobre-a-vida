import { Guide, Order, AdminSettings, PromoCode, CustomerUser } from '../types';

// Image paths generated for the app
import heroImage from '../assets/images/hero_beleza_angola_1792286558042.jpg';
import guideNatural from '../assets/images/guide_cabelo_natural_1792286558396.jpg';
import guideCrespos from '../assets/images/guide_cabelos_crespos_1792286559259.jpg';
import guideTrancas from '../assets/images/guide_trancas_protecao_1792286558940.jpg';
import guideRotina from '../assets/images/guide_cronograma_capilar_1792286559747.jpg';

const STORAGE_KEYS = {
  GUIDES: 'bca_guides_v1',
  ORDERS: 'bca_orders_v1',
  SETTINGS: 'bca_settings_v1',
  PROMOS: 'bca_promos_v1',
  CURRENT_USER: 'bca_current_user_v1',
  ADMIN_AUTH: 'bca_admin_session_v1',
  DOWNLOADS_HISTORY: 'bca_downloads_history_v1',
};

const DEFAULT_SETTINGS: AdminSettings = {
  ownerName: 'Manuel Marcolino Miranda',
  brandName: 'BELEZA CAPILAR ANGOLA',
  iban: 'AO06.0040.0000.8923.4109.8712.4',
  bankName: 'Banco Angolano de Investimentos (BAI)',
  multicaixaPhone: '+244 923 456 789',
  officialWhatsApp: '+244 923 456 789',
  facebookUrl: 'https://facebook.com/belezacapilarangola',
  supportEmail: 'apoio@belezacapilar.ao',
  city: 'Luanda',
  country: 'Angola',
  currency: 'Kz',
  initialTestPriceKz: 1000,
};

const INITIAL_GUIDES: Guide[] = [
  {
    id: 'guia-cabelo-natural',
    title: 'Guia de Cuidados com o Cabelo Natural',
    slug: 'guia-cabelo-natural',
    shortDescription: 'Fundamentos essenciais, técnicas de hidratação profunda e retenção de comprimento para o clima de Angola.',
    description: 'Um manual prático e descomplicado para aprender a amar e cuidar do teu cabelo natural no dia a dia. Descobre como combater o ressecamento do cacimbo e poeira, escolher os produtos certos e criar uma rotina simples que realmente funciona.',
    category: 'cabelo-natural',
    priceKz: 1000, // Preço inicial de teste solicitado
    originalPriceKz: 2500,
    pages: 32,
    format: 'PDF Digital Interativo',
    coverImage: guideNatural,
    isFeatured: true,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Capítulo 1: Compreender o Fio Natural em Clima Tropical',
      text: 'O cabelo natural africano possui uma estrutura em espiral que dificulta a passagem da oleosidade natural da raiz até às pontas. Em Angola, as variações de humidade e a água com alto teor de calcário em algumas zonas exigem técnicas específicas de selagem com óleos vegetais ligeiros.',
      keyPoints: [
        'A importância da acidificação com água mineral ou vinagre de maçã diluído para fechar as cutículas.',
        'Como identificar a porosidade sem testes falíveis: observação do tempo de secagem.',
        'A regra dos 3 passos: Hidratar com água pura, Nutrir com óleo vegetal e Selar com manteiga de karité pura.'
      ]
    },
    tableOfContents: [
      '1. Anatomia do Fio e Porosidade Real',
      '2. Lavagem Suave sem Efeito Palha',
      '3. O Método LOC Adaptado aos Óleos Locais',
      '4. Técnicas de Selagem das Pontas',
      '5. Como Evitar Nós de Fada e Quebra Silenciosa',
      '6. Rotina Noturna com Touca de Cetim'
    ]
  },
  {
    id: 'guia-cabelos-crespos',
    title: 'Guia de Cuidados com Cabelos Crespos',
    slug: 'guia-cabelos-crespos',
    shortDescription: 'Especializado em fios tipo 4A, 4B e 4C: máxima definição, maleabilidade e nutrição profunda.',
    description: 'Dedicado exclusivamente aos cabelos com curvatura bem fechada e alto fator de encolhimento. Aprende a manipular os teus caracóis sem dor, reduzir o tempo de finalização e manter os fios nutridos por vários dias.',
    category: 'cabelos-crespos',
    priceKz: 2500,
    originalPriceKz: 3500,
    pages: 28,
    format: 'PDF Digital Interativo',
    coverImage: guideCrespos,
    isFeatured: true,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Capítulo 2: O Fator Encolhimento e a Saúde da Fibra',
      text: 'O encolhimento do cabelo crespo tipo 4 não é defeito, é a maior prova da sua elasticidade e saúde! Fios elásticos que voltam à forma espiralada demonstram córtex intacto. A chave está em hidratar com produtos ricos em humectantes.',
      keyPoints: [
        'Técnica Banding e Twist-out para alongar sem calor térmico danoso.',
        'Manteigas recomendadas: Karité e Cacau para proteger as pontas.',
        'Frequência ideal de lavagem para não desidratar o couro cabeludo.'
      ]
    },
    tableOfContents: [
      '1. Identificação exata das curvaturas 4A, 4B e 4C',
      '2. Desmistificando o Fator Encolhimento',
      '3. Receitas de Máscaras com Ingredientes Acessíveis',
      '4. Finalização Rápida para o Trabalho e Escola',
      '5. Day After Impecável sem Molhar Todo o Cabelo'
    ]
  },
  {
    id: 'rotina-sete-dias',
    title: 'Rotina Capilar de Sete Dias',
    slug: 'rotina-sete-dias',
    shortDescription: 'Passo a passo diário detalhado para quem tem pouco tempo e quer resultados visíveis em uma semana.',
    description: 'Criado para mulheres e homens ocupados que não dispõem de horas diárias para cuidar do cabelo. Um roteiro prático do Dia 1 ao Dia 7, com apenas 10 minutos diários de manutenção.',
    category: 'rotinas-semanais',
    priceKz: 1800,
    originalPriceKz: 2800,
    pages: 20,
    format: 'PDF Digital Interativo',
    coverImage: guideRotina,
    isFeatured: false,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Dia 1: O Dia da Lavagem Estratégica (Wash Day)',
      text: 'Começamos a semana com o ritual de renovação. Pré-poo com óleo morno durante 20 minutos antes do champô para blindar os fios da perda de hidratação durante a lavagem.',
      keyPoints: [
        'Segunda-feira: Pré-poo + Lavagem + Máscara Nutritiva.',
        'Terça a Quinta-feira: Refresh matinal com spray de água e óleo de rícino.',
        'Sexta-feira a Domingo: Manutenção de penteado protetor.'
      ]
    },
    tableOfContents: [
      'Dia 1: O Wash Day Perfeito e Sem Complicação',
      'Dia 2: Selagem e Proteção Inicial',
      'Dia 3: Avaliação de Humidade e Massagem com Óleo de Rícino',
      'Dia 4: Mini-Rehidratação Express',
      'Dia 5: Penteado Protetor para o Fim de Semana',
      'Dias 6 e 7: Descanso Capilar e Preparação da Próxima Semana'
    ]
  },
  {
    id: 'guia-cuidados-trancas',
    title: 'Guia de Cuidados com Tranças',
    slug: 'guia-cuidados-trancas',
    shortDescription: 'Como manter o couro cabeludo limpo, evitar a tração na raiz e garantir crescimento saudável.',
    description: 'As tranças africanas são elegantes e protetoras, mas o descuido pode causar alopecia de tração e quebra na raiz. Este guia ensina a higienizar o couro cabeludo, hidratar os fios por baixo da fibra sintética e retirar as tranças com segurança.',
    category: 'trancas-protecao',
    priceKz: 2200,
    originalPriceKz: 3200,
    pages: 24,
    format: 'PDF Digital Interativo',
    coverImage: guideTrancas,
    isFeatured: true,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Capítulo 3: Limpeza do Couro Cabeludo Sem Molhar a Fibra',
      text: 'A maior causa de coceira e odor nas tranças é o acúmulo de suor e pó. Não precisas de molhar toda a trança: utiliza discos de algodão humedecidos com tónico adstringente suave de alecrim ou chá verde.',
      keyPoints: [
        'Como preparar o cabelo 48 horas antes de colocar as tranças.',
        'Prevenção de bolinhas brancas e tensão na linha da testa (Baby hairs).',
        'Tempo limite seguro: nunca ultrapassar 6 a 8 semanas com a mesma trança.'
      ]
    },
    tableOfContents: [
      '1. Preparação Pré-Trança: Fortalecimento Obrigatório',
      '2. Alerta Vermelho: Como Identificar Tensão Perigosa',
      '3. Spray Higienizador Caseiro para o Couro Cabeludo',
      '4. Hidratação dos Fios Reais Durante o Penteado',
      '5. Técnica Segura de Remoção Sem Cortar o Cabelo',
      '6. Cuidados Pós-Trança: Desembaraço Cuidadoso'
    ]
  },
  {
    id: 'guia-desembaraco-prevencao-quebra',
    title: 'Guia de Desembaraço e Prevenção da Quebra',
    slug: 'guia-desembaraco-prevencao-quebra',
    shortDescription: 'Técnicas mecânicas sem dor, ferramentas adequadas e segredos para reter comprimento sem tesoura.',
    description: 'A quebra mecânica durante o desembaraço é a principal razão pela qual muitas pessoas acreditam falsamente que o seu cabelo não cresce. Aprende o método das pontas à raiz, o uso correto dos dedos e os pentes ideais para não partir fios.',
    category: 'cabelo-natural',
    priceKz: 1500,
    originalPriceKz: 2400,
    pages: 18,
    format: 'PDF Digital Interativo',
    coverImage: guideNatural,
    isFeatured: false,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Capítulo 1: A Regra de Ouro: Nunca Desembaraçar a Seco',
      text: 'O cabelo afro seco tem baixa elasticidade mecânica. Ao passar um pente no cabelo seco, criam-se micro-fissuras no fio que culminam em quebra audível (o temido estalo). O desembaraço exige sempre um agente emoliente deslizante.',
      keyPoints: [
        'Finger detangling (desembaraço com os dedos) antes de qualquer escova.',
        'Divisão obrigatória do cabelo em 4 a 6 quadrantes.',
        'A ordem estrita de movimento: pontas -> meio -> raiz.'
      ]
    },
    tableOfContents: [
      '1. Por que o Fio Afro Quebra Facilmente',
      '2. Escolha das Ferramentas: Pentes de Dentes Largos vs Escovas Flexíveis',
      '3. A Fórmula Deslizante Caseira',
      '4. Passo a Passo do Desembaraço Indolor',
      '5. Como Lidar com Nós Apertados sem Puxar'
    ]
  },
  {
    id: 'calendario-semanal-cuidados',
    title: 'Calendário Semanal de Cuidados Capilares',
    slug: 'calendario-semanal-cuidados',
    shortDescription: 'Planificador visual e cronograma adaptável de 4 semanas para imprimir ou preencher no telemóvel.',
    description: 'Uma ferramenta prática e visual para organizar os teus tratamentos de Hidratação, Nutrição e Reconstrução mês a mês. Inclui fichas de registo de evolução e metas de retenção.',
    category: 'cronograma-capilar',
    priceKz: 1200,
    originalPriceKz: 2000,
    pages: 16,
    format: 'PDF Digital Interativo + Fichas Imprimíveis',
    coverImage: guideRotina,
    isFeatured: false,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Módulo 1: Montando o Teu Ciclo de 4 Semanas',
      text: 'A maioria dos cabelos necessita de mais nutrição do que reconstrução proteica. Excesso de queratina enrijece o fio crespo, enquanto a humidade devolve o balanço e a elasticidade.',
      keyPoints: [
        'Semana 1: Hidratação profunda + Óleo de coco.',
        'Semana 2: Nutrição intensa com manteiga vegetal.',
        'Semana 3: Hidratação com babosa/aloé vera.',
        'Semana 4: Reconstrução suave e acidificação de fecho.'
      ]
    },
    tableOfContents: [
      '1. O Teste Real de Necessidade Capilar',
      '2. Matriz Mensal para Impressão ou Telemóvel',
      '3. Registo de Crescimento e Retenção',
      '4. Adaptação para Crianças e Adolescentes'
    ]
  },
  {
    id: 'pacote-beleza-capilar-completo',
    title: 'Pacote Completo de Guias de Beleza Capilar',
    slug: 'pacote-beleza-capilar-completo',
    shortDescription: 'A coletânea definitiva com os 6 guias completos + bónus exclusivo de receitas capilares caseiras.',
    description: 'Todos os conhecimentos reunidos num só pacote promocional com mais de 120 páginas de informação prática, responsável e comprovada. Economiza mais de 4.000 Kz em relação à compra individual!',
    category: 'pacotes-completos',
    priceKz: 6500,
    originalPriceKz: 10700,
    pages: 128,
    format: 'Coletânea Completa em PDF Digital',
    coverImage: heroImage,
    isFeatured: true,
    isActive: true,
    sampleExcerpt: {
      chapterTitle: 'Introdução Geral pelo Autor Manuel Marcolino Miranda',
      text: 'Este pacote representa o compêndio mais honesto e acessível sobre beleza capilar para o nosso contexto em Angola. Criado para que não precises de gastar fortunas em produtos importados inalcançáveis, mas sim entender os princípios da biologia do teu fio e potencializar o que temos à mão.',
      keyPoints: [
        'Acesso vitalício a todos os 6 guias temáticos.',
        'Bónus: Guia de Ingredientes Naturais Angolanos (Óleo de Palma, Abacate, Rícino e Mucua).',
        'Direito a todas as futuras atualizações gratuitas.'
      ]
    },
    tableOfContents: [
      'Volume I: Cabelo Natural & Fisiologia',
      'Volume II: Cabelos Crespos e Tipos 4',
      'Volume III: Rotina de 7 Dias',
      'Volume IV: Cuidados e Proteção com Tranças',
      'Volume V: Prevenção de Quebra & Desembaraço',
      'Volume VI: Calendário & Cronograma Visual',
      'Capítulo Bónus: Ervas e Óleos de Angola'
    ]
  },
  {
    id: 'mini-guia-gratis-boas-vindas',
    title: 'Mini-Guia: 5 Princípios do Cabelo Saudável',
    slug: 'mini-guia-gratis-boas-vindas',
    shortDescription: 'Guia de introdução 100% gratuito para começar a cuidar do cabelo hoje mesmo sem custos.',
    description: 'Um presente de boas-vindas de Manuel Marcolino Miranda para a comunidade. Cinco regras de ouro simples e imediatas para evitar danos diários no teu cabelo.',
    category: 'cabelo-natural',
    priceKz: 0,
    originalPriceKz: 1000,
    pages: 10,
    format: 'PDF Digital Gratuito',
    coverImage: guideNatural,
    isFeatured: false,
    isActive: true,
    isFree: true,
    sampleExcerpt: {
      chapterTitle: 'Princípio 1: Água é o Único Hidratante Real',
      text: 'Nenhum óleo ou manteiga hidrata o cabelo; óleos apenas nutrem e selam. A hidratação vem sempre da molécula de água pura. Por isso, nunca apliques óleo em cabelo ressequido sem antes humedecê-lo!',
      keyPoints: [
        'Usa sempre água limpa como base antes de qualquer creme.',
        'Troca a fronha de algodão comum por cetim para reter a humidade.',
        'Nunca durmas com o cabelo molhado com nós apertados.'
      ]
    },
    tableOfContents: [
      '1. O Mito da Hidratação a Seco',
      '2. Como a Fronha de Algodão Rouba Água do Fio',
      '3. A Temperatura Certa da Água na Lavagem',
      '4. Penteados que Salvam vs Penteados que Quebram',
      '5. Onde Começar a Tua Jornada'
    ]
  }
];

const INITIAL_PROMOS: PromoCode[] = [
  { id: 'promo-1', code: 'BELEZA10', discountPercentage: 10, isActive: true, usageCount: 14 },
  { id: 'promo-2', code: 'ANGOLA20', discountPercentage: 20, isActive: true, usageCount: 6 },
  { id: 'promo-3', code: 'MANUELVIP', discountPercentage: 15, isActive: true, usageCount: 22 },
];

class StorageService {
  private notifyListeners() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bca_storage_updated'));
    }
  }

  // GUIDES
  getGuides(): Guide[] {
    if (typeof window === 'undefined') return INITIAL_GUIDES;
    const stored = localStorage.getItem(STORAGE_KEYS.GUIDES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(INITIAL_GUIDES));
      return INITIAL_GUIDES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_GUIDES;
    }
  }

  getGuideById(id: string): Guide | undefined {
    return this.getGuides().find(g => g.id === id);
  }

  saveGuide(guide: Guide): void {
    const guides = this.getGuides();
    const index = guides.findIndex(g => g.id === guide.id);
    if (index >= 0) {
      guides[index] = guide;
    } else {
      guides.push(guide);
    }
    localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
    this.notifyListeners();
  }

  deleteGuide(id: string): void {
    const guides = this.getGuides().filter(g => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
    this.notifyListeners();
  }

  // ORDERS
  getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  }

  getOrderByReference(reference: string): Order | undefined {
    const cleanRef = reference.trim().toUpperCase();
    return this.getOrders().find(o => o.reference.toUpperCase() === cleanRef);
  }

  createOrder(data: {
    customerName: string;
    customerWhatsApp: string;
    customerEmail?: string;
    items: { guideId: string; title: string; priceKz: number; format: string; coverImage: string }[];
    paymentMethod: 'multicaixa_express' | 'transferencia_iban';
    promoCodeApplied?: string;
    discountKz?: number;
    paymentProofNote?: string;
    paymentProofFile?: string;
  }): Order {
    const subtotal = data.items.reduce((acc, curr) => acc + curr.priceKz, 0);
    const discount = data.discountKz || 0;
    const total = Math.max(0, subtotal - discount);

    // Generate clean human-readable reference e.g. BCA-2026-7482
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const reference = `BCA-2026-${randomCode}`;

    // If order total is 0 (e.g. Free guide), grant immediate download access
    const isFree = total === 0;

    const newOrder: Order = {
      id: 'order-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      reference,
      customerName: data.customerName,
      customerWhatsApp: data.customerWhatsApp,
      customerEmail: data.customerEmail,
      items: data.items,
      subtotalKz: subtotal,
      discountKz: discount,
      totalKz: total,
      promoCodeApplied: data.promoCodeApplied,
      paymentMethod: data.paymentMethod,
      status: isFree ? 'pago' : 'pendente',
      downloadAccessGranted: isFree,
      downloadCount: 0,
      paymentProofNote: data.paymentProofNote,
      paymentProofFile: data.paymentProofFile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: 'pendente' | 'pago' | 'cancelado'): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    orders[index].status = status;
    orders[index].downloadAccessGranted = status === 'pago';
    orders[index].updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return orders[index];
  }

  recordDownload(orderId: string): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.downloadCount = (order.downloadCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      this.notifyListeners();
    }
  }

  // SETTINGS
  getSettings(): AdminSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  updateSettings(settings: Partial<AdminSettings>): AdminSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.notifyListeners();
    return updated;
  }

  // PROMO CODES
  getPromoCodes(): PromoCode[] {
    if (typeof window === 'undefined') return INITIAL_PROMOS;
    const stored = localStorage.getItem(STORAGE_KEYS.PROMOS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(INITIAL_PROMOS));
      return INITIAL_PROMOS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_PROMOS;
    }
  }

  validatePromoCode(codeStr: string): PromoCode | null {
    const clean = codeStr.trim().toUpperCase();
    const promos = this.getPromoCodes();
    const found = promos.find(p => p.code.toUpperCase() === clean && p.isActive);
    return found || null;
  }

  savePromoCode(promo: PromoCode): void {
    const promos = this.getPromoCodes();
    const index = promos.findIndex(p => p.id === promo.id);
    if (index >= 0) {
      promos[index] = promo;
    } else {
      promos.push(promo);
    }
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
    this.notifyListeners();
  }

  deletePromoCode(id: string): void {
    const promos = this.getPromoCodes().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
    this.notifyListeners();
  }

  // CUSTOMER AUTH
  getCurrentCustomer(): CustomerUser | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  setCurrentCustomer(customer: CustomerUser | null): void {
    if (customer) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(customer));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    this.notifyListeners();
  }

  // ADMIN AUTH
  isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
  }

  loginAdmin(password: string): boolean {
    // Configurable admin password check
    // Manuel Marcolino Miranda default access
    if (password === 'angola2026' || password === 'manuel2026' || password === 'admin123') {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
      this.notifyListeners();
      return true;
    }
    return false;
  }

  logoutAdmin(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    this.notifyListeners();
  }

  // BACKUP & RESTORE
  exportFullBackup(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      owner: DEFAULT_SETTINGS.ownerName,
      guides: this.getGuides(),
      orders: this.getOrders(),
      settings: this.getSettings(),
      promos: this.getPromoCodes(),
    };
    return JSON.stringify(data, null, 2);
  }

  importFullBackup(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.guides) localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(data.guides));
      if (data.orders) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(data.orders));
      if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      if (data.promos) localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(data.promos));
      this.notifyListeners();
      return true;
    } catch (e) {
      console.error('Backup import error', e);
      return false;
    }
  }

  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(INITIAL_GUIDES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(INITIAL_PROMOS));
    this.notifyListeners();
  }
}

export const storage = new StorageService();
