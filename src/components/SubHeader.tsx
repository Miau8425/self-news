import Link from 'next/link';

// Mapping sub-menu dựa trên slug của category cha
const SUB_MENU_MAPPING: Record<string, { label: string, slug: string }[]> = {
  'thoi-su': [
    { label: 'Chính trị', slug: 'chinh-tri' },
    { label: 'Thị trường', slug: 'thi-truong' },
    { label: 'Dân sinh', slug: 'dan-sinh' },
  ],
  'kinh-te': [
    { label: 'Thương mại dịch vụ', slug: 'thuong-mai-dich-vu' },
    { label: 'Công nghiệp - Nông nghiệp', slug: 'cong-nghiep-nong-nghiep' },
  ],
  'tai-chinh': [
    { label: 'Ngân hàng', slug: 'ngan-hang' },
    { label: 'Chứng khoán', slug: 'chung-khoan' },
    { label: 'Bảo hiểm', slug: 'bao-hiem' },
  ],
  'khoi-nghiep': [
    { label: 'Chuyện làm ăn', slug: 'chuyen-lam-an' },
    { label: 'Gương mặt', slug: 'guong-mat' },
  ],
  'khoa-hoc-cong-nghe': [
    { label: 'Chuyển đổi số', slug: 'chuyen-doi-so' },
    { label: 'Đổi mới sáng tạo', slug: 'doi-moi-sang-tao' },
    { label: 'AI', slug: 'ai' },
    { label: 'Sáng kiến', slug: 'sang-kien' },
  ],
  'doi-song': [
    { label: 'Chuyển động trẻ', slug: 'chuyen-dong-tre' },
    { label: 'Sống đẹp', slug: 'song-dep' },
    { label: 'Lifestyle', slug: 'lifestyle' },
  ],
  'the-gioi': [
    { label: 'Thị trường - Doanh nghiệp', slug: 'thi-truong-doanh-nghiep' },
    { label: 'Phân tích', slug: 'phan-tich' },
  ]
};

// Hàm hỗ trợ lấy tên hiển thị đẹp từ slug (để thay cho chữ Tất cả)
const getCategoryName = (slug: string) => {
  const names: Record<string, string> = {
    'thoi-su': 'Thời sự',
    'kinh-te': 'Kinh tế',
    'tai-chinh': 'Tài chính',
    'khoi-nghiep': 'Khởi nghiệp',
    'khoa-hoc-cong-nghe': 'Khoa học - Công nghệ',
    'doi-song': 'Đời sống',
    'the-gioi': 'Thế giới',
    'multimedia': 'Đa phương tiện',
    'video': 'Video',
    'ban-doc': 'Bạn đọc'
  };
  return names[slug] || 'Tất cả';
};

export default function SubHeader({ currentCategory, currentSub }: { currentCategory: string, currentSub?: string }) {
  const subMenus = SUB_MENU_MAPPING[currentCategory];
  const categoryLabel = getCategoryName(currentCategory);

  // Nếu không có sub-menu thì không render thanh này
  if (!subMenus || subMenus.length === 0) return null;

  return (
    <nav className="flex items-center space-x-8 py-4 border-b border-gray-200 overflow-x-auto">
      {/* Thay chữ 'Tất cả' bằng tên Category cha, làm to và đậm hơn */}
      <Link 
        href={`/?category=${currentCategory}`} 
        className={`whitespace-nowrap transition-colors uppercase text-lg font-black ${!currentSub ? 'text-rose-600' : 'text-gray-900 hover:text-rose-600'}`}
      >
        {categoryLabel}
      </Link>
      
      {/* Phân cách nhẹ giữa cha và con */}
      <div className="h-4 w-[1px] bg-gray-300 flex-shrink-0"></div>

      {subMenus.map((sub) => (
        <Link 
          key={sub.slug}
          href={`/?category=${currentCategory}&sub=${sub.slug}`}
          className={`whitespace-nowrap transition-colors uppercase text-sm font-bold ${currentSub === sub.slug ? 'text-rose-600' : 'text-gray-500 hover:text-rose-600'}`}
        >
          {sub.label}
        </Link>
      ))}
    </nav>
  );
}
