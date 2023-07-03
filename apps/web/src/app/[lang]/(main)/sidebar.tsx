"use client";

import { CogIcon, HomeIcon, TableIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "ui";
import { cn } from "utils";

import { useGlobalTransition } from "@/hooks/use_global_transition";
import { getLocaleFromPathname, removeLocaleFromPathname } from "@/i18n";
import { getProperties } from "@/utils/get_properties";

import { LogoutDialog } from "./logout_dialog";

export const Sidebar: React.FC<
  React.Translations<"common" | "logout" | "routes">
> = ({ translations }) => {
  const _pathname = usePathname();
  const pathname = removeLocaleFromPathname(_pathname);
  const router = useRouter();
  const locale = getLocaleFromPathname(_pathname);

  const { startTransition } = useGlobalTransition();

  const items = [
    {
      href: "/",
      icon: <HomeIcon className="h-full w-full" />,
      key: "home",
    },
    {
      href: "/users",
      icon: <TableIcon className="h-full w-full" />,
      key: "users",
    },
    {
      href: "/profile",
      icon: <UserIcon className="h-full w-full" />,
      key: "profile",
    },
    {
      href: "/settings",
      icon: <CogIcon className="h-full w-full" />,
      key: "settings",
    },
  ] as const;

  return (
    <aside className="row-span-2 flex flex-col justify-between bg-red-400">
      <ul>
        {items.map(({ href, icon, key }) => {
          return (
            <li key={key} className="aspect-square">
              <Link
                href={locale ? `/${locale}${href}` : href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-y-2 text-white",
                  "hover:bg-black/20",
                  "active:bg-black/30",
                  (key === "home"
                    ? pathname === href
                    : pathname.startsWith(href)) && "bg-black/10"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  startTransition(() => {
                    router.push(locale ? `/${locale}${href}` : href);
                  });
                }}
              >
                <div className="h-6 w-6">{icon}</div>
                <span className="text-center text-[10px] font-bold">
                  {translations.routes[key]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul>
        <li className="aspect-square">
          <LogoutDialog
            translations={getProperties(translations, {
              common: true,
              logout: true,
            })}
          />
        </li>
      </ul>
    </aside>
  );
};
