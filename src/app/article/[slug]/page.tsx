import db from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { addComment } from './actions';
import parse from 'html-react-parser';
import { MessageOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import SiteHeader from '@/components/SiteHeader';

export const revalidate = 0;

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const article = db.prepare(`
    SELECT a.*, c.name as category_name, u.name as author_name 
    FROM articles a 
    LEFT JOIN categories c ON a.category_id = c.id 
    LEFT JOIN users u ON a.author_id = u.id 
    WHERE a.slug = ? AND a.status = 'PUBLISHED'
  `).get(slug) as any;

  if (!article) return notFound();

  const comments = db.prepare(`SELECT * FROM comments WHERE article_id = ? ORDER BY created_at DESC`).all(article.id) as any[];
  const relatedArticles = db.prepare(`
    SELECT a.*, c.name as category_name FROM articles a 
    JOIN categories c ON a.category_id = c.id
    WHERE a.category_id = ? AND a.id != ? AND a.status = 'PUBLISHED' 
    ORDER BY RANDOM() LIMIT 3
  `).all(article.category_id, article.id) as any[];

  // Check login
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_user');
  let user: any = null;
  if (authCookie) {
    try { user = JSON.parse(authCookie.value); } catch(e) {}
  }

  const handleComment = async (formData: FormData) => {
    'use server';
    await addComment(article.id, slug, formData);
  };

  const readTime = Math.max(3, Math.ceil((article.content || '').replace(/<[^>]*>/g, '').split(' ').length / 200));

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-rose-200">
      
      <SiteHeader variant="article" />

      <main>
        {/* Article Hero — Full-bleed cinematic */}
        <section className="relative w-full h-[65vh] md:h-[75vh] min-h-[420px] flex items-end overflow-hidden bg-gray-100">
          <div className="absolute inset-0">
            {article.thumbnail_img ? (
              <img
                src={article.thumbnail_img}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                 <span className="text-4xl block mb-2">📰</span>
                 <span className="font-bold tracking-widest text-sm">KHÔNG CÓ ẢNH BÌA</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
          <div className="relative max-w-5xl mx-auto w-full px-4 md:px-8 pb-14 md:pb-20">
            <div className="mb-5 flex items-center gap-3 flex-wrap">
              <span className="inline-block bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                {article.category_name}
              </span>
              <span className="text-white/60 text-xs font-bold">{readTime} phút đọc</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-6 max-w-4xl drop-shadow-2xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/70 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><UserOutlined /> {article.author_name || 'Innovators Desk'}</span>
              <span>•</span>
              <span>{format(new Date(article.published_at || article.created_at || Date.now()), 'dd MMM yyyy')}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MessageOutlined /> {comments.length} bình luận</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-14 md:py-20">
          {/* Pull Quote / Summary */}
          {article.summary && (
            <blockquote className="text-xl md:text-2xl font-serif text-gray-600 leading-relaxed mb-14 italic border-l-4 border-rose-600 pl-6 py-2 bg-rose-50/50 rounded-r-xl">
              {article.summary}
            </blockquote>
          )}

          <div className="prose prose-lg md:prose-xl prose-stone max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-p:leading-[1.85] prose-p:text-gray-700
            prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10
            prose-blockquote:border-rose-500 prose-blockquote:bg-rose-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-gray-700
          ">
            {parse(article.content || '<p>Nội dung đang được biên soạn...</p>')}
          </div>

          {/* Tags-like category badge */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-rose-100 hover:text-rose-700 cursor-pointer transition-colors">#{article.category_name?.replace(/\s+/g, '')}</span>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-rose-100 hover:text-rose-700 cursor-pointer transition-colors">#Innovators</span>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-rose-100 hover:text-rose-700 cursor-pointer transition-colors">#TinNóng</span>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-gray-900">
                Đọc Thêm Cùng Chủ Đề
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel: any) => (
                  <Link key={rel.id} href={`/article/${rel.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                    <div className="overflow-hidden h-48">
                      <img src={rel.thumbnail_img} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-black text-rose-600 tracking-widest uppercase mb-2">{rel.category_name}</div>
                      <h4 className="font-bold leading-snug text-gray-900 group-hover:text-rose-700 transition-colors line-clamp-3">{rel.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <hr className="max-w-4xl mx-auto border-gray-200" />

        {/* Comments Section */}
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-16">
          <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
            <MessageOutlined className="text-gray-400" />
            Bình Luận ({comments.length})
          </h3>

          {/* Comment Form — Login gated */}
          {user ? (
            <div className="bg-gray-50 p-6 rounded-2xl mb-12 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black text-white flex items-center justify-center font-black shadow">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-black text-gray-900">{user.username}</div>
                  <div className="text-xs text-gray-500">Đang bình luận với tư cách thành viên</div>
                </div>
              </div>
              <form action={handleComment} className="flex flex-col gap-4">
                <input type="hidden" name="author_name" value={user.username} />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nội Dung Bình Luận</label>
                  <textarea
                    name="content"
                    required
                    placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all resize-none font-medium text-gray-800"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-black hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg">
                    Đăng Bình Luận
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 mb-12 text-center">
              <LockOutlined className="text-3xl text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-5">Bạn cần đăng nhập để bình luận bài viết này.</p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-rose-600 transition-colors shadow-md">
                <UserOutlined /> Đăng Nhập Ngay
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-5">
            {comments.length === 0 ? (
              <div className="text-center text-gray-400 font-medium py-10 italic">
                Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ!
              </div>
            ) : (
              comments.map(c => (
                <div key={c.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-800 text-white flex items-center justify-center font-black text-sm shadow">
                    {(c.author_name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-black text-gray-900 text-sm">{c.author_name}</div>
                      <div className="text-xs font-medium text-gray-400">
                        {format(new Date(c.created_at), 'dd/MM/yyyy HH:mm')}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-[15px]">{c.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#111] text-white py-10 text-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase font-serif mb-2 block hover:text-rose-400 transition-colors">INNOVATORS</Link>
        <p className="text-xs font-bold text-white/40 tracking-widest uppercase">© 2026 Innovators News Network. All rights reserved.</p>
      </footer>
    </div>
  );
}
