import jwt from "jsonwebtoken";
import express from "express";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
const JWT_SECERET = "kevalisking";

let users = [];
try {
  if (localStorage.getItem("users")) {
    const raw = localStorage.getItem("users") || "[]";
    users = JSON.parse(raw);
  }
} catch (err) {
  users = [];
}

async function authMiddleware(req, res, next) {
  const newtoken = req.headers;
  console.log(newtoken);
  let ourToken = await jwt.decode(newtoken, JWT_SECERET);
  console.log(ourToken);

  let pass = users.find((u) => u.username === ourToken);
  if (pass) {
    next();
  } else {
    res.status(502).send("Invalid user request");
  }
}

export default authMiddleware;
