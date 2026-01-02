import { Router } from "express";
import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
const JWT_SECERET = "kevalisking";

const authRouter = Router();

let users = [];
try {
  if (localStorage.getItem("users")) {
    const raw = localStorage.getItem("users") || "[]";
    users = JSON.parse(raw);
  }
} catch (err) {
  users = [];
}

authRouter.get("/register", (req, res) => {
  res.render("register");
});
authRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  console.log("register succesfull");
  console.log(users);
  res.redirect("/api/login");
  try {
    localStorage.setItem("users", JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Failed to save users:", err);
  }
});
authRouter.get("/login", (req, res) => {
  res.render("login");
});
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user.password == password) {
    const token = await jwt.sign(username, JWT_SECERET);

    req.headers.token = await token;
    console.log(req.headers);

    res.redirect("/api/posts");
  } else {
    res.send("wrong password");
  }
});
authRouter.get("/logout", (req, res) => {
  res.send("this is logout page");
});

export default authRouter;
