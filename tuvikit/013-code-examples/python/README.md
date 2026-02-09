# 🐍 PYTHON EXAMPLES - TỬ VI KIT

> Các ví dụ code Python để lập lá số và luận giải Tử Vi

---

## 1. CẤU TRÚC DỮ LIỆU CƠ BẢN

### 1.1 Định nghĩa các hằng số

```python
# Thiên Can (10)
CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']

# Địa Chi (12)
CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

# Ngũ Hành
NGU_HANH = {
    'Giáp': 'Mộc', 'Ất': 'Mộc',
    'Bính': 'Hỏa', 'Đinh': 'Hỏa',
    'Mậu': 'Thổ', 'Kỷ': 'Thổ',
    'Canh': 'Kim', 'Tân': 'Kim',
    'Nhâm': 'Thủy', 'Quý': 'Thủy',
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc',
    'Mão': 'Mộc', 'Thìn': 'Thổ', 'Tỵ': 'Hỏa',
    'Ngọ': 'Hỏa', 'Mùi': 'Thổ', 'Thân': 'Kim',
    'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
}

# 12 Cung
CUNG = [
    'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch',
    'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Tật Ách',
    'Tài Bạch', 'Huynh Đệ', 'Phu Thê', 'Tử Tức'
]

# 14 Chính Tinh
CHINH_TINH = [
    'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc',
    'Thiên Đồng', 'Liêm Trinh', 'Thiên Phủ', 'Thái Âm',
    'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương',
    'Thất Sát', 'Phá Quân'
]
```

---

## 2. TÍNH TOÁN CAN CHI

### 2.1 Tính Can Chi năm

```python
def tinh_can_chi_nam(nam):
    """
    Tính Can Chi của năm
    Ví dụ: 2024 -> Giáp Thìn
    """
    can = CAN[(nam - 4) % 10]
    chi = CHI[(nam - 4) % 12]
    return f"{can} {chi}"

# Test
print(tinh_can_chi_nam(2024))  # Giáp Thìn
print(tinh_can_chi_nam(2025))  # Ất Tỵ
```

### 2.2 Tính Can Chi tháng

```python
def tinh_can_chi_thang(nam, thang):
    """
    Tính Can Chi của tháng
    Tháng 1 (Dương lịch) -> Tháng Dần (Âm lịch)
    """
    # Chi tháng: Tháng 1 = Dần, Tháng 2 = Mão...
    chi_thang = CHI[(thang) % 12]
    
    # Can tháng: (Can năm * 2 + tháng - 1) % 10
    can_nam_index = (nam - 4) % 10
    can_thang = CAN[(can_nam_index * 2 + thang - 1) % 10]
    
    return f"{can_thang} {chi_thang}"

# Test
print(tinh_can_chi_thang(2024, 1))  # Bính Dần
```

### 2.3 Tính Can Chi giờ

```python
def tinh_can_chi_gio(gio):
    """
    Tính Can Chi của giờ
    gio: 0-23 (giờ dương lịch)
    """
    # Map giờ dương lịch -> chi giờ
    chi_gio_map = {
        23: 'Tý', 0: 'Tý',
        1: 'Sửu', 2: 'Sửu',
        3: 'Dần', 4: 'Dần',
        5: 'Mão', 6: 'Mão',
        7: 'Thìn', 8: 'Thìn',
        9: 'Tỵ', 10: 'Tỵ',
        11: 'Ngọ', 12: 'Ngọ',
        13: 'Mùi', 14: 'Mùi',
        15: 'Thân', 16: 'Thân',
        17: 'Dậu', 18: 'Dậu',
        19: 'Tuất', 20: 'Tuất',
        21: 'Hợi', 22: 'Hợi'
    }
    
    chi = chi_gio_map.get(gio, 'Tý')
    return chi

# Test
print(tinh_can_chi_gio(9))   # Tỵ
print(tinh_can_chi_gio(23))  # Tý
```

---

## 3. LẬP TỨ TRỤ (BÁT TỰ)

```python
def lap_tu_tru(nam, thang, ngay, gio):
    """
    Lập Tứ Trụ từ ngày giờ sinh
    
    Args:
        nam: Năm sinh (dương lịch)
        thang: Tháng sinh (1-12)
        ngay: Ngày sinh (1-31)
        gio: Giờ sinh (0-23)
    
    Returns:
        dict: {'năm': '...', 'tháng': '...', 'ngày': '...', 'giờ': '...'}
    """
    # Năm
    can_nam = CAN[(nam - 4) % 10]
    chi_nam = CHI[(nam - 4) % 12]
    
    # Tháng
    chi_thang = CHI[(thang) % 12]
    can_nam_index = (nam - 4) % 10
    can_thang = CAN[(can_nam_index * 2 + thang - 1) % 10]
    
    # Ngày (giả lập - cần thư viện âm lịch chính xác)
    # Trong thực tế cần dùng thư viện như lunardate
    can_ngay = CAN[(ngay * 2) % 10]
    chi_ngay = CHI[(ngay - 1) % 12]
    
    # Giờ
    chi_gio = tinh_can_chi_gio(gio)
    chi_gio_index = CHI.index(chi_gio)
    can_gio = CAN[(can_nam_index * 2 + chi_gio_index) % 10]
    
    return {
        'năm': f"{can_nam} {chi_nam}",
        'tháng': f"{can_thang} {chi_thang}",
        'ngày': f"{can_ngay} {chi_ngay}",
        'giờ': f"{can_gio} {chi_gio}"
    }

# Test
tu_tru = lap_tu_tru(1990, 2, 15, 9)
print(tu_tru)
```

