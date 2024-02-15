import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomDecimal(min: number, max: number): number {
  return 1;
  // if (min >= max) {
  //   throw new Error("Minimum value must be less than maximum value.");
  // }

  // const randomNumber = Math.random() * (max - min) + min;

  // return Math.round(randomNumber * 10) / 10;
}

export function roundToInteger(n: number) {
  return Math.round(n * 1) / 1;
}

export function roundToDecimal(n: number, places: number = 2) {
  return Math.round((n + Number.EPSILON) * (10 ^ places)) / (10 ^ places);
}

export function roundToNearestHalf(num: number) {
  return Math.round(num / 0.5) * 0.5;
}
