import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | undefined)[]) {
  return twMerge(classNames(...classes));
}
