import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maKhoa: '', tenKhoa: '', phanLoai: '', moTa: '' };

export default function GiaoDucTuVanDetail({ mode }) {
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
            setData({ maKhoa: 'GD001', tenKhoa: 'Kỹ năng sống', phanLoai: 'Giáo dục', moTa: 'Khóa học kỹ năng sống cơ bản' });
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
        if (!data.maKhoa || !data.tenKhoa) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm khóa học giáo dục/tư vấn' : isEdit ? 'Chỉnh sửa khóa học giáo dục/tư vấn' : 'Xem chi tiết khóa học giáo dục/tư vấn'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã khóa học *</label>
                        <input name="maKhoa" value={data.maKhoa} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên khóa học *</label>
                        <input name="tenKhoa" value={data.tenKhoa} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Phân loại *</label>
                        <input name="phanLoai" value={data.phanLoai} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/3' }}>
                        <label>Mô tả khóa học</label>
                        <textarea name="moTa" value={data.moTa} onChange={handleChange} disabled={isView} rows={3} />
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