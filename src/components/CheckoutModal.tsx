import React, { useState, useEffect } from "react";
import { KitOption } from "../types";
import { KITS_DATA } from "../data";
import {
  X,
  Lock,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle,
  ShieldCheck,
  Heart,
  Loader2,
  Copy,
  Check,
  Smartphone,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKitId: string;
}

export default function CheckoutModal({ isOpen, onClose, selectedKitId }: CheckoutModalProps) {
  // Active Kit Selection inside checkout
  const [activeKit, setActiveKit] = useState<KitOption>(KITS_DATA[0]);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Address State
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Update kit selection when modal opens with a specific kit
  useEffect(() => {
    const kit = KITS_DATA.find((k) => k.id === selectedKitId);
    if (kit) setActiveKit(kit);
  }, [selectedKitId, isOpen]);

  // ViaCEP integration
  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      const fetchAddress = async () => {
        setCepLoading(true);
        setCepError("");
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await res.json();
          if (data.erro) {
            setCepError("CEP não encontrado. Por favor, preencha manualmente.");
          } else {
            setStreet(data.logradouro || "");
            setNeighborhood(data.bairro || "");
            setCity(data.localidade || "");
            setState(data.uf || "");
          }
        } catch {
          setCepError("Erro ao buscar o CEP. Digite os campos abaixo.");
        } finally {
          setCepLoading(false);
        }
      };
      fetchAddress();
    }
  }, [cep]);

  // Format inputs
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setPhone(value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    setCardNumber(parts.join(" "));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  const handleCopyPix = () => {
    const pixKey = "00020101021226830014br.gov.bcb.pix2561api.pagamentos.forttuni/pix/planner-maes-de-joelhos-filhos-de-pe5204000053039865405119.905802BR5925ForttuniDistribuidora6009Sao_Paulo62070503***6304ABCD";
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !cep || !street || !number || !city || !state) {
      alert("Por favor, preencha todos os campos obrigatórios de endereço.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate secure network transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row my-8 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* CLOSE BUTTON */}
        <button
          id="checkout-close-btn"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* CONDITIONAL RENDERING: SUCCESS VS FORM */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-brand-100 text-rose-brand-800 font-accent">
              <Heart className="w-3.5 h-3.5 fill-rose-brand-800" /> Glória a Deus! Compra Confirmada
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-stone-900 leading-tight">
              Parabéns, <span className="text-gold-brand-700 italic">Mãe de Oração!</span>
            </h2>

            <div className="max-w-xl text-stone-600 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                Sua decisão de se posicionar hoje mudará a história da sua descendência. O seu <strong>{activeKit.name}</strong> está com o frete e envio garantidos e logo estará em suas mãos!
              </p>
              <p className="text-stone-500 italic">
                Enviamos todos os dados da transação, rastreamento físico e acesso imediato aos bônus digitais para o e-mail <strong>{email}</strong> e avisaremos no WhatsApp <strong>{phone}</strong> assim que o pacote for despachado.
              </p>
            </div>

            {/* Devotional message card */}
            <div className="bg-gold-brand-50 border border-gold-brand-200 rounded-2xl p-6 max-w-lg mt-2 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-brand-600 text-white font-accent font-bold uppercase text-[9px] px-2.5 py-0.5 rounded-full tracking-widest">
                PALAVRA DE DIREÇÃO
              </span>
              <p className="font-display text-base text-gold-brand-900 italic font-medium leading-relaxed pt-2">
                "Instrui o menino no caminho em que deve andar, e, até quando for velho, não se desviará dele."
              </p>
              <span className="block mt-1 text-xs text-gold-brand-700 font-semibold font-accent">
                PROVÉRBIOS 22:6
              </span>
            </div>

            {/* Address summary */}
            <div className="w-full max-w-md bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs text-stone-500 space-y-1">
              <p className="font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-400" /> Endereço de Entrega Cadastrado:
              </p>
              <p>{name}</p>
              <p>{street}, Nº {number} {complement && ` - ${complement}`}</p>
              <p>{neighborhood} - {city} / {state} (CEP: {cep})</p>
            </div>

            <button
              id="checkout-success-btn"
              onClick={onClose}
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-semibold transition-all duration-300 shadow-md cursor-pointer text-sm font-accent"
            >
              CONCLUIR E VOLTAR À PÁGINA
            </button>
          </motion.div>
        ) : (
          <>
            {/* LEFT COLUMN: KIT PREVIEW & ORDER SUMMARY */}
            <div className="w-full md:w-5/12 bg-stone-50 p-6 md:p-8 border-r border-stone-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-accent mb-6 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold-brand-600" /> Resumo do Pedido
                </h3>

                {/* Kit selector buttons inside checkout */}
                <div className="space-y-3 mb-6">
                  {KITS_DATA.map((k) => {
                    const isSelected = k.id === activeKit.id;
                    return (
                      <button
                        key={k.id}
                        type="button"
                        id={`checkout-kit-select-${k.id}`}
                        onClick={() => setActiveKit(k)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-rose-brand-50 border-rose-brand-300 ring-1 ring-rose-brand-300"
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-800 truncate">{k.name}</p>
                          <p className="text-[10px] text-stone-500 truncate mt-0.5">{k.tagline}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs text-stone-400 line-through">
                            R$ {k.originalPrice.toFixed(2)}
                          </span>
                          <span className="block text-xs font-bold text-rose-brand-800">
                            R$ {k.salePrice.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Kit features / benefits checklist */}
                <div className="border-t border-stone-200/60 pt-6 mb-6">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-accent mb-3">
                    Incluso neste pacote:
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-600">
                    {activeKit.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Secure Footer Information */}
              <div className="border-t border-stone-200/60 pt-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-stone-500">Frete Promocional Seguro:</span>
                  <span className="text-xs font-bold text-emerald-600">GRÁTIS / INCLUSO</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-stone-200/60 pb-3">
                  <span className="text-sm font-semibold text-stone-800 font-accent">Total Geral:</span>
                  <span className="text-xl font-bold text-gold-brand-800 font-accent">
                    R$ {activeKit.salePrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 text-[10px] text-emerald-800">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Ambiente seguro. Seus dados estão protegidos.</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT & SHIPPING DETAILS AND PAYMENT */}
            <form onSubmit={handleSubmit} className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between max-h-[80vh] md:max-h-[640px] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-semibold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                    1. Informações de Contato
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="chk-name" className="block text-xs font-semibold text-stone-600 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        id="chk-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Maria de Souza Silva"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="chk-email" className="block text-xs font-semibold text-stone-600 mb-1">
                        E-mail de Suporte *
                      </label>
                      <input
                        id="chk-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: maria@gmail.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="chk-phone" className="block text-xs font-semibold text-stone-600 mb-1">
                        WhatsApp para Rastreamento *
                      </label>
                      <input
                        id="chk-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-semibold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                    2. Endereço de Envio
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mt-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="chk-cep" className="block text-xs font-semibold text-stone-600 mb-1">
                        CEP *
                      </label>
                      <div className="relative">
                        <input
                          id="chk-cep"
                          type="text"
                          required
                          value={cep}
                          onChange={handleCepChange}
                          placeholder="00000-000"
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                        />
                        {cepLoading && (
                          <Loader2 className="absolute right-3 top-3 w-4 h-4 text-stone-400 animate-spin" />
                        )}
                      </div>
                      {cepError && (
                        <p className="text-[10px] text-rose-brand-800 mt-1">{cepError}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="chk-street" className="block text-xs font-semibold text-stone-600 mb-1">
                        Rua/Avenida *
                      </label>
                      <input
                        id="chk-street"
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Digite o endereço completo"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="chk-number" className="block text-xs font-semibold text-stone-600 mb-1">
                        Número *
                      </label>
                      <input
                        id="chk-number"
                        type="text"
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Ex: 123"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="chk-complement" className="block text-xs font-semibold text-stone-600 mb-1">
                        Complemento (Opcional)
                      </label>
                      <input
                        id="chk-complement"
                        type="text"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        placeholder="Ex: Apto 42, Bloco B"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="chk-neighborhood" className="block text-xs font-semibold text-stone-600 mb-1">
                        Bairro *
                      </label>
                      <input
                        id="chk-neighborhood"
                        type="text"
                        required
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="chk-city" className="block text-xs font-semibold text-stone-600 mb-1">
                        Cidade *
                      </label>
                      <input
                        id="chk-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Cidade"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="chk-state" className="block text-xs font-semibold text-stone-600 mb-1">
                        UF *
                      </label>
                      <input
                        id="chk-state"
                        type="text"
                        required
                        maxLength={2}
                        value={state}
                        onChange={(e) => setState(e.target.value.toUpperCase())}
                        placeholder="UF"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm text-center focus:border-gold-brand-500 focus:ring-1 focus:ring-gold-brand-300 focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-semibold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                    3. Método de Pagamento
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      type="button"
                      id="payment-method-pix"
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 font-semibold transition-all cursor-pointer ${
                        paymentMethod === "pix"
                          ? "bg-gold-brand-50 border-gold-brand-500 text-gold-brand-900 ring-1 ring-gold-brand-500"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-gold-brand-600" />
                      <span>Pagar via PIX</span>
                    </button>
                    <button
                      type="button"
                      id="payment-method-card"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 font-semibold transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-gold-brand-50 border-gold-brand-500 text-gold-brand-900 ring-1 ring-gold-brand-500"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-gold-brand-600" />
                      <span>Cartão</span>
                    </button>
                  </div>

                  <div className="mt-4 bg-stone-50 rounded-xl p-4 border border-stone-200/60 min-h-[160px] flex flex-col justify-center">
                    {paymentMethod === "pix" ? (
                      <div className="text-center space-y-3">
                        <div className="flex justify-center">
                          <div className="p-3 bg-white border border-stone-200 rounded-lg shadow-xs">
                            {/* Visual QR Code Placeholder with styling */}
                            <div className="w-24 h-24 bg-stone-200 rounded flex items-center justify-center relative overflow-hidden">
                              <QrCode className="w-20 h-20 text-stone-800 opacity-95" />
                              <div className="absolute inset-0 border-2 border-emerald-500 animate-pulse pointer-events-none" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-stone-500 max-w-sm mx-auto">
                          O PIX é aprovado instantaneamente. Escaneie o QR Code ou copie a chave abaixo para realizar a transferência segura.
                        </p>
                        
                        <div className="flex gap-2 max-w-md mx-auto">
                          <input
                            type="text"
                            readOnly
                            value="00020101021226830014br.gov.bcb.pix25..."
                            className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-[11px] font-mono grow text-stone-500 focus:outline-hidden"
                          />
                          <button
                            type="button"
                            id="checkout-copy-pix-btn"
                            onClick={handleCopyPix}
                            className="px-4 py-1.5 bg-gold-brand-600 hover:bg-gold-brand-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                          >
                            {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedPix ? "Copiado!" : "Copiar"}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label htmlFor="chk-card-num" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            Número do Cartão *
                          </label>
                          <input
                            id="chk-card-num"
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-white px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-hidden focus:border-gold-brand-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="chk-card-name" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            Nome Impresso no Cartão *
                          </label>
                          <input
                            id="chk-card-name"
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            placeholder="Ex: MARIA S S"
                            className="w-full bg-white px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-hidden focus:border-gold-brand-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="chk-card-expiry" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            Vencimento *
                          </label>
                          <input
                            id="chk-card-expiry"
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            placeholder="MM/AA"
                            className="w-full bg-white px-3 py-2 rounded-lg border border-stone-300 text-sm text-center focus:outline-hidden focus:border-gold-brand-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="chk-card-cvv" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            CVC / CVV *
                          </label>
                          <input
                            id="chk-card-cvv"
                            type="text"
                            required={paymentMethod === "card"}
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            className="w-full bg-white px-3 py-2 rounded-lg border border-stone-300 text-sm text-center focus:outline-hidden focus:border-gold-brand-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="chk-card-installments" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                            Parcelamento *
                          </label>
                          <select
                            id="chk-card-installments"
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                            className="w-full bg-white px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-hidden focus:border-gold-brand-500"
                          >
                            {Array.from({ length: 12 }).map((_, i) => {
                              const count = i + 1;
                              const value = activeKit.salePrice / count;
                              return (
                                <option key={count} value={count}>
                                  {count}x de R$ {value.toFixed(2)} {count === 1 ? "à vista" : "sem juros"}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8 border-t border-stone-200/60 pt-6">
                <button
                  type="submit"
                  id="checkout-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 text-center font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processando Pagamento Seguro...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4.5 h-4.5" />
                      <span>
                        {paymentMethod === "pix"
                          ? "CONFIRMAR PAGAMENTO PIX"
                          : `FINALIZAR COMPRA DE R$ ${activeKit.salePrice.toFixed(2)}`}
                      </span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> Compra 100% Criptografada
                  </span>
                  <span>•</span>
                  <span>7 Dias de Garantia Incondicional</span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
