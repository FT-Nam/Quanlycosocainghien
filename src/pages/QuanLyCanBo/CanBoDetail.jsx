import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = { maCanBo: '', tenCanBo: '', cccd: '', ngaySinh: '', gioiTinh: '', queQuan: '', danToc: '', tonGiao: '', quocTich: '', noiOHienTai: '', phongBan: '', hocVi: '', hocHam: '', capBac: '', chucVu: '', chucDanh: '', trangThai: '', batDau: '', ketThuc: '' };

export default function CanBoDetail({ mode }) {
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
            setData({ maCanBo: 'CB01', tenCanBo: 'Nguyễn Văn A', cccd: '012345678901', ngaySinh: '1980-01-01', gioiTinh: 'Nam', queQuan: 'Hà Nội', danToc: 'Kinh', tonGiao: 'Không', quocTich: 'Việt Nam', noiOHienTai: 'Hà Nội', phongBan: 'Phòng Hành chính', hocVi: 'Thạc sĩ', hocHam: '', capBac: 'Chuyên viên', chucVu: 'Trưởng phòng', chucDanh: '', trangThai: 'Đang làm', batDau: '2010-01-01', ketThuc: '' });
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
        if (!data.maCanBo || !data.tenCanBo) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm cán bộ nhân viên' : isEdit ? 'Chỉnh sửa cán bộ nhân viên' : 'Xem chi tiết cán bộ nhân viên'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã cán bộ *</label>
                        <input name="maCanBo" value={data.maCanBo} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên cán bộ *</label>
                        <input name="tenCanBo" value={data.tenCanBo} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số CCCD</label>
                        <input name="cccd" value={data.cccd} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày, tháng, năm sinh</label>
                        <input type="date" name="ngaySinh" value={data.ngaySinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <select name="gioiTinh" value={data.gioiTinh} onChange={handleChange} disabled={isView}>
                            <option value="">Chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Quê quán</label>
                        <input name="queQuan" value={data.queQuan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Dân tộc</label>
                        <input name="danToc" value={data.danToc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tôn giáo</label>
                        <input name="tonGiao" value={data.tonGiao} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Quốc tịch</label>
                        <input name="quocTich" value={data.quocTich} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi ở hiện tại</label>
                        <input name="noiOHienTai" value={data.noiOHienTai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Phòng ban</label>
                        <input name="phongBan" value={data.phongBan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Học vị</label>
                        <input name="hocVi" value={data.hocVi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Học hàm</label>
                        <input name="hocHam" value={data.hocHam} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Cấp bậc</label>
                        <input name="capBac" value={data.capBac} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Chức vụ</label>
                        <input name="chucVu" value={data.chucVu} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Chức danh</label>
                        <input name="chucDanh" value={data.chucDanh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <input name="trangThai" value={data.trangThai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu làm việc</label>
                        <input type="date" name="batDau" value={data.batDau} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc làm việc</label>
                        <input type="date" name="ketThuc" value={data.ketThuc} onChange={handleChange} disabled={isView} />
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