import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { thamGapService } from '../data/thamGap';
import Toast from '../components/Toast';

const initData = {
  hocVienId: '',
  tenHocVien: '',
  nguoiThan: { ten: '', quanHe: '', cccd: '' },
  hinhThuc: 'Trực tiếp',
  thoiGian: '',
  phongGap: '',
  canBo: '',
  trangThai: 'Chờ duyệt',
  ketQua: '',
  viPham: false,
};

export default function ThamGapDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const isNew = loc.pathname.endsWith('/new');
  const isEdit = loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState({ open: false, type: '', message: '' });

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      thamGapService.getById(id).then(res => {
        if (res) setData(res);
        setLoading(false);
      });
    } else {
      setData(initData);
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('nguoiThan.')) {
      setData({ ...data, nguoiThan: { ...data.nguoiThan, [name.split('.')[1]]: value } });
    } else if (type === 'checkbox') {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
    setErr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.tenHocVien || !data.nguoiThan.ten || !data.nguoiThan.cccd || !data.thoiGian) {
      setErr('Vui lòng nhập đủ thông tin bắt buộc.');
      return;
    }
    setErr('');
    setLoading(true);
    if (isNew) {
      await thamGapService.add(data);
      setToast({ open: true, type: 'success', message: 'Thêm thăm gặp thành công.' });
    } else if (isEdit) {
      await thamGapService.update(id, data);
      setToast({ open: true, type: 'success', message: 'Cập nhật thăm gặp thành công.' });
    }
    setLoading(false);
    setTimeout(() => nav('/tham-gap'), 1200);
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 28 }}>
        {isNew ? 'Thêm thăm gặp' : isEdit ? 'Chỉnh sửa thăm gặp' : 'Chi tiết thăm gặp'}
      </h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Học viên *</label>
            <input name="tenHocVien" value={data.tenHocVien} onChange={handleChange} disabled={isView} placeholder="Nhập họ tên học viên" />
          </div>
          <div className="form-group">
            <label>Người thân *</label>
            <input name="nguoiThan.ten" value={data.nguoiThan.ten} onChange={handleChange} disabled={isView} placeholder="Tên người thân" />
          </div>
          <div className="form-group">
            <label>Quan hệ *</label>
            <input name="nguoiThan.quanHe" value={data.nguoiThan.quanHe} onChange={handleChange} disabled={isView} placeholder="Quan hệ với học viên" />
          </div>
          <div className="form-group">
            <label>CCCD *</label>
            <input name="nguoiThan.cccd" value={data.nguoiThan.cccd} onChange={handleChange} disabled={isView} placeholder="CCCD người thân" />
          </div>
          <div className="form-group">
            <label>Hình thức</label>
            <select name="hinhThuc" value={data.hinhThuc} onChange={handleChange} disabled={isView}>
              <option>Trực tiếp</option>
              <option>Gửi đồ</option>
            </select>
          </div>
          <div className="form-group">
            <label>Thời gian *</label>
            <input type="datetime-local" name="thoiGian" value={data.thoiGian} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Phòng gặp</label>
            <input name="phongGap" value={data.phongGap} onChange={handleChange} disabled={isView} placeholder="Phòng gặp" />
          </div>
          <div className="form-group">
            <label>Cán bộ phụ trách</label>
            <input name="canBo" value={data.canBo} onChange={handleChange} disabled={isView} placeholder="Tên cán bộ" />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select name="trangThai" value={data.trangThai} onChange={handleChange} disabled={isView} style={{ width: '100%' }}>
              <option>Chờ duyệt</option>
              <option>Đã duyệt</option>
              <option>Đã thăm</option>
            </select>
          </div>
          <div className="form-group">
            <label>Kết quả sau thăm</label>
            <input name="ketQua" value={data.ketQua} onChange={handleChange} disabled={isView} placeholder="Kết quả sau thăm" />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label><input type="checkbox" name="viPham" checked={data.viPham} onChange={handleChange} disabled={isView} /> Có vi phạm</label>
          </div>
        </div>
        {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => nav('/tham-gap')} className="form-btn back-btn">Quay lại</button>
          {(isEdit || isNew) && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
} 