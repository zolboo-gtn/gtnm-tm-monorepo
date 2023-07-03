"use client";

import { usePathname } from "next/navigation";

import { removeLocaleFromPathname } from "@/i18n";

export const HeaderTitle: React.FC<React.Translations<"routes">> = ({
  translations,
}) => {
  const _pathname = usePathname();
  const pathname = removeLocaleFromPathname(_pathname);

  return (
    <div className="text-xl font-bold">
      {(() => {
        if (pathname === "/") {
          return translations.routes.home;
        }
        if (pathname === "/profile") {
          return translations.routes.profile;
        }
        if (pathname === "/settings") {
          return translations.routes.settings;
        }
        if (pathname === "/users") {
          return translations.routes.users;
        }

        return pathname;
      })()}
    </div>
  );
};
