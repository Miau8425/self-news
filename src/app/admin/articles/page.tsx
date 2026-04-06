import db from '@/lib/db';
import MyArticlesTable from './MyArticlesTable';

export const revalidate = 0;

export default async function AdminArticlesPage() {
  const articles = db.prepare(`
    SELECT a.*, c.name as category_name, u.name as author_name 
    FROM articles a 
    JOIN categories c ON a.category_id = c.id 
    JOIN users u ON a.author_id = u.id 
    ORDER BY a.created_at DESC
  `).all() as any[];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Kho Bài Của Tôi</h2>
          <p className="text-gray-500 text-sm mt-1">Nơi quản lý toàn bộ các bài viết bạn đã soạn và trạng thái xuất bản.</p>
        </div>
      </div>

      <MyArticlesTable articles={articles} />
    </div>
  );
}
