# ⚡ JAVASCRIPT EXAMPLES - TỬ VI KIT

> Các ví dụ code JavaScript/TypeScript để lập lá số và luận giải Tử Vi

---

## 1. CẤU TRÚC DỮ LIỆU

### 1.1 Constants

```javascript
// Thiên Can (10)
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

// Địa Chi (12)
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// 12 Cung
const CUNG = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch',
  'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Tật Ách',
  'Tài Bạch', 'Huynh Đệ', 'Phu Thê', 'Tử Tức'
];

// 14 Chính Tinh
const CHINH_TINH = [
  'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc',
  'Thiên Đồng', 'Liêm Trinh', 'Thiên Phủ', 'Thái Âm',
  'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương',
  'Thất Sát', 'Phá Quân'
];

// Ngũ Hành
const NGU_HANH = {
  'Giáp': 'Mộc', 'Ất': 'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu': 'Thổ', 'Kỷ': 'Thổ',
  'Canh': 'Kim', 'Tân': 'Kim',
  'Nhâm': 'Thủy', 'Quý': 'Thủy',
  'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc',
  'Mão': 'Mộc', 'Thìn': 'Thổ', 'Tỵ': 'Hỏa',
  'Ngọ': 'Hỏa', 'Mùi': 'Thổ', 'Thân': 'Kim',
  'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
};

module.exports = { CAN, CHI, CUNG, CHINH_TINH, NGU_HANH };
```

---

## 2. TÍNH TOÁN CAN CHI

### 2.1 Tính Can Chi năm

```javascript
/**
 * Tính Can Chi của năm
 * @param {number} nam - Năm dương lịch
 * @returns {string} Can Chi
 */
function tinhCanChiNam(nam) {
  const can = CAN[(nam - 4) % 10];
  const chi = CHI[(nam - 4) % 12];
  return `${can} ${chi}`;
}

// Test
console.log(tinhCanChiNam(2024));  // Giáp Thìn
console.log(tinhCanChiNam(2025));  // Ất Tỵ
```

### 2.2 Tính Can Chi tháng

```javascript
/**
 * Tính Can Chi của tháng
 * @param {number} nam - Năm
 * @param {number} thang - Tháng (1-12)
 * @returns {string} Can Chi
 */
function tinhCanChiThang(nam, thang) {
  const chiThang = CHI[(thang) % 12];
  const canNamIndex = (nam - 4) % 10;
  const canThang = CAN[(canNamIndex * 2 + thang - 1) % 10];
  return `${canThang} ${chiThang}`;
}

// Test
console.log(tinhCanChiThang(2024, 1));  // Bính Dần
```

### 2.3 Tính Can Chi giờ

```javascript
/**
 * Tính Can Chi của giờ
 * @param {number} gio - Giờ (0-23)
 * @returns {string} Chi giờ
 */
function tinhCanChiGio(gio) {
  const chiGioMap = {
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
  };
  return chiGioMap[gio] || 'Tý';
}
```

---

## 3. LẬP TỨ TRỤ

```javascript
/**
 * Lập Tứ Trụ
 * @param {number} nam - Năm sinh
 * @param {number} thang - Tháng sinh
 * @param {number} ngay - Ngày sinh
 * @param {number} gio - Giờ sinh (0-23)
 * @returns {Object} Tứ Trụ
 */
function lapTuTru(nam, thang, ngay, gio) {
  // Năm
  const canNam = CAN[(nam - 4) % 10];
  const chiNam = CHI[(nam - 4) % 12];
  
  // Tháng
  const chiThang = CHI[(thang) % 12];
  const canNamIndex = (nam - 4) % 10;
  const canThang = CAN[(canNamIndex * 2 + thang - 1) % 10];
  
  // Ngày (giả lập)
  const canNgay = CAN[(ngay * 2) % 10];
  const chiNgay = CHI[(ngay - 1) % 12];
  
  // Giờ
  const chiGio = tinhCanChiGio(gio);
  const chiGioIndex = CHI.indexOf(chiGio);
  const canGio = CAN[(canNamIndex * 2 + chiGioIndex) % 10];
  
  return {
    nam: `${canNam} ${chiNam}`,
    thang: `${canThang} ${chiThang}`,
    ngay: `${canNgay} ${chiNgay}`,
    gio: `${canGio} ${chiGio}`
  };
}

// Test
const tuTru = lapTuTru(1990, 2, 15, 9);
console.log(tuTru);
```

---

## 4. CLASSES

### 4.1 Class Sao

