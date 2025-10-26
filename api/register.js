import { getUsers, saveUsers } from "./db.js";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const users = getUsers();
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: "Email already registered" });

  users.push({ email, password, access: false });
  saveUsers(users);

  return res.status(200).json({ success: true, message: "Registration successful!" });
}
