import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    cccd: '', hoTen: '', tenKhac: '', ngaySinh: '', gioiTinh: '', noiSinh: '', noiDangKyKhaiSinh: '', queQuan: '', danToc: '', tonGiao: '', quocTich: '', nhomMau: '', ngayCapCCCD: '', noiCapCCCD: '', ngayHetHanCCCD: '', noiThuongTru: '', noiTamTru: '', noiOHienTai: '', honNhan: '', cmnd9: ''
};

export default function DanCuDetail({ mode }) {
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
                cccd: '012345678901', hoTen: 'Nguyễn Minh Vũ', tenKhac: '', ngaySinh: '1990-01-01', gioiTinh: 'Nữ', noiSinh: 'Hà Nội', noiDangKyKhaiSinh: '', queQuan: 'Hà Nội', danToc: 'Kinh', tonGiao: 'Không', quocTich: 'Việt Nam', nhomMau: 'O', ngayCapCCCD: '2010-01-01', noiCapCCCD: 'Hà Nội', ngayHetHanCCCD: '2030-01-01', noiThuongTru: 'Hà Nội', noiTamTru: '', noiOHienTai: 'Hà Nội', honNhan: 'Độc thân', cmnd9: ''
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
        if (!data.cccd || !data.hoTen || !data.ngaySinh) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thông tin dân cư' : isEdit ? 'Chỉnh sửa thông tin dân cư' : 'Xem chi tiết dân cư'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Số CCCD *</label>
                        <input name="cccd" value={data.cccd} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Họ, chữ đệm và tên khai sinh *</label>
                        <input name="hoTen" value={data.hoTen} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên gọi khác</label>
                        <input name="tenKhac" value={data.tenKhac} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày, tháng, năm sinh *</label>
                        <input type="date" name="ngaySinh" value={data.ngaySinh} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giới tính *</label>
                        <select name="gioiTinh" value={data.gioiTinh} onChange={handleChange} required disabled={isView}>
                            <option value="">Chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Nơi sinh</label>
                        <input name="noiSinh" value={data.noiSinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi đăng ký khai sinh</label>
                        <input name="noiDangKyKhaiSinh" value={data.noiDangKyKhaiSinh} onChange={handleChange} disabled={isView} />
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
                        <label>Nhóm máu</label>
                        <input name="nhomMau" value={data.nhomMau} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày cấp CCCD</label>
                        <input type="date" name="ngayCapCCCD" value={data.ngayCapCCCD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi cấp CCCD</label>
                        <input name="noiCapCCCD" value={data.noiCapCCCD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Ngày hết hạn CCCD</label>
                        <input type="date" name="ngayHetHanCCCD" value={data.ngayHetHanCCCD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi thường trú</label>
                        <input name="noiThuongTru" value={data.noiThuongTru} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi tạm trú</label>
                        <input name="noiTamTru" value={data.noiTamTru} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi ở hiện tại</label>
                        <input name="noiOHienTai" value={data.noiOHienTai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng hôn nhân</label>
                        <input name="honNhan" value={data.honNhan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số CMND 9 số</label>
                        <input name="cmnd9" value={data.cmnd9} onChange={handleChange} disabled={isView} />
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