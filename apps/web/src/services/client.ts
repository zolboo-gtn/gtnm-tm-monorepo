import { type ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { appContract } from "api";

import { backend } from "@/configs/default";
import { Session } from "@/schemas/session";

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
  const _session = await fetch(`/api/session`);
  const session: Session | null = await _session.json();

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
  const handlers: ((args: CustomResponseHandlerArgs) => Promise<void>)[] = [
    login,
  ];
  for (const handler of handlers) {
    await handler(args);
  }
};

const login = async ({ path, response }: CustomResponseHandlerArgs) => {
  if (!path.endsWith("/login") || response.status !== 200) {
    return;
  }

  const { accessToken } = response.body as { accessToken: string };
  if (accessToken) {
    await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
    });
  }
};
