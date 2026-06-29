export type Sector = 
  | 'Sun\'iy intellekt va ma\'lumotlar fanlari' 
  | 'FinTech & Business' 
  | 'Eco & Green Energy' 
  | 'Bio & HealthTech' 
  | 'EdTech & Content';

export interface SkillsMatrix {
  management: {
    decisionMaking: number;
    delegation: number;
    strategicThinking: number;
  };
  cognitive: {
    analytical: number;
    criticalThinking: number;
    algorithmicLogic: number;
  };
  social: {
    eq: number;
    negotiation: number;
    teamwork: number;
  };
  techCreative: {
    digitalLiteracy: number;
    visualization: number;
  };
}

export interface Profession {
  id: string;
  name: string;
  sector: Sector;
  requirements: SkillsMatrix;
  roadmap: string[];
  prospects: number; // %
  salaryCategory: 'Low' | 'Medium' | 'High' | 'Very High';
  description: string;
  detailedInfo: string;
  videoUrl: string;
}

export interface Question {
  id: number;
  stage: 1 | 2 | 3 | 4;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  module?: 'StressTest' | 'GrowthMindset' | 'AQ';
  options: {
    text: string;
    weights: Partial<{
      [K in keyof SkillsMatrix]: Partial<Record<keyof SkillsMatrix[K], number>>;
    }> & {
      stressTest?: number;
      growthMindset?: number;
      aq?: number;
    };
  }[];
}

