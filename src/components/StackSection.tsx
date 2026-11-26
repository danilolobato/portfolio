"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { DiVisualstudio } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import {
  SiBlender,
  SiFigma,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from "react-icons/si";
import { useLang } from "@/context/language";

// CapCut no está en react-icons, así que lo dibujamos como SVG
const CapCutIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    style={props.style}
    aria-hidden="true"
  >
    <path d="M3 6.5 11 12l-8 5.5v-3.2L6.8 12 3 9.7V6.5Z" />
    <path d="M21 6.5 13 12l8 5.5v-3.2L17.2 12 21 9.7V6.5Z" />
  </svg>
);

interface Tool {
  name: string;
  role: { es: string; en: string };
  Icon: IconType;
  color: string;
}

interface Category {
  number: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  tools: Tool[];
}

const categories: Category[] = [
  {
    number: "01",
    title: { es: "Desarrollo web", en: "Web development" },
    subtitle: {
      es: "Interfaces, componentes y experiencias en el navegador.",
      en: "Interfaces, components and browser experiences.",
    },
    tools: [
      { name: "JavaScript", role: { es: "Lógica e interactividad", en: "Logic & interactivity" }, Icon: SiJavascript, color: "#d4b106" },
      { name: "TypeScript", role: { es: "Código tipado y seguro", en: "Typed, safer code" }, Icon: SiTypescript, color: "#3178c6" },
      { name: "React", role: { es: "Interfaces por componentes", en: "Component-based UI" }, Icon: SiReact, color: "#0ea5e9" },
      { name: "Next.js", role: { es: "Apps full-stack con React", en: "Full-stack React apps" }, Icon: SiNextdotjs, color: "#111111" },
      { name: "HTML", role: { es: "Estructura semántica", en: "Semantic structure" }, Icon: FaHtml5, color: "#e34f26" },
      { name: "CSS", role: { es: "Estilos y layouts", en: "Styling & layouts" }, Icon: FaCss3Alt, color: "#1572b6" },
      { name: "Tailwind CSS", role: { es: "Diseño con utilidades", en: "Utility-first styling" }, Icon: SiTailwindcss, color: "#06b6d4" },
      { name: "Node.js", role: { es: "Backend y APIs", en: "Backend & APIs" }, Icon: SiNodedotjs, color: "#3c873a" },
    ],
  },
  {
    number: "02",
    title: { es: "Diseño y edición", en: "Design & editing" },
    subtitle: {
      es: "De la estructura de una idea a su expresión visual.",
      en: "From the structure of an idea to its visual expression.",
    },
    tools: [
      { name: "Figma", role: { es: "UI/UX y prototipos", en: "UI/UX & prototypes" }, Icon: SiFigma, color: "#f24e1e" },
      { name: "CapCut", role: { es: "Edición de video", en: "Video editing" }, Icon: CapCutIcon, color: "#111111" },
    ],
  },
  {
    number: "03",
    title: { es: "3D y tiempo real", en: "3D & real-time" },
    subtitle: {
      es: "Herramientas de mi formación en entornos interactivos.",
      en: "Tools from my training in interactive environments.",
    },
    tools: [
      { name: "Blender", role: { es: "Modelado y render 3D", en: "3D modeling & rendering" }, Icon: SiBlender, color: "#ea7600" },
      { name: "Unity", role: { es: "Motor de tiempo real", en: "Real-time engine" }, Icon: SiUnity, color: "#111111" },
    ],
  },
  {
    number: "04",
    title: { es: "Entorno de trabajo", en: "Workspace" },
    subtitle: {
      es: "Herramientas para escribir, organizar y desarrollar código.",
      en: "Tools to write, organize and build code.",
    },
    tools: [
      { name: "VS Code", role: { es: "Editor principal", en: "Main editor" }, Icon: VscVscode, color: "#007acc" },
      { name: "Visual Studio", role: { es: "IDE para proyectos grandes", en: "IDE for larger projects" }, Icon: DiVisualstudio, color: "#68217a" },
    ],
  },
];

