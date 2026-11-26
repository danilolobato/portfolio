"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/language";

type Kind = "web" | "landing" | "uiux" | "video";

interface Service {
  number: string;
  kind: Kind;
  title: { es: string; en: string };
  description: { es: string; en: string };
  includes: { es: string; en: string }[];
}

// Editá acá tus servicios
const services: Service[] = [
  {
    number: "01",
    kind: "web",
    title: { es: "Sitios web a medida", en: "Custom websites" },
    description: {
      es: "Sitios pensados desde cero para tu marca: diseño propio, rápidos y fáciles de mantener.",
      en: "Websites built from scratch for your brand: custom design, fast and easy to maintain.",
    },
    includes: [
      { es: "Diseño y desarrollo a medida", en: "Custom design & development" },
      { es: "Adaptado a celular y escritorio", en: "Mobile and desktop ready" },
      { es: "Optimizado en velocidad", en: "Speed optimized" },
      { es: "Publicación online", en: "Going live" },
    ],
  },
  {
    number: "02",
    kind: "landing",
    title: { es: "Landing pages", en: "Landing pages" },
    description: {
      es: "Una página enfocada en un solo objetivo: que quien llega haga clic, escriba o compre.",
      en: "A page focused on one goal: getting visitors to click, write or buy.",
    },
    includes: [
      { es: "Estructura pensada para convertir", en: "Conversion-focused structure" },
      { es: "Jerarquía y textos claros", en: "Clear hierarchy and copy" },
      { es: "Animaciones sutiles", en: "Subtle animations" },
      { es: "Entrega rápida", en: "Fast delivery" },
    ],
  },
  {
    number: "03",
    kind: "uiux",
    title: { es: "Diseño UI/UX", en: "UI/UX design" },
    description: {
      es: "Interfaces claras antes de programar: wireframes, prototipos y sistemas visuales en Figma.",
      en: "Clear interfaces before coding: wireframes, prototypes and visual systems in Figma.",
    },
    includes: [
      { es: "Wireframes y flujos de usuario", en: "Wireframes & user flows" },
      { es: "Prototipo interactivo", en: "Interactive prototype" },
      { es: "Sistema visual y componentes", en: "Visual system & components" },
      { es: "Archivos listos para desarrollo", en: "Dev-ready files" },
    ],
  },
  {
    number: "04",
    kind: "video",
    title: { es: "Edición de video", en: "Video editing" },
    description: {
      es: "Cortes, ritmo y color para contenido que se mira hasta el final.",
      en: "Cuts, pacing and color for content people watch to the end.",
    },
    includes: [
      { es: "Reels y videos cortos", en: "Reels & short videos" },
      { es: "Subtítulos y ritmo", en: "Captions & pacing" },
      { es: "Transiciones y color", en: "Transitions & color" },
      { es: "Formatos para cada red", en: "Formats for each platform" },
    ],
  },
];

const copy = {
  es: {
    eyebrow: "SERVICIOS",
    titleBold: "Ideas claras,",
    titleMuted: "bien ejecutadas.",
    sideNote: "Seguí bajando: cada servicio se apila sobre el anterior.",
    includes: "Incluye",
    talk: "Hablemos",
    bottom: "¿Tenés un proyecto en mente?",
    bottomCta: "Contame tu idea",
  },
  en: {
    eyebrow: "SERVICES",
    titleBold: "Clear ideas,",
    titleMuted: "well executed.",
    sideNote: "Keep scrolling: each service stacks on top of the previous one.",
    includes: "Includes",
    talk: "Let's talk",
    bottom: "Got a project in mind?",
    bottomCta: "Tell me your idea",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

/* Los trazos se dibujan solos cuando la tarjeta aparece */
const draw = (i: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay: 0.06 * i, ease },
});

