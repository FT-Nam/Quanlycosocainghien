import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { lopList, lichHocList, tuVanTamLyList } from '../data/giaoDucTuVan';

const initData = {
  lopId: '',
  lichHocId: '',
  hocVien: '',
  giangVien: '',
  noiDung: '',
  thoiGian: '',
};

export default function TuVanTamLyDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const isNew = loc.pathname.endsWith('/new');
  const isEdit = loc.pathname.endsWith('/edit');
  const [data, setData] = useState(initData);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      const tv = tuVanTamLyList.find(tv => tv.id === id);
      if (tv) setData({ ...tv });
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
    if (!data.lopId || !data.hocVien || !data.giangVien || !data.noiDung || !data.thoiGian) {
      setErr('Vui lòng nhập đủ thông tin.');
      return;
    }
    // TODO: Gọi service thêm/sửa
    nav('/giao-duc');
  };

  // Lấy danh sách học viên theo lớp
  const hocVienList = data.lopId ? (lopList.find(l => l.id === data.lopId)?.hocVien || []) : [];
  // Lấy danh sách buổi học theo lớp
  const lichHocByLop = data.lopId ? lichHocList.filter(lh => lh.lopId === data.lopId) : [];

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm tư vấn tâm lý' : 'Chỉnh sửa tư vấn tâm lý'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit}>
        <div className="hv-grid">
          <div className="form-group">
            <label>Lớp *</label>
            <select name="lopId" value={data.lopId} onChange={handleChange} required>
              <option value="">Chọn lớp</option>
              {lopList.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Buổi học (nếu có)</label>
            <select name="lichHocId" value={data.lichHocId} onChange={handleChange}>
              <option value="">Không liên kết</option>
              {lichHocByLop.map(lh => <option key={lh.id} value={lh.id}>{lh.mon} - {lh.thoiGian.replace('T', ' ')}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Học viên *</label>
            <select name="hocVien" value={data.hocVien} onChange={handleChange} required>
              <option value="">Chọn học viên</option>
              {hocVienList.map(hv => <option key={hv} value={hv}>{hv}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Giảng viên tư vấn *</label>
            <input name="giangVien" value={data.giangVien} onChange={handleChange} required placeholder="Tên giảng viên tư vấn" />
          </div>
          <div className="form-group">
            <label>Nội dung *</label>
            <input name="noiDung" value={data.noiDung} onChange={handleChange} required placeholder="Nội dung tư vấn" />
          </div>
          <div className="form-group">
            <label>Thời gian *</label>
            <input type="datetime-local" name="thoiGian" value={data.thoiGian} onChange={handleChange} required />
          </div>
        </div>
        {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
        <div className="form-footer">
          <button type="button" onClick={() => nav('/giao-duc')} className="form-btn back-btn">Quay lại</button>
          <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>
        </div>
      </form>
    </div>
  );
} 