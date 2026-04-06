'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Server Actions
export async function approveWriter(userId: number) {
  try {
    const stmt = db.prepare(`UPDATE users SET status = 'ACTIVE' WHERE id = ?`);
    stmt.run(userId);
    revalidatePath('/admin/accounts');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function rejectWriter(userId: number) {
  try {
    const stmt = db.prepare(`DELETE FROM users WHERE id = ? AND status = 'PENDING_APPROVAL'`);
    stmt.run(userId);
    revalidatePath('/admin/accounts');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createUser(data: FormData) {
  try {
    const name = data.get('name') as string;
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const role = data.get('role') as string;

    const stmt = db.prepare(`INSERT INTO users (name, username, password_hash, role, status) VALUES (?, ?, ?, ?, 'ACTIVE')`);
    stmt.run(name, username, 'hashed', role);
    revalidatePath('/admin/accounts');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
