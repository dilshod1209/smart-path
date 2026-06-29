export interface SchoolSkills {
  logic: number;
  communication: number;
  creativity: number;
  leadership: number;
  technical: number;
  // Smart Coefficients
  stressTest?: number;
  growthMindset?: number;
  aq?: number;
}

export interface SchoolProfession {
  id: string;
  name: string;
  sector: string;
  requiredSubjects: string[];
  universityRecommendation: string;
  leadershipLevel: number; // 1-10
  description: string;
  skills: SchoolSkills;
  videoUrl?: string;
}

export interface SchoolQuestion {
  id: number;
  block: 'Fanlar' | 'Shaxsiy' | 'Ish muhiti' | 'Maqsadlar';
  text: string;
  options: {
    text: string;
    weights: Partial<SchoolSkills>;
  }[];
}

export const schoolQuestions: SchoolQuestion[] = [
  // BLOCK 1: Fanlar (7 questions)
  {
    id: 1, block: 'Fanlar', text: "Matematika darsida murakkab misol berilsa, nima qilasiz?",
    options: [
      { text: "Mantiqiy yechimini topmaguncha to'xtamayman", weights: { logic: 3, stressTest: 2 } },
      { text: "Do'stlarim bilan birga yechishga harakat qilaman", weights: { communication: 2, technical: 1, aq: 1 } },
      { text: "Yechimning noodatiy va qisqa yo'lini qidiraman", weights: { creativity: 3, growthMindset: 1 } },
      { text: "Sinfdoshlarimga tushuntirib, jamoani boshqaraman", weights: { leadership: 3, communication: 1 } }
    ]
  },
  {
    id: 2, block: 'Fanlar', text: "Tabiiy fanlar (Fizika, Biologiya) darsida tajriba o'tkazish sizga qanchalik yoqadi?",
    options: [
      { text: "Jarayonni diqqat bilan kuzatib, xulosalar qilaman", weights: { logic: 2, technical: 1, stressTest: 1 } },
      { text: "Tajriba natijalarini chiroyli qilib vizuallashtiraman", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Asbob-uskunalar bilan ishlash va ularni sozlash yoqadi", weights: { technical: 3, aq: 1 } },
      { text: "Guruhda kim nima qilishini belgilab beraman", weights: { leadership: 2, communication: 1, stressTest: 1 } }
    ]
  },
  {
    id: 3, block: 'Fanlar', text: "Adabiyot darsida asar qahramonlarini tahlil qilganda:",
    options: [
      { text: "Ularning xatti-harakatlari sababini mantiqan tushuntiraman", weights: { logic: 2, aq: 2 } },
      { text: "Qahramonlar o'rnida bo'lib, his-tuyg'ularini so'zlab beraman", weights: { communication: 3, growthMindset: 1 } },
      { text: "Asar syujetini o'zgartirib, yangi yakun o'ylab topaman", weights: { creativity: 3, stressTest: 1 } },
      { text: "Qahramonlarning yetakchilik xususiyatlarini baholayman", weights: { leadership: 2, communication: 1 } }
    ]
  },
  {
    id: 4, block: 'Fanlar', text: "Informatika darsida dasturlash yoki kompyuter o'yinlari yaratish haqida nima deysiz?",
    options: [
      { text: "Kod yozish va algoritmlar tuzish juda qiziqarli", weights: { logic: 3, technical: 2, growthMindset: 2 } },
      { text: "O'yinning dizayni va qahramonlarini chizish yoqadi", weights: { creativity: 3, aq: 1 } },
      { text: "Kompyuterning ichki tuzilishi va texnikasini o'rganaman", weights: { technical: 3, stressTest: 1 } },
      { text: "Loyiha jamoasini yig'ib, katta o'yin yaratishni xohlayman", weights: { leadership: 2, communication: 1, aq: 2 } }
    ]
  },
  {
    id: 5, block: 'Fanlar', text: "Tarix darsida o'tmishdagi voqealarni o'rganayotganda:",
    options: [
      { text: "Sana va faktlar o'rtasidagi bog'liqlikni tahlil qilaman", weights: { logic: 3, aq: 1 } },
      { text: "Tarixiy shaxslarning nutq so'zlash mahoratini o'rganaman", weights: { communication: 2, leadership: 1, growthMindset: 1 } },
      { text: "O'sha davr muhitini tasavvur qilib, rasm chizaman", weights: { creativity: 2, stressTest: 1 } },
      { text: "Sarkardalarning strategik qarorlariga qiziqaman", weights: { leadership: 3, logic: 1, aq: 2 } }
    ]
  },
  {
    id: 6, block: 'Fanlar', text: "Chet tili darsida yangi so'zlarni qanday yodlaysiz?",
    options: [
      { text: "So'zlarni guruhlarga bo'lib, mantiqiy bog'layman", weights: { logic: 2, growthMindset: 2 } },
      { text: "Sinfdoshlarim bilan muloqot qilib, gaplashib o'rganaman", weights: { communication: 3, aq: 2 } },
      { text: "So'zlarga mos rasmlar yoki hikoyalar o'ylab topaman", weights: { creativity: 2, growthMindset: 1 } },
      { text: "Ilovalar va texnologik vositalardan foydalanaman", weights: { technical: 3, stressTest: 1 } }
    ]
  },
  {
    id: 7, block: 'Fanlar', text: "Tasviriy san'at yoki Texnologiya darsida:",
    options: [
      { text: "Har bir detalni aniq o'lchab, chizmalarga tayanaman", weights: { logic: 2, technical: 1, stressTest: 2 } },
      { text: "Mutlaqo yangi va noodatiy narsa yaratishga urinaman", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Murakkab texnik qurilmalar yoki modellar yasayman", weights: { technical: 3, aq: 1 } },
      { text: "Ko'rgazma tashkil qilib, ishlarni taqdim etaman", weights: { leadership: 2, communication: 1, aq: 2 } }
    ]
  },

  // BLOCK 2: Shaxsiy (7 questions)
  {
    id: 8, block: 'Shaxsiy', text: "Bo'sh vaqtingizda ko'proq nima bilan shug'ullanasiz?",
    options: [
      { text: "Shaxmat yoki mantiqiy boshqotirmalar yechaman", weights: { logic: 3, growthMindset: 1 } },
      { text: "Do'stlarim bilan uchrashib, suhbatlashaman", weights: { communication: 3, aq: 1 } },
      { text: "Rasm chizaman, musiqa yarataman yoki ijod qilaman", weights: { creativity: 3, stressTest: 1 } },
      { text: "Gadjetlarni tuzataman yoki yangi ilovalarni sinayman", weights: { technical: 3, growthMindset: 1 } }
    ]
  },
  {
    id: 9, block: 'Shaxsiy', text: "Siz uchun eng muhim xususiyat qaysi?",
    options: [
      { text: "Aniq va mantiqiy fikrlash", weights: { logic: 3, stressTest: 1 } },
      { text: "Odamlar bilan tez til topishish", weights: { communication: 3, aq: 2 } },
      { text: "Boy tasavvur va kreativlik", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Mas'uliyatni bo'yinga olish va boshqarish", weights: { leadership: 3, aq: 1 } }
    ]
  },
  {
    id: 10, block: 'Shaxsiy', text: "Biror muammoga duch kelsangiz:",
    options: [
      { text: "Sababini topib, bosqichma-bosqich yechaman", weights: { logic: 3, stressTest: 2 } },
      { text: "Boshqalardan maslahat so'rab, birga hal qilaman", weights: { communication: 2, leadership: 1, aq: 2 } },
      { text: "Kutilmagan va qiziqarli yechim o'ylab topaman", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Texnik vositalar yoki internetdan yordam qidiraman", weights: { technical: 2, aq: 1 } }
    ]
  },
  {
    id: 11, block: 'Shaxsiy', text: "Sizni nima ko'proq ilhomlantiradi?",
    options: [
      { text: "Murakkab jumboqlarni yechish", weights: { logic: 3, stressTest: 1 } },
      { text: "Insonlarga yordam berish va muloqot", weights: { communication: 3, aq: 2 } },
      { text: "Yangi kashfiyotlar va texnologiyalar", weights: { technical: 3, growthMindset: 2 } },
      { text: "Katta loyihalarni boshqarish va g'alaba", weights: { leadership: 3, aq: 1 } }
    ]
  },
  {
    id: 12, block: 'Shaxsiy', text: "Sizningcha, muvaffaqiyat kaliti nimada?",
    options: [
      { text: "Bilim va intizomli mehnatda", weights: { logic: 2, technical: 1, stressTest: 2 } },
      { text: "To'g'ri muloqot va aloqalarda", weights: { communication: 3, aq: 2 } },
      { text: "Noyob g'oyalar va jasoratda", weights: { creativity: 3, growthMindset: 3 } },
      { text: "Jamoani birlashtira olishda", weights: { leadership: 3, aq: 1 } }
    ]
  },
  {
    id: 13, block: 'Shaxsiy', text: "Yangi narsalarni o'rganishda qaysi usul sizga qulay?",
    options: [
      { text: "Kitob o'qib, tahlil qilish", weights: { logic: 3, growthMindset: 1 } },
      { text: "Video darslar ko'rib, amalda sinash", weights: { technical: 3, aq: 1 } },
      { text: "Muhokamalarda qatnashib, savol berish", weights: { communication: 3, aq: 2 } },
      { text: "O'zim loyiha boshlab, o'rganish", weights: { leadership: 2, creativity: 1, growthMindset: 3 } }
    ]
  },
  {
    id: 14, block: 'Shaxsiy', text: "Sizni qanday do'st deb bilishadi?",
    options: [
      { text: "Aqlli va maslahatgo'y", weights: { logic: 2, leadership: 1, aq: 1 } },
      { text: "Quvnoq va suhbatdosh", weights: { communication: 3, aq: 2 } },
      { text: "G'oyalarga boy va qiziqarli", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Har qanday texnik muammoni hal qiluvchi", weights: { technical: 3, stressTest: 1 } }
    ]
  },

  // BLOCK 3: Ish muhiti (6 questions)
  {
    id: 15, block: 'Ish muhiti', text: "Kelajakda qanday joyda ishlashni xohlaysiz?",
    options: [
      { text: "Tinch, laboratoriya yoki ofisda", weights: { logic: 3, stressTest: 1 } },
      { text: "Odamlar ko'p, faol muloqot bor joyda", weights: { communication: 3, aq: 2 } },
      { text: "Zamonaviy texnologiyalar bilan jihozlangan studiyada", weights: { technical: 3, creativity: 1, growthMindset: 2 } },
      { text: "O'z kompaniyamda, rahbar sifatida", weights: { leadership: 3, aq: 2 } }
    ]
  },
  {
    id: 16, block: 'Ish muhiti', text: "Jamoada ishlaganda sizning rolingiz:",
    options: [
      { text: "Ma'lumotlarni yig'uvchi va tahlilchi", weights: { logic: 3, stressTest: 1 } },
      { text: "Jamoa a'zolarini kelishtiruvchi", weights: { communication: 3, aq: 3 } },
      { text: "Yangi g'oyalar generatori", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Jarayonni boshqaruvchi sardor", weights: { leadership: 3, aq: 1 } }
    ]
  },
  {
    id: 17, block: 'Ish muhiti', text: "Ishingizda siz uchun nima muhimroq?",
    options: [
      { text: "Aniq natija va mantiqiy tartib", weights: { logic: 3, stressTest: 2 } },
      { text: "Yaxshi jamoa va do'stona muhit", weights: { communication: 3, aq: 2 } },
      { text: "Erkinlik va ijodiy yondashuv", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Eng so'nggi texnik imkoniyatlar", weights: { technical: 3, aq: 1 } }
    ]
  },
  {
    id: 18, block: 'Ish muhiti', text: "Agar sizga katta loyiha berilsa:",
    options: [
      { text: "Reja tuzib, har bir qadamni hisoblayman", weights: { logic: 3, stressTest: 3 } },
      { text: "Hamkorlar topib, muzokaralar o'tkazaman", weights: { communication: 3, aq: 2 } },
      { text: "Loyiha dizayni va brendini yarataman", weights: { creativity: 3, growthMindset: 1 } },
      { text: "Mas'uliyatni olib, jamoani boshqaraman", weights: { leadership: 3, aq: 2 } }
    ]
  },
  {
    id: 19, block: 'Ish muhiti', text: "Sizga qanday topshiriqlar ko'proq yoqadi?",
    options: [
      { text: "Diqqat va aniqlik talab qiladigan", weights: { logic: 3, stressTest: 2 } },
      { text: "Taqdimot qilish va so'zlash kerak bo'lgan", weights: { communication: 3, aq: 2 } },
      { text: "Noldan biror narsa yaratish", weights: { creativity: 3, growthMindset: 3 } },
      { text: "Murakkab texnik muammolarni yechish", weights: { technical: 3, aq: 1 } }
    ]
  },
  {
    id: 20, block: 'Ish muhiti', text: "Ish joyingizda tartib qanday bo'lishi kerak?",
    options: [
      { text: "Hamma narsa o'z joyida, qat'iy intizom", weights: { logic: 2, leadership: 1, stressTest: 2 } },
      { text: "Erkin va ijodiy tartibsizlik", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Raqamli va avtomatlashgan", weights: { technical: 3, aq: 2 } },
      { text: "Muloqot uchun ochiq va qulay", weights: { communication: 3, aq: 1 } }
    ]
  },

  // BLOCK 4: Maqsadlar (5 questions)
  {
    id: 21, block: 'Maqsadlar', text: "Kelajakda kim bo'lishni orzu qilasiz?",
    options: [
      { text: "Mashhur olim yoki kashfiyotchi", weights: { logic: 3, growthMindset: 2 } },
      { text: "Muvaffaqiyatli tadbirkor yoki rahbar", weights: { leadership: 3, aq: 2 } },
      { text: "Taniqli san'atkor yoki dizayner", weights: { creativity: 3, growthMindset: 1 } },
      { text: "Kuchli muhandis yoki IT mutaxassisi", weights: { technical: 3, stressTest: 1 } }
    ]
  },
  {
    id: 22, block: 'Maqsadlar', text: "Siz uchun eng katta yutuq nima?",
    options: [
      { text: "Murakkab muammoni yechish", weights: { logic: 3, stressTest: 2 } },
      { text: "Insonlar hayotini yaxshilash", weights: { communication: 3, aq: 3 } },
      { text: "Dunyoni hayratda qoldiradigan narsa yaratish", weights: { creativity: 3, growthMindset: 3 } },
      { text: "Katta imperiya yoki jamoa qurish", weights: { leadership: 3, aq: 1 } }
    ]
  },
  {
    id: 23, block: 'Maqsadlar', text: "O'zingizni 10 yildan keyin qanday tasavvur qilasiz?",
    options: [
      { text: "Laboratoriyada yangi formula ustida", weights: { logic: 3, stressTest: 1 } },
      { text: "Sahnada yoki muzokaralar stolida", weights: { communication: 3, aq: 2 } },
      { text: "O'z studiyamda ijod qilayotgan", weights: { creativity: 3, growthMindset: 2 } },
      { text: "Katta zavod yoki IT markazni boshqarayotgan", weights: { leadership: 2, technical: 1, aq: 2 } }
    ]
  },
  {
    id: 24, block: 'Maqsadlar', text: "Sizni nima ko'proq baxtli qiladi?",
    options: [
      { text: "Yangi bilimlar olish", weights: { logic: 3, growthMindset: 3 } },
      { text: "Yaxshi do'stlar orttirish", weights: { communication: 3, aq: 2 } },
      { text: "G'oyalarni amalga oshirish", weights: { creativity: 3, growthMindset: 1 } },
      { text: "Maqsadlarga erishish va g'alaba", weights: { leadership: 3, stressTest: 1 } }
    ]
  },
  {
    id: 25, block: 'Maqsadlar', text: "Dunyoni o'zgartirish uchun nima qilgan bo'lardingiz?",
    options: [
      { text: "Yangi qonuniyatlarni kashf etardim", weights: { logic: 3, growthMindset: 2 } },
      { text: "Insonlar o'rtasida tinchlik o'rnatardim", weights: { communication: 3, aq: 3 } },
      { text: "Ekologik va aqlli texnologiyalar yaratardim", weights: { technical: 3, creativity: 1, aq: 2 } },
      { text: "Global loyihalarni boshqarardim", weights: { leadership: 3, stressTest: 2 } }
    ]
  }
];

export const schoolProfessions: SchoolProfession[] = [
  {
    id: 'ai-specialist',
    name: 'Sun\'iy intellekt muhandisi',
    sector: 'IT va Texnologiyalar',
    requiredSubjects: ['Matematika', 'Informatika', 'Ingliz tili'],
    universityRecommendation: 'TATU, Inha, Amity, Turin',
    leadershipLevel: 6,
    description: 'Aqlli tizimlar va robotlar uchun dasturlar yaratuvchi mutaxassis.',
    skills: { logic: 10, communication: 5, creativity: 7, leadership: 6, technical: 10 }
  },
  {
    id: 'cyber-security',
    name: 'Kiber-xavfsizlik tahlilchisi',
    sector: 'Xavfsizlik va IT',
    requiredSubjects: ['Matematika', 'Informatika'],
    universityRecommendation: 'TATU, Huquqni muhofaza qilish akademiyasi',
    leadershipLevel: 5,
    description: 'Internetdagi ma\'lumotlarni xakerlardan himoya qiluvchi mutaxassis.',
    skills: { logic: 9, communication: 4, creativity: 5, leadership: 5, technical: 10 }
  },
  {
    id: 'data-scientist',
    name: 'Ma\'lumotlar olimi (Data Scientist)',
    sector: 'IT va Tahlil',
    requiredSubjects: ['Matematika', 'Informatika', 'Iqtisod'],
    universityRecommendation: 'WIUT, MDIST, TATU',
    leadershipLevel: 4,
    description: 'Katta hajmdagi ma\'lumotlarni tahlil qilib, kelajakni bashorat qiluvchi mutaxassis.',
    skills: { logic: 10, communication: 6, creativity: 6, leadership: 4, technical: 9 }
  },
  {
    id: 'drone-pilot',
    name: 'Dron operatori',
    sector: 'Transport va Texnologiya',
    requiredSubjects: ['Fizika', 'Informatika'],
    universityRecommendation: 'Aviatsiya instituti, TATU',
    leadershipLevel: 4,
    description: 'Masofadan boshqariladigan uchuvchisiz qurilmalarni boshqaruvchi mutaxassis.',
    skills: { logic: 7, communication: 5, creativity: 6, leadership: 4, technical: 9 }
  },
  {
    id: 'game-developer',
    name: 'O\'yin yaratuvchi (Game Dev)',
    sector: 'IT va Ko\'ngilochar',
    requiredSubjects: ['Matematika', 'Informatika', 'Ingliz tili'],
    universityRecommendation: 'Inha, TATU, Amity',
    leadershipLevel: 5,
    description: 'Kompyuter va mobil o\'yinlar arxitekturasini yaratuvchi mutaxassis.',
    skills: { logic: 9, communication: 6, creativity: 10, leadership: 5, technical: 9 }
  },
  {
    id: 'ux-ui-designer',
    name: 'UX/UI dizayner',
    sector: 'Dizayn va IT',
    requiredSubjects: ['Informatika', 'San\'at', 'Psixologiya'],
    universityRecommendation: 'Inha, Amity, Milliy rassomlik va dizayn instituti',
    leadershipLevel: 4,
    description: 'Ilova va saytlarning foydalanuvchi uchun qulay va chiroyli ko\'rinishini yaratuvchi mutaxassis.',
    skills: { logic: 6, communication: 8, creativity: 10, leadership: 4, technical: 8 }
  },
  {
    id: 'digital-marketer',
    name: 'Raqamli marketolog',
    sector: 'Biznes va Reklama',
    requiredSubjects: ['O\'zbek tili', 'Ingliz tili', 'Psixologiya'],
    universityRecommendation: 'TSUE, WIUT, MDIST',
    leadershipLevel: 7,
    description: 'Internet orqali mahsulotlarni reklama qiluvchi va sotuvni oshiruvchi mutaxassis.',
    skills: { logic: 7, communication: 10, creativity: 9, leadership: 7, technical: 7 }
  },
  {
    id: 'bio-technologist',
    name: 'Bio-texnolog',
    sector: 'Tibbiyot va Fan',
    requiredSubjects: ['Biologiya', 'Kimyo', 'Matematika'],
    universityRecommendation: 'Tibbiyot akademiyasi, Milliy universitet',
    leadershipLevel: 5,
    description: 'Tirik organizmlar yordamida yangi dori-darmonlar va mahsulotlar yaratuvchi olim.',
    skills: { logic: 9, communication: 5, creativity: 8, leadership: 5, technical: 8 }
  },
  {
    id: 'renewable-energy-eng',
    name: 'Yashil energiya muhandisi',
    sector: 'Energetika va Ekologiya',
    requiredSubjects: ['Fizika', 'Matematika'],
    universityRecommendation: 'Turin, Texnika universiteti',
    leadershipLevel: 6,
    description: 'Quyosh va shamol energiyasidan foydalanish tizimlarini yaratuvchi mutaxassis.',
    skills: { logic: 8, communication: 6, creativity: 7, leadership: 6, technical: 9 }
  },
  {
    id: 'robotics-engineer',
    name: 'Robototexnika muhandisi',
    sector: 'Muhandislik va IT',
    requiredSubjects: ['Fizika', 'Matematika', 'Informatika'],
    universityRecommendation: 'Turin, Texnika universiteti, TATU',
    leadershipLevel: 6,
    description: 'Sanoat va maishiy xizmatlar uchun robotlar loyihalashtiruvchi mutaxassis.',
    skills: { logic: 9, communication: 5, creativity: 8, leadership: 6, technical: 10 }
  },
  {
    id: 'content-creator',
    name: 'Kontent-meyker / Blogger',
    sector: 'Media va Ko\'ngilochar',
    requiredSubjects: ['O\'zbek tili', 'Tarix', 'Ingliz tili'],
    universityRecommendation: 'Jurnalistika universiteti, San\'at instituti',
    leadershipLevel: 8,
    description: 'Ijtimoiy tarmoqlar uchun qiziqarli va foydali videolar, matnlar yaratuvchi mutaxassis.',
    skills: { logic: 5, communication: 10, creativity: 10, leadership: 8, technical: 7 }
  },
  {
    id: 'startup-founder',
    name: 'Startap asoschisi',
    sector: 'Biznes va Innovatsiya',
    requiredSubjects: ['Iqtisod', 'Matematika', 'Ingliz tili'],
    universityRecommendation: 'WIUT, TSUE, Team University',
    leadershipLevel: 10,
    description: 'Yangi innovatsion g\'oya asosida o\'z biznesini quruvchi tadbirkor.',
    skills: { logic: 8, communication: 9, creativity: 9, leadership: 10, technical: 6 }
  },
  {
    id: 'eco-auditor',
    name: 'Ekologik auditor',
    sector: 'Ekologiya va Huquq',
    requiredSubjects: ['Biologiya', 'Geografiya', 'Huquq'],
    universityRecommendation: 'Milliy universitet, Agrar universiteti',
    leadershipLevel: 7,
    description: 'Korxonalarning tabiatga zarar yetkazmayotganini tekshiruvchi mutaxassis.',
    skills: { logic: 8, communication: 8, creativity: 5, leadership: 7, technical: 6 }
  },
  {
    id: 'vr-ar-developer',
    name: 'VR/AR dasturchi',
    sector: 'IT va Dizayn',
    requiredSubjects: ['Informatika', 'Matematika', 'Fizika'],
    universityRecommendation: 'Inha, TATU, Turin',
    leadershipLevel: 5,
    description: 'Virtual va to\'ldirilgan reallik olamlarini yaratuvchi mutaxassis.',
    skills: { logic: 8, communication: 6, creativity: 10, leadership: 5, technical: 10 }
  },
  {
    id: 'neuro-psychologist',
    name: 'Neyropsixolog',
    sector: 'Tibbiyot va Psixologiya',
    requiredSubjects: ['Biologiya', 'Psixologiya'],
    universityRecommendation: 'Tibbiyot akademiyasi, Milliy universitet',
    leadershipLevel: 4,
    description: "Miya faoliyati va inson xulq-atvori o'rtasidagi bog'liqlikni o'rganuvchi mutaxassis.",
    skills: { logic: 9, communication: 9, creativity: 6, leadership: 4, technical: 5 },
    videoUrl: 'https://www.youtube.com/watch?v=0S_v6831_mI'
  },
  {
    id: 'agrotech-specialist',
    name: 'Agrotexnolog',
    sector: 'Qishloq xo\'jaligi va IT',
    requiredSubjects: ['Biologiya', 'Informatika'],
    universityRecommendation: 'Agrar universiteti, Turin',
    leadershipLevel: 6,
    description: "Qishloq xo'jaligiga aqlli texnologiyalarni joriy etuvchi mutaxassis.",
    skills: { logic: 8, communication: 6, creativity: 7, leadership: 6, technical: 8 },
    videoUrl: 'https://www.youtube.com/watch?v=8n_Vp1u_D0U'
  },
  {
    id: 'fintech-analyst',
    name: 'Fintex tahlilchi',
    sector: 'Moliya va IT',
    requiredSubjects: ['Matematika', 'Iqtisod', 'Informatika'],
    universityRecommendation: 'TSUE, WIUT, MDIST',
    leadershipLevel: 6,
    description: 'Bank va moliya sohasidagi raqamli texnologiyalarni tahlil qiluvchi mutaxassis.',
    skills: { logic: 10, communication: 7, creativity: 6, leadership: 6, technical: 8 }
  },
  {
    id: 'genetic-consultant',
    name: 'Genetik maslahatchi',
    sector: 'Tibbiyot va Genetika',
    requiredSubjects: ['Biologiya', 'Kimyo'],
    universityRecommendation: 'Tibbiyot akademiyasi',
    leadershipLevel: 4,
    description: 'Inson genomi asosida kasalliklarni bashorat qiluvchi va maslahat beruvchi mutaxassis.',
    skills: { logic: 10, communication: 8, creativity: 5, leadership: 4, technical: 7 }
  },
  {
    id: 'smart-city-designer',
    name: 'Aqlli shahar loyihachisi',
    sector: 'Arxitektura va IT',
    requiredSubjects: ['Matematika', 'Fizika', 'Informatika'],
    universityRecommendation: 'Arxitektura va qurilish instituti, Turin',
    leadershipLevel: 8,
    description: 'Texnologiyalar yordamida qulay va xavfsiz shaharlar loyihasini yaratuvchi mutaxassis.',
    skills: { logic: 9, communication: 7, creativity: 9, leadership: 8, technical: 8 }
  },
  {
    id: 'e-commerce-manager',
    name: 'E-commerce menejeri',
    sector: 'Biznes va Savdo',
    requiredSubjects: ['Iqtisod', 'Ingliz tili'],
    universityRecommendation: 'TSUE, WIUT',
    leadershipLevel: 8,
    description: "Onlayn do'konlar va savdo platformalarini boshqaruvchi mutaxassis.",
    skills: { logic: 7, communication: 9, creativity: 7, leadership: 8, technical: 8 }
  },
  {
    id: '3d-printing-eng',
    name: '3D bosma muhandisi',
    sector: 'Muhandislik va Dizayn',
    requiredSubjects: ['Fizika', 'Matematika', 'San\'at'],
    universityRecommendation: 'Texnika universiteti, Turin',
    leadershipLevel: 5,
    description: '3D printerlar yordamida turli buyumlar va detallar yasovchi mutaxassis.',
    skills: { logic: 7, communication: 5, creativity: 10, leadership: 5, technical: 9 }
  },
  {
    id: 'space-guide',
    name: 'Kosmik turizm gid',
    sector: 'Turizm va Kosmos',
    requiredSubjects: ['Fizika', 'Astronomiya', 'Ingliz tili'],
    universityRecommendation: 'Milliy universitet, Aviatsiya instituti',
    leadershipLevel: 7,
    description: 'Kosmik sayohatga chiquvchilarga hamrohlik qiluvchi va ma\'lumot beruvchi mutaxassis.',
    skills: { logic: 8, communication: 10, creativity: 7, leadership: 7, technical: 8 }
  },
  {
    id: 'big-data-architect',
    name: 'Big Data arxitektori',
    sector: 'IT va Tahlil',
    requiredSubjects: ['Matematika', 'Informatika'],
    universityRecommendation: 'TATU, Inha',
    leadershipLevel: 7,
    description: 'Ulkan ma\'lumotlar omborini quruvchi va boshqaruvchi mutaxassis.',
    skills: { logic: 10, communication: 6, creativity: 6, leadership: 7, technical: 10 }
  },
  {
    id: 'nanotechnologist',
    name: 'Nanotexnolog',
    sector: 'Fan va Texnologiya',
    requiredSubjects: ['Fizika', 'Kimyo', 'Matematika'],
    universityRecommendation: 'Milliy universitet, Texnika universiteti',
    leadershipLevel: 5,
    description: 'Molekulyar darajadagi yangi materiallar va qurilmalar yaratuvchi olim.',
    skills: { logic: 10, communication: 5, creativity: 9, leadership: 5, technical: 9 }
  },
  {
    id: 'urban-farmer',
    name: 'Shahar fermeri',
    sector: 'Ekologiya va Qishloq xo\'jaligi',
    requiredSubjects: ['Biologiya', 'Geografiya'],
    universityRecommendation: 'Agrar universiteti',
    leadershipLevel: 5,
    description: "Shahar sharoitida, binolar ichida o'simliklar yetishtiruvchi mutaxassis.",
    skills: { logic: 7, communication: 6, creativity: 9, leadership: 5, technical: 7 }
  },
  {
    id: 'blockchain-dev',
    name: 'Blokcheyn dasturchi',
    sector: 'IT va Moliya',
    requiredSubjects: ['Matematika', 'Informatika'],
    universityRecommendation: 'Inha, TATU',
    leadershipLevel: 6,
    description: 'Xavfsiz va shaffof tranzaksiyalar uchun blokcheyn tizimlarini yaratuvchi mutaxassis.',
    skills: { logic: 10, communication: 5, creativity: 7, leadership: 6, technical: 10 }
  },
  {
    id: 'tele-surgeon',
    name: 'Tele-jarroh',
    sector: 'Tibbiyot va Texnologiya',
    requiredSubjects: ['Biologiya', 'Kimyo', 'Informatika'],
    universityRecommendation: 'Tibbiyot akademiyasi',
    leadershipLevel: 6,
    description: 'Robotlar yordamida masofadan turib operatsiyalar bajaruvchi shifokor.',
    skills: { logic: 9, communication: 7, creativity: 6, leadership: 6, technical: 10 }
  },
  {
    id: 'ai-ethicist',
    name: 'AI etikasi bo\'yicha mutaxassis',
    sector: 'IT va Falsafa',
    requiredSubjects: ['Psixologiya', 'Huquq', 'Informatika'],
    universityRecommendation: 'Milliy universitet, Huquq universiteti',
    leadershipLevel: 8,
    description: 'Sun\'iy intellektning insoniyatga zarar yetkazmasligini nazorat qiluvchi mutaxassis.',
    skills: { logic: 9, communication: 9, creativity: 7, leadership: 8, technical: 7 }
  },
  {
    id: 'sound-designer',
    name: 'Ovoz dizayneri',
    sector: 'Media va San\'at',
    requiredSubjects: ['Fizika', 'Musiqa', 'Informatika'],
    universityRecommendation: 'San\'at instituti, Konservatoriya',
    leadershipLevel: 4,
    description: 'Filmlar, o\'yinlar va ilovalar uchun noyob tovushlar yaratuvchi mutaxassis.',
    skills: { logic: 6, communication: 7, creativity: 10, leadership: 4, technical: 9 }
  },
  {
    id: 'fashion-tech-designer',
    name: 'Fashion-tech dizayner',
    sector: 'Dizayn va Texnologiya',
    requiredSubjects: ['San\'at', 'Informatika', 'Kimyo'],
    universityRecommendation: "To'qimachilik instituti, Dizayn instituti",
    leadershipLevel: 6,
    description: 'Aqlli matolar va texnologik kiyimlar yaratuvchi dizayner.',
    skills: { logic: 6, communication: 7, creativity: 10, leadership: 6, technical: 8 }
  },
  {
    id: 'waste-manager',
    name: 'Chiqindilarni qayta ishlash menejeri',
    sector: 'Ekologiya va Biznes',
    requiredSubjects: ['Kimyo', 'Iqtisod'],
    universityRecommendation: 'Agrar universiteti, TSUE',
    leadershipLevel: 8,
    description: 'Chiqindilarni foydali resurslarga aylantirish jarayonini boshqaruvchi mutaxassis.',
    skills: { logic: 8, communication: 8, creativity: 7, leadership: 8, technical: 7 }
  },
  {
    id: 'app-developer',
    name: 'Mobil ilovalar dasturchisi',
    sector: 'IT',
    requiredSubjects: ['Matematika', 'Informatika', 'Ingliz tili'],
    universityRecommendation: 'TATU, Inha, Amity',
    leadershipLevel: 5,
    description: 'Android va iOS tizimlari uchun ilovalar yaratuvchi mutaxassis.',
    skills: { logic: 9, communication: 6, creativity: 8, leadership: 5, technical: 10 }
  },
  {
    id: 'cloud-engineer',
    name: 'Bulutli texnologiyalar muhandisi',
    sector: 'IT',
    requiredSubjects: ['Informatika', 'Matematika'],
    universityRecommendation: 'TATU, Amity',
    leadershipLevel: 6,
    description: 'Ma\'lumotlarni masofaviy serverlarda saqlash va boshqarish tizimlarini quruvchi mutaxassis.',
    skills: { logic: 9, communication: 5, creativity: 6, leadership: 6, technical: 10 }
  },
  {
    id: 'social-media-lawyer',
    name: 'Ijtimoiy tarmoqlar huquqshunosi',
    sector: 'Huquq va Media',
    requiredSubjects: ['Huquq', 'Tarix', 'O\'zbek tili'],
    universityRecommendation: 'Huquq universiteti',
    leadershipLevel: 7,
    description: 'Internetdagi mualliflik huquqi va shaxsiy daxlsizlikni himoya qiluvchi advokat.',
    skills: { logic: 9, communication: 10, creativity: 5, leadership: 7, technical: 6 }
  },
  {
    id: 'bio-informatician',
    name: 'Bio-informatik',
    sector: 'Fan va IT',
    requiredSubjects: ['Biologiya', 'Informatika', 'Matematika'],
    universityRecommendation: 'Milliy universitet, TATU',
    leadershipLevel: 5,
    description: 'Biologik ma\'lumotlarni kompyuter dasturlari yordamida tahlil qiluvchi olim.',
    skills: { logic: 10, communication: 6, creativity: 6, leadership: 5, technical: 9 }
  },
  {
    id: 'robot-psychologist',
    name: 'Robotlar bilan muloqot mutaxassisi',
    sector: 'Psixologiya va IT',
    requiredSubjects: ['Psixologiya', 'Informatika'],
    universityRecommendation: 'Milliy universitet, Inha',
    leadershipLevel: 6,
    description: 'Insonlar va robotlar o\'rtasidagi muloqotni qulay va tabiiy qiluvchi mutaxassis.',
    skills: { logic: 8, communication: 10, creativity: 8, leadership: 6, technical: 7 }
  },
  {
    id: 'green-architect',
    name: 'Yashil arxitektor',
    sector: 'Arxitektura va Ekologiya',
    requiredSubjects: ['Matematika', 'San\'at', 'Biologiya'],
    universityRecommendation: 'Arxitektura va qurilish instituti',
    leadershipLevel: 7,
    description: "Tabiat bilan uyg'un, energiya tejovchi binolar loyihasini yaratuvchi mutaxassis.",
    skills: { logic: 8, communication: 7, creativity: 10, leadership: 7, technical: 7 }
  },
  {
    id: 'crypto-economist',
    name: 'Kripto-iqtisodchi',
    sector: 'Moliya va Blokcheyn',
    requiredSubjects: ['Iqtisod', 'Matematika'],
    universityRecommendation: 'TSUE, WIUT',
    leadershipLevel: 7,
    description: "Raqamli valyutalar va yangi iqtisodiy modellarni o'rganuvchi mutaxassis.",
    skills: { logic: 10, communication: 7, creativity: 7, leadership: 7, technical: 8 }
  },
  {
    id: 'neuro-interface-eng',
    name: 'Neyro-interfeys muhandisi',
    sector: 'Fan va IT',
    requiredSubjects: ['Fizika', 'Biologiya', 'Informatika'],
    universityRecommendation: 'Turin, Tibbiyot akademiyasi',
    leadershipLevel: 6,
    description: "Inson miyasi va kompyuterni bog'lovchi qurilmalar yaratuvchi mutaxassis.",
    skills: { logic: 10, communication: 6, creativity: 9, leadership: 6, technical: 10 }
  },
  {
    id: 'digital-anthropologist',
    name: 'Raqamli antropolog',
    sector: 'Ijtimoiy fanlar',
    requiredSubjects: ['Tarix', 'Psixologiya', 'Informatika'],
    universityRecommendation: 'Milliy universitet',
    leadershipLevel: 5,
    description: "Internetning insoniyat madaniyati va jamiyatiga ta'sirini o'rganuvchi olim.",
    skills: { logic: 9, communication: 9, creativity: 7, leadership: 5, technical: 7 }
  },
  {
    id: 'vertical-farm-eng',
    name: 'Vertikal ferma muhandisi',
    sector: 'Qishloq xo\'jaligi va Muhandislik',
    requiredSubjects: ['Biologiya', 'Fizika'],
    universityRecommendation: 'Agrar universiteti, Turin',
    leadershipLevel: 6,
    description: "Ko'p qavatli binolarda avtomatlashgan fermalar quruvchi mutaxassis.",
    skills: { logic: 8, communication: 6, creativity: 8, leadership: 6, technical: 9 }
  },
  {
    id: 'cyber-detective',
    name: 'Kiber-detektiv',
    sector: 'Xavfsizlik va Huquq',
    requiredSubjects: ['Huquq', 'Informatika'],
    universityRecommendation: 'Huquqni muhofaza qilish akademiyasi, TATU',
    leadershipLevel: 6,
    description: "Internetdagi jinoyatlarni fosh qiluvchi va raqamli dalillarni yig'uvchi mutaxassis.",
    skills: { logic: 10, communication: 7, creativity: 6, leadership: 6, technical: 9 }
  },
  {
    id: 'data-privacy-officer',
    name: 'Ma\'lumotlar maxfiyligi bo\'yicha mutaxassis',
    sector: 'Huquq va IT',
    requiredSubjects: ['Huquq', 'Informatika'],
    universityRecommendation: 'Huquq universiteti, TATU',
    leadershipLevel: 8,
    description: 'Kompaniyalarda shaxsiy ma\'lumotlarning xavfsiz saqlanishini nazorat qiluvchi rahbar.',
    skills: { logic: 9, communication: 8, creativity: 5, leadership: 8, technical: 8 }
  },
  {
    id: 'ar-storyteller',
    name: 'AR-hikoyachi (Storyteller)',
    sector: 'Media va Dizayn',
    requiredSubjects: ['O\'zbek tili', 'San\'at', 'Informatika'],
    universityRecommendation: 'Jurnalistika universiteti, San\'at instituti',
    leadershipLevel: 5,
    description: "To'ldirilgan reallik orqali interaktiv hikoyalar va ssenariylar yaratuvchi mutaxassis.",
    skills: { logic: 6, communication: 9, creativity: 10, leadership: 5, technical: 8 }
  },
  {
    id: 'space-lawyer',
    name: 'Kosmik huquqshunos',
    sector: 'Huquq va Kosmos',
    requiredSubjects: ['Huquq', 'Tarix', 'Ingliz tili'],
    universityRecommendation: 'Huquq universiteti, Jahon iqtisodiyoti va diplomatiya universiteti',
    leadershipLevel: 9,
    description: "Kosmosni o'rganish va undan foydalanish bo'yicha xalqaro qonunlarni ishlab chiquvchi mutaxassis.",
    skills: { logic: 9, communication: 10, creativity: 6, leadership: 9, technical: 5 }
  },
  {
    id: 'bio-hacker',
    name: 'Bio-xaker (Salomatlik optimizatori)',
    sector: 'Tibbiyot va Innovatsiya',
    requiredSubjects: ['Biologiya', 'Kimyo', 'Psixologiya'],
    universityRecommendation: 'Tibbiyot akademiyasi',
    leadershipLevel: 4,
    description: "Texnologiyalar va to'g'ri turmush tarzi orqali inson imkoniyatlarini kengaytiruvchi mutaxassis.",
    skills: { logic: 8, communication: 7, creativity: 9, leadership: 4, technical: 7 }
  },
  {
    id: 'robot-technician',
    name: 'Robotlar bo\'yicha texnik',
    sector: 'Xizmat ko\'rsatish va Texnologiya',
    requiredSubjects: ['Fizika', 'Texnologiya'],
    universityRecommendation: 'Kollej va texnikumlar, Texnika universiteti',
    leadershipLevel: 4,
    description: "Robotlarni ta'mirlash va ularga texnik xizmat ko'rsatish bilan shug'ullanuvchi mutaxassis.",
    skills: { logic: 7, communication: 5, creativity: 6, leadership: 4, technical: 10 }
  },
  {
    id: 'digital-curator',
    name: 'Raqamli kurator',
    sector: 'Madaniyat va IT',
    requiredSubjects: ['Tarix', 'San\'at', 'Informatika'],
    universityRecommendation: 'San\'at instituti, Milliy universitet',
    leadershipLevel: 6,
    description: "Onlayn muzeylar va raqamli san'at ko'rgazmalarini tashkil qiluvchi mutaxassis.",
    skills: { logic: 7, communication: 8, creativity: 9, leadership: 6, technical: 8 }
  },
  {
    id: 'smart-home-installer',
    name: 'Aqlli uy tizimlari o\'rnatuvchisi',
    sector: 'Xizmat ko\'rsatish va IT',
    requiredSubjects: ['Fizika', 'Informatika'],
    universityRecommendation: 'Texnika universiteti, TATU',
    leadershipLevel: 5,
    description: 'Uylarni avtomatlashtirilgan xavfsizlik va qulaylik tizimlari bilan jihozlovchi mutaxassis.',
    skills: { logic: 7, communication: 6, creativity: 7, leadership: 5, technical: 10 }
  },
  {
    id: 'ai-tutor',
    name: 'AI-repetitor (Ta\'lim kuratori)',
    sector: 'Ta\'lim va IT',
    requiredSubjects: ['Psixologiya', 'O\'zbek tili', 'Informatika'],
    universityRecommendation: 'Pedagogika universiteti, Inha',
    leadershipLevel: 7,
    description: "Sun'iy intellekt yordamida har bir o'quvchi uchun shaxsiy ta'lim dasturini yaratuvchi mutaxassis.",
    skills: { logic: 8, communication: 10, creativity: 8, leadership: 7, technical: 8 },
    videoUrl: 'https://www.youtube.com/watch?v=Z_KspIX1oXU'
  },
  {
    id: 'cyber-security-school',
    name: 'Kiberxavfsizlik mutaxassisi',
    sector: 'IT va Xavfsizlik',
    requiredSubjects: ['Matematika', 'Informatika', 'Ingliz tili'],
    universityRecommendation: 'TATU, Inha, Amity',
    leadershipLevel: 7,
    description: "Raqamli tizimlarni xakerlar hujumidan himoya qiluvchi 'kiber-qo'riqchi'.",
    skills: { logic: 10, communication: 5, creativity: 7, leadership: 7, technical: 10 },
    videoUrl: 'https://www.youtube.com/watch?v=PlHn9b_t_tI'
  },
  {
    id: 'drone-pilot-school',
    name: 'Dron uchuvchisi',
    sector: 'Transport va Texnologiya',
    requiredSubjects: ['Fizika', 'Geografiya', 'Informatika'],
    universityRecommendation: 'Aviatsiya instituti, Texnika universiteti',
    leadershipLevel: 5,
    description: "Dronlar yordamida suratga olish, yuk tashish va qidiruv ishlarini bajaruvchi mutaxassis.",
    skills: { logic: 7, communication: 6, creativity: 8, leadership: 5, technical: 10 },
    videoUrl: 'https://www.youtube.com/watch?v=mD_V9X-8t8w'
  },
  {
    id: 'game-designer-school',
    name: 'Geym-dizayner',
    sector: 'IT va San\'at',
    requiredSubjects: ['Informatika', 'San\'at', 'Ingliz tili'],
    universityRecommendation: 'Dizayn instituti, Inha',
    leadershipLevel: 6,
    description: "Kompyuter o'yinlarining dunyosi, qahramonlari va qoidalarini yaratuvchi ijodkor.",
    skills: { logic: 8, communication: 7, creativity: 10, leadership: 6, technical: 9 },
    videoUrl: 'https://www.youtube.com/watch?v=zQvWMdWhNSM'
  },
  {
    id: 'renewable-energy-eng',
    name: 'Yashil energiya muhandisi',
    sector: 'Ekologiya va Energetika',
    requiredSubjects: ['Fizika', 'Kimyo', 'Matematika'],
    universityRecommendation: 'Turin, Texnika universiteti',
    leadershipLevel: 7,
    description: "Quyosh, shamol va suvdan elektr energiyasi olish tizimlarini yaratuvchi mutaxassis.",
    skills: { logic: 9, communication: 6, creativity: 8, leadership: 7, technical: 9 },
    videoUrl: 'https://www.youtube.com/watch?v=1kUE0BZtTRc'
  },
  {
    id: 'bio-informatician',
    name: 'Bioinformatik',
    sector: 'Biologiya va IT',
    requiredSubjects: ['Biologiya', 'Informatika', 'Matematika'],
    universityRecommendation: 'Milliy universitet, TATU',
    leadershipLevel: 5,
    description: "Biologik ma'lumotlarni kompyuter dasturlari yordamida tahlil qiluvchi olim.",
    skills: { logic: 10, communication: 6, creativity: 7, leadership: 5, technical: 9 },
    videoUrl: 'https://www.youtube.com/watch?v=m_C8Y_D-C_U'
  },
  {
    id: 'robotics-coder',
    name: 'Robotlar dasturchisi',
    sector: 'Robototexnika',
    requiredSubjects: ['Matematika', 'Fizika', 'Informatika'],
    universityRecommendation: 'Turin, Texnika universiteti, Inha',
    leadershipLevel: 6,
    description: "Robotlarga 'aqil' beruvchi va ularni harakatga keltiruvchi kodlar yozuvchi mutaxassis.",
    skills: { logic: 10, communication: 5, creativity: 8, leadership: 6, technical: 10 },
    videoUrl: 'https://www.youtube.com/watch?v=8wXWj0W8X8o'
  },
  {
    id: 'digital-marketing-school',
    name: 'Raqamli marketing mutaxassisi',
    sector: 'Biznes va Media',
    requiredSubjects: ['Iqtisod', 'Ingliz tili', 'Psixologiya'],
    universityRecommendation: 'WIUT, TSUE, MDIST',
    leadershipLevel: 8,
    description: "Internet va ijtimoiy tarmoqlar orqali mahsulotlarni ommalashtiruvchi strateg.",
    skills: { logic: 7, communication: 10, creativity: 9, leadership: 8, technical: 7 },
    videoUrl: 'https://www.youtube.com/watch?v=Z_KspIX1oXU'
  },
  {
    id: '3d-printing-school',
    name: '3D bosma muhandisi',
    sector: 'Muhandislik va Dizayn',
    requiredSubjects: ['Fizika', 'Matematika', 'San\'at'],
    universityRecommendation: 'Texnika universiteti, Turin',
    leadershipLevel: 5,
    description: "3D printerlar yordamida turli buyumlar va detallar yasovchi mutaxassis.",
    skills: { logic: 7, communication: 5, creativity: 10, leadership: 5, technical: 9 },
    videoUrl: 'https://www.youtube.com/watch?v=0S_v6831_mI'
  },
  {
    id: 'space-architect-school',
    name: 'Kosmik arxitektor',
    sector: 'Arxitektura va Kosmos',
    requiredSubjects: ['Fizika', 'Matematika', 'San\'at'],
    universityRecommendation: 'Arxitektura instituti, Turin',
    leadershipLevel: 8,
    description: "Oydagi yoki Marsdagi kelajak shaharlari va stansiyalarini loyihalashtiruvchi mutaxassis.",
    skills: { logic: 9, communication: 6, creativity: 10, leadership: 8, technical: 9 },
    videoUrl: 'https://www.youtube.com/watch?v=mD_V9X-8t8w'
  },
  {
    id: 'eco-fashion-designer',
    name: 'Eko-moda dizayneri',
    sector: 'Dizayn va Ekologiya',
    requiredSubjects: ['San\'at', 'Kimyo', 'Biologiya'],
    universityRecommendation: 'Dizayn instituti, To\'qimachilik instituti',
    leadershipLevel: 6,
    description: "Tabiatga zarar keltirmaydigan materiallardan zamonaviy kiyimlar yaratuvchi ijodkor.",
    skills: { logic: 6, communication: 8, creativity: 10, leadership: 6, technical: 7 },
    videoUrl: 'https://www.youtube.com/watch?v=1kUE0BZtTRc'
  },
  {
    id: 'virtual-tour-guide',
    name: 'Virtual sayohat gidi',
    sector: 'Turizm va VR',
    requiredSubjects: ['Tarix', 'Ingliz tili', 'Informatika'],
    universityRecommendation: 'Turizm universiteti, Milliy universitet',
    leadershipLevel: 7,
    description: "VR ko'zoynaklar yordamida dunyoning istalgan nuqtasiga virtual sayohatlar uyushtiruvchi mutaxassis.",
    skills: { logic: 7, communication: 10, creativity: 9, leadership: 7, technical: 8 },
    videoUrl: 'https://www.youtube.com/watch?v=PlHn9b_t_tI'
  }
];
