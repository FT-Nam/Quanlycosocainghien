import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maTaiSan: '', tinhTrangBanDau: '', tinhTrangSuaChua: '', ngaySuaChua: '', nguoiChiuTN: '' };

export default function SuaChuaDetail({ mode }) {
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
            setData({ maTaiSan: 'TS01', tinhTrangBanDau: 'Hỏng', tinhTrangSuaChua: 'Đã sửa', ngaySuaChua: '2024-07-01', nguoiChiuTN: 'Nguyễn Văn A' });
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
        if (!data.maTaiSan || !data.nguoiChiuTN) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm sửa chữa tài sản' : isEdit ? 'Chỉnh sửa sửa chữa tài sản' : 'Xem chi tiết sửa chữa tài sản'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã tài sản *</label>
                        <input name="maTaiSan" value={data.maTaiSan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng ban đầu</label>
                        <input name="tinhTrangBanDau" value={data.tinhTrangBanDau} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng sửa chữa</label>
                        <input name="tinhTrangSuaChua" value={data.tinhTrangSuaChua} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày sửa chữa</label>
                        <input type="date" name="ngaySuaChua" value={data.ngaySuaChua} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người chịu trách nhiệm *</label>
                        <input name="nguoiChiuTN" value={data.nguoiChiuTN} onChange={handleChange} required disabled={isView} />
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