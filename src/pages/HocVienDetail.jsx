import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { hocVienList } from '../data/hocVien';
import Toast from '../components/Toast';

const defaultValues = {
  hoTen: '', namSinh: '', cccd: '', diaChi: '', tinhTrangPhapLy: '', hoSoViPham: '',
  lyDoNhapTrai: '', donViDuaVao: '', ngayVao: '', dotXuLy: '',
  nguoiThan: [{ ten: '', quanHe: '', sdt: '', diaChi: '' }],
  taiPham: '', ketQuaXetNghiem: '', trangThai: '', avatar: ''
};

const HocVienDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.endsWith('/new');
  const isEdit = location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ open: false, type: '', message: '' });

  useEffect(() => {
    if (isNew) {
      setValues(defaultValues);
    } else {
      const hv = hocVienList.find(h => h.id === id);
      if (hv) setValues({ ...defaultValues, ...hv });
      else navigate('/hoc-vien');
    }
    setError('');
  }, [id, isNew, isEdit, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setError('');
  };
  const handleNguoiThanChange = (idx, e) => {
    const { name, value } = e.target;
    setValues(v => ({
      ...v,
      nguoiThan: v.nguoiThan.map((nt, i) => i === idx ? { ...nt, [name]: value } : nt)
    }));
  };
  const handleAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setValues(v => ({ ...v, avatar: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!values.hoTen || !values.namSinh || !values.cccd || !/^\d{12}$/.test(values.cccd) || !values.ngayVao) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm học viên thành công.' : 'Cập nhật học viên thành công.' });
    setTimeout(() => navigate('/hoc-vien'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>{isNew ? 'Thêm học viên' : isEdit ? 'Chỉnh sửa học viên' : 'Chi tiết học viên'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Họ tên *</label>
            <input name="hoTen" value={values.hoTen} onChange={handleChange} disabled={isView} placeholder="Nhập họ tên học viên" />
          </div>
          <div className="form-group">
            <label>Năm sinh *</label>
            <input type="date" name="namSinh" value={values.namSinh} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>CCCD *</label>
            <input name="cccd" value={values.cccd} onChange={handleChange} maxLength={12} disabled={isView} placeholder="Nhập số CCCD 12 số" />
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input name="diaChi" value={values.diaChi} onChange={handleChange} disabled={isView} placeholder="Địa chỉ thường trú" />
          </div>
          <div className="form-group">
            <label>Tình trạng pháp lý</label>
            <input name="tinhTrangPhapLy" value={values.tinhTrangPhapLy} onChange={handleChange} disabled={isView} placeholder="Ví dụ: Đang cai, Chờ xử lý..." />
          </div>
          <div className="form-group">
            <label>Hồ sơ vi phạm</label>
            <input name="hoSoViPham" value={values.hoSoViPham} onChange={handleChange} disabled={isView} placeholder="Ghi chú vi phạm nếu có" />
          </div>
          <div className="form-group">
            <label>Lý do nhập trại</label>
            <input name="lyDoNhapTrai" value={values.lyDoNhapTrai} onChange={handleChange} disabled={isView} placeholder="Tự nguyện/Bắt buộc..." />
          </div>
          <div className="form-group">
            <label>Đơn vị đưa vào</label>
            <input name="donViDuaVao" value={values.donViDuaVao} onChange={handleChange} disabled={isView} placeholder="Tên đơn vị, ví dụ: Công an Q.1" />
          </div>
          <div className="form-group">
            <label>Ngày vào *</label>
            <input type="date" name="ngayVao" value={values.ngayVao} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Đợt xử lý</label>
            <input name="dotXuLy" value={values.dotXuLy} onChange={handleChange} disabled={isView} placeholder="Đợt 1, Đợt 2..." />
          </div>
          <div className="form-group">
            <label>Thông tin tái phạm</label>
            <input name="taiPham" value={values.taiPham} onChange={handleChange} disabled={isView} placeholder="Có/Không, ghi chú" />
          </div>
          <div className="form-group">
            <label>Kết quả xét nghiệm</label>
            <input name="ketQuaXetNghiem" value={values.ketQuaXetNghiem} onChange={handleChange} disabled={isView} placeholder="Âm tính/Dương tính" />
          </div>
          <div className="form-group hv-trang-thai">
            <label>Trạng thái</label>
            <select name="trangThai" value={values.trangThai} onChange={handleChange} disabled={isView} style={{ width: '100%' }}>
              <option value="">Chọn trạng thái</option>
              <option value="Đang cai">Đang cai</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Tái nghiện">Tái nghiện</option>
            </select>
          </div>
        </div>
        <div className="hv-section-label">Thông tin người thân</div>
        {values.nguoiThan.map((nt, idx) => (
          <div key={idx} className="hv-grid hv-nguoi-than-row">
            <div className="form-group">
              <label>Tên</label>
              <input name="ten" value={nt.ten} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} placeholder="Họ tên người thân" />
            </div>
            <div className="form-group">
              <label>Quan hệ</label>
              <input name="quanHe" value={nt.quanHe} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} placeholder="Mẹ, Anh, Chị..." />
            </div>
            <div className="form-group">
              <label>SĐT</label>
              <input name="sdt" value={nt.sdt} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} placeholder="Số điện thoại" />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input name="diaChi" value={nt.diaChi} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} placeholder="Địa chỉ liên hệ" />
            </div>
          </div>
        ))}
        {error && <div className="form-err" style={{ marginTop: 8 }}>{error}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => navigate('/hoc-vien')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default HocVienDetail; 