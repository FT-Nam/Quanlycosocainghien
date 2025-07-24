import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    tienSuBenhLy: '', benhTamThan: '', tienSuBenhGiaDinh: '', tinhTrangGiaDinh: '',
    chieuCao: '', canNang: '', nhipTim: '', huyetAp: '', benhManTinh: '',
    loaiMaTuy: '', tuoiLanDauSD: '', tuoiLanDauTiem: '', tongThoiGianSD: '', soTienSD: '', cachSD: '',
    lanXetNghiem: '', thoiGianXetNghiem: '', ketQuaXetNghiem: '',
    thoiGianChanDoan: '', ketQuaChanDoan: '', bacSi: '', benhLyKem: '', tenThuoc: '', soLuongThuoc: ''
};

export default function SucKhoeDetail({ mode }) {
    const { id } = useParams();
    const nav = useNavigate();
    const loc = useLocation();
    const isNew = mode === 'add' || loc.pathname.endsWith('/new');
    const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
    const isView = !isNew && !isEdit;
    const [data, setData] = useState(initData);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (!isNew && id) {
            // TODO: fetch data by id
            setData({
                tienSuBenhLy: 'Không', benhTamThan: 'Không', tienSuBenhGiaDinh: '', tinhTrangGiaDinh: '',
                chieuCao: '170', canNang: '65', nhipTim: '70', huyetAp: '120/80', benhManTinh: '',
                loaiMaTuy: 'Heroin', tuoiLanDauSD: '18', tuoiLanDauTiem: '', tongThoiGianSD: '', soTienSD: '', cachSD: '',
                lanXetNghiem: '1', thoiGianXetNghiem: '2023-01-01', ketQuaXetNghiem: 'Âm tính',
                thoiGianChanDoan: '2023-01-01', ketQuaChanDoan: 'Ổn định', bacSi: 'BS. A', benhLyKem: '', tenThuoc: 'Methadone', soLuongThuoc: '30'
            });
        } else {
            setData(initData);
        }
        setErr('');
    }, [id, isNew]);

    const handleChange = e => {
        const { name, value } = e.target;
        setData(d => ({ ...d, [name]: value }));
        setErr('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!data.tienSuBenhLy || !data.loaiMaTuy) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm sức khỏe/điều trị' : isEdit ? 'Chỉnh sửa sức khỏe/điều trị' : 'Xem chi tiết sức khỏe/điều trị'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Tiền sử bệnh lý *</label>
                        <input name="tienSuBenhLy" value={data.tienSuBenhLy} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng bệnh tâm thần</label>
                        <input name="benhTamThan" value={data.benhTamThan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tiền sử bệnh gia đình</label>
                        <input name="tienSuBenhGiaDinh" value={data.tienSuBenhGiaDinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng gia đình</label>
                        <input name="tinhTrangGiaDinh" value={data.tinhTrangGiaDinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Chiều cao</label>
                        <input name="chieuCao" value={data.chieuCao} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Cân nặng</label>
                        <input name="canNang" value={data.canNang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nhịp tim</label>
                        <input name="nhipTim" value={data.nhipTim} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Huyết áp</label>
                        <input name="huyetAp" value={data.huyetAp} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Bệnh mãn tính</label>
                        <input name="benhManTinh" value={data.benhManTinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại ma túy đã sử dụng *</label>
                        <input name="loaiMaTuy" value={data.loaiMaTuy} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tuổi lần đầu sử dụng</label>
                        <input name="tuoiLanDauSD" value={data.tuoiLanDauSD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tuổi lần đầu tiêm chích</label>
                        <input name="tuoiLanDauTiem" value={data.tuoiLanDauTiem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng thời gian sử dụng</label>
                        <input name="tongThoiGianSD" value={data.tongThoiGianSD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số tiền sử dụng/ngày</label>
                        <input name="soTienSD" value={data.soTienSD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Cách sử dụng</label>
                        <input name="cachSD" value={data.cachSD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Lần xét nghiệm</label>
                        <input name="lanXetNghiem" value={data.lanXetNghiem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian xét nghiệm</label>
                        <input type="date" name="thoiGianXetNghiem" value={data.thoiGianXetNghiem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả xét nghiệm</label>
                        <input name="ketQuaXetNghiem" value={data.ketQuaXetNghiem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian chẩn đoán</label>
                        <input type="date" name="thoiGianChanDoan" value={data.thoiGianChanDoan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả chẩn đoán</label>
                        <input name="ketQuaChanDoan" value={data.ketQuaChanDoan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Bác sĩ điều trị</label>
                        <input name="bacSi" value={data.bacSi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Bệnh lý đi kèm</label>
                        <input name="benhLyKem" value={data.benhLyKem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên thuốc</label>
                        <input name="tenThuoc" value={data.tenThuoc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng thuốc sử dụng</label>
                        <input name="soLuongThuoc" value={data.soLuongThuoc} onChange={handleChange} disabled={isView} />
                    </div>
                </div>
                {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
                <div className="form-footer">
                    <button type="button" onClick={() => nav(-1)} className="form-btn back-btn">Quay lại</button>
                    {!isView && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
                </div>
            </form>
        </div>
    );
} 