export interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: 'Protein & Tissue' | 'Endocrinology' | 'Pharmacology & Dosing' | 'Supplements' | 'Research Methods';
  readTimeMinutes: number;
  image: string;
  imageAlt: string;
  excerpt: string;
  keyTakeaway: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  references: {
    citation: string;
    url: string;
  }[];
}

export interface Publication {
  id: string;
  type: 'Journal Article' | 'Conference Publication';
  year: number;
  title: string;
  authors: string;
  journalOrVenue: string;
  citationDetails: string;
  fullCitation: string;
  focusArea: string;
  url?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Consultation';
  price: number;
  currency: 'USD';
  format: string;
  image: string;
  imageAlt: string;
  summary: string;
  deliverables: string[];
  ctaLabel: string;
}

export const SITE_INFO = {
  name: 'Dr. Trevor Kouritzin',
  shortName: 'Trevor Kouritzin',
  tagline: 'Live your life, look good doing it',
  heroHeadline: 'Evidence-based methods to transform information into actionable knowledge.',
  heroSubheadline:
    'When clinical evidence is lacking, I advocate for structured behavioral framework models to guide high-stakes health, nutrition, and performance decisions.',
  email: 'Info@DoctorTrev.com',
  location: 'Edmonton, Alberta, Canada',
  siteUrl: 'https://trevorkouritzin.com',
  logoMark: '/images/logo-mark.png',
  logoWordmark: '/images/logo-wordmark.png',
  images: {
    hero: '/images/hero-trevor.jpg',
    meet: '/images/meet-trevor.jpg',
    articles: '/images/articles-trevor.jpg',
    publications: '/images/publications-library.jpg',
  },
  socials: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/trevorkouritzin/',
      handle: '@trevorkouritzin',
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/trevorkouritzin',
      handle: 'youtube.com/trevorkouritzin',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/trevor-kouritzin-9b8558209/',
      handle: 'Dr. Trevor Kouritzin',
    },
  ],
  credentials: [
    {
      label: 'Ph.D. Medicine',
      detail: 'Division of Preventive Medicine · University of Alberta',
    },
    {
      label: 'M.Sc. Human Nutrition',
      detail: 'Clinical Supplementation & Cardiometabolic Health',
    },
    {
      label: 'B.Sc. Chemical Engineering',
      detail: 'Quantitative Formulation & Systems Modeling',
    },
    {
      label: 'IFBB Pro Bodybuilder',
      detail: 'Elite Competitive Physique & Applied Athletics',
    },
  ],
  speakingFormats: [
    {
      index: '01',
      title: 'Conferences',
      description:
        'Keynotes and scientific symposia translating clinical nutrition trials, preventive medicine, and supplement safety into practitioner-ready protocols.',
    },
    {
      index: '02',
      title: 'Podcasts',
      description:
        'Long-form technical conversations dissecting study methodology, hormone physiology, ketogenic metabolism, and evidence-backed supplementation.',
    },
    {
      index: '03',
      title: 'Presentations',
      description:
        'Executive briefings for supplement brands, R&D teams, and clinical organizations evaluating ingredient efficacy and regulatory formulation.',
    },
    {
      index: '04',
      title: 'Workshops',
      description:
        'Interactive applied sessions teaching coaches, clinicians, and athletes how to appraise research quality and build behavioral nutrition models.',
    },
  ],
  bioParagraphs: [
    'Dr. Trevor Kouritzin holds a Doctorate in Medicine (Division of Preventive Medicine), a Master’s degree in Human Nutrition, and a Bachelor’s degree in Chemical Engineering.',
    'During his academic career, Trevor actively pursued competitive bodybuilding, ultimately earning a professional IFBB card while also competing across multiple team sports.',
    'He is deeply passionate about the clinical and therapeutic applications of dietary supplements, rigorous research appraisal, and practical nutritional architecture for enhancing health, athletic performance, and overall quality of life.',
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'zoom-consultation',
    slug: 'one-hour-zoom-consultation',
    title: '1 Hour Zoom Consultation',
    category: 'Consultation',
    price: 200,
    currency: 'USD',
    format: '60-Minute Live 1-on-1 Video Session',
    image: '/images/service-zoom.png',
    imageAlt: 'Dr. Trevor Kouritzin 1 Hour Zoom Consultation',
    summary:
      'Direct, personalized 60-minute evidence-based strategy session covering supplement formulation, clinical nutrition protocols, bloodwork interpretation frameworks, or competitive physique preparation.',
    deliverables: [
      'Pre-session intake review of your goals, diet, and current supplement stack',
      '60-minute live Zoom strategy session with Dr. Trevor Kouritzin',
      'Structured behavioral and evidence-based action summary following the call',
      '100% satisfaction guarantee',
    ],
    ctaLabel: 'Schedule Consultation',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-2023-scoping',
    type: 'Journal Article',
    year: 2023,
    title: 'Scoping Review: Food Selection and Food Intake Following Physical Relocation',
    authors: 'Trevor M. Kouritzin, John C. Spence, & Karen K. Lee',
    journalOrVenue: 'Public Health Reviews',
    citationDetails: '44: 1-8',
    fullCitation:
      'Trevor M. Kouritzin, John C. Spence, & Karen K. Lee. (2023). Scoping Review: Food Selection and Food Intake Following Physical Relocation. Public Health Reviews. 44: 1-8.',
    focusArea: 'Preventive Medicine & Built Environment Nutrition',
    url: 'https://trevorkouritzin.com/publications/',
  },
  {
    id: 'pub-2021-protocol',
    type: 'Journal Article',
    year: 2021,
    title: 'Protocol for an evaluation of the Designing Communities to Support Healthy Living in Aging Residents Study',
    authors: 'Stearns, J. A., Ren, H., Spence, J. C., Avedzi, H., & Lee, K. K. (Research Team)',
    journalOrVenue: 'Archives of Public Health (Archives belges de santé publique)',
    citationDetails: '79(1), 172',
    fullCitation:
      'Stearns, J. A., Ren, H., Spence, J. C., Avedzi, H., & Lee, K. K. (2021). Protocol for an evaluation of the Designing Communities to Support Healthy Living in Aging Residents Study. Archives of public health = Archives belges de sante publique, 79(1), 172.',
    focusArea: 'Population Health & Community Design',
    url: 'https://trevorkouritzin.com/publications/',
  },
  {
    id: 'pub-2020-cardioflex',
    type: 'Journal Article',
    year: 2020,
    title: 'The Effects of the Dietary Supplement Cardioflex on Reducing Cardiovascular Disease Risk Factors in Adults',
    authors: 'Trevor Kouritzin, Semone Myrie',
    journalOrVenue: 'Current Developments in Nutrition',
    citationDetails: '4: 1',
    fullCitation:
      'Trevor Kouritzin, Semone Myrie. (2020). The Effects of the Dietary Supplement Cardioflex on Reducing Cardiovascular Disease Risk Factors in Adults. Current Developments in Nutrition. 4: 1.',
    focusArea: 'Clinical Dietary Supplementation & Cardiometabolic Risk',
    url: 'https://trevorkouritzin.com/publications/',
  },
  {
    id: 'pub-2017-omega3',
    type: 'Journal Article',
    year: 2017,
    title: 'The role of omega-3 fatty acids in skeletal muscle anabolism, strength, and function in healthy and diseased states',
    authors: 'Ifeanyi D. Nwachukwu, Trevor M. Kouritzin, Rotimi E. Aluko, Semone B. Myrie',
    journalOrVenue: 'Journal of Food Biochemistry',
    citationDetails: '41: 1-15',
    fullCitation:
      'Ifeanyi D. Nwachukwu, Trevor M. Kouritzin, Rotimi E. Aluko, Semone B. Myrie. (2017). The role of omega-3 fatty acids in skeletal muscle anabolism, strength, and function in healthy and diseased states. Journal of Food Biochemistry. 41: 1-15.',
    focusArea: 'Skeletal Muscle Anabolism & Lipid Biochemistry',
    url: 'https://trevorkouritzin.com/publications/',
  },
  {
    id: 'conf-2020-ans',
    type: 'Conference Publication',
    year: 2020,
    title: 'The Effects of the Dietary Supplement Cardioflex on Reducing Cardiovascular Disease Risk Factors in Adults',
    authors: 'Trevor Kouritzin, Semone Myrie',
    journalOrVenue: 'American Nutrition Society · Washington State, USA',
    citationDetails: 'May 2020',
    fullCitation:
      'Trevor Kouritzin, Semone Myrie. (2020, May). The Effects of the Dietary Supplement Cardioflex on Reducing Cardiovascular Disease Risk Factors in Adults. American Nutrition Society, Washington State, United States of America.',
    focusArea: 'Clinical Trials & Dietary Supplementation',
    url: 'https://trevorkouritzin.com/publications/',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 7465,
    slug: 'is-collagen-a-useless-protein',
    title: 'Is Collagen A Useless Protein?',
    date: '2025-08-15',
    category: 'Protein & Tissue',
    readTimeMinutes: 4,
    image: '/images/article-collagen.jpg',
    imageAlt: 'PI3K/Akt and MAPK signaling response to collagen peptide supplementation',
    excerpt:
      'A 2022 randomized controlled trial in Frontiers in Physiology reported that 15 g of collagen peptides consumed after high-load resistance exercise increased activation of both PI3K/Akt and MAPK versus placebo.',
    keyTakeaway:
      'While low in leucine for mTOR-driven myofibrillar synthesis, 15 g of collagen peptides activates PI3K/Akt and MAPK remodeling pathways to reinforce tendons, extracellular matrix, and connective tissue.',
    sections: [
      {
        paragraphs: [
          'While it is true that collagen is low in leucine and does not strongly stimulate muscle protein synthesis (MPS) via mTOR, mTOR is not the only anabolic pathway that matters. Other signaling networks—such as PI3K/Akt and MAPK—play major roles in connective-tissue remodeling, tendon support, and muscle repair.',
          'A 2022 randomized controlled trial in Frontiers in Physiology reported that 15 g of collagen peptides consumed after high-load resistance exercise significantly increased activation of both PI3K/Akt and MAPK versus placebo [1]. That is notable given many whey studies use ~30 g doses. These pathways are linked not only to muscle growth but also to strengthening the extracellular matrix—the “scaffolding” that transfers force from muscle to bone.',
          'Beyond signaling, collagen is the most abundant protein in the body, accounting for ~30% of total protein [2]. The body contains at least 16 types of collagen distributed across skin, tendons, bone, cartilage, and other connective tissues.',
          'Collagen is not ideal as your sole protein source, but it is far from useless. It targets complementary adaptation pathways. When paired with higher-leucine proteins throughout the day, collagen supports joint health, connective-tissue integrity, and overall structural resilience.',
        ],
      },
    ],
    references: [
      {
        citation: 'Centner et al. (2022). Frontiers in Physiology.',
        url: 'https://doi.org/10.3389/fphys.2022.838004',
      },
      {
        citation: 'Deshmukh et al. (2016). Journal of Oral and Maxillofacial Pathology.',
        url: 'https://doi.org/10.4103/0973-029X.185932',
      },
    ],
  },
  {
    id: 7453,
    slug: 'why-men-store-belly-fat',
    title: 'Why Do Men Store Fat Around The Belly?',
    date: '2025-07-25',
    category: 'Endocrinology',
    readTimeMinutes: 4,
    image: '/images/article-bellyfat.png',
    imageAlt: 'Chylomicron size and abdominal visceral fat accumulation diagram',
    excerpt:
      'A 2019 hypothesis paper published in Frontiers in Physiology offers a compelling mechanistic explanation: men produce larger and more chylomicrons—fat-transporting particles made in the gut after eating.',
    keyTakeaway:
      'Larger postprandial chylomicrons congest intestinal lymphatics and deposit fatty acids into mesenteric and omental depots, creating a feedback loop linked to 5x higher odds of testosterone deficiency.',
    sections: [
      {
        paragraphs: [
          'Men are typically more prone to storing fat viscerally (around the abdomen), while women typically store fat subcutaneously (around the hips and thighs).',
          'A 2019 hypothesis paper published in Frontiers in Physiology offers a compelling mechanistic explanation: men produce larger and more chylomicrons—fat-transporting particles made in the gut after eating. These oversized chylomicrons congest the intestinal lymphatics and are more likely to get trapped in the abdominal region. Once trapped, they are broken down by lipoprotein lipase, and the released fatty acids are preferentially stored in nearby visceral fat depots such as the mesentery and omentum [1].',
          'In other words, men’s gut physiology and hormonal profiles make them more prone to visceral fat accumulation, which in turn feeds back to reduce testosterone levels—amplifying cardiometabolic risk.',
          'A 2023 study of 1,551 men found that those in the highest quartile of Visceral Adiposity Index (VAI) were 5 times more likely to have testosterone deficiency compared to those in the lowest quartile (OR = 5.07, p < 0.0001) [2]. The study also showed that as VAI increased, total testosterone levels significantly decreased, independent of age, BMI, and other confounders.',
        ],
      },
    ],
    references: [
      {
        citation: 'Nauli & Matin (2019). Why Do Men Accumulate Abdominal Visceral Fat? Front Physiol, 10:1486.',
        url: 'https://www.frontiersin.org/articles/10.3389/fphys.2019.01486/full',
      },
      {
        citation: 'Su et al. (2023). The Impact of Visceral Adiposity on Testosterone Levels in American Adult Men. Med Sci Monit, 29:e941394.',
        url: 'https://www.medscimonit.com/abstract/index/idArt/941394',
      },
    ],
  },
  {
    id: 7439,
    slug: 'does-it-matter-when-you-sleep-for-testosterone',
    title: 'Does it Matter When You Sleep for Testosterone?',
    date: '2025-06-12',
    category: 'Endocrinology',
    readTimeMinutes: 3,
    image: '/images/article-sleep.png',
    imageAlt: 'Observed and predicted testosterone levels for night sleep versus day sleep',
    excerpt:
      'A 2005 clinical study published in The Journal of Clinical Endocrinology & Metabolism researched an important question: Is testosterone influenced more by when you sleep—or how long you sleep?',
    keyTakeaway:
      'Controlled 24-hour laboratory monitoring demonstrated that total sleep duration—rather than clock-time circadian alignment alone—was the primary driver of the sleep-induced testosterone rise (~15–17 to ~25–26 nmol/L).',
    sections: [
      {
        paragraphs: [
          'A 2005 clinical study published in The Journal of Clinical Endocrinology & Metabolism researched an important question: Is testosterone influenced more by when you sleep—or how long you sleep?',
        ],
      },
      {
        heading: 'Controlled Lab Design & Findings',
        paragraphs: [
          'In a controlled lab, 7 healthy men were monitored for 24 hours while sleeping either at night (11 PM–7 AM) or during the day (7 AM–3 PM).',
        ],
        bullets: [
          'Testosterone levels rose steadily in both conditions—from ~15–17 nmol/L to ~25–26 nmol/L.',
          'Circadian rhythm exerted only a minor influence; total sleep duration was the primary driver of testosterone production.',
          'For shift workers or irregular schedules, protecting uninterrupted sleep duration remains critical for endocrine recovery.',
        ],
      },
    ],
    references: [
      {
        citation: 'Axelsson et al. (2005). The Journal of Clinical Endocrinology & Metabolism. PubMed ID: 15914523.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15914523/',
      },
    ],
  },
  {
    id: 7420,
    slug: 'when-do-testosterone-levels-start-to-decline-in-men',
    title: 'When Do Testosterone Levels Start to Decline in Men?',
    date: '2025-05-08',
    category: 'Endocrinology',
    readTimeMinutes: 5,
    image: '/images/article-testosterone.png',
    imageAlt: 'Longitudinal decline curves for serum testosterone in aging men',
    excerpt:
      'The Massachusetts Male Aging Study found a decrease of approximately 1% per year after age 30. The Baltimore Longitudinal Study of Aging reported an even steeper decline—about 1.6% per year after age 40.',
    keyTakeaway:
      'Age-related decline averages 1%–1.6% per year past age 30–40, but modifiable lifestyle levers—heavy compound training, protein adequacy, 7+ hours sleep, and alcohol moderation—blunt the drop.',
    sections: [
      {
        heading: 'Longitudinal Benchmarks',
        paragraphs: [
          'Two landmark cohorts quantify how circulating testosterone shifts across adulthood:',
        ],
        bullets: [
          'The Massachusetts Male Aging Study found a decrease of approximately 1% per year after age 30.',
          'The Baltimore Longitudinal Study of Aging reported an even steeper decline—about 1.6% per year after age 40.',
        ],
      },
      {
        heading: 'Lifestyle Factors That Accelerate the Decline',
        paragraphs: ['Environmental and behavioral stressors compound chronological aging:'],
        bullets: [
          'Reduced muscle stimulus – Sedentary jobs and busy schedules often reduce mechanical loading.',
          'Poor recovery – Chronic stress and insufficient sleep suppress growth hormone and testosterone.',
          'Alcohol consumption – Increases aromatization toward estrogen, lowers testosterone, and impairs protein synthesis.',
          'Suboptimal diet – Inconsistent protein and micronutrient intake hinders tissue repair.',
        ],
      },
      {
        heading: 'Science-Backed Ways to Support Testosterone',
        paragraphs: ['Practical, high-leverage interventions supported by clinical literature:'],
        bullets: [
          'Lift heavy, lift smart – Compound lifts (e.g., squats, deadlifts) 2–3x/week support endocrine and neuromuscular health.',
          'Hit your protein target – Aim for ~1g of protein per pound of target body weight daily.',
          'Prioritize sleep – Securing at least 7 hours/night preserves nocturnal testosterone and growth hormone output.',
          'Moderate alcohol – Even 2–3 drinks/week can measurably suppress testosterone recovery.',
          'Manage stress – Chronically elevated cortisol competes with androgen signaling; integrate walking, meditation, or thermal recovery.',
        ],
      },
    ],
    references: [
      {
        citation: 'Harman SM et al. (2001). J Clin Endocrinol Metab, 86(2), 724–731.',
        url: 'https://doi.org/10.1210/jcem.86.2.7219',
      },
      {
        citation: 'Feldman HA et al. (2002). J Clin Endocrinol Metab, 87(2), 589–598.',
        url: 'https://doi.org/10.1210/jcem.87.2.8201',
      },
    ],
  },
  {
    id: 7406,
    slug: 'calculating-human-equivalent-dosages-from-animal-studies',
    title: 'Calculating Human Equivalent Dosages from Animal Studies',
    date: '2025-03-31',
    category: 'Pharmacology & Dosing',
    readTimeMinutes: 4,
    image: '/images/article-hed.jpg',
    imageAlt: 'Allometric Km conversion table for Human Equivalent Dose scaling',
    excerpt:
      'A common mistake in translating animal study dosages to humans is using body weight scaling (mg/kg). Instead, allometric scaling—which accounts for body surface area and species-specific metabolic rates—should be used.',
    keyTakeaway:
      'Never scale preclinical mg/kg doses 1:1 to humans. Apply allometric Km ratios (HED = Animal Dose × Km ratio) to account for body surface area and basal metabolic rate differences.',
    sections: [
      {
        paragraphs: [
          'A common mistake in translating animal study dosages to humans is using simple body weight scaling (mg/kg). This ignores critical differences in metabolism, cardiac output, and physiology across species. Instead, allometric scaling—which accounts for body surface area and species-specific metabolic rates—should be used.',
          'Nair and Jacob (2016) compiled standardized conversion factors (Km ratios) for the most commonly used animals in preclinical research. The formula for Human Equivalent Dose (HED) is: HED (mg/kg) = Animal dose (mg/kg) × Km ratio.',
        ],
      },
      {
        heading: 'Worked Example Calculation',
        paragraphs: [
          'If a 200 g (0.2 kg) mouse is administered 10 mg of a compound, the animal dose is 10 mg / 0.2 kg = 50 mg/kg. Multiplying by the mouse-to-human Km ratio (0.081): HED = 50 mg/kg × 0.081 = 4.05 mg/kg for humans (~283.5 mg for a 70 kg adult).',
          'Key takeaway: Body weight alone is misleading—smaller animals have dramatically faster metabolic rates, meaning humans require proportionally lower per-kilogram doses.',
        ],
      },
    ],
    references: [
      {
        citation: 'Nair, A. B., & Jacob, S. (2016). A simple practice guide for dose conversion between animals and humans. J Basic Clin Pharm, 7(2), 27–31.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27057123/',
      },
    ],
  },
  {
    id: 7395,
    slug: 'meta-analysis-on-l-carnitine-supplementation-and-body-composition',
    title: 'Meta-Analysis on L-Carnitine Supplementation and Body Composition',
    date: '2025-03-10',
    category: 'Supplements',
    readTimeMinutes: 4,
    image: '/images/article-carnitine.jpg',
    imageAlt: 'Dose-response curve for L-carnitine supplementation on body composition',
    excerpt:
      'A meta-analysis represents the highest level of evidence as it synthesizes data from multiple randomized controlled trials (RCTs). Talenezhad et al. (2020) evaluated 37 RCTs involving 2,292 participants.',
    keyTakeaway:
      'Across 37 RCTs (n = 2,292), L-carnitine yielded modest reductions in body weight (-1.21 kg) and fat mass (-2.08 kg), with non-linear dose-response peaking around 2,000 mg/day.',
    sections: [
      {
        paragraphs: [
          'A meta-analysis is considered the highest tier of empirical synthesis because it pools data across multiple randomized controlled trials (RCTs). Talenezhad et al. (2020) conducted a systematic review and meta-analysis evaluating L-carnitine supplementation across 37 RCTs involving 2,292 participants.',
        ],
      },
      {
        heading: 'Key Clinical Findings',
        paragraphs: ['Pooled effect sizes across the included clinical trials showed:'],
        bullets: [
          'Body weight reduction: -1.21 kg (95% CI: -1.73, -0.68; p < 0.001).',
          'Fat mass reduction: -2.08 kg (95% CI: -3.44, -0.72; p = 0.003).',
          'Non-linear dose-response modeling identified 2,000 mg/day as the optimal adult dosing threshold.',
          'No statistically significant change was observed for waist circumference, indicating effects may not preferentially target visceral abdominal depots.',
        ],
      },
    ],
    references: [
      {
        citation: 'Talenezhad N et al. (2020). Effects of L-carnitine supplementation on weight loss and body composition: A systematic review and meta-analysis of 37 randomized controlled clinical trials. Clin Nutr ESPEN.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32359762/',
      },
    ],
  },
  {
    id: 7381,
    slug: 'omega3-and-strength-adaptations',
    title: 'Omega-3 And Strength Adaptations',
    date: '2025-03-03',
    category: 'Supplements',
    readTimeMinutes: 4,
    image: '/images/article-omega3.jpg',
    imageAlt: 'Upper and lower body 1RM strength adaptations with 4.5g fish oil supplementation',
    excerpt:
      'Omega-3s probably are not the first thing that comes to mind when improving strength adaptations, but Heileson et al. (2023) found that fish oil supplementation significantly improved 1RM bench press and squat strength.',
    keyTakeaway:
      'In recreationally trained adults over 10 weeks, 4.5 g/day of fish oil alongside resistance training produced +17.6% bench press 1RM (vs +7.3% placebo) and +29.3% squat 1RM (vs +17.9% placebo).',
    sections: [
      {
        paragraphs: [
          'Omega-3 fatty acids probably are not the first compound that comes to mind when programming for maximal strength adaptations, yet a randomized study by Heileson et al. (2023) found that high-dose fish oil supplementation significantly improved both absolute and relative upper-body (bench press) and relative lower-body (squat) strength compared to resistance training alone.',
        ],
      },
      {
        heading: 'Study Overview & Practical Caveats',
        paragraphs: [
          'Twenty-one recreationally trained men and women (aged 18–40) completed a 10-week resistance training program (3 days/week), receiving either 4.5 g/day of fish oil or a placebo.',
        ],
        bullets: [
          'Bench press 1RM: +17.6% vs. +7.3% in placebo (p = 0.011).',
          'Squat 1RM: +29.3% vs. +17.9% in placebo (p = 0.045).',
          'Dose threshold: The 4.5 g daily dose may be required; lower maintenance doses may not replicate these neuromuscular gains.',
          'Population specificity: Participants were recreationally trained with body fat ≤26% (men) or ≤36% (women).',
        ],
      },
    ],
    references: [
      {
        citation: 'Heileson JL et al. (2023). The effect of fish oil supplementation on resistance training adaptations. J Int Soc Sports Nutr.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36822153/',
      },
    ],
  },
  {
    id: 7364,
    slug: 'different-levels-of-research-evidence',
    title: 'Different Levels of Research Evidence',
    date: '2025-03-02',
    category: 'Research Methods',
    readTimeMinutes: 3,
    image: '/images/article-evidence.jpg',
    imageAlt: 'Hierarchy of scientific research evidence across study designs',
    excerpt:
      'Different study designs provide different levels of evidence. Always inspect the methods section first to verify whether a claim rests on associative, correlational, or causal trial architecture.',
    keyTakeaway:
      'Cross-sectional studies show association, longitudinal cohorts track correlation over time, and randomized controlled trials (RCTs) establish causal intervention efficacy.',
    sections: [
      {
        paragraphs: [
          'Not all published papers carry equal evidentiary weight. Before applying a headline finding to clinical practice or supplementation, check the study’s methods section to see how the hypothesis was actually tested:',
        ],
        bullets: [
          'Cross-sectional studies examine a cohort at a single point in time, offering associative snapshots without temporal causality.',
          'Longitudinal studies track a cohort across multiple time points, establishing temporal sequence and stronger correlational signals.',
          'Randomized controlled trials (RCTs) assign an active intervention versus a control group, enabling causal inference.',
        ],
      },
      {
        heading: 'Magnesium Case Studies Across Evidence Tiers',
        paragraphs: [
          'If you are unsure what kind of study you are reading, read the Methods section first to frame the results accurately. The three PubMed references below illustrate cross-sectional, longitudinal, and RCT designs applied to magnesium.',
        ],
      },
    ],
    references: [
      {
        citation: 'Study #1 — Cross-Sectional Magnesium Cohort.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38703902/',
      },
      {
        citation: 'Study #2 — Longitudinal Magnesium Study.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32667538/',
      },
      {
        citation: 'Study #3 — Randomized Controlled Trial on Magnesium.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34260036/',
      },
    ],
  },
];
