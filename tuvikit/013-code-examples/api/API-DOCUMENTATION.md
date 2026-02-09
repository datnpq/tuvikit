# 📡 API DOCUMENTATION - TỬ VI KIT

> Tài liệu API cho Tử Vi Kit - Sử dụng để tích hợp vào web/app

---

## 1. BASE URL

```
Production:  https://api.tuvikit.com/v1
Development: http://localhost:3000/api
```

---

## 2. AUTHENTICATION

```http
Authorization: Bearer YOUR_API_KEY
```

---

## 3. ENDPOINTS

### 3.1 Lập Tứ Trụ (Bát Tự)

**Endpoint:** `POST /tu-tru`

**Request Body:**
```json
{
  "nam": 1990,
  "thang": 2,
  "ngay": 15,
  "gio": 9
}
```

**Response:**
```json
{
  "nam": "Canh Ngọ",
  "thang": "Bính Dần",
  "ngay": "Ất Mão",
  "gio": "Canh Tý"
}
```

---

### 3.2 Tra Cứu Can Chi

**Endpoint:** `GET /can-chi/:nam`

**Example:** `GET /can-chi/2024`

**Response:**
```json
{
  "nam": 2024,
  "canChi": "Giáp Thìn",
  "hanh": "Mộc",
  "conGiap": "Rồng"
}
```

---

### 3.3 Lập Lá Số Tử Vi

**Endpoint:** `POST /menh-ban`

**Request Body:**
```json
{
  "nam": 1990,
  "thang": 2,
  "ngay": 15,
  "gio": 9,
  "gioiTinh": "Nam",
  "options": {
    "includeLuanGiai": true,
    "includePhuTinh": true
  }
}
```

**Response:**
```json
{
  "tuTru": {
    "nam": "Canh Ngọ",
    "thang": "Bính Dần",
    "ngay": "Ất Mão",
    "gio": "Canh Tý"
  },
  "cungMenh": {
    "cung": "Mệnh",
    "chinhTinh": ["Tử Vi", "Thiên Cơ"],
    "phuTinh": ["Văn Xương", "Văn Khúc"],
    "hanh": "Mộc"
  },
  "12Cung": [
    {
      "cung": "Mệnh",
      "chi": "Dần",
      "sao": ["Tử Vi", "Thiên Cơ", "Văn Xương"]
    },
    {
      "cung": "Phụ Mẫu",
      "chi": "Mão",
      "sao": ["Thiên Phủ"]
    }
  ],
  "luanGiai": {
    "tongQuan": "Mệnh có Tử Vi đứng đầu, là ngườilãnh đạo bẩm sinh...",
    "tinhCach": "Thông minh, quyết đoán, có trách nhiệm...",
    "suNghiep": "Phù hợp với công việc quản lý, lãnh đạo...",
    "taiLoc": "Tài chính ổn định, biết tích lũy...",
    "tinhDuyen": "Hôn nhân hạnh phúc, vợ/chồng hỗ trợ...",
    "sucKhoe": "Sức khỏe tốt, cần chú ý tim mạch..."
  },
  "vanHan": {
    "namHienTai": {
      "nam": 2024,
      "canChi": "Giáp Thìn",
      "saoLuuNien": "Bế Tỏa",
      "danhGia": "Năm tích lũy, chờ thợi"
    }
  }
}
```

---

### 3.4 Tra Cứu Sao

**Endpoint:** `GET /sao/:tenSao`

**Example:** `GET /sao/tu-vi`

**Response:**
```json
{
  "ten": "Tử Vi",
  "hanh": "Thổ",
  "tinhChat": "cát",
  "yNghia": "Sao đế vương, chủ về quyền lực, uy nghi, phúc thọ",
  "tinhCach": "Thông minh, lãnh đạo giỏi, có trách nhiệm, khoan dung",
  "cungTot": ["Mệnh", "Quan Lộc", "Tài Bạch"],
  "cungXau": ["Tật Ách", "Nô Bộc"],
  "saoHop": ["Thiên Phủ", "Thiên Tướng", "Tả Phù", "Hữu Bật"],
  "saoXung": ["Thất Sát", "Phá Quân"]
}
```

