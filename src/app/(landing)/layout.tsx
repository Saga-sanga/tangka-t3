import { Logo } from "~/components/logo";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full bg-primary text-background">
        <nav className="container">
          <Logo />
        </nav>
      </header>
      {children}
    </>
  );
}
