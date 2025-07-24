import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    tongSoTienAn: '', taiPham: '', namXu: '', toaXu: '', diaPhuong: '', toiDanh: '', mucAn: '', noiChapHanhAn: '', namTha: '', tinhTrang: '', ghiChuTienAn: '', soTienSu: '', ghiChuTienSu: '', thoiGian: '', soQD: '', ngayQD: '', hanhViViPham: '', donViXuLy: '', hinhThucXuLy: '', noiChapHanh: '', batDau: '', ketThuc: ''
};

export default function TienAnTienSuDetail({ mode }) {
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
                tongSoTienAn: '1', taiPham: 'Có', namXu: '2018', toaXu: 'TAND Q1', diaPhuong: 'Hà Nội', toiDanh: 'Trộm cắp', mucAn: '2 năm', noiChapHanhAn: 'Trại giam A', namTha: '2020', tinhTrang: 'Đã tha', ghiChuTienAn: '', soTienSu: '0', ghiChuTienSu: '', thoiGian: '', soQD: '', ngayQD: '', hanhViViPham: '', donViXuLy: '', hinhThucXuLy: '', noiChapHanh: '', batDau: '', ketThuc: ''
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
        if (!data.toiDanh || !data.namXu) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm tiền án/tiền sự' : isEdit ? 'Chỉnh sửa tiền án/tiền sự' : 'Xem chi tiết tiền án/tiền sự'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Tổng số tiền án</label>
                        <input name="tongSoTienAn" value={data.tongSoTienAn} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tái phạm</label>
                        <input name="taiPham" value={data.taiPham} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Năm xử *</label>
                        <input name="namXu" value={data.namXu} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tòa xử</label>
                        <input name="toaXu" value={data.toaXu} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Địa phương</label>
                        <input name="diaPhuong" value={data.diaPhuong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tội danh *</label>
                        <input name="toiDanh" value={data.toiDanh} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mức án</label>
                        <input name="mucAn" value={data.mucAn} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi chấp hành án</label>
                        <input name="noiChapHanhAn" value={data.noiChapHanhAn} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Năm tha</label>
                        <input name="namTha" value={data.namTha} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng</label>
                        <input name="tinhTrang" value={data.tinhTrang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú tiền án</label>
                        <input name="ghiChuTienAn" value={data.ghiChuTienAn} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số tiền sự</label>
                        <input name="soTienSu" value={data.soTienSu} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú tiền sự</label>
                        <input name="ghiChuTienSu" value={data.ghiChuTienSu} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian</label>
                        <input name="thoiGian" value={data.thoiGian} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số QĐ</label>
                        <input name="soQD" value={data.soQD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày QĐ</label>
                        <input type="date" name="ngayQD" value={data.ngayQD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Hành vi vi phạm</label>
                        <input name="hanhViViPham" value={data.hanhViViPham} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Đơn vị xử lý</label>
                        <input name="donViXuLy" value={data.donViXuLy} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Hình thức xử lý</label>
                        <input name="hinhThucXuLy" value={data.hinhThucXuLy} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi chấp hành</label>
                        <input name="noiChapHanh" value={data.noiChapHanh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Bắt đầu</label>
                        <input name="batDau" value={data.batDau} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Kết thúc</label>
                        <input name="ketThuc" value={data.ketThuc} onChange={handleChange} disabled={isView} />
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