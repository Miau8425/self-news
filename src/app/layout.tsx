import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innovators - Trang tin điểm nhấn',
  description: 'Nền tảng báo chí hàng đầu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased bg-gray-50 text-gray-900">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
