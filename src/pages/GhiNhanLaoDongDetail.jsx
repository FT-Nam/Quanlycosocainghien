import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ghiNhanList, phanCongList, nhomList } from '../data/laoDongTriLieu';
import Toast from '../components/Toast';

const defaultValues = {
  phanCongId: '', hocVien: '', gioLam: '', chatLuong: '', thaiDo: ''
};

const GhiNhanLaoDongDetail = () => {
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
      const gn = ghiNhanList.find(g => g.id === id);
      if (gn) setValues({ ...defaultValues, ...gn });
      else navigate('/lao-dong');
    }
    setError('');
  }, [id, isNew, isEdit, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setError('');
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!values.phanCongId || !values.hocVien || !values.gioLam || !values.chatLuong || !values.thaiDo) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm ghi nhận thành công.' : 'Cập nhật ghi nhận thành công.' });
    setTimeout(() => navigate('/lao-dong'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });
  const handleBack = () => navigate('/lao-dong');

  const phanCong = phanCongList.find(pc => pc.id === values.phanCongId);
  const nhom = phanCong ? nhomList.find(n => n.id === phanCong.nhomId) : null;

  return (
    <div>
      <h1>{isNew ? 'Thêm ghi nhận lao động' : isEdit ? 'Chỉnh sửa ghi nhận lao động' : 'Chi tiết ghi nhận lao động'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Phân công *</label>
            <select name="phanCongId" value={values.phanCongId} onChange={handleChange} disabled={isView}>
              <option value="">Chọn phân công</option>
              {phanCongList.map(pc => <option key={pc.id} value={pc.id}>{nhomList.find(n => n.id === pc.nhomId)?.ten} ({pc.ngay})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Học viên *</label>
            <input name="hocVien" value={values.hocVien} onChange={handleChange} disabled={isView} placeholder="Tên học viên" />
          </div>
          <div className="form-group">
            <label>Giờ làm *</label>
            <input name="gioLam" type="number" step="0.1" value={values.gioLam} onChange={handleChange} disabled={isView} placeholder="Số giờ" />
          </div>
          <div className="form-group">
            <label>Chất lượng *</label>
            <input name="chatLuong" value={values.chatLuong} onChange={handleChange} disabled={isView} placeholder="Tốt/Khá/Trung bình..." />
          </div>
          <div className="form-group">
            <label>Thái độ *</label>
            <input name="thaiDo" value={values.thaiDo} onChange={handleChange} disabled={isView} placeholder="Tích cực/Bình thường..." />
          </div>
        </div>
        {error && <div className="form-err" style={{ marginTop: 8 }}>{error}</div>}
        <div className="form-footer">
          <button type="button" onClick={handleBack} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default GhiNhanLaoDongDetail; 