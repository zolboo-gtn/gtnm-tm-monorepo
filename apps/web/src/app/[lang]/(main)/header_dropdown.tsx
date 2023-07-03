"use client";

import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "ui";

import {
  config,
  getLocaleFromPathname,
  removeLocaleFromPathname,
} from "@/i18n";

export const HeaderDropdown: React.FC<React.Translations<"languages">> = ({
  translations,
}) => {
  const pathname = usePathname();
  const lang = getLocaleFromPathname(pathname) ?? config.default;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <GlobeIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {config.locales
          .map((locale) => (
            <Link
              key={locale}
              href={`/${locale}${removeLocaleFromPathname(pathname)}`}
            >
              <DropdownMenuCheckboxItem key={locale} checked={lang === locale}>
                {translations.languages[locale]}
              </DropdownMenuCheckboxItem>
            </Link>
          ))
          .reverse()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
