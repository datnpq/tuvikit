# 📚 TỬ VI KIT - BASE KNOWLEDGE

> Base knowledge về tử vi, phong thủy để phục vụ development app/web.

---

## 📁 Cấu trúc Folder

```
tuvikit/
├── README.md                      # File này
├── 001-lich-duong/
│   └── 001-lich-duong.md         # ✅ Lịch Dương
├── 002-lich-am/
│   └── 001-lich-am.md            # ✅ Lịch Âm
├── 003-hoang-dao-hac-dao/
│   ├── 001-hoang-dao.md          # ✅ Hoàng Đạo
│   └── 002-hac-dao.md            # ✅ Hắc Đạo
├── 004-ngay-gio/
│   └── 001-gio-hoang-dao.md      # ✅ Giờ Hoàng Đạo
├── 005-tu-vi-co-ban/
│   └── 001-tu-vi-co-ban.md       # ✅ Tử Vi Cơ Bản
├── 006-tu-vi-nang-cao/
│   └── 001-tu-vi-nang-cao.md     # ✅ Tử Vi Nâng Cao
├── 007-phong-thuy/
│   └── 001-phong-thuy-co-ban.md  # ✅ Phong Thủy
├── 008-tu-tru-bat-tu/
│   └── 001-tu-tru-bat-tu.md      # ✅ Tứ Trụ - Bát Tự
├── 009-tam-tai-luu-niem/
│   └── 001-tam-tai-luu-niem.md   # ✅ Tam Tai - Lưu Niên
├── 010-kinh-dien/
│   └── 001-kinh-dien.md          # ✅ Kinh Điển
└── 011-nguon-tu-cohoc/
    └── 001-tu-cohoc.md           # ✅ Nguồn Từ Cổ Học (MỚI!)
```

---

## 📖 Nội dung đã có

### ✅ 1. Lịch Dương
- Cấu trúc năm, tháng, ngày
- Năm nhuận, ngày lễ Việt Nam
- Công thức Python/JavaScript

### ✅ 2. Lịch Âm
- 10 Thiên Can, 12 Địa Chi
- Chu kỳ 60 năm (Lục Thập Hoa Giáp)
- Ngày lễ Tết Việt Nam

### ✅ 3. Hoàng Đạo & Hắc Đạo
- Tam Hợp, Lục Hợp, Nguyệt Đức, Thánh Tâm
- Tam Sát, Ngũ Hoàng, Kim Lâu, Trực Tuyệt
- Bảng tra cứu + Code Python

### ✅ 4. Giờ Hoàng Đạo
- 12 giờ trong ngày (Tý → Hợi)
- Ý nghĩa từng giờ
- Giờ tốt/xấu theo ngày

### ✅ 5. Tử Vi Cơ Bản
- 12 Cung Nhân Sự
- 14 Sao Chính (Tử Vi, Liêm Trinh...)
- Sao Phụ (Văn Xương, Văn Khúc...)
- Ngũ Hành, Tứ Hóa
- Các Phái (Thiên Lương, Tử Vân...)

### ✅ 6. Tử Vi Nâng Cao
- Tứ Hóa chi tiết (1950-2029)
- Lục Hợp, Lục Xung, Tam Hợp
- Tinh Bàn, Hợp Cục
- Vận Hạn (Sơn Nạn, Sơ Hạn...)
- Tinh Hệ (các system sao)

### ✅ 7. Phong Thủy Cơ Bản
- Bát Trạch (8 hướng, 8 quái số)
- Long Mạch, Thủy Trình
- Huyền Không (sao phi tinh)
- Nội thất, Kiêng kỵ

### ✅ 8. Tứ Trụ - Bát Tự
- 10 Thiên Can (Giáp → Quý)
- 12 Địa Chi (Tý → Hợi)
- Ngũ Hành (Mộc, Hỏa, Thổ, Kim, Thủy)
- Cách lập Tứ Trụ (bước-by-bước)
- Thế Mệnh, Vận Hạn

