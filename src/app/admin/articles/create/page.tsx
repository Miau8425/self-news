'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import { Form, Input, Select, message, Modal } from 'antd';
import { 
  BoldOutlined, ItalicOutlined, StrikethroughOutlined, 
  OrderedListOutlined, UnorderedListOutlined,
  AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
  PictureOutlined, LinkOutlined, YoutubeOutlined,
  SaveOutlined 
} from '@ant-design/icons';
import { useTransition, useState } from 'react';
import { submitArticle } from '../actions';
import { useRouter } from 'next/navigation';

const { Option } = Select;

// Mapping mục con theo slug mục chính
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

// Ánh xạ ID sang slug để lấy Sub-menu
const CATEGORY_ID_TO_SLUG: Record<number, string> = {
  1: 'thoi-su', 2: 'kinh-te', 3: 'tai-chinh', 4: 'khoi-nghiep',
  5: 'khoa-hoc-cong-nghe', 6: 'doi-song', 7: 'the-gioi',
  8: 'multimedia', 9: 'video', 10: 'ban-doc'
};

const MenuBar = ({ editor, onOpenUrlModal }: { editor: any, onOpenUrlModal: (type: 'image'|'link'|'youtube', init?: string) => void }) => {
  if (!editor) return null;
  return (
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border border-gray-200 p-2 rounded-2xl shadow-sm flex flex-wrap gap-2 items-center mb-8 mx-auto xl:-ml-[60px] max-w-[800px] transition-all">
      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${editor.isActive('bold') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}><BoldOutlined /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('italic') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}><ItalicOutlined /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('strike') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}><StrikethroughOutlined /></button>
      </div>
      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1 ml-auto">
        <button type="button" onClick={() => onOpenUrlModal('link', editor.getAttributes('link').href)} className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-100"><LinkOutlined /></button>
        <button type="button" onClick={() => onOpenUrlModal('image')} className="w-9 h-9 flex items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-100"><PictureOutlined /></button>
        <button type="button" onClick={() => onOpenUrlModal('youtube')} className="w-9 h-9 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 border border-red-100"><YoutubeOutlined /></button>
      </div>
    </div>
  );
};

export default function CreateArticlePage() {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [thumbUrl, setThumbUrl] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'image'|'link'|'youtube'>('link');
  const [modalUrl, setModalUrl] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: 'rounded-xl shadow-md my-8 mx-auto' } }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Youtube.configure({ HTMLAttributes: { class: 'w-full aspect-video rounded-xl shadow-lg' } }),
      Placeholder.configure({ placeholder: 'Bắt đầu viết nội dung bài báo...' }),
    ],
    immediatelyRender: false,
    content: '',
  });

  const handleUrlSubmit = () => {
    if (!editor) return;
    const url = modalUrl.trim();
    if (modalType === 'image' && url) (editor.chain().focus() as any).setImage({ src: url }).run();
    else if (modalType === 'youtube' && url) (editor.commands as any).setYoutubeVideo({ src: url });
    else if (modalType === 'link') url ? editor.chain().focus().setLink({ href: url }).run() : editor.chain().focus().unsetLink().run();
    setModalOpen(false);
    setModalUrl('');
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const htmlContent = editor?.getHTML() || '';
      if (!title.trim() || !summary.trim() || !htmlContent || htmlContent === '<p></p>') {
        message.error('Vui lòng nhập đầy đủ Tiêu đề, Sapo và Nội dung!');
        return;
      }
      startTransition(async () => {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('summary', summary);
        fd.append('content', htmlContent);
        fd.append('categoryId', String(values.categoryId));
        if (values.subcategorySlug) fd.append('subcategorySlug', values.subcategorySlug);
        fd.append('status', values.status || 'PENDING_REVIEW');
        fd.append('thumbnailUrl', thumbUrl || '');
        fd.append('tags', values.tags || '');

        const res = await submitArticle(fd);
        if (res.success) {
          message.success('Bài viết đã được nộp!');
          router.push('/admin/articles');
        } else message.error(res.error);
      });
    });
  };

  const currentSlug = selectedCatId ? CATEGORY_ID_TO_SLUG[selectedCatId] : null;
  const subMenuOptions = currentSlug ? SUB_MENU_MAPPING[currentSlug] : null;

  return (
    <div className="max-w-[1400px] mx-auto pb-32">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12 items-start">
        <div className="pt-8 px-4 md:px-10 max-w-[900px] w-full mx-auto">
          <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề bài báo..." className="w-full text-4xl md:text-5xl lg:text-6xl font-black border-none outline-none resize-none bg-transparent mb-6" />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Tóm tắt Sapo..." className="w-full text-xl font-serif border-none outline-none resize-none bg-transparent mb-10 pl-6 border-l-4 border-rose-500" />
          <MenuBar editor={editor} onOpenUrlModal={(type, init) => { setModalType(type); setModalUrl(init || ''); setModalOpen(true); }} />
          <EditorContent editor={editor} className="min-h-[500px] prose prose-xl max-w-none font-serif" />
        </div>

        <div className="sticky top-24 px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-6">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">🚀 Xuất bản</h3>
            <Form form={form} layout="vertical">
              <Form.Item name="thumbnailUrl" label="ẢNH BÌA (URL)">
                <Input placeholder="Link ảnh..." onChange={(e) => setThumbUrl(e.target.value)} />
              </Form.Item>
              {thumbUrl && <img src={thumbUrl} className="mb-4 rounded-xl aspect-video object-cover" />}

              <Form.Item name="categoryId" label="CHUYÊN MỤC CHÍNH" rules={[{ required: true }]}>
                <Select placeholder="Chọn mục chính..." size="large" onChange={(val) => { setSelectedCatId(val); form.setFieldValue('subcategorySlug', undefined); }}>
                  <Option value={1}>THỜI SỰ</Option>
                  <Option value={2}>KINH TẾ</Option>
                  <Option value={3}>TÀI CHÍNH</Option>
                  <Option value={4}>KHỞI NGHIỆP</Option>
                  <Option value={5}>KHCN</Option>
                  <Option value={6}>ĐỜI SỐNG</Option>
                  <Option value={7}>THẾ GIỚI</Option>
                  <Option value={8}>MULTIMEDIA</Option>
                  <Option value={9}>VIDEO</Option>
                  <Option value={10}>BẠN ĐỌC</Option>
                </Select>
              </Form.Item>

              {subMenuOptions && (
                <Form.Item name="subcategorySlug" label="MỤC CON (SUB-CATEGORY)">
                  <Select placeholder="Chọn mục con chi tiết..." size="large">
                    {subMenuOptions.map(sub => <Option key={sub.slug} value={sub.slug}>{sub.label.toUpperCase()}</Option>)}
                  </Select>
                </Form.Item>
              )}

              <Form.Item name="tags" label="SEO TAGS"><Input placeholder="#tag..." /></Form.Item>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button type="button" onClick={() => { form.setFieldsValue({status: 'DRAFT'}); handleSubmit(); }} className="py-3 border rounded-xl font-bold hover:bg-gray-100"><SaveOutlined /> LƯU NHÁP</button>
                <button type="button" onClick={() => { form.setFieldsValue({status: 'PUBLISHED'}); handleSubmit(); }} className="py-3 bg-black text-white rounded-xl font-bold hover:bg-rose-700">NỘP BÀI</button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={handleUrlSubmit} title="Nhập liên kết">
        <Input value={modalUrl} onChange={(e) => setModalUrl(e.target.value)} />
      </Modal>
    </div>
  );
}