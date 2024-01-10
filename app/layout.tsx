import '@/app/ui/global.css';
import { inter, lusitana } from '@/app/ui/fonts'
//https://nextjs.org/learn/dashboard-app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
