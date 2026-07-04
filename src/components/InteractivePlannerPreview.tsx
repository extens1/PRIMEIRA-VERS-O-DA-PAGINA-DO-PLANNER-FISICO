import { useState } from "react";
import { PLANNER_TABS } from "../data";
import { Check, BookOpen, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InteractivePlannerPreview() {
  const [activeTabId, setActiveTabId] = useState<string>("tab-oracao");
  const activeTab = PLANNER_TABS.find((t) => t.id === activeTabId) || PLANNER_TABS[0];

  return (
    <section id="features" className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-brand-100 text-rose-brand-800 font-accent mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Alta Qualidade & Riqueza de Detalhes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-stone-900 tracking-tight">
            Por Dentro do Seu Novo <span className="text-gold-brand-700 italic block sm:inline">Companheiro de Jornada</span>
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
            Toque nas abas abaixo para ver em detalhes como cada página foi desenhada com muito carinho e propósito espiritual para o seu devocional diário.
          </p>
        </div>

        {/* Desktop/Tablet Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-5xl mx-auto">
          {PLANNER_TABS.map((tab) => {
            const isSelected = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                id={`tab-select-${tab.id}`}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-gold-brand-600 text-white border-gold-brand-600 shadow-md scale-105"
                    : "bg-white text-stone-600 border-stone-200 hover:border-gold-brand-400 hover:text-gold-brand-800"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: INTERACTIVE CSS BOOK REPRESENTATION */}
          <div className="lg:col-span-6 flex justify-center perspective-1000">
            <motion.div
              key={activeTabId}
              initial={{ rotateY: -10, opacity: 0, scale: 0.95 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[440px] aspect-[4/5] bg-stone-100 rounded-2xl shadow-2xl border-2 border-stone-200/80 p-3 relative capa-shimmer overflow-hidden"
            >
              {/* Gold Spiral (Wire-O) Simulation on left side */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around py-4 z-20 pointer-events-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-2.5 rounded-full border border-gold-brand-400/60 bg-gradient-to-r from-gold-brand-100 via-gold-brand-300 to-gold-brand-500 shadow-sm transform -translate-x-1/2"
                  />
                ))}
              </div>

              {/* The "Pages" container */}
              <div className="w-full h-full bg-[#faf6f0] rounded-xl border border-stone-200/50 pl-8 pr-6 py-6 shadow-xs flex flex-col justify-between overflow-hidden relative">
                
                {/* Vintage paper texture look */}
                <div className="absolute inset-0 bg-radial from-transparent to-[#f4eee3]/30 pointer-events-none" />

                {/* Header elements inside the planner */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center border-b border-stone-300/60 pb-3 mb-4">
                    <span className="font-accent text-[10px] tracking-widest text-stone-400 uppercase font-bold">
                      {activeTab.badge}
                    </span>
                    <div className="flex gap-1">
                      <Star className="w-3 h-3 text-gold-brand-500 fill-gold-brand-400" />
                      <Star className="w-3 h-3 text-gold-brand-500 fill-gold-brand-400" />
                      <Star className="w-3 h-3 text-gold-brand-500 fill-gold-brand-400" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-stone-800 font-semibold leading-tight">
                    {activeTab.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-500 italic mt-1.5 leading-relaxed">
                    "{activeTab.shortDesc}"
                  </p>

                  {/* Dynamic Inner Layout Simulator */}
                  <div className="mt-5 space-y-3">
                    {activeTabId === "tab-capa" ? (
                      /* Custom cover preview mockup */
                      <div className="bg-rose-brand-900 rounded-lg p-6 text-center text-white border-2 border-gold-brand-400 min-h-[160px] flex flex-col justify-center items-center shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-black/15 pointer-events-none" />
                        <span className="text-[9px] uppercase tracking-widest text-gold-brand-200 font-accent font-bold">EDIÇÃO LIMITADA</span>
                        <h4 className="font-display text-xl mt-2 font-bold text-gold-brand-100">Mães de Joelhos</h4>
                        <p className="font-display text-lg text-gold-brand-200 italic font-medium leading-none">Filhos de Pé</p>
                        <div className="w-12 h-[1px] bg-gold-brand-300 my-3" />
                        <p className="text-[10px] text-rose-brand-100 max-w-[200px]">Planner Semanal e Diário de Oração</p>
                        <span className="absolute bottom-2 text-[8px] opacity-70 text-gold-brand-100 font-mono">CAPA DURA PREMIUM</span>
                      </div>
                    ) : (
                      /* Custom internal text line entries mimicking an open diary */
                      <div className="space-y-2.5">
                        {activeTab.contentLines.slice(0, 3).map((line, index) => (
                          <div key={index} className="bg-white/70 backdrop-blur-xs rounded-md p-2.5 border border-stone-200/40 text-left">
                            <span className="block text-[8px] font-bold text-gold-brand-600 tracking-wider uppercase mb-1">
                              CAMPOS DE ATIVIDADE #{index + 1}
                            </span>
                            <p className="text-xs text-stone-700 leading-tight">
                              {line}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer decorations */}
                <div className="relative z-10 pt-4 border-t border-stone-300/40 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-brand-600 fill-rose-brand-600" />
                    <span className="text-[9px] font-medium text-stone-500 font-sans">
                      Edificar com Amor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 font-semibold">
                    pág. {activeTabId === "tab-capa" ? "0" : activeTabId === "tab-oracao" ? "14" : "28"}
                  </span>
                </div>

                {/* Ribbon bookmark hanging effect */}
                <div className="absolute right-8 bottom-0 w-3.5 h-16 bg-rose-brand-800 rounded-t-xs shadow-md transform translate-y-4 origin-bottom z-10 border-r border-rose-brand-950" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TEXTS AND BENEFITS DETAILS */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand-100 text-gold-brand-800 font-accent">
              Destaque do Produto
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 leading-tight">
              {activeTab.title}
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {activeTab.fullDesc}
            </p>

            <div className="border-t border-stone-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-accent mb-4">
                O que você encontrará nesta seção:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTab.contentLines.map((line, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-2.5 text-stone-700 text-sm"
                  >
                    <span className="p-0.5 bg-rose-brand-100 rounded-full text-rose-brand-800 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="leading-tight">{line}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Satisfaction micro benefit */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200/60 shadow-xs max-w-md">
              <ShieldCheck className="w-10 h-10 text-gold-brand-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-stone-800">Folhas Premium de Alta Gramatura (90g)</p>
                <p className="text-[11px] text-stone-500">Escreva com canetas hidrográficas ou faça marcações sem se preocupar em manchar o verso da página.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
