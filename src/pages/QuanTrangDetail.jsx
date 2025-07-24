import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { hocVienList } from '../data/hocVien';
import { vatTuList, phieuCapPhatList } from '../data/quanTrang';
import Toast from '../components/Toast';

const defaultValues = {
  hocVienId: '',
  vatTuId: '',
  soLuong: '',
  thoiGian: '',
  dotCapPhat: '',
  ghiChu: ''
};

const QuanTrangDetail = () => {
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
      const p = phieuCapPhatList.find(p => p.id === id);
      if (p) setValues({ ...defaultValues, ...p });
      else navigate('/quan-trang');
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
    if (!values.hocVienId || !values.vatTuId || !values.soLuong || isNaN(values.soLuong) || Number(values.soLuong) <= 0 || !values.thoiGian) {
      setError('Vui lòng nhập đầy đủ và đúng thông tin.');
      return;
    }
    // TODO: Validate tồn kho nếu cần
    setToast({ open: true, type: 'success', message: isNew ? 'Thêm phiếu cấp phát thành công.' : 'Cập nhật phiếu thành công.' });
    setTimeout(() => navigate('/quan-trang'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>{isNew ? 'Thêm phiếu cấp phát quân trang' : isEdit ? 'Chỉnh sửa phiếu cấp phát' : 'Chi tiết phiếu cấp phát'}</h1>
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
            <label>Vật tư *</label>
            <select name="vatTuId" value={values.vatTuId} onChange={handleChange} required disabled={isView}>
              <option value="">Chọn vật tư</option>
              {vatTuList.map(vt => <option key={vt.id} value={vt.id}>{vt.tenVatTu}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Số lượng *</label>
            <input name="soLuong" value={values.soLuong} onChange={handleChange} placeholder="Nhập số lượng" required disabled={isView} />
          </div>
          <div className="form-group">
            <label>Thời gian *</label>
            <input type="date" name="thoiGian" value={values.thoiGian} onChange={handleChange} required disabled={isView} />
          </div>
          <div className="form-group">
            <label>Đợt cấp phát</label>
            <input name="dotCapPhat" value={values.dotCapPhat} onChange={handleChange} placeholder="Đợt 1, Đợt 2..." disabled={isView} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / span 2' }}>
            <label>Ghi chú</label>
            <input name="ghiChu" value={values.ghiChu} onChange={handleChange} placeholder="Ghi chú (nếu có)" disabled={isView} />
          </div>
        </div>
        {error && <div className="form-err" style={{ marginTop: 8 }}>{error}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => navigate('/quan-trang')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default QuanTrangDetail; 