import { useState } from "react";
import { FAQ_DATA } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand-100 text-gold-brand-800 font-accent mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-stone-900 tracking-tight">
            Perguntas <span className="text-gold-brand-700 italic">Mais Comuns</span>
          </h2>
          <p className="mt-4 text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
            Tem alguma dúvida sobre o frete, formato ou conteúdo do planner? Veja as respostas detalhadas abaixo.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all duration-300 hover:border-gold-brand-300 hover:shadow-md"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-stone-800 text-base sm:text-lg hover:text-stone-950 transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full transition-transform duration-300 bg-stone-100 text-stone-500 ${
                      isOpen ? "rotate-180 bg-gold-brand-100 text-gold-brand-700" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-stone-600 border-t border-stone-100 leading-relaxed text-sm sm:text-base bg-stone-50/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-12 text-center p-6 bg-rose-brand-50/60 rounded-2xl border border-rose-brand-100 max-w-xl mx-auto">
          <p className="text-stone-700 text-sm">
            Não encontrou a resposta para a sua dúvida?
          </p>
          <p className="text-stone-600 text-xs mt-1">
            Fale conosco diretamente pelo e-mail{" "}
            <a href="mailto:contato.forttuni@gmail.com" className="font-semibold text-rose-brand-800 hover:underline">
              contato.forttuni@gmail.com
            </a>{" "}
            ou WhatsApp de suporte.
          </p>
        </div>
      </div>
    </section>
  );
}
