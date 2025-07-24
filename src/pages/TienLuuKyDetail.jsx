import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { hocVienList } from '../data/hocVien';
import { tienLuuKyList } from '../data/tienLuuKy';
import Toast from '../components/Toast';

const defaultValues = {
  hocVienId: '',
  ngayGD: '',
  loaiGD: 'Gửi',
  soTien: '',
  ghiChu: ''
};

const TienLuuKyDetail = () => {
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
      const gd = tienLuuKyList.find(g => g.id === id);
      if (gd) setValues({ ...defaultValues, ...gd });
      else navigate('/tien-luu-ky');
    }
    setError('');
  }, [id, isNew, isEdit, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setError('');
  };
  const handleLoaiGD = e => {
    setValues(v => ({ ...v, loaiGD: e.target.value }));
    setError('');
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!values.hocVienId || !values.ngayGD || !values.soTien || isNaN(values.soTien) || Number(values.soTien) <= 0) {
      setError('Vui lòng nhập đầy đủ và đúng thông tin.');
      return;
    }
    // TODO: Validate số dư khi rút nếu cần
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm giao dịch thành công.' : 'Cập nhật giao dịch thành công.' });
    setTimeout(() => navigate('/tien-luu-ky'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>{isNew ? 'Thêm giao dịch tiền lưu ký' : isEdit ? 'Chỉnh sửa giao dịch' : 'Chi tiết giao dịch'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Học viên *</label>
            <select name="hocVienId" value={values.hocVienId} onChange={handleChange} required disabled={isView}>
              <option value="">Chọn học viên</option>
              {hocVienList.map(hv => <option key={hv.id} value={hv.id}>{hv.hoTen} ({hv.id})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Ngày giao dịch *</label>
            <input type="date" name="ngayGD" value={values.ngayGD} onChange={handleChange} required disabled={isView} />
          </div>
          <div className="form-group">
            <label>Loại giao dịch *</label>
            <select name="loaiGD" value={values.loaiGD} onChange={handleLoaiGD} required disabled={isView}>
              <option value="Gửi">Gửi</option>
              <option value="Rút">Rút</option>
            </select>
          </div>
          <div className="form-group">
            <label>Số tiền *</label>
            <input name="soTien" value={values.soTien} onChange={handleChange} placeholder="Nhập số tiền (VNĐ)" required disabled={isView} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / span 2' }}>
            <label>Ghi chú</label>
            <input name="ghiChu" value={values.ghiChu} onChange={handleChange} placeholder="Ghi chú (nếu có)" disabled={isView} />
          </div>
        </div>
        {error && <div className="form-err" style={{ marginTop: 8 }}>{error}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => navigate('/tien-luu-ky')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default TienLuuKyDetail; 