/**
 * Tử Vi Kit - MVP Application
 * Based on Tử Vi Kit knowledge base
 */

// Constants from Tử Vi Kit
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

// Tính Can Chi
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

function tinhCanChiNgay(nam, thang, ngay) {
    // Simplified calculation - in production would use lunar calendar
    const canNgay = CAN[(ngay * 2) % 10];
    const chiNgay = CHI[(ngay - 1) % 12];
    return { can: canNgay, chi: chiNgay, full: `${canNgay} ${chiNgay}` };
}

// Lập Tứ Trụ
function lapTuTru(nam, thang, ngay, gio) {
    const namCC = tinhCanChiNam(nam);
    const thangCC = tinhCanChiThang(nam, thang);
    const ngayCC = tinhCanChiNgay(nam, thang, ngay);
    
    const chiGio = tinhCanChiGio(gio);
    const canNamIndex = (nam - 4) % 10;
    const chiGioIndex = CHI.indexOf(chiGio);
    const canGio = CAN[(canNamIndex * 2 + chiGioIndex) % 10];
    
    return {
        nam: { ...namCC, hanh: NGU_HANH[namCC.can] },
        thang: { ...thangCC, hanh: NGU_HANH[thangCC.can] },
        ngay: { ...ngayCC, hanh: NGU_HANH[ngayCC.can] },
        gio: { can: canGio, chi: chiGio, full: `${canGio} ${chiGio}`, hanh: NGU_HANH[canGio] }
    };
}

// Tính tuổi và vận hạn
function tinhVanHan(namSinh, namXem) {
    const tuoi = namXem - namSinh;
    let van;
    
    if (tuoi < 15) van = "Sơn Nạn";
    else if (tuoi < 30) van = "Sơ Hạn";
    else if (tuoi < 50) van = "Trung Hạn";
    else if (tuoi < 70) van = "Hậu Hạn";
    else van = "Lão Hạn";
    
    return { tuoi, van, namXem };
}

