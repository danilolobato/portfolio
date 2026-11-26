"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/language";

const EMAIL = "danilolobato02@gmail.com";

const links = [
  { id: "proyectos", es: "Proyectos", en: "Projects" },
  { id: "stack", es: "Stack", en: "Stack" },
  { id: "areas", es: "Áreas", en: "Areas" },
  { id: "servicios", es: "Servicios", en: "Services" },
  { id: "sobre-mi", es: "Sobre mí", en: "About" },
  { id: "contacto", es: "Contacto", en: "Contact" },
];

type Theme = "dark" | "light";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { lang, toggle } = useLang();
  // theme = tema de la sección que está DEBAJO de la barra
  const [under, setUnder] = useState<Theme>("dark");
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const probe = 40; // altura de la barra
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) setUnder(el.dataset.theme as Theme);
      });

      const mid = window.innerHeight * 0.4;
      let current = "";
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = id;
      });
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Menú móvil: cerrar con Esc, al tocar afuera o al pasar a pantalla grande
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const onDark = under === "dark"; // sección oscura => barra clara

  const langButtonClass = clsx(
    "grid size-11 place-items-center rounded-full border text-xs font-bold transition-colors duration-500",
    onDark
      ? "border-black/15 bg-[#ececec] text-ink shadow-[inset_0_0_6px_rgba(0,0,0,0.06)] hover:bg-[#e3e3e3]"
      : "border-paper/20 bg-paper/5 text-paper hover:bg-paper/15"
  );

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className="fixed inset-x-0 top-4 z-50 px-3"
    >
      <nav
        className={clsx(
          "relative mx-auto flex h-16 w-full max-w-none items-center justify-between rounded-full border pr-3 pl-8 backdrop-blur-xl transition-colors duration-500 md:pr-12 md:pl-0",
          onDark
            ? "border-black/10 bg-[#f5f5f5]/95 text-ink shadow-[0_10px_28px_rgba(0,0,0,0.18),inset_0_0_20px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)]"
            : "border-white/15 bg-ink/55 text-paper shadow-[0_8px_30px_rgba(0,0,0,0.22),inset_0_0_14px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)]"
        )}
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-1.5 text-lg font-extrabold tracking-tight md:ml-[14vw]"
        >
          DL<span className="text-[0.55rem] leading-none">●</span>
        </a>

        {/* Links centrados en el medio de la barra (escritorio) */}
        <ul className="hidden items-center gap-1 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={clsx(
                  "group relative block px-3 py-2 text-xs font-semibold tracking-tight transition-opacity",
                  active === l.id ? "opacity-100" : "opacity-85 hover:opacity-100"
                )}
              >
                <span className="relative">
                  {l[lang]}
                  {/* Subrayado: aparece al hover y queda fijo en la sección activa */}
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-current transition-transform duration-300 ease-out",
                      active === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Idioma + hamburguesa */}
        <div className="flex items-center gap-2 md:-translate-x-[12vw]">
          <button onClick={toggle} aria-label="Cambiar idioma" className={langButtonClass}>
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={clsx(langButtonClass, "md:hidden")}
          >
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-current"
              />
              <motion.span
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Panel del menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
            style={{ transformOrigin: "top center" }}
            className={clsx(
              "absolute inset-x-3 top-full mt-2 overflow-hidden rounded-3xl border p-3 backdrop-blur-xl md:hidden",
              onDark
                ? "border-black/10 bg-[#f5f5f5]/95 text-ink shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
                : "border-white/15 bg-ink/90 text-paper shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            )}
          >
            <ul>
              {links.map((l, i) => {
                const isActive = active === l.id;
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors",
                        onDark ? "active:bg-ink/10" : "active:bg-paper/10",
                        isActive ? "opacity-100" : "opacity-55"
                      )}
                    >
                      <span className="w-6 font-mono text-[0.65rem] font-bold opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-extrabold tracking-[-0.03em]">
                        {l[lang]}
                      </span>
                      <span
                        className={clsx(
                          "ml-auto size-2 rounded-full bg-current transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <a
              href={`mailto:${EMAIL}`}
              className={clsx(
                "mt-2 flex items-center justify-between gap-3 border-t px-4 pb-2 pt-4 text-xs font-bold",
                onDark ? "border-ink/10" : "border-paper/15"
              )}
            >
              <span className="truncate opacity-70">{EMAIL}</span>
              <ArrowUpRight className="size-4 shrink-0" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}