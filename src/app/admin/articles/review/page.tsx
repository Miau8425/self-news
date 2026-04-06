import db from '@/lib/db';
import ReviewTable from './ReviewTable';

export const revalidate = 0;

export default function ReviewArticlesPage() {
  const articles = db.prepare(`
    SELECT a.*, c.name as category_name, u.name as author_name
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN users u ON a.author_id = u.id
    WHERE a.status = 'PENDING_REVIEW'
    ORDER BY a.created_at DESC
  `).all() as any[];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">Kho Bản Thảo Chờ Duyệt</h2>
        <p className="text-gray-500 text-sm mt-1">Xem xét và quyết định xuất bản hoặc từ chối các bài viết đang chờ.</p>
      </div>

      {articles.length > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 px-5 py-4 rounded-2xl text-amber-800 font-medium text-sm flex items-center gap-2">
          <span className="text-lg">📋</span>
          Hiện có <strong className="mx-1">{articles.length}</strong> bài viết đang chờ Tổng Biên Tập xét duyệt.
        </div>
      )}

      <ReviewTable articles={articles} />
    </div>
  );
}
