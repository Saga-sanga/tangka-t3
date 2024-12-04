import { HandCoins } from "lucide-react";
import Link from "next/link";
import UserAuthForm from "~/components/forms/user-auth-form";
import { Logo } from "~/components/logo";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function Page() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative col-span-1 grid place-items-center space-y-6">
        <Link
          className={cn(
            "absolute left-4 top-4 md:left-8 md:top-8",
            buttonVariants({ variant: "ghost" }),
          )}
          href="/login"
        >
          Login
        </Link>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground sm:w-80">
            By clicking continue, you agree to our{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/terms"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="col-span-1 hidden flex-col bg-primary p-10 text-background lg:flex">
        <Logo />
        <div className="mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;I bible zawhna zawng zawngte chhanna i dawn theihna
              hmun.&rdquo;
            </p>
            <footer className="text-sm">Mizo Apologia</footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
