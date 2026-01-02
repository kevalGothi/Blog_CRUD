import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");

let postRouter = Router();

let posts = [];
try {
  if (localStorage.getItem("posts")) {
    const raw = localStorage.getItem("posts") || "[]";
    posts = JSON.parse(raw);
  }
} catch (err) {
  posts = [];
}

postRouter.get("/", (req, res) => {
  res.send("this is working");
});

postRouter.get("/posts", (req, res) => {
  res.render("index", { posts });
});

postRouter.get("/post/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("post", { post });
});

postRouter.get("/post/edit/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("edit", { post });
});

postRouter.post("/post/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc, author } = req.body;
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    posts[postIndex] = { id, title, desc, author };
  }
  res.redirect("/api/posts");
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
});

postRouter.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter((p) => p.id != id);
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
  res.redirect("/api/posts");
});

postRouter.post("/posts", (req, res) => {
  const { title, desc, author } = req.body;
  const id = uuidv4();
  posts.push({ id, title, desc, author });
  res.redirect("/api/posts");
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
  // console.log(posts);
});

export default postRouter;
