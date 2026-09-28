import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Beef,
  ChevronRight,
  Flame,
  MessageCircle,
  Menu,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import officialLogo from "@/assets/tt-brasil-logo-oficial.png";
import floatingBurger from "@/assets/tt-floating-burger.png";
import bbqBacon from "@/assets/menu-bbq-bacon.jpg";
import duplaArtesanal from "@/assets/menu-dupla-artesanal.jpg";
import baconCheddar from "@/assets/menu-bacon-cheddar.jpg";
import loadedFries from "@/assets/menu-fritas-loaded.jpg";
import duploCheddar from "@/assets/menu-duplo-cheddar.jpg";
import cremosoBacon from "@/assets/menu-cremoso-bacon.jpg";
import smashClassico from "@/assets/menu-smash-classico.jpg";
import baconSalada from "@/assets/menu-bacon-salada.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TT Brasil Art Burger | Cardápio e experiência" },
      {
        name: "description",
        content:
          "Descubra o cardápio visual da TT Brasil Art Burger: burgers autorais, bacon crocante, cheddar e acompanhamentos.",
      },
      { property: "og:title", content: "TT Brasil Art Burger | Arte em cada mordida" },
      {
        property: "og:description",
        content:
          "Burgers marcantes, combinações autorais e uma experiência feita para sair do comum.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "A experiência", href: "#experiencia" },
  { label: "Nossa essência", href: "#sobre" },
];

type Category = "Todos" | "Burgers" | "Acompanhamentos";

// Informe somente números, com código do país e DDD. Ex.: 5511999999999.
const whatsappNumber = "";

const menuItems = [
  {
    image: smashClassico,
    name: "TT Smash",
    tag: "Essencial",
    category: "Burgers" as const,
    description: "Carne na chapa, cheddar cremoso e pão macio com gergelim.",
    alt: "Hambúrguer artesanal com carne e cheddar",
  },
  {
    image: baconCheddar,
    name: "Bacon Gold",
    tag: "Favorito",
    category: "Burgers" as const,
    description: "Burger suculento, cheddar, bacon crocante e cebola roxa.",
    alt: "Hambúrguer com cheddar e bacon crocante",
  },
  {
    image: bbqBacon,
    name: "BBQ Brutal",
    tag: "Intenso",
    category: "Burgers" as const,
    description: "Cheddar, bacon em dobro, picles, salada e molho barbecue defumado.",
    alt: "Hambúrguer com bacon, barbecue, salada e fritas",
  },
  {
    image: duploCheddar,
    name: "Duplo TT",
    tag: "Duplo",
    category: "Burgers" as const,
    description: "Dois burgers, muito cheddar, alface fresca e pão tostado.",
    alt: "Hambúrguer duplo com cheddar e fritas",
  },
  {
    image: cremosoBacon,
    name: "Cream Bacon",
    tag: "Cremoso",
    category: "Burgers" as const,
    description: "Carne, cheddar, bacon crocante e molho branco cremoso.",
    alt: "Hambúrguer com bacon, cheddar e molho cremoso",
  },
  {
    image: baconSalada,
    name: "Bacon Garden",
    tag: "Completo",
    category: "Burgers" as const,
    description: "Burger alto, queijo, bacon, alface, tomate e molho da casa.",
    alt: "Hambúrguer com bacon, queijo, alface e tomate",
  },
  {
    image: duplaArtesanal,
    name: "Seleção TT",
    tag: "Para dividir",
    category: "Burgers" as const,
    description: "Uma dupla artesanal com carne, cheddar, bacon e cebola caramelizada.",
    alt: "Dois hambúrgueres artesanais com cheddar e bacon",
  },
  {
    image: loadedFries,
    name: "Fritas Insanas",
    tag: "Acompanhamento",
    category: "Acompanhamentos" as const,
    description: "Fritas crocantes, mix de queijos, bacon, ervas e toque de pimenta.",
    alt: "Batatas fritas com queijo, bacon e pimenta",
  },
];

