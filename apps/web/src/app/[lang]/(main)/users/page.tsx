import Link from "next/link";
import { use } from "react";
import { Button } from "ui";

import { PageLayout } from "@/components/organisms/page_layout";
import { getTranslations } from "@/i18n/server";
import { client } from "@/services/client.server";
import { getProperties } from "@/utils/get_properties";

import { UsersTable } from "./users_table";

const UsersPage: React.Page = () => {
  const { body, status } = use(client.users.getUsers());
  if (status !== 200) {
    return <div>{`Error: ${status}/${JSON.stringify(body)}`}</div>;
  }

  const translations = getTranslations();

  return (
    <PageLayout>
      <UsersTable
        data={body}
        translations={getProperties(translations, { roles: true, users: true })}
      />
    </PageLayout>
  );
};
export default UsersPage;
