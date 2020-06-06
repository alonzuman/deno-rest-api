import { Post } from "./types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// Dummy data
let posts: Post[] = [
  {
    id: "1",
    content:
      "Do nisi do adipisicing incididunt laborum laboris voluptate deserunt pariatur exercitation cupidatat nisi.",
  },
  {
    id: "2",
    content: "Velit incididunt ullamco sunt adipisicing quis..",
  },
  {
    id: "3",
    content: "Nostrud magna elit dolore aute esse nostrud..",
  },
];

// ACTION get all posts
// GET to /api/v1/posts, PUBLIC
const getPosts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: posts,
  };
};

// ACTION get a single post
// GET to /api/v1/posts/:id, PUBLIC
const getPost = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const post: Post | undefined = posts.find((post) => post.id === params.id);
  if (post) {
    response.status = 200;
    response.body = {
      success: true,
      data: post,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No post found",
    };
  }
};

// ACTION add a single post
// POST to /api/v1/posts/, PUBLIC
const addPost = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const post: Post = body.value;
    post.id = v4.generate();
    posts.push(post);
    response.status = 201,
      response.body = {
        success: true,
        data: post,
      };
  }
};

// ACTION update a single post
// PUT to /api/v1/posts/, PUBLIC
const updatePost = ({ response }: { response: any }) => {
  response.body = "update a post";
};

// ACTION delete a single post
// DELETE to /api/v1/posts/:id, PUBLIC
const deletePost = (
  { params, response }: { params: { id: string }; response: any },
) => {
  posts = posts.filter((post) => post.id !== params.id);
  response.body = {
    success: true,
    msg: "Post removed",
  };
};

export { getPosts, getPost, addPost, updatePost, deletePost };
