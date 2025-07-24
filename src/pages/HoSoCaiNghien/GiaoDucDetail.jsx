import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    soChuongTrinhGiaoDuc: '', soChuongTrinhTuVan: '', tenChuongTrinhGiaoDuc: '', thoiGianBatDauGD: '', thoiGianKetThucGD: '', diemTB: '', xepLoai: '', giaoVien: '', tenChuongTrinhTuVan: '', thoiGianBatDauTV: '', thoiGianKetThucTV: '', diemTBTuVan: '', xepLoaiTuVan: '', giaoVienTuVan: '', tongSoChuongTrinhNghe: '', tongSoChungChi: '', maLopHoc: '', tenKhoaHoc: '', loaiNganhNghe: '', tenLopHoc: '', thoiGianBatDauNghe: '', thoiGianKetThucNghe: '', diemTBNghe: '', xepLoaiNghe: '', tinhTrangChungChi: '', maChungChi: '', tongSoLanLaoDong: '', tenNoiLaoDong: '', tongSoNgayCong: '', tenChungChiLaoDong: '', thoiGianCapChungChi: ''
};

export default function GiaoDucDetail({ mode }) {
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
                soChuongTrinhGiaoDuc: '2', soChuongTrinhTuVan: '1', tenChuongTrinhGiaoDuc: 'GDPL', thoiGianBatDauGD: '2023-01-01', thoiGianKetThucGD: '2023-03-01', diemTB: '8.5', xepLoai: 'Giỏi', giaoVien: 'GV A', tenChuongTrinhTuVan: 'Tư vấn tâm lý', thoiGianBatDauTV: '2023-02-01', thoiGianKetThucTV: '2023-02-15', diemTBTuVan: '8.0', xepLoaiTuVan: 'Khá', giaoVienTuVan: 'GV B', tongSoChuongTrinhNghe: '1', tongSoChungChi: '1', maLopHoc: 'L01', tenKhoaHoc: 'Tin học', loaiNganhNghe: 'CNTT', tenLopHoc: 'Lớp A', thoiGianBatDauNghe: '2023-04-01', thoiGianKetThucNghe: '2023-06-01', diemTBNghe: '8.2', xepLoaiNghe: 'Giỏi', tinhTrangChungChi: 'Đã cấp', maChungChi: 'CC01', tongSoLanLaoDong: '2', tenNoiLaoDong: 'Xưởng may', tongSoNgayCong: '30', tenChungChiLaoDong: 'Chứng chỉ A', thoiGianCapChungChi: '2023-07-01'
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
        if (!data.tenChuongTrinhGiaoDuc || !data.giaoVien) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm giáo dục/tư vấn/nghề' : isEdit ? 'Chỉnh sửa giáo dục/tư vấn/nghề' : 'Xem chi tiết giáo dục/tư vấn/nghề'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Số chương trình giáo dục đã đào tạo</label>
                        <input name="soChuongTrinhGiaoDuc" value={data.soChuongTrinhGiaoDuc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Số chương trình tư vấn đã tham gia</label>
                        <input name="soChuongTrinhTuVan" value={data.soChuongTrinhTuVan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên chương trình giáo dục *</label>
                        <input name="tenChuongTrinhGiaoDuc" value={data.tenChuongTrinhGiaoDuc} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu GD</label>
                        <input type="date" name="thoiGianBatDauGD" value={data.thoiGianBatDauGD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc GD</label>
                        <input type="date" name="thoiGianKetThucGD" value={data.thoiGianKetThucGD} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Điểm trung bình GD</label>
                        <input name="diemTB" value={data.diemTB} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Xếp loại GD</label>
                        <input name="xepLoai" value={data.xepLoai} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giáo viên *</label>
                        <input name="giaoVien" value={data.giaoVien} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên chương trình tư vấn</label>
                        <input name="tenChuongTrinhTuVan" value={data.tenChuongTrinhTuVan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu TV</label>
                        <input type="date" name="thoiGianBatDauTV" value={data.thoiGianBatDauTV} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc TV</label>
                        <input type="date" name="thoiGianKetThucTV" value={data.thoiGianKetThucTV} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Điểm trung bình TV</label>
                        <input name="diemTBTuVan" value={data.diemTBTuVan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Xếp loại TV</label>
                        <input name="xepLoaiTuVan" value={data.xepLoaiTuVan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Giáo viên TV</label>
                        <input name="giaoVienTuVan" value={data.giaoVienTuVan} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng số chương trình đào tạo nghề đã được học</label>
                        <input name="tongSoChuongTrinhNghe" value={data.tongSoChuongTrinhNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng số chứng chỉ được cấp</label>
                        <input name="tongSoChungChi" value={data.tongSoChungChi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mã lớp học</label>
                        <input name="maLopHoc" value={data.maLopHoc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên khóa học</label>
                        <input name="tenKhoaHoc" value={data.tenKhoaHoc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Loại ngành nghề</label>
                        <input name="loaiNganhNghe" value={data.loaiNganhNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên lớp học</label>
                        <input name="tenLopHoc" value={data.tenLopHoc} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian bắt đầu nghề</label>
                        <input type="date" name="thoiGianBatDauNghe" value={data.thoiGianBatDauNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian kết thúc nghề</label>
                        <input type="date" name="thoiGianKetThucNghe" value={data.thoiGianKetThucNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Điểm trung bình nghề</label>
                        <input name="diemTBNghe" value={data.diemTBNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Xếp loại nghề</label>
                        <input name="xepLoaiNghe" value={data.xepLoaiNghe} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tình trạng được cấp chứng chỉ</label>
                        <input name="tinhTrangChungChi" value={data.tinhTrangChungChi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mã chứng chỉ</label>
                        <input name="maChungChi" value={data.maChungChi} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng số lần đi lao động</label>
                        <input name="tongSoLanLaoDong" value={data.tongSoLanLaoDong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên nơi lao động trị liệu</label>
                        <input name="tenNoiLaoDong" value={data.tenNoiLaoDong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tổng số ngày công</label>
                        <input name="tongSoNgayCong" value={data.tongSoNgayCong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên chứng chỉ lao động</label>
                        <input name="tenChungChiLaoDong" value={data.tenChungChiLaoDong} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Thời gian cấp chứng chỉ</label>
                        <input type="date" name="thoiGianCapChungChi" value={data.thoiGianCapChungChi} onChange={handleChange} disabled={isView} />
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