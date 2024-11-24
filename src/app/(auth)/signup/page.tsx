import { HydrateClient } from "~/trpc/server";

export default async function Page() {
  return (
    <HydrateClient>
      <main>
        <h1>Welcome to Signup</h1>
      </main>
    </HydrateClient>
  );
}
