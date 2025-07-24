import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maTaiSan: '', tenTaiSan: '', nhaCungCap: '', trangThai: '', donViTinh: '', soLuong: '' };

export default function TaiSanDetail({ mode }) {
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
            setData({ maTaiSan: 'TS01', tenTaiSan: 'Máy tính xách tay', nhaCungCap: 'FPT', trangThai: 'Đang sử dụng', donViTinh: 'Cái', soLuong: 10 });
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
        if (!data.maTaiSan || !data.tenTaiSan) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm tài sản' : isEdit ? 'Chỉnh sửa tài sản' : 'Xem chi tiết tài sản'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã tài sản *</label>
                        <input name="maTaiSan" value={data.maTaiSan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên tài sản *</label>
                        <input name="tenTaiSan" value={data.tenTaiSan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nhà cung cấp</label>
                        <input name="nhaCungCap" value={data.nhaCungCap} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <input name="trangThai" value={data.trangThai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đơn vị tính</label>
                        <input name="donViTinh" value={data.donViTinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng</label>
                        <input name="soLuong" value={data.soLuong} onChange={handleChange} disabled={isView} />
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