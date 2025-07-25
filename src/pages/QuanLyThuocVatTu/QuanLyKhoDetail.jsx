import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const defaultValues = {
    soLuongTon: '',
    soLuongSuDung: '',
    soLuongDangXuLy: '',
};

export default function QuanLyKhoDetail({ mode }) {
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
            setValues({ soLuongTon: '100', soLuongSuDung: '80', soLuongDangXuLy: '20', nguoiQuanLy: 'Nguyễn Thị Mai' });
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
        if (!values.soLuongTon || !values.soLuongSuDung) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };
    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm quản lý kho' : isEdit ? 'Chỉnh sửa quản lý kho' : 'Xem chi tiết quản lý kho'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Số lượng tồn kho *</label>
                        <input name="soLuongTon" value={values.soLuongTon} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng tồn kho có thể sử dụng *</label>
                        <input name="soLuongSuDung" value={values.soLuongSuDung} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng tồn kho đang xử lý *</label>
                        <input name="soLuongDangXuLy" value={values.soLuongDangXuLy} onChange={handleChange} required disabled={isView} />
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