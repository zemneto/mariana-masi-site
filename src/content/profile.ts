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
  // [REVISAR] texto de introdução final — hoje é uma descrição genérica da área de
  // atuação, precisa passar pela revisão da Mariana antes de publicar como bio oficial.
  introduction: {
    pt: [
      "Mariana é psicóloga e neuropsicóloga, com interesse central nas relações entre cérebro, cognição e comportamento ao longo da vida.",
      "Seu trabalho combina avaliação neuropsicológica, envelhecimento cognitivo e o uso de tecnologia e inteligência artificial aplicadas à saúde mental — sempre com base científica.",
    ],
    en: [
      "Mariana is a psychologist and neuropsychologist with a central interest in the relationships between brain, cognition and behavior across the lifespan.",
      "Her work combines neuropsychological assessment, cognitive aging and the use of technology and artificial intelligence applied to mental healthcare — always grounded in science.",
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
  // [REVISAR] preencher com formação real (graduação, pós, especializações,
  // estágios hospitalares) antes de publicar.
];
