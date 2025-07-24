import React, { useState } from 'react';
import { hocVienList } from '../data/hocVien';

const reportTypes = [
  { value: 'hoc_vien', label: 'Báo cáo học viên' },
  { value: 'dieu_tri', label: 'Báo cáo điều trị' },
  { value: 'lao_dong', label: 'Báo cáo lao động' },
];

const hocVienHeaders = ['STT', 'Họ và tên', 'Ngày sinh', 'Lớp', 'Tình trạng', 'Ngày vào'];
const trangThaiList = ['Tất cả', ...Array.from(new Set(hocVienList.map(hv => hv.trangThai)))];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

const fakeReports = {
  dieu_tri: {
    title: 'BÁO CÁO ĐIỀU TRỊ',
    table: {
      headers: ['STT', 'Họ và tên', 'Phác đồ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Kết quả'],
      rows: [
        ['1', 'Nguyễn Văn A', 'Methadone', '01/01/2024', '01/06/2024', 'Âm tính'],
        ['2', 'Trần Thị B', 'Buprenorphine', '01/01/2024', '01/06/2024', 'Âm tính'],
        ['3', 'Lê Văn C', 'Methadone', '01/01/2024', '01/06/2024', 'Tái nghiện'],
      ]
    },
    summary: 'Tổng số ca điều trị: 3. Âm tính: 2. Tái nghiện: 1.'
  },
  lao_dong: {
    title: 'BÁO CÁO LAO ĐỘNG',
    table: {
      headers: ['STT', 'Họ và tên', 'Nhóm', 'Công việc', 'Số ngày công', 'Nhận xét'],
      rows: [
        ['1', 'Nguyễn Văn A', 'Nhóm 1', 'Làm vườn', '20', 'Tốt'],
        ['2', 'Trần Thị B', 'Nhóm 2', 'Chăn nuôi', '18', 'Khá'],
        ['3', 'Lê Văn C', 'Nhóm 1', 'Làm vườn', '10', 'Cần cố gắng'],
      ]
    },
    summary: 'Tổng số học viên lao động: 3. Trung bình ngày công: 16.'
  }
};

function ReportPreview({ type, data, summary }) {
  if (type === 'hoc_vien') {
    return (
      <div>
        <h3 style={{ color: '#111', fontSize: 20, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>BÁO CÁO HỌC VIÊN</h3>
        <table className="data-table">
          <thead>
            <tr>{hocVienHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr><td colSpan={hocVienHeaders.length} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {data.map((hv, idx) => (
              <tr key={hv.id}>
                <td>{idx + 1}</td>
                <td>{hv.hoTen}</td>
                <td>{formatDate(hv.namSinh)}</td>
                <td>{hv.dotXuLy}</td>
                <td>{hv.trangThai}</td>
                <td>{formatDate(hv.ngayVao)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="summary">{summary}</div>
      </div>
    );
  }
  // Các loại báo cáo khác giữ nguyên fake data
  const d = fakeReports[type];
  if (!d) return <i>Chọn loại báo cáo để xem trước...</i>;
  return (
    <div>
      <h3 style={{ color: '#111', fontSize: 20, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>{d.title}</h3>
      <table className="data-table">
        <thead>
          <tr>{d.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {d.table.rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <div className="summary">{d.summary}</div>
    </div>
  );
}

export default function BaoCao() {
  const [type, setType] = useState('hoc_vien');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [trangThai, setTrangThai] = useState('Tất cả');
  const [keyword, setKeyword] = useState('');

  // Lọc dữ liệu thật cho báo cáo học viên
  let filtered = hocVienList;
  if (type === 'hoc_vien') {
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      filtered = filtered.filter(hv => hv.hoTen.toLowerCase().includes(kw) || hv.id.toLowerCase().includes(kw));
    }
    if (trangThai !== 'Tất cả') {
      filtered = filtered.filter(hv => hv.trangThai === trangThai);
    }
    if (from) {
      filtered = filtered.filter(hv => new Date(hv.ngayVao) >= new Date(from));
    }
    if (to) {
      filtered = filtered.filter(hv => new Date(hv.ngayVao) <= new Date(to));
    }
  }
  const summary = type === 'hoc_vien'
    ? `Tổng số học viên: ${filtered.length}. Đang cai: ${filtered.filter(hv => hv.trangThai === 'Đang cai').length}. Chờ xử lý: ${filtered.filter(hv => hv.trangThai === 'Chờ xử lý').length}. Hoàn thành: ${filtered.filter(hv => hv.trangThai === 'Hoàn thành').length}. Tái nghiện: ${filtered.filter(hv => hv.trangThai === 'Tái nghiện').length}.`
    : undefined;

  return (
    <div>
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18, marginTop: 0 }}>Báo cáo</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          {reportTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        {type === 'hoc_vien' && (
          <>
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Tìm tên/mã học viên..." style={{ minWidth: 180 }} />
            <select value={trangThai} onChange={e => setTrangThai(e.target.value)}>
              {trangThaiList.map(s => <option key={s}>{s}</option>)}
            </select>
          </>
        )}
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        <span>-</span>
        <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        <button style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xem báo cáo</button>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất file</button>
      </div>
      <div>
        <ReportPreview type={type} data={filtered} summary={summary} />
      </div>
      <style>{`
        h2, h3 { margin-left: 0; }
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        .data-table th, .data-table td { border: 1px solid #bbb; padding: 7px 10px; text-align: left; font-size: 1rem; }
        .data-table th { background: #f2f2f2; font-weight: 700; }
        .summary { margin-top: 8px; font-style: italic; color: #444; }
      `}</style>
    </div>
  );
} 