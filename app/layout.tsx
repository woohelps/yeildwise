import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "./globals.css";

export const metadata = {
  title: "YieldWise.Ai",
  description: "The wise tool to find and manage high dividend stocks/ETFs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="fantasy">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
      </body>
    </html>
  );
}
