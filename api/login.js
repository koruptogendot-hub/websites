import { getUsers } from "./db.js";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

  return res.status(200).json({ success: true, message: "Login successful" });
}
