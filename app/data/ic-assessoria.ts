export interface ServiceItem {
  id: string
  title: string
  shortDescription: string
  description: string
  iconName: string
  deliverables: string[]
}

export interface DifferentialItem {
  number: string
  title: string
  description: string
  highlight: string
}

export interface DataImportanceItem {
  id: string
  title: string
  description: string
  impact: string
  iconName: string
}

export const IC_ASSESSORIA_INFO = {
  brand: {
    name: 'IC Assessoria',
    tagline: 'Vigilância e Análise de Dados em Saúde',
    responsible: 'Antônio Cândido',
    role: 'Responsável Técnico | Vigilância & Análise de Dados em Saúde',
  },
  hero: {
    badge: 'Assessoria Especializada em Saúde',
    title: 'Inteligência em saúde para decisões mais estratégicas.',
    subtitle:
      'Transformamos dados em informações estratégicas para fortalecer a gestão, qualificar processos e apoiar decisões em saúde.',
    stats: [
      {
        value: 'Decisões',
        label: 'Orientadas por Evidências',
        highlight: '100% técnicas',
      },
      {
        value: 'Indicadores',
        label: 'Monitoramento Contínuo',
        highlight: 'Visão integral',
      },
      {
        value: 'Bases de Dados',
        label: 'Qualificação & Consistência',
        highlight: 'Confiabilidade',
      },
    ],
  },
  about: {
    title: 'Sobre a IC Assessoria',
    subtitle: 'Nossa Proposta Institucional',
    p1: 'O projeto IC Assessoria – Vigilância e Análise de Dados em Saúde tem como objetivo fortalecer a gestão em saúde por meio da qualificação, organização, monitoramento e análise de informações estratégicas.',
    p2: 'A iniciativa busca transformar dados em subsídios técnicos fundamentais para o planejamento, a avaliação de indicadores, a identificação de prioridades e a tomada de decisões assertivas.',
    p3: 'Por meio de assessoria técnica especializada, apoiamos profissionais, gestores e equipes de saúde no aprimoramento dos processos de vigilância, monitoramento contínuo de indicadores e utilização dos sistemas de informação, contribuindo para uma gestão mais eficiente, integrada e orientada por evidências.',
    responsibleCard: {
      name: 'Antônio Cândido',
      role: 'Responsável pela iniciativa IC Assessoria',
      bio: 'Atuação orientada ao fortalecimento da gestão e da vigilância em saúde por meio da organização e qualificação de dados, análise de indicadores e fornecimento de subsídios técnicos para gestores e equipes de saúde.',
    },
    pillars: [
      {
        title: 'Qualificação da Informação',
        desc: 'Tratamento rigoroso de registros para assegurar consistência e integridade das bases de dados em saúde.',
      },
      {
        title: 'Inteligência Epidemiológica',
        desc: 'Identificação precoce de tendências, prioridades territoriais e fatores determinantes de saúde.',
      },
      {
        title: 'Apoio à Gestão Pública e Privada',
        desc: 'Apoio consultivo próximo para formulação de metas, planejamento orçamentário e intervenções resolutivas.',
      },
    ],
  },
  services: [
    {
      id: 'vigilancia-em-saude',
      title: 'Vigilância em Saúde',
      shortDescription:
        'Aprimoramento de rotinas de vigilância epidemiológica, sanitária e ambiental.',
      description:
        'Estruturação e qualificação de fluxos de vigilância, monitoramento sistemático de agravos, detecção oportuna de eventos de interesse em saúde pública e suporte na investigação técnica.',
      iconName: 'FiActivity',
      deliverables: [
        'Estruturação de rotinas e fluxos de vigilância',
        'Monitoramento de agravos e eventos prioritários',
        'Identificação de padrões e alertas epidemiológicos',
        'Relatórios situacionais para apoio técnico',
      ],
    },
    {
      id: 'analise-monitoramento-indicadores',
      title: 'Análise e Monitoramento de Indicadores',
      shortDescription:
        'Acompanhamento contínuo de metas pactuadas e indicadores estratégicos.',
      description:
        'Desenvolvimento de matrizes analíticas para acompanhamento de indicadores assistenciais, epidemiológicos e gerenciais, viabilizando avaliação precisa do desempenho das ações de saúde.',
      iconName: 'FiTrendingUp',
      deliverables: [
        'Acompanhamento sistemático de metas de saúde',
        'Matrizes de avaliação e painéis analíticos',
        'Análise de séries históricas e tendências',
        'Diagnósticos de cobertura e resolutividade',
      ],
    },
    {
      id: 'organizacao-qualificacao-dados',
      title: 'Organização e Qualificação de Dados',
      shortDescription:
        'Consistência, validação e higienização das informações em saúde.',
      description:
        'Trabalho especializado na consistência de dados, identificação de inconsistências cadastrais, duplicidades e incompletudes em bases em saúde para assegurar alta confiabilidade nas análises.',
      iconName: 'FiCheckSquare',
      deliverables: [
        'Consistência e validação de registros',
        'Eliminação de duplicidades e incongruências',
        'Padronização de dicionários e categorias de dados',
        'Garantia de integridade para tomadas de decisão',
      ],
    },
    {
      id: 'sistemas-informacao-saude',
      title: 'Sistemas de Informação em Saúde',
      shortDescription:
        'Otimização do uso e extração qualificada de sistemas oficiais.',
      description:
        'Suporte técnico na utilização, extração, cruzamento e interpretação de dados provenientes dos sistemas de informação em saúde e prontuários eletrônicos.',
      iconName: 'FiDatabase',
      deliverables: [
        'Diagnóstico no uso dos sistemas de informação',
        'Extração e consolidação qualificada de bases',
        'Cruzamento de fontes para visão integrada',
        'Capacitação no preenchimento e fluxo de dados',
      ],
    },
    {
      id: 'assessoria-planejamento',
      title: 'Assessoria Técnica e Planejamento',
      shortDescription:
        'Subsídios para planos de ação, metas municipais e relatórios técnicos.',
      description:
        'Assessoria técnica direta a equipes e gestores na elaboração do planejamento em saúde, formulação de planos de ação, definição de prioridades e confecção de pareceres e relatórios técnicos.',
      iconName: 'FiFileText',
      deliverables: [
        'Apoio na elaboração de instrumentos de gestão',
        'Definição fundamentada de prioridades e metas',
        'Relatórios técnicos periódicos de monitoramento',
        'Alinhamento com diretrizes regulatórias e sanitárias',
      ],
    },
    {
      id: 'gestao-por-evidencias',
      title: 'Apoio à Gestão Orientada por Evidências',
      shortDescription:
        'Transformação de dados brutos em decisões fundamentadas e seguras.',
      description:
        'Assessoria voltada a conectar as evidências numéricas da saúde às decisões operacionais e financeiras de gestão, minimizando riscos e maximizando a eficiência dos recursos disponíveis.',
      iconName: 'FiTarget',
      deliverables: [
        'Direcionamento de recursos baseado em evidências',
        'Subsídios objetivos para tomada de decisões',
        'Avaliação de impacto de intervenções em saúde',
        'Cultura de gestão orientada a resultados',
      ],
    },
  ] as ServiceItem[],
  dataImportance: {
    title: 'A Importância dos Dados na Gestão em Saúde',
    subtitle: 'Evidência em Foco',
    intro:
      'Dados isolados não geram impacto por si só. Quando qualificados, organizados e analisados criticamente por assessoria especializada, tornam-se a ferramenta mais poderosa para gestores e equipes promoverem uma saúde resolutiva e sustentável.',
    items: [
      {
        id: '1',
        title: 'Identificação de Prioridades',
        description:
          'Mapeamento precoce de áreas críticas, populações de maior risco e vazios assistenciais, orientando intervenções onde o impacto sanitário é mais urgente.',
        impact: 'Foco onde a necessidade é real',
        iconName: 'FiCompass',
      },
      {
        id: '2',
        title: 'Monitoramento de Indicadores',
        description:
          'Acompanhamento contínuo dos indicadores epidemiológicos e operacionais para mensurar conformidade com pactuações e prevenir desvios de metas.',
        impact: 'Controle contínuo e proativo',
        iconName: 'FiBarChart2',
      },
      {
        id: '3',
        title: 'Planejamento Estratégico',
        description:
          'Substituição de estimativas subjetivas por diagnósticos situacionais robustos, viabilizando planos de saúde viáveis, estruturados e orçamentariamente coerentes.',
        impact: 'Planejamento com base na realidade',
        iconName: 'FiCalendar',
      },
      {
        id: '4',
        title: 'Avaliação de Resultados',
        description:
          'Mensuração contínua do impacto das intervenções e dos serviços de saúde implementados, comprovando a efetividade das ações adotadas.',
        impact: 'Medição objetiva de resolutividade',
        iconName: 'FiAward',
      },
      {
        id: '5',
        title: 'Tomada de Decisões',
        description:
          'Redução de incertezas na rotina do gestor por meio de relatórios técnicos concisos, transformando complexidade analítica em direcionamentos práticos.',
        impact: 'Segurança técnica para decidir',
        iconName: 'FiCheckCircle',
      },
      {
        id: '6',
        title: 'Melhoria dos Processos de Gestão',
        description:
          'Integração e qualificação das rotinas internas entre equipes técnicas, aprimorando fluxos de trabalho e fomentando uma cultura sustentável de inteligência de dados.',
        impact: 'Eficiência e integração contínua',
        iconName: 'FiCpu',
      },
    ] as DataImportanceItem[],
  },
  differentials: [
    {
      number: '01',
      title: 'Qualificação Técnica',
      description:
        'Conhecimento metodológico aplicado aos fluxos e especificidades da saúde pública e privada.',
      highlight: 'Rigor Metodológico',
    },
    {
      number: '02',
      title: 'Organização das Informações',
      description:
        'Estruturação sistemática de bases e registros para eliminar ruídos, duplicidades e inconsistências.',
      highlight: 'Consistência de Dados',
    },
    {
      number: '03',
      title: 'Análise Estratégica',
      description:
        'Interpretação analítica profunda que vai além de tabelas simples, identificando padrões e causas-raiz.',
      highlight: 'Inteligência Analítica',
    },
    {
      number: '04',
      title: 'Monitoramento Contínuo',
      description:
        'Acompanhamento sistemático e periódico que permite antecipar cenários e corrigir rotas tempestivamente.',
      highlight: 'Proatividade Permanente',
    },
    {
      number: '05',
      title: 'Gestão Orientada por Evidências',
      description:
        'Foco absoluto em subsídios técnicos comprovados para embasar cada escolha e direcionamento institucional.',
      highlight: 'Ciência & Gestão',
    },
    {
      number: '06',
      title: 'Apoio à Tomada de Decisões',
      description:
        'Comunicação clara, acessível e executiva voltada a facilitar o dia a dia de gestores e tomadores de decisão.',
      highlight: 'Decisões Assertivas',
    },
  ] as DifferentialItem[],
  contact: {
    title: 'Vamos conversar sobre a gestão em saúde?',
    subtitle: 'Entre em Contato',
    description:
      'Converse com a IC Assessoria para avaliar as necessidades da sua gestão, estruturar fluxos de vigilância ou qualificar seus indicadores em saúde.',
    responsibleName: 'Antônio Cândido',
    channels: [
      {
        type: 'whatsapp',
        label: 'WhatsApp Profissional',
        value: 'Conversar via WhatsApp',
        href: 'https://wa.me/?text=Olá%2C+gostaria+de+saber+mais+sobre+a+IC+Assessoria',
        note: 'Atendimento direto com Antônio Cândido',
      },
      {
        type: 'email',
        label: 'E-mail Institucional',
        value: 'contato@icassessoria.com.br',
        href: 'mailto:contato@icassessoria.com.br',
        note: 'Envie sua solicitação ou proposta',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn Profissional',
        value: 'Conectar no LinkedIn',
        href: 'https://www.linkedin.com',
        note: 'Acompanhe novidades e publicações',
      },
    ],
  },
}
