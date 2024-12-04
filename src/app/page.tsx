import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { ToastButton } from "./_components/toast-button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <h1>Hello {session?.user ? session.user.name : "user"}</h1>
        <p> A special message for you {hello.greeting} </p>
        <ToastButton />
      </main>
    </HydrateClient>
  );
}
