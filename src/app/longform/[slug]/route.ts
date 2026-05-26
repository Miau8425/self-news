import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = db
    .prepare(`SELECT content FROM articles WHERE slug = ? AND status = 'PUBLISHED'`)
    .get(slug) as { content?: string } | undefined;

  if (!article?.content) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(article.content, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
