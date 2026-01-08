import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
let postRouter = Router();

let posts = [];
try {
  if (localStorage.getItem("posts"))
    posts = JSON.parse(localStorage.getItem("posts"));
} catch (err) {
  posts = [];
}

// Get all posts
postRouter.get("/posts", (req, res) => {
  res.json(posts);
});

// Get single post
postRouter.get("/post/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.json(post);
});

// Update Post
postRouter.post("/post/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc, author } = req.body;
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    posts[postIndex] = { id, title, desc, author };
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete Post (Using DELETE method properly)
postRouter.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter((p) => p.id != id);
  localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  res.json({ message: "Deleted" });
});

// Create Post
postRouter.post("/posts", (req, res) => {
  const { title, desc, author } = req.body;
  const id = uuidv4();
  const newPost = { id, title, desc, author };
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  res.json(newPost);
});

export default postRouter;
