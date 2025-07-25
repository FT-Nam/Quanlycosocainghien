import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maDot: '', tenDot: '', diaDiem: '', loaiNganhNghe: '', thoiGianBatDau: '', thoiGianKetThuc: '', soLuong: '', phuTrach: '' };

export default function LaoDongTriLieuDetail({ mode }) {
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
            setData({ maDot: 'LD001', tenDot: 'Lao động mùa hè', diaDiem: 'Xưởng 1', loaiNganhNghe: 'Cơ khí', thoiGianBatDau: '2023-06-01', thoiGianKetThuc: '2023-06-30', soLuong: 20, phuTrach: 'Nguyễn Văn Bình' });
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
        if (!data.maDot || !data.tenDot) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm đợt lao động trị liệu' : isEdit ? 'Chỉnh sửa đợt lao động trị liệu' : 'Xem chi tiết đợt lao động trị liệu'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã đợt lao động *</label>
                        <input name="maDot" value={data.maDot} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên đợt lao động *</label>
                        <input name="tenDot" value={data.tenDot} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Địa điểm lao động *</label>
                        <input name="diaDiem" value={data.diaDiem} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại ngành nghề lao động *</label>
                        <input name="loaiNganhNghe" value={data.loaiNganhNghe} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu *</label>
                        <input type="date" name="thoiGianBatDau" value={data.thoiGianBatDau} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc *</label>
                        <input type="date" name="thoiGianKetThuc" value={data.thoiGianKetThuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng người cai nghiện</label>
                        <input name="soLuong" value={data.soLuong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người phụ trách</label>
                        <input name="phuTrach" value={data.phuTrach} onChange={handleChange} disabled={isView} />
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