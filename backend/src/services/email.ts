import { Resend } from "resend";

const NOTIFICATION_TO = "katemaxcrosby@gmail.com";
const NOTIFICATION_FROM = "Wedding <wedding@crosbyserver.com>";

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

/* Checks Resend connectivity on startup and logs the result */
export const checkResend = async (): Promise<void> => {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("Resend: no env variable");
    return;
  }

  try {
    const client = new Resend(key);
    const { error } = await client.domains.list();
    if (error) {
      console.log(`Resend: disconnected (${error.message})`);
    } else {
      console.log("Resend: connected");
    }
  } catch (err) {
    console.log(`Resend: disconnected (${(err as Error).message})`);
  }
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
    .then(({ data, error }) => {
      if (error) {
        console.error(`[EMAIL] Failed to send "${subject}":`, error.message);
      } else {
        console.log(`[EMAIL] Sent: "${subject}" (id: ${data?.id})`);
      }
    })
    .catch((error) => {
      console.error(`[EMAIL] Failed to send "${subject}":`, (error as Error).message);
    });
};