function useStackStep() {
  const [step, setStep] = useState(22);

  useEffect(() => {
    const update = () => setStep(window.innerWidth < 640 ? 14 : 22);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return step;
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 270"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Illustration({ kind }: { kind: Kind }) {
  switch (kind) {
    case "web":
      return (
        <Svg>
          <motion.rect x="40" y="30" width="320" height="210" rx="16" {...draw(0)} />
          <motion.path d="M40 66H360" {...draw(1)} />
          <motion.circle cx="62" cy="48" r="4" {...draw(2)} />
          <motion.circle cx="80" cy="48" r="4" {...draw(2)} />
          <motion.circle cx="98" cy="48" r="4" {...draw(2)} />
          <motion.rect x="64" y="86" width="272" height="64" rx="8" {...draw(3)} />
          <motion.path d="M84 108h90M84 128h56" {...draw(4)} />
          <motion.rect x="64" y="166" width="82" height="58" rx="8" {...draw(5)} />
          <motion.rect x="159" y="166" width="82" height="58" rx="8" {...draw(6)} />
          <motion.rect x="254" y="166" width="82" height="58" rx="8" {...draw(7)} />
        </Svg>
      );

    case "landing":
      return (
        <Svg>
          <motion.rect x="120" y="16" width="160" height="238" rx="14" {...draw(0)} />
          <motion.path d="M142 46h70M142 62h46" {...draw(1)} />
          <motion.rect x="142" y="86" width="116" height="56" rx="8" {...draw(2)} />
          <motion.rect x="142" y="158" width="64" height="24" rx="12" {...draw(3)} />
          <motion.path d="M142 204h116M142 220h80" {...draw(4)} />
          <motion.path d="M328 90v80" {...draw(5)} />
          <motion.path d="M316 158l12 12 12-12" {...draw(6)} />
        </Svg>
      );

    case "uiux":
      return (
        <Svg>
          <motion.rect x="36" y="50" width="116" height="170" rx="12" {...draw(0)} />
          <motion.rect x="248" y="50" width="116" height="170" rx="12" {...draw(1)} />
          <motion.path d="M56 80h60M56 100h76" {...draw(2)} />
          <motion.rect x="56" y="124" width="76" height="40" rx="6" {...draw(3)} />
          <motion.path d="M268 80h60M268 100h76" {...draw(2)} />
          <motion.rect x="268" y="124" width="76" height="40" rx="6" {...draw(3)} />
          <motion.path d="M152 135C190 135 210 135 248 135" {...draw(4)} />
          <motion.path d="M238 126l10 9-10 9" {...draw(5)} />
          <motion.path d="M300 188v26l7-6 5 11 6-3-5-11 9-1Z" {...draw(6)} />
        </Svg>
      );

    case "video":
      return (
        <Svg>
          <motion.rect x="80" y="24" width="240" height="124" rx="12" {...draw(0)} />
          <motion.path d="M186 62v48l40-24Z" {...draw(1)} />
          <motion.rect x="40" y="170" width="120" height="22" rx="6" {...draw(2)} />
          <motion.rect x="168" y="170" width="92" height="22" rx="6" {...draw(3)} />
          <motion.rect x="268" y="170" width="92" height="22" rx="6" {...draw(4)} />
          <motion.rect x="40" y="204" width="76" height="22" rx="6" {...draw(5)} />
          <motion.rect x="124" y="204" width="136" height="22" rx="6" {...draw(6)} />
          <motion.path d="M214 156v84" {...draw(7)} />
          <motion.circle cx="214" cy="152" r="5" {...draw(8)} />
        </Svg>
      );
  }
}

function ServiceCard({
  service,
  index,
  total,
  progress,
  step,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  step: number;
}) {
  const { lang } = useLang();
  const t = copy[lang];

  // Las tarjetas que quedan debajo se achican un poco al apilarse
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-start justify-center pt-20 sm:pt-28">
      <motion.article
        style={{ scale, top: index * step, transformOrigin: "top center" }}
        className={clsx(
          "relative min-h-[430px] w-full rounded-3xl border border-black/10 p-5 text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.35)] sm:min-h-[460px] sm:p-8 md:h-[64vh] md:max-h-[560px]",
          index % 2 === 0 ? "bg-paper" : "bg-white"
        )}
      >
        <div className="grid h-full gap-6 sm:gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          {/* Texto */}
          <div className="flex flex-col justify-between gap-6 sm:gap-8">
            <div>
              <span className="font-mono text-xs font-bold text-ink/40">
                {service.number} / {String(total).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:mt-4 sm:text-5xl">
                {service.title[lang]}
              </h3>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-ink/65 sm:mt-4 sm:text-sm">
                {service.description[lang]}
              </p>
            </div>

            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
                {t.includes}
              </p>
              <ul className="mt-2.5 border-t border-ink/10 sm:mt-3">
                {service.includes.map((item) => (
                  <li
                    key={item.en}
                    className="border-b border-ink/10 py-1.5 text-xs font-semibold sm:py-2 sm:text-sm"
                  >
                    {item[lang]}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-paper transition-transform hover:scale-[1.04] sm:mt-5"
              >
                {t.talk}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Dibujo */}
          <div className="hidden items-center justify-center rounded-2xl bg-ink/[0.04] p-8 text-ink md:flex">
            <Illustration kind={service.kind} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ServicesSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const step = useStackStep();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="mx-auto w-full max-w-[84rem] px-4 pt-16 sm:px-6 sm:pt-24 md:px-10 md:pt-28">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <div>
          <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-paper/45">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            <span className="text-paper">{t.titleBold} </span>
            <span className="text-paper/45">{t.titleMuted}</span>
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-paper/55 md:text-right">
          {t.sideNote}
        </p>
      </div>

      {/* Tarjetas apiladas */}
      <div ref={containerRef} className="relative mt-4">
        {services.map((service, i) => (
          <ServiceCard
            key={service.number}
            service={service}
            index={i}
            total={services.length}
            progress={scrollYProgress}
            step={step}
          />
        ))}
      </div>

      {/* Cierre */}
      <div className="flex flex-col items-start justify-between gap-4 border-t border-paper/15 py-8 sm:flex-row sm:items-center sm:py-10">
        <p className="text-base font-extrabold tracking-tight sm:text-lg">{t.bottom}</p>
        <a
          href="#contacto"
          className="group inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
        >
          {t.bottomCta}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}