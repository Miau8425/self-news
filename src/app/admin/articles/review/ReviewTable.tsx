'use client';
import { useState, useTransition } from 'react';
import { reviewArticle } from '../actions';
import { format } from 'date-fns';
import parse from 'html-react-parser';

export default function ReviewTable({ articles }: { articles: any[] }) {
  const [preview, setPreview] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const handleAction = (articleId: number, action: 'PUBLISHED' | 'REJECTED') => {
    startTransition(async () => {
      await reviewArticle(articleId, action);
      setPreview(null);
    });
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <div className="text-5xl mb-4">✅</div>
        <p className="font-bold text-lg">Không có bài nào đang chờ duyệt!</p>
        <p className="text-sm mt-2">Tất cả bài viết đã được xử lý.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {articles.map((a) => (
          <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm hover:shadow-md transition-shadow">
            {a.thumbnail_img && (
              <img src={a.thumbnail_img} alt="" className="w-full md:w-20 h-20 object-cover rounded-xl flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                  {a.category_name}
                </span>
                <span className="text-xs text-gray-400">
                  {a.author_name} • {format(new Date(a.created_at), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2">{a.title}</h3>
              <p className="text-gray-500 text-xs mt-1 line-clamp-1">{a.summary}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => setPreview(a)}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Xem trước
              </button>
              <button
                onClick={() => handleAction(a.id, 'PUBLISHED')}
                disabled={isPending}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors disabled:opacity-50"
              >
                ✓ Duyệt
              </button>
              <button
                onClick={() => handleAction(a.id, 'REJECTED')}
                disabled={isPending}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-sm font-bold transition-colors disabled:opacity-50"
              >
                ✕ Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{preview.category_name}</span>
                <h2 className="font-black text-lg text-gray-900 mt-0.5">{preview.title}</h2>
              </div>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-black text-2xl leading-none ml-4">×</button>
            </div>
            {preview.thumbnail_img && (
              <img src={preview.thumbnail_img} alt="" className="w-full h-56 object-cover" />
            )}
            <div className="px-6 py-5">
              {preview.summary && (
                <p className="text-gray-600 italic text-lg border-l-4 border-rose-500 pl-4 mb-6">{preview.summary}</p>
              )}
              <div className="prose prose-lg max-w-none text-gray-700">
                {parse(preview.content || '')}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 rounded-b-2xl">
              <button
                onClick={() => handleAction(preview.id, 'PUBLISHED')}
                disabled={isPending}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                ✓ Duyệt Xuất Bản
              </button>
              <button
                onClick={() => handleAction(preview.id, 'REJECTED')}
                disabled={isPending}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                ✕ Từ Chối
              </button>
              <button onClick={() => setPreview(null)} className="px-5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
