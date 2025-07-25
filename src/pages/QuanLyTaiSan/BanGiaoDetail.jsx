import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maTaiSan: '', nguoiBanGiao: '', nguoiNhan: '', ngayBanGiao: '', tinhTrang: '' };

export default function BanGiaoDetail({ mode }) {
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
            setData({ maTaiSan: 'TS01', nguoiBanGiao: 'Nguyễn Văn Đức', nguoiNhan: 'Trần Thị Huyền', ngayBanGiao: '2024-07-01', tinhTrang: 'Tốt' });
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
        if (!data.maTaiSan || !data.nguoiBanGiao || !data.nguoiNhan) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm bàn giao tài sản' : isEdit ? 'Chỉnh sửa bàn giao tài sản' : 'Xem chi tiết bàn giao tài sản'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã tài sản *</label>
                        <input name="maTaiSan" value={data.maTaiSan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người bàn giao *</label>
                        <input name="nguoiBanGiao" value={data.nguoiBanGiao} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người nhận bàn giao *</label>
                        <input name="nguoiNhan" value={data.nguoiNhan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày bàn giao</label>
                        <input type="date" name="ngayBanGiao" value={data.ngayBanGiao} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng bàn giao</label>
                        <input name="tinhTrang" value={data.tinhTrang} onChange={handleChange} disabled={isView} />
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