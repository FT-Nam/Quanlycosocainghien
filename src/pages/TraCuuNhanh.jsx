import React, { useState } from 'react';

const mockData = [
  { type: 'Học viên', name: 'Nguyễn Văn A', info: 'Lớp 1, Đang cai', id: 'HV001', more: '1990, Nam, CCCD: 012345678901' },
  { type: 'Học viên', name: 'Lê Văn B', info: 'Lớp 2, Chờ xử lý', id: 'HV002', more: '1988, Nam, CCCD: 012345678902' },
  { type: 'Cán bộ', name: 'Trần Thị B', info: 'Giáo viên, Lớp 2', id: 'CB001', more: 'Email: b.tran@trungtam.gov.vn' },
  { type: 'Công việc', name: 'Làm vườn', info: 'Khu A, 07:00-09:00', id: 'CV1', more: 'Nhóm 1, Cán bộ: Trần Thị B' },
  { type: 'Lịch học', name: 'Giáo dục công dân', info: 'Lớp 1, Tuần 1', id: 'LH1', more: 'GV: Nguyễn Văn A, 08:00 03/06/2024' },
  { type: 'Lịch học', name: 'Tư vấn tâm lý', info: 'Lớp 2, Tháng 5', id: 'LH2', more: 'GV: Trần Thị B, 14:00 05/06/2024' },
];

const PAGE_SIZE = 5;

export default function TraCuuNhanh() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const filtered = mockData.filter(
    d => (!type || d.type === type) && (!keyword || d.name.toLowerCase().includes(keyword.toLowerCase()) || d.info.toLowerCase().includes(keyword.toLowerCase()) || d.id.toLowerCase().includes(keyword.toLowerCase()))
  );
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ color: '#111', fontWeight: 700, fontSize: 28, margin: '32px 0 28px 0' }}>Tra cứu nhanh</h1>
      <div style={{ background: '#f5f5f5', borderRadius: 6, padding: 16, marginBottom: 18, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={type} onChange={e => { setType(e.target.value); setPage(1); }} style={{ minWidth: 120, border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px' }}>
          <option value="">Tất cả loại</option>
          <option value="Học viên">Học viên</option>
          <option value="Cán bộ">Cán bộ</option>
          <option value="Công việc">Công việc</option>
          <option value="Lịch học">Lịch học</option>
        </select>
        <input value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1); }} placeholder="Từ khóa, mã, thông tin..." style={{ minWidth: 220, border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px' }} />
      </div>
      <div className="table-responsive">
        <table className="table-hocvien" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Loại</th>
              <th>Tên</th>
              <th>Thông tin</th>
              <th>Mã</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {paged.map((d, i) => (
              <tr key={i} style={{ cursor: 'pointer' }}>
                <td>{d.type}</td>
                <td>{d.name}</td>
                <td>{d.info}</td>
                <td>{d.id}</td>
                <td style={{ color: '#555', fontSize: 13 }}>{d.more}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: '#888', fontSize: 15 }}>Tổng: {filtered.length}</span>
        <div style={{ flex: 1 }} />
        {Array.from({ length: Math.ceil(filtered.length/PAGE_SIZE) }, (_, i) => (
          <button key={i} onClick={() => setPage(i+1)} style={{ background: page===i+1?'#8B0000':'#fff', color: page===i+1?'#fff':'#8B0000', border: '1px solid #8B0000', borderRadius: 4, padding: '4px 14px', fontWeight: 600, cursor: 'pointer', marginRight: 2 }}>{i+1}</button>
        ))}
      </div>
    </div>
  );
} 