```javascript
class Sao {
  constructor(ten, hanh, tinhChat, cungVi = null) {
    this.ten = ten;
    this.hanh = hanh;
    this.tinhChat = tinhChat; // 'cát', 'bình', 'hung'
    this.cungVi = cungVi;
    this.sang = false; // Miếu, Vượng
    this.toi = false;  // Hãm
  }
  
  setTrangThai(sang = null, toi = null) {
    if (sang !== null) this.sang = sang;
    if (toi !== null) this.toi = toi;
  }
  
  toString() {
    let status = '';
    if (this.sang) status = ' [Miếu Vượng]';
    else if (this.toi) status = ' [Hãm]';
    return `${this.ten} (${this.hanh})${status}`;
  }
}

// Tạo danh sách sao
function taoSaoMacDinh() {
  return [
    new Sao('Tử Vi', 'Thổ', 'cát'),
    new Sao('Thiên Cơ', 'Mộc', 'cát'),
    new Sao('Thái Dương', 'Hỏa', 'cát'),
    new Sao('Vũ Khúc', 'Kim', 'cát'),
    new Sao('Thiên Đồng', 'Thủy', 'cát'),
    new Sao('Liêm Trinh', 'Hỏa', 'hung'),
    new Sao('Thiên Phủ', 'Thổ', 'cát'),
    new Sao('Thái Âm', 'Thủy', 'cát'),
    new Sao('Tham Lang', 'Mộc', 'hung'),
    new Sao('Cự Môn', 'Thủy', 'hung'),
    new Sao('Thiên Tướng', 'Thủy', 'cát'),
    new Sao('Thiên Lương', 'Thổ', 'cát'),
    new Sao('Thất Sát', 'Kim', 'hung'),
    new Sao('Phá Quân', 'Thủy', 'hung')
  ];
}

module.exports = { Sao, taoSaoMacDinh };
```

### 4.2 Class MenhBan

```javascript
const { CUNG } = require('./constants');
const { taoSaoMacDinh } = require('./sao');
const { lapTuTru } = require('./tu-tru');

class MenhBan {
  constructor(namSinh, thangSinh, ngaySinh, gioSinh, gioiTinh) {
    this.namSinh = namSinh;
    this.thangSinh = thangSinh;
    this.ngaySinh = ngaySinh;
    this.gioSinh = gioSinh;
    this.gioiTinh = gioiTinh;
    
    // Khởi tạo 12 cung
    this.cung = {};
    CUNG.forEach(c => {
      this.cung[c] = { sao: [], hanh: null };
    });
    
    // Tứ Trụ
    this.tuTru = lapTuTru(namSinh, thangSinh, ngaySinh, gioSinh);
    
    // An sao
    this.anSao();
  }
  
  anSao() {
    const saoList = taoSaoMacDinh();
    const tuVi = saoList.find(s => s.ten === 'Tử Vi');
    this.cung['Mệnh'].sao.push(tuVi);
  }
  
  xemCung(tenCung) {
    return this.cung[tenCung] || null;
  }
  
  luanGiai() {
    const ketQua = [];
    const menh = this.cung['Mệnh'];
    
    if (menh.sao.length > 0) {
      const saoChinh = menh.sao[0];
      ketQua.push(`Mệnh có ${saoChinh.ten}: ${this.luanSao(saoChinh)}`);
    }
    
    return ketQua.join('\n');
  }
  
  luanSao(sao) {
    const luanGiai = {
      'Tử Vi': 'Ngườilãnh đạo bẩm sinh, có uy quyền',
      'Thiên Cơ': 'Thông minh, giỏi lập kế hoạch',
      'Thái Dương': 'Quang minh, chính trực, có danh tiếng',
      'Vũ Khúc': 'Quyết đoán, giỏi tài chính',
      'Thiên Đồng': 'Hiền lành, hòa đồng, có phúc',
      'Liêm Trinh': 'Có tham vọng, dễ vướng thị phi',
      'Thiên Phủ': 'Có khả năng quản lý, tích lũy',
      'Thái Âm': 'Dịu dàng, tinh tế, tốt về tài chính',
      'Tham Lang': 'Ham muốn lớn, khéo léo',
      'Cự Môn': 'Giỏi ăn nói, dễ gây thị phi',
      'Thiên Tướng': 'Có trách nhiệm, giỏi tổ chức',
      'Thiên Lương': 'Nhân hậu, giúp đỡ ngườikhác',
      'Thất Sát': 'Dũng cảm, quyết liệt, biến động',
      'Phá Quân': 'Dám nghĩ dám làm, phá cũ xây mới'
    };
    return luanGiai[sao.ten] || 'Chưa có luận giải';
  }
}

module.exports = { MenhBan };
```

---

## 5. API với EXPRESS

```javascript
const express = require('express');
const { lapTuTru, tinhCanChiNam } = require('./tu-tru');
const { MenhBan } = require('./menh-ban');

const app = express();
app.use(express.json());

// API lập Tứ Trụ
app.post('/api/tu-tru', (req, res) => {
  const { nam, thang, ngay, gio } = req.body;
  const result = lapTuTru(nam, thang, ngay, gio);
  res.json(result);
});

// API tra cứu Can Chi
app.get('/api/can-chi/:nam', (req, res) => {
  const nam = parseInt(req.params.nam);
  res.json({
    nam: nam,
    canChi: tinhCanChiNam(nam)
  });
});

// API lập mệnh bàn
app.post('/api/menh-ban', (req, res) => {
  const { nam, thang, ngay, gio, gioiTinh } = req.body;
  const menh = new MenhBan(nam, thang, ngay, gio, gioiTinh);
  
  res.json({
    tuTru: menh.tuTru,
    luanGiai: menh.luanGiai()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'TuViKit API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TuViKit API running on port ${PORT}`);
});

