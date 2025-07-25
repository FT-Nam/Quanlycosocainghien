import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maPhong: '', tenPhong: '', trangThai: '', phuTrach: '', soLuong: '', danhSach: '' };

export default function PhongBanDetail({ mode }) {
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
            setData({ maPhong: 'PB01', tenPhong: 'Phòng Hành chính', trangThai: 'Hoạt động', phuTrach: 'Nguyễn Văn Hiệp', soLuong: 5, danhSach: 'A, B, C, D, E' });
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
        if (!data.maPhong || !data.tenPhong) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm phòng ban/bộ phận' : isEdit ? 'Chỉnh sửa phòng ban/bộ phận' : 'Xem chi tiết phòng ban/bộ phận'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã phòng *</label>
                        <input name="maPhong" value={data.maPhong} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên phòng *</label>
                        <input name="tenPhong" value={data.tenPhong} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái phòng</label>
                        <input name="trangThai" value={data.trangThai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người phụ trách phòng</label>
                        <input name="phuTrach" value={data.phuTrach} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng cán bộ trong phòng</label>
                        <input name="soLuong" value={data.soLuong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/3' }}>
                        <label>Danh sách cán bộ trong phòng</label>
                        <textarea name="danhSach" value={data.danhSach} onChange={handleChange} disabled={isView} rows={2} />
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