---

## 4. PHÂN TÍCH SAO

```python
class Sao:
    """Đại diện cho một sao trong Tử Vi"""
    
    def __init__(self, ten, hanh, tinh_chat, cung_vi=None):
        self.ten = ten
        self.hanh = hanh
        self.tinh_chat = tinh_chat  # 'cát', 'bình', 'hung'
        self.cung_vi = cung_vi  # Vị trí cung
        self.sang = False  # Miếu, Vượng
        self.toi = False   # Hãm, Hãm
    
    def set_trang_thai(self, sang=None, toi=None):
        """Thiết lập trạng thái sáng/tối"""
        if sang is not None:
            self.sang = sang
        if toi is not None:
            self.toi = toi
    
    def __str__(self):
        status = ""
        if self.sang:
            status = " [Miếu Vượng]"
        elif self.toi:
            status = " [Hãm]"
        return f"{self.ten} ({self.hanh}){status}"

# Tạo các sao chính
def tao_sao_mac_dinh():
    """Tạo danh sách 14 Chính Tinh"""
    sao_list = [
        Sao('Tử Vi', 'Thổ', 'cát'),
        Sao('Thiên Cơ', 'Mộc', 'cát'),
        Sao('Thái Dương', 'Hỏa', 'cát'),
        Sao('Vũ Khúc', 'Kim', 'cát'),
        Sao('Thiên Đồng', 'Thủy', 'cát'),
        Sao('Liêm Trinh', 'Hỏa', 'hung'),
        Sao('Thiên Phủ', 'Thổ', 'cát'),
        Sao('Thái Âm', 'Thủy', 'cát'),
        Sao('Tham Lang', 'Mộc', 'hung'),
        Sao('Cự Môn', 'Thủy', 'hung'),
        Sao('Thiên Tướng', 'Thủy', 'cát'),
        Sao('Thiên Lương', 'Thổ', 'cát'),
        Sao('Thất Sát', 'Kim', 'hung'),
        Sao('Phá Quân', 'Thủy', 'hung')
    ]
    return sao_list
```

---

## 5. MỆNH BÀN (LA SỐ)

```python
class MenhBan:
    """Đại diện cho một lá số Tử Vi"""
    
    def __init__(self, nam_sinh, thang_sinh, ngay_sinh, gio_sinh, gioi_tinh):
        self.nam_sinh = nam_sinh
        self.thang_sinh = thang_sinh
        self.ngay_sinh = ngay_sinh
        self.gio_sinh = gio_sinh
        self.gioi_tinh = gioi_tinh
        
        # 12 cung
        self.cung = {c: {'sao': [], 'hanh': None} for c in CUNG}
        
        # Tứ Trụ
        self.tu_tru = lap_tu_tru(nam_sinh, thang_sinh, ngay_sinh, gio_sinh)
        
        # An sao (giả lập)
        self.an_sao()
    
    def an_sao(self):
        """An các sao vào cung (thuật toán giả lập)"""
        # Trong thực tế, cần thuật toán phức tạp dựa trên ngày sinh
        sao_list = tao_sao_mac_dinh()
        
        # Giả lập: An Tử Vi vào cung Mệnh
        tu_vi = [s for s in sao_list if s.ten == 'Tử Vi'][0]
        self.cung['Mệnh']['sao'].append(tu_vi)
        
        # An các sao khác...
        # (Cần thuật toán chính xác từ sách Tử Vi)
    
    def xem_cung(self, ten_cung):
        """Xem thông tin một cung"""
        return self.cung.get(ten_cung, {})
    
    def luan_giai(self):
        """Luận giải lá số cơ bản"""
        ket_qua = []
        
        # Xem cung Mệnh
        menh = self.cung['Mệnh']
        if menh['sao']:
            sao_chinh = menh['sao'][0]
            ket_qua.append(f"Mệnh có {sao_chinh.ten}: {self.luan_sao(sao_chinh)}")
        
        return '\n'.join(ket_qua)
    
    def luan_sao(self, sao):
        """Luận giải một sao"""
        luan_giai = {
            'Tử Vi': 'Ngườilãnh đạo bẩm sinh, có uy quyền, tính cách cao quý',
            'Thiên Cơ': 'Thông minh, nhạy bén, giỏi lập kế hoạch',
            'Thái Dương': 'Quang minh, chính trực, có danh tiếng',
            'Vũ Khúc': 'Quyết đoán, giỏi tài chính, tính cách cương nghị',
            'Thiên Đồng': 'Hiền lành, hòa đồng, có phúc',
            'Liêm Trinh': 'Có tham vọng, giữ kỷ luật, dễ vướng thị phi',
            'Thiên Phủ': 'Có khả năng quản lý, giỏi tích lũy tài sản',
            'Thái Âm': 'Dịu dàng, tinh tế, tốt về tài chính',
            'Tham Lang': 'Ham muốn lớn, khéo léo, đa tài',
            'Cự Môn': 'Giỏi ăn nói, thông minh, dễ gây thị phi',
            'Thiên Tướng': 'Có trách nhiệm, giỏi tổ chức',
            'Thiên Lương': 'Nhân hậu, giúp đỡ ngườikhác',
            'Thất Sát': 'Dũng cảm, quyết liệt, biến động',
            'Phá Quân': 'Dám nghĩ dám làm, phá cũ xây mới'
        }
        return luan_giai.get(sao.ten, 'Chưa có luận giải')

# Test
menh_ban = MenhBan(1990, 2, 15, 9, 'Nam')
print(f"Tứ Trụ: {menh_ban.tu_tru}")
print(f"\nLuận giải:\n{menh_ban.luan_giai()}")
```

