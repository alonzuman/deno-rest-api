import { Context } from "../../../../Library/Caches/deno/deps/https/deno.land/0cf0b240ff8d72cec556fbdf84657f4c8f630fc95e318dc89f5e9f1f4a9b1268.ts";

export const authMiddleware = (ctx: Context, next) => {
  console.log("Middleware");
};
