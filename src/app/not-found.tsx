import Link from "next/link";
import { headers } from "next/headers";
import { AdminWrapper } from "src/containers/Wrapper/admin-wrapper";
import { UserWrapper } from "src/containers/Wrapper/user-wrapper";
import { Button } from "src/components/Button";

export type NotFoundContentProps = {
  pathname: string;
};

const NotFoundContent = ({ pathname }: NotFoundContentProps) => {
  return (
    <div className="w-full h-[100vh] p-4 flex items-center justify-center flex-col gap-4">
      <h1>Not Found</h1>
      <h3>
        Could not find <b>{pathname}</b> resource
      </h3>

      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default async function NotFound() {
  const pathname = (await headers()).get("x-current-path");

  console.log("NotFound triggered for path:", pathname);

  return (
    <>
      {pathname?.startsWith("/admin") ? (
        <AdminWrapper>
          <NotFoundContent pathname={pathname || ""} />
        </AdminWrapper>
      ) : (
        <UserWrapper>
          <NotFoundContent pathname={pathname || ""} />
        </UserWrapper>
      )}
    </>
  );
}
