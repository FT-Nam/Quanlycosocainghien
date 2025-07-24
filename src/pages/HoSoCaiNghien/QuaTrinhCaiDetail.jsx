import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    loaiCaiNghien: '', tenCoSo: '', to: '', doi: '', buong: '', phuongPhap: '', thoiGianCai: '', thoiGianBatDau: '', thoiGianKetThuc: '', xepLoai: ''
};

export default function QuaTrinhCaiDetail({ mode }) {
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
            setData({
                loaiCaiNghien: 'Bắt buộc', tenCoSo: 'Trung tâm 1', to: 'A', doi: '1', buong: '101', phuongPhap: 'Methadone', thoiGianCai: '2022-01-01', thoiGianBatDau: '2022-01-01', thoiGianKetThuc: '2022-06-01', xepLoai: 'Tốt'
            });
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
        if (!data.loaiCaiNghien || !data.tenCoSo) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm quá trình cai nghiện' : isEdit ? 'Chỉnh sửa quá trình cai nghiện' : 'Xem chi tiết quá trình cai nghiện'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Loại cai nghiện *</label>
                        <input name="loaiCaiNghien" value={data.loaiCaiNghien} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên cơ sở cai nghiện xử lý *</label>
                        <input name="tenCoSo" value={data.tenCoSo} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổ</label>
                        <input name="to" value={data.to} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đội</label>
                        <input name="doi" value={data.doi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Buồng/phòng</label>
                        <input name="buong" value={data.buong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Phương pháp cai nghiện</label>
                        <input name="phuongPhap" value={data.phuongPhap} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian cai nghiện</label>
                        <input type="date" name="thoiGianCai" value={data.thoiGianCai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu</label>
                        <input type="date" name="thoiGianBatDau" value={data.thoiGianBatDau} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc</label>
                        <input type="date" name="thoiGianKetThuc" value={data.thoiGianKetThuc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Xếp loại cai nghiện</label>
                        <input name="xepLoai" value={data.xepLoai} onChange={handleChange} disabled={isView} />
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