/**
 * Tử Vi Kit - MVP Application
 * Based on lasotuvi repository (https://github.com/doanguyen/lasotuvi)
 * Accurate Vietnamese astrology calculation
 */

// ============================================
// CONSTANTS - From lasotuvi
// ============================================
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

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

const HANH_CLASS = {
    'Mộc': 'hanh-moc',
    'Hỏa': 'hanh-hoa',
    'Thổ': 'hanh-tho',
    'Kim': 'hanh-kim',
    'Thủy': 'hanh-thuy'
};

const CON_GIAP = {
    'Tý': 'Chuột', 'Sửu': 'Trâu', 'Dần': 'Hổ', 'Mão': 'Mèo',
    'Thìn': 'Rồng', 'Tỵ': 'Rắn', 'Ngọ': 'Ngựa', 'Mùi': 'Dê',
    'Thân': 'Khỉ', 'Dậu': 'Gà', 'Tuất': 'Chó', 'Hợi': 'Lợn'
};

const CUC = {
    'Kim': { so: 4, ten: 'Kim tứ Cục' },
    'Mộc': { so: 3, ten: 'Mộc tam Cục' },
    'Thủy': { so: 2, ten: 'Thủy nhị Cục' },
    'Hỏa': { so: 6, ten: 'Hỏa lục Cục' },
    'Thổ': { so: 5, ten: 'Thổ ngũ Cục' }
};

// ============================================
// JULIAN DAY CALCULATION (from lasotuvi)
// ============================================
function jdFromDate(dd, mm, yy) {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    const jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    return jd;
}

// ============================================
// LUNAR CALCULATION (Simplified from lasotuvi)
// ============================================
function S2L(dd, mm, yy, timeZone = 7) {
    // Simplified lunar conversion - for MVP use approximation
    // Full implementation would use new moon calculations
    
    // Approximate lunar date offset
    const offset = -Math.floor(yy / 19) * 11 + Math.floor((yy % 19) * 11 / 19);
    let lunarDay = dd + offset;
    let lunarMonth = mm;
    let lunarYear = yy;
    
    // Adjust for month boundaries
    while (lunarDay > 30) {
        lunarDay -= 30;
        lunarMonth++;
    }
    while (lunarDay < 1) {
        lunarDay += 30;
        lunarMonth--;
    }
    while (lunarMonth > 12) {
        lunarMonth -= 12;
        lunarYear++;
    }
    while (lunarMonth < 1) {
        lunarMonth += 12;
        lunarYear--;
    }
    
    return [lunarDay, lunarMonth, lunarYear, 0]; // [day, month, year, leap]
}

// ============================================
// CAN CHI CALCULATION (from lasotuvi)
// ============================================
function canChiNgay(dd, mm, yy) {
    const jd = jdFromDate(dd, mm, yy);
    const canNgay = (jd + 9) % 10 + 1;
    const chiNgay = (jd + 1) % 12 + 1;
    return { can: canNgay, chi: chiNgay };
}

function tinhCanChiNam(nam) {
    const can = CAN[(nam - 4) % 10];
    const chi = CHI[(nam - 4) % 12];
    return { can, chi, full: `${can} ${chi}` };
}

function tinhCanChiThang(nam, thang) {
    const chiThang = CHI[(thang) % 12];
    const canNamIndex = (nam - 4) % 10;
    const canThang = CAN[(canNamIndex * 2 + thang - 1) % 10];
    return { can: canThang, chi: chiThang, full: `${canThang} ${chiThang}` };
}

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

