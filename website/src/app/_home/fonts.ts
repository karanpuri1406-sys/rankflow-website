import { Bangers, Comic_Neue } from "next/font/google";

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
