import fs from "fs";
import path from "path";

export function getUsers() {
  const dbPath = path.join(process.cwd(), "users.json");
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "[]");
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

export function saveUsers(users) {
  const dbPath = path.join(process.cwd(), "users.json");
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}
