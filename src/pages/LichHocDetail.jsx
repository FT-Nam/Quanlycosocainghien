import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { lopList, lichHocList } from '../data/giaoDucTuVan';

const initData = {
  lopId: '',
  mon: '',
  giangVien: '',
  thoiGian: '',
  type: 'Tuần',
  value: '',
};

export default function LichHocDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const isNew = loc.pathname.endsWith('/new');
  const isEdit = loc.pathname.endsWith('/edit');
  const [data, setData] = useState(initData);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      const lh = lichHocList.find(lh => lh.id === id);
      if (lh) setData({ ...lh });
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
    if (!data.lopId || !data.mon || !data.giangVien || !data.thoiGian || !data.value) {
      setErr('Vui lòng nhập đủ thông tin.');
      return;
    }
    // TODO: Gọi service thêm/sửa
    nav('/giao-duc');
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm lịch học' : 'Chỉnh sửa lịch học'}</h1>
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
            <label>Môn học *</label>
            <input name="mon" value={data.mon} onChange={handleChange} required placeholder="Tên môn học" />
          </div>
          <div className="form-group">
            <label>Giảng viên *</label>
            <input name="giangVien" value={data.giangVien} onChange={handleChange} required placeholder="Tên giảng viên" />
          </div>
          <div className="form-group">
            <label>Thời gian *</label>
            <input type="datetime-local" name="thoiGian" value={data.thoiGian} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Loại *</label>
            <select name="type" value={data.type} onChange={handleChange}>
              <option value="Tuần">Tuần</option>
              <option value="Tháng">Tháng</option>
            </select>
          </div>
          <div className="form-group">
            <label>{data.type === 'Tuần' ? 'Tuần' : 'Tháng'} *</label>
            <input name="value" value={data.value} onChange={handleChange} required placeholder={data.type === 'Tuần' ? 'Số tuần' : 'Tháng'} />
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