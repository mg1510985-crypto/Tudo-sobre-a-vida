import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Heart, Clock, ChevronDown, ChevronUp, Droplets, Scissors, Moon, Calendar, AlertOctagon } from 'lucide-react';

export const EducationalHub: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('mod-1');

  const modules = [
    {
      id: 'mod-1',
      title: '1. Lavagem Correta & O Conceito de Pré-Poo',
      icon: Droplets,
      readTime: '3 min de leitura',
      summary: 'Como lavar sem retirar a oleosidade protetora natural do couro cabeludo.',
      content: `A lavagem do cabelo afro e crespo em Angola deve ser tratada como um ato terapêutico e não de esfregaço agressivo. A água de torneira em certas regiões possui minerais que ressecam a cutícula.

Antes de molhar o cabelo, aplica a técnica do Pré-Poo (pré-champô): passa umas gotas de óleo vegetal morno (azeite ou coco) nas pontas e no comprimento durante 20 minutos. Isto cria um escudo lipídico contra o efeito adstringente dos sulfatos do champô.

Durante a lavagem, aplica o champô exclusivamente no couro cabeludo, massageando em círculos com as pontas dos dedos. A espuma que desce durante o enxaguamento é suficiente para limpar o comprimento sem atrito desnecessário.`,
      tips: [
        'Evita água quente; opta sempre por água morna ou fria no enxaguamento final.',
        'Se possível, usa água mineral ou filtrada para o último enxaguamento.',
        'Frequência recomendada: 1 vez por semana ou a cada 10 dias, conforme o teu estilo de vida.'
      ]
    },
    {
      id: 'mod-2',
      title: '2. Hidratação, Nutrição e Reconstrução (HNR)',
      icon: Heart,
      readTime: '4 min de leitura',
      summary: 'Diferença entre repor água, repor lípidos (óleos) e repor massa proteica.',
      content: `Muitas pessoas confundem hidratação com nutrição. Hidratar significa repor ÁGUA (usando extratos botânicos, babosa, d-pantenol ou glicerina). Nutrir significa repor GORDURAS BOAS que impedem essa água de evaporar (óleos e manteigas vegetais como Karité e Cacau).

Reconstrução é a reposição de proteínas (queratina, aminoácidos), necessária apenas quando o cabelo sofreu danos químicos (alisamentos, tintas) ou calor excessivo. O excesso de reconstrução deixa o fio rígido e quebradiço!`,
      tips: [
        'Cabelos naturais precisam de 80% Nutrição e Hidratação e apenas 20% Reconstrução.',
        'A manteiga de karité pura de Angola é um dos melhores selantes do mundo.',
        'Aplica sempre máscaras em mechas finas, enluvando de cima para baixo.'
      ]
    },
    {
      id: 'mod-3',
      title: '3. Desembaraço Mecânico Sem Dor & Prevenção da Quebra',
      icon: Scissors,
      readTime: '3 min de leitura',
      summary: 'Técnicas manuais para preservar o comprimento sem partir fios.',
      content: `O cabelo crespo é mais frágil nos pontos onde as espirais se dobram. A maior parte das pessoas não sofre de "falta de crescimento", mas sim de quebra contínua na hora do desembaraço.

A regra fundamental é: NUNCA desembaraçar a seco. O cabelo seco tem baixíssima elasticidade e parte com a passagem de um pente comum.`,
      tips: [
        'Faz primeiro o "finger detangling" (desembaraço prévio apenas com os dedos).',
        'Divide sempre a cabeça em 4 ou 6 quadrantes presos.',
        'Começa a pentear rigorosamente nas pontas e vai subindo gradualmente até à raiz.'
      ]
    },
    {
      id: 'mod-4',
      title: '4. Cuidados com Tranças e Penteados Protetores',
      icon: Sparkles,
      readTime: '4 min de leitura',
      summary: 'Como usar tranças sem sofrer de alopecia de tração ou quebra na raiz.',
      content: `Penteados protetores (como box braids, twists e nós de bantu) são uma excelente herança cultural e ajudam na retenção de comprimento, desde que respeitem a saúde do folículo piloso.

Se sentires dor de cabeça, couro cabeludo repuxado ou pequenos pontos brancos/vermelhos junto à raiz após trançar, a trança está demasiado apertada! Dor não é sinal de fixação, é sinal de lesão na raiz.`,
      tips: [
        'Higieniza o couro cabeludo entre as tranças com spray suave de alecrim ou água micelar.',
        'Nunca mantenhas as mesmas tranças por mais de 6 a 8 semanas consecutivas.',
        'Deixa o cabelo respirar livre de peso durante pelo menos 1 a 2 semanas entre penteados.'
      ]
    },
    {
      id: 'mod-5',
      title: '5. Proteção Noturna: O Segredo do Cetim',
      icon: Moon,
      readTime: '2 min de leitura',
      summary: 'Por que a fronha de algodão comum absorve a hidratação dos teus fios.',
      content: `Durante 7 a 8 horas por noite, a nossa cabeça move-se contra a almofada. O tecido de algodão comum age como uma esponja que suga todo o creme e óleo do cabelo, além de criar atrito áspero que desfaz caracóis e forma nós cegos.

A touca de cetim ou a fronha de seda/cetim possui uma superfície lisa que permite aos fios deslizar suavemente, preservando a hidratação e o alinhamento da fibra.`,
      tips: [
        'Usa touca de cetim com elástico largo e macio para não marcar a testa.',
        'Se não gostas de touca na cabeça, usa uma fronha de cetim na almofada.',
        'Prende o cabelo com um elástico frouxo de cetim (estilo abacaxi) antes de cobrir.'
      ]
    },
    {
      id: 'mod-6',
      title: '6. Rotinas Semanais Adaptadas ao Clima de Angola',
      icon: Calendar,
      readTime: '3 min de leitura',
      summary: 'Como lidar com o tempo seco do cacimbo, poeira e calor húmido.',
      content: `O clima em Angola apresenta períodos de cacimbo fresco e seco em Luanda e no interior, e estações de poeira e calor. A poeira acumula-se facilmente em fios com excesso de pomadas pegajosas.

Em épocas de vento e poeira, prioriza óleos mais leves (óleo de grainha de uva ou jojoba) e penteados recolhidos que protejam as pontas da desidratação do ar.`,
      tips: [
        'No cacimbo, intensifica a nutrição com manteiga de karité para criar barreira protetora.',
        'Nos dias mais quentes, usa sprays refrescantes à base de água de rosas ou chá de hortelã.',
        'Mantém-te bem hidratado(a): beber água pura reflete-se na elasticidade dos teus fios.'
      ]
    },
    {
      id: 'mod-7',
      title: '7. Hábitos Nocivos que Danificam o Cabelo Silenciosamente',
      icon: AlertOctagon,
      readTime: '3 min de leitura',
      summary: 'Pequenas atitudes do dia a dia que provocam queda mecânica.',
      content: `Muitas vezes o dano não vem de produtos ruins, mas de práticas mecânicas inadequadas repetidas diariamente:

1. Prender o cabelo molhado com elásticos finos de borracha: o fio molhado está no seu estado mais frágil e elástico, quebrando ao meio.
2. Uso indiscriminado de calor: pranchas e secadores quentes sem protetor térmico desidratam o córtex irreversivelmente.
3. Não cortar pontas duplas: nós de fada e pontas bifurcadas continuam a rasgar o fio até à haste se não forem podados a tempo.`,
      tips: [
        'Nunca uses elásticos com grampos de metal ou borrachas de escritório no cabelo.',
        'Deixa o cabelo secar ao ar livre sempre que possível.',
        'Uma desponta de 1 a 2 cm a cada 3 a 4 meses ajuda a manter os fios desimpedidos.'
      ]
    }
  ];

  return (
    <section id="dicas" className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Educação e Consciência Capilar</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dicas Gratuitas & Boas Práticas em Angola
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Aprende princípios seguros para o dia a dia. Conhecimento fundamentado para que cuides da tua coroa com dignidade e autonomia.
          </p>
        </div>

        {/* Responsible Medical / Hair Health Disclaimer */}
        <div className="p-4 sm:p-5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-950 block">Aviso de Responsabilidade e Saúde Capilar:</strong>
            <p className="text-slate-700 leading-relaxed">
              O conteúdo disponibilizado pela <strong>Beleza Capilar Angola</strong> e por <strong>Manuel Marcolino Miranda</strong> tem fins exclusivamente educativos e preventivos. Não prometemos crescimento milagroso nem curas rápidas para patologias. Se apresentares dor intensa, feridas, escamação excessiva, placas avermelhadas ou perda repentina e acentuada de cabelo, <strong>recomendamos vivamente a consulta de um médico dermatologista ou especialista em tricologia</strong>.
            </p>
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3">
          {modules.map((mod) => {
            const isExpanded = expandedId === mod.id;
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                className="rounded-2xl border border-purple-100/90 overflow-hidden bg-slate-50/50 transition duration-200"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : mod.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-purple-50/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {mod.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span>{mod.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span className="hidden sm:inline">{mod.summary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-purple-100 bg-white space-y-4 text-xs text-slate-700 leading-relaxed">
                    <div className="whitespace-pre-line">
                      {mod.content}
                    </div>

                    {/* Tips highlight */}
                    <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200/70">
                      <strong className="text-purple-950 text-xs block mb-1.5">
                        Dicas Práticas para o teu dia:
                      </strong>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {mod.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