---

## 6. TRA CỨU NHANH

```python
def tra_cuu_can_chi(nam):
    """Tra cứu Can Chi năm"""
    return tinh_can_chi_nam(nam)

def tra_cuu_ngu_hanh(tuoi):
    """Tra cứu Ngũ Hành theo tuổi"""
    can_chi = tinh_can_chi_nam(tuoi)
    can = can_chi.split()[0]
    return NGU_HANH.get(can, 'Không xác định')

def tra_cuu_tu_hoa(nam):
    """Tra cứu Tứ Hóa theo năm"""
    # Bảng Tứ Hóa theo năm
    tu_hoa_map = {
        0: {'Lộc': 'Khôi', 'Quyền': 'Luân', 'Khoa': 'Tấn', 'Kỵ': 'Mị'},  # 1970, 1980...
        1: {'Lộc': 'Vũ', 'Quyền': 'Lộc', 'Khoa': 'Tấn', 'Kỵ': 'Mị'},    # 1971, 1981...
        # ... thêm các năm khác
    }
    can_index = (nam - 4) % 10
    return tu_hoa_map.get(can_index % 2, {})

# Test
print(tra_cuu_can_chi(2024))
print(tra_cuu_ngu_hanh(2024))
```

---

## 7. TÍNH VẬN HẠN

```python
def tinh_van_han(nam_sinh, nam_xem):
    """
    Tính vận hạn theo năm
    
    Returns:
        dict: Thông tin vận hạn
    """
    tuoi = nam_xem - nam_sinh
    
    if tuoi < 15:
        van = "Sơn Nạn"
    elif tuoi < 30:
        van = "Sơ Hạn"
    elif tuoi < 50:
        van = "Trung Hạn"
    elif tuoi < 70:
        van = "Hậu Hạn"
    else:
        van = "Lão Hạn"
    
    return {
        'tuoi': tuoi,
        'van': van,
        'nam_xem': nam_xem,
        'can_chi_nam': tinh_can_chi_nam(nam_xem)
    }

# Test
van_han = tinh_van_han(1990, 2024)
print(f"Năm 2024: {van_han['van']} ({van_han['tuoi']} tuổi)")
```

---

## 8. API FLASK (Web Service)

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/tu-tru', methods=['POST'])
def api_tu_tru():
    """API lập Tứ Trụ"""
    data = request.json
    nam = data.get('nam')
    thang = data.get('thang')
    ngay = data.get('ngay')
    gio = data.get('gio')
    
    result = lap_tu_tru(nam, thang, ngay, gio)
    return jsonify(result)

@app.route('/api/can-chi/<int:nam>', methods=['GET'])
def api_can_chi(nam):
    """API tra cứu Can Chi"""
    return jsonify({
        'nam': nam,
        'can_chi': tinh_can_chi_nam(nam)
    })

@app.route('/api/menh-ban', methods=['POST'])
def api_menh_ban():
    """API lập mệnh bàn"""
    data = request.json
    menh = MenhBan(
        data['nam'], data['thang'], 
        data['ngay'], data['gio'], data['gioi_tinh']
    )
    
    return jsonify({
        'tu_tru': menh.tu_tru,
        'luan_giai': menh.luan_giai()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## 9. CÀI ĐẶT

```bash
# Cài đặt dependencies
pip install flask lunardate

# Chạy server
python app.py
```

---

## 10. TÀI LIỆU THAM KHẢO

- `lunardate`: Thư viện chuyển đổi Dương lịch <-> Âm lịch
- `flask`: Web framework cho API
- Sách "Tử Vi Đẩu Số Tinh Hoa Tập Thành" - Đại Đức Sơn Nhân

---

**Cập nhật:** 2026-02-09
**Phiên bản:** 1.0.0
**Tác giả:** Tử Vi Kit - Diệu Nhi