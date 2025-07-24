import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    thoiGianDanhGia: '', ketQuaYTe: '', ketQuaPhucHoi: '', ketQuaGiaoDuc: '', ketQuaLaoDong: '', ketQuaChuanBi: '', loaiXacNhan: '', soXacNhan: '', thoiGianCap: '', toChucQuanLy: '', thoiGianDeXuat: ''
};

export default function TaiHoaNhapDetail({ mode }) {
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
                thoiGianDanhGia: '2023-07-01', ketQuaYTe: 'Đạt', ketQuaPhucHoi: 'Tốt', ketQuaGiaoDuc: 'Khá', ketQuaLaoDong: 'Tốt', ketQuaChuanBi: 'Đạt', loaiXacNhan: 'Giấy xác nhận', soXacNhan: 'XN001', thoiGianCap: '2023-07-10', toChucQuanLy: 'Trung tâm A', thoiGianDeXuat: '2023-08-01'
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
        if (!data.ketQuaYTe || !data.loaiXacNhan) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm tái hòa nhập/quản lý sau cai' : isEdit ? 'Chỉnh sửa tái hòa nhập/quản lý sau cai' : 'Xem chi tiết tái hòa nhập/quản lý sau cai'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Thời gian đánh giá kết quả cai nghiện</label>
                        <input type="date" name="thoiGianDanhGia" value={data.thoiGianDanhGia} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả đánh giá y tế *</label>
                        <input name="ketQuaYTe" value={data.ketQuaYTe} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả đánh giá phục hồi</label>
                        <input name="ketQuaPhucHoi" value={data.ketQuaPhucHoi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả đánh giá giáo dục</label>
                        <input name="ketQuaGiaoDuc" value={data.ketQuaGiaoDuc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả đánh giá lao động trị liệu, học nghề</label>
                        <input name="ketQuaLaoDong" value={data.ketQuaLaoDong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả đánh giá chuẩn bị tái hòa nhập</label>
                        <input name="ketQuaChuanBi" value={data.ketQuaChuanBi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại xác nhận (giấy xác nhận/giấy chứng nhận) *</label>
                        <input name="loaiXacNhan" value={data.loaiXacNhan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số xác nhận/chứng nhận hoàn thành cai nghiện</label>
                        <input name="soXacNhan" value={data.soXacNhan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian cấp</label>
                        <input type="date" name="thoiGianCap" value={data.thoiGianCap} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổ chức quản lý</label>
                        <input name="toChucQuanLy" value={data.toChucQuanLy} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian đề xuất quản lý sau cai</label>
                        <input type="date" name="thoiGianDeXuat" value={data.thoiGianDeXuat} onChange={handleChange} disabled={isView} />
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