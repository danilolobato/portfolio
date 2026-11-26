"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/language";

const copy = {
  es: {
    left: "Desarrollo web / Diseño digital",
    right: "DL — Portfolio 2026",
    role: "Desarrollador web & diseñador digital",
    intro:
      "Desarrollo con ojo de diseñador. Convierto lógica, interfaces y estética en experiencias digitales.",
    tagline: ["Código limpio.", "Diseño con intención."],
    projects: "Ver proyectos",
    talk: "Hablemos",
  },
  en: {
    left: "Web development / Digital design",
    right: "DL — Portfolio 2026",
    role: "Web developer & digital designer",
    intro:
      "A developer with a designer's eye. I turn logic, interfaces and aesthetics into digital experiences.",
    tagline: ["Clean code.", "Design with intent."],
    projects: "View projects",
    talk: "Let's talk",
  },
};

const grid = {
  backgroundImage:
    "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
};

const spotlight =
  "radial-gradient(240px circle at var(--mx, 50%) var(--my, 40%), black, transparent)";

const photoMask =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, black 68%, transparent 100%)";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { lang } = useLang();
  const t = copy[lang];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20 });
  const sy = useSpring(my, { stiffness: 70, damping: 20 });

  const leftX = useTransform(sx, (v) => v * -40);
  const rightX = useTransform(sx, (v) => v * 40);
  const photoX = useTransform(sx, (v) => v * 18);
  const photoY = useTransform(sy, (v) => v * 10);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x / r.width - 0.5);
    my.set(y / r.height - 0.5);
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
  };

  return (
    <section
      id="inicio"
      data-theme="dark"
      onPointerMove={onMove}
      className="relative h-svh min-h-[680px] overflow-hidden bg-ink text-paper md:min-h-[640px]"
    >
      {/* Grilla base + grilla iluminada por el cursor */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={grid} />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ ...grid, maskImage: spotlight, WebkitMaskImage: spotlight }}
      />

      {/* Etiquetas superiores (en celular solo se muestra la de la izquierda) */}
      <div className="absolute inset-x-0 top-24 z-20 mx-auto flex max-w-[84rem] justify-between px-6 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper/60 md:top-28 md:px-8 md:text-[0.65rem]">
        <span>{t.left}</span>
        <span className="hidden sm:block">{t.right}</span>
      </div>

      {/* Nombre gigante (detrás de la foto): 2 líneas en celular, 1 en escritorio */}
      <div className="pointer-events-none absolute inset-x-0 top-[17vh] z-0 flex select-none flex-col items-center whitespace-nowrap text-[clamp(3rem,21vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] md:top-[30vh] md:flex-row md:justify-center md:gap-[0.3em] md:text-[clamp(3rem,10.5vw,12rem)]">
        <motion.div style={{ x: leftX }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease }}
          >
            Danilo
          </motion.div>
        </motion.div>
        <motion.div style={{ x: rightX }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.12 }}
            style={{ WebkitTextStroke: "2px var(--paper)", color: "transparent" }}
          >
            Lobato
          </motion.div>
        </motion.div>
      </div>

      {/* Resplandor detrás de la silueta */}
      <div className="pointer-events-none absolute left-1/2 top-[18vh] z-10 h-[55vh] w-[70vw] -translate-x-1/2 rounded-full bg-paper/15 blur-[110px] md:w-[38vw]" />

      {/* Foto centrada sobre la línea del nombre */}
      <div className="pointer-events-none absolute left-1/2 top-[20vh] z-10 aspect-[811/1080] h-[60vh] -translate-x-1/2 md:top-[16vh] md:h-[68vh]">
        <motion.div
          style={{ x: photoX, y: photoY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="relative h-full w-full"
        >
          <Image
            src="/danilo.png"
            alt="Danilo Lobato"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-contain object-center"
            style={{
              maskImage: photoMask,
              WebkitMaskImage: photoMask,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>
      </div>

      {/* Degradado para que el texto se lea sobre la foto (solo celular) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42%] bg-gradient-to-t from-ink via-ink/85 to-transparent md:hidden" />

      {/* Textos inferiores */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.7 }}
        className="absolute inset-x-0 bottom-16 z-20 mx-auto flex max-w-[84rem] items-end justify-between px-6 md:bottom-20 md:px-8"
      >
        <div className="max-w-[22rem]">
          <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper/50 md:mb-4 md:text-[0.65rem]">
            {t.role}
          </p>
          <p className="text-sm font-medium leading-relaxed text-paper/90 md:text-base">
            {t.intro}
          </p>
          <div className="mt-6 flex gap-3 md:mt-8">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.04] md:px-6"
            >
              {t.projects}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-paper/30 px-5 py-3 text-sm font-bold backdrop-blur transition-colors hover:bg-paper/10 md:px-6"
            >
              {t.talk}
            </a>
          </div>
        </div>

        <p className="hidden text-right text-xl font-bold leading-tight md:block">
          {t.tagline[0]}
          <br />
          <span className="text-paper/50">{t.tagline[1]}</span>
        </p>
      </motion.div>
    </section>
  );
}