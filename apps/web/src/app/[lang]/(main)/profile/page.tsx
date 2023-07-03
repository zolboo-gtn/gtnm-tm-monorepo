import { getUserResponseSchema } from "api";
import dayjs from "dayjs";
import { use } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "ui";
import { z } from "zod";

import { PageLayout } from "@/components/organisms/page_layout";
import { getTranslations } from "@/i18n/server";
import { client } from "@/services/client.server";

const ProfilePage: React.Page = () => {
  const { body, status } = use(client.auth.getProfile());

  if (status !== 200) {
    return <div>{`Error: ${status}/${JSON.stringify(body)}`}</div>;
  }

  const profile = getUserResponseSchema
    .merge(
      z.object({
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
        deletedAt: z.coerce.date().nullable(),
      })
    )
    .parse(body);

  const translations = getTranslations();

  return (
    <PageLayout type="max-800">
      <Table className="border">
        <TableBody>
          {Object.entries(profile).map(([key, value]) => {
            return (
              <TableRow key={key}>
                <TableHead className="w-[200px] border bg-white">
                  {translations.users[key as keyof typeof profile]}
                </TableHead>
                <TableCell>
                  {(() => {
                    if (value instanceof Date) {
                      return dayjs(value).format("YYYY-MM-DD hh:mm:ss");
                    }

                    return value ?? "-";
                  })()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
export default ProfilePage;