const copy = {
  es: {
    eyebrow: "STACK Y HERRAMIENTAS",
    titleBold: "El kit detrás",
    titleMuted: "de cada proyecto.",
    sideNote:
      "Tecnologías y programas que uso. Pasá el cursor sobre cada ícono para ver para qué lo uso.",
  },
  en: {
    eyebrow: "STACK & TOOLS",
    titleBold: "The kit behind",
    titleMuted: "every project.",
    sideNote:
      "Technologies and software I use. Hover over each icon to see what I use it for.",
  },
};

export default function StackSection() {
  const { lang } = useLang();
  const t = copy[lang];

  const [activeRow, setActiveRow] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-28">
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

      {/* Filas interactivas */}
      <div className="mt-10 border-t border-paper/15 sm:mt-14">
        {categories.map((cat, idx) => {
          const isActive = activeRow === idx;

          return (
            <div
              key={cat.number}
              onMouseEnter={() => setActiveRow(idx)}
              onClick={() => setActiveRow(idx)}
              className="relative border-b border-paper/15"
            >
              {isActive && (
                <motion.div
                  layoutId="stack-active-row"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-x-0 inset-y-1.5 rounded-2xl bg-[#f4f4f2] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                />
              )}

              <div
                className={clsx(
                  "relative z-10 flex flex-col justify-between gap-4 px-3.5 py-6 transition-colors duration-300 sm:gap-6 sm:px-5 sm:py-7 md:flex-row md:items-center md:px-8 md:py-8",
                  isActive ? "text-ink" : "text-paper"
                )}
              >
                <div className="flex items-start gap-3.5 sm:gap-6 md:items-center md:gap-10">
                  <span
                    className={clsx(
                      "pt-0.5 font-mono text-xs font-bold tracking-wider md:pt-0",
                      isActive ? "text-ink/55" : "text-paper/40"
                    )}
                  >
                    {cat.number}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight sm:text-xl">
                      {cat.title[lang]}
                    </h3>
                    <p
                      className={clsx(
                        "mt-1 text-xs leading-relaxed sm:text-[0.8rem]",
                        isActive ? "text-ink/65" : "text-paper/50"
                      )}
                    >
                      {cat.subtitle[lang]}
                    </p>
                  </div>
                </div>

                {/* Íconos */}
                <div className="flex flex-wrap items-center gap-2.5 pl-7 sm:gap-3 sm:pl-10 md:max-w-[26rem] md:justify-end md:pl-0">
                  {cat.tools.map((tool) => {
                    const key = `${cat.number}-${tool.name}`;
                    const hovered = hoveredTool === key;

                    return (
                      <div
                        key={tool.name}
                        onMouseEnter={() => setHoveredTool(key)}
                        onMouseLeave={() => setHoveredTool(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRow(idx);
                          setHoveredTool((curr) => (curr === key ? null : key));
                        }}
                        className="relative"
                      >
                        <AnimatePresence>
                          {hovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.96 }}
                              transition={{ duration: 0.16 }}
                              className="pointer-events-none absolute -top-12 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-center text-[0.65rem] text-paper shadow-lg ring-1 ring-white/15"
                            >
                              <p className="font-extrabold leading-none">{tool.name}</p>
                              <p className="mt-0.5 text-[0.58rem] text-paper/70">
                                {tool.role[lang]}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.div
                          whileHover={{ y: -3, scale: 1.08 }}
                          transition={{ duration: 0.2 }}
                          className={clsx(
                            "grid size-11 cursor-default place-items-center rounded-xl border bg-white sm:size-14",
                            isActive
                              ? "border-black/10 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                              : "border-white/15 shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
                          )}
                        >
                          <tool.Icon className="size-5 sm:size-7" style={{ color: tool.color }} />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}