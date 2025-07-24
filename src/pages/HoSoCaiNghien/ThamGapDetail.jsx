import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    thoiGianThamGap: '', tenThanNhan: '', cccdThanNhan: '', loaiThamGap: '', moiQuanHe: '', hoTen: '', tenKhac: '', ngaySinh: '', gioiTinh: '', queQuan: '', danToc: '', tonGiao: '', quocTich: '', nhomMau: '', ngayCapCCCD: '', noiCapCCCD: '', ngayHetHanCCCD: '', noiThuongTru: '', noiTamTru: '', noiOHienTai: '', honNhan: '', quanHeVoiNguoiCaiNghien: ''
};

export default function ThamGapDetail({ mode }) {
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
                thoiGianThamGap: '2023-06-01', tenThanNhan: 'Nguyễn Thị C', cccdThanNhan: '012345678900', loaiThamGap: 'Thăm gặp trực tiếp', moiQuanHe: 'Mẹ', hoTen: 'Nguyễn Văn A', tenKhac: '', ngaySinh: '1990-01-01', gioiTinh: 'Nam', queQuan: 'Hà Nội', danToc: 'Kinh', tonGiao: 'Không', quocTich: 'Việt Nam', nhomMau: 'O', ngayCapCCCD: '2010-01-01', noiCapCCCD: 'Hà Nội', ngayHetHanCCCD: '2030-01-01', noiThuongTru: 'Hà Nội', noiTamTru: '', noiOHienTai: 'Hà Nội', honNhan: 'Độc thân', quanHeVoiNguoiCaiNghien: 'Con'
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
        if (!data.tenThanNhan || !data.hoTen) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thăm gặp/mối quan hệ' : isEdit ? 'Chỉnh sửa thăm gặp/mối quan hệ' : 'Xem chi tiết thăm gặp/mối quan hệ'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Thời gian thăm gặp</label>
                        <input type="date" name="thoiGianThamGap" value={data.thoiGianThamGap} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên thân nhân *</label>
                        <input name="tenThanNhan" value={data.tenThanNhan} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>CCCD thân nhân</label>
                        <input name="cccdThanNhan" value={data.cccdThanNhan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại thăm gặp</label>
                        <input name="loaiThamGap" value={data.loaiThamGap} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mối quan hệ</label>
                        <input name="moiQuanHe" value={data.moiQuanHe} onChange={handleChange} disabled={isView} />
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
                        <label>Quan hệ với người cai nghiện</label>
                        <input name="quanHeVoiNguoiCaiNghien" value={data.quanHeVoiNguoiCaiNghien} onChange={handleChange} disabled={isView} />
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