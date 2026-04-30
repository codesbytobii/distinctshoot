"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
  const { name, email, service, message } = formData;

  try {
    await resend.emails.send({
      from: "Distinct Shoot Website <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${service || "General"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0D0D0D;">
          <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase;">
              New Enquiry — Distinct Shoot
            </h2>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6A6A58; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; width: 120px;">Name</td>
              <td style="padding: 10px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #6A6A58; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;">Email</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #6A6A58; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;">Service</td>
              <td style="padding: 10px 0; font-size: 14px;">${service || "Not specified"}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #6A6A58; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 11px; color: #9A9A8A; letter-spacing: 0.1em; text-transform: uppercase;">
            Sent via distinctshoot01.com
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false };
  }
}