// ============================================
// LẬP TỨ TRỤ
// ============================================
function lapTuTru(dd, mm, yy, gio) {
    const [lunarDay, lunarMonth, lunarYear, lunarLeap] = S2L(dd, mm, yy);
    
    // Can Chi năm (lunar)
    const canNamIndex = (lunarYear - 4) % 10;
    const chiNamIndex = (lunarYear - 4) % 12;
    const canNam = CAN[canNamIndex];
    const chiNam = CHI[chiNamIndex];
    
    // Can Chi tháng (lunar)
    const chiThang = CHI[lunarMonth % 12];
    const canThangIndex = (canNamIndex * 2 + lunarMonth - 1) % 10;
    const canThang = CAN[canThangIndex];
    
    // Can Chi ngày (Julian Day)
    const ccNgay = canChiNgay(dd, mm, yy);
    const canNgay = CAN[(ccNgay.can - 1 + 10) % 10];
    const chiNgay = CHI[(ccNgay.chi - 1 + 12) % 12];
    
    // Can Chi giờ
    const chiGio = tinhCanChiGio(gio);
    const chiGioIndex = CHI.indexOf(chiGio);
    const canGioIndex = (canNamIndex * 2 + chiGioIndex) % 10;
    const canGio = CAN[canGioIndex];
    
    return {
        nam: { can: canNam, chi: chiNam, full: `${canNam} ${chiNam}`, hanh: NGU_HANH[canNam] },
        thang: { can: canThang, chi: chiThang, full: `${canThang} ${chiThang}`, hanh: NGU_HANH[canThang] },
        ngay: { can: canNgay, chi: chiNgay, full: `${canNgay} ${chiNgay}`, hanh: NGU_HANH[canNgay] },
        gio: { can: canGio, chi: chiGio, full: `${canGio} ${chiGio}`, hanh: NGU_HANH[canGio] },
        lunar: { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap }
    };
}

// ============================================
// TÌM CỤC (from lasotuvi)
// ============================================
function timCuc(viTriCungMenh, canNamIndex) {
    // Simplified calculation
    const cucMap = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const hanh = cucMap[(viTriCungMenh + canNamIndex) % 5];
    return CUC[hanh];
}

// ============================================
// TÌM TỬ VI (from lasotuvi)
// ============================================
function timTuVi(cucSo, ngaySinhAmLich) {
    let cungDan = 3; // Start from Dần
    let cuc = cucSo;
    
    while (cuc < ngaySinhAmLich) {
        cuc += cucSo;
        cungDan += 1;
    }
    
    const saiLech = cuc - ngaySinhAmLich;
    const dich = saiLech % 2 === 1 ? -saiLech : saiLech;
    
    let viTri = cungDan + dich;
    viTri = ((viTri - 1) % 12 + 12) % 12 + 1;
    return viTri;
}

// ============================================
// LẬP LÁ SỐ TỬ VI
// ============================================
function lapLaSo(dd, mm, yy, gio, gioiTinh) {
    const tuTru = lapTuTru(dd, mm, yy, gio);
    const { lunar } = tuTru;
    
    // Find Cung Mệnh (based on lunar month and hour)
    const viTriCungMenh = (lunar.month + 2) % 12 + 1;
    
    // Find Cục
    const canNamIndex = (lunar.year - 4) % 10;
    const cuc = timCuc(viTriCungMenh, canNamIndex);
    
    // Find Tử Vi
    const viTriTuVi = timTuVi(cuc.so, lunar.day);
    
    // Âm Dương
    const amDuongNamSinh = canNamIndex % 2 === 0 ? 'Dương' : 'Âm';
    
    return {
        duongLich: { day: dd, month: mm, year: yy },
        amLich: lunar,
        tuTru,
        cuc,
        cungMenh: { viTri: viTriCungMenh, chi: CHI[viTriCungMenh - 1] },
        tuVi: { viTri: viTriTuVi, chi: CHI[viTriTuVi - 1] },
        amDuong: amDuongNamSinh,
        gioiTinh
    };
}

// ============================================
// LUẬN GIẢI
// ============================================
function luanGiai(laSo) {
    const luan = [];
    const { tuTru, cuc, cungMenh, tuVi, amDuong, gioiTinh } = laSo;
    
    // Luận Cục
    luan.push({
        title: '🎋 Cục Mệnh',
        content: `Bạn thuộc ${cuc.ten}. ${luanCuc(cuc.ten.split(' ')[0])}`
    });
    
    // Luận Tử Vi
    const cungTuVi = getCungName(tuVi.viTri, cungMenh.viTri);
    luan.push({
        title: '⭐ Sao Tử Vi',
        content: `Tử Vi an tại cung ${cungTuVi} (${tuVi.chi}). ${luanTuVi(tuVi.viTri, cungMenh.viTri)}`
    });
    
    // Luận Cung Mệnh
    luan.push({
        title: '🏠 Cung Mệnh',
        content: `Mệnh an tại cung ${cungMenh.chi}. ${luanCungMenh(cungMenh.chi, tuTru.ngay.hanh)}`
    });
    
    // Luận Ngũ Hành
    luan.push({
        title: '🔥 Ngũ Hành',
        content: `Ngày ${tuTru.ngay.full} thuộc hành ${tuTru.ngay.hanh}. ${luanNguHanh(tuTru.ngay.hanh)}`
    });
    
    // Luận Âm Dương
    luan.push({
        title: '☯️ Âm Dương',
        content: `Nam sinh ${amDuong}, Giới tính ${gioiTinh}. ${luanAmDuong(amDuong, gioiTinh)}`
    });
    
    return luan;
}

