'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addComment(articleId: number, slug: string, data: FormData) {
  const author = data.get('author_name') as string;
  const content = data.get('content') as string;
  
  if (!author || !content) return { error: 'Vui lòng nhập đủ thông tin.' };
  
  try {
    db.prepare('INSERT INTO comments (article_id, author_name, content) VALUES (?, ?, ?)').run(articleId, author, content);
    revalidatePath(`/article/${slug}`);
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
