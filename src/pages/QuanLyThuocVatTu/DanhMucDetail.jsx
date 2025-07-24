import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const defaultValues = {
    maDanhMuc: '',
    tenDanhMuc: '',
    trangThai: '',
    donViTinh: '',
};

export default function DanhMucDetail({ mode }) {
    const { id } = useParams();
    const nav = useNavigate();
    const loc = useLocation();
    const isNew = mode === 'add' || loc.pathname.endsWith('/new');
    const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
    const isView = !isNew && !isEdit;
    const [values, setValues] = useState(defaultValues);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (!isNew && id) {
            // TODO: fetch data by id
            setValues({ maDanhMuc: 'DM001', tenDanhMuc: 'Thuốc giảm đau', trangThai: 'Đang sử dụng', donViTinh: 'Hộp' });
        } else {
            setValues(defaultValues);
        }
        setErr('');
    }, [id, isNew]);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues(v => ({ ...v, [name]: value }));
        setErr('');
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!values.maDanhMuc || !values.tenDanhMuc) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };
    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm danh mục' : isEdit ? 'Chỉnh sửa danh mục' : 'Xem chi tiết danh mục'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã danh mục *</label>
                        <input name="maDanhMuc" value={values.maDanhMuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên danh mục *</label>
                        <input name="tenDanhMuc" value={values.tenDanhMuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái *</label>
                        <input name="trangThai" value={values.trangThai} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đơn vị tính *</label>
                        <input name="donViTinh" value={values.donViTinh} onChange={handleChange} required disabled={isView} />
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