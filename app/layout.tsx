import TamboProviderWrapper from "@/components/TamboProviderWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TamboProviderWrapper>
          {children}
        </TamboProviderWrapper>
      </body>
    </html>
  );
}
