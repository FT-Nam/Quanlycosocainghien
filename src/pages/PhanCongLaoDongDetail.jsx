import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { phanCongList, nhomList, congViecList } from '../data/laoDongTriLieu';
import Toast from '../components/Toast';

const defaultValues = {
  ngay: '', congViecId: '', nhomId: ''
};

const PhanCongLaoDongDetail = () => {
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
      const pc = phanCongList.find(p => p.id === id);
      if (pc) setValues({ ...defaultValues, ...pc });
      else navigate('/phan-cong-lao-dong');
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
    if (!values.ngay || !values.congViecId || !values.nhomId) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm phân công thành công.' : 'Cập nhật phân công thành công.' });
    setTimeout(() => navigate('/llao-dong'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });
  const handleBack = () => navigate('/lao-dong');

  const nhom = nhomList.find(n => n.id === values.nhomId);

  return (
    <div>
      <h1>{isNew ? 'Thêm phân công lao động' : isEdit ? 'Chỉnh sửa phân công lao động' : 'Chi tiết phân công lao động'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Ngày *</label>
            <input type="date" name="ngay" value={values.ngay} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Công việc *</label>
            <select name="congViecId" value={values.congViecId} onChange={handleChange} disabled={isView}>
              <option value="">Chọn công việc</option>
              {congViecList.map(cv => <option key={cv.id} value={cv.id}>{cv.ten}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Nhóm *</label>
            <select name="nhomId" value={values.nhomId} onChange={handleChange} disabled={isView}>
              <option value="">Chọn nhóm</option>
              {nhomList.map(n => <option key={n.id} value={n.id}>{n.ten}</option>)}
            </select>
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

export default PhanCongLaoDongDetail; 