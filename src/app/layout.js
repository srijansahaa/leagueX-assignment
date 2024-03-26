import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "LeagueX News - By Srijan Saha",
  description: "This is Srijan's submission for LeagueX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="xl:container mx-auto py-8 font-mono px-4 xl:px-0 dark:bg-slate-900">
        {children}
      </body>
    </html>
  );
}
