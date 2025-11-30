import React, { forwardRef, HTMLAttributes } from "react";
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import cn from "classnames";

export const DialogRoot = Root;
DialogRoot.displayName = "DialogRoot";

export const DialogPortal = Portal;
DialogPortal.displayName = "DialogPortal";

export const DialogTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <Trigger
    ref={ref}
    asChild={true}
    className={cn(props.className)}
    {...props}
  />
));
DialogTrigger.displayName = "DialogTrigger";

export const DialogOverlay = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <Overlay
    ref={ref}
    className={cn(
      "bg-black opacity-30 w-[100vw] h-[100vh] fixed",
      props.className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <Content
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-40 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-[var(--background)] border border-[var(--foreground-low)] p-4 rounded-2xl shadow-[var(--shadow-effect)]",
      props.className
    )}
    {...props}
  />
));
DialogContent.displayName = "DialogContent";

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>((props, ref) => (
  <Title
    ref={ref}
    className={cn("text-center text-4xl mb-6", props.className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => (
  <Description
    ref={ref}
    className={cn(
      "text-center bg-[var(--background-low)] rounded-2xl p-4",
      props.className
    )}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export const DialogClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <Close
    ref={ref}
    asChild={true}
    className={cn("custom-close", props.className)}
    {...props}
  />
));
DialogClose.displayName = "DialogClose";
