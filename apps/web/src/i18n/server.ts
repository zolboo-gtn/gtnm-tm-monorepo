import "server-only";

import { headers } from "next/headers";
import { use } from "react";

import { getDictionary } from "./dictionaries";

import { type Locale } from ".";

export const getTranslations = (lang?: Locale) => {
  const locale = headers().get("x-lang") as Locale;
  const dictionary = use(getDictionary(lang ?? locale));

  return dictionary;
};
