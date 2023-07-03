import { getTranslations } from "@/i18n/server";
import { getProperties } from "@/utils/get_properties";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

const MainLayout: React.Layout = ({ children }) => {
  const translations = getTranslations();

  return (
    <div className="grid h-screen w-screen grid-cols-[80px,1fr] grid-rows-[70px,1fr]">
      <Sidebar
        translations={getProperties(translations, {
          common: true,
          logout: true,
          routes: true,
        })}
      />
      <Header />
      <div className="overflow-auto">{children}</div>
    </div>
  );
};
export default MainLayout;
