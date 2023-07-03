//
import { serialize } from "cookie";
import type { CookieSerializeOptions } from "cookie";

//
import { session } from "@/configs/default";
import { Session } from "@/schemas/session";

//
import { encrypt, decrypt } from "./crypto_cookie";
import { tryParseJson } from "./try_parse_json";

const defaultOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24,
  path: "/",
  sameSite: "lax",
  secure: true,
};
export const sessionName = "session";
export const createSession = (
  token: string,
  options?: Partial<CookieSerializeOptions>
) => {
  return serialize(sessionName, token, { ...defaultOptions, ...options });
};
export const encryptSession = (value: string = "") => {
  return encrypt(value, session.secret);
};
export const decryptSession = (value: string = ""): Session | null => {
  const decryptedCookie = decrypt(value, session.secret);
  const parsed = Session.safeParse(tryParseJson(decryptedCookie));

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
};
