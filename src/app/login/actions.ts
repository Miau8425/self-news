'use server';
import db from '@/lib/db';
import { cookies } from 'next/headers';

export async function loginUser(username: string) {
  try {
    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username) as any;
    
    if (!user) {
      return { success: false, error: 'Tài khoản không tồn tại!' };
    }

    if (user.status === 'PENDING_APPROVAL') {
      return { success: false, error: 'Tài khoản đang chờ Admin phê duyệt.' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth_user', JSON.stringify({ username: user.username, role: user.role }), { 
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/' 
    });

    return { success: true, role: user.role };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_user');
}
