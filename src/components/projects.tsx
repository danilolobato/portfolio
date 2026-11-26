"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { useLang } from "@/context/language";

type Category = "all" | "dev" | "uiux" | "visual";
type Kind = "dashboard" | "booking" | "portal" | "identity";

interface ProjectItem {
  id: string;
  category: Exclude<Category, "all">;
  kind: Kind;
  image?: string;
  categoryLabel: { es: string; en: string };
  title: string;
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
  surfaceClass: string;
  badge: string;
  liveUrl?: string;
}

const SLIDE_MS = 3200;

const filters: { id: Category; es: string; en: string }[] = [
  { id: "all", es: "Todos", en: "All" },
  { id: "dev", es: "Desarrollo", en: "Development" },
  { id: "uiux", es: "UI/UX", en: "UI/UX" },
  { id: "visual", es: "Diseño visual", en: "Visual design" },
];

const projects: ProjectItem[] = [
  {
    id: "flowhook",
    category: "dev",
    kind: "dashboard",
    categoryLabel: {
      es: "DASHBOARD Y WEBHOOKS EN TIEMPO REAL",
      en: "REAL-TIME WEBHOOKS & DASHBOARD",
    },
    title: "Flowhook",
    subtitle: {
      es: "Monitor de eventos con Next.js y Supabase",
      en: "Event monitor built with Next.js & Supabase",
    },
    description: {
      es: "Panel para inspeccionar, depurar y gestionar webhooks en tiempo real con autenticación, filtros rápidos y arquitectura enfocada en claridad operativa.",
      en: "Dashboard to inspect, debug and manage real-time webhooks with auth, fast filtering and an operations-first UI.",
    },
    tags: ["Next.js", "TypeScript", "Supabase"],
    surfaceClass: "bg-zinc-950 text-white",
    badge: "Live events",
  },
  {
    id: "barber-studio",
    category: "uiux",
    kind: "booking",
    categoryLabel: {
      es: "GESTIÓN DE TURNOS Y CLIENTES",
      en: "BOOKING & CLIENT MANAGEMENT",
    },
    title: "Barbería & Turnos",
    subtitle: {
      es: "Sistema web ágil para agenda y servicios",
      en: "Streamlined web app for schedule & services",
    },
    description: {
      es: "Aplicación pensada para organizar agenda, servicios y clientes sin fricción, combinando rapidez en el flujo diario con una interfaz limpia.",
      en: "Web app designed to organize schedules, services and clients smoothly, pairing fast daily flows with a clean interface.",
    },
    tags: ["UI/UX", "React", "Tailwind"],
    surfaceClass: "bg-neutral-900 text-white",
    badge: "Agenda",
  },
  {
    id: "municipal-portal",
    category: "dev",
    kind: "portal",
    categoryLabel: {
      es: "PORTAL WEB INSTITUCIONAL",
      en: "INSTITUTIONAL WEB PORTAL",
    },
    title: "Portal Digital",
    subtitle: {
      es: "Interfaces y módulos informativos accesibles",
      en: "Accessible interfaces & information modules",
    },
    description: {
      es: "Desarrollo de componentes e interfaces orientadas a consulta rápida, jerarquía clara y buena lectura en escritorio y móvil.",
      en: "Development of components and interfaces focused on quick lookup, clear hierarchy and readable layouts across devices.",
    },
    tags: ["Web", "UI Systems", "Accesibilidad"],
    surfaceClass: "bg-stone-800 text-white",
    badge: "Servicios",
  },
  {
    id: "visual-identity",
    category: "visual",
    kind: "identity",
    categoryLabel: {
      es: "SISTEMA VISUAL Y DIRECCIÓN DE ARTE",
      en: "VISUAL SYSTEM & ART DIRECTION",
    },
    title: "Identidad & Piezas",
    subtitle: {
      es: "Composiciones tipográficas y grilla editorial",
      en: "Typographic compositions & editorial grid",
    },
    description: {
      es: "Exploraciones visuales centradas en contraste, ritmo tipográfico y piezas gráficas coherentes para marcas y proyectos digitales.",
      en: "Visual explorations centered on contrast, typographic rhythm and cohesive graphic pieces for brands and digital projects.",
    },
    tags: ["Diseño visual", "Tipografía", "Grilla"],
    surfaceClass: "bg-zinc-800 text-white",
    badge: "Editorial",
  },
];