export const professions: Profession[] = [
  {
    id: 'ai-manager',
    name: 'Sun\'iy intellekt bo\'yicha o\'quv menejeri',
    sector: 'Sun\'iy intellekt va ma\'lumotlar fanlari',
    requirements: {
      management: { decisionMaking: 8, delegation: 7, strategicThinking: 9 },
      cognitive: { analytical: 9, criticalThinking: 8, algorithmicLogic: 9 },
      social: { eq: 8, negotiation: 7, teamwork: 8 },
      techCreative: { digitalLiteracy: 10, visualization: 7 }
    },
    roadmap: ['AI Fundamentals', 'Project Management', 'Curriculum Design', 'Ethics in AI'],
    prospects: 98,
    salaryCategory: 'Very High',
    description: 'AI tizimlarini o\'rgatish va joriy etish jarayonlarini boshqaruvchi mutaxassis.',
    detailedInfo: 'Ushbu soha AI texnologiyalarini ta\'lim va biznes jarayonlariga integratsiya qilishga qaratilgan. Menejer sifatida siz nafaqat texnik bilimlarga, balki odamlarga ushbu vositalardan qanday samarali foydalanishni o\'rgatish qobiliyatiga ham ega bo\'lishingiz kerak.',
    videoUrl: 'https://www.youtube.com/results?search_query=ai+management+course'
  },
  {
    id: 'crypto-analyst',
    name: 'Kripto-tahlilchi',
    sector: 'FinTech & Business',
    requirements: {
      management: { decisionMaking: 7, delegation: 5, strategicThinking: 8 },
      cognitive: { analytical: 10, criticalThinking: 9, algorithmicLogic: 9 },
      social: { eq: 6, negotiation: 7, teamwork: 6 },
      techCreative: { digitalLiteracy: 10, visualization: 8 }
    },
    roadmap: ['Blockchain Basics', 'Financial Analysis', 'Trading Strategies', 'Risk Management'],
    prospects: 95,
    salaryCategory: 'High',
    description: 'Kriptovalyuta bozori va blokcheyn loyihalarini tahlil qiluvchi mutaxassis.',
    detailedInfo: 'Kripto-tahlilchi bozor tendensiyalarini o\'rganadi, blokcheyn loyihalarining fundamental qiymatini baholaydi va investitsiya xatarlarini kamaytirish bo\'yicha tavsiyalar beradi. Matematik va iqtisodiy bilimlar bu yerda juda muhim.',
    videoUrl: 'https://www.youtube.com/results?search_query=crypto+analysis+for+beginners'
  },
  {
    id: 'eco-logist',
    name: 'Ekolog-logist',
    sector: 'Eco & Green Energy',
    requirements: {
      management: { decisionMaking: 8, delegation: 7, strategicThinking: 8 },
      cognitive: { analytical: 8, criticalThinking: 8, algorithmicLogic: 7 },
      social: { eq: 7, negotiation: 8, teamwork: 9 },
      techCreative: { digitalLiteracy: 7, visualization: 6 }
    },
    roadmap: ['Supply Chain Management', 'Environmental Science', 'Green Logistics', 'Regulatory Compliance'],
    prospects: 92,
    salaryCategory: 'High',
    description: 'Logistika jarayonlarini ekologik me\'yorlarga moslashtiruvchi mutaxassis.',
    detailedInfo: 'Ushbu kasb egalari yuk tashish va saqlash jarayonlarida atrof-muhitga yetkaziladigan zararni minimallashtirish ustida ishlaydilar. "Yashil" iqtisodiyot rivojlanishi bilan bu soha mutaxassislariga talab ortib bormoqda.',
    videoUrl: 'https://www.youtube.com/results?search_query=green+logistics+and+supply+chain+management'
  },
  {
    id: 'tele-medicine-op',
    name: 'Tele-tibbiyot operatori',
    sector: 'Bio & HealthTech',
    requirements: {
      management: { decisionMaking: 7, delegation: 6, strategicThinking: 6 },
      cognitive: { analytical: 7, criticalThinking: 7, algorithmicLogic: 6 },
      social: { eq: 10, negotiation: 7, teamwork: 8 },
      techCreative: { digitalLiteracy: 9, visualization: 5 }
    },
    roadmap: ['Medical Basics', 'Digital Health Platforms', 'Communication Skills', 'Patient Care'],
    prospects: 96,
    salaryCategory: 'Medium',
    description: 'Masofaviy tibbiy xizmatlar ko\'rsatish jarayonini muvofiqlashtiruvchi mutaxassis.',
    detailedInfo: 'Tele-tibbiyot operatori shifokor va bemor o\'rtasidagi raqamli ko\'prik vazifasini bajaradi. U texnik platformalarni boshqaradi va tibbiy ma\'lumotlarning xavfsiz uzatilishini ta\'minlaydi.',
    videoUrl: 'https://www.youtube.com/results?search_query=telemedicine+technology+training'
  },
  {
    id: 'vr-teacher',
    name: 'Virtual reallik (VR) o\'qituvchisi',
    sector: 'EdTech & Content',
    requirements: {
      management: { decisionMaking: 6, delegation: 5, strategicThinking: 8 },
      cognitive: { analytical: 7, criticalThinking: 8, algorithmicLogic: 7 },
      social: { eq: 9, negotiation: 7, teamwork: 8 },
      techCreative: { digitalLiteracy: 10, visualization: 10 }
    },
    roadmap: ['Pedagogy', 'VR/AR Tools', 'Content Creation', 'Interactive Learning'],
    prospects: 94,
    salaryCategory: 'High',
    description: 'VR texnologiyalari yordamida interaktiv darslar o\'tuvchi mutaxassis.',
    detailedInfo: 'VR o\'qituvchisi ta\'limni qiziqarli sarguzashtga aylantiradi. U virtual laboratoriyalar va tarixiy sayohatlar orqali murakkab mavzularni tushuntirish uchun zamonaviy gadjetlardan foydalanadi.',
    videoUrl: 'https://www.youtube.com/results?search_query=teaching+in+virtual+reality'
  },
  {
    id: 'prompt-engineer',
    name: 'Tezkor muhandis (Prompt Engineer)',
    sector: 'Sun\'iy intellekt va ma\'lumotlar fanlari',
    requirements: {
      management: { decisionMaking: 6, delegation: 4, strategicThinking: 8 },
      cognitive: { analytical: 9, criticalThinking: 10, algorithmicLogic: 9 },
      social: { eq: 7, negotiation: 6, teamwork: 8 },
      techCreative: { digitalLiteracy: 10, visualization: 7 }
    },
    roadmap: ['LLM Architectures', 'Natural Language Processing', 'Iterative Testing', 'Creative Writing'],
    prospects: 99,
    salaryCategory: 'Very High',
    description: 'AI modellaridan eng yaxshi natijalarni olish uchun so\'rovlarni optimallashtiruvchi mutaxassis.',
    detailedInfo: 'Prompt-muhandislik - bu sun\'iy intellekt bilan muloqot qilish san\'ati. Siz AIga qanday qilib aniq va foydali javoblar berishni o\'rgatasiz, bu esa ballar sohalarda samaradorlikni oshiradi.',
    videoUrl: 'https://www.youtube.com/results?search_query=prompt+engineering+full+course'
  },
  {
    id: 'startup-manager',
    name: 'Startap menejeri',
    sector: 'FinTech & Business',
    requirements: {
      management: { decisionMaking: 10, delegation: 9, strategicThinking: 10 },
      cognitive: { analytical: 8, criticalThinking: 9, algorithmicLogic: 7 },
      social: { eq: 9, negotiation: 10, teamwork: 9 },
      techCreative: { digitalLiteracy: 8, visualization: 7 }
    },
    roadmap: ['Entrepreneurship', 'Venture Capital', 'Product-Market Fit', 'Scaling Strategies'],
    prospects: 93,
    salaryCategory: 'Very High',
    description: 'Yangi biznes g\'oyalarni amalga oshirish va rivojlantirish jarayonini boshqaruvchi mutaxassis.',
    detailedInfo: 'Startap menejeri g\'oyani haqiqiy biznesga aylantirish uchun mas\'uldir. U jamoani yig\'adi, investitsiyalar jalb qiladi va mahsulotni bozorga olib chiqish strategiyasini ishlab chiqadi.',
    videoUrl: 'https://www.youtube.com/results?search_query=startup+management+course'
  }
];

