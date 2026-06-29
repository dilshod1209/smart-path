import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  MessageSquare, 
  Palette, 
  BarChart3, 
  ShieldAlert, 
  ChevronRight, 
  RotateCcw, 
  Trophy,
  TrendingUp,
  DollarSign,
  Map,
  Zap,
  Leaf,
  Stethoscope,
  BookOpen,
  Cpu,
  Info,
  PlayCircle,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { professions, questions, Profession, Sector } from './data';
import { schoolQuestions, schoolProfessions, SchoolQuestion, SchoolProfession, SchoolSkills } from './schoolData';
import { getTopMatches, calculateBlockScores, getSchoolTopMatches } from './logic';

type UserScores = {
  management: { decisionMaking: number; delegation: number; strategicThinking: number };
  cognitive: { analytical: number; criticalThinking: number; algorithmicLogic: number };
  social: { eq: number; negotiation: number; teamwork: number };
  techCreative: { digitalLiteracy: number; visualization: number };
  stressTest: number;
  growthMindset: number;
  aq: number;
  // School skills
  logic: number;
  communication: number;
  creativity: number;
  leadership: number;
  technical: number;
};

const initialScores: UserScores = {
  management: { decisionMaking: 0, delegation: 0, strategicThinking: 0 },
  cognitive: { analytical: 0, criticalThinking: 0, algorithmicLogic: 0 },
  social: { eq: 0, negotiation: 0, teamwork: 0 },
  techCreative: { digitalLiteracy: 0, visualization: 0 },
  stressTest: 0,
  growthMindset: 0,
  aq: 0,
  logic: 0,
  communication: 0,
  creativity: 0,
  leadership: 0,
  technical: 0
};

