import type { AreaDeInteresse, LocalizedText } from "./types";

export const PROFILE = {
  name: "Mariana Costa Masi",
  role: {
    pt: "Psicóloga • Neuropsicóloga",
    en: "Psychologist • Neuropsychologist",
  } satisfies LocalizedText,
  positioning: {
    pt: "Explorando as conexões entre neuropsicologia, cognição, envelhecimento e as tecnologias que moldam o futuro da saúde mental.",
    en: "Exploring the connections between neuropsychology, cognition, aging and the technologies shaping the future of mental healthcare.",
  } satisfies LocalizedText,
  // Fonte: texto biográfico enviado pela própria Mariana. Falta apenas o
  // número de CRP (não estava no material recebido) — ver ACADEMIC_PROFILES /
  // credentialsEmpty em about.
  introduction: {
    pt: [
      "Com mais de uma década de atuação no campo da neuropsicologia clínica, Mariana Costa Masi é psicóloga Especialista em Neuropsicologia, com sólida experiência em avaliação neuropsicológica e reabilitação.",
      "À frente do Instituto Nexium, supervisiona uma equipe que atende pacientes em diferentes fases da vida — de pré-escolares a idosos —, sempre pautada pela precisão técnica e pelo cuidado individualizado.",
      "Além da atuação clínica, também presta serviços a empresas, auxiliando na implementação e adequação de programas voltados à saúde mental no ambiente de trabalho. Sua prática é orientada pelo compromisso com a qualidade, pela escuta qualificada e pela busca contínua por promover compreensão e bem-estar em diferentes contextos.",
    ],
    en: [
      "With more than a decade of experience in clinical neuropsychology, Mariana Costa Masi is a psychologist specialized in Neuropsychology, with solid experience in neuropsychological assessment and rehabilitation.",
      "At the helm of Instituto Nexium, she supervises a team that cares for patients across every stage of life — from preschool age to older adulthood —, always grounded in technical precision and individualized care.",
      "Beyond her clinical practice, she also provides services to companies, helping implement and adapt mental health programs in the workplace. Her practice is guided by a commitment to quality, attentive listening, and an ongoing pursuit of understanding and well-being across different contexts.",
    ],
  },
} as const;

export const AREAS_DE_INTERESSE: AreaDeInteresse[] = [
  {
    slug: "neuropsicologia",
    codigo: "NP",
    titulo: { pt: "Neuropsicologia", en: "Neuropsychology" },
    descricao: {
      pt: "Avaliação, reabilitação e a relação entre o SNC, funções cognitivas, comportamento e emoção.",
      en: "Assessment, rehabilitation and the relationship between the CNS, cognitive functions, behavior and emotion.",
    },
  },
  {
    slug: "envelhecimento-e-cognicao",
    codigo: "EC",
    titulo: { pt: "Envelhecimento & Cognição", en: "Aging & Cognition" },
    descricao: {
      pt: "Envelhecimento cognitivo, demências, prevenção e longevidade saudável.",
      en: "Cognitive aging, dementia, prevention and healthy longevity.",
    },
  },
  {
    slug: "neurociencia",
    codigo: "NC",
    titulo: { pt: "Neurociência", en: "Neuroscience" },
    descricao: {
      pt: "Como o cérebro molda quem somos.",
      en: "How the brain shapes who we are.",
    },
  },
  {
    slug: "tecnologia-e-ia",
    codigo: "IA",
    titulo: { pt: "Tecnologia & IA", en: "Technology & AI" },
    descricao: {
      pt: "Como tecnologia e inteligência artificial podem transformar avaliação, pesquisa e cuidado em saúde.",
      en: "Exploring how technology and artificial intelligence may transform assessment, research and healthcare.",
    },
  },
];

// [REVISAR] formação, CRP, trajetória e perfis acadêmicos reais — pendente de
// confirmação com a Mariana/José antes de publicar. Estrutura pronta para
// receber os dados assim que existirem.
export const ACADEMIC_PROFILES: Array<{
  label: string;
  url: string | null;
}> = [
  { label: "Lattes", url: null },
  { label: "ORCID", url: null },
  { label: "Google Scholar", url: null },
  { label: "LinkedIn", url: null },
];

export const EDUCATION_TIMELINE: Array<{
  period: string;
  title: LocalizedText;
  institution?: string;
}> = [
  {
    period: "2011",
    title: { pt: "Graduação em Psicologia", en: "Bachelor's Degree in Psychology" },
    institution: "Universidade Paulista",
  },
  {
    period: "2013–2015",
    title: {
      pt: "Estágio voluntário — Protocolo de Avaliação Neuropsicológica Infantil (PANI), ambulatórios de epilepsia e foniatria",
      en: "Volunteer internship — Protocolo de Avaliação Neuropsicológica Infantil (PANI), epilepsy and speech-language outpatient clinics",
    },
    institution: "Hospital das Clínicas da Faculdade de Medicina da USP (HC-FMUSP)",
  },
  {
    period: "2014",
    title: { pt: "Especialização em Neuropsicologia", en: "Specialization in Neuropsychology" },
    institution: "Centro de Estudos Psico-Cirúrgicos da Divisão de Psicologia do ICHC-FMUSP (CEPSIC)",
  },
  {
    period: "2025",
    title: {
      pt: "Curso de Qualificação Profissional na Abordagem Neuropsicológica Multidisciplinar em Transtornos Neurocognitivos do Envelhecimento",
      en: "Professional Qualification Course in the Multidisciplinary Neuropsychological Approach to Neurocognitive Disorders of Aging",
    },
    institution:
      "Serviço de Atendimento e Reabilitação de Idosos (SARI), Centro Paulista de Neuropsicologia (CPN – AFIP/UNIFESP)",
  },
];
