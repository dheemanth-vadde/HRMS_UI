"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "./utils";

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant?: "primary" | "secondary" | "success" | "warning" | "info";
}

function Progress({
  className,
  value,
  variant = "primary",
  ...props
}: ProgressProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "progress-gradient-secondary";
      case "success":
        return "progress-gradient-success";
      case "warning":
        return "progress-gradient-warning";
      case "info":
        return "progress-gradient-info";
      default:
        return "progress-gradient-primary";
    }
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full flex-1 transition-all", getVariantClass())}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };