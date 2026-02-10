/**
 * Tử Vi Kit - MVP Complete
 * Features: Lá Số Tử Vi, Tứ Trụ (Bát Tự), Luận Giải
 * Based on lasotuvi repository
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

const CHINH_TINH = {
    'Tử Vi': { hanh: 'Thổ', nhom: 'bacDau' },
    'Liêm Trinh': { hanh: 'Hỏa', nhom: 'bacDau' },
    'Thiên Đồng': { hanh: 'Thủy', nhom: 'bacDau' },
    'Vũ Khúc': { hanh: 'Kim', nhom: 'bacDau' },
    'Thái Dương': { hanh: 'Hỏa', nhom: 'namDau' },
    'Thiên Cơ': { hanh: 'Mộc', nhom: 'namDau' },
    'Thiên Phủ': { hanh: 'Thổ', nhom: 'namDau' },
    'Thái Âm': { hanh: 'Thủy', nhom: 'bacDau' },
    'Tham Lang': { hanh: 'Thủy', nhom: 'bacDau' },
    'Cự Môn': { hanh: 'Thủy', nhom: 'bacDau' },
    'Thiên Tướng': { hanh: 'Thủy', nhom: 'namDau' },
    'Thiên Lương': { hanh: 'Mộc', nhom: 'namDau' },
    'Thất Sát': { hanh: 'Kim', nhom: 'namDau' },
    'Phá Quân': { hanh: 'Thủy', nhom: 'bacDau' }
};

const CUC = {
    'Kim': { so: 4, ten: 'Kim tứ Cục' },
    'Mộc': { so: 3, ten: 'Mộc tam Cục' },
    'Thủy': { so: 2, ten: 'Thủy nhị Cục' },
    'Hỏa': { so: 6, ten: 'Hỏa lục Cục' },
    'Thổ': { so: 5, ten: 'Thổ ngũ Cục' }
};

// ============================================
// UTILITIES
// ============================================
function jdFromDate(dd, mm, yy) {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function S2L(dd, mm, yy) {
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

function dichCung(cungBanDau, soCung) {
    let ketQua = cungBanDau + soCung;
    return ((ketQua - 1) % 12 + 12) % 12 + 1;
}

// ============================================
// TỨ TRỤ (BÁT TỰ)
// ============================================
function tinhTuTru(ngayDuong, thangDuong, namDuong, gioSinh) {
    // Can Chi năm (lunar)
    const [lunarDay, lunarMonth, lunarYear] = S2L(ngayDuong, thangDuong, namDuong);
    const canNamIndex = (lunarYear - 4) % 10 || 10;
    const chiNamIndex = (lunarYear - 4) % 12 || 12;
    
    // Can Chi tháng
    const chiThang = lunarMonth;
    const canThangIndex = (canNamIndex * 2 + lunarMonth - 1) % 10 || 10;
    
    // Can Chi ngày (Julian Day)
    const jd = jdFromDate(ngayDuong, thangDuong, namDuong);
    const canNgayIndex = (jd + 9) % 10 + 1;
    const chiNgayIndex = (jd + 1) % 12 + 1;
    
    // Can Chi giờ
    const chiGioMap = { 23: 1, 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5, 8: 5, 9: 6, 10: 6, 
                        11: 7, 12: 7, 13: 8, 14: 8, 15: 9, 16: 9, 17: 10, 18: 10, 19: 11, 20: 11, 21: 12, 22: 12 };
    const chiGioIndex = chiGioMap[gioSinh] || 1;
    const canGioIndex = (canNgayIndex * 2 + chiGioIndex - 2) % 10 || 10;
    
    return {
        nam: { can: CAN[canNamIndex - 1], chi: CHI[chiNamIndex - 1], index: { can: canNamIndex, chi: chiNamIndex } },
        thang: { can: CAN[canThangIndex - 1], chi: CHI[chiThang - 1] },
        ngay: { can: CAN[canNgayIndex - 1], chi: CHI[chiNgayIndex - 1], index: { can: canNgayIndex, chi: chiNgayIndex } },
        gio: { can: CAN[canGioIndex - 1], chi: CHI[chiGioIndex - 1] },
        amLich: { ngay: lunarDay, thang: lunarMonth, nam: lunarYear }
    };
}

// ============================================
// LÁ SỐ TỬ VI
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

function an14ChinhTinh(viTriTuVi) {
    const sao = {};
    sao['Tử Vi'] = viTriTuVi;
    sao['Thiên Cơ'] = dichCung(viTriTuVi, 4);
    sao['Thái Dương'] = dichCung(viTriTuVi, 6);
    sao['Vũ Khúc'] = dichCung(viTriTuVi, 8);
    sao['Thiên Đồng'] = dichCung(viTriTuVi, 10);
    sao['Liêm Trinh'] = dichCung(viTriTuVi, 11);
    
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
    const trangSinhTheoCuc = { 6: 3, 4: 6, 2: 9, 5: 9, 3: 12 };
    let viTri = trangSinhTheoCuc[cucSo] || 9;
    const thuanNghich = (amDuongNamSinh === 1 && gioiTinh === 1) || (amDuongNamSinh === -1 && gioiTinh === -1) ? 1 : -1;
    
    const vongTrangSinh = ['Tràng Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
    
    const ketQua = {};
    for (let i = 0; i < 12; i++) {
        ketQua[vongTrangSinh[i]] = dichCung(viTri, i * thuanNghich);
    }
    return ketQua;
}

function anLocTon(canNamIndex) {
    const khoiCung = [3, 4, 6, 7, 10, 10, 4, 5, 7, 8];
    const viTri = khoiCung[canNamIndex - 1] || 3;
    const vongLocTon = ['Lộc Tồn', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phù'];
    
    const ketQua = {};
    for (let i = 0; i < 12; i++) {
        ketQua[vongLocTon[i]] = dichCung(viTri, i);
    }
    return ketQua;
}

function lapLaSoTuVi(ngayDuong, thangDuong, namDuong, gioSinh, gioiTinhStr) {
    const [lunarDay, lunarMonth, lunarYear] = S2L(ngayDuong, thangDuong, namDuong);
    const canNamIndex = (lunarYear - 4) % 10 || 10;
    const chiNamIndex = (lunarYear - 4) % 12 || 12;
    
    const chiGioMap = { 23: 1, 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5, 8: 5, 9: 6, 10: 6, 
                        11: 7, 12: 7, 13: 8, 14: 8, 15: 9, 16: 9, 17: 10, 18: 10, 19: 11, 20: 11, 21: 12, 22: 12 };
    const chiGioIndex = chiGioMap[gioSinh] || 1;
    
    const amDuongNamSinh = canNamIndex % 2 === 1 ? 1 : -1;
    const gioiTinh = gioiTinhStr === 'Nam' ? 1 : -1;
    
    const viTriCungMenh = (lunarMonth + chiGioIndex - 1) % 12 || 12;
    const viTriCungThan = (lunarMonth - chiGioIndex + 1 + 12) % 12 || 12;
    
    const cuc = timCuc(viTriCungMenh, canNamIndex);
    const viTriTuVi = timTuVi(cuc.so, lunarDay);
    const chinhTinh = an14ChinhTinh(viTriTuVi);
    const trangSinh = anTrangSinh(cuc.so, amDuongNamSinh, gioiTinh);
    const locTon = anLocTon(canNamIndex);
    
    const cung = [];
    for (let i = 1; i <= 12; i++) {
        const chiCung = i;
        const tenCung = CUNG_NHAN_SU[(i - viTriCungMenh + 12) % 12];
        
        const saoTrongCung = [];
        for (const [tenSao, viTri] of Object.entries(chinhTinh)) {
            if (viTri === chiCung) saoTrongCung.push({ ten: tenSao, loai: 'chinh', ...CHINH_TINH[tenSao] });
        }
        for (const [tenSao, viTri] of Object.entries(trangSinh)) {
            if (viTri === chiCung) saoTrongCung.push({ ten: tenSao, loai: 'trangSinh', hanh: 'Thủy' });
        }
        for (const [tenSao, viTri] of Object.entries(locTon)) {
            if (viTri === chiCung) saoTrongCung.push({ ten: tenSao, loai: 'locTon', hanh: 'Thổ' });
        }
        
        cung.push({
            chi: CHI[chiCung - 1],
            chiIndex: chiCung,
            tenCung,
            laCungMenh: chiCung === viTriCungMenh,
            laCungThan: chiCung === viTriCungThan,
            sao: saoTrongCung
        });
    }
    
    return {
        duongLich: { ngay: ngayDuong, thang: thangDuong, nam: namDuong },
        amLich: { ngay: lunarDay, thang: lunarMonth, nam: lunarYear },
        tuTru: {
            nam: { can: CAN[canNamIndex - 1], chi: CHI[chiNamIndex - 1] },
            thang: { can: CAN[(canNamIndex * 2 + lunarMonth - 1) % 10 || 9], chi: CHI[lunarMonth - 1] },
            ngay: { can: CAN[(jdFromDate(ngayDuong, thangDuong, namDuong) + 9) % 10], chi: CHI[(jdFromDate(ngayDuong, thangDuong, namDuong) + 1) % 12] }
        },
        cungMenh: { viTri: viTriCungMenh, chi: CHI[viTriCungMenh - 1] },
        cungThan: { viTri: viTriCungThan, chi: CHI[viTriCungThan - 1] },
        cuc,
        amDuong: amDuongNamSinh === 1 ? 'Dương' : 'Âm',
        gioiTinh: gioiTinhStr,
        cung
    };
}

// ============================================
// LUẬN GIẢI
// ============================================
function luanGiaiTuVi(laSo) {
    const luan = [];
    const { cuc, cungMenh, tuTru, amDuong, gioiTinh, cung } = laSo;
    
    // Luận Cục
    const luanCucText = {
        'Kim': 'Kim tứ Cục: Tính cương nghị, quyết đoán. Phù hợp công nghệ, quân đội, tài chính.',
        'Mộc': 'Mộc tam Cục: Tính nhân hậu, từ bi. Phù hợp giáo dục, y tế, từ thiện.',
        'Thủy': 'Thủy nhị Cục: Tính thông minh, linh hoạt. Phù hợp kinh doanh, giao thương.',
        'Hỏa': 'Hỏa lục Cục: Tính nhiệt tình, sáng tạo. Phù hợp nghệ thuật, truyền thông.',
        'Thổ': 'Thổ ngũ Cục: Tính thật thà, chăm chỉ. Phù hợp xây dựng, bất động sản.'
    };
    luan.push({ title: '🎋 Cục Mệnh', content: luanCucText[cuc.hanh] || '' });
    
    // Luận Cung Mệnh
    const cungMenhData = cung.find(c => c.laCungMenh);
    const saoChinhMenh = cungMenhData.sao.filter(s => s.loai === 'chinh').map(s => s.ten).join(', ');
    luan.push({
        title: '🏠 Cung Mệnh (' + cungMenh.chi + ')',
        content: `Cung Mệnh có sao: ${saoChinhMenh || 'Không có chính tinh'}. Đây là cung quan trọng nhất ảnh hưởng đến tính cách và vận mệnh.`
    });
    
    // Luận Âm Dương
    const thuan = (amDuong === 'Dương' && gioiTinh === 'Nam') || (amDuong === 'Âm' && gioiTinh === 'Nữ');
    luan.push({
        title: '☯️ Âm Dương',
        content: `Nam ${amDuong} - Giới tính ${gioiTinh}. ${thuan ? 'Âm Dương thuận: Mệnh tốt, cuộc sống thuận lợi.' : 'Âm Dương nghịch: Cần nỗ lực nhiều hơn.'}`
    });
    
    // Luận Ngũ Hành
    const hanhNam = NGU_HANH[tuTru.nam.can];
    luan.push({
        title: '🔥 Ngũ Hành Năm Sinh',
        content: `${tuTru.nam.can} ${tuTru.nam.chi} thuộc hành ${hanhNam}. ${luanHanh(hanhNam)}`
    });
    
    return luan;
}

function luanHanh(hanh) {
    const luan = {
        'Kim': 'Hành Kim: Quyết đoán, cương nghị. Chú ý phổi, hô hấp, da.',
        'Mộc': 'Hành Mộc: Nhân hậu, tốt bụng. Chú ý gan, mắt, thần kinh.',
        'Thủy': 'Hành Thủy: Thông minh, linh hoạt. Chú ý thận, bàng quang, tai.',
        'Hỏa': 'Hành Hỏa: Nhiệt tình, sáng tạo. Chú ý tim, tuần hoàn, mắt.',
        'Thổ': 'Hành Thổ: Thật thà, chăm chỉ. Chú ý dạ dày, tiêu hóa.'
    };
    return luan[hanh] || '';
}

function luanTuTru(tuTru) {
    const luan = [];
    
    // Luận năm
    luan.push({
        title: '📅 Trụ Năm - ' + tuTru.nam.can + ' ' + tuTru.nam.chi,
        content: `Năm sinh ${tuTru.nam.can} ${tuTru.nam.chi}: ${luanCanChiNam(tuTru.nam.can, tuTru.nam.chi)}`
    });
    
    // Luận tháng
    luan.push({
        title: '📅 Trụ Tháng - ' + tuTru.thang.can + ' ' + tuTru.thang.chi,
        content: `Tháng sinh ${tuTru.thang.can} ${tuTru.thang.chi}: Ảnh hưởng đến gia đình, bố mẹ.`
    });
    
    // Luận ngày
    luan.push({
        title: '📅 Trụ Ngày - ' + tuTru.ngay.can + ' ' + tuTru.ngay.chi,
        content: `Ngày sinh ${tuTru.ngay.can} ${tuTru.ngay.chi}: Ảnh hưởng đến bản thân, vợ chồng.`
    });
    
    return luan;
}

function luanCanChiNam(can, chi) {
    const yNghia = {
        'Giáp Tý': 'Giáp Tý - Hải Trung Kim: Thông minh, tài giỏi nhưng đa nghi.',
        'Ất Sửu': 'Ất Sửu - Hải Trung Kim: Chăm chỉ, kiên nhẫn, có chí tiến thủ.',
        'Bính Dần': 'Bính Dần - Lư Trung Hỏa: Nhiệt tình, mạnh mẽ, có lãnh đạo.',
        'Đinh Mão': 'Đinh Mão - Lư Trung Hỏa: Ôn hòa, tinh tế, có nghệ thuật.'
    };
    return yNghia[can + ' ' + chi] || `Năm ${can} ${chi}: Cần xem chi tiết lá số.`;
}

// ============================================
// RENDER
// ============================================
function renderTuVi(laSo) {
    const container = document.getElementById('tuViResult');
    container.innerHTML = '';
    
    // Header info
    const headerHTML = `
        <div class="laso-header">
            <h3>⭐ Lá Số Tử Vi</h3>
            <div class="info-grid">
                <div class="info-item"><span class="label">Âm Lịch</span><span class="value">${laSo.amLich.ngay}/${laSo.amLich.thang}/${laSo.amLich.nam}</span></div>
                <div class="info-item"><span class="label">Cục</span><span class="value">${laSo.cuc.ten}</span></div>
                <div class="info-item"><span class="label">Mệnh/Thân</span><span class="value">${laSo.cungMenh.chi}/${laSo.cungThan.chi}</span></div>
                <div class="info-item"><span class="label">Âm Dương</span><span class="value">${laSo.amDuong} ${laSo.gioiTinh}</span></div>
            </div>
        </div>
    `;
    container.innerHTML += headerHTML;
    
    // 12 Cung Grid
    const thuTuCung = [5, 6, 7, null, 4, 8, 3, 9, 2, 1, 12, 11, 10, null];
    let gridHTML = '<div class="laso-grid">';
    
    for (let i = 0; i < 14; i++) {
        const chiIndex = thuTuCung[i];
        if (chiIndex === null) {
            gridHTML += '<div class="cung-empty"></div>';
            continue;
        }
        
        const cungData = laSo.cung.find(c => c.chiIndex === chiIndex);
        const saoChinh = cungData.sao.filter(s => s.loai === 'chinh');
        const saoPhu = cungData.sao.filter(s => s.loai !== 'chinh');
        
        const menhBadge = cungData.laCungMenh ? '<span class="badge menh">Mệnh</span>' : '';
        const thanBadge = cungData.laCungThan ? '<span class="badge than">Thân</span>' : '';
        
        gridHTML += `
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
                    ${saoPhu.slice(0, 3).map(s => `<span class="sao phu">${s.ten}</span>`).join('')}
                </div>
            </div>
        `;
    }
    gridHTML += '</div>';
    container.innerHTML += gridHTML;
}

function renderTuTru(tuTru) {
    const container = document.getElementById('tuTruResult');
    container.innerHTML = `
        <div class="tu-tru-section">
            <h3>🎋 Tứ Trụ (Bát Tự)</h3>
            <div class="tu-tru-grid">
                <div class="tru-item">
                    <span class="label">Năm</span>
                    <span class="can-chi">${tuTru.nam.can} ${tuTru.nam.chi}</span>
                    <span class="hanh ${HANH_CLASS[NGU_HANH[tuTru.nam.can]]}">${NGU_HANH[tuTru.nam.can]}</span>
                </div>
                <div class="tru-item">
                    <span class="label">Tháng</span>
                    <span class="can-chi">${tuTru.thang.can} ${tuTru.thang.chi}</span>
                    <span class="hanh ${HANH_CLASS[NGU_HANH[tuTru.thang.can]]}">${NGU_HANH[tuTru.thang.can]}</span>
                </div>
                <div class="tru-item">
                    <span class="label">Ngày</span>
                    <span class="can-chi">${tuTru.ngay.can} ${tuTru.ngay.chi}</span>
                    <span class="hanh ${HANH_CLASS[NGU_HANH[tuTru.ngay.can]]}">${NGU_HANH[tuTru.ngay.can]}</span>
                </div>
                <div class="tru-item">
                    <span class="label">Giờ</span>
                    <span class="can-chi">${tuTru.gio.can} ${tuTru.gio.chi}</span>
                    <span class="hanh ${HANH_CLASS[NGU_HANH[tuTru.gio.can]]}">${NGU_HANH[tuTru.gio.can]}</span>
                </div>
            </div>
        </div>
    `;
}

function renderLuanGiai(luanData, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = luanData.map(item => `
        <div class="luan-giai-item">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
        </div>
    `).join('');
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
    
    // Tính toán
    const tuTru = tinhTuTru(ngay, thang, nam, gio);
    const laSoTuVi = lapLaSoTuVi(ngay, thang, nam, gio, gioiTinh);
    const luanTuViData = luanGiaiTuVi(laSoTuVi);
    const luanTuTruData = luanTuTru(tuTru);
    
    // Render
    renderTuTru(tuTru);
    renderTuVi(laSoTuVi);
    renderLuanGiai(luanTuTruData, 'luanTuTruResult');
    renderLuanGiai(luanTuViData, 'luanTuViResult');
    
    // Show results
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
});

console.log('🔮 Tử Vi Kit MVP Complete loaded!');