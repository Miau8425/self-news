import Link from 'next/link';
import db from '@/lib/db';
import SiteHeader from '@/components/SiteHeader';
import SubHeader from '@/components/SubHeader';

export const revalidate = 0;

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category?: string; sub?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category || null;
  const currentSub = resolvedSearchParams.sub || null;

  let featuredQuery = `SELECT a.*, c.name as category_name FROM articles a JOIN categories c ON a.category_id = c.id WHERE a.status = 'PUBLISHED' AND a.is_featured = 1`;
  let latestQuery = `SELECT a.*, c.name as category_name FROM articles a JOIN categories c ON a.category_id = c.id WHERE a.status = 'PUBLISHED'`;
  
  let params: any[] = [];
  if (currentCategory) {
    featuredQuery += ` AND c.slug = ?`;
    latestQuery += ` AND c.slug = ?`;
    params.push(currentCategory);

    if (currentSub) {
      featuredQuery += ` AND a.subcategory_slug = ?`;
      latestQuery += ` AND a.subcategory_slug = ?`;
      params.push(currentSub);
    }
  }
  featuredQuery += ` ORDER BY a.published_at DESC LIMIT 8`;
  latestQuery += ` ORDER BY a.published_at DESC LIMIT 20`;

  let dbFeaturedArticles = db.prepare(featuredQuery).all(...params) as any[];
  const latestStories = db.prepare(latestQuery).all(...params) as any[];
  const categories = db.prepare(`SELECT * FROM categories LIMIT 10`).all() as any[];

  // Fallback nếu thiếu bài nổi bật 
  if (dbFeaturedArticles.length < 6) {
    dbFeaturedArticles = [...dbFeaturedArticles, ...latestStories, ...latestStories].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i).slice(0, 8);
  }
  
  const leadStory = dbFeaturedArticles[0] || {};
  const sideStories = dbFeaturedArticles.slice(1, 5) || [];
  const bottomStories = dbFeaturedArticles.slice(5, 8) || [];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      <SiteHeader currentCategory={currentCategory} />

      {/* Phân hệ điều hướng cấp 2 (SubHeader) */}
      {currentCategory && (
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SubHeader currentCategory={currentCategory} currentSub={currentSub || undefined} />
        </div>
      )}

      {/* Page Title */}
      

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-6 md:py-8">
        
        {/* Top Section: Lead Story (2/3) & Latest News (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Lead Story */}
          <div className="lg:col-span-8 flex flex-col group cursor-pointer -mx-5 md:mx-0">
            <Link href={`/article/${leadStory.slug}`}>
               <div className="relative overflow-hidden mb-4 md:mb-6 rounded-none md:rounded-2xl shadow-sm md:shadow-xl">
                 <img src={leadStory.thumbnail_img || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"} alt="Lead Cover" className="w-full h-[280px] sm:h-[400px] lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>
               <div className="pr-4 px-5 md:px-0">
                 <div className="mb-4 text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                    <span>{leadStory.category_name || "Công Nghệ"}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-500">Vừa đăng</span>
                 </div>
                 <h2 className="text-5xl font-black leading-tight mb-4 group-hover:text-rose-700 transition-colors decoration-rose-700 decoration-4 underline-offset-8 group-hover:underline">
                   {leadStory.title || "Tựa đề mặc định rất dài để mô phỏng Reuters"}
                 </h2>
                 <p className="text-gray-600 text-xl leading-relaxed mt-4 font-serif">
                   {leadStory.summary || "Bản tóm tắt chi tiết của Reuters thường có khoảng 2 đến 3 dòng nhằm giải thích thêm cho tiêu đề chính, cung cấp cái nhìn tổng quan nhất cho độc giả trước khi bấm vào đọc chi tiết bài báo."}
                 </p>
                 <div className="mt-4 text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                   <span>{leadStory.category_name || "Technology"}</span>
                   <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                   <span>3 phút trước</span>
                 </div>
               </div>
            </Link>
          </div>

          {/* Right Column: Latest & Trending */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-gray-200">
            <div className="flex items-center gap-2 mb-8">
               <div className="w-3 h-3 bg-rose-600 animate-pulse rounded-full"></div>
               <h3 className="font-black text-xl uppercase tracking-widest text-gray-900 border-b-2 border-black pb-1 inline-block">Nổi Bật</h3>
            </div>
            
            <div className="flex flex-col gap-6">
              {sideStories.map((story, i) => (
                <Link href={`/article/${story.slug}`} key={i} className="group border-b border-gray-100 pb-6 last:border-0 block transition-colors">
                  <div className="text-[10px] font-black tracking-widest text-rose-600 mb-2 uppercase">
                    {story.category_name || 'Innovators'}
                  </div>
                  <h4 className="text-[19px] font-bold leading-snug group-hover:text-rose-700 decoration-rose-700 decoration-2 underline-offset-4 group-hover:underline">
                    {story.title}
                  </h4>
                </Link>
              ))}
            </div>
            
          </div>

        </div>

        {/* Bottom Section: 3 Columns Wide Grid */}
        <div className="border-t-2 border-black pt-8">
           <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-gray-900">Tin Tức Nổi Bật Khác</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bottomStories.map((story, i) => (
                 <Link href={`/article/${story.slug}`} key={i} className="group cursor-pointer flex flex-col">
                    <div className="overflow-hidden mb-4 AspectRatio aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
                      {story.thumbnail_img ? (
                        <img src={story.thumbnail_img} alt="Thumb" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                      ) : (
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">NO IMAGE</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-amber-600 uppercase mb-2 block">{story.category_name}</div>
                      <h4 className="text-xl font-bold leading-snug group-hover:text-blue-700 line-clamp-3">
                        {story.title}
                      </h4>
                    </div>
                 </Link>
              ))}
           </div>
        </div>

        {/* Latest Feed Section */}
        {latestStories.length > 0 && (
          <div className="border-t border-gray-200 mt-12 pt-10">
             <div className="flex items-center gap-3 mb-8">
               <h3 className="font-black text-2xl uppercase tracking-wider text-gray-900 border-b-4 border-black pb-1 inline-block">Mới Cập Nhật</h3>
             </div>
             
             <div className="flex flex-col gap-8 max-w-4xl">
               {latestStories.map((story: any, i: number) => (
                 <Link href={`/article/${story.slug}`} key={i} className="group flex flex-col sm:flex-row gap-5 items-start border-b border-gray-100 pb-8 last:border-0">
                   <div className="w-full sm:w-[240px] aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
                     {story.thumbnail_img ? (
                       <img src={story.thumbnail_img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     ) : (
                       <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">NO IMAGE</span>
                     )}
                   </div>
                   <div className="flex-1">
                     <div className="text-xs font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       {story.category_name}
                       <span className="text-gray-400 font-bold text-[10px]">• 1 giờ trước</span>
                     </div>
                     <h4 className="text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-rose-700 decoration-rose-700 decoration-2 underline-offset-4 group-hover:underline">
                       {story.title}
                     </h4>
                     <p className="text-gray-500 font-serif text-[15px] line-clamp-2 md:line-clamp-3">
                       {story.summary}
                     </p>
                   </div>
                 </Link>
               ))}
             </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#111] text-white py-14 mt-12 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-5 lg:px-8">
           {/* Top Footer: Links */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm mb-12">
             <div>
               <h4 className="font-black uppercase tracking-widest mb-5 text-white/50 text-xs">Về Chúng Tôi</h4>
               <ul className="space-y-3 text-white/70">
                 <li><Link href="#" className="hover:text-white transition-colors">Giới thiệu</Link></li>
                 {/* <li><Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link></li> */}
                 <li><Link href="#" className="hover:text-white transition-colors">Liên hệ tòa soạn</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-black uppercase tracking-widest mb-5 text-white/50 text-xs">Chuyên Mục</h4>
               <ul className="space-y-3 text-white/70">
                 {categories.map((cat: any) => (
                   <li key={cat.id}><Link href={`/?category=${cat.slug}`} className="hover:text-white transition-colors uppercase">{cat.name}</Link></li>
                 ))}
               </ul>
             </div>
             <div>
               <h4 className="font-black uppercase tracking-widest mb-5 text-white/50 text-xs">Chính Sách</h4>
               <ul className="space-y-3 text-white/70">
                 <li><Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Chính sách quyền riêng tư</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Quy chế hoạt động</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-black uppercase tracking-widest mb-5 text-white/50 text-xs">Kết Nối</h4>
               <ul className="space-y-3 text-white/70">
                 <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">YouTube</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">TikTok</Link></li>
               </ul>
             </div>
           </div>

           {/* Bottom Footer: License & Info */}
           <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row gap-8 items-start">
             {/* Logo Khởi Nghiệp Trẻ sử dụng icon.png */}
             <div className="bg-white p-6 rounded-sm w-56 flex-shrink-0 flex items-center justify-center">
              <img 
                src="/icon.png" 
                alt="Khởi Nghiệp Trẻ" 
                className="w-full h-auto object-contain" 
              />
            </div>

             {/* Thông tin chi tiết */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[15px] text-white/60 leading-relaxed flex-1">
                <div className="space-y-1">
                  <p>Cơ quan chủ quản: <span className="text-white/90">Hội Doanh nhân trẻ Việt Nam</span></p>
                  <p>Tổng Biên tập: <span className="text-white/90">Nguyễn Ngọc Ánh</span></p>
                  <p>Phó Tổng Biên tập: <span className="text-white/90">Nguyễn Minh Châu</span></p>
                  <p>Ngày thành lập: <span className="text-white/90">Ngày 20 tháng 03 năm 2026</span></p>
                </div>
                <div className="space-y-1">
                  <p>Địa chỉ: 10-12 Đinh Tiên Hoàng, P.Sài Gòn, TP.HCM</p>
                  <p>Điện thoại: 0349531735</p>
                  <p>Email: <a href="mailto:toasoan@khoinghieptre.vn" className="hover:text-white">toasoan@khoinghieptre.vn</a></p>
                  <p>Liên hệ quảng cáo: <a href="mailto:quangcao@khoinghieptre.vn" className="hover:text-white">quangcao@khoinghieptre.vn</a></p>
                </div>
             </div>
           </div>

           <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
              <p className="text-[10px] text-white/30 tracking-widest uppercase">
                © 2026 MẠNG LƯỚI TIN TỨC INNOVATORS. BẢO LƯU MỌI QUYỀN.
              </p>
           </div>
         </div>
      </footer>
    </div>
  );
}