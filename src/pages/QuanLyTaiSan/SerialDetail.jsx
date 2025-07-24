import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maSanPham: '', maSerial: '', tinhTrang: '', khauHao: '', ngayNhap: '' };

export default function SerialDetail({ mode }) {
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
            setData({ maSanPham: 'TS01', maSerial: 'SR001', tinhTrang: 'Đang sử dụng', khauHao: '2', ngayNhap: '2023-01-01' });
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
        if (!data.maSanPham || !data.maSerial) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm serial sản phẩm' : isEdit ? 'Chỉnh sửa serial sản phẩm' : 'Xem chi tiết serial sản phẩm'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã sản phẩm *</label>
                        <input name="maSanPham" value={data.maSanPham} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mã serial *</label>
                        <input name="maSerial" value={data.maSerial} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng</label>
                        <input name="tinhTrang" value={data.tinhTrang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Khấu hao theo năm</label>
                        <input name="khauHao" value={data.khauHao} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày nhập kho</label>
                        <input type="date" name="ngayNhap" value={data.ngayNhap} onChange={handleChange} disabled={isView} />
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