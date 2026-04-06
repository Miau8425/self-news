# Innovators News Platform

Hệ thống Website tin tức nội bộ (hoặc tạp chí) với các chức năng phân quyền cơ bản: Admin, Editor, Writer, và Reader.

## Cài đặt & Khởi động
1. Cài đặt các gói phụ thuộc: `pnpm install`
2. Khởi tạo Database (Nạp sẵn dữ liệu mẫu): `node seed.cjs` và `node seed_reuters.cjs`
3. Chạy server ở chế độ Development: `pnpm run dev`
4. Server lắng nghe tại địa chỉ: `http://localhost:2001` (Cổng 2001 như đã cấu hình trong script `dev`)

---

## 🔐 Hệ thống Đăng nhập & Cookies
Ứng dụng sử dụng cơ chế đăng nhập siêu tinh gọn: 
- Bạn chỉ cần vào trang đăng nhập **`/login`**.
- Hệ thống hỗ trợ nhập Username (mật khẩu có thể điền bừa ở môi trường test).
- Ngay sau khi đăng nhập thành công, Server sẽ lưu thông tin user vào Browser **Cookie** (với thời hạn duy trì rất lâu - lên tới 1 năm). Do đó, bạn sẽ không còn cảnh phải đăng nhập lại mỗi khi mở trình duyệt hay F5 lại trang nữa!

---

## 👑 Các Vai Trò (Roles) & Các Nơi Làm Việc
Hệ thống cấp phát không gian làm việc (Workspaces) chuyên biệt dựa trên Roles:

### 1. ADMIN (Quản trị viên)
- **Tài khoản dùng thử**: `admin_master`
- **Nơi làm việc chính**: `/admin/dashboard` và `/admin/accounts`
- **Quyền hạn**: 
  - Xem thống kê tổng bộ (Số bài, số lượt xem, số tài khoản).
  - Phê duyệt các tài khoản Writer mới đăng ký.
  - Vận hành, khóa/xóa tài khoản bị lỗi.

### 2. EDITOR (Tổng biên tập / Người duyệt bài)
- **Tài khoản dùng thử**: `editor_pro`
- **Nơi làm việc chính**: `/admin/articles/review`
- **Quyền hạn**:
  - Đọc các bài viết được nộp bởi nhà báo (Writer).
  - Quyết định xuất bản (Publish) ra ngoài trang chủ hoặc Từ chối (Reject) bài viết.

### 3. WRITER (Phóng viên / Người viết bài)
- **Tài khoản dùng thử**: `writer_active`
- **Nơi làm việc chính**: `/admin/articles/create`
- **Quyền hạn**:
  - Truy cập trình soạn thảo văn bản phong phú (Rich Text Editor Tiptap).
  - Đăng tải hình ảnh bìa và gửi nội dung báo chí mới vào kho trữ chờ duyệt.

*Tài khoản thử nghiệm chưa kích hoạt (Chờ Admin duyệt):* `writer_req`

### 4. READER (Độc giả - Mặc định)
- Độc giả vãng lai hoặc đã lưu cookie Reader chỉ đọc các trang Public như Trang chủ `/`, đọc báo `/article/[slug]`. 
- Cấu trúc trang đích cực kỳ hiện đại, Responsive chuẩn di động.

---

## Công nghệ sử dụng
- **Core**: Next.js 16 (App Router + React 19)
- **Database**: SQLite cục bộ (`better-sqlite3`)
- **Giao diện**: TailwindCSS, Ant Design (Admin UI), Custom Vanilla Headers.
- **Biên tập bài viết**: Tiptap Rich Text.
# news
