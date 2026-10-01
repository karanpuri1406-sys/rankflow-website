import { Anton, Bangers, Comic_Neue, Special_Elite } from "next/font/google";

/* Comic-book lettering for headings, a readable comic hand for body copy. */
export const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bangers",
});

export const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic",
});

/* The noir strip: typewriter captions and a condensed headline face. */
export const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-typewriter",
});

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-condensed",
});
