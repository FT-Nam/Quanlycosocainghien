import React, { useState } from 'react';
import { hocVienList } from '../data/hocVien';

const formTypes = [
  { value: 'giay_xac_nhan', label: 'Giấy xác nhận học viên' },
  { value: 'phieu_cap_phat', label: 'Phiếu cấp phát quân trang' },
  { value: 'bao_cao', label: 'Báo cáo tổng hợp' },
];

const defaultFields = (hv) => ([
  { label: 'Họ và tên', value: hv?.hoTen || '' },
  { label: 'Ngày sinh', value: hv?.namSinh ? new Date(hv.namSinh).toLocaleDateString('vi-VN') : '' },
  { label: 'Mã học viên', value: hv?.id || '' },
  { label: 'Lớp', value: hv?.dotXuLy || '' },
  { label: 'Thời gian tham gia', value: hv?.ngayVao ? `${new Date(hv.ngayVao).toLocaleDateString('vi-VN')} - ...` : '' },
  { label: 'Tình trạng', value: hv?.trangThai || '' },
]);

const defaultPhieuCapPhat = {
  info: [
    { label: 'Họ và tên', value: '' },
    { label: 'Mã học viên', value: '' },
    { label: 'Lớp', value: '' },
  ],
  table: [
    ['1', 'Áo đồng phục', '2', 'Bộ', '01/02/2024'],
    ['2', 'Quần đồng phục', '2', 'Bộ', '01/02/2024'],
    ['3', 'Chăn', '1', 'Cái', '01/02/2024'],
    ['4', 'Khăn mặt', '2', 'Cái', '01/02/2024'],
  ]
};
const phieuCapPhatHeaders = ['STT', 'Tên vật tư', 'Số lượng', 'Đơn vị tính', 'Ngày cấp'];

const defaultBaoCao = {
  table: [
    ['1', 'Nguyễn Văn A', '01/01/1990', '2024A', 'Đang điều trị', '01/01/2024'],
    ['2', 'Trần Thị B', '02/02/1992', '2024B', 'Hoàn thành', '01/01/2024'],
    ['3', 'Lê Văn C', '03/03/1991', '2024A', 'Tái nghiện', '01/01/2024'],
  ],
  summary: 'Tổng số học viên: 3. Đang điều trị: 1. Hoàn thành: 1. Tái nghiện: 1.'
};
const baoCaoHeaders = ['STT', 'Họ và tên', 'Ngày sinh', 'Lớp', 'Tình trạng', 'Ngày vào'];

