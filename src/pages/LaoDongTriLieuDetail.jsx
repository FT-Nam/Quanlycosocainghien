import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { congViecList } from '../data/laoDongTriLieu';
import Toast from '../components/Toast';

const defaultValues = {
  ten: '', khuVuc: '', gioLam: '', canBo: ''
};

const LaoDongTriLieuDetail = () => {
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
      const cv = congViecList.find(c => c.id === id);
      if (cv) {
        setValues({ ...defaultValues, ...cv });
      } else navigate('/lao-dong');
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
    if (!values.ten || !values.khuVuc || !values.gioLam || !values.canBo) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm công việc thành công.' : 'Cập nhật công việc thành công.' });
    setTimeout(() => navigate('/lao-dong'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>{isNew ? 'Thêm công việc lao động' : isEdit ? 'Chỉnh sửa công việc lao động' : 'Chi tiết công việc lao động'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Tên công việc *</label>
            <input name="ten" value={values.ten} onChange={handleChange} disabled={isView} placeholder="Nhập tên công việc" />
          </div>
          <div className="form-group">
            <label>Khu vực *</label>
            <input name="khuVuc" value={values.khuVuc} onChange={handleChange} disabled={isView} placeholder="Nhập khu vực" />
          </div>
          <div className="form-group">
            <label>Giờ làm *</label>
            <input name="gioLam" value={values.gioLam} onChange={handleChange} disabled={isView} placeholder="07:00-09:00" />
          </div>
          <div className="form-group">
            <label>Cán bộ phụ trách *</label>
            <input name="canBo" value={values.canBo} onChange={handleChange} disabled={isView} placeholder="Tên cán bộ" />
          </div>
        </div>
        {error && <div className="form-err" style={{ marginTop: 8 }}>{error}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => navigate('/lao-dong')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default LaoDongTriLieuDetail; 