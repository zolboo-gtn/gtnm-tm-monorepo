export const config = {
  default: "mn",
  locales: ["en", "mn"],
} as const;
export type Locale = (typeof config)["locales"][number];

export const getLocaleFromPathname = (pathname: string | null) => {
  if (pathname === null) return null;

  const currentLocale = config.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  return currentLocale ?? null;
};
export const removeLocaleFromPathname = (pathname: string) => {
  const currentLocale = config.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (currentLocale) {
    return pathname.replace(`/${currentLocale}`, "") || "/";
  }

  return pathname;
};
