import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
const JWT_SECERET = "kevalisking";

let users = [];
try {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
} catch (err) {
  users = [];
}

async function authMiddleware(req, res, next) {
  // Frontend will send token in a header called 'x-auth-token' or 'authorization'
  const token = req.headers["x-auth-token"];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECERET); // Use verify, not decode
    // Check if user exists
    const user = users.find((u) => u.username === decoded);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid User" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

export default authMiddleware;
