import nodemailer from "nodemailer";

const gmailAccounts = [
  { email: "gmail1@example.com", appPassword: "xxxx" },
  { email: "gmail2@example.com", appPassword: "xxxx" },
  { email: "gmail3@example.com", appPassword: "xxxx" },
  { email: "gmail4@example.com", appPassword: "xxxx" },
  { email: "gmail5@example.com", appPassword: "xxxx" },
  { email: "gmail6@example.com", appPassword: "xxxx" },
  { email: "gmail7@example.com", appPassword: "xxxx" },
  { email: "gmail8@example.com", appPassword: "xxxx" },
  { email: "gmail9@example.com", appPassword: "xxxx" },
  { email: "gmail10@example.com", appPassword: "xxxx" },
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { gmailIndex, to, subject, text } = req.body;

  if (gmailIndex == null || !to || !subject || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const account = gmailAccounts[gmailIndex];
  if (!account) return res.status(400).json({ message: "Invalid Gmail selection" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: account.email,
      pass: account.appPassword
    }
  });

  try {
    const info = await transporter.sendMail({
      from: account.email,
      to,
      subject,
      text
    });

    return res.status(200).json({ messageId: info.messageId });
  } catch (err) {
    console.error("Send error:", err);
    return res.status(500).json({ message: err.message });
  }
}
