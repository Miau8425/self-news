'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, Input, Select, message, Modal } from 'antd';
import { 
  BoldOutlined, ItalicOutlined, StrikethroughOutlined, 
  OrderedListOutlined, UnorderedListOutlined,
  AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
  PictureOutlined, LinkOutlined, YoutubeOutlined,
  RocketOutlined, SaveOutlined 
} from '@ant-design/icons';
import { useTransition, useRef, useState, useEffect } from 'react';
import { submitArticle } from '../actions';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const MenuBar = ({ editor, onOpenUrlModal }: { editor: any, onOpenUrlModal: (type: 'image'|'link'|'youtube', init?: string) => void }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border border-gray-200 p-2 rounded-2xl shadow-sm flex flex-wrap gap-2 items-center mb-8 mx-auto xl:-ml-[60px] max-w-[800px] transition-all">
      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${editor.isActive('bold') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="In đậm">
          <BoldOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('italic') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="In nghiêng">
          <ItalicOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('strike') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Gạch ngang">
          <StrikethroughOutlined />
        </button>
      </div>

      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`w-10 h-9 flex items-center justify-center rounded-lg text-sm font-black transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Tiêu đề H2">
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`w-10 h-9 flex items-center justify-center rounded-lg text-sm font-black transition-all ${editor.isActive('heading', { level: 3 }) ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Tiêu đề H3">
          H3
        </button>
      </div>

      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1">
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Căn trái">
          <AlignLeftOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Căn giữa">
          <AlignCenterOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive({ textAlign: 'justify' }) ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Căn đều">
          <AlignRightOutlined />
        </button>
      </div>

      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('bulletList') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Danh sách">
          <UnorderedListOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('orderedList') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Danh sách số">
          <OrderedListOutlined />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`w-9 h-9 flex items-center justify-center rounded-lg font-serif text-lg font-bold transition-all ${editor.isActive('blockquote') ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`} title="Trích dẫn">
          "
        </button>
      </div>

      <div className="flex bg-gray-100/50 rounded-xl p-1 gap-1 ml-auto">
        <button type="button" onClick={() => onOpenUrlModal('link', editor.getAttributes('link').href)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${editor.isActive('link') ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-50'} border border-blue-100`} title="Chèn Link">
          <LinkOutlined />
        </button>
        <button type="button" onClick={() => onOpenUrlModal('image')}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all text-emerald-600 hover:bg-emerald-50 border border-emerald-100" title="Chèn Ảnh">
          <PictureOutlined />
        </button>
        <button type="button" onClick={() => onOpenUrlModal('youtube')}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all text-red-600 hover:bg-red-50 border border-red-100" title="Chèn Youtube">
          <YoutubeOutlined />
        </button>
      </div>
    </div>
  );
};

export default function CreateArticlePage() {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [thumbUrl, setThumbUrl] = useState('');
  const router = useRouter();

  // URL Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'image'|'link'|'youtube'>('link');
  const [modalUrl, setModalUrl] = useState('');

  // Title and Summary state
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleOpenModal = (type: 'image'|'link'|'youtube', initUrl = '') => {
    setModalType(type);
    setModalUrl(initUrl || '');
    setModalOpen(true);
  };

  const handleUrlSubmit = () => {
    if (!editor) return;
    const url = modalUrl.trim();
    
    if (modalType === 'image' && url) {
      (editor.chain().focus() as any).setImage({ src: url }).run();
    } else if (modalType === 'youtube' && url) {
      (editor.commands as any).setYoutubeVideo({ src: url, width: 640, height: 480 });
    } else if (modalType === 'link') {
      if (url) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      } else {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      }
    }
    
    setModalOpen(false);
    setModalUrl('');
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, HTMLAttributes: { class: 'rounded-xl shadow-md my-8 mx-auto max-w-full' } }) as any,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline font-medium' } }) as any,
      TextAlign.configure({ types: ['heading', 'paragraph'] }) as any,
      Youtube.configure({ HTMLAttributes: { class: 'w-full aspect-video rounded-xl shadow-lg my-8 mx-auto' } }) as any,
      (Image as any).configure({ inline: true, HTMLAttributes: { class: 'rounded-xl shadow-md my-8 mx-auto max-w-full' } }),
      (Link as any).configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline font-medium' } }),
      (TextAlign as any).configure({ types: ['heading', 'paragraph'] }),
      (Youtube as any).configure({ HTMLAttributes: { class: 'w-full aspect-video rounded-xl shadow-lg my-8 mx-auto' } }),
      (Placeholder as any).configure({ placeholder: 'Bắt đầu viết nội dung bài báo của bạn tại đây...', emptyEditorClass: 'is-empty' }),
    ],
    immediatelyRender: false,
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg md:prose-xl lg:prose-2xl max-w-none focus:outline-none min-h-[500px] text-gray-800 font-serif leading-relaxed',
      },
    },
  });

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const htmlContent = editor?.getHTML() || '';
      if (!title?.trim()) { message.error('Vui lòng nhập tiêu đề bài viết!'); return; }
      if (!summary?.trim()) { message.error('Vui lòng nhập đoạn tóm tắt sa-po!'); return; }
      if (!htmlContent || htmlContent === '<p></p>') {
        message.error('Nội dung bài viết không được để trống!');
        return;
      }

      startTransition(async () => {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('summary', summary);
        fd.append('content', htmlContent);
        fd.append('categoryId', String(values.categoryId));
        fd.append('status', values.status || 'PENDING_REVIEW');
        fd.append('thumbnailUrl', thumbUrl || '');
        fd.append('tags', values.tags || '');

        const res = await submitArticle(fd);
        if (res.success) {
          message.success('Bài viết đã được thiết lập thành công!');
          setTimeout(() => {
            router.push('/admin/articles');
          }, 1000);
        } else {
          message.error(res.error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        }
      });
    }).catch(() => {
      message.error('Vui lòng kiểm tra lại thiết lập nằm ở cột bên phải.');
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-32">
      <style dangerouslySetInnerHTML={{__html: `
        .tiptap p.is-empty::first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .tiptap blockquote {
          border-left: 4px solid #000;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.5rem 0;
        }
      `}} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12 items-start">
        
        {/* Lõi viết bài Medium/Notion style */}
        <div className="pt-8 md:pt-12 px-4 md:px-10 max-w-[900px] w-full mx-auto xl:mx-0">
          <div className="mb-6 mb-8 border-b-2 border-black pb-2 inline-block">
            <h2 className="text-sm font-black tracking-widest text-gray-900 uppercase">Soạn Nội Dung</h2>
          </div>
            
          {/* Title AutoResize Input */}
          <div className="mb-6">
             <textarea 
               value={title}
               onChange={(e) => { setTitle(e.target.value); handleTextareaResize(e); }}
               rows={1}
               placeholder="Tiêu đề bài báo..."
               title="Nhập tiêu đề của bài báo"
               className="w-full text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 border-none outline-none resize-none overflow-hidden placeholder-gray-300 leading-tight bg-transparent px-0"
               style={{ minHeight: '60px' }}
             />
          </div>

          {/* Sapo AutoResize Input */}
          <div className="mb-0 relative py-2 mb-10">
             <div className="absolute left-0 top-3 bottom-3 w-[5px] bg-rose-500 rounded-full" />
             <textarea 
               value={summary}
               onChange={(e) => { setSummary(e.target.value); handleTextareaResize(e); }}
               rows={2}
               placeholder="Viết một đoạn tóm tắt mở đầu (Sapo) thu hút độc giả..."
               title="Nhập đoạn tóm tắt Sapo"
               className="w-full text-xl md:text-2xl text-gray-600 font-serif border-none outline-none resize-none overflow-hidden placeholder-gray-300 bg-transparent pl-6 py-1 leading-relaxed"
               style={{ minHeight: '80px' }}
             />
          </div>

          {/* Editor Core */}
          <div className="mt-12 group">
            <MenuBar editor={editor} onOpenUrlModal={handleOpenModal} />
            <EditorContent editor={editor} className="min-h-[60vh]" />
          </div>
        </div>

        {/* Custom URL Input Modal */}
        <Modal 
          open={modalOpen} 
          title={modalType === 'image' ? 'Nhập URL Hình Ảnh' : modalType === 'youtube' ? 'Nhập URL Video Youtube' : 'Nhập URL Đường Dẫn (Link)'}
          onCancel={() => setModalOpen(false)}
          onOk={handleUrlSubmit}
          okText="Xác nhận"
          cancelText="Hủy"
          centered
        >
           <Input 
             autoFocus 
             value={modalUrl} 
             onChange={(e) => setModalUrl(e.target.value)} 
             placeholder={modalType === 'link' ? 'https://example.com' : 'https://...'}
             onPressEnter={handleUrlSubmit}
             className="mt-4 mb-2 rounded-xl"
             size="large"
           />
        </Modal>

        {/* Cột Cài đặt xuất bản */}
        <div className="sticky top-24 px-4 xl:px-0 z-[20] w-full mb-12 xl:mb-0">
          <div className="bg-white/70 backdrop-blur-3xl border border-white/80 shadow-2xl shadow-gray-200/50 rounded-3xl p-6 relative overflow-visible">
             {/* Glass reflection effect */}
             <div className="absolute inset-x-0 -top-10 h-20 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none" />
             
             <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
               🚀 Cài Đặt Xuất Bản
             </h3>

             <Form form={form} layout="vertical" requiredMark={false} className="space-y-5">
               
               {/* Ảnh bìa Cover */}
               <div>
                  <Form.Item name="thumbnailUrl" label={<span className="font-bold text-gray-700 text-xs uppercase tracking-widest">Ảnh Bìa (URL)</span>} className="mb-0">
                    <Input 
                      placeholder="https://g.com/anh.jpg" 
                      className="rounded-xl border-gray-200/80 bg-white/50 focus:bg-white transition-all text-sm py-2.5" 
                      onChange={(e) => setThumbUrl(e.target.value)}
                    />
                  </Form.Item>
                  {thumbUrl && (
                    <div className="mt-3 aspect-[16/9] rounded-xl overflow-hidden shadow-inner border border-gray-100 bg-gray-50 flex items-center justify-center">
                      <img src={thumbUrl} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
               </div>

               {/* Chuyên mục & Tags */}
               <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 space-y-4">
                 <Form.Item name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn chuyên mục!' }]} label={<span className="font-bold text-gray-700 text-xs uppercase tracking-widest">Chuyên mục</span>} className="mb-0">
                   <Select placeholder="Chọn một nhánh tin..." size="large" className="w-full">
                     <Option value={1}>💻 Công nghệ & AI</Option>
                     <Option value={2}>📈 Kinh Doanh Số</Option>
                     <Option value={3}>☕ Phong Cách Sống</Option>
                     <Option value={4}>🌍 Thế Giới</Option>
                     <Option value={5}>💼 Thương Trường</Option>
                   </Select>
                 </Form.Item>

                 <Form.Item name="tags" label={<span className="font-bold text-gray-700 text-xs uppercase tracking-widest">Từ Khóa SEO</span>} className="mb-0">
                   <Input placeholder="#tag_1, #tag_2..." className="rounded-xl border-gray-200/80 bg-white/50 py-2.5" />
                 </Form.Item>
               </div>

               {/* Buttons Action */}
               <div className="pt-4 grid grid-cols-2 gap-3 mt-4">
                 <Form.Item name="status" initialValue="DRAFT" className="hidden">
                    <Input type="hidden" />
                 </Form.Item>
                 
                 <button type="button" onClick={() => { form.setFieldsValue({status: 'DRAFT'}); handleSubmit(); }} disabled={isPending}
                   className="flex justify-center items-center gap-2 bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm disabled:opacity-50 text-sm">
                   <SaveOutlined /> Lưu Nháp
                 </button>

                 <button type="button" onClick={() => { form.setFieldsValue({status: 'PENDING_REVIEW'}); handleSubmit(); }} disabled={isPending}
                   className="flex justify-center items-center gap-2 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-rose-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-xl shadow-black/20 disabled:opacity-50 text-sm hover:scale-[1.02]">
                   Nộp & Gửi &rarr;
                 </button>
               </div>
             </Form>

          </div>
        </div>

      </div>
    </div>
  );
}
