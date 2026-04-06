import db from '@/lib/db';
import AccountsClient from './AccountsClient';

export const revalidate = 0; // Luôn fetch dữ liệu mới nhất

export default function AccountsPage() {
  // Thực hiện Query trực tiếp SQL
  const users = db.prepare(`SELECT * FROM users`).all() as any[];

  // Lọc dữ liệu chuẩn bị cho 2 bảng
  const dataInternal = users.filter((u: any) => u.status === 'ACTIVE').map((u:any) => ({...u, key: u.id}));
  const dataRequests = users.filter((u: any) => u.status === 'PENDING_APPROVAL').map((u:any) => ({...u, key: u.id}));

  return (
    <AccountsClient initialDataInternal={dataInternal} initialDataRequests={dataRequests} />
  );
}