---

### 3.5 Tra Cứu Cung

**Endpoint:** `GET /cung/:tenCung`

**Example:** `GET /cung/menh`

**Response:**
```json
{
  "ten": "Mệnh",
  "yNghia": "Cung quan trọng nhất, đại diện cho bản thân, tính cách, vận mệnh",
  "linhVuc": ["Tính cách", "Sự nghiệp", "Cuộc đổi", "Sức khỏe"],
  "saoChu": ["Tử Vi", "Thiên Cơ"],
  "cungXung": "Phu Thê",
  "cungTamHop": ["Mệnh", "Tài Bạch", "Quan Lộc"]
}
```

---

### 3.6 Tính Vận Hạn

**Endpoint:** `POST /van-han`

**Request Body:**
```json
{
  "namSinh": 1990,
  "namXem": 2024
}
```

**Response:**
```json
{
  "namSinh": 1990,
  "namXem": 2024,
  "tuoi": 34,
  "van": "Trung Hạn",
  "canChiNam": "Giáp Thìn",
  "saoLuuNien": {
    "ten": "Bế Tỏa",
    "so": 8,
    "yNghia": "Tích lũy, chờ đợi, không nên hấp tấp"
  },
  "danhGia": {
    "mucDo": "trung bình",
    "khuyenNghi": "Năm nên tích lũy, không nên đầu tư mạo hiểm"
  }
}
```

---

### 3.7 Tra Cứu Ngày Tốt

**Endpoint:** `POST /ngay-tot`

**Request Body:**
```json
{
  "ngay": "2024-02-15",
  "viec": "khai-truong"
}
```

**Response:**
```json
{
  "ngay": "2024-02-15",
  "canChi": "Giáp Tuất",
  "danhGia": "tốt",
  "gioTot": ["Tý", "Sửu", "Thìn", "Tỵ"],
  "gioXau": ["Ngọ", "Mùi", "Tuất", "Hợi"],
  "khuyenNghi": "Ngày tốt cho khai trương, ký kết",
  "cungXuatHanh": "Đông Nam"
}
```

---

### 3.8 Luận Giải Chi Tiết

**Endpoint:** `POST /luan-giai`

**Request Body:**
```json
{
  "nam": 1990,
  "thang": 2,
  "ngay": 15,
  "gio": 9,
  "gioiTinh": "Nam",
  "cauHoi": ["su-nghiep", "tinh-duyen", "tai-loc"]
}
```

**Response:**
```json
{
  "tongQuan": "Lá số có Tử Vi đứng đầu...",
  "chiTiet": {
    "suNghiep": {
      "danhGia": "tốt",
      "moTa": "Phù hợp với công việc quản lý...",
      "thoiDiemTot": ["2024-2026", "2030-2035"]
    },
    "tinhDuyen": {
      "danhGia": "tốt",
      "moTa": "Hôn nhân ổn định...",
      "doiTuongPhuHop": ["Ngườithông minh", "Có trách nhiệm"]
    },
    "taiLoc": {
      "danhGia": "trung bình",
      "moTa": "Tài chính ổn định...",
      "khuyenNghi": "Nên tích lũy, tránh đầu cơ"
    }
  }
}
```

---

## 4. ERROR HANDLING

### 4.1 Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 400 | Bad Request | Thiếu thông tin hoặc dữ liệu không hợp lệ |
| 401 | Unauthorized | API key không hợp lệ |
| 404 | Not Found | Resource không tồn tại |
| 429 | Too Many Requests | Vượt quá giới hạn request |
| 500 | Server Error | Lỗi server |

### 4.2 Error Response

```json
{
  "error": {
    "code": 400,
    "message": "Thiếu thông tin năm sinh",
    "details": {
      "field": "nam",
      "requirement": "Required integer between 1900-2100"
    }
  }
}
```

---

## 5. RATE LIMITING

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## 6. EXAMPLES