const principles = [
  {
    number: "01",
    icon: Flame,
    title: "Chapa quente",
    text: "Textura, suculência e aquele tostado que faz toda a diferença.",
  },
  {
    number: "02",
    icon: Beef,
    title: "Camadas de sabor",
    text: "Combinações marcantes, do cheddar cremoso ao bacon crocante.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Identidade autoral",
    text: "Cada burger nasce para ter presença, personalidade e memória.",
  },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("Todos");
  const [selectedItem, setSelectedItem] = useState<(typeof menuItems)[number] | null>(null);
  const filteredItems = useMemo(
    () =>
      category === "Todos" ? menuItems : menuItems.filter((item) => item.category === category),
    [category],
  );

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [category]);

  useEffect(() => {
    if (!selectedItem) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedItem]);

  const whatsappLink =
    selectedItem && whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Quero pedir o ${selectedItem.name} da TT Brasil.`)}`
      : undefined;

  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-row">
          <a
            href="#inicio"
            className="brand"
            aria-label="TT Brasil Art Burger — início"
            onClick={() => setMenuOpen(false)}
          >
            <img src={officialLogo} alt="TT Brasil Art Burger" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {nav.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="poster" className="header-cta">
            <a href="#cardapio">
              <span>
                Ver cardápio <ArrowRight size={16} aria-hidden="true" />
              </span>
            </a>
          </Button>
          <Button
            variant="square"
            className="menu-trigger"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </Button>
        </div>
        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? "open" : ""}`}
          aria-label="Navegação mobile"
          aria-hidden={!menuOpen}
        >
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-ribbon" aria-hidden="true">
            <span>ART BURGER · TT BRASIL · ART BURGER · TT BRASIL · </span>
          </div>
          <div className="container hero-layout">
            <div className="hero-visual" aria-hidden="true">
              <img className="hero-burger" src={floatingBurger} alt="" width={1024} height={1024} />
            </div>
            <div className="hero-sticker" aria-hidden="true">
              <Star size={22} fill="currentColor" />
              <span>Feito para impressionar</span>
            </div>
            <div className="hero-copy">
              <h1 className="hero-brand-lockup" id="hero-title">
                <img src={officialLogo} alt="TT Brasil Art Burger — onde a arte encontra o sabor" />
              </h1>
              <p className="hero-description">
                Burgers artesanais, combinações sem medo e uma experiência que começa pelos olhos.
              </p>
              <div className="hero-actions">
                <Button asChild variant="poster">
                  <a href="#cardapio">
                    <span>
                      Explorar cardápio <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                </Button>
                <Button asChild variant="square" aria-label="Ir para o cardápio">
                  <a href="#cardapio">
                    <ArrowDown size={20} aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="hero-scroll" aria-hidden="true">
              Role para descobrir
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                Carne na chapa <b>✳</b> Bacon crocante <b>✳</b> Muito cheddar <b>✳</b> Atitude em
                cada mordida <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        <section className="menu-section" id="cardapio" aria-labelledby="menu-title">
          <div className="container">
            <div className="section-top reveal">
              <div>
                <p className="section-kicker">Cardápio TT / escolha o seu</p>
                <h2 className="section-title" id="menu-title">
                  Qual é a<br />
                  <em>sua fome?</em>
                </h2>
              </div>
              <div className="menu-intro">
                <p>
                  Do smash direto ao ponto ao burger carregado de bacon: escolha a sua próxima obra.
                </p>
                <div className="filter-bar" role="group" aria-label="Filtrar cardápio">
                  {(["Todos", "Burgers", "Acompanhamentos"] as Category[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={category === item ? "active" : ""}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="menu-grid" aria-live="polite">
              {filteredItems.map((item, index) => (
                <article
                  className={`menu-card reveal ${index === 0 && category === "Todos" ? "featured" : ""}`}
                  key={item.name}
                >
                  <div className="menu-image">
                    <img src={item.image} alt={item.alt} loading={index < 2 ? "eager" : "lazy"} />
                    <span className="menu-tag">{item.tag}</span>
                  </div>
                  <div className="menu-card-copy">
                    <div>
                      <span className="menu-number">
                        {String(menuItems.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                      <h3>{item.name}</h3>
                    </div>
                    <p>{item.description}</p>
                    <button
                      className="menu-details-button"
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`Ver detalhes de ${item.name}`}
                    >
                      Ver detalhes <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="menu-disclaimer">
              Cardápio visual em desenvolvimento. Itens, ingredientes, disponibilidade e valores
              devem ser confirmados nos canais oficiais da TT Brasil.
            </p>
          </div>
        </section>

        <section className="experience" id="experiencia" aria-labelledby="experience-title">
          <div className="container experience-layout">
            <div className="experience-image reveal">
              <img
                src={bbqBacon}
                alt="Burger artesanal servido com batatas fritas"
                loading="lazy"
              />
              <div className="image-stamp">
                <span>100%</span>
                <small>presença</small>
              </div>
            </div>
            <div className="experience-copy reveal">
              <p className="section-kicker">A experiência TT</p>
              <h2 className="experience-title" id="experience-title">
                A gente não faz
                <br />
                <em>só mais um</em>
                <br />
                hambúrguer.
              </h2>
              <p>
                Da escolha dos ingredientes à montagem de cada camada, tudo é pensado para entregar
                contraste, textura e personalidade.
              </p>
              <div className="principles">
                {principles.map(({ number, icon: Icon, title, text }) => (
                  <article key={number}>
                    <span>{number}</span>
                    <Icon size={24} aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="story" id="sobre" aria-labelledby="story-title">
          <div className="container story-inner">
            <div className="story-seal reveal" aria-hidden="true">
              <span>Onde a arte</span>
              <strong>TT</strong>
              <i>encontra o sabor</i>
            </div>
            <div className="reveal">
              <p className="section-kicker">Nossa essência</p>
              <h2 className="story-title" id="story-title">
                Comer também é expressão.
              </h2>
              <p className="story-copy">
                A TT Brasil transforma o burger em linguagem: visual forte, sabor sem timidez e
                combinações que chegam para marcar.
              </p>
            </div>
          </div>
        </section>

        <section className="gallery-section" aria-label="Galeria TT Brasil">
          <div className="gallery-track reveal">
            {[cremosoBacon, loadedFries, baconSalada, duploCheddar].map((image, index) => (
              <figure key={image}>
                <img
                  src={image}
                  alt={
                    [
                      "Burger cremoso com bacon",
                      "Fritas com queijo e bacon",
                      "Burger com salada, queijo e bacon",
                      "Burger duplo com cheddar",
                    ][index]
                  }
                  loading="lazy"
                />
                <figcaption>TT / 0{index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="end-section" aria-labelledby="end-title">
          <div className="container end-inner reveal">
            <div>
              <p className="section-kicker">Sua próxima escolha começa aqui</p>
              <h2 className="section-title" id="end-title">
                Bateu
                <br />
                <em>a fome?</em>
              </h2>
            </div>
            <div>
              <p>
                Volte ao cardápio, encontre o seu favorito e prepare-se para uma experiência com a
                assinatura TT Brasil.
              </p>
              <Button asChild variant="poster">
                <a href="#cardapio">
                  <span>
                    Escolher meu burger <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {selectedItem && (
        <div
          className="product-modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedItem(null)}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="product-modal-close"
              type="button"
              aria-label="Fechar detalhes do produto"
              onClick={() => setSelectedItem(null)}
            >
              <X size={23} />
            </button>
            <div className="product-modal-image">
              <img src={selectedItem.image} alt={selectedItem.alt} />
              <span>{selectedItem.tag}</span>
            </div>
            <div className="product-modal-copy">
              <p className="section-kicker">{selectedItem.category} / TT Brasil</p>
              <h2 id="product-modal-title">{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <div className="product-modal-note">
                <strong>Sobre este item</strong>
                <span>
                  Imagem e composição ilustrativas. Confirme ingredientes, disponibilidade e valor
                  no atendimento.
                </span>
              </div>
              {whatsappLink ? (
                <a className="whatsapp-button" href={whatsappLink} target="_blank" rel="noreferrer">
                  <MessageCircle size={19} aria-hidden="true" /> Pedir no WhatsApp
                </a>
              ) : (
                <button className="whatsapp-button disabled" type="button" disabled>
                  <MessageCircle size={19} aria-hidden="true" /> WhatsApp aguardando número
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <img className="footer-logo" src={officialLogo} alt="TT Brasil Art Burger" />
            <div className="footer-small">Onde a arte encontra o sabor.</div>
          </div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            {nav.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="back-top" href="#inicio" aria-label="Voltar ao início">
            ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
