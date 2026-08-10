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
      "Com mais de uma década de atuação no campo da neuropsicologia clínica, Mariana Costa Masi é psicóloga especialista em Neuropsicologia, com sólida experiência em avaliação neuropsicológica e psicodiagnóstico.",
      "À frente do Instituto Nexium, dedica-se à condução de um trabalho pautado pela precisão técnica e pelo cuidado individualizado, atendendo pacientes em diferentes fases da vida, da infância ao envelhecimento.",
      "Além da atuação clínica, também presta serviços a empresas, auxiliando na implementação e adequação de programas voltados à saúde mental no ambiente de trabalho. Sua prática é orientada pelo compromisso com a qualidade, pela escuta qualificada e pela busca contínua por promover compreensão e bem-estar em diferentes contextos.",
    ],
    en: [
      "With more than a decade of experience in clinical neuropsychology, Mariana Costa Masi is a psychologist specialized in Neuropsychology, with solid experience in neuropsychological assessment and psychodiagnostics.",
      "At the helm of Instituto Nexium, she leads work grounded in technical precision and individualized care, seeing patients across every stage of life, from childhood to aging.",
      "Beyond her clinical practice, she also provides services to companies, helping implement and adapt mental health programs in the workplace. Her practice is guided by a commitment to quality, attentive listening, and an ongoing pursuit of understanding and well-being across different contexts.",
    ],
  },
} as const;

export const AREAS_DE_INTERESSE: AreaDeInteresse[] = [
  {
    slug: "neuropsicologia",
    titulo: { pt: "Neuropsicologia", en: "Neuropsychology" },
    descricao: {
      pt: "Avaliação, cognição e a relação entre função cerebral e comportamento.",
      en: "Assessment, cognition and the relationship between brain function and behavior.",
    },
    cor: "var(--color-terracota)",
  },
  {
    slug: "envelhecimento-e-cognicao",
    titulo: { pt: "Envelhecimento & Cognição", en: "Aging & Cognition" },
    descricao: {
      pt: "Envelhecimento cognitivo, demências, prevenção e longevidade saudável.",
      en: "Cognitive aging, dementia, prevention and healthy longevity.",
    },
    cor: "var(--color-salvia)",
  },
  {
    slug: "neurociencia",
    titulo: { pt: "Neurociência", en: "Neuroscience" },
    descricao: {
      pt: "Compreender processos cognitivos a partir da neurociência contemporânea.",
      en: "Understanding cognitive processes through contemporary neuroscience.",
    },
    cor: "var(--color-terracota)",
  },
  {
    slug: "tecnologia-e-ia",
    titulo: { pt: "Tecnologia & IA", en: "Technology & AI" },
    descricao: {
      pt: "Como tecnologia e inteligência artificial podem transformar avaliação, pesquisa e cuidado em saúde.",
      en: "Exploring how technology and artificial intelligence may transform assessment, research and healthcare.",
    },
    cor: "var(--color-salvia)",
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
  },
  {
    period: "2013–2015",
    title: {
      pt: "Estágio voluntário — Avaliação Neuropsicológica Infantil (PANI), ambulatórios de epilepsia e foniatria",
      en: "Volunteer internship — Pediatric Neuropsychological Assessment (PANI), epilepsy and speech-language outpatient clinics",
    },
    institution: "Hospital das Clínicas da FMUSP",
  },
  {
    period: "2014",
    title: { pt: "Especialização em Neuropsicologia", en: "Specialization in Neuropsychology" },
    institution: "CEPSIC — Hospital das Clínicas da FMUSP",
  },
  {
    period: "2025",
    title: {
      pt: "Aprimoramento em Avaliação e Reabilitação de Idosos (CPN/SARI)",
      en: "Advanced Training in Assessment and Rehabilitation of Older Adults (CPN/SARI)",
    },
    institution: "UNIFESP",
  },
];
