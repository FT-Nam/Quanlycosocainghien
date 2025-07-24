import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { tenHocVien: '', maHocVien: '', vaoPhong: '', raPhong: '', ghiChu: '' };

export default function LichSuLuuTruDetail({ mode }) {
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
            setData({ tenHocVien: 'Nguyễn Văn A', maHocVien: 'HV01', vaoPhong: '2024-06-01', raPhong: '2024-07-01', ghiChu: 'Chuyển phòng' });
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
        if (!data.tenHocVien || !data.maHocVien) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm lịch sử lưu trú' : isEdit ? 'Chỉnh sửa lịch sử lưu trú' : 'Xem chi tiết lịch sử lưu trú'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Tên học viên *</label>
                        <input name="tenHocVien" value={data.tenHocVien} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mã học viên *</label>
                        <input name="maHocVien" value={data.maHocVien} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian vào phòng</label>
                        <input type="date" name="vaoPhong" value={data.vaoPhong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian ra phòng</label>
                        <input type="date" name="raPhong" value={data.raPhong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/3' }}>
                        <label>Ghi chú</label>
                        <textarea name="ghiChu" value={data.ghiChu} onChange={handleChange} disabled={isView} rows={2} />
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