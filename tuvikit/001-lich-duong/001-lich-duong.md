# 📅 LỊCH DƯƠNG (DƯƠNG LỊCH)

## 1. Tổng quan

**Lịch Dương** (còn gọi là Dương lịch, Gregorian Calendar) là hệ thống lịch được sử dụng phổ biến nhất trên thế giới hiện nay.

### Đặc điểm:
- **Nền tảng:** Chu kỳ quay của Trái Đất quanh Mặt Trời
- **Nguồn gốc:** Cải cách từ lịch Julius bởi Giáo hoàng Gregory XIII (1582)
- **Việt Nam:** Chính thức sử dụng từ năm 1967

---

## 2. Cấu trúc thời gian

### 2.1 Năm (Year)
- **Độ dài:** 365 ngày (năm thường) hoặc 366 ngày (năm nhuận)
- **Năm nhuận:** Chia hết cho 4, trừ các năm chia hết cho 100 (trừ khi chia hết cho 400)

```
Ví dụ:
- 2024: Năm nhuận (2024 ÷ 4 = 506, dư 0)
- 2025: Năm thường
- 2000: Năm nhuận (chia hết cho 400)
- 1900: Năm thường (chia hết cho 100 nhưng không chia hết cho 400)
```

### 2.2 Tháng (Month)
| Tháng | Số ngày | Năm nhuận |
|-------|---------|-----------|
| 1 - Tháng 1 (Jan) | 31 | 31 |
| 2 - Tháng 2 (Feb) | 28 | 29 |
| 3 - Tháng 3 (Mar) | 31 | 31 |
| 4 - Tháng 4 (Apr) | 30 | 30 |
| 5 - Tháng 5 (May) | 31 | 31 |
| 6 - Tháng 6 (Jun) | 30 | 30 |
| 7 - Tháng 7 (Jul) | 31 | 31 |
| 8 - Tháng 8 (Aug) | 31 | 31 |
| 9 - Tháng 9 (Sep) | 30 | 30 |
| 10 - Tháng 10 (Oct) | 31 | 31 |
| 11 - Tháng 11 (Nov) | 30 | 30 |
| 12 - Tháng 12 (Dec) | 31 | 31 |

**Tổng:** 365 ngày (năm thường) | 366 ngày (năm nhuận)

### 2.3 Tuần (Week)
- **7 ngày/tuần**
- **52-53 tuần/năm**

---

## 3. Cách tính ngày trong năm

### Công thức tính ngày trong năm (Day of Year):

```python
def day_of_year(day, month, year):
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    # Năm nhuận
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        days_in_month[1] = 29
    
    # Tính tổng
    doy = day
    for i in range(month - 1):
        doy += days_in_month[i]
    
    return doy
```

**Ví dụ:**
- 01/01/2024 → Ngày 1
- 01/03/2024 → Ngày 61 (vì tháng 2 có 29 ngày)
- 31/12/2024 → Ngày 366

---

## 4. Các múi giờ (Time Zones)

### Giờ Việt Nam (UTC+7)
- **Tên:** Indochina Time (ICT)
- **UTC Offset:** +07:00
- **Giờ mùa hè:** Không áp dụng

---

## 5. Ngày lễ, sự kiện quan trọng

### Ngày lễ Việt Nam (Dương lịch):
| Ngày | Tên gọi |
|------|---------|
| 01/01 | Tết Dương lịch |
| 14/02 | Lễ Valentine |
| 08/03 | Quốc tế Phụ nữ |
| 01/04 | Cá tháng Tư |
| 01/05 | Quốc tế Lao động |
| 01/06 | Quốc tế Thiếu nhi |
| 20/06 | Ngày Báo chí Việt Nam |
| 28/06 | Ngày Gia đình Việt Nam |
| 11/07 | Ngày Dân số Thế giới |
| 27/07 | Ngày Thương binh-Liệt sĩ |
| 15/08 | Lễ Vu Lan |
| 02/09 | Quốc khánh |
| 10/10 | Ngày Giải phóng Thủ đô |
| 20/10 | Ngày Phụ nữ Việt Nam |
| 09/11 | Ngày Phonh Vương tử Việt Nam |
| 20/11 | Ngày Nhà giáo Việt Nam |
| 01/12 | Ngày Thế giới phòng chống AIDS |
| 22/12 | Ngày Thành lập Quân đội NDVN |
| 24/12 | Đêm Giáng sinh |
| 25/12 | Lễ Giáng sinh |

---

## 6. Công thức chuyển đổi

### Python:

```python
from datetime import datetime, timedelta

# Ngày hiện tại
now = datetime.now()
print(f"Năm: {now.year}")
print(f"Tháng: {now.month}")
print(f"Ngày: {now.day}")
print(f"Thứ: {now.strftime('%A')}")  # Monday, Tuesday...

# Chuyển sang timestamp
timestamp = datetime.timestamp(now)
print(f"Timestamp: {timestamp}")

# Parse từ string
date_str = "2024-01-01"
parsed = datetime.strptime(date_str, "%Y-%m-%d")
```

### JavaScript:

```javascript
const now = new Date();
console.log(`Năm: ${now.getFullYear()}`);
console.log(`Tháng: ${now.getMonth() + 1}`);
console.log(`Ngày: ${now.getDate()}`);
console.log(`Thứ: ${now.toLocaleDateString('vi-VN', {weekday: 'long'})}`);

// Timestamp
const timestamp = Math.floor(now.getTime() / 1000);
```

---

## 7. API và Thư viện

### Python:
- `datetime`: Thư viện built-in
- `dateutil`: Parser mạnh mẽ
- `pytz`: Timezone support

### JavaScript:
- `Intl.DateTimeFormat`: Format ngày giờ
- `date-fns`, `dayjs`: Thư viện nhẹ
- `momentjs`: (deprecated)

---

## 8. Link tham khảo

- Wikipedia: https://vi.wikipedia.org/wiki/Lịch_Gregory
- Time.is (Giờ thế giới): https://time.is/
- Timezone DB: https://timezonedb.com/

---

## 9. Ghi chú cho Developer

### Khi làm app Tử Vi:
1. **Lưu ý năm nhuận** khi tính ngày
2. **Timezone UTC+7** cho Việt Nam
3. **Format chuẩn:** ISO 8601 (YYYY-MM-DD)
4. **Validation:** Kiểm tra ngày hợp lệ (28/02/2023 vs 29/02/2023)
5. **Input users:** Cho phép nhiều format (DD/MM/YYYY, YYYY-MM-DD, v.v.)

---

**Cập nhật:** 2026-02-06
**Tác giả:** Tử Vi Kit - Diệu Nhi
