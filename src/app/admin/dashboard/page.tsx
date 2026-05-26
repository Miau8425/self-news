import db from '@/lib/db';
import DashboardClient from './DashboardClient';

export const revalidate = 0;

export default function DashboardPage() {
  const stats = db.prepare(`
    SELECT 
      (SELECT COUNT(*) FROM articles WHERE status = 'PUBLISHED') as pub_count,
      (SELECT COUNT(*) FROM articles WHERE status = 'PENDING_REVIEW') as pend_count,
      (SELECT COUNT(*) FROM users) as user_count
  `).get() as any;

  return <DashboardClient stats={stats} />;
}
