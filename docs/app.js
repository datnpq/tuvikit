/**
 * Tử Vi Kit - Lập Lá Số Tử Vi (Purple Star Astrology)
 * Based on lasotuvi repository (https://github.com/doanguyen/lasotuvi)
 */

// ============================================
// CONSTANTS
// ============================================
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const CUNG_NHAN_SU = ['Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc', 
                      'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'];

const NGU_HANH = {
    'Giáp': 'Mộc', 'Ất': 'Mộc', 'Bính': 'Hỏa', 'Đinh': 'Hỏa', 'Mậu': 'Thổ',
    'Kỷ': 'Thổ', 'Canh': 'Kim', 'Tân': 'Kim', 'Nhâm': 'Thủy', 'Quý': 'Thủy',
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc', 'Thìn': 'Thổ',
    'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ', 'Thân': 'Kim', 'Dậu': 'Kim',
    'Tuất': 'Thổ', 'Hợi': 'Thủy'
};

const HANH_CLASS = { 'Mộc': 'hanh-moc', 'Hỏa': 'hanh-hoa', 'Thổ': 'hanh-tho', 'Kim': 'hanh-kim', 'Thủy': 'hanh-thuy' };

const CUC = {
    'Kim': { so: 4, ten: 'Kim tứ Cục' },
    'Mộc': { so: 3, ten: 'Mộc tam Cục' },
    'Thủy': { so: 2, ten: 'Thủy nhị Cục' },
    'Hỏa': { so: 6, ten: 'Hỏa lục Cục' },
    'Thổ': { so: 5, ten: 'Thổ ngũ Cục' }
};

// ============================================
// 14 CHÍNH TINH
// ============================================
const CHINH_TINH = {
    'Tử Vi': { hanh: 'Thổ', phuongVi: 'Đế tinh', amDuong: 1, nhom: 'bacDau' },
    'Liêm Trinh': { hanh: 'Hỏa', phuongVi: 'Bắc đẩu tinh', amDuong: 1, nhom: 'bacDau' },
    'Thiên Đồng': { hanh: 'Thủy', phuongVi: 'Bắc đẩu tinh', amDuong: 1, nhom: 'bacDau' },
    'Vũ Khúc': { hanh: 'Kim', phuongVi: 'Bắc đẩu tinh', amDuong: -1, nhom: 'bacDau' },
    'Thái Dương': { hanh: 'Hỏa', phuongVi: 'Nam đẩu tinh', amDuong: 1, nhom: 'namDau' },
    'Thiên Cơ': { hanh: 'Mộc', phuongVi: 'Nam đẩu tinh', amDuong: -1, nhom: 'namDau' },
    'Thiên Phủ': { hanh: 'Thổ', phuongVi: 'Nam đẩu tinh', amDuong: 1, nhom: 'namDau' },
    'Thái Âm': { hanh: 'Thủy', phuongVi: 'Bắc đẩu tinh', amDuong: -1, nhom: 'bacDau' },
    'Tham Lang': { hanh: 'Thủy', phuongVi: 'Bắc đẩu tinh', amDuong: -1, nhom: 'bacDau' },
    'Cự Môn': { hanh: 'Thủy', phuongVi: 'Bắc đẩu tinh', amDuong: -1, nhom: 'bacDau' },
    'Thiên Tướng': { hanh: 'Thủy', phuongVi: 'Nam đẩu tinh', amDuong: 1, nhom: 'namDau' },
    'Thiên Lương': { hanh: 'Mộc', phuongVi: 'Nam đẩu tinh', amDuong: -1, nhom: 'namDau' },
    'Thất Sát': { hanh: 'Kim', phuongVi: 'Nam đẩu tinh', amDuong: 1, nhom: 'namDau' },
    'Phá Quân': { hanh: 'Thủy', phuongVi: 'Bắc đẩu tinh', amDuong: -1, nhom: 'bacDau' }
};