export const questions: Question[] = [
  // Stage 1: Management & Social
  {
    id: 1, stage: 1, difficulty: 'easy', text: "Loyiha inqirozga uchraganda birinchi navbatda nima qilasiz?",
    options: [
      { text: "Mas'uliyatni o'z bo'ynimga olib, tezkor qaror qabul qilaman", weights: { management: { decisionMaking: 2 } } },
      { text: "Vazifalarni jamoa a'zolariga qayta taqsimlayman", weights: { management: { delegation: 2 } } },
      { text: "Vaziyatni tahlil qilib, uzoq muddatli strategiyani qayta ko'rib chiqaman", weights: { management: { strategicThinking: 2 } } }
    ]
  },
  {
    id: 2, stage: 1, difficulty: 'easy', text: "Boshqalar bilan kelishmovchilik yuzaga kelganda:",
    options: [
      { text: "Ularning his-tuyg'ularini tushunishga harakat qilaman", weights: { social: { eq: 2 } } },
      { text: "O'z fikrimni dalillar bilan isbotlab, kelishuvga erishaman", weights: { social: { negotiation: 2 } } },
      { text: "Umumiy maqsad yo'lida murosaga kelaman", weights: { social: { teamwork: 2 } } }
    ]
  },
  {
    id: 3, stage: 1, difficulty: 'medium', text: "Jamoada yangi g'oya taklif qilinganda:",
    options: [
      { text: "G'oyaning uzoq muddatli ta'sirini baholayman", weights: { management: { strategicThinking: 2 } } },
      { text: "G'oyani amalga oshirish uchun kimga nima topshirishni o'ylayman", weights: { management: { delegation: 2 } } },
      { text: "Jamoaning g'oyaga bo'lgan munosabatini his qilaman", weights: { social: { eq: 2 } } }
    ]
  },
  {
    id: 4, stage: 1, difficulty: 'medium', text: "Muzokaralar davomida qarshi tomon qat'iy turib olgan bo'lsa:",
    options: [
      { text: "Yangi takliflar bilan vaziyatni yumshataman", weights: { social: { negotiation: 2 } } },
      { text: "Jamoam bilan maslahatlashib, umumiy pozitsiyani saqlayman", weights: { social: { teamwork: 2 } } },
      { text: "Qaror qabul qilishni keyinga qoldiraman", weights: { management: { decisionMaking: 1 } } }
    ]
  },
  {
    id: 5, stage: 1, difficulty: 'hard', text: "Strategik rejalashtirishda siz uchun eng muhimi:",
    options: [
      { text: "Kelajakdagi 5 yillik tendensiyalarni bashorat qilish", weights: { management: { strategicThinking: 3 } } },
      { text: "Resurslarni maksimal samaradorlik bilan taqsimlash", weights: { management: { delegation: 2 } } },
      { text: "Barcha manfaatdor tomonlar bilan konsensusga erishish", weights: { social: { negotiation: 2 } } }
    ]
  },
  {
    id: 6, stage: 1, difficulty: 'hard', text: "Katta jamoani boshqarishda sizning uslubingiz:",
    options: [
      { text: "Har bir a'zoning hissiy holatini nazorat qilish", weights: { social: { eq: 3 } } },
      { text: "Vazifalarni qat'iy iyerarxiya asosida topshirish", weights: { management: { delegation: 2 } } },
      { text: "Tezkor va xavfli qarorlarni mustaqil qabul qilish", weights: { management: { decisionMaking: 3 } } }
    ]
  },

  // Stage 2: Cognitive
  {
    id: 11, stage: 2, difficulty: 'easy', text: "Murakkab ma'lumotlar to'plamini ko'rganingizda:",
    options: [
      { text: "Yashirin qonuniyatlarni qidiraman", weights: { cognitive: { analytical: 2 } } },
      { text: "Ma'lumotlarning ishonchliligini tekshiraman", weights: { cognitive: { criticalThinking: 2 } } },
      { text: "Jarayonni bosqichma-bosqich tizimlashtiraman", weights: { cognitive: { algorithmicLogic: 2 } } }
    ]
  },
  {
    id: 12, stage: 2, difficulty: 'easy', text: "Biror muammoning yechimini topishda:",
    options: [
      { text: "Mantiqiy zanjir hosil qilaman", weights: { cognitive: { algorithmicLogic: 2 } } },
      { text: "Barcha ehtimoliy xatolarni oldindan ko'rishga harakat qilaman", weights: { cognitive: { criticalThinking: 2 } } },
      { text: "Faktlar va raqamlarga tayanaman", weights: { cognitive: { analytical: 2 } } }
    ]
  },
  {
    id: 13, stage: 2, difficulty: 'medium', text: "Tizimli xatolik yuz berganda sizning yondashuvingiz:",
    options: [
      { text: "Xatolikning tub ildizini tahlil qilaman", weights: { cognitive: { analytical: 2 } } },
      { text: "Mavjud algoritmni qayta ko'rib chiqaman", weights: { cognitive: { algorithmicLogic: 2 } } },
      { text: "Boshqa mutaxassislar fikrini tanqidiy o'rganaman", weights: { cognitive: { criticalThinking: 2 } } }
    ]
  },
  {
    id: 14, stage: 2, difficulty: 'hard', text: "Noaniqlik sharoitida qaror qabul qilishda:",
    options: [
      { text: "Ehtimollar nazariyasidan foydalanib tahlil qilaman", weights: { cognitive: { analytical: 3 } } },
      { text: "Paradoksal yechimlarni tanqidiy baholayman", weights: { cognitive: { criticalThinking: 3 } } },
      { text: "Murakkab tizimlar mantiqini modellashtiraman", weights: { cognitive: { algorithmicLogic: 3 } } }
    ]
  },
  {
    id: 15, stage: 2, difficulty: 'medium', text: "Bir-biriga zid bo'lgan ikki xil ma'lumot kelganda:",
    options: [
      { text: "Uchinchi manba orqali tekshiraman", weights: { cognitive: { criticalThinking: 2 } } },
      { text: "Ma'lumotlarning kelib chiqish mantiqini tahlil qilaman", weights: { cognitive: { analytical: 2 } } }
    ]
  },
  {
    id: 16, stage: 2, difficulty: 'hard', text: "Katta hajmdagi tartibsiz ma'lumotlardan yangi bilim yaratishda:",
    options: [
      { text: "Gipotezalar zanjirini tekshiraman", weights: { cognitive: { criticalThinking: 3 } } },
      { text: "Ma'lumotlar arxitekturasini qayta qura olaman", weights: { cognitive: { algorithmicLogic: 3 } } }
    ]
  },

  // Stage 3: Tech & Creative
  {
    id: 21, stage: 3, difficulty: 'easy', text: "Yangi dasturiy ta'minotni o'rganish siz uchun:",
    options: [
      { text: "Juda oson va qiziqarli", weights: { techCreative: { digitalLiteracy: 2 } } },
      { text: "G'oyalarimni vizual ko'rinishda ifodalashga yordam beradi", weights: { techCreative: { visualization: 2 } } }
    ]
  },
  {
    id: 22, stage: 3, difficulty: 'easy', text: "Murakkab g'oyani tushuntirish kerak bo'lganda:",
    options: [
      { text: "Chizma yoki infografika chizaman", weights: { techCreative: { visualization: 2 } } },
      { text: "Eng yangi texnologik vositalardan foydalanaman", weights: { techCreative: { digitalLiteracy: 2 } } }
    ]
  },
  {
    id: 23, stage: 3, difficulty: 'medium', text: "Raqamli interfeys yaratishda sizga nima yoqadi?",
    options: [
      { text: "Foydalanuvchi tajribasini (UX) vizuallashtirish", weights: { techCreative: { visualization: 2 } } },
      { text: "Texnik imkoniyatlarni maksimal darajada ishlatish", weights: { techCreative: { digitalLiteracy: 2 } } }
    ]
  },
  {
    id: 24, stage: 3, difficulty: 'hard', text: "Yangi texnologik ekotizim yaratishda:",
    options: [
      { text: "Ma'lumotlar oqimini vizual modellashtiraman", weights: { techCreative: { visualization: 3 } } },
      { text: "Murakkab raqamli arxitekturani loyihalashtiraman", weights: { techCreative: { digitalLiteracy: 3 } } }
    ]
  },
  {
    id: 25, stage: 3, difficulty: 'medium', text: "Ma'lumotlarni taqdim etishda eng muhimi:",
    options: [
      { text: "Estetik va tushunarli dizayn", weights: { techCreative: { visualization: 2 } } },
      { text: "Interaktiv va funksional vositalar", weights: { techCreative: { digitalLiteracy: 2 } } }
    ]
  },
  {
    id: 26, stage: 3, difficulty: 'hard', text: "Kelajak texnologiyalarini loyihalashda:",
    options: [
      { text: "Inson va mashina interfeysini vizuallashtiraman", weights: { techCreative: { visualization: 3 } } },
      { text: "Kvant hisoblash mantiqini tushunishga harakat qilaman", weights: { techCreative: { digitalLiteracy: 3 } } }
    ]
  },

  // Stage 4: Smart Modules (Stress, Growth, AQ)
  {
    id: 31, stage: 4, difficulty: 'easy', text: "Sizga sog'lig'ingizga xavf tug'dirishi mumkin bo'lgan o'ta og'ir vazifa berildi. Nima qilasiz?",
    module: 'StressTest',
    options: [
      { text: "Vahimaga tushmasdan, xavfsiz yo'lni qidiraman", weights: { stressTest: 2 } },
      { text: "Ishni to'xtatib, vaziyatni baholayman", weights: { stressTest: 1 } }
    ]
  },
  {
    id: 32, stage: 4, difficulty: 'easy', text: "Sohangizda mutlaqo yangi texnologiya paydo bo'ldi. Sizning munosabatingiz?",
    module: 'GrowthMindset',
    options: [
      { text: "Darhol o'rganishga kirishaman", weights: { growthMindset: 2 } },
      { text: "Ehtiyoj tug'ilganda o'rganaman", weights: { growthMindset: 1 } }
    ]
  },
  {
    id: 33, stage: 4, difficulty: 'easy', text: "Ish joyingizda kutilmagan o'zgarish yuz berdi (masalan, yangi rahbar). Qanday moslashasiz?",
    module: 'AQ',
    options: [
      { text: "Yangi sharoitga tezda ko'nikib, ijobiy tomonlarni qidiraman", weights: { aq: 2 } },
      { text: "Eski tartibni sog'inaman, lekin ishlashda davom etaman", weights: { aq: 1 } }
    ]
  },
  {
    id: 34, stage: 4, difficulty: 'medium', text: "Dunyo iqtisodiyoti butunlay o'zgardi va kasbingiz keraksiz bo'lib qoldi. Nima qilasiz?",
    module: 'AQ',
    options: [
      { text: "Tezda yangi sohani egallayman", weights: { aq: 2 } },
      { text: "Mavjud bilimlarimni yangi sharoitga moslashtiraman", weights: { aq: 1 } }
    ]
  },
  {
    id: 35, stage: 4, difficulty: 'medium', text: "Muvaffaqiyatsizlikka uchraganingizda:",
    options: [
      { text: "Xatolarni tahlil qilib, qaytadan urinaman", weights: { growthMindset: 2 } },
      { text: "Vaziyatga moslashib, boshqa yo'l qidiraman", weights: { aq: 2 } }
    ]
  },
  {
    id: 36, stage: 4, difficulty: 'hard', text: "Global inqiroz sharoitida butun jamoangiz umidsizlikka tushgan. Sizning harakatingiz?",
    module: 'StressTest',
    options: [
      { text: "Xotirjamlikni saqlab, jamoani yangi maqsadlar sari ilhomlantiraman", weights: { stressTest: 3, aq: 1 } },
      { text: "Vaziyatni realistik baholab, qat'iy intizom joriy qilaman", weights: { stressTest: 2, management: { decisionMaking: 1 } } }
    ]
  },
  {
    id: 37, stage: 4, difficulty: 'hard', text: "Butunlay notanish madaniy va iqtisodiy muhitda biznes boshlash kerak bo'lsa:",
    options: [
      { text: "Mahalliy sharoitga maksimal darajada moslashaman", weights: { aq: 3 } },
      { text: "O'z qadriyatlarimni saqlab, yangi imkoniyatlarni o'rganaman", weights: { growthMindset: 3 } }
    ]
  }
];
