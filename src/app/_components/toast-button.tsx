"use client";

import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export function ToastButton() {
  const handleClick = () => {
    toast.success("You've clicked me", { description: "hello" });
  };

  return <Button onClick={handleClick}>Click me</Button>;
}
