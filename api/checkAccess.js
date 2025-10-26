import { getUsers } from "./db.js";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ access: false });
  return res.status(200).json({ access: user.access || false });
}
