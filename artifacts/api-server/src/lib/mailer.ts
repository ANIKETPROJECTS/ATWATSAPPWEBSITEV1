import nodemailer from "nodemailer";
import type { DemoRequestInput } from "@workspace/api-zod";

export class MailConfigurationError extends Error {
  constructor() {
    super("SMTP is not configured");
    this.name = "MailConfigurationError";
  }
}

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });

export async function sendDemoRequestEmail(input: DemoRequestInput): Promise<void> {
  const user = process.env.SMTP_USER?.trim() || "info@atwassup.com";
  const password = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const recipient = process.env.LEAD_INBOX?.trim() || "info@atwassup.com";

  if (!user || !password || !host || !recipient || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new MailConfigurationError();
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const name = input.name.trim();
  const email = input.email.trim();
  const whatsapp = input.whatsapp?.trim() || "Not provided";
  const message = input.message?.trim();
  const isContactRequest = Boolean(message);
  const requestTitle = isContactRequest
    ? "New AtWassup contact inquiry"
    : "New AtWassup demo request";
  const requestLabel = isContactRequest
    ? "New contact inquiry"
    : "New demo request";
  const detailLines = [
    `Name: ${name}`,
    `Work email: ${email}`,
    `WhatsApp: ${whatsapp}`,
    ...(message ? [`Message: ${message}`] : []),
  ];
  const detailHtml = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Work email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>`,
    ...(message
      ? [`<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`]
      : []),
  ];

  try {
    await transporter.sendMail({
      from: { name: "AtWassup Website", address: user },
      to: recipient,
      replyTo: email,
      subject: requestTitle,
      text: [requestLabel, ...detailLines].join("\n"),
      html: [
        `<h2>${requestLabel}</h2>`,
        ...detailHtml,
      ].join(""),
    });
  } finally {
    transporter.close();
  }
}