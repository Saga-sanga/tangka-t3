import Link from "next/link";
import { Logo } from "./logo";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";

export function LandingNav() {
  return (
    <header className="w-full border-b text-primary">
      <nav className="container flex items-center justify-between py-4">
        <Logo />
        <div className="space-x-4">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Login
          </Link>
          <Link href="/signup" className={cn(buttonVariants())}>
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
