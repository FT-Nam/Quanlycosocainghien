import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    loaiDanhGia: '', tuan: '', thang: '', quy: '', thoiGianXetDuyet: '', tongDiem: '', ketQuaXepLoai: '', thoiGianKT: '', hinhThucKT: '', lyDoKT: '', thoiGianThucHienKT: '', thoiGianKL: '', hinhThucKL: '', lyDoKL: '', thoiGianThucHienKL: ''
};

export default function DanhGiaDetail({ mode }) {
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
                loaiDanhGia: 'Tháng', tuan: '1', thang: '6', quy: '2', thoiGianXetDuyet: '2023-06-01', tongDiem: '90', ketQuaXepLoai: 'Tốt', thoiGianKT: '2023-05-01', hinhThucKT: 'Bằng khen', lyDoKT: 'Học tốt', thoiGianThucHienKT: '2023-05-10', thoiGianKL: '2023-04-01', hinhThucKL: 'Cảnh cáo', lyDoKL: 'Vi phạm nội quy', thoiGianThucHienKL: '2023-04-10'
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
        if (!data.loaiDanhGia) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm đánh giá/khen thưởng/kỷ luật' : isEdit ? 'Chỉnh sửa đánh giá/khen thưởng/kỷ luật' : 'Xem chi tiết đánh giá/khen thưởng/kỷ luật'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Loại đánh giá định kỳ (tuần/tháng/quý) *</label>
                        <input name="loaiDanhGia" value={data.loaiDanhGia} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tuần đánh giá</label>
                        <input name="tuan" value={data.tuan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tháng đánh giá</label>
                        <input name="thang" value={data.thang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Quý đánh giá</label>
                        <input name="quy" value={data.quy} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian xét duyệt phiếu đánh giá</label>
                        <input type="date" name="thoiGianXetDuyet" value={data.thoiGianXetDuyet} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng điểm</label>
                        <input name="tongDiem" value={data.tongDiem} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết quả xếp loại</label>
                        <input name="ketQuaXepLoai" value={data.ketQuaXepLoai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian quyết định khen thưởng</label>
                        <input type="date" name="thoiGianKT" value={data.thoiGianKT} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Hình thức khen thưởng</label>
                        <input name="hinhThucKT" value={data.hinhThucKT} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Lý do khen thưởng</label>
                        <input name="lyDoKT" value={data.lyDoKT} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian thực hiện khen thưởng</label>
                        <input type="date" name="thoiGianThucHienKT" value={data.thoiGianThucHienKT} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian quyết định kỷ luật</label>
                        <input type="date" name="thoiGianKL" value={data.thoiGianKL} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Hình thức kỷ luật</label>
                        <input name="hinhThucKL" value={data.hinhThucKL} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Lý do kỷ luật</label>
                        <input name="lyDoKL" value={data.lyDoKL} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian thực hiện kỷ luật</label>
                        <input type="date" name="thoiGianThucHienKL" value={data.thoiGianThucHienKL} onChange={handleChange} disabled={isView} />
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