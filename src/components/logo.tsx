import { cva, type VariantProps } from "class-variance-authority";
import { HandCoins } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

const logoVariants = cva("flex items-center font-display", {
  variants: {
    variant: {
      default: "text-2xl font-medium",
      small: "text-lg",
    },
    iconSize: {
      default: "mr-2 h-8 w-8",
      small: "mr-2 h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LogoProps
  extends React.LinkHTMLAttributes<HTMLLinkElement>,
    VariantProps<typeof logoVariants> {}

export function Logo({ variant, iconSize = "default", className }: LogoProps) {
  return (
    <Link href="/" className={cn(logoVariants({ variant, className }))}>
      <HandCoins className={cn(logoVariants({ iconSize }))} />
      Tangka
    </Link>
  );
}