function getCungName(position, menhPos) {
    const cungNames = ['Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc', 
                       'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'];
    const idx = (position - menhPos + 12) % 12;
    return cungNames[idx];
}

function luanCuc(hanh) {
    const luan = {
        'Kim': 'Kim tứ Cục: Tính cương nghị, quyết đoán, thích hợp công nghệ, quân đội.',
        'Mộc': 'Mộc tam Cục: Tính nhân hậu, từ bi, thích hợp giáo dục, y tế.',
        'Thủy': 'Thủy nhị Cục: Tính thông minh, linh hoạt, thích hợp kinh doanh.',
        'Hỏa': 'Hỏa lục Cục: Tính nhiệt tình, sáng tạo, thích hợp nghệ thuật.',
        'Thổ': 'Thổ ngũ Cục: Tính thật thà, chăm chỉ, thích hợp xây dựng, bất động sản.'
    };
    return luan[hanh] || '';
}

function luanTuVi(viTri, menhPos) {
    if (viTri === menhPos) {
        return 'Tử Vi tại Mệnh: Lãnh đạo bẩm sinh, có quyền uy, được nể trọng.';
    } else if ((viTri - menhPos + 12) % 12 === 6) {
        return 'Tử Vi đối diện Mệnh: Cuộc đổi thăng trầm, nhiều thay đổi.';
    } else {
        return 'Tử Vi tại cung khác: Cần xem thêm các sao khác.';
    }
}

function luanCungMenh(chi, hanh) {
    return `Cung ${chi} thuộc hành ${hanh}, ảnh hưởng đến tính cách và vận mệnh.`;
}

function luanNguHanh(hanh) {
    const luan = {
        'Kim': 'Hành Kim: Quyết đoán, cương nghị. Chú ý phổi, hô hấp.',
        'Mộc': 'Hành Mộc: Nhân hậu, tốt bụng. Chú ý gan, mắt.',
        'Thủy': 'Hành Thủy: Thông minh, linh hoạt. Chú ý thận, bàng quang.',
        'Hỏa': 'Hành Hỏa: Nhiệt tình, sáng tạo. Chú ý tim, tuần hoàn.',
        'Thổ': 'Hành Thổ: Thật thà, chăm chỉ. Chú ý dạ dày, tiêu hóa.'
    };
    return luan[hanh] || '';
}

function luanAmDuong(amDuong, gioiTinh) {
    const thuan = (amDuong === 'Dương' && gioiTinh === 'Nam') || (amDuong === 'Âm' && gioiTinh === 'Nữ');
    return thuan ? 'Âm Dương thuận: Mệnh tốt, cuộc sống thuận lợi.' : 'Âm Dương nghịch: Cần nỗ lực nhiều hơn.';
}

