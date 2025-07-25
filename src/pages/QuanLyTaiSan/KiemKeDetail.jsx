import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maSanPham: '', tenSanPham: '', thoiGian: '', tonThucTe: '', chenhLech: '', lyDo: '', giaTriChenhLech: '', nguoiThucHien: '' };

export default function KiemKeDetail({ mode }) {
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
            setData({ maSanPham: 'TS01', tenSanPham: 'Máy tính xách tay', thoiGian: '2024-07-01', tonThucTe: 5, chenhLech: 0, lyDo: '', giaTriChenhLech: 0, nguoiThucHien: 'Nguyễn Văn Hùng' });
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
        if (!data.maSanPham || !data.tenSanPham) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm kiểm kê tài sản' : isEdit ? 'Chỉnh sửa kiểm kê tài sản' : 'Xem chi tiết kiểm kê tài sản'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã sản phẩm *</label>
                        <input name="maSanPham" value={data.maSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên sản phẩm *</label>
                        <input name="tenSanPham" value={data.tenSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kiểm kê</label>
                        <input type="date" name="thoiGian" value={data.thoiGian} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>SL tồn thực tế</label>
                        <input name="tonThucTe" value={data.tonThucTe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>SL chênh lệch</label>
                        <input name="chenhLech" value={data.chenhLech} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Lý do</label>
                        <input name="lyDo" value={data.lyDo} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giá trị chênh lệch</label>
                        <input name="giaTriChenhLech" value={data.giaTriChenhLech} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người thực hiện</label>
                        <input name="nguoiThucHien" value={data.nguoiThucHien} onChange={handleChange} disabled={isView} />
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