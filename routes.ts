import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPost,
} from "./controllers/posts.ts";
import {
  login,
  auth,
  guest,
} from "./controllers/users.ts";

const router = new Router();

// Users routes
router.post("/api/v1/login", login)
  .get("/api/v1/guest", guest)
  .get("/api/v1/auth", authMiddleware, auth);

// Posts routes
router.get("/api/v1/posts", getPosts)
  .get("/api/v1/posts/:id", getPost)
  .post("/api/v1/posts", addPost)
  .put("/api/v1/posts/:id", updatePost)
  .delete("/api/v1/posts/:id", deletePost);

export default router;
