# ⚽ FootyPedia - Ứng Dụng Tra Cứu Cầu Thủ & Thống Kê Sự Nghiệp Bóng Đá

Ứng dụng web hiện đại cho phép tìm kiếm bất kỳ cầu thủ bóng đá nào trên thế giới, theo dõi hồ sơ chi tiết, lịch sử chuyển nhượng qua các câu lạc bộ, thống kê số trận, bàn thắng, bộ sưu tập danh hiệu và biểu đồ kỹ năng bóng đá (Radar Chart).

---

## 🌟 Tính Năng Nổi Bật

1. **Tìm kiếm thông minh (Live Search & Autocomplete):**
   - Tìm kiếm cầu thủ bất kỳ theo tên (VD: Messi, Ronaldo, Haaland, Mbappé, De Bruyne, Bellingham, Son Heung-min, Quang Hải...).
   - Đề xuất tức thì với hình ảnh đại diện, quốc gia, câu lạc bộ và vị trí thi đấu.
   - Các phím tắt chọn nhanh các siêu sao bóng đá thế giới.

2. **Hồ sơ cầu thủ chuyên sâu (Player Profile):**
   - Ảnh chân dung chất lượng cao (Cutout / Render), số áo, câu lạc bộ hiện tại, đội tuyển quốc gia.
   - Thông số sinh học & thể hình: Ngày sinh, tuổi, nơi sinh, chiều cao, cân nặng, chân thuận.
   - Thống kê tổng quan: Tổng bàn thắng sự nghiệp, tổng số trận ra sân, hiệu suất ghi bàn/trận, số CLB đã thi đấu, số cúp/danh hiệu.

3. **Thống kê đồ thị trực quan (Visual Analytics):**
   - **Biểu đồ cột (Bar Chart)**: Thống kê số bàn thắng & số trận ra sân qua từng câu lạc bộ trong sự nghiệp.
   - **Biểu đồ mạng nhện (FC Radar Chart)**: Đánh giá 6 chỉ số kỹ năng cốt lõi (Tốc độ - PAC, Dứt điểm - SHO, Chuyền bóng - PAS, Rê bóng - DRI, Phòng ngự - DEF, Thể lực - PHY).

4. **Hành trình sự nghiệp (Career Journey Timeline):**
   - Dòng thời gian chi tiết từng giai đoạn thi đấu: Logo CLB, giai đoạn năm thi đấu, dạng chuyển nhượng, số trận và số bàn thắng.

5. **Phòng truyền thống & Danh hiệu (Honours & Trophies):**
   - Danh sách các cúp vô địch, danh hiệu cá nhân (Vua phá lưới, Cầu thủ xuất sắc nhất, Quả bóng vàng...) kèm mùa giải và logo danh hiệu.

6. **So sánh cầu thủ đối đầu (Head-to-Head Compare):**
   - So sánh trực tiếp 2 cầu thủ bất kỳ.
   - Bảng thông số kỹ thuật song song (bàn thắng, số trận, danh hiệu, tuổi, thể hình).
   - Biểu đồ radar kép (Dual Radar) để phân định phong cách thi đấu.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**:
  - React 19 (Hooks, Functional Components)
  - Vite (Build tool tốc độ cao)
  - Tailwind CSS v4 (Giao diện Dark Theme phong cách thể thao, Glassmorphism)
  - Recharts (Biểu đồ tương tác BarChart & RadarChart)
  - Lucide React (Bộ icon hiện đại)
- **Backend**:
  - Node.js & Express.js
  - RESTful API kiến trúc sạch
  - In-Memory Caching (Bộ nhớ đệm thông minh giảm tải và tăng tốc độ phản hồi)
  - Proxy & CORS middleware
- **Kết nối Internet & Dữ liệu**:
  - Tích hợp trực tiếp TheSportsDB API (Cơ sở dữ liệu bóng đá quốc tế cập nhật theo thời gian thực).

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy Server Node.js (Toàn diện Backend + Frontend)
```bash
# Cài đặt thư viện (nếu chưa cài)
npm run install:all

# Khởi chạy ứng dụng
npm start
```
Mở trình duyệt truy cập: `http://localhost:5000`

### Cách 2: Chạy môi trường Phát triển (Development Mode)
- **Khởi chạy Backend (Port 5000)**:
  ```bash
  npm run dev:backend
  ```
- **Khởi chạy Frontend Vite (Port 5173)**:
  ```bash
  npm run dev:frontend
  ```
Mở trình duyệt truy cập: `http://localhost:5173`

---

## 📡 Danh Sách Các Endpoint API Backend

| Phương thức | Đường dẫn API | Mô tả |
|---|---|---|
| `GET` | `/api/health` | Kiểm tra tình trạng hoạt động của server |
| `GET` | `/api/players/trending` | Danh sách các siêu sao bóng đá nổi bật |
| `GET` | `/api/players/search?q={tên}` | Tìm kiếm cầu thủ trên internet |
| `GET` | `/api/players/:id` | Xem chi tiết hồ sơ, thống kê CLB, cúp & radar kỹ năng |
| `GET` | `/api/players/compare/:id1/:id2` | So sánh chi tiết dữ liệu giữa 2 cầu thủ |
