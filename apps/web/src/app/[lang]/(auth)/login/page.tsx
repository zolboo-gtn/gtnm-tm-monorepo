import { PageLayout } from "@/components/organisms/page_layout";
import { getTranslations } from "@/i18n/server";
import { getProperties } from "@/utils/get_properties";

import { LoginForm } from "./login_form";

const LoginPage: React.Page = () => {
  const translations = getTranslations();

  return (
    <PageLayout type="max-400">
      <div className="flex h-screen items-center justify-center">
        <LoginForm
          translations={getProperties(translations, { login: true })}
        />
      </div>
    </PageLayout>
  );
};
export default LoginPage;
