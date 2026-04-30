'use server';
import db from '@/lib/db';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AuthButton from './AuthButton';
import MobileNav from '@/components/MobileNav';

interface SiteHeaderProps {
  currentCategory?: string | null;
  variant?: 'home' | 'article';
}

export default async function SiteHeader({ currentCategory, variant = 'home' }: SiteHeaderProps) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_user');
  let user: any = null;
  if (authCookie) {
    try { user = JSON.parse(authCookie.value); } catch (e) {}
  }

  const categories = db.prepare(`SELECT * FROM categories LIMIT 10`).all() as any[];

  return (
    <>
      <header className="border-b border-gray-100/50 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center h-14 md:h-16 gap-3 md:gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/icon.png" 
                alt="Logo" 
                className="h-8 md:h-10 w-auto object-contain" 
              />
            </Link>

            {/* Desktop Nav — scrollable, no wrap */}
            <nav className="hidden md:flex flex-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-5 lg:gap-7 min-w-max text-[11px] md:text-[12px] font-bold tracking-widest text-gray-500 uppercase">
                <Link href="/" className="flex items-center px-3">
                <img 
                  src="/home_icon.png" 
                  alt="Trang chủ" 
                  className="w-5 h-5 object-contain hover:opacity-80 transition-opacity" 
                />
              </Link>
                {categories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/?category=${cat.slug}`}
                    className={`whitespace-nowrap hover:text-black transition-colors pb-0.5 ${currentCategory === cat.slug ? 'text-black border-b-2 border-black' : ''}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Spacer trên mobile để auth button về phải */}
            <div className="flex-1 md:hidden" />

            {/* Auth button */}
            <AuthButton user={user} />

            {/* Mobile hamburger — opens bottom drawer */}
            <MobileNav categories={categories} currentCategory={currentCategory} />
          </div>
        </div>
      </header>
    </>
  );
}
