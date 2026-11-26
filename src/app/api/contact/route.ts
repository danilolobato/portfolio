import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.CONTACT_TO_EMAIL || "danilolobato02@gmail.com";

const SERVICES: Record<string, string> = {
  web: "Sitio web a medida",
  landing: "Landing page",
  uiux: "Diseño UI/UX",
  video: "Edición de video",
  other: "Otro",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Campo trampa para bots: si viene lleno, fingimos éxito y no enviamos nada
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80).replace(/[\r\n]+/g, " ");
  const email = clean(body.email, 120);
  const message = clean(body.message, 3000);
  const service = SERVICES[clean(body.service, 20)] ?? "No especificado";

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Falta RESEND_API_KEY en las variables de entorno");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [TO],
    replyTo: email, // al tocar "Responder" en Gmail, le contestás a quien escribió
    subject: `Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nInterés: ${service}\n\n${message}`,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}