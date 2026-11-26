"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/language";

type Kind = "dev" | "uiux" | "visual" | "3d";

interface Area {
  number: string;
  kind: Kind;
  title: { es: string; en: string };
  description: { es: string; en: string };
  skills: string[];
}

// Editá acá tus áreas
const areas: Area[] = [
  {
    number: "01",
    kind: "dev",
    title: { es: "Desarrollo web", en: "Web development" },
    description: {
      es: "Construyo interfaces y aplicaciones completas, del componente al despliegue, con foco en rendimiento y código mantenible.",
      en: "I build interfaces and full applications, from component to deployment, focused on performance and maintainable code.",
    },
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"],
  },
  {
    number: "02",
    kind: "uiux",
    title: { es: "UI/UX", en: "UI/UX" },
    description: {
      es: "Diseño la estructura y el flujo antes de escribir una línea: wireframes, prototipos y sistemas de interfaz pensados para usarse.",
      en: "I design structure and flow before writing a line of code: wireframes, prototypes and interface systems made to be used.",
    },
    skills: ["Wireframes", "Prototipos", "Flujos", "Figma"],
  },
  {
    number: "03",
    kind: "visual",
    title: { es: "Diseño visual", en: "Visual design" },
    description: {
      es: "Tipografía, color y composición para darle identidad a un proyecto: piezas gráficas, grillas editoriales y edición de video.",
      en: "Typography, color and composition to give a project its identity: graphic pieces, editorial grids and video editing.",
    },
    skills: ["Identidad", "Tipografía", "Composición", "CapCut"],
  },
  {
    number: "04",
    kind: "3d",
    title: { es: "3D y tiempo real", en: "3D & real-time" },
    description: {
      es: "Modelado y entornos interactivos, de la malla al motor en tiempo real.",
      en: "Modeling and interactive environments, from mesh to real-time engine.",
    },
    skills: ["Blender", "Unity", "Modelado", "Entornos interactivos"],
  },
];

const copy = {
  es: {
    eyebrow: "ÁREAS",
    titleBold: "Cuatro áreas.",
    titleMuted: "Una misma forma de pensar.",
    sideNote: "Pasá el cursor o tocá cada área para ver qué hago en ella.",
    cta: "Ver proyectos",
  },
  en: {
    eyebrow: "AREAS",
    titleBold: "Four areas.",
    titleMuted: "One way of thinking.",
    sideNote: "Hover or tap each area to see what I do in it.",
    cta: "View projects",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

/* Cada trazo se dibuja solo, uno detrás de otro */
const draw = (i: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.8, delay: 0.06 * i, ease },
});

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
    case "dev":
      return (
        <Svg>
          <motion.rect x="40" y="30" width="320" height="220" rx="16" {...draw(0)} />
          <motion.path d="M40 70H360" {...draw(1)} />
          <motion.circle cx="62" cy="50" r="4" {...draw(2)} />
          <motion.circle cx="80" cy="50" r="4" {...draw(2)} />
          <motion.circle cx="98" cy="50" r="4" {...draw(2)} />
          <motion.path d="M70 110h60" {...draw(3)} />
          <motion.path d="M90 140h110" {...draw(4)} />
          <motion.path d="M90 170h70" {...draw(5)} />
          <motion.path d="M70 200h40" {...draw(6)} />
          <motion.path d="M245 115 215 150 245 185" {...draw(7)} />
          <motion.path d="M285 108 265 192" {...draw(8)} />
          <motion.path d="M305 115 335 150 305 185" {...draw(9)} />
        </Svg>
      );

    case "uiux":
      return (
        <Svg>
          <motion.rect x="60" y="30" width="280" height="232" rx="14" {...draw(0)} />
          <motion.path d="M60 70H340" {...draw(1)} />
          <motion.rect x="84" y="92" width="232" height="80" rx="8" {...draw(2)} />
          <motion.path d="M84 92 316 172" strokeOpacity={0.4} {...draw(3)} />
          <motion.path d="M316 92 84 172" strokeOpacity={0.4} {...draw(3)} />
          <motion.path d="M84 196h140" {...draw(4)} />
          <motion.path d="M84 220h90" {...draw(5)} />
          <motion.rect x="250" y="200" width="66" height="26" rx="13" {...draw(6)} />
          <motion.path d="M296 208v32l9-8 7 14 7-3-7-14 12-1Z" {...draw(7)} />
        </Svg>
      );

    case "visual":
      return (
        <Svg>
          <motion.path d="M30 140H370" strokeOpacity={0.35} {...draw(0)} />
          <motion.path d="M200 30V250" strokeOpacity={0.35} {...draw(0)} />
          <motion.circle cx="160" cy="140" r="80" {...draw(1)} />
          <motion.circle cx="240" cy="140" r="80" {...draw(2)} />
          <motion.path d="M200 100 228 150H172Z" {...draw(3)} />
          <motion.circle cx="200" cy="140" r="4" {...draw(4)} />
        </Svg>
      );

    case "3d":
      return (
        <Svg>
          <motion.path d="M200 40 278 85V175L200 220 122 175V85Z" {...draw(0)} />
          <motion.path d="M122 85 200 130 278 85" {...draw(1)} />
          <motion.path d="M200 130V220" {...draw(2)} />
          <motion.ellipse
            cx="200"
            cy="130"
            rx="150"
            ry="44"
            strokeOpacity={0.4}
            {...draw(3)}
          />
          <motion.circle cx="350" cy="130" r="5" fill="currentColor" {...draw(4)} />
        </Svg>
      );
  }
}