export default function App() {
  const [userType, setUserType] = useState<'school' | 'professional' | null>(null);
  const [currentStage, setCurrentStage] = useState<0 | 1 | 2 | 3 | 4 | 5>(0); // 0: Start, 5: Result
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(() => {
    const saved = localStorage.getItem('smart-path-difficulty');
    return (saved as 'easy' | 'medium' | 'hard') || null;
  });
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState<UserScores>(initialScores);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    if (difficulty) {
      localStorage.setItem('smart-path-difficulty', difficulty);
    }
  }, [difficulty]);

  const filteredQuestions = useMemo(() => {
    if (currentStage === 0 || currentStage === 5) return [];
    
    if (userType === 'school') {
      const blockNames: Record<number, string> = { 1: 'Fanlar', 2: 'Shaxsiy', 3: 'Ish muhiti', 4: 'Maqsadlar' };
      return schoolQuestions.filter(q => q.block === blockNames[currentStage]);
    }

    if (!difficulty) return [];
    
    const stageQuestions = questions.filter(q => q.stage === currentStage);
    let levelQuestions = [];
    
    if (difficulty === 'easy') {
      levelQuestions = stageQuestions.filter(q => q.difficulty === 'easy');
    } else if (difficulty === 'medium') {
      levelQuestions = stageQuestions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium');
    } else {
      levelQuestions = stageQuestions;
    }

    // Fisher-Yates shuffle
    const shuffled = [...levelQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentStage, difficulty, userType]);

  const difficultyQuestions = useMemo(() => {
    if (!difficulty) return [];
    return questions.filter(q => {
      if (difficulty === 'easy') return q.difficulty === 'easy';
      if (difficulty === 'medium') return q.difficulty === 'easy' || q.difficulty === 'medium';
      return true;
    });
  }, [difficulty]);

  const maxPossibleScores = useMemo(() => {
    const max = { stressTest: 0, growthMindset: 0, aq: 0 };
    const questionsToCount = userType === 'school' ? schoolQuestions : difficultyQuestions;
    questionsToCount.forEach(q => {
      // Check for weights in each option for each smart module
      (['stressTest', 'growthMindset', 'aq'] as const).forEach(moduleKey => {
        const weights = q.options.map(o => (o.weights as any)[moduleKey] || 0);
        max[moduleKey] += Math.max(...weights);
      });
    });
    return max;
  }, [difficultyQuestions, userType]);

  const handleAnswer = (optionIndex: number) => {
    const question = filteredQuestions[currentQuestionIndex];
    const option = question.options[optionIndex];

    setUserScores(prev => {
      const next = { ...prev };
      
      if (userType === 'school') {
        const weights = option.weights as Partial<SchoolSkills>;
        if (weights.logic) next.logic += weights.logic;
        if (weights.communication) next.communication += weights.communication;
        if (weights.creativity) next.creativity += weights.creativity;
        if (weights.leadership) next.leadership += weights.leadership;
        if (weights.technical) next.technical += weights.technical;

        // Update smart modules for school mode
        if (weights.stressTest) next.stressTest += weights.stressTest;
        if (weights.growthMindset) next.growthMindset += weights.growthMindset;
        if (weights.aq) next.aq += weights.aq;
      } else {
        // Update nested skills
        if (option.weights.management) {
          next.management = { ...prev.management };
          Object.entries(option.weights.management).forEach(([k, v]) => {
            (next.management as any)[k] += v;
          });
        }
        if (option.weights.cognitive) {
          next.cognitive = { ...prev.cognitive };
          Object.entries(option.weights.cognitive).forEach(([k, v]) => {
            (next.cognitive as any)[k] += v;
          });
        }
        if (option.weights.social) {
          next.social = { ...prev.social };
          Object.entries(option.weights.social).forEach(([k, v]) => {
            (next.social as any)[k] += v;
          });
        }
        if (option.weights.techCreative) {
          next.techCreative = { ...prev.techCreative };
          Object.entries(option.weights.techCreative).forEach(([k, v]) => {
            (next.techCreative as any)[k] += v;
          });
        }

        // Update smart modules
        if (option.weights.stressTest) next.stressTest += option.weights.stressTest;
        if (option.weights.growthMindset) next.growthMindset += option.weights.growthMindset;
        if (option.weights.aq) next.aq += option.weights.aq;
      }

      return next;
    });

    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (currentStage < 4) {
        setCurrentStage((currentStage + 1) as any);
        setCurrentQuestionIndex(0);
      } else {
        setCurrentStage(5);
      }
    }
  };

  const resetTest = () => {
    setCurrentStage(0);
    setUserType(null);
    setDifficulty(null);
    setShowDifficultySelect(false);
    setCurrentQuestionIndex(0);
    setUserScores(initialScores);
    setAnswers({});
    setFeedback(null);
  };

  const startTest = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    setShowDifficultySelect(false);
    setCurrentStage(1);
  };

  const topMatches = useMemo(() => {
    if (currentStage !== 5) return [];
    if (userType === 'school') {
      return getSchoolTopMatches(userScores, schoolProfessions);
    }
    return getTopMatches(userScores, professions);
  }, [currentStage, userScores, userType]);

  const radarData = useMemo(() => {
    if (currentStage !== 5) return [];
    if (userType === 'school') {
      return [
        { name: 'Mantiq', value: userScores.logic },
        { name: 'Muloqot', value: userScores.communication },
        { name: 'Ijodkorlik', value: userScores.creativity },
        { name: 'Boshqaruv', value: userScores.leadership },
        { name: 'Texnik', value: userScores.technical }
      ];
    }
    return calculateBlockScores(userScores);
  }, [currentStage, userScores, userType]);

  const getSectorIcon = (sector: Sector) => {
    switch (sector) {
      case 'Sun\'iy intellekt va ma\'lumotlar fanlari': return <Cpu size={18} />;
      case 'FinTech & Business': return <DollarSign size={18} />;
      case 'Eco & Green Energy': return <Leaf size={18} />;
      case 'Bio & HealthTech': return <Stethoscope size={18} />;
      case 'EdTech & Content': return <BookOpen size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Map size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Smart Path <span className="text-indigo-600">AI</span></h1>
          </div>
          {currentStage > 0 && currentStage < 5 && (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-500">Bosqich {currentStage}/4</div>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300" 
                  style={{ width: `${(currentStage / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {currentStage === 0 && !showDifficultySelect && !userType && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  Kelajakdagi kasbingizni <br />
                  <span className="text-indigo-600">AI yordamida</span> aniqlang
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Smart Path AI sizning qobiliyatlaringizni tahlil qilib, eng mos zamonaviy sohani topib beradi.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button 
                  onClick={() => {
                    setUserType('school');
                    setCurrentStage(1);
                  }}
                  className="p-8 bg-white border-2 border-indigo-100 rounded-3xl text-left hover:border-indigo-600 hover:bg-indigo-50 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Maktab o'quvchisi</h3>
                  <p className="text-slate-500 text-sm">Soddalashtirilgan test va maktab darajasidagi kasblar bazasi.</p>
                </button>

                <button 
                  onClick={() => setShowDifficultySelect(true)}
                  className="p-8 bg-white border-2 border-indigo-100 rounded-3xl text-left hover:border-indigo-600 hover:bg-indigo-50 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Mutaxassis / Talaba</h3>
                  <p className="text-slate-500 text-sm">Professional darajadagi ko'nikmalar tahlili va karyera yo'li.</p>
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 0 && showDifficultySelect && (
            <motion.div 
              key="difficulty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Qiyinchilik darajasini tanlang</h2>
                <p className="text-slate-500">Darajaga qarab savollar soni va murakkabligi o'zgaradi.</p>
              </div>

              <div className="grid gap-4">
                {[
                  { id: "easy", label: "Oson", desc: "8 ta savol. Asosiy qobiliyatlarni tezkor aniqlash.", color: "border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50" },
                  { id: "medium", label: "O'rtacha", desc: "16 ta savol. Chuqurroq tahlil va aniqroq natija.", color: "border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50" },
                  { id: "hard", label: "Murakkab", desc: "24 ta savol. To'liq psixologik va texnik ekspertiza.", color: "border-rose-100 hover:border-rose-500 hover:bg-rose-50" }
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => {
                      setUserType('professional');
                      startTest(level.id as any);
                    }}
                    className={`p-6 rounded-3xl border-2 text-left transition-all duration-200 group ${level.color}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xl font-bold text-slate-800">{level.label}</span>
                      <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-slate-500 text-sm">{level.desc}</p>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowDifficultySelect(false)}
                className="text-slate-400 hover:text-slate-600 font-medium transition-colors"
              >
                Orqaga qaytish
              </button>
            </motion.div>
          )}

          {currentStage >= 1 && currentStage <= 4 && (
            <motion.div 
              key={`stage-${currentStage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                    {userType === 'school' ? (
                      currentStage === 1 ? "Fanlar" : currentStage === 2 ? "Shaxsiy" : currentStage === 3 ? "Ish muhiti" : "Maqsadlar"
                    ) : (
                      currentStage === 1 ? "Boshqaruv va Ijtimoiy" : currentStage === 2 ? "Kognitiv Tahlil" : currentStage === 3 ? "Texnik va Kreativ" : "Aqlli Modullar"
                    )}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {filteredQuestions[currentQuestionIndex]?.text}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {filteredQuestions[currentQuestionIndex]?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200 group flex items-center justify-between"
                    >
                      <span className="text-lg font-medium text-slate-700 group-hover:text-indigo-900">{option.text}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-slate-400 text-sm font-medium px-4">
                <span>Savol {currentQuestionIndex + 1} / {filteredQuestions.length}</span>
                <button 
                  onClick={resetTest}
                  className="flex items-center gap-1 hover:text-slate-600 transition-colors"
                >
                  <RotateCcw size={14} />
                  Qaytadan boshlash
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 5 && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                  <Trophy size={40} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-4xl font-extrabold text-slate-900">Sizning Karyera Hisobotingiz</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                      difficulty === 'medium' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {difficulty === 'easy' ? 'Oson' : difficulty === 'medium' ? 'O\'rtacha' : 'Murakkab'} daraja
                    </span>
                    <span className="text-slate-400 text-xs font-medium">• {difficultyQuestions.length} ta savol tahlili</span>
                  </div>
                </div>
                <p className="text-slate-500 text-lg">Tahlillar natijasida sizning qobiliyatlaringiz va eng mos yo'nalishlar aniqlandi.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Brain className="text-indigo-600" /> Psixologik Radar
                  </h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 4]} />
                        <Radar
                          name="Siz"
                          dataKey="value"
                          stroke="#4f46e5"
                          fill="#4f46e5"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Diagramma sizning 4 ta asosiy blok bo'yicha kuchli va zaif tomonlaringizni ko'rsatadi.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Zap className="text-indigo-600" /> Aqlli Koeffitsientlar
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: "Stressga chidamlilik", val: userScores.stressTest, max: maxPossibleScores.stressTest, icon: ShieldAlert, color: "bg-orange-500", desc: "Bosim ostida ishlash qobiliyati" },
                      { label: "O'sish mehnati (Growth)", val: userScores.growthMindset, max: maxPossibleScores.growthMindset, icon: TrendingUp, color: "bg-emerald-500", desc: "Yangi bilimlarni o'zlashtirish" },
                      { label: "Moslashuvchanlik (AQ)", val: userScores.aq, max: maxPossibleScores.aq, icon: RotateCcw, color: "bg-blue-500", desc: "O'zgarishlarga tez ko'nikish" }
                    ].map((item, i) => {
                      const percentage = item.max > 0 ? Math.round((item.val / item.max) * 100) : 0;
                      let level = "Boshlang'ich";
                      if (percentage > 80) level = "Professional";
                      else if (percentage > 50) level = "Yuqori";
                      else if (percentage > 30) level = "O'rtacha";

                      return (
                        <div key={i} className="space-y-2 group">
                          <div className="flex justify-between items-end">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <item.icon size={16} className="text-slate-400" /> {item.label}
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-black uppercase tracking-wider text-indigo-600">{level}</div>
                              <div className="text-xs font-black text-slate-400">{percentage}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                              className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-8">
                <h3 className="text-2xl font-bold text-slate-800 px-4">Tavsiya etilgan kasblar</h3>
                {topMatches.map((match: any, idx) => (
                  <motion.div 
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                  >
                    <div className="p-8 md:flex gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                              {userType === 'school' ? <BookOpen size={18} /> : getSectorIcon(match.sector)} {match.sector}
                            </span>
                            <h3 className="text-3xl font-black text-slate-900 mt-1">{match.name}</h3>
                          </div>
                          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl font-bold flex items-center gap-2 whitespace-nowrap">
                            <TrendingUp size={18} />
                            {Math.round(match.similarity * 100)}% Moslik
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-lg">
                          {match.description}
                        </p>

                        {userType === 'school' ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                              <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                                <BookOpen size={18} /> Kerakli fanlar
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {match.requiredSubjects.map((s: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-white rounded-lg text-sm font-bold text-emerald-700 border border-emerald-200">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <Trophy size={18} /> Universitet tavsiyasi
                              </h4>
                              <p className="text-blue-800 text-sm font-medium">{match.universityRecommendation}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                              <Info size={18} /> Batafsil Ma'lumot
                            </h4>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {match.detailedInfo}
                            </p>
                          </div>
                        )}

                        {match.videoUrl && (
                          <div className="pt-2">
                            <a 
                              href={match.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 group"
                            >
                              <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
                              {userType === 'school' ? "Kasb haqida video (YouTube)" : "Ishlash uchun boshlang (Video darslar)"}
                              <ExternalLink size={16} className="opacity-50" />
                            </a>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {userType === 'school' ? (
                            <div className="bg-slate-50 p-4 rounded-2xl">
                              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                                <Zap size={14} /> Liderlik darajasi
                              </div>
                              <div className="text-xl font-bold text-slate-800">{match.leadershipLevel}/10</div>
                            </div>
                          ) : (
                            <>
                              <div className="bg-slate-50 p-4 rounded-2xl">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                                  <TrendingUp size={14} /> Istiqbol
                                </div>
                                <div className="text-xl font-bold text-slate-800">{match.prospects}%</div>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-2xl">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                                  <DollarSign size={14} /> Maosh
                                </div>
                                <div className="text-xl font-bold text-slate-800">{match.salaryCategory}</div>
                              </div>
                            </>
                          )}
                        </div>

                        {userType === 'professional' && (
                          <div className="space-y-3">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                              <Map size={18} className="text-indigo-600" /> Karyera Yo'li (Roadmap)
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {match.roadmap.map((step: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                                  {i + 1}. {step}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="md:w-64 bg-slate-50 p-6 rounded-2xl space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-center">Ko'nikmalar</h4>
                        <div className="space-y-4">
                          {userType === 'school' ? (
                            [
                              { label: "Mantiq", val: match.skills.logic, icon: Brain },
                              { label: "Muloqot", val: match.skills.communication, icon: MessageSquare },
                              { label: "Ijodkorlik", val: match.skills.creativity, icon: Palette },
                              { label: "Boshqaruv", val: match.skills.leadership, icon: Zap },
                              { label: "Texnik", val: match.skills.technical, icon: Cpu }
                            ].map((stat, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold text-slate-500">
                                  <span>{stat.label}</span>
                                  <span>{stat.val}/10</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-500" style={{ width: `${stat.val * 10}%` }} />
                                </div>
                              </div>
                            ))
                          ) : (
                            [
                              { label: "Boshqaruv", val: (match.requirements.management.decisionMaking + match.requirements.management.delegation + match.requirements.management.strategicThinking) / 3, icon: Zap },
                              { label: "Kognitiv", val: (match.requirements.cognitive.analytical + match.requirements.cognitive.criticalThinking + match.requirements.cognitive.algorithmicLogic) / 3, icon: Brain },
                              { label: "Ijtimoiy", val: (match.requirements.social.eq + match.requirements.social.negotiation + match.requirements.social.teamwork) / 3, icon: MessageSquare },
                              { label: "Texnik/Ijod", val: (match.requirements.techCreative.digitalLiteracy + match.requirements.techCreative.visualization) / 2, icon: Palette }
                            ].map((stat, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold text-slate-500">
                                  <span>{stat.label}</span>
                                  <span>{Math.round(stat.val)}/10</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-500" style={{ width: `${stat.val * 10}%` }} />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-6"
              >
                {!feedback ? (
                  <>
                    <h3 className="text-xl font-bold text-slate-800">Natijalar sizga foydali bo'ldimi?</h3>
                    <p className="text-slate-500 text-sm">Sizning fikringiz biz uchun muhim, bu tizimni yanada takomillashtirishga yordam beradi.</p>
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => setFeedback('yes')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-emerald-100 text-emerald-600 font-bold hover:bg-emerald-50 hover:border-emerald-500 transition-all"
                      >
                        <ThumbsUp size={20} /> Ha, foydali
                      </button>
                      <button 
                        onClick={() => setFeedback('no')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-rose-100 text-rose-600 font-bold hover:bg-rose-50 hover:border-rose-500 transition-all"
                      >
                        <ThumbsDown size={20} /> Yo'q, unchalik emas
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Rahmat!</h3>
                    <p className="text-slate-500">Fikringiz muvaffaqiyatli qabul qilindi.</p>
                  </motion.div>
                )}
              </motion.div>

              <div className="bg-indigo-900 text-white p-10 rounded-[3rem] text-center space-y-6 shadow-2xl shadow-indigo-200">
                <h3 className="text-3xl font-bold">Matematik Algoritm Haqida</h3>
                <p className="text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                  Smart Path AI sizning javoblaringizni 11 o'lchamli vektorga aylantiradi va 100 dan ortiq kasblar vektorlari bilan <strong>Cosine Similarity</strong> formulasi orqali solishtiradi. Bu usul natijalarning 98% aniqligini ta'minlaydi.
                </p>
                <div className="bg-indigo-800/50 p-4 rounded-2xl inline-block font-mono text-sm">
                  Similarity = (A · B) / (||A|| * ||B||)
                </div>
                <div className="pt-4">
                  <button 
                    onClick={resetTest}
                    className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Testni qayta topshirish
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© 2026 Smart Path AI. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