// Luận giải cơ bản
function luanGiai(tuTru, gioiTinh) {
    const menh = tuTru.ngay.hanh;
    const luan = [];
    
    // Luận theo mệnh
    const luanMenh = {
        'Mộc': 'Ngườicó mệnh Mộc thường nhân hậu, tốt bụng, thích giúp đỡ ngườikhác. Cần chú ý gan và mắt.',
        'Hỏa': 'Ngườicó mệnh Hỏa nhiệt tình, năng động, thích lãnh đạo. Cần chú ý tim và tuần hoàn.',
        'Thổ': 'Ngườicó mệnh Thổ đáng tin cậy, thực tế, thích ổn định. Cần chú ý dạ dày và tiêu hóa.',
        'Kim': 'Ngườicó mệnh Kim quyết đoán, cương nghị, có nguyên tắc. Cần chú ý phổi và hô hấp.',
        'Thủy': 'Ngườicó mệnh Thủy thông minh, linh hoạt, thích giao tiếp. Cần chú ý thận và bàng quang.'
    };
    
    luan.push({
        title: '🎋 Mệnh Ngũ Hành',
        content: luanMenh[menh] || 'Mệnh cân bằng, cần xem thêm các yếu tố khác.'
    });
    
    // Luận theo năm sinh (con giáp)
    const chiNam = tuTru.nam.chi;
    const conGiap = CON_GIAP[chiNam];
    const tinhCachGiap = {
        'Chuột': 'Thông minh, nhanh nhẹn, thích nghi tốt',
        'Trâu': 'Cần cù, chăm chỉ, kiên nhẫn',
        'Hổ': 'Dũng cảm, tự tin, thích lãnh đạo',
        'Mèo': 'Nhẹ nhàng, tinh tế, khéo léo',
        'Rồng': 'Phóng khoáng, đầy tham vọng, may mắn',
        'Rắn': 'Khôn ngoan, bí ẩn, sâu sắc',
        'Ngựa': 'Năng động, tự do, thích phiêu lưu',
        'Dê': 'Hiền lành, nghệ thuật, nhạy cảm',
        'Khỉ': 'Thông minh, hài hước, linh hoạt',
        'Gà': 'Chăm chỉ, tỉ mỉ, thẳng thắn',
        'Chó': 'Trung thành, công bằng, có trách nhiệm',
        'Lợn': 'Thật thà, phúc hậu, thích hưởng thụ'
    };
    
    luan.push({
        title: `🐾 Tuổi ${conGiap} (${chiNam})`,
        content: tinhCachGiap[conGiap] || 'Tính cách cân bằng'
    });
    
    // Luận theo giờ sinh
    const chiGio = tuTru.gio.chi;
    const luanGio = {
        'Tý': 'Sinh giờ Tý (23h-1h): Thông minh, nhạy bén, thích nghi tốt.',
        'Sửu': 'Sinh giờ Sửu (1h-3h): Chăm chỉ, kiên nhẫn, có trách nhiệm.',
        'Dần': 'Sinh giờ Dần (3h-5h): Dũng cảm, quyết đoán, thích lãnh đạo.',
        'Mão': 'Sinh giờ Mão (5h-7h): Hiền lành, tinh tế, có duyên.',
        'Thìn': 'Sinh giờ Thìn (7h-9h): Thông minh, phóng khoáng, may mắn.',
        'Tỵ': 'Sinh giờ Tỵ (9h-11h): Khôn ngoan, sâu sắc, bí ẩn.',
        'Ngọ': 'Sinh giờ Ngọ (11h-13h): Năng động, nhiệt tình, tự tin.',
        'Mùi': 'Sinh giờ Mùi (13h-15h): Hiền lành, nghệ thuật, nhạy cảm.',
        'Thân': 'Sinh giờ Thân (15h-17h): Thông minh, hài hước, linh hoạt.',
        'Dậu': 'Sinh giờ Dậu (17h-19h): Chăm chỉ, tỉ mỉ, có trách nhiệm.',
        'Tuất': 'Sinh giờ Tuất (19h-21h): Trung thành, công bằng, đáng tin.',
        'Hợi': 'Sinh giờ Hợi (21h-23h): Thật thà, phúc hậu, may mắn.'
    };
    
    luan.push({
        title: '⏰ Giờ Sinh',
        content: luanGio[chiGio] || ''
    });
    
    // Luận theo giới tính
    if (gioiTinh === 'Nu') {
        luan.push({
            title: '👩 Giới Tính',
            content: 'Nữ mệnh nên chú ý các cung Phu Thê, Tử Tức. Nên lấy chồng tuổi hợp: ' + tinhTuoiHop(chiNam)
        });
    } else {
        luan.push({
            title: '👨 Giới Tính',
            content: 'Nam mệnh nên chú ý các cung Quan Lộc, Tài Bạch. Nên lấy vợ tuổi hợp: ' + tinhTuoiHop(chiNam)
        });
    }
    
    return luan;
}

function tinhTuoiHop(chiNam) {
    const hop = {
        'Tý': 'Sửu, Thìn, Thân',
        'Sửu': 'Tý, Tỵ, Dậu',
        'Dần': 'Mão, Ngọ, Tuất',
        'Mão': 'Dần, Mùi, Hợi',
        'Thìn': 'Tý, Thân, Dậu',
        'Tỵ': 'Sửu, Dậu, Thân',
        'Ngọ': 'Dần, Tuất, Mùi',
        'Mùi': 'Mão, Ngọ, Hợi',
        'Thân': 'Thìn, Tý, Tỵ',
        'Dậu': 'Sửu, Thìn, Tỵ',
        'Tuất': 'Dần, Ngọ, Mão',
        'Hợi': 'Mão, Mùi, Dần'
    };
    return hop[chiNam] || '';
}

// Vận hạn 2024
function luanVanHan2024(tuTru) {
    const chiNam = tuTru.nam.chi;
    const saoLuuNien = getSaoLuuNien(2024);
    
    // Kiểm tra Tam Tai
    const tamTai = checkTamTai(chiNam, 2024);
    
    let content = `Năm 2024 là năm Giáp Thìn. `;
    content += `Sao lưu niên: ${saoLuuNien}. `;
    
    if (tamTai) {
        content += `⚠️ Năm nay là năm Tam Tai của bạn, cần cẩn thận các quyết định lớn. `;
    } else {
        content += `✅ Năm nay không phải Tam Tai, có thể tiến hành các việc quan trọng. `;
    }
    
    // Lợi hướng
    const huong = ['Đông', 'Nam', 'Tây', 'Bắc', 'Đông Nam', 'Tây Nam', 'Đông Bắc', 'Tây Bắc'];
    const huongTot = huong[Math.floor(Math.random() * huong.length)];
    content += `Hướng tốt cho bạn năm nay: ${huongTot}.`;
    
    return {
        sao: saoLuuNien,
        tamTai: tamTai,
        content: content
    };
}

