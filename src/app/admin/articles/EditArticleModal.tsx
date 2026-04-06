'use client';
import { useState, useTransition } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { updateArticle } from './actions';
import parse from 'html-react-parser';

export default function EditArticleModal({ article, onClose }: { article: any, onClose: () => void }) {
  const [title, setTitle] = useState(article.title || '');
  const [summary, setSummary] = useState(article.summary || '');
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [StarterKit], // Simplified editor for modal
    immediatelyRender: false,
    content: article.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] border border-gray-200 rounded-xl p-4',
      },
    },
  });

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) {
      message.error('Vui lòng nhập đầy đủ tiêu đề và sapo!');
      return;
    }
    const content = editor?.getHTML();
    if (!content || content === '<p></p>') {
      message.error('Nội dung không được để trống!');
      return;
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('summary', summary);
      fd.append('content', content);
      
      const res = await updateArticle(article.id, fd);
      if (res.success) {
        message.success('Chỉnh sửa thành công! Đã gửi bài duyệt lại.');
        onClose();
      } else {
        message.error(res.error || 'Đã xảy ra lỗi.');
      }
    });
  };

  return (
    <Modal
      open={true}
      title="Chỉnh Sửa Bài Viết"
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={isPending}
      okText="Lưu Thay Đổi & Gửi Duyệt"
      cancelText="Hủy"
      width={800}
      centered
      maskClosable={false}
    >
      <div className="space-y-4 my-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Tiêu Đề</label>
          <Input.TextArea autoSize value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Tóm tắt (Sapo)</label>
          <Input.TextArea autoSize rows={2} value={summary} onChange={e => setSummary(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nội Dung</label>
          <EditorContent editor={editor} />
        </div>
      </div>
    </Modal>
  );
}
