import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");

localStorage.setItem("myFirstKey", "myFirstValue");
console.log(localStorage.getItem("myFirstKey"));

const app = express();
const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

app.set("views", "./views");

let posts = [];
try {
  if (localStorage.getItem("posts")) {
    const raw = localStorage.getItem("posts") || "[]";
    posts = JSON.parse(raw);
  }
} catch (err) {
  posts = [];
}

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("post", { post });
});

app.get("/post/edit/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("edit", { post });
});

app.post("/post/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc, author } = req.body;
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    posts[postIndex] = { id, title, desc, author };
  }
  res.redirect("/posts");
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
});

app.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter((p) => p.id != id);
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
  res.redirect("/posts");
});

app.post("/posts", (req, res) => {
  const { title, desc, author } = req.body;
  const id = uuidv4();
  posts.push({ id, title, desc, author });
  res.redirect("/posts");
  try {
    localStorage.setItem("posts", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Failed to save posts:", err);
  }
  // console.log(posts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
