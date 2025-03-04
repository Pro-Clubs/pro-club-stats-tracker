import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Spinner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-spin w-4 h-4 rounded-full border-2 border-current border-t-transparent", className)}
      {...props}
    >
      <span className="sr-only">Loading</span>
    </div>
  );
}