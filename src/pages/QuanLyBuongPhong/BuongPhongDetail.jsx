import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maPhong: '', tenPhong: '', loaiPhong: '', soLuong: '', sucChua: '', tinhTrang: '', phuTrach: '', soLuongHocVien: '' };

export default function BuongPhongDetail({ mode }) {
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
            setData({ maPhong: 'P101', tenPhong: 'Phòng 101', loaiPhong: 'Ngủ', soLuong: 10, sucChua: 12, tinhTrang: 'Đang sử dụng', phuTrach: 'Nguyễn Văn A', soLuongHocVien: 10 });
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
        if (!data.maPhong || !data.tenPhong) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm buồng/phòng' : isEdit ? 'Chỉnh sửa buồng/phòng' : 'Xem chi tiết buồng/phòng'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã phòng *</label>
                        <input name="maPhong" value={data.maPhong} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên phòng *</label>
                        <input name="tenPhong" value={data.tenPhong} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại phòng</label>
                        <input name="loaiPhong" value={data.loaiPhong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng</label>
                        <input name="soLuong" value={data.soLuong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Sức chứa</label>
                        <input name="sucChua" value={data.sucChua} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng</label>
                        <input name="tinhTrang" value={data.tinhTrang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Người phụ trách</label>
                        <input name="phuTrach" value={data.phuTrach} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số lượng học viên đang sử dụng</label>
                        <input name="soLuongHocVien" value={data.soLuongHocVien} onChange={handleChange} disabled={isView} />
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