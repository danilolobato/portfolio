"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUp, ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { useLang } from "@/context/language";

const EMAIL = "danilolobato02@gmail.com";

const socials = [
  { name: "WhatsApp", href: "https://w.app/danilolobato" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/danilo-lobato-03a230339" },
];

const serviceIds = ["web", "landing", "uiux", "video", "other"] as const;
type ServiceId = (typeof serviceIds)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copy = {
  es: {
    eyebrow: "CONTACTO",
    titleBold: "Hagamos algo",
    titleMuted: "que valga la pena.",
    status: "Disponible para nuevos proyectos",
    name: "Nombre",
    namePh: "Cómo te llamás",
    email: "Email",
    emailPh: "tu@email.com",
    interest: "¿Qué necesitás?",
    services: {
      web: "Sitio web",
      landing: "Landing page",
      uiux: "Diseño UI/UX",
      video: "Edición de video",
      other: "Otro",
    },
    message: "Mensaje",
    messagePh: "Contame sobre tu proyecto…",
    send: "Enviar mensaje",
    sending: "Enviando…",
    errName: "Escribí tu nombre.",
    errEmail: "Ingresá un email válido.",
    errMessage: "Escribí un mensaje (mínimo 5 caracteres).",
    errSend: "No pude enviar el mensaje. Probá de nuevo o escribime por email.",
    okTitle: "¡Mensaje enviado!",
    okText: "Gracias por escribirme. Te respondo lo antes posible.",
    again: "Enviar otro mensaje",
    direct: "Escribime directo",
    copyHint: "Copiar email",
    copied: "¡Copiado!",
    localTime: "Mi hora local",
    reply: "Respondo en menos de 24 horas",
    rights: "© 2026 Danilo Lobato",
    top: "Volver arriba",
  },
  en: {
    eyebrow: "CONTACT",
    titleBold: "Let's make something",
    titleMuted: "worth making.",
    status: "Available for new projects",
    name: "Name",
    namePh: "Your name",
    email: "Email",
    emailPh: "you@email.com",
    interest: "What do you need?",
    services: {
      web: "Website",
      landing: "Landing page",
      uiux: "UI/UX design",
      video: "Video editing",
      other: "Other",
    },
    message: "Message",
    messagePh: "Tell me about your project…",
    send: "Send message",
    sending: "Sending…",
    errName: "Please enter your name.",
    errEmail: "Enter a valid email.",
    errMessage: "Write a message (at least 5 characters).",
    errSend: "I couldn't send the message. Try again or email me directly.",
    okTitle: "Message sent!",
    okText: "Thanks for reaching out. I'll get back to you as soon as I can.",
    again: "Send another message",
    direct: "Write me directly",
    copyHint: "Copy email",
    copied: "Copied!",
    localTime: "My local time",
    reply: "I reply within 24 hours",
    rights: "© 2026 Danilo Lobato",
    top: "Back to top",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "w-full bg-transparent py-2.5 text-base font-semibold text-paper outline-none placeholder:text-paper/25 sm:py-3 sm:text-lg";

/* Hora de Argentina (GMT-3), se actualiza sola */
function useLocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/* Campo con la línea inferior que se llena al enfocar */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="group block">
      <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-paper/45">
        {label}
      </span>
      <span className="relative mt-1 block border-b border-paper/15">
        {children}
        <span className="absolute -bottom-px left-0 h-[2px] w-full origin-left scale-x-0 bg-paper transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
      </span>
      {error && (
        <span className="mt-2 block text-xs font-semibold text-red-400">{error}</span>
      )}
    </label>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const time = useLocalTime();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<ServiceId | null>(null);
  const [website, setWebsite] = useState(""); // campo trampa anti-bots
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const next: typeof errors = {};
    if (!name.trim()) next.name = t.errName;
    if (!EMAIL_RE.test(email.trim())) next.email = t.errEmail;
    if (message.trim().length < 5) next.message = t.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, service, website }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setService(null);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[84rem] flex-col px-4 pb-8 pt-16 sm:px-6 sm:pt-24 md:px-10 md:pt-28">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-6">
        <div>
          <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-paper/45">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            <span className="text-paper">{t.titleBold} </span>
            <span className="text-paper/45">{t.titleMuted}</span>
          </h2>
        </div>

        <p className="flex items-center gap-2.5 text-xs font-semibold text-paper/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {t.status}
        </p>
      </div>

      <div className="mt-10 grid flex-1 gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[1.25fr_1fr]">
        {/* Formulario */}
        <div className="rounded-3xl border border-paper/15 p-5 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="flex h-full min-h-[18rem] flex-col items-start justify-center sm:min-h-[22rem]"
                aria-live="polite"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="grid size-14 place-items-center rounded-full bg-paper text-ink"
                >
                  <Check className="size-6" strokeWidth={3} />
                </motion.span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {t.okTitle}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/65">{t.okText}</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-paper/30 px-5 py-2.5 text-xs font-bold transition-colors hover:bg-paper/10"
                >
                  {t.again}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Campo trampa (invisible para personas) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                  <Field label={t.name} error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePh}
                      maxLength={80}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t.email} error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPh}
                      maxLength={120}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-paper/45">
                    {t.interest}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {serviceIds.map((id) => {
                      const selected = service === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setService(selected ? null : id)}
                          className={clsx(
                            "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-300 sm:px-4 sm:py-2",
                            selected
                              ? "border-paper bg-paper text-ink"
                              : "border-paper/25 text-paper/75 hover:border-paper/60 hover:text-paper"
                          )}
                        >
                          {t.services[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label={t.message} error={errors.message}>
                  <textarea
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePh}
                    maxLength={3000}
                    className={clsx(inputClass, "resize-none")}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.04] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.send}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-xs font-semibold text-red-400" aria-live="polite">
                      {t.errSend}
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Tarjeta de contacto directo */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col justify-between gap-8 rounded-3xl bg-paper p-5 text-ink sm:gap-10 sm:p-10"
        >
          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/45">
              {t.direct}
            </p>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={`${t.copyHint}: ${EMAIL}`}
              className="group mt-4 block w-full text-left outline-none"
            >
              <span className="block break-all text-lg font-extrabold tracking-tight sm:text-2xl">
                {EMAIL}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors group-hover:text-ink">
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    {t.copyHint}
                  </>
                )}
              </span>
            </button>

            <ul className="mt-6 border-t border-ink/10 sm:mt-8">
              {socials.map((s) => (
                <li key={s.name} className="border-b border-ink/10">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-3.5 text-base font-extrabold tracking-tight sm:py-4 sm:text-lg"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {s.name}
                    </span>
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink/45">
                {t.localTime}
              </p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                {time}
              </p>
              <p className="text-xs font-semibold text-ink/50">GMT-3</p>
            </div>
            <p className="max-w-[9.5rem] text-right text-xs font-semibold leading-snug text-ink/55 sm:max-w-[10rem]">
              {t.reply}
            </p>
          </div>
        </motion.aside>
      </div>

      {/* Pie */}
      <div className="mt-12 flex items-center justify-between border-t border-paper/15 pt-6 text-xs font-semibold text-paper/50 sm:mt-16">
        <span>{t.rights}</span>
        <a
          href="#inicio"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-paper"
        >
          {t.top}
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}