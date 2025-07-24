import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maDanhMuc: '', tenDanhMuc: '', trangThai: '', donViTinh: '' };

export default function DanhMucDetail({ mode }) {
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
            setData({ maDanhMuc: 'DM01', tenDanhMuc: 'Thiết bị điện', trangThai: 'Hoạt động', donViTinh: 'Bộ' });
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
        if (!data.maDanhMuc || !data.tenDanhMuc) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm danh mục tài sản' : isEdit ? 'Chỉnh sửa danh mục tài sản' : 'Xem chi tiết danh mục tài sản'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã danh mục *</label>
                        <input name="maDanhMuc" value={data.maDanhMuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên danh mục *</label>
                        <input name="tenDanhMuc" value={data.tenDanhMuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <input name="trangThai" value={data.trangThai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đơn vị tính</label>
                        <input name="donViTinh" value={data.donViTinh} onChange={handleChange} disabled={isView} />
                    </div>
                </div>
                {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 18 }}>
                    <button type="button" onClick={() => nav(-1)}>Quay lại</button>
                    {!isView && <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>}
                </div>
            </form>
        </div>
    );
} 