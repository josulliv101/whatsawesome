import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomDecimal(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Minimum value must be less than maximum value.");
  }

  const randomNumber = Math.random() * (max - min) + min;

  return Math.round(randomNumber * 10) / 10;
}

export function roundToDecimal(n: number) {
  return Math.round(n * 1) / 1;
}
