import express from "express";
import methodOverride from "method-override";
import postRouter from "./router/posts.route.js";
import authRouter from "./router/auth.route.js";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/middleware.js";

const app = express();
const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

// main routes

app.use("/api/", authRouter);

// middleware using to check after this line

app.use("/api/", authMiddleware, postRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
