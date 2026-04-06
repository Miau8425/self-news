'use client';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { logoutAction } from '@/app/login/actions';

interface AuthButtonProps {
  user: { username: string; role: string } | null;
}

export default function AuthButton({ user }: AuthButtonProps) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 flex-shrink-0">
        {user ? (
          <>
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-black text-white shadow-md text-sm font-black hover:scale-110 transition-transform"
              title={user.username}
            >
              {user.username.charAt(0).toUpperCase()}
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="p-1.5 text-gray-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-full" title="Đăng xuất">
                <LogoutOutlined />
              </button>
            </form>
          </>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded-full"
          >
            <UserOutlined /> <span>Đăng Nhập</span>
          </button>
        )}
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
