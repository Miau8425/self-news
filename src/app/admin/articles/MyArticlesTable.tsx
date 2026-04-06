'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { Tag, Pagination, message } from 'antd';
import parse from 'html-react-parser';
import Link from 'next/link';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import EditArticleModal from './EditArticleModal';

export default function MyArticlesTable({ articles }: { articles: any[] }) {
  const [preview, setPreview] = useState<any>(null);
  const [editModal, setEditModal] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedArticles = articles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusTag = (status: string) => {
    switch(status) {
      case 'DRAFT': return <Tag color="default">💾 Lưu Nháp</Tag>;
      case 'PENDING_REVIEW': return <Tag color="warning">⏳ Đang Chờ Duyệt</Tag>;
      case 'PUBLISHED': return <Tag color="success">✅ Đã Xuất Bản</Tag>;
      case 'REJECTED': return <Tag color="error">❌ Bị Từ Chối</Tag>;
      default: return <Tag>{status}</Tag>;
    }
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
        <div className="text-5xl mb-4">📭</div>
        <p className="font-bold text-lg">Bạn chưa có bài viết nào !</p>
        <p className="text-sm mt-2">Hãy vào mục "Viết Bài Mới" để bắt đầu sáng tạo nội dung.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {paginatedArticles.map((a) => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center shadow-sm hover:shadow-md transition-all">
            {a.thumbnail_img ? (
              <img src={a.thumbnail_img} alt="" className="w-full md:w-[120px] aspect-video object-cover rounded-xl flex-shrink-0 border border-gray-100" />
            ) : (
                <div className="w-full md:w-[120px] aspect-video rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">NO IMAGE</div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">
                  {a.category_name}
                </span>
                <span className="text-xs font-medium text-gray-400 font-serif">
                  {format(new Date(a.created_at), 'dd/MM/yyyy • HH:mm')}
                </span>
                <div className="ml-auto md:ml-0 scale-90 origin-left">
                  {getStatusTag(a.status)}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 md:line-clamp-1 mb-1">{a.title}</h3>
              <p className="text-gray-500 text-sm font-serif line-clamp-1">{a.summary}</p>
            </div>
            
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-none mt-2 md:mt-0">
              <button
                onClick={() => setPreview(a)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                title="Xem trước"
              >
                <EyeOutlined /> Xem
              </button>
              <button
                onClick={() => setEditModal(a)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                title="Chỉnh sửa"
              >
                <EditOutlined /> Sửa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination 
          current={currentPage} 
          pageSize={pageSize} 
          total={articles.length} 
          onChange={(page) => setCurrentPage(page)} 
          showSizeChanger={false}
        />
      </div>

      {/* Preview Modal (Read Only) */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div
            className="bg-white rounded-3xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 md:px-10 py-5 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-3">
                 {getStatusTag(preview.status)}
                 <span className="text-xs text-gray-400 font-medium">{format(new Date(preview.created_at), 'dd/MM/yyyy HH:mm')}</span>
              </div>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-black hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <span className="text-2xl leading-none block -mt-1">&times;</span>
              </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto w-full relative">
               <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
                  <div className="mb-8">
                     <span className="text-xs font-black text-rose-600 uppercase tracking-widest">{preview.category_name}</span>
                     <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 leading-tight tracking-tight">{preview.title}</h1>
                  </div>

                  {preview.thumbnail_img && (
                    <div className="w-full aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden mb-10 shadow-inner">
                       <img src={preview.thumbnail_img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {preview.summary && (
                    <p className="text-gray-600 font-serif text-xl md:text-2xl leading-relaxed border-l-4 border-rose-500 pl-6 mb-10 italic">
                      {preview.summary}
                    </p>
                  )}

                  <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 font-serif leading-relaxed">
                    {parse(preview.content || '')}
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
               <button onClick={() => setPreview(null)} className="px-6 py-2.5 bg-black text-white font-bold rounded-xl transition-all hover:bg-rose-600 hover:scale-[1.02]">
                 Đóng
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal Component */}
      {editModal && (
        <EditArticleModal 
          article={editModal} 
          onClose={() => setEditModal(null)} 
        />
      )}
    </>
  );
}