### 6.1 cURL

```bash
# Lập Tứ Trụ
curl -X POST https://api.tuvikit.com/v1/tu-tru \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "nam": 1990,
    "thang": 2,
    "ngay": 15,
    "gio": 9
  }'

# Lập lá số
curl -X POST https://api.tuvikit.com/v1/menh-ban \
  -H "Content-Type: application/json" \
  -d '{
    "nam": 1990,
    "thang": 2,
    "ngay": 15,
    "gio": 9,
    "gioiTinh": "Nam"
  }'
```

### 6.2 JavaScript (Fetch)

```javascript
const API_KEY = 'your-api-key';
const BASE_URL = 'https://api.tuvikit.com/v1';

// Lập Tứ Trụ
async function lapTuTru(nam, thang, ngay, gio) {
  const response = await fetch(`${BASE_URL}/tu-tru`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ nam, thang, ngay, gio })
  });
  return response.json();
}

// Lập lá số
async function lapMenhBan(data) {
  const response = await fetch(`${BASE_URL}/menh-ban`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Sử dụng
lapTuTru(1990, 2, 15, 9)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### 6.3 Python (Requests)

```python
import requests

API_KEY = 'your-api-key'
BASE_URL = 'https://api.tuvikit.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# Lập Tứ Trụ
def lap_tu_tru(nam, thang, ngay, gio):
    response = requests.post(
        f'{BASE_URL}/tu-tru',
        headers=headers,
        json={'nam': nam, 'thang': thang, 'ngay': ngay, 'gio': gio}
    )
    return response.json()

# Lập lá số
def lap_menh_ban(data):
    response = requests.post(
        f'{BASE_URL}/menh-ban',
        headers=headers,
        json=data
    )
    return response.json()

# Sử dụng
result = lap_tu_tru(1990, 2, 15, 9)
print(result)
```

---

## 7. WEBSOCKET (Real-time)

### 7.1 Connection

```javascript
const ws = new WebSocket('wss://api.tuvikit.com/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'van-han',
    namSinh: 1990
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Cập nhật vận hạn:', data);
};
```

### 7.2 Events

| Event | Description |
|-------|-------------|
| `van-han-update` | Cập nhật vận hạn theo năm |
| `sao-luu-nien` | Thông báo sao lưu niên thay đổi |
| `ngay-tot` | Nhắc nhở ngày tốt |

---

## 8. SDK

### 8.1 JavaScript SDK

```bash
npm install tuvikit-js
```

```javascript
import { TuViKit } from 'tuvikit-js';

const tuvi = new TuViKit({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
});

// Lập lá số
const menhBan = await tuvi.lapMenhBan({
  nam: 1990,
  thang: 2,
  ngay: 15,
  gio: 9,
  gioiTinh: 'Nam'
});

console.log(menhBan.luanGiai.tongQuan);
```

### 8.2 Python SDK

```bash
pip install tuvikit
```

```python
from tuvikit import TuViKit

tuvi = TuViKit(api_key='your-api-key')

# Lập lá số
menh_ban = tuvi.lap_menh_ban(
    nam=1990,
    thang=2,
    ngay=15,
    gio=9,
    gioi_tinh='Nam'
)

print(menh_ban['luanGiai']['tongQuan'])
```

---

## 9. CHANGELOG

### v1.0.0 (2026-02-09)

- Initial release
- Hỗ trợ lập Tứ Trụ, Mệnh Bàn
- API tra cứu sao, cung
- Hệ thống luận giải cơ bản

### v1.1.0 (Coming Soon)

- Hỗ trợ Tứ Trụ (Bát Tự) nâng cao
- Luận giải chi tiết hơn
- Webhook support
- Mobile SDK

---

## 10. SUPPORT

- **Email:** support@tuvikit.com
- **Docs:** https://docs.tuvikit.com
- **GitHub:** https://github.com/datnpq/tuvikit

---

**Version:** 1.0.0
**Last Updated:** 2026-02-09
**Author:** Tử Vi Kit Team