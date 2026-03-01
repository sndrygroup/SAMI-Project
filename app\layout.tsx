import "./globals.css";
import Providers from "./components/providers";

export const metadata = {
  title: "SAMI - مساعدك التسويقي الذكي",
  description: "SAMI هو مساعدك التسويقي الذكي، مبني ليجمع بين التقنية، الإبداع، والتحليل.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0A090C] text-[#D1D1D6]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
