'use server';
import db from '@/lib/db';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function submitArticle(formData: FormData) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_user');
  if (!authCookie) return { success: false, error: 'Chưa đăng nhập.' };

  let user: any;
  try { user = JSON.parse(authCookie.value); } catch { return { success: false, error: 'Phiên đăng nhập lỗi.' }; }

  const author = db.prepare('SELECT id FROM users WHERE username = ?').get(user.username) as any;
  if (!author) return { success: false, error: 'Không tìm thấy tài khoản.' };

  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;
  const categoryId = Number(formData.get('categoryId'));
  const status = (formData.get('status') as string) || 'PENDING_REVIEW';
  const thumbnailUrl = (formData.get('thumbnailUrl') as string) || '';
  const tags = (formData.get('tags') as string) || '';

  if (!title || !summary || !content || !categoryId) {
    return { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' };
  }

  const slug = title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    + '-' + Date.now();

  try {
    db.prepare(`
      INSERT INTO articles (title, slug, summary, content, thumbnail_img, category_id, author_id, status, tags, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'PUBLISHED' THEN datetime('now') ELSE NULL END)
    `).run(title, slug, summary, content, thumbnailUrl, categoryId, author.id, status, tags, status);

    revalidatePath('/');
    revalidatePath('/admin/articles/review');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function reviewArticle(articleId: number, action: 'PUBLISHED' | 'REJECTED') {
  try {
    const publishedAt = action === 'PUBLISHED' ? `datetime('now')` : 'NULL';
    db.prepare(`UPDATE articles SET status = ?, published_at = ${publishedAt} WHERE id = ?`).run(action, articleId);
    revalidatePath('/admin/articles/review');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function updateArticle(articleId: number, formData: FormData) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_user');
  if (!authCookie) return { success: false, error: 'Chưa đăng nhập.' };

  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;
  
  if (!title || !summary || !content) {
    return { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' };
  }

  try {
    db.prepare(`
      UPDATE articles 
      SET title = ?, summary = ?, content = ?, status = 'PENDING_REVIEW'
      WHERE id = ?
    `).run(title, summary, content, articleId);

    revalidatePath('/admin/articles');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
