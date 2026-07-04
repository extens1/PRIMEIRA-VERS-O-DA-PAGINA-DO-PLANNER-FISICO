import React, { useState, useEffect } from "react";
import { KITS_DATA, TESTIMONIALS_DATA } from "./data";
import { KitOption } from "./types";
import FAQSection from "./components/FAQSection";
import InteractivePlannerPreview from "./components/InteractivePlannerPreview";
import CheckoutModal from "./components/CheckoutModal";
import {
  Heart,
  Sparkles,
  Check,
  ShieldCheck,
  Lock,
  Star,
  Award,
  Truck,
  BookOpen,
  Users,
  ArrowRight,
  MessageSquare,
  Bookmark,
  Calendar,
  Send,
  Flame,
  Clock,
  Instagram,
  Mail,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedKitId, setSelectedKitId] = useState<string>("kit-2"); // Default is Combo Duplo

  // Floating CTA Bar visibility
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Scarcity Timer: 14 minutes and 35 seconds
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 35);

  // Interactive Prayer Wall (Altar de Clamor) for Reciprocity & Emotion
  const [prayers, setPrayers] = useState([
    { id: 1, name: "Mariana S.", city: "São Paulo - SP", content: "Clamo pela mente do meu filho Léo, que o Senhor o blinde de todas as armadilhas deste mundo secular e o guarde na escola.", date: "Hoje" },
    { id: 2, name: "Débora R.", city: "Curitiba - PR", content: "Pela saúde e futuro espiritual da minha bebê Helena. Que ela cresça sob os caminhos do Senhor.", date: "Hoje" },
    { id: 3, name: "Cláudia M.", city: "Belo Horizonte - MG", content: "Pelo meu filho adolescente, Gabriel. Que o Senhor dê bons amigos e restaure o interesse dele pela palavra de Deus.", date: "Ontem" }
  ]);
  const [newPrayerName, setNewPrayerName] = useState("");
  const [newPrayerCity, setNewPrayerCity] = useState("");
  const [newPrayerContent, setNewPrayerContent] = useState("");
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  // Simulated live buyers counter (Social Proof & Urgency)
  const [liveBuyers, setLiveBuyers] = useState(12);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 14 * 60 + 35));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show floating bar after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulated live purchaser notification ticker
  useEffect(() => {
    const interval = setInterval(() => {
      // randomly fluctuate live buyers to simulate activity
      setLiveBuyers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 5 ? 5 : next > 20 ? 20 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOpenCheckout = (kitId: string) => {
    setSelectedKitId(kitId);
    setIsCheckoutOpen(true);
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerName || !newPrayerContent) return;
    const item = {
      id: prayers.length + 1,
      name: newPrayerName,
      city: newPrayerCity || "Brasil",
      content: newPrayerContent,
      date: "Agora mesmo"
    };
    setPrayers([item, ...prayers]);
    setNewPrayerName("");
    setNewPrayerCity("");
    setNewPrayerContent("");
    setPrayerSubmitted(true);
    setTimeout(() => setPrayerSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 antialiased relative">
      
      {/* 1. TOP SCARCITY & NOTICE BAR */}
      <div className="bg-stone-900 text-white py-2 px-4 text-center text-xs font-accent font-semibold tracking-wide flex flex-wrap items-center justify-center gap-2 z-40 relative">
        <span className="flex items-center gap-1 text-gold-brand-300">
          <Clock className="w-3.5 h-3.5 animate-pulse" /> OFERTA ESPECIAL TEMPORÁRIA:
        </span>
        <span>Garante bônus exclusivos e frete promocional seguro. Termina em:</span>
        <span className="bg-rose-brand-800 text-white px-2 py-0.5 rounded-sm font-mono font-bold text-[11px]">
          {formatTime(timeLeft)}
        </span>
        <span className="hidden md:inline text-stone-400">|</span>
        <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase font-bold animate-pulse">
          {liveBuyers} mães comprando agora nas últimas 2h
        </span>
      </div>

      {/* =========================================================
          SEÇÃO 1: DOBRA PRINCIPAL (Hero Section)
          ========================================================= */}
      <header className="relative pt-12 pb-24 md:py-28 overflow-hidden bg-gradient-to-b from-rose-brand-100/60 via-gold-brand-50/40 to-transparent">
        
        {/* Soft background visual decorations */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-rose-brand-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gold-brand-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT COLUMN */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-brand-100 text-rose-brand-800 font-accent text-xs font-bold tracking-wider uppercase border border-rose-brand-200/50"
              >
                <Sparkles className="w-4 h-4 text-gold-brand-600 animate-spin" />
                Uma atmosfera de paz e propósito para o seu lar
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl text-stone-900 font-bold tracking-tight leading-none"
              >
                "A maior herança que você pode deixar para o seu filho não é material...{" "}
                <span className="text-gold-brand-700 block italic font-normal mt-1">
                  É o tempo que você passou de joelhos por ele."
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans"
              >
                Conheça o <strong>Planner Físico Mães de Joelhos e Filhos de Pé</strong>: O guia prático e devocional para transformar a sua rotina de oração, proteger a sua família e organizar o seu dia a dia com a sabedoria que vem do Alto.
              </motion.p>

              {/* Call to Action Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4 flex flex-col items-center lg:items-start gap-4"
              >
                <button
                  id="hero-cta-btn"
                  onClick={() => handleOpenCheckout("kit-2")}
                  className="w-full sm:w-auto px-8 py-5 bg-gold-button font-display font-bold text-white text-base sm:text-lg rounded-full transition-all tracking-wide cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>QUERO GARANTIR O MEU PLANNER FÍSICO COM FRETE PROMOCIONAL</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Trust and shipping icons */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 pt-2 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
                    <Truck className="w-4 h-4 text-gold-brand-600" /> Produto Físico - Entrega em todo o Brasil
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Compra 100% Segura e Protegida
                  </span>
                </div>
              </motion.div>
            </div>

            {/* HERO VISUAL COLUMN: 3D CSS Planner Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[360px] aspect-[3/4] bg-stone-100 rounded-3xl shadow-2xl border-4 border-stone-200 p-4 capa-shimmer"
              >
                {/* Book spine simulation */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-stone-400 via-stone-200 to-stone-400 rounded-l-2xl border-r border-stone-300 shadow-inner flex flex-col justify-around py-6 z-10">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="w-5 h-2 bg-gradient-to-r from-gold-brand-400 to-gold-brand-100 rounded-full border border-gold-brand-600/30 transform -translate-x-1" />
                  ))}
                </div>

                {/* Book cover face */}
                <div className="w-full h-full bg-rose-brand-900 rounded-2xl pl-10 pr-6 py-12 flex flex-col justify-between items-center text-center text-white relative shadow-xl overflow-hidden select-none">
                  {/* Subtle golden hot stamping decorative frame */}
                  <div className="absolute inset-4 border border-gold-brand-400/40 rounded-lg pointer-events-none" />
                  <div className="absolute inset-5 border-2 border-gold-brand-400/20 rounded-md pointer-events-none" />

                  <span className="text-[10px] tracking-[0.3em] font-accent text-gold-brand-200 uppercase font-bold">
                    EDICÃO LUXO • 2026-2027
                  </span>

                  <div className="my-auto space-y-4">
                    <div className="flex justify-center">
                      <Heart className="w-10 h-10 text-gold-brand-400 fill-gold-brand-300/10" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-gold-brand-100 px-2 drop-shadow-sm">
                      Mães de Joelhos
                    </h2>
                    <div className="w-16 h-[2px] bg-gold-brand-300 mx-auto" />
                    <p className="font-display text-2xl font-medium text-gold-brand-200 italic leading-none drop-shadow-sm">
                      Filhos de Pé
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-accent text-rose-brand-200 tracking-wider font-semibold">
                      O GUIA PRÁTICO E DEVOCIONAL
                    </p>
                    <p className="text-[9px] text-rose-brand-100 opacity-80">
                      Material Físico Premium com Acabamento Nobre
                    </p>
                  </div>

                  {/* Golden Bookmark Hanging out from bottom */}
                  <div className="absolute right-8 bottom-0 w-4 h-12 bg-gold-brand-400 rounded-b-md shadow-md transform translate-y-3 border-r border-gold-brand-600" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================================
          SEÇÃO 2: A DOR / O DIAGNÓSTICO (Conexão Emocional)
          ========================================================= */}
      <section className="py-20 md:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
        
        {/* Soft atmospheric background lights */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-brand-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800/50 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual block showing mothers in deep reflection */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="p-8 bg-stone-800/50 rounded-3xl border border-stone-800 backdrop-blur-md space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-brand-500/5 rounded-bl-full" />
                
                <h4 className="text-xs font-bold uppercase tracking-widest text-rose-brand-300 font-accent flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Diagnóstico Maternal
                </h4>

                <blockquote className="font-display text-lg italic text-stone-300 leading-relaxed">
                  "No silêncio do quarto, depois que eles dormem, dá aquele aperto no peito: 'Será que estou blindando o futuro dos meus filhos contra as armadilhas deste mundo?'"
                </blockquote>

                <div className="flex items-center gap-3 border-t border-stone-700/60 pt-4">
                  <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center text-stone-300 font-bold text-sm">
                    MC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-200">Maria Clara</p>
                    <p className="text-[10px] text-stone-400">Mãe de dois meninos</p>
                  </div>
                </div>
              </div>

              {/* Statistical emotional box */}
              <div className="bg-gradient-to-r from-rose-brand-950 to-stone-950 p-6 rounded-2xl border border-rose-brand-900/40 flex items-center gap-4">
                <Flame className="w-10 h-10 text-rose-brand-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-rose-brand-200 uppercase tracking-wider font-accent">FATO ESPIRITUAL CRUCIAL</p>
                  <p className="text-stone-300 text-xs mt-0.5">As maiores batalhas pelos filhos não são vencidas com discussões ou proibições, mas na intimidade do quarto de joelhos.</p>
                </div>
              </div>
            </div>

            {/* Content Text Block */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-brand-900/50 text-rose-brand-300 font-accent border border-rose-brand-900">
                Uma Realidade Dolorosa
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight leading-tight">
                Você sente que o dia termina e você não conseguiu orar como gostaria pelos seus filhos?
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                A correria do dia a dia, a exaustão da rotina e as distrações do mundo parecem roubar o seu tempo com Deus. No fundo, dá aquele aperto no coração: <em className="text-rose-brand-200">"Sinto que estou correndo o dia todo, mas deixando a mente dos meus filhos desprotegida."</em>
              </p>

              {/* Checklist points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Sente-se culpada por ter uma vida de oração inconstante.",
                  "Acorda cansada e sem um direcionamento claro para o dia.",
                  "Quer orar com propósito e especificidade, mas na hora faltam as palavras.",
                  "Deseja ver seus filhos firmes na fé, mas se perde na desorganização."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="p-1 rounded-full bg-rose-brand-900 text-rose-brand-300 mt-1 shrink-0">
                      <span className="block w-1.5 h-1.5 bg-rose-brand-400 rounded-full" />
                    </span>
                    <p className="text-stone-300 text-sm leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SEÇÃO 3: A SOLUÇÃO (A Virada de Chave)
          ========================================================= */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* TEXT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand-100 text-gold-brand-800 font-accent">
                <Sparkles className="w-3.5 h-3.5" /> A Virada de Chave
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-stone-900 tracking-tight leading-tight">
                E se você pudesse transformar cada dia em um{" "}
                <span className="text-gold-brand-700 block italic font-normal mt-1">
                  clamor estratégico pelo futuro da sua geração?
                </span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                O <strong>Planner Mães de Joelhos e Filhos de Pé</strong> não é apenas uma agenda de compromissos ou anotações comuns. Ele é uma ferramenta de <strong>guerra espiritual</strong> e organização diária intencional.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Um material físico de altíssima qualidade, desenhado para você segurar nas mãos, rabiscar, chorar e registrar os milagres que Deus vai realizar na vida da sua família. Uma herança espiritual que ficará registrada para sempre.
              </p>

              {/* Solution micro-bullets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-stone-700 text-sm font-semibold">Transforma culpa em posicionamento prático</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-stone-700 text-sm font-semibold">Organiza a rotina doméstica sob a ótica bíblica</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-stone-700 text-sm font-semibold">Gera constância na leitura da palavra e devocional</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  id="solution-cta-btn"
                  onClick={() => handleOpenCheckout("kit-2")}
                  className="w-full sm:w-auto px-6 py-4 bg-stone-900 hover:bg-stone-800 text-white font-accent font-semibold text-sm rounded-full tracking-wide transition-all duration-300 shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>GARANTIR MINHA FERRAMENTA DE GUERRA ESPIRITUAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* VISUAL IMAGE CARD SHOWING PRE-VISUAL DETAILS */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[400px]">
                {/* Decorative background outline */}
                <div className="absolute inset-0 bg-gold-brand-200/40 rounded-3xl transform rotate-3 scale-102 blur-xs -z-10" />
                
                <div className="bg-white border-2 border-gold-brand-200/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  {/* Decorative subtle texture header */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-linear-to-r from-gold-brand-300 to-rose-brand-300" />
                  
                  {/* Styled block representing mother's peaceful moment */}
                  <div className="flex items-center gap-3 bg-rose-brand-50/50 p-4 rounded-2xl border border-rose-brand-100 mb-6 mt-2">
                    <div className="w-12 h-12 rounded-full bg-rose-brand-200/70 flex items-center justify-center text-rose-brand-800">
                      <Heart className="w-6 h-6 fill-rose-brand-800" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-800">"Encontrei a Paz que Buscava"</p>
                      <p className="text-[10px] text-stone-500">Mãe orando com o planner aberto</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    Com o planner físico nas mãos, você tem um local sagrado para registrar suas petições e agradecer a Deus por cada vitória. Suas páginas internas guiam sua mente com foco espiritual absoluto.
                  </p>

                  <div className="border-t border-stone-100 pt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-stone-50 rounded-xl">
                      <span className="block text-xl font-bold text-gold-brand-800 font-accent">100%</span>
                      <span className="text-[10px] text-stone-500 font-semibold uppercase">Físico e Premium</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl">
                      <span className="block text-xl font-bold text-gold-brand-800 font-accent">Paz</span>
                      <span className="text-[10px] text-stone-500 font-semibold uppercase">Espiritual no Lar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SEÇÃO 4: O QUE TEM DENTRO DO PLANNER (Especificações)
          ========================================================= */}
      <InteractivePlannerPreview />

      {/* =========================================================
          SEÇÃO 5: TESTEMUNHOS / PROVA SOCIAL
          ========================================================= */}
      <section id="depoimentos" className="py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-brand-100 text-rose-brand-800 font-accent mb-3">
              <Users className="w-3.5 h-3.5" /> Prova Social Real
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-stone-900 tracking-tight">
              Mães que se levantaram e mudaram a{" "}
              <span className="text-gold-brand-700 italic block sm:inline">atmosfera de suas casas</span>
            </h2>
            <p className="mt-4 text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
              Veja os relatos sinceros de mães comuns que decidiram sair da inércia e se posicionar de joelhos pela proteção dos filhos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS_DATA.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-stone-50 border border-stone-200/80 rounded-3xl p-6 shadow-xs relative flex flex-col justify-between"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute -top-3 -right-2 text-stone-200/50 text-8xl font-serif select-none pointer-events-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-gold-brand-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-brand-400 text-gold-brand-400" />
                    ))}
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed relative z-10">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 border-t border-stone-200/60 pt-5 mt-6 shrink-0">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-stone-800">{t.name}</p>
                    <p className="text-[10px] text-stone-500 font-semibold">{t.childrenInfo}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* =========================================================
              INTERACTIVE ALTAR DE CLAMOR (Interactive Prayer Wall)
              For reciprocity and high conversion engagement
              ========================================================= */}
          <div className="mt-20 max-w-4xl mx-auto bg-rose-brand-50/40 rounded-3xl border border-rose-brand-200/60 p-8">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1 bg-rose-brand-100 text-rose-brand-800 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                <Heart className="w-3 h-3 fill-rose-brand-800" /> Altar de Clamor do Nosso Lar
              </span>
              <h3 className="text-2xl font-display font-semibold text-stone-900 mt-2">
                Unidas em Intercessão
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                Escreva o seu clamor ou o nome do seu filho abaixo para colocar no nosso altar virtual de oração. Uma mãe ajuda a sustentar a outra de joelhos!
              </p>
            </div>

            {/* Form to submit prayer */}
            <form onSubmit={handleAddPrayer} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div>
                <label htmlFor="pr-name" className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Seu Nome *</label>
                <input
                  id="pr-name"
                  type="text"
                  required
                  value={newPrayerName}
                  onChange={(e) => setNewPrayerName(e.target.value)}
                  placeholder="Ex: Maria Cláudia"
                  className="w-full bg-white px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:border-rose-brand-500"
                />
              </div>
              <div>
                <label htmlFor="pr-city" className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Sua Cidade (UF)</label>
                <input
                  id="pr-city"
                  type="text"
                  value={newPrayerCity}
                  onChange={(e) => setNewPrayerCity(e.target.value)}
                  placeholder="Ex: São Paulo - SP"
                  className="w-full bg-white px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:border-rose-brand-500"
                />
              </div>
              <div>
                <label htmlFor="pr-content" className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Seu Motivo de Clamor pelos Filhos *</label>
                <div className="flex gap-2">
                  <input
                    id="pr-content"
                    type="text"
                    required
                    value={newPrayerContent}
                    onChange={(e) => setNewPrayerContent(e.target.value)}
                    placeholder="Ex: Pela saúde e proteção escolar..."
                    className="w-full bg-white px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:border-rose-brand-500"
                  />
                  <button
                    type="submit"
                    id="add-prayer-btn"
                    className="px-4 py-2 bg-rose-brand-800 hover:bg-rose-brand-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clamar</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Success notification */}
            <AnimatePresence>
              {prayerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs text-center font-semibold"
                >
                  Glória a Deus! Seu motivo de clamor foi adicionado ao altar virtual. Que o Senhor responda com bênçãos!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Prayers wall */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {prayers.map((pr) => (
                <div key={pr.id} className="bg-white/80 p-4 rounded-xl border border-rose-brand-100 shadow-3xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-brand-100 flex items-center justify-center text-rose-brand-800 shrink-0">
                    <Heart className="w-4 h-4 fill-rose-brand-800" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-stone-800">{pr.name}</span>
                      <span className="text-[9px] text-stone-400 font-semibold">({pr.city})</span>
                      <span className="text-[9px] bg-rose-brand-50 text-rose-brand-800 font-accent font-bold px-1.5 py-0.5 rounded-sm">
                        {pr.date}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 italic">
                      "{pr.content}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SEÇÃO 6: OFERTA IRRECUSÁVEL (Ancoragem de Preço)
          ========================================================= */}
      <section id="ofertas" className="py-20 md:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
        
        {/* Decorative backdrop */}
        <div className="absolute inset-0 bg-radial from-stone-800/60 to-stone-950 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-brand-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand-900/50 text-gold-brand-300 font-accent border border-gold-brand-900">
              <Award className="w-3.5 h-3.5" /> Condição Exclusiva Limitada
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">
              Invista hoje no maior projeto da sua vida: <span className="text-gold-brand-400 block italic font-normal mt-1">Sua Família.</span>
            </h2>
            <p className="mt-4 text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
              Selecione o melhor combo abaixo. Sugerimos o <strong>Combo Duplo</strong> para presentear outra mãe que você ama e quer de joelhos pelo reino de Deus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {KITS_DATA.map((kit, index) => {
              return (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-300 ${
                    kit.isPopular
                      ? "bg-stone-800 border-gold-brand-500 shadow-2xl ring-2 ring-gold-brand-500 scale-102"
                      : "bg-stone-900/40 border-stone-800 hover:border-stone-700 shadow-md"
                  }`}
                >
                  {/* Popular Highlight Badge */}
                  {kit.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-brand-600 text-white font-accent font-bold uppercase text-[9px] px-3.5 py-1 rounded-full tracking-widest shadow-md">
                      RECOMENDADO / MAIS VENDIDO
                    </span>
                  )}

                  {/* Header info */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-stone-100">{kit.name}</h3>
                    <p className="text-xs text-stone-400 leading-snug">{kit.tagline}</p>
                    
                    {/* Price Anchor block */}
                    <div className="pt-3 pb-4 border-b border-stone-800/80">
                      <span className="block text-xs text-stone-500 line-through">
                        De R$ {kit.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-[11px] font-accent text-emerald-400 font-semibold block uppercase">
                        Economize R$ {kit.savings.toFixed(2)} à vista
                      </span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-xs text-stone-400">12x de</span>
                        <span className="text-3xl sm:text-4xl font-black text-gold-brand-400 font-accent">
                          R$ {kit.installmentValue.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 block mt-1">
                        ou <strong>R$ {kit.salePrice.toFixed(2)}</strong> à vista
                      </span>
                    </div>

                    {/* Features/benefits checklist */}
                    <ul className="space-y-2.5 pt-4">
                      {kit.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <Check className="w-4 h-4 text-gold-brand-400 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing CTA */}
                  <div className="mt-8 pt-6 border-t border-stone-800/80">
                    <button
                      id={`buy-kit-btn-${kit.id}`}
                      onClick={() => handleOpenCheckout(kit.id)}
                      className={`w-full py-4 text-center font-bold rounded-full transition-all tracking-wide cursor-pointer flex items-center justify-center gap-2 text-sm ${
                        kit.isPopular
                          ? "bg-gold-button text-white"
                          : "bg-white hover:bg-stone-100 text-stone-900"
                      }`}
                    >
                      <span>COMPRAR AGORA</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    {/* Micro subtext */}
                    <p className="text-[10px] text-stone-500 text-center mt-3 font-semibold">
                      🔒 Pagamento 100% Seguro e Criptografado
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stock Scarcity Counter */}
          <div className="mt-16 text-center max-w-xl mx-auto p-4 bg-stone-950/40 border border-stone-800 rounded-2xl">
            <p className="text-xs text-rose-brand-300 font-accent uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 animate-pulse">
              ⚠️ ATENÇÃO: ESTOQUE LIMITADO
            </p>
            <p className="text-stone-400 text-xs mt-1">
              Devido à alta qualidade do acabamento premium em dourado hot stamping, esta tiragem física é limitada. Garanta hoje para não precisar aguardar o próximo lote de impressão.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          SEÇÃO 7: BÔNUS EXCLUSIVOS
          ========================================================= */}
      <section id="bonus" className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-brand-100 text-rose-brand-800 font-accent mb-3">
              Presentes Exclusivos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-stone-900 tracking-tight">
              Bônus Exclusivos inclusos <span className="text-gold-brand-700 italic block sm:inline">completamente grátis</span>
            </h2>
            <p className="mt-4 text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
              Ao adquirir o seu planner físico hoje, você ganha acesso instantâneo aos recursos de suporte espiritual abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* BONUS 1 */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between items-start gap-6 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-gold-brand-600 text-white font-accent font-bold text-[10px] uppercase rounded-sm tracking-widest">
                    BÔNUS 1 • DIGITAL
                  </span>
                  <span className="text-emerald-600 text-xs font-bold font-mono">100% GRÁTIS</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900">E-book "31 Motivos de Oração pelos Filhos"</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Um guia devocional detalhado com 31 motivos bíblicos específicos e promessas de Deus para você clamar, um para cada dia do mês. Nunca mais se sinta sem palavras durante o seu momento de joelhos.
                </p>
              </div>
              <div className="border-t border-stone-100 pt-4 w-full flex items-center gap-2 text-stone-500 text-xs font-medium">
                <BookOpen className="w-4 h-4 text-gold-brand-600 shrink-0" />
                <span>Formato e-book (PDF) enviado por e-mail e WhatsApp</span>
              </div>
            </div>

            {/* BONUS 2 */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between items-start gap-6 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-gold-brand-600 text-white font-accent font-bold text-[10px] uppercase rounded-sm tracking-widest">
                    BÔNUS 2 • COMUNIDADE
                  </span>
                  <span className="text-emerald-600 text-xs font-bold font-mono">100% GRÁTIS</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900">Acesso à Comunidade de Mães Intercessoras</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Faça parte do círculo fechado de mães cristãs que se reúnem virtualmente para compartilhar testemunhos de milagres e sustentar as necessidades de oração umas das outras. Você nunca mais orará sozinha.
                </p>
              </div>
              <div className="border-t border-stone-100 pt-4 w-full flex items-center gap-2 text-stone-500 text-xs font-medium">
                <Users className="w-4 h-4 text-gold-brand-600 shrink-0" />
                <span>Acesso vitalício ao grupo de intercessão</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SEÇÃO 8: GARANTIA DE SATISFAÇÃO
          ========================================================= */}
      <section id="garantia" className="py-20 bg-[#faf6f0] border-b border-stone-200/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          {/* Custom stamp simulation */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-double border-gold-brand-600 flex items-center justify-center bg-white p-2 shadow-md relative animate-pulse">
              <div className="w-full h-full rounded-full border border-gold-brand-400 flex flex-col justify-center items-center">
                <span className="font-accent font-black text-gold-brand-800 text-sm leading-none">7 DIAS</span>
                <span className="text-[7px] text-stone-500 uppercase tracking-widest font-bold">GARANTIA</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand-100 text-gold-brand-800 font-accent">
            Satisfação Plena
          </span>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-stone-900 tracking-tight max-w-xl mx-auto">
            Risco Zero para a sua fé e para o seu bolso.
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Temos tanta certeza da qualidade física impecável e do impacto espiritual deste material que te oferecemos uma <strong>garantia incondicional de 7 dias</strong>. Se você receber o planner físico na sua casa e achar que ele não atende às suas expectativas, ou que o material não é exatamente o que esperava, basta enviar um e-mail para <strong className="text-stone-800">contato.forttuni@gmail.com</strong> dentro de 7 dias e devolvemos 100% do seu dinheiro, sem perguntas ou burocracia.
          </p>
        </div>
      </section>

      {/* =========================================================
          SEÇÃO 9: FAQ (Perguntas Frequentes)
          ========================================================= */}
      <FAQSection />

      {/* =========================================================
          SEÇÃO 10: RODAPÉ (Footer)
          ========================================================= */}
      <footer className="bg-stone-900 text-stone-400 pt-16 pb-24 border-t border-stone-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
            
            {/* Logo and mission */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-brand-400 fill-rose-brand-400" />
                <span className="font-display text-lg font-bold text-stone-100">
                  Mães de Joelhos • Filhos de Pé
                </span>
              </div>
              <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                Nossa missão é fornecer ferramentas devocionais físicas de altíssima qualidade para apoiar as mães na jornada diária de oração, edificação do lar e blindagem espiritual da nova geração.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-stone-200 font-accent font-bold uppercase text-[10px] tracking-wider">LINKS ÚTEIS</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-gold-brand-400 transition-colors">Especificações</a></li>
                <li><a href="#depoimentos" className="hover:text-gold-brand-400 transition-colors">Testemunhos</a></li>
                <li><a href="#ofertas" className="hover:text-gold-brand-400 transition-colors">Combos e Preços</a></li>
                <li><a href="#faq" className="hover:text-gold-brand-400 transition-colors">Dúvidas Comuns</a></li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="space-y-3">
              <h4 className="text-stone-200 font-accent font-bold uppercase text-[10px] tracking-wider">SUPORTE E CONTATO</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <a href="mailto:contato.forttuni@gmail.com" className="hover:text-gold-brand-400 transition-colors">
                    contato.forttuni@gmail.com
                  </a>
                </li>
                <li className="text-stone-500 leading-tight">
                  Atendimento de Segunda a Sexta, das 9h às 18h.
                </li>
              </ul>
            </div>

          </div>

          {/* Legal details and CNPJ as requested */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-stone-500">
            <div className="text-center md:text-left space-y-1">
              <p>© 2026 Forttuni Distribuidora e Editora Ltda. Todos os direitos reservados.</p>
              <p>CNPJ: 45.123.456/0001-99 | contato.forttuni@gmail.com</p>
            </div>
            <div className="flex gap-4 text-stone-500 text-xs">
              <span className="hover:underline cursor-pointer">Políticas de Privacidade</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Termos de Uso</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          PERSISTENT FLOATING ORDER BAR
          Visible on scroll past hero, allows instant conversion
          ========================================================= */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md py-4 px-6 border-t border-stone-200 shadow-xl z-40 flex items-center justify-between gap-4 max-w-7xl mx-auto"
          >
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-stone-900">Planner Mães de Joelhos e Filhos de Pé</p>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Frete Promocional Ativo para a sua Região
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="shrink-0">
                <span className="block text-[10px] text-stone-400 line-through">Por R$ 394,00</span>
                <span className="text-sm font-bold text-rose-brand-800">12x R$ 19,62</span>
              </div>
              
              <button
                id="floating-cta-btn"
                onClick={() => handleOpenCheckout("kit-2")}
                className="grow sm:grow-0 px-6 py-3 bg-gold-button font-display font-bold text-white text-xs sm:text-sm rounded-full transition-all tracking-wide cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>QUERO O MEU PLANNER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL DRAWER */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedKitId={selectedKitId}
      />

    </div>
  );
}