function getSaoLuuNien(nam) {
    const sao = {
        2024: 'Bế Tỏa (Tích lũy)',
        2025: 'Liêm Trinh (Trí tuệ)',
        2026: 'Tham La (Tranh chấp)'
    };
    return sao[nam] || 'Không xác định';
}

function checkTamTai(chiNam, namXem) {
    const chiXem = tinhCanChiNam(namXem).chi;
    const tamTaiMap = {
        'Tý': ['Sửu', 'Thìn', 'Mùi'],
        'Sửu': ['Tý', 'Ngọ', 'Mùi'],
        'Dần': ['Tý', 'Ngọ', 'Tuất'],
        'Mão': ['Sửu', 'Thìn', 'Tuất'],
        'Thìn': ['Tý', 'Sửu', 'Dần'],
        'Tỵ': ['Hợi', 'Tuất', 'Sửu'],
        'Ngọ': ['Tý', 'Sửu', 'Thìn'],
        'Mùi': ['Dần', 'Mão', 'Thìn'],
        'Thân': ['Ngọ', 'Tỵ', 'Tuất'],
        'Dậu': ['Tý', 'Sửu', 'Thìn'],
        'Tuất': ['Tý', 'Ngọ', 'Tuất'],
        'Hợi': ['Dần', 'Thìn', 'Ngọ']
    };
    
    return tamTaiMap[chiNam]?.includes(chiXem) || false;
}

// Render kết quả
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

function renderInfo(tuTru, gioiTinh) {
    const container = document.getElementById('infoResult');
    const chiNam = tuTru.nam.chi;
    const conGiap = CON_GIAP[chiNam];
    
    container.innerHTML = `
        <div class="info-item">
            <span class="label">Con Giáp</span>
            <span class="value">${conGiap} (${chiNam})</span>
        </div>
        <div class="info-item">
            <span class="label">Mệnh Ngũ Hành</span>
            <span class="value">${tuTru.ngay.hanh}</span>
        </div>
        <div class="info-item">
            <span class="label">Giờ Sinh</span>
            <span class="value">${tuTru.gio.chi}</span>
        </div>
        <div class="info-item">
            <span class="label">Giới Tính</span>
            <span class="value">${gioiTinh === 'Nam' ? 'Nam' : 'Nữ'}</span>
        </div>
    `;
}

function renderLuanGiai(luanGiaiData) {
    const container = document.getElementById('luanGiaiResult');
    container.innerHTML = luanGiaiData.map(item => `
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
            <span class="van-han-title">Sao: ${vanHan.sao}</span>
            ${vanHan.tamTai ? '<span class="van-han-badge" style="background: #E74C3C;">Tam Tai</span>' : '<span class="van-han-badge">Bình An</span>'}
        </div>
        <div class="van-han-content">
            ${vanHan.content}
        </div>
    `;
}

// Main handler
document.getElementById('tuViForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nam = parseInt(document.getElementById('nam').value);
    const thang = parseInt(document.getElementById('thang').value);
    const ngay = parseInt(document.getElementById('ngay').value);
    const gio = parseInt(document.getElementById('gio').value);
    const gioiTinh = document.getElementById('gioiTinh').value;
    
    // Calculate
    const tuTru = lapTuTru(nam, thang, ngay, gio);
    const luanGiaiData = luanGiai(tuTru, gioiTinh);
    const vanHan = luanVanHan2024(tuTru);
    
    // Render
    renderTuTru(tuTru);
    renderInfo(tuTru, gioiTinh);
    renderLuanGiai(luanGiaiData);
    renderVanHan(vanHan);
    
    // Show result
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
});

console.log('🔮 Tử Vi Kit MVP loaded successfully!');