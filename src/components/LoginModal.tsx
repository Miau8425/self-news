'use client';
import { useState, useTransition, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/login/actions';
import { UserOutlined, LockOutlined, CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) { setError('Vui lòng nhập tên đăng nhập.'); return; }
    setError('');

    startTransition(async () => {
      const res = await loginUser(username);
      if (res.success) {
        onClose();
        // Redirect theo role
        if (res.role === 'ADMIN') router.push('/admin/dashboard');
        else if (res.role === 'EDITOR') router.push('/admin/articles/review');
        else if (res.role === 'WRITER') router.push('/admin/articles/create');
        else router.refresh(); // READER — stay on page, refresh to update header
      } else {
        setError(res.error || 'Đăng nhập thất bại.');
      }
    });
  };

  const testAccounts = [
    { u: 'admin_master', r: 'Admin', color: 'bg-purple-100 text-purple-700' },
    { u: 'editor_pro', r: 'Biên tập', color: 'bg-blue-100 text-blue-700' },
    { u: 'writer_active', r: 'Phóng viên', color: 'bg-green-100 text-green-700' },
  ];

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient top */}
        <div className="h-1.5 bg-gradient-to-r from-rose-500 via-black to-gray-700" />

        <div className="px-7 pt-7 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Đăng Nhập</h2>
              <p className="text-gray-500 text-sm mt-0.5">Tòa soạn Innovators</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <CloseOutlined />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Tên Đăng Nhập
              </label>
              <div className="relative">
                <UserOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_master, editor_pro..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Mật Khẩu <span className="normal-case font-normal text-gray-400">(điền bừa)</span>
              </label>
              <div className="relative">
                <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black hover:bg-rose-600 disabled:bg-gray-300 text-white font-black py-3.5 rounded-xl transition-colors text-sm tracking-wide mt-2"
            >
              {isPending ? 'Đang xác thực...' : 'Tiếp Tục →'}
            </button>
          </form>

          {/* Quick login accounts */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tài khoản thử nhanh</p>
            <div className="flex flex-wrap gap-2">
              {testAccounts.map((a) => (
                <button
                  key={a.u}
                  type="button"
                  onClick={() => setUsername(a.u)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${a.color} hover:opacity-80`}
                >
                  {a.u} <span className="opacity-70">({a.r})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
