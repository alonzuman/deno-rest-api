import { User } from "./types.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
// import { v4 } from "https://deno.land/std/uuid/mod.ts";

// JWT auth
const key = "my-secret";
const payload: Payload = {
  iss: "joe",
  exp: setExpiration(new Date().getTime() + 60000),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

let users: User[] = [
  {
    id: "1",
    username: "dancohen",
    password: "123456",
  },
  {
    id: "2",
    username: "shirlevy",
    password: "123456",
  },
  {
    id: "3",
    username: "alonzuman7",
    password: "123456",
  },
];

// ACTION get all posts
// POST to /api/v1/posts, PUBLIC
const login = async (ctx: Context) => {
  const { value } = await ctx.request.body();
  for (const user of users) {
    if (value.username === user.username && value.password === user.password) {
      const payload: Payload = {
        iss: user.username,
        exp: setExpiration(new Date().getTime() + 60000),
      };
      const jwt = makeJwt({ key, header, payload });
      if (jwt.length > 0) {
        ctx.response.status = 200;
        ctx.response.body = {
          success: true,
          id: user.id,
          username: user.username,
          jwt,
        };
      } else {
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          msg: "Server Error",
        };
      }
    } else {
      ctx.response.status = 422;
      ctx.response.body = {
        success: false,
        msg: "Invalid credentials",
      };
    }
  }
};

const guest = (ctx: Context) => {
  ctx.response.body = "Success guest";
};

const auth = (ctx: Context) => {
  ctx.response.body = "Success auth";
};

export { login, guest, auth };
