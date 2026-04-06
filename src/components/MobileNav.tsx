'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface MobileNavProps {
  categories: { id: number; name: string; slug: string }[];
  currentCategory?: string | null;
}

export default function MobileNav({ categories, currentCategory }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex-shrink-0"
        aria-label="Mở menu"
      >
        <MenuOutlined />
      </button>

      {/* Backdrop & Drawer rendered in Portal to avoid CSS stacking context issues from header */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
          {open && (
            <div
              className="fixed inset-0 bg-black/40 z-[900] md:hidden"
              onClick={() => setOpen(false)}
            />
          )}

          {/* Bottom Sheet Drawer */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-[901] bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out md:hidden ${
              open ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            <div className="px-5 pb-safe">
              {/* Header */}
              <div className="flex items-center justify-between py-3 mb-2 border-b border-gray-100">
                <span className="font-black text-lg tracking-tighter uppercase font-serif">INNOVATORS</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <CloseOutlined className="text-xs" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="py-3 space-y-1">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-colors ${
                    !currentCategory
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🗞️ Tất Cả Tin Tức
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/?category=${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-colors ${
                      currentCategory === cat.slug
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>

              {/* Footer inside drawer */}
              <div className="py-4 border-t border-gray-100 text-xs text-gray-400 text-center font-medium pb-8">
                © 2026 Innovators News Network
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