function EditableTable({ headers, data, onChange }) {
  return (
    <table className="data-table">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                <input
                  value={cell}
                  onChange={e => onChange(i, j, e.target.value)}
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #bbb', background: 'none', fontSize: 16, padding: 2 }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function InBieuMau() {
  const [type, setType] = useState('giay_xac_nhan');
  const [selectedHV, setSelectedHV] = useState('');
  const selectedHocVien = hocVienList.find(hv => hv.id === selectedHV);
  const [fields, setFields] = useState(defaultFields(selectedHocVien));
  const [phieuCapPhat, setPhieuCapPhat] = useState(defaultPhieuCapPhat);
  const [baoCao, setBaoCao] = useState(defaultBaoCao);

  React.useEffect(() => {
    if (type === 'giay_xac_nhan') {
      setFields(defaultFields(selectedHocVien));
    }
  }, [selectedHV, type]);

  const handleFieldChange = (idx, value) => {
    setFields(f => f.map((item, i) => i === idx ? { ...item, value } : item));
  };

  const handlePhieuCapPhatInfoChange = (idx, value) => {
    setPhieuCapPhat(p => ({ ...p, info: p.info.map((item, i) => i === idx ? { ...item, value } : item) }));
  };
  const handlePhieuCapPhatTableChange = (rowIdx, colIdx, value) => {
    setPhieuCapPhat(p => ({ ...p, table: p.table.map((row, i) => i === rowIdx ? row.map((cell, j) => j === colIdx ? value : cell) : row) }));
  };

  const handleBaoCaoTableChange = (rowIdx, colIdx, value) => {
    setBaoCao(b => ({ ...b, table: b.table.map((row, i) => i === rowIdx ? row.map((cell, j) => j === colIdx ? value : cell) : row) }));
  };

  return (
    <div>
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18, marginTop: 0 }}>In biểu mẫu</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          {formTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        {type === 'giay_xac_nhan' && (
          <select value={selectedHV} onChange={e => setSelectedHV(e.target.value)} style={{ minWidth: 220 }}>
            <option value="">Chọn học viên...</option>
            {hocVienList.map(hv => <option key={hv.id} value={hv.id}>{hv.hoTen} ({hv.id})</option>)}
          </select>
        )}
        <button style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xem trước</button>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>In / Xuất PDF</button>
      </div>
      <div>
        {type === 'giay_xac_nhan' ? (
          <div className="giay-xac-nhan-frame">
            <h3 className="form-title">GIẤY XÁC NHẬN HỌC VIÊN</h3>
            <table className="info-table">
              <tbody>
                {fields.map((f, i) => (
                  <tr key={i}>
                    <td>{f.label}</td>
                    <td>
                      <input value={f.value} onChange={e => handleFieldChange(i, e.target.value)} style={{ width: '100%', border: 'none', borderBottom: '1px solid #bbb', background: 'none', fontSize: 16, padding: 2 }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="note">Xác nhận học viên đang tham gia chương trình cai nghiện tại Trung tâm.</div>
          </div>
        ) : type === 'phieu_cap_phat' ? (
          <div>
            <h3 className="form-title">PHIẾU CẤP PHÁT QUÂN TRANG</h3>
            <table className="info-table">
              <tbody>
                {phieuCapPhat.info.map((f, i) => (
                  <tr key={i}>
                    <td>{f.label}</td>
                    <td>
                      <input value={f.value} onChange={e => handlePhieuCapPhatInfoChange(i, e.target.value)} style={{ width: '100%', border: 'none', borderBottom: '1px solid #bbb', background: 'none', fontSize: 16, padding: 2 }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EditableTable headers={phieuCapPhatHeaders} data={phieuCapPhat.table} onChange={handlePhieuCapPhatTableChange} />
          </div>
        ) : type === 'bao_cao' ? (
          <div>
            <h3 className="form-title">BÁO CÁO TỔNG HỢP HỌC VIÊN</h3>
            <EditableTable headers={baoCaoHeaders} data={baoCao.table} onChange={handleBaoCaoTableChange} />
            <div className="summary">
              <input value={baoCao.summary} onChange={e => setBaoCao(b => ({ ...b, summary: e.target.value }))} style={{ width: '100%', border: 'none', borderBottom: '1px solid #bbb', background: 'none', fontSize: 16, padding: 2, fontStyle: 'italic', color: '#444' }} />
            </div>
          </div>
        ) : null}
      </div>
      <style>{`
        h2, h3.form-title { margin-left: 0; }
        .info-table, .data-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        .info-table td { padding: 6px 10px; border-bottom: 1px solid #eee; }
        .info-table td:first-child { font-weight: 600; width: 160px; }
        .data-table th, .data-table td { border: 1px solid #bbb; padding: 7px 10px; text-align: left; font-size: 1rem; }
        .data-table th { background: #f2f2f2; font-weight: 700; }
        .note, .summary { margin-top: 8px; font-style: italic; color: #444; }
        .giay-xac-nhan-frame {
          border: 3px double #222;
          border-radius: 12px;
          padding: 36px 40px;
          margin: 32px 0;
          background: #fff;
          max-width: 600px;
        }
        .info-table input, .summary input, .data-table input {
          font-size: 16px;
          background: none;
          border: none;
          border-bottom: 1px solid #bbb;
          width: 100%;
          outline: none;
        }
      `}</style>
    </div>
  );
}
