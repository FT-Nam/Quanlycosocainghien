import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const defaultValues = {
    maSanPham: '',
    sku: '',
    loaiSanPham: '',
    donViTinh: '',
    nhaCungCap: '',
    moTa: '',
    giaNhap: '',
};

export default function ThuocVatTuDetail({ mode }) {
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
            setValues({ maSanPham: 'SP001', sku: 'SKU001', loaiSanPham: 'Thuốc', donViTinh: 'Hộp', nhaCungCap: 'Công ty Dược A', moTa: 'Thuốc giảm đau', giaNhap: '100000' });
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
        if (!values.maSanPham || !values.sku) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };
    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thuốc/vật tư' : isEdit ? 'Chỉnh sửa thuốc/vật tư' : 'Xem chi tiết thuốc/vật tư'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã sản phẩm *</label>
                        <input name="maSanPham" value={values.maSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>SKU *</label>
                        <input name="sku" value={values.sku} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại sản phẩm *</label>
                        <input name="loaiSanPham" value={values.loaiSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đơn vị tính *</label>
                        <input name="donViTinh" value={values.donViTinh} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nhà cung cấp *</label>
                        <input name="nhaCungCap" value={values.nhaCungCap} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mô tả</label>
                        <input name="moTa" value={values.moTa} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giá nhập *</label>
                        <input name="giaNhap" value={values.giaNhap} onChange={handleChange} required disabled={isView} />
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