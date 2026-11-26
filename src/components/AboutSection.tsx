"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLang } from "@/context/language";

const copy = {
  es: {
    eyebrow: "SOBRE MÍ",
    titleBold: "Dos pasiones,",
    titleMuted: "la misma disciplina.",
    name: "Danilo Lobato",
    story:
      "Soy Danilo, desarrollador y apasionado por la programación. Me formé durante cuatro años en una secundaria técnica con orientación en programación, y además completé un curso de WordPress en Domestika. Desde entonces sigo aprendiendo algo nuevo todos los días. Fuera de la pantalla juego pelota paleta a nivel metropolitano en segunda categoría. Son dos mundos distintos que comparten lo mismo: compromiso y responsabilidad.",
    facts: [
      {
        label: "Formación",
        title: "Tecnicatura en programación",
        text: "Cuatro años de secundaria técnica y un curso completo de WordPress en Domestika.",
      },
      {
        label: "Deporte",
        title: "Pelota paleta",
        text: "Nivel metropolitano, segunda categoría.",
      },
      {
        label: "Hoy",
        title: "Aprendiendo siempre",
        text: "Cada día algo nuevo: tecnologías, herramientas y formas de resolver.",
      },
    ],
    valuesLabel: "Lo que me define",
    values: ["Compromiso", "Responsabilidad", "Constancia", "Curiosidad"],
  },
  en: {
    eyebrow: "ABOUT",
    titleBold: "Two passions,",
    titleMuted: "the same discipline.",
    name: "Danilo Lobato",
    story:
      "I'm Danilo, a developer passionate about programming. I trained for four years at a technical high school focused on programming, and I also completed a full WordPress course on Domestika. I've kept learning something new every day since. Away from the screen I play pelota paleta at metropolitan level, second category. Two different worlds that share the same thing: commitment and responsibility.",
    facts: [
      {
        label: "Education",
        title: "Programming technical degree",
        text: "Four years of technical high school and a full WordPress course on Domestika.",
      },
      {
        label: "Sport",
        title: "Pelota paleta",
        text: "Metropolitan level, second category.",
      },
      {
        label: "Today",
        title: "Always learning",
        text: "Something new every day: technologies, tools and ways to solve problems.",
      },
    ],
    valuesLabel: "What defines me",
    values: ["Commitment", "Responsibility", "Consistency", "Curiosity"],
  },
};

/* Una palabra que se "enciende" según el scroll */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function AboutSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const storyRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = t.story.split(" ");

  return (
    <div className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-28">
      {/* Encabezado */}
      <div>
        <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/50">
          {t.eyebrow}
        </p>
        <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          <span>{t.titleBold} </span>
          <span className="text-ink/45">{t.titleMuted}</span>
        </h2>
      </div>

      {/* Foto + texto */}
      <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-[17rem] self-start overflow-hidden rounded-3xl bg-[#e4e3e0] sm:max-w-[22rem] lg:mx-0 lg:sticky lg:top-28">
          <Image
            src="/danilo.png"
            alt={t.name}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 22rem, 22rem"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-paper sm:bottom-4 sm:left-4 sm:px-4 sm:py-2">
            {t.name}
          </span>
        </div>

        <p
          ref={storyRef}
          className="text-xl font-bold leading-[1.35] tracking-[-0.02em] sm:text-3xl sm:leading-[1.25] md:text-4xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${lang}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>

      {/* Datos */}
      <div className="mt-12 grid gap-3 sm:mt-20 md:grid-cols-3">
        {t.facts.map((fact) => (
          <div
            key={fact.label}
            className="group rounded-2xl border border-ink/10 p-5 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper sm:p-8"
          >
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/45 transition-colors duration-500 group-hover:text-paper/50">
              {fact.label}
            </p>
            <h3 className="mt-6 text-xl font-extrabold tracking-tight sm:mt-10 sm:text-2xl">
              {fact.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-paper/70 sm:text-sm">
              {fact.text}
            </p>
          </div>
        ))}
      </div>

      {/* Valores */}
      <div className="mt-12 border-t border-ink/15 pt-6 sm:mt-20 sm:pt-8">
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/45">
          {t.valuesLabel}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:mt-6 sm:gap-x-10">
          {t.values.map((value) => (
            <li
              key={value}
              className="cursor-default text-2xl font-extrabold tracking-[-0.03em] text-ink/20 transition-colors duration-300 hover:text-ink sm:text-6xl"
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}