const copy = {
  es: {
    eyebrow: "TRABAJOS / PROYECTOS",
    titleLine1: "Distintos medios.",
    titleLine2: "La misma curiosidad.",
    sideNote1: "Explorá cada proyecto para conocer su objetivo y alcance.",
    sideNote2: "Deslizá, usá las flechas o tocá la tarjeta central para abrirla.",
    details: "Ver detalles",
    visit: "Ver sitio",
    projectSingular: "proyecto",
    projectPlural: "proyectos",
    close: "Cerrar",
    summary: "Resumen",
    prev: "Proyecto anterior",
    next: "Siguiente proyecto",
    playPause: "Reproducir o pausar",
  },
  en: {
    eyebrow: "WORK / PROJECTS",
    titleLine1: "Different mediums.",
    titleLine2: "Same curiosity.",
    sideNote1: "Explore each project to see its goal and scope.",
    sideNote2: "Swipe, use the arrow keys or tap the center card to open it.",
    details: "View details",
    visit: "Visit site",
    projectSingular: "project",
    projectPlural: "projects",
    close: "Close",
    summary: "Overview",
    prev: "Previous project",
    next: "Next project",
    playPause: "Play or pause",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");
const fmtTime = (n: number) => `0:${pad(n)}`;

function useViewport() {
  const [state, setState] = useState({ isMobile: false, spread: 200 });

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setState({
        isMobile: mobile,
        spread: mobile ? 88 : 200,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}

function Mockup({ project }: { project: ProjectItem }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 280px, 430px"
        className="object-cover object-top"
      />
    );
  }

  return (
    <div className={clsx("flex h-full w-full flex-col", project.surfaceClass)}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="ml-3 h-3 w-1/2 rounded-full bg-white/10" />
      </div>

      <div className="relative flex-1 p-3">
        {project.kind === "dashboard" && (
          <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr] gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-white/10 p-2">
                <div className="h-1.5 w-6 rounded bg-white/30" />
                <div className="mt-2 h-3 w-10 rounded bg-emerald-400/70" />
              </div>
            ))}
            <div className="col-span-3 flex items-end gap-1.5 rounded-lg bg-white/5 p-2">
              {[40, 70, 55, 90, 65, 80, 50, 95, 60, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-white/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {project.kind === "booking" && (
          <div className="flex h-full gap-3">
            <div className="grid flex-1 grid-cols-7 content-start gap-1">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "aspect-square rounded-[4px]",
                    [4, 9, 10, 16].includes(i) ? "bg-white/70" : "bg-white/10"
                  )}
                />
              ))}
            </div>
            <div className="hidden w-1/3 flex-col gap-1.5 sm:flex">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-5 rounded-md bg-white/10" />
              ))}
            </div>
          </div>
        )}

        {project.kind === "portal" && (
          <div className="flex h-full flex-col gap-2">
            <div className="h-[45%] rounded-lg bg-white/15 p-3">
              <div className="h-2.5 w-2/3 rounded bg-white/60" />
              <div className="mt-2 h-1.5 w-1/2 rounded bg-white/30" />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg bg-white/10" />
              ))}
            </div>
          </div>
        )}

        {project.kind === "identity" && (
          <div className="flex h-full items-center gap-4">
            <div className="grid aspect-square h-full place-items-center rounded-lg bg-white text-ink">
              <span className="text-3xl font-extrabold tracking-tighter">Aa</span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex gap-1.5">
                {["bg-white", "bg-white/60", "bg-white/30", "bg-white/10"].map((c) => (
                  <span key={c} className={clsx("size-5 rounded-full", c)} />
                ))}
              </div>
              <div className="h-2 w-3/4 rounded bg-white/50" />
              <div className="h-1.5 w-1/2 rounded bg-white/25" />
            </div>
          </div>
        )}

        <span className="absolute bottom-2 right-3 text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-white/40">
          {project.badge}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const { isMobile, spread } = useViewport();

  const [selectedFilter, setSelectedFilter] = useState<Category>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panned = useRef(false);

  useEffect(() => setMounted(true), []);

  const filtered = useMemo(() => {
    if (selectedFilter === "all") return projects;
    return projects.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  const total = filtered.length;
  const safeIndex = activeIndex < total ? activeIndex : 0;
  const current = filtered[safeIndex] ?? projects[0];
  const hasMultiple = total > 1;

  useEffect(() => {
    if (!isPlaying || !hasMultiple || modalOpen) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((safeIndex + 1) % total);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, hasMultiple, modalOpen, safeIndex, total]);

  useEffect(() => {
    if (!modalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((safeIndex + 1) % total);
      if (e.key === "ArrowLeft") setActiveIndex((safeIndex - 1 + total) % total);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, safeIndex, total]);

  const handleFilterChange = (cat: Category) => {
    setSelectedFilter(cat);
    setActiveIndex(0);
    setIsPlaying(false);
  };

  const goPrev = () => {
    if (!hasMultiple) return;
    setIsPlaying(false);
    setActiveIndex((safeIndex - 1 + total) % total);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setIsPlaying(false);
    setActiveIndex((safeIndex + 1) % total);
  };

  const currentFilterName = filters.find((f) => f.id === selectedFilter)?.[lang] ?? "";

  const span = Math.max(total - 1, 1);
  const base = hasMultiple ? (safeIndex / span) * 100 : 100;
  const target = hasMultiple ? (Math.min(safeIndex + 1, span) / span) * 100 : 100;

  return (
    <>
      <div className="mx-auto w-full max-w-[84rem] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        {/* Encabezado */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/50">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-5xl md:text-6xl">
              {t.titleLine1}
              <br />
              <span className="text-ink/45">{t.titleLine2}</span>
            </h2>
          </div>

          <div className="max-w-xs text-xs leading-relaxed text-ink/60 md:text-right">
            <p>{t.sideNote1}</p>
            <p>{t.sideNote2}</p>
          </div>
        </div>

        {/* Filtros + contador */}
        <div className="mt-8 flex flex-col gap-3 border-b border-ink/10 pb-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-1 sm:gap-6 sm:overflow-visible sm:pb-0">
            {filters.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFilterChange(f.id)}
                  className={clsx(
                    "relative shrink-0 pb-1 text-xs font-bold tracking-tight transition-colors",
                    isActive ? "text-ink" : "text-ink/55 hover:text-ink"
                  )}
                >
                  {f[lang]}
                  {isActive && (
                    <motion.span
                      layoutId="projects-filter-underline"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-ink"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-medium text-ink/55">
            {total} {total === 1 ? t.projectSingular : t.projectPlural} · {currentFilterName}
          </span>
        </div>

        {/* Carrusel 3D (deslizable y con teclado) */}
        <motion.div
          role="group"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
          }}
          onPanEnd={(_, info) => {
            if (Math.abs(info.offset.x) < 40) return;
            panned.current = true;
            window.setTimeout(() => {
              panned.current = false;
            }, 60);
            if (info.offset.x < 0) goNext();
            else goPrev();
          }}
          style={{ perspective: 1400, touchAction: "pan-y" }}
          className="relative mt-9 flex h-[300px] cursor-grab items-center justify-center overflow-hidden outline-none active:cursor-grabbing sm:mt-12 sm:h-[370px]"
        >
          {filtered.map((item, idx) => {
            const offset = idx - safeIndex;
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            return (
              <motion.button
                key={item.id}
                type="button"
                aria-label={item.title}
                onClick={() => {
                  if (panned.current) return;
                  if (isCenter) {
                    setModalOpen(true);
                    return;
                  }
                  setIsPlaying(false);
                  setActiveIndex(idx);
                }}
                initial={false}
                animate={{
                  x: offset * spread,
                  rotateY: -offset * (isMobile ? 14 : 22),
                  scale: isCenter ? 1 : absOffset === 1 ? (isMobile ? 0.82 : 0.86) : 0.72,
                  opacity: isCenter ? 1 : absOffset === 1 ? (isMobile ? 0.65 : 0.75) : 0.28,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: 30 - absOffset * 10, transformPerspective: 1400 }}
                className={clsx(
                  "absolute flex h-[250px] w-[min(272px,76vw)] flex-col overflow-hidden rounded-2xl border text-left sm:h-[310px] sm:w-[430px]",
                  isCenter
                    ? "border-black/15 bg-white p-2.5 shadow-[0_26px_65px_rgba(0,0,0,0.2)] sm:p-3"
                    : "border-black/10 bg-white/95 p-1.5 shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
                )}
              >
                <div className="relative w-full flex-1 overflow-hidden rounded-xl">
                  <Mockup project={item} />
                </div>

                {isCenter && (
                  <div className="px-1 pt-2.5 pb-0.5 sm:pt-3 sm:pb-1">
                    <p className="truncate text-sm font-extrabold tracking-tight text-ink sm:text-base">
                      {item.title}
                    </p>
                    <p className="truncate text-[0.68rem] text-ink/60 sm:text-[0.7rem]">
                      {item.subtitle[lang]}
                    </p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Controles tipo reproductor */}
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="flex items-center gap-3 text-[0.7rem] font-medium tabular-nums text-ink/55 sm:gap-4">
            <span>{fmtTime(safeIndex + 1)}</span>

            <div className="relative flex flex-1 items-center">
              <div className="h-[2px] w-full rounded-full bg-ink/15" />

              <motion.div
                key={isPlaying ? `play-${safeIndex}` : "idle"}
                className="absolute left-0 h-[2px] rounded-full bg-ink"
                initial={isPlaying ? { width: `${base}%` } : false}
                animate={{ width: `${isPlaying ? target : base}%` }}
                transition={
                  isPlaying
                    ? { duration: SLIDE_MS / 1000, ease: "linear" }
                    : { duration: 0.3 }
                }
              />

              {hasMultiple &&
                filtered.map((p, i) => {
                  const isCurrent = i === safeIndex;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={p.title}
                      onClick={() => {
                        setIsPlaying(false);
                        setActiveIndex(i);
                      }}
                      style={{ left: `${(i / span) * 100}%` }}
                      className={clsx(
                        "absolute -translate-x-1/2 rounded-full transition-all",
                        isCurrent
                          ? "size-3 bg-ink ring-4 ring-ink/15"
                          : "size-2 bg-ink/35 hover:bg-ink/70"
                      )}
                    />
                  );
                })}
            </div>

            <span>{fmtTime(total)}</span>
          </div>

          <div className="mt-5 flex items-center justify-between gap-2 sm:gap-4">
            <span className="w-14 text-xs font-bold tabular-nums text-ink/55 sm:w-24">
              {pad(safeIndex + 1)} / {pad(total)}
            </span>

            <div className="flex items-center gap-2 sm:gap-4">
              {hasMultiple && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={t.prev}
                  className="grid size-9 place-items-center rounded-full text-ink/80 transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => hasMultiple && setIsPlaying((p) => !p)}
                disabled={!hasMultiple}
                aria-label={t.playPause}
                className={clsx(
                  "grid size-10 place-items-center rounded-full bg-ink text-paper shadow-sm transition-transform",
                  hasMultiple ? "hover:scale-105" : "cursor-default opacity-40"
                )}
              >
                {isPlaying ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4 translate-x-[0.5px]" />
                )}
              </button>

              {hasMultiple && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={t.next}
                  className="grid size-9 place-items-center rounded-full text-ink/80 transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  <ChevronRight className="size-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="shrink-0 rounded-full bg-ink px-3.5 py-2 text-xs font-bold text-paper transition-transform hover:scale-[1.03] sm:px-5 sm:py-2.5"
            >
              {t.details}
            </button>
          </div>
        </div>

        {/* Detalle del proyecto activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-8 max-w-4xl border-t border-ink/10 pt-6 sm:mt-10"
          >
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/50">
              {current.categoryLabel[lang]}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/80">
              {current.description[lang]}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-[0.7rem] font-semibold text-ink/60 sm:gap-4">
              {current.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal de detalle */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {modalOpen && (
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={() => setModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-black/10 bg-[#f8f8f6] p-5 text-ink shadow-2xl sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/50">
                        {current.categoryLabel[lang]}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
                        {current.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      aria-label={t.close}
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink hover:bg-ink/5"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="relative mt-5 h-44 overflow-hidden rounded-2xl sm:h-52">
                    <Mockup project={current} />
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
                      {t.summary}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/85">
                      {current.description[lang]}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {current.liveUrl ? (
                      <a
                        href={current.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper"
                      >
                        {t.visit}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper"
                      >
                        {t.close}
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}