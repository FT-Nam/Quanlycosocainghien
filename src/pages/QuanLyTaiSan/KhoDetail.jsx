import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maTaiSan: '', tenTaiSan: '', tonKho: '', dangSuDung: '', hong: '' };

export default function KhoDetail({ mode }) {
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
            setData({ maTaiSan: 'TS01', tenTaiSan: 'Máy tính xách tay', tonKho: 5, dangSuDung: 4, hong: 1 });
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
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm quản lý kho' : isEdit ? 'Chỉnh sửa quản lý kho' : 'Xem chi tiết quản lý kho'}</h1>
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
                        <label>Số lượng tồn kho</label>
                        <input name="tonKho" value={data.tonKho} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng đang sử dụng</label>
                        <input name="dangSuDung" value={data.dangSuDung} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng hỏng/cần sửa</label>
                        <input name="hong" value={data.hong} onChange={handleChange} disabled={isView} />
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