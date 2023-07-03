import "ui/styles.css";
import "./globals.css";

import { Toaster } from "ui";

import { GlboalTransitionProvider } from "@/components/organisms/global_transition";
import { ClientTransitionLoader } from "@/components/molecules/client_transition_loader";
import { getTranslations } from "@/i18n/server";
import { getProperties } from "@/utils/get_properties";

const RootLayout: React.Layout = ({ children, params: { lang } }) => {
  const translations = getTranslations();
  return (
    <html lang={lang}>
      <body className="bg-gray-50">
        <GlboalTransitionProvider>
          {children}
          <ClientTransitionLoader
            translations={getProperties(translations, { clientLoader: true })}
          />
        </GlboalTransitionProvider>
        <Toaster />
      </body>
    </html>
  );
};
export default RootLayout;
