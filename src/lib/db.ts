import Database from 'better-sqlite3';
import path from 'path';

// File SQLite sẽ nằm ngay ngoài thư mục gốc của project
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Tự động khởi tạo các bảng cần thiết với đầy đủ các trường yêu cầu
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'WRITER', -- WRITER, EDITOR
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT,
    content TEXT,
    thumbnail_img TEXT,
    category_id INTEGER,
    author_id INTEGER,
    status TEXT DEFAULT 'DRAFT', -- DRAFT, PENDING_REVIEW, PUBLISHED, REJECTED
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

export default db;
