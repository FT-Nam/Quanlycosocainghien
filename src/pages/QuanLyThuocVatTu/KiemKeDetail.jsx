import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const defaultValues = {
    maSanPham: '',
    tenSanPham: '',
    thoiGianKiemKe: '',
    slTonThucTe: '',
    slChenhLech: '',
    lyDo: '',
    giaTriChenhLech: '',
    nguoiThucHien: '',
};

export default function KiemKeDetail({ mode }) {
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
            setValues({ maSanPham: 'SP001', tenSanPham: 'Thuốc giảm đau', thoiGianKiemKe: '2024-07-01', slTonThucTe: 95, slChenhLech: -5, lyDo: 'Hao hụt', giaTriChenhLech: '-500000', nguoiThucHien: 'Nguyễn Văn A' });
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
        if (!values.maSanPham || !values.tenSanPham) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };
    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm kiểm kê' : isEdit ? 'Chỉnh sửa kiểm kê' : 'Xem chi tiết kiểm kê'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã sản phẩm *</label>
                        <input name="maSanPham" value={values.maSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên sản phẩm *</label>
                        <input name="tenSanPham" value={values.tenSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kiểm kê *</label>
                        <input type="date" name="thoiGianKiemKe" value={values.thoiGianKiemKe} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>SL tồn thực tế *</label>
                        <input name="slTonThucTe" value={values.slTonThucTe} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>SL chênh lệch *</label>
                        <input name="slChenhLech" value={values.slChenhLech} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Lý do</label>
                        <input name="lyDo" value={values.lyDo} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giá trị chênh lệch *</label>
                        <input name="giaTriChenhLech" value={values.giaTriChenhLech} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người thực hiện *</label>
                        <input name="nguoiThucHien" value={values.nguoiThucHien} onChange={handleChange} required disabled={isView} />
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