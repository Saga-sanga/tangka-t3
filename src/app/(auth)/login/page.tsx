import { HydrateClient } from "~/trpc/server";

export default async function Page() {
  return (
    <HydrateClient>
      <main>
        <h1>Hello to the login page</h1>
      </main>
    </HydrateClient>
  );
}
