import { type ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { appContract } from "api";
import { cookies } from "next/headers";

import { backend } from "@/configs/default";
import { decryptSession, sessionName } from "@/utils/create_session";

export const client = initClient(appContract, {
  baseHeaders: {},
  baseUrl: backend.url,
  api: async (args) => {
    const interceptedArgs = await requestInterceptor(args);
    const response = await tsRestFetchApi(interceptedArgs);
    await responseInterceptor({ ...interceptedArgs, response });

    return response;
  },
});

type CustomRequestHandlerArgs = ApiFetcherArgs;
const requestInterceptor = async (_args: CustomRequestHandlerArgs) => {
  const sessionCookie = cookies().get(sessionName)?.value;
  const session = decryptSession(sessionCookie);

  const args = _args;
  if (session) {
    args.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return args;
};

type Response = Awaited<ReturnType<typeof tsRestFetchApi>>;
type CustomResponseHandlerArgs = CustomRequestHandlerArgs & {
  response: Response;
};
const responseInterceptor = async (args: CustomResponseHandlerArgs) => {
  const handlers: ((args: CustomResponseHandlerArgs) => Promise<void>)[] = [];
  for (const handler of handlers) {
    await handler(args);
  }
};
