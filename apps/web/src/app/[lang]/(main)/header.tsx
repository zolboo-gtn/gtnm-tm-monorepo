import { getTranslations } from "@/i18n/server";
import { getProperties } from "@/utils/get_properties";

import { HeaderDropdown } from "./header_dropdown";
import { HeaderTitle } from "./header_title";

export const Header: React.FC = () => {
  const translations = getTranslations();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-full items-center justify-between">
        <HeaderTitle
          translations={getProperties(translations, {
            routes: true,
          })}
        />
        <HeaderDropdown
          translations={getProperties(translations, {
            languages: true,
          })}
        />
      </div>
    </header>
  );
};
