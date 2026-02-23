import { Resend } from "resend";

const NOTIFICATION_TO = "katemaxcrosby@gmail.com";
const NOTIFICATION_FROM = "Wedding <wedding@send.crosbyserver.com>";

/* Lazily initialised Resend client — only created if API key is present */
let resend: Resend | null = null;

const getClient = (): Resend | null => {
  if (resend) return resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[EMAIL] RESEND_API_KEY not set — email notifications disabled");
    return null;
  }
  resend = new Resend(key);
  return resend;
};

/* Sends a notification email — fire-and-forget, never throws */
export const sendNotification = (subject: string, html: string): void => {
  const client = getClient();
  if (!client) return;

  client.emails
    .send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      subject,
      html,
    })
    .then(() => {
      console.log(`[EMAIL] Sent: "${subject}"`);
    })
    .catch((error) => {
      console.error(`[EMAIL] Failed to send "${subject}":`, (error as Error).message);
    });
};
