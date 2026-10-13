"use client";

import type * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

export const Dialog = BaseDialog;

export function DialogBackdrop({ className, ...props }: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return <BaseDialog.Backdrop className={cn("fixed inset-0 z-50 bg-[#191f28]/45", className)} {...props} />;
}

export function DialogPopup({ className, ...props }: React.ComponentProps<typeof BaseDialog.Popup>) {
  return <BaseDialog.Popup className={cn("fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white p-5 shadow-2xl sm:p-7", className)} {...props} />;
}

export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;
export const DialogTitle = BaseDialog.Title;
export const DialogDescription = BaseDialog.Description;
export const DialogPortal = BaseDialog.Portal;