### ✅ 9. Tam Tai - Lưu Niên
- Tam Tai theo tuổi
- Sao Lưu Niên (2024-2035)
- Sao Lưu Nguyệt

### ✅ 10. Kinh Điển
- Sách kinh điển (Tử Vi Toàn Thư...)
- Các phái Tử Vi
- Các chuyên gia nổi tiếng
- Phương pháp học

### ✅ 11. Nguồn Từ Cổ Học (MỚI!)
- **Từ tuvi.cohoc.net**
- Các loại Tứ Hóa (4 loại chính)
- **Nguyên tắc "Thể" và "Dụng"**
- **Liêm Tham Tỵ Hợi, Liêm Sát Sửu Mùi**
- Âm Dương trong Tử Vi
- Vai trò của Thân (cá nhân)
- Quy tắc luận giải

---

## 💻 Sử dụng cho Development

### Parse ngày:

```python
from datetime import datetime
now = datetime.now()
print(f"Dương: {now.year}-{now.month:02d}-{now.day:02d}")
```

### Lập Tứ Trụ:

```python
def lap_tu_tru(nam, thang, ngay, gio):
    """Lập Tứ Trụ từ ngày dương lịch"""
    # Xem chi tiết trong 008-tu-tru-bat-tu/001-tu-tru-bat-tu.md
    pass
```

### Tra Hoàng Đạo:

```python
def is_hoang_dao(ngay_chi, gio_chi):
    """Kiểm tra giờ hoàng đạo"""
    # Xem chi tiết trong 003-hoang-dao-hac-dao/001-hoang-dao.md
    pass
```

### Kiểm tra Tam Tai:

```python
def is_tam_tai(tuoi, nam_xem):
    """Kiểm tra năm Tam Tai"""
    # Xem chi tiết trong 009-tam-tai-luu-niem/001-tam-tai-luu-niem.md
    pass
```

### Nguyên tắc Thể/Dụng:

```python
def phan_tich_the_dung(sao_goc, tu_hoa):
    """
    Thể = Sao gốc (tính chất cơ bản)
    Dụng = Tứ hóa (chiều hướng biến đổi)
    """
    # Xem chi tiết trong 011-nguon-tu-cohoc/001-tu-cohoc.md
    pass
```

---

## 📊 Thống kê

| Module | Files | Dung lượng |
|--------|-------|------------|
| Lịch Dương | 1 | ~5 KB |
| Lịch Âm | 1 | ~9 KB |
| Hoàng/Hắc Đạo | 2 | ~18 KB |
| Giờ Hoàng Đạo | 1 | ~6 KB |
| Tử Vi Cơ Bản | 1 | ~13 KB |
| Tử Vi Nâng Cao | 1 | ~11 KB |
| Phong Thủy | 1 | ~14 KB |
| Tứ Trụ | 1 | ~12 KB |
| Tam Tai - Lưu Niên | 1 | ~6 KB |
| Kinh Điển | 1 | ~6 KB |
| Nguồn Từ Cổ Học | 1 | ~5 KB |
| **TỔNG** | **12** | **~111 KB** |

---

## 📝 Quy tắc đóng góp

1. Mỗi topic = 1 folder
2. Mỗi file = 1 chủ đề rõ ràng
3. Dùng Markdown format
4. Bao gồm code examples
5. Link tham khảo nguồn gốc

---

## 📅 Cập nhật gần nhất

- **2026-02-07:** Cập nhật kiến thức từ tuvi.cohoc.net (Nguồn Từ Cổ Học) 🎉

---

## 🔗 Nguồn tham khảo

- https://tuvi.cohoc.net/ - Tử Vi Cổ Học
- https://tuvi.vn/ - Tử Vi Việt Nam
- https://hoctuvi.com/ - Học Tử Vi Online

---

**Build with ❤️ by Diệu Nhi for Anh Ba**

> "Tử vi là một hệ thống tri thức sâu sắc, cần thời gian để học hỏi và thực hành."
> "Đức năng thắng số là ở đây" - Tử Vi Nghiệm Lý Toàn Thư
