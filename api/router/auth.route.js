import { Router } from "express";
import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
const JWT_SECERET = "kevalisking";
const authRouter = Router();

let users = [];
try {
  if (localStorage.getItem("users"))
    users = JSON.parse(localStorage.getItem("users"));
} catch (err) {
  users = [];
}

// Remove GET routes for login/register (React handles pages)

authRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Simple check if user exists
  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User exists" });

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users, null, 2));
  res.json({ message: "Register successful" });
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && user.password == password) {
    const token = jwt.sign(username, JWT_SECERET);
    // Send token to frontend
    res.json({ token, username });
  } else {
    res.status(401).json({ message: "Wrong credentials" });
  }
});

export default authRouter;
