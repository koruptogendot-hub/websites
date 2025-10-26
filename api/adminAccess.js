import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "❌ Email required" });

    // Path file JSON — tetap bisa dipakai di Vercel build
    const dbPath = path.join(process.cwd(), "users.json");

    // Baca data user (jika ada)
    let users = [];
    if (fs.existsSync(dbPath)) {
      users = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    }

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    // Update access
    users[userIndex].access = true;
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

    return res.status(200).json({ message: `✅ Access granted for ${email}` });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
