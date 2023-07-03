// import { z } from "zod";

// const schema = z.object({
//   NEXT_PUBLIC_BACKEND_URL: z.string(),
//   SESSION_SECRET: z.string(),
// });
// const result = schema.safeParse({
//   NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   SESSION_SECRET: process.env.SESSION_SECRET,
// });

// if (result.success === false) {
//   throw new Error(JSON.stringify(result.error.errors));
// }

// export const backend = {
//   url: result.data.NEXT_PUBLIC_BACKEND_URL,
// };
// export const session = {
//   secret: result.data.SESSION_SECRET,
// };

export const backend = {
  url: process.env.NEXT_PUBLIC_BACKEND_URL!,
};
export const session = {
  secret: process.env.SESSION_SECRET!,
};
