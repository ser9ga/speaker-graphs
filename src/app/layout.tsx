import type {Metadata} from "next";
import "./globals.css";
import StoreProvider from "@/app/_modules/Store/StoreProvider";
import {ChakraProvider} from "@/app/_modules/Chakra/ChakraProvider";

export const metadata: Metadata = {
  title: "Speaker Graphs",
  description: "Сравнение параметров динамиков в виде графиков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body >
        <StoreProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
