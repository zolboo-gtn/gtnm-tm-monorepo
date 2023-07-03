//
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createSession,
  decryptSession,
  encryptSession,
  sessionName,
} from "@/utils/create_session";

export const GET = () => {
  const sessionCookie = cookies().get(sessionName)?.value;
  const session = decryptSession(sessionCookie);

  return NextResponse.json(session);
};

export const POST = async (request: Request) => {
  const res = await request.text();

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie": createSession(encryptSession(res)),
    },
  });
};

export const DELETE = () =>
  new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie": createSession("", { maxAge: 0 }),
    },
  });
