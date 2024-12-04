import { Logo } from "./logo";

export function LandingNav() {
  return (
    <header className="w-full bg-primary text-background">
      <nav className="container py-3">
        <Logo />
      </nav>
    </header>
  );
}
