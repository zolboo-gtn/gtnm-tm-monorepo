import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from "next/server";

import {
  config as i18n,
  getLocaleFromPathname,
  removeLocaleFromPathname,
} from "@/i18n";
import { decryptSession, sessionName } from "@/utils/create_session";

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico).*)"],
};
export const middleware: NextMiddleware = async (request) => {
  const guards = [
    checkAuthRoutes,
    checkProtectedRoutes,
    checkAdminRoutes,
    checkCustomHeaders,
  ];

  for (const guard of guards) {
    const response = guard(request);
    if (response) {
      return response;
    }
  }
};

const authRoutes: RegExp[] = [/^\/login$/];
const checkAuthRoutes = (request: NextRequest) => {
  const session = request.cookies.get(sessionName);
  const { pathname } = request.nextUrl;
  const _pathname = removeLocaleFromPathname(pathname);
  const currentLocale = getLocaleFromPathname(pathname);

  if (session && authRoutes.some((route) => route.test(_pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = currentLocale ? `/${currentLocale}` : "/";

    return NextResponse.redirect(url);
  }
};

const publicRoutes: RegExp[] = [];
const checkProtectedRoutes = (request: NextRequest) => {
  const session = request.cookies.get(sessionName);
  const { pathname } = request.nextUrl;
  const _pathname = removeLocaleFromPathname(pathname);
  const currentLocale = getLocaleFromPathname(pathname);

  if (
    !session &&
    !authRoutes.some((route) => route.test(_pathname)) &&
    !publicRoutes.some((route) => route.test(_pathname))
  ) {
    const url = request.nextUrl.clone();

    if (url.pathname !== "/") {
      url.search = `?redirectTo=${url.pathname}`;
    }
    url.pathname = currentLocale ? `/${currentLocale}/login` : "/login";

    return NextResponse.redirect(url);
  }
};

const adminRoutes: RegExp[] = [];
const checkAdminRoutes = (request: NextRequest) => {
  const session = request.cookies.get(sessionName);

  if (!session && decryptSession(session)) {
  }

  const { pathname } = request.nextUrl;
  const _pathname = removeLocaleFromPathname(pathname);
  const currentLocale = getLocaleFromPathname(pathname);

  if (session && authRoutes.some((route) => route.test(_pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = currentLocale ? `/${currentLocale}` : "/";

    return NextResponse.redirect(url);
  }
};

const checkCustomHeaders = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const currentLocale = getLocaleFromPathname(pathname);

  const headers = new Headers();
  headers.set("x-lang", currentLocale ?? i18n.default);
  headers.set("x-pathname", removeLocaleFromPathname(pathname));

  if (!currentLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.default}${pathname}`;

    return NextResponse.rewrite(url, { headers });
  }

  return NextResponse.next({ headers });
};
