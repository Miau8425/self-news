const Database = require('better-sqlite3');
const path = require('path');
const db = new Database('./database.sqlite');

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'WRITER',
      status TEXT NOT NULL DEFAULT 'ACTIVE',
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
      status TEXT DEFAULT 'DRAFT',
      tags TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      published_at DATETIME,
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
      FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
    );

    INSERT OR IGNORE INTO users (id, username, password_hash, name, role, status) VALUES 
    (1, 'admin_master', 'hashed', 'Vương Quyền (Admin)', 'ADMIN', 'ACTIVE'),
    (2, 'editor_pro', 'hashed', 'Ngọc Anh (Editor)', 'EDITOR', 'ACTIVE'),
    (3, 'writer_active', 'hashed', 'Hoàng Nam (Writer)', 'WRITER', 'ACTIVE'),
    (4, 'writer_req', 'hashed', 'Cộng Tác Viên 1', 'WRITER', 'PENDING_APPROVAL');

    INSERT OR IGNORE INTO categories (id, name, slug) VALUES 
    (1, 'Công nghệ & AI', 'cong-nghe-ai'),
    (2, 'Kinh Doanh Số', 'kinh-doanh-so'),
    (3, 'Phong Cách Sống', 'phong-cach-song'),
    (4, 'Thế Giới', 'the-gioi'),
    (5, 'Thương Trường', 'thuong-truong');

    INSERT OR IGNORE INTO articles (id, title, slug, summary, content, thumbnail_img, category_id, author_id, status) VALUES 
    (1, 'Kỷ nguyên AI 2026: Trí tuệ Nhân tạo định hình lại tài chính', 'ky-nguyen-ai-2026', 'Các chuyên gia hàng đầu phố Wall đều đồng thuận rằng 2026 là năm bản lề của siêu trí tuệ hiện diện trong mọi ngóc ngách của nền kinh tế toàn cầu.', '<p>Nội dung chi tiết về tác động của hệ thống AI vào hệ sinh thái tài chính Phố Wall.</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000', 1, 2, 'PUBLISHED'),
    (2, 'Siêu đô thị xanh: Tầm nhìn bất động sản tương lai', 'sieu-do-thi-xanh', 'Những đại đô thị ngập tràn cây xanh và không phát thải carbon đang trở thành điểm đến lý tưởng của dòng vốn ngoại.', '<p>Phân tích dự án đô thị thông minh...</p>', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1000', 2, 3, 'PUBLISHED'),
    (3, 'Bản thảo Tuyệt Mật: Cỗ Máy Lượng Tử Ánh Sáng', 'ban-thao-tuyet-mat', 'Vừa qua, một tài liệu rò rỉ cho thấy tham vọng của các Start-up thung lũng Silicon đã tiến xa đến việc phá vỡ nguyên lý bảo mật bằng sức mạnh lượng tử.', '<p>Đây là bài chờ duyệt</p>', 'https://images.unsplash.com/photo-1533227260871-fa5d202bfb73?auto=format&fit=crop&q=80&w=1000', 1, 3, 'PENDING_REVIEW');
  `);
  console.log('Kho dữ liệu đã được lấp đầy bản thảo siêu cấp!');
} catch(e) {
  console.log(e);
}