export default function AreasSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const [active, setActive] = useState(0);
  const current = areas[active];

  return (
    <div className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-28">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <div>
          <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/50">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            <span>{t.titleBold} </span>
            <span className="text-ink/45">{t.titleMuted}</span>
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-ink/60 md:text-right">
          {t.sideNote}
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Lista */}
        <div className="border-t border-ink/15">
          {areas.map((area, i) => {
            const isActive = active === i;
            return (
              <button
                key={area.number}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative flex w-full items-center gap-3.5 border-b border-ink/15 py-5 text-left outline-none sm:gap-8 sm:py-8"
              >
                <span className="w-5 shrink-0 font-mono text-xs font-bold text-ink/40 sm:w-6">
                  {area.number}
                </span>
                <span
                  className={clsx(
                    "text-2xl font-extrabold tracking-tight transition-all duration-500 sm:text-5xl",
                    isActive
                      ? "translate-x-1.5 text-ink sm:translate-x-2"
                      : "text-ink/25 group-hover:text-ink/50"
                  )}
                >
                  {area.title[lang]}
                </span>
                <ArrowUpRight
                  className={clsx(
                    "ml-auto size-5 shrink-0 transition-all duration-500 sm:size-6",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  )}
                />
                {isActive && (
                  <motion.span
                    layoutId="areas-line"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-ink"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="relative flex h-[420px] flex-col overflow-hidden rounded-3xl bg-ink p-5 text-paper sm:h-[500px] sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.number}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-xs font-bold text-paper/45">
                <span className="shrink-0">
                  {current.number} / {String(areas.length).padStart(2, "0")}
                </span>
                <span className="truncate font-sans uppercase tracking-[0.2em]">
                  {current.title[lang]}
                </span>
              </div>

              <div className="min-h-0 flex-1 py-4 text-paper sm:py-6">
                <Illustration kind={current.kind} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease }}
              >
                <p className="max-w-md text-xs leading-relaxed text-paper/75 sm:text-sm">
                  {current.description[lang]}
                </p>
                <p className="mt-3 text-[0.7rem] font-semibold text-paper/45 sm:mt-4 sm:text-xs">
                  {current.skills.join("  ·  ")}
                </p>
                <a
                  href="#proyectos"
                  className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold underline-offset-4 hover:underline sm:mt-5"
                >
                  {t.cta}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}