module.exports = app;
```

---

## 6. REACT COMPONENT

```jsx
import React, { useState } from 'react';

function TuTruCalculator() {
  const [formData, setFormData] = useState({
    nam: '',
    thang: '',
    ngay: '',
    gio: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/tu-tru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tu-tru-calculator">
      <h2>Lập Tứ Trụ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Năm"
          value={formData.nam}
          onChange={(e) => setFormData({...formData, nam: e.target.value})}
        />
        <input
          type="number"
          placeholder="Tháng"
          value={formData.thang}
          onChange={(e) => setFormData({...formData, thang: e.target.value})}
        />
        <input
          type="number"
          placeholder="Ngày"
          value={formData.ngay}
          onChange={(e) => setFormData({...formData, ngay: e.target.value})}
        />
        <input
          type="number"
          placeholder="Giờ (0-23)"
          value={formData.gio}
          onChange={(e) => setFormData({...formData, gio: e.target.value})}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tính...' : 'Lập Tứ Trụ'}
        </button>
      </form>
      
      {result && (
        <div className="result">
          <h3>Kết quả:</h3>
          <p>Năm: {result.nam}</p>
          <p>Tháng: {result.thang}</p>
          <p>Ngày: {result.ngay}</p>
          <p>Giờ: {result.gio}</p>
        </div>
      )}
    </div>
  );
}

export default TuTruCalculator;
```

---

## 7. VUE COMPONENT

```vue
<template>
  <div class="menh-ban-view">
    <h1>Lá Số Tử Vi</h1>
    
    <form @submit.prevent="lapMenhBan">
      <div class="form-group">
        <label>Năm sinh:</label>
        <input v-model.number="form.nam" type="number" required />
      </div>
      
      <div class="form-group">
        <label>Tháng:</label>
        <input v-model.number="form.thang" type="number" min="1" max="12" required />
      </div>
      
      <div class="form-group">
        <label>Ngày:</label>
        <input v-model.number="form.ngay" type="number" min="1" max="31" required />
      </div>
      
      <div class="form-group">
        <label>Giờ (0-23):</label>
        <input v-model.number="form.gio" type="number" min="0" max="23" required />
      </div>
      
      <div class="form-group">
        <label>Giới tính:</label>
        <select v-model="form.gioiTinh">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Đang lập...' : 'Lập Lá Số' }}
      </button>
    </form>
    
    <div v-if="ketQua" class="ket-qua">
      <h2>Tứ Trụ</h2>
      <div class="tu-tru">
        <div class="tru" v-for="(value, key) in ketQua.tuTru" :key="key">
          <span class="label">{{ key }}:</span>
          <span class="value">{{ value }}</span>
        </div>
      </div>
      
      <h2>Luận Giải</h2>
      <pre>{{ ketQua.luanGiai }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nam: 1990,
        thang: 1,
        ngay: 1,
        gio: 12,
        gioiTinh: 'Nam'
      },
      ketQua: null,
      loading: false
    };
  },
  methods: {
    async lapMenhBan() {
      this.loading = true;
      try {
        const response = await fetch('/api/menh-ban', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        this.ketQua = await response.json();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.menh-ban-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
}

.tu-tru {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.tru {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
```

---

## 8. TESTING

```javascript
// test/tu-tru.test.js
const { lapTuTru, tinhCanChiNam } = require('../src/tu-tru');

describe('Tứ Trụ', () => {
  test('Tính Can Chi năm 2024', () => {
    expect(tinhCanChiNam(2024)).toBe('Giáp Thìn');
  });
  
  test('Tính Can Chi năm 2025', () => {
    expect(tinhCanChiNam(2025)).toBe('Ất Tỵ');
  });
  
  test('Lập Tứ Trụ', () => {
    const result = lapTuTru(1990, 2, 15, 9);
    expect(result).toHaveProperty('nam');
    expect(result).toHaveProperty('thang');
    expect(result).toHaveProperty('ngay');
    expect(result).toHaveProperty('gio');
  });
});
```

---

## 9. CÀI ĐẶT

```bash
# Khởi tạo project
npm init -y

# Cài dependencies
npm install express

# Dev dependencies
npm install --save-dev jest nodemon

# Chạy server
npm start

# Chạy dev mode
npm run dev

# Chạy tests
npm test
```

---

## 10. PACKAGE.JSON

```json
{
  "name": "tuvikit-js",
  "version": "1.0.0",
  "description": "JavaScript SDK for Tử Vi (Astrology)",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/api.js",
    "dev": "nodemon src/api.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2"
  },
  "keywords": ["tu-vi", "astrology", "vietnamese", "horoscope"],
  "author": "Diệu Nhi",
  "license": "MIT"
}
```

---

**Cập nhật:** 2026-02-09
**Phiên bản:** 1.0.0
**Tác giả:** Tử Vi Kit - Diệu Nhi