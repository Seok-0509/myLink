import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-md bg-[#f2f4f6] px-2 py-1 text-xs font-medium text-[#8b95a1]", className)} {...props} />;
}
