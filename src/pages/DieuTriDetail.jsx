import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dieuTriList } from '../data/dieuTri';
import { hocVienList } from '../data/hocVien';
import Toast from '../components/Toast';

const defaultValues = {
  hocVienId: '',
  tenHocVien: '',
  tenThuoc: '',
  lieuLuong: '',
  ngayDung: '',
  chiDinh: '',
  ketQuaXetNghiem: '',
  danhGiaConNghien: '',
  donThuocTuan: '',
  trangThai: '',
};

const DieuTriDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.endsWith('/new');
  const isEdit = location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, type: '', message: '' });

  useEffect(() => {
    if (isNew) {
      setValues(defaultValues);
    } else {
      const dt = dieuTriList.find(d => d.id === id);
      if (dt) setValues({ ...defaultValues, ...dt });
      else navigate('/dieu-tri');
    }
    setErrors({});
  }, [id, isNew, isEdit, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
    if (name === 'hocVienId') {
      const hv = hocVienList.find(h => h.id === value);
      setValues(v => ({ ...v, hocVienId: value, tenHocVien: hv ? hv.hoTen : '' }));
    }
  };
  const validate = () => {
    const err = {};
    if (!values.hocVienId) err.hocVienId = 'Bắt buộc';
    if (!values.tenThuoc) err.tenThuoc = 'Bắt buộc';
    if (!values.lieuLuong || isNaN(values.lieuLuong)) err.lieuLuong = 'Bắt buộc, số';
    if (!values.ngayDung) err.ngayDung = 'Bắt buộc';
    return err;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setToast({ open: true, type: 'success', message: isNew ? 'Thêm phác đồ điều trị thành công.' : 'Cập nhật phác đồ điều trị thành công.' });
      setTimeout(() => navigate('/dieu-tri'), 1200);
    }
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>
        {isNew ? 'Thêm điều trị' : isEdit ? 'Chỉnh sửa điều trị' : 'Chi tiết điều trị'}
      </h1>
      <form className="dieu-tri-detail-form" onSubmit={handleSubmit}>
        <div className="dt-grid">
          <div className="form-group">
            <label>Học viên *</label>
            <select name="hocVienId" value={values.hocVienId} onChange={handleChange} disabled={isView}>
              <option value="">Chọn học viên</option>
              {hocVienList.map(hv => <option key={hv.id} value={hv.id}>{hv.hoTen} ({hv.id})</option>)}
            </select>
            {errors.hocVienId && <div className="form-err">{errors.hocVienId}</div>}
          </div>
          <div className="form-group">
            <label>Thuốc *</label>
            <select name="tenThuoc" value={values.tenThuoc} onChange={handleChange} disabled={isView}>
              <option value="">Chọn thuốc</option>
              <option value="Methadone">Methadone</option>
              <option value="Suboxone">Suboxone</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.tenThuoc && <div className="form-err">{errors.tenThuoc}</div>}
          </div>
          <div className="form-group">
            <label>Liều lượng (mg) *</label>
            <input name="lieuLuong" value={values.lieuLuong} onChange={handleChange} disabled={isView} placeholder="Nhập số mg" />
            {errors.lieuLuong && <div className="form-err">{errors.lieuLuong}</div>}
          </div>
          <div className="form-group">
            <label>Ngày dùng *</label>
            <input type="date" name="ngayDung" value={values.ngayDung} onChange={handleChange} disabled={isView} />
            {errors.ngayDung && <div className="form-err">{errors.ngayDung}</div>}
          </div>
          <div className="form-group">
            <label>Chỉ định</label>
            <input name="chiDinh" value={values.chiDinh} onChange={handleChange} disabled={isView} placeholder="Chỉ định bác sĩ / lý do dùng thuốc" />
          </div>
          <div className="form-group">
            <label>KQ Xét nghiệm</label>
            <input name="ketQuaXetNghiem" value={values.ketQuaXetNghiem} onChange={handleChange} disabled={isView} placeholder="Kết quả test Meth/Heroin âm/dương tính" />
          </div>
          <div className="form-group">
            <label>Đánh giá cơn nghiện</label>
            <input name="danhGiaConNghien" value={values.danhGiaConNghien} onChange={handleChange} disabled={isView} placeholder="Đánh giá sau 3 ngày điều trị" />
          </div>
          <div className="form-group">
            <label>Đơn thuốc tuần</label>
            <input name="donThuocTuan" value={values.donThuocTuan} onChange={handleChange} disabled={isView} placeholder="Ví dụ: Methadone 40mg/ngày" />
          </div>
        </div>
        <div className="form-group dt-trang-thai">
          <label>Trạng thái</label>
          <select name="trangThai" value={values.trangThai} onChange={handleChange} disabled={isView} style={{ width: '100%' }}>
            <option value="">Chọn trạng thái</option>
            <option value="Đang điều trị">Đang điều trị</option>
            <option value="Hoàn tất">Hoàn tất</option>
            <option value="Tái nghiện">Tái nghiện</option>
          </select>
        </div>
        <div className="form-footer">
          <button type="button" onClick={() => navigate('/dieu-tri')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default DieuTriDetail; 