import Link from "next/link";
import { use } from "react";
import { Button } from "ui";

import { PageLayout } from "@/components/organisms/page_layout";
import { client } from "@/services/client.server";

const UserPage: React.Page<{ uid: string }> = ({ params }) => {
  const { body, status } = use(
    client.users.getUser({
      params: {
        id: params.uid,
      },
    })
  );
  if (status !== 200) {
    return <div>{`Error: ${status}`}</div>;
  }

  return (
    <PageLayout>
      <div>{body.email}</div>
    </PageLayout>
  );
};
export default UserPage;