// ============================================
// LUNAR CALENDAR
// ============================================
function jdFromDate(dd, mm, yy) {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function S2L(dd, mm, yy, timeZone = 7) {
    const offset = -Math.floor(yy / 19) * 11 + Math.floor((yy % 19) * 11 / 19);
    let lunarDay = dd + offset;
    let lunarMonth = mm;
    let lunarYear = yy;
    
    while (lunarDay > 30) { lunarDay -= 30; lunarMonth++; }
    while (lunarDay < 1) { lunarDay += 30; lunarMonth--; }
    while (lunarMonth > 12) { lunarMonth -= 12; lunarYear++; }
    while (lunarMonth < 1) { lunarMonth += 12; lunarYear--; }
    
    return [lunarDay, lunarMonth, lunarYear, 0];
}

// ============================================
// CAN CHI
// ============================================
function canChiNgay(dd, mm, yy) {
    const jd = jdFromDate(dd, mm, yy);
    return { can: (jd + 9) % 10 + 1, chi: (jd + 1) % 12 + 1 };
}

// ============================================
// AN SAO TỬ VI
// ============================================
function timCuc(viTriCungMenh, canNamIndex) {
    const cucMap = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const hanh = cucMap[(viTriCungMenh + canNamIndex) % 5];
    return { ...CUC[hanh], hanh };
}

function timTuVi(cucSo, ngaySinhAmLich) {
    let cungDan = 3;
    let cuc = cucSo;
    
    while (cuc < ngaySinhAmLich) {
        cuc += cucSo;
        cungDan += 1;
    }
    
    const saiLech = cuc - ngaySinhAmLich;
    const dich = saiLech % 2 === 1 ? -saiLech : saiLech;
    let viTri = cungDan + dich;
    return ((viTri - 1) % 12 + 12) % 12 + 1;
}

function dichCung(cungBanDau, soCung) {
    let ketQua = cungBanDau + soCung;
    return ((ketQua - 1) % 12 + 12) % 12 + 1;
}

function an14ChinhTinh(viTriTuVi) {
    const sao = {};
    
    // Tử Vi tinh hệ (Bắc Đẩu) - Theo thứ tự: Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh
    sao['Tử Vi'] = viTriTuVi;
    sao['Thiên Cơ'] = dichCung(viTriTuVi, 4);
    sao['Thái Dương'] = dichCung(viTriTuVi, 6);
    sao['Vũ Khúc'] = dichCung(viTriTuVi, 8);
    sao['Thiên Đồng'] = dichCung(viTriTuVi, 10);
    sao['Liêm Trinh'] = dichCung(viTriTuVi, 11);
    
    // Thiên Phủ tinh hệ (Nam Đẩu) - Đối với Tử Vi
    const viTriThienPhu = dichCung(viTriTuVi, 4);
    sao['Thiên Phủ'] = viTriThienPhu;
    sao['Thái Âm'] = dichCung(viTriThienPhu, 10);
    sao['Tham Lang'] = dichCung(viTriThienPhu, 9);
    sao['Cự Môn'] = dichCung(viTriThienPhu, 8);
    sao['Thiên Tướng'] = dichCung(viTriThienPhu, 7);
    sao['Thiên Lương'] = dichCung(viTriThienPhu, 6);
    sao['Thất Sát'] = dichCung(viTriThienPhu, 5);
    sao['Phá Quân'] = dichCung(viTriThienPhu, 1);
    
    return sao;
}

function anTrangSinh(cucSo, amDuongNamSinh, gioiTinh) {
    // Tràng Sinh theo cục
    const trangSinhTheoCuc = { 6: 3, 4: 6, 2: 9, 5: 9, 3: 12 };
    let viTri = trangSinhTheoCuc[cucSo] || 9;
    
    // Nam thuận, Nữ nghịch
    const thuanNghich = (amDuongNamSinh === 1 && gioiTinh === 1) || (amDuongNamSinh === -1 && gioiTinh === -1) ? 1 : -1;
    
    const vongTrangSinh = [
        'Tràng Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng',
        'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
    ];
    
    const ketQua = {};
    for (let i = 0; i < 12; i++) {
        const cung = dichCung(viTri, i * thuanNghich);
        ketQua[vongTrangSinh[i]] = cung;
    }
    return ketQua;
}

function anLocTon(canNamIndex) {
    // Lộc Tồn theo Can năm: Giáp-Kỷ ở Dần, Ất-Canh ở Mão, Bính-Tân ở Tỵ, Đinh-Nhâm ở Ngọ, Mậu-Quý ở Dậu
    const khoiCung = [3, 4, 6, 7, 10, 10, 4, 5, 7, 8];
    const viTri = khoiCung[canNamIndex - 1] || 3;
    
    const vongLocTon = [
        'Lộc Tồn', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân',
        'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao',
        'Phục Binh', 'Quan Phù'
    ];
    
    const ketQua = {};
    for (let i = 0; i < 12; i++) {
        const cung = dichCung(viTri, i);
        ketQua[vongLocTon[i]] = cung;
    }
    return ketQua;
}

function anThaiTue(chiNamIndex) {
    const viTri = chiNamIndex;
    const vongThaiTue = [
        'Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù',
        'Tử Phù', 'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức',
        'Điếu Khách', 'Trực Phù'
    ];
    
    const ketQua = {};
    for (let i = 0; i < 12; i++) {
        const cung = dichCung(viTri, i);
        ketQua[vongThaiTue[i]] = cung;
    }
    return ketQua;
}

// ============================================
// LẬP LÁ SỐ
// ============================================
function lapLaSo(ngayDuong, thangDuong, namDuong, gioSinh, gioiTinhStr) {
    // Chuyển sang âm lịch
    const [lunarDay, lunarMonth, lunarYear, lunarLeap] = S2L(ngayDuong, thangDuong, namDuong);
    
    // Can Chi
    const canNamIndex = (lunarYear - 4) % 10 || 10;
    const chiNamIndex = (lunarYear - 4) % 12 || 12;
    const canChiNgayObj = canChiNgay(ngayDuong, thangDuong, namDuong);
    
    // Chi giờ
    const chiGioMap = { 23: 1, 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5, 8: 5, 9: 6, 10: 6, 
                        11: 7, 12: 7, 13: 8, 14: 8, 15: 9, 16: 9, 17: 10, 18: 10, 19: 11, 20: 11, 21: 12, 22: 12 };
    const chiGioIndex = chiGioMap[gioSinh] || 1;
    const canGioIndex = (canNamIndex * 2 + chiGioIndex - 2) % 10 || 10;
    
    // Âm Dương
    const amDuongNamSinh = canNamIndex % 2 === 1 ? 1 : -1; // Lẻ: Dương, Chẵn: Âm
    const gioiTinh = gioiTinhStr === 'Nam' ? 1 : -1;
    
    // Tìm cung Mệnh và Thân
    const viTriCungMenh = (lunarMonth + chiGioIndex - 1) % 12 || 12;
    const viTriCungThan = (lunarMonth - chiGioIndex + 1 + 12) % 12 || 12;
    
    // Tìm Cục
    const cuc = timCuc(viTriCungMenh, canNamIndex);
    
    // Tìm Tử Vi
    const viTriTuVi = timTuVi(cuc.so, lunarDay);
    
    // An 14 Chính Tinh
    const chinhTinh = an14ChinhTinh(viTriTuVi);
    
    // An Tràng Sinh
    const trangSinh = anTrangSinh(cuc.so, amDuongNamSinh, gioiTinh);
    
    // An Lộc Tồn
    const locTon = anLocTon(canNamIndex);
    
    // An Thái Tuế
    const thaiTue = anThaiTue(chiNamIndex);
    
    // Tạo 12 cung
    const cung = [];
    for (let i = 1; i <= 12; i++) {
        const chiCung = i;
        const cungNhanSu = CUNG_NHAN_SU[(i - viTriCungMenh + 12) % 12];
        
        // Gom sao vào cung
        const saoTrongCung = [];
        
        // 14 Chính Tinh
        for (const [tenSao, viTri] of Object.entries(chinhTinh)) {
            if (viTri === chiCung) {
                saoTrongCung.push({ ten: tenSao, loai: 'chinh', ...CHINH_TINH[tenSao] });
            }
        }
        
        // Vòng Tràng Sinh
        for (const [tenSao, viTri] of Object.entries(trangSinh)) {
            if (viTri === chiCung) {
                saoTrongCung.push({ ten: tenSao, loai: 'trangSinh', hanh: 'Thủy' });
            }
        }
        
        // Vòng Lộc Tồn
        for (const [tenSao, viTri] of Object.entries(locTon)) {
            if (viTri === chiCung) {
                saoTrongCung.push({ ten: tenSao, loai: 'locTon', hanh: 'Thổ' });
            }
        }
        
        // Vòng Thái Tuế
        for (const [tenSao, viTri] of Object.entries(thaiTue)) {
            if (viTri === chiCung) {
                saoTrongCung.push({ ten: tenSao, loai: 'thaiTue', hanh: 'Hỏa' });
            }
        }
        
        cung.push({
            chi: CHI[chiCung - 1],
            chiIndex: chiCung,
            tenCung: cungNhanSu,
            laCungMenh: chiCung === viTriCungMenh,
            laCungThan: chiCung === viTriCungThan,
            sao: saoTrongCung
        });
    }
    
    return {
        duongLich: { ngay: ngayDuong, thang: thangDuong, nam: namDuong },
        amLich: { ngay: lunarDay, thang: lunarMonth, nam: lunarYear, nhuan: lunarLeap },
        canChi: {
            nam: `${CAN[canNamIndex - 1]} ${CHI[chiNamIndex - 1]}`,
            thang: `${CAN[(canNamIndex * 2 + lunarMonth - 1) % 10 || 10 - 1]} ${CHI[lunarMonth % 12 || 12 - 1]}`,
            ngay: `${CAN[(canChiNgayObj.can - 1 + 10) % 10]} ${CHI[(canChiNgayObj.chi - 1 + 12) % 12]}`,
            gio: `${CAN[canGioIndex - 1]} ${CHI[chiGioIndex - 1]}`
        },
        cungMenh: { viTri: viTriCungMenh, chi: CHI[viTriCungMenh - 1] },
        cungThan: { viTri: viTriCungThan, chi: CHI[viTriCungThan - 1] },
        cuc,
        amDuong: amDuongNamSinh === 1 ? 'Dương' : 'Âm',
        gioiTinh: gioiTinhStr,
        cung,
        chinhTinh
    };
}

// ============================================
// RENDER
// ============================================
function renderLaSo(laSo) {
    const container = document.getElementById('resultSection');
    container.style.display = 'block';
    
    // Thông tin header
    const headerHTML = `
        <div class="laso-header">
            <h2>📜 Lá Số Tử Vi</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Dương Lịch</span>
                    <span class="value">${laSo.duongLich.ngay}/${laSo.duongLich.thang}/${laSo.duongLich.nam}</span>
                </div>
                <div class="info-item">
                    <span class="label">Âm Lịch</span>
                    <span class="value">${laSo.amLich.ngay}/${laSo.amLich.thang}/${laSo.amLich.nam}</span>
                </div>
                <div class="info-item">
                    <span class="label">Can Chi Năm</span>
                    <span class="value">${laSo.canChi.nam}</span>
                </div>
                <div class="info-item">
                    <span class="label">Cục</span>
                    <span class="value">${laSo.cuc.ten}</span>
                </div>
                <div class="info-item">
                    <span class="label">Âm Dương</span>
                    <span class="value">${laSo.amDuong} ${laSo.gioiTinh}</span>
                </div>
                <div class="info-item">
                    <span class="label">Mệnh/Thân</span>
                    <span class="value">${laSo.cungMenh.chi}/${laSo.cungThan.chi}</span>
                </div>
            </div>
        </div>
    `;
    
    // 12 cung - Layout theo hình vuông
    //     Thìn Tỵ Ngọ
    //  Mão         Mùi
    //  Dần         Thân
    //  Sửu         Dậu
    //     Tý Hợi Tuất
    
    const thuTuCung = [5, 6, 7, 4, null, 8, 3, null, 9, 2, 1, 12, 11, 10]; // Thìn, Tỵ, Ngọ, Mão, Mùi, Dần, Thân, Sửu, Dậu, Tý, Hợi, Tuất
    
    let cungHTML = '<div class="laso-grid">';
    
    for (let i = 0; i < 14; i++) {
        const chiIndex = thuTuCung[i];
        
        if (chiIndex === null) {
            cungHTML += '<div class="cung-empty"></div>';
            continue;
        }
        
        const cungData = laSo.cung.find(c => c.chiIndex === chiIndex);
        const saoChinh = cungData.sao.filter(s => s.loai === 'chinh');
        const saoPhu = cungData.sao.filter(s => s.loai !== 'chinh');
        
        const menhBadge = cungData.laCungMenh ? '<span class="badge menh">Mệnh</span>' : '';
        const thanBadge = cungData.laCungThan ? '<span class="badge than">Thân</span>' : '';
        
        cungHTML += `
            <div class="cung ${cungData.laCungMenh ? 'cung-menh' : ''} ${cungData.laCungThan ? 'cung-than' : ''}">
                <div class="cung-header">
                    <span class="cung-chi">${cungData.chi}</span>
                    <span class="cung-ten">${cungData.tenCung}</span>
                    ${menhBadge}${thanBadge}
                </div>
                <div class="cung-sao-chinh">
                    ${saoChinh.map(s => `<span class="sao chinh ${HANH_CLASS[s.hanh]}">${s.ten}</span>`).join('')}
                </div>
                <div class="cung-sao-phu">
                    ${saoPhu.slice(0, 4).map(s => `<span class="sao phu">${s.ten}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    cungHTML += '</div>';
    
    container.innerHTML = headerHTML + cungHTML;
    container.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// MAIN
// ============================================
document.getElementById('tuViForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nam = parseInt(document.getElementById('nam').value);
    const thang = parseInt(document.getElementById('thang').value);
    const ngay = parseInt(document.getElementById('ngay').value);
    const gio = parseInt(document.getElementById('gio').value);
    const gioiTinh = document.getElementById('gioiTinh').value;
    
    const laSo = lapLaSo(ngay, thang, nam, gio, gioiTinh);
    renderLaSo(laSo);
});

console.log('🔮 Tử Vi Kit - Lập Lá Số loaded successfully!');