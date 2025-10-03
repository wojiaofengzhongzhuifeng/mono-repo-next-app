import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { get, post } from "@mono-repo/utils"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { get, post }