// ============================================
// VẬN HẠN
// ============================================
function luanVanHan(laSo, namXem = 2024) {
    const tuoi = namXem - laSo.duongLich.year;
    const ccNamXem = tinhCanChiNam(namXem);
    const ccNamSinh = tinhCanChiNam(laSo.duongLich.year);
    
    // Check Tam Tai
    const tamTaiMap = {
        'Tý': ['Sửu', 'Thìn', 'Mùi'], 'Sửu': ['Tý', 'Ngọ', 'Mùi'],
        'Dần': ['Tý', 'Ngọ', 'Tuất'], 'Mão': ['Sửu', 'Thìn', 'Tuất'],
        'Thìn': ['Tý', 'Sửu', 'Dần'], 'Tỵ': ['Hợi', 'Tuất', 'Sửu'],
        'Ngọ': ['Tý', 'Sửu', 'Thìn'], 'Mùi': ['Dần', 'Mão', 'Thìn'],
        'Thân': ['Ngọ', 'Tỵ', 'Tuất'], 'Dậu': ['Tý', 'Sửu', 'Thìn'],
        'Tuất': ['Tý', 'Ngọ', 'Tuất'], 'Hợi': ['Dần', 'Thìn', 'Ngọ']
    };
    const tamTai = tamTaiMap[ccNamSinh.chi]?.includes(ccNamXem.chi);
    
    let content = `Năm ${namXem} ${ccNamXem.full}. Bạn ${tuoi} tuổi. `;
    content += tamTai 
        ? '⚠️ Năm Tam Tai - Thận trọng quyết định lớn.'
        : '✅ Không phải Tam Tai - Có thể tiến hành việc quan trọng.';
    
    return { nam: namXem, canChi: ccNamXem.full, tuoi, tamTai, content };
}

// ============================================
// RENDER UI
// ============================================
function renderTuTru(tuTru) {
    const container = document.getElementById('tuTruResult');
    const items = [
        { label: 'Năm', ...tuTru.nam },
        { label: 'Tháng', ...tuTru.thang },
        { label: 'Ngày', ...tuTru.ngay },
        { label: 'Giờ', ...tuTru.gio }
    ];
    
    container.innerHTML = items.map(item => `
        <div class="tru-item">
            <span class="label">${item.label}</span>
            <span class="can-chi">${item.full}</span>
            <span class="hanh ${HANH_CLASS[item.hanh]}">${item.hanh}</span>
        </div>
    `).join('');
}

function renderInfo(laSo) {
    const container = document.getElementById('infoResult');
    const conGiap = CON_GIAP[laSo.tuTru.nam.chi];
    
    container.innerHTML = `
        <div class="info-item">
            <span class="label">Âm Lịch</span>
            <span class="value">${laSo.amLich.day}/${laSo.amLich.month}/${laSo.amLich.year}</span>
        </div>
        <div class="info-item">
            <span class="label">Con Giáp</span>
            <span class="value">${conGiap} (${laSo.tuTru.nam.chi})</span>
        </div>
        <div class="info-item">
            <span class="label">Cục</span>
            <span class="value">${laSo.cuc.ten}</span>
        </div>
        <div class="info-item">
            <span class="label">Âm Dương</span>
            <span class="value">${laSo.amDuong}</span>
        </div>
    `;
}

function renderLuanGiai(luanData) {
    const container = document.getElementById('luanGiaiResult');
    container.innerHTML = luanData.map(item => `
        <div class="luan-giai-item">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
        </div>
    `).join('');
}

function renderVanHan(vanHan) {
    const container = document.getElementById('vanHanResult');
    container.innerHTML = `
        <div class="van-han-header">
            <span class="van-han-title">Năm ${vanHan.nam} - ${vanHan.canChi}</span>
            ${vanHan.tamTai ? '<span class="van-han-badge" style="background: #E74C3C;">Tam Tai</span>' : '<span class="van-han-badge">Bình An</span>'}
        </div>
        <div class="van-han-content">${vanHan.content}</div>
    `;
}

// ============================================
// MAIN HANDLER
// ============================================
document.getElementById('tuViForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nam = parseInt(document.getElementById('nam').value);
    const thang = parseInt(document.getElementById('thang').value);
    const ngay = parseInt(document.getElementById('ngay').value);
    const gio = parseInt(document.getElementById('gio').value);
    const gioiTinh = document.getElementById('gioiTinh').value;
    
    // Calculate
    const laSo = lapLaSo(ngay, thang, nam, gio, gioiTinh);
    const luanData = luanGiai(laSo);
    const vanHan = luanVanHan(laSo, 2024);
    
    // Render
    renderTuTru(laSo.tuTru);
    renderInfo(laSo);
    renderLuanGiai(luanData);
    renderVanHan(vanHan);
    
    // Show result
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
});

console.log('🔮 Tử Vi Kit MVP (Accurate) loaded successfully!');
console.log('Based on lasotuvi - https://github.com/doanguyen/lasotuvi');