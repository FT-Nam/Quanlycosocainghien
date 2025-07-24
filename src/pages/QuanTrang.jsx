import React, { useState } from 'react';
import { phieuCapPhatList as initialData, vatTuList } from '../data/quanTrang';
import { hocVienList } from '../data/hocVien';
import FilterPanel from '../components/FilterPanel';
import PaginationControl from '../components/PaginationControl';
import Toast from '../components/Toast';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

const defaultFilter = {
  hocVienId: '',
  vatTuId: '',
  dotCapPhat: '',
  dateFrom: '',
  dateTo: '',
  trangThai: '', // Thêm filter trạng thái
};

const QuanTrang = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const filtered = data.filter(p => {
    const matchHV = !filter.hocVienId || p.hocVienId === filter.hocVienId;
    const matchVatTu = !filter.vatTuId || p.vatTuId === filter.vatTuId;
    const matchDot = !filter.dotCapPhat || p.dotCapPhat === filter.dotCapPhat;
    const date = new Date(p.thoiGian);
    const matchDateFrom = !filter.dateFrom || date >= new Date(filter.dateFrom);
    const matchDateTo = !filter.dateTo || date <= new Date(filter.dateTo);
    const matchTrangThai = !filter.trangThai || p.trangThai === filter.trangThai;
    return matchHV && matchVatTu && matchDot && matchDateFrom && matchDateTo && matchTrangThai && p.trangThai !== 'Đã xóa';
  });
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Badge cảnh báo tồn kho thấp
  const tonKhoMap = Object.fromEntries(vatTuList.map(vt => [vt.id, vt.tonKho]));
  const canhBaoMap = Object.fromEntries(vatTuList.map(vt => [vt.id, vt.tonKho <= vt.canhBaoThap]));

  // Xuất Excel
  const exportExcel = () => {
    const exportData = filtered.map((p, idx) => ({
      'STT': idx + 1,
      'Mã phiếu': p.id,
      'Mã HV': p.hocVienId,
      'Họ tên': p.tenHocVien,
      'Vật tư': p.tenVatTu,
      'Số lượng': p.soLuong,
      'Thời gian': formatDate(p.thoiGian),
      'Đợt': p.dotCapPhat,
      'Tình trạng sau SD': p.tinhTrangSauSD,
      'Tồn kho': tonKhoMap[p.vatTuId],
      'Ghi chú': p.ghiChu
    }));
    const ws = XLSXUtils.json_to_sheet(exportData);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, 'Phiếu cấp phát');
    XLSXWriteFile(wb, 'phieu_cap_phat_quan_trang.xlsx');
  };
  // Xuất PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('DANH SÁCH PHIẾU CẤP PHÁT QUÂN TRANG', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [[
        'STT', 'Mã phiếu', 'Mã HV', 'Họ tên', 'Vật tư', 'Số lượng', 'Thời gian', 'Đợt', 'Tình trạng sau SD', 'Tồn kho', 'Ghi chú'
      ]],
      body: filtered.map((p, idx) => [
        idx + 1,
        p.id,
        p.hocVienId,
        p.tenHocVien,
        p.tenVatTu,
        p.soLuong,
        formatDate(p.thoiGian),
        p.dotCapPhat,
        p.tinhTrangSauSD,
        tonKhoMap[p.vatTuId],
        p.ghiChu
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139,0,0] },
      margin: { left: 8, right: 8 }
    });
    doc.save('phieu_cap_phat_quan_trang.pdf');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(f => ({ ...f, [name]: value }));
    setPage(1);
  };
  const handleSearch = () => setPage(1);
  const handleAdd = () => navigate('/quan-trang/new');
  const handleSubmit = (values) => {
    // Trừ tồn kho vật tư
    const vt = vatTuList.find(v => v.id === values.vatTuId);
    if (vt) vt.tonKho = Math.max(0, vt.tonKho - Number(values.soLuong));
    setData(d => [
      {
        id: 'PCP' + (Math.floor(Math.random()*900)+100),
        hocVienId: values.hocVienId,
        tenHocVien: (hocVienList.find(hv => hv.id === values.hocVienId)?.hoTen) || '',
        vatTuId: values.vatTuId,
        tenVatTu: (vatTuList.find(vt => vt.id === values.vatTuId)?.tenVatTu) || '',
        soLuong: Number(values.soLuong),
        thoiGian: values.thoiGian,
        ghiChu: values.ghiChu,
        dotCapPhat: values.dotCapPhat,
        tinhTrangSauSD: ''
      },
      ...d
    ]);
    setOpenModal(false);
    setToast({ open: true, type: 'success', message: 'Thêm phiếu cấp phát thành công.' });
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div>
      <h1>Quản lý quân trang</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button onClick={exportExcel} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất Excel</button>
        <button onClick={exportPDF} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất PDF</button>
      </div>
      <FilterPanel>
        <select
          name="hocVienId"
          value={filter.hocVienId}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả học viên</option>
          {Array.from(new Set(data.map(p => p.hocVienId))).map(hvId => (
            <option key={hvId} value={hvId}>{hvId} - {data.find(p => p.hocVienId === hvId)?.tenHocVien}</option>
          ))}
        </select>
        <select
          name="vatTuId"
          value={filter.vatTuId}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả vật tư</option>
          {vatTuList.map(vt => (
            <option key={vt.id} value={vt.id}>{vt.tenVatTu}</option>
          ))}
        </select>
        <select
          name="dotCapPhat"
          value={filter.dotCapPhat}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả đợt</option>
          {Array.from(new Set(data.map(p => p.dotCapPhat))).map(dot => (
            <option key={dot} value={dot}>{dot}</option>
          ))}
        </select>
        <select
          name="trangThai"
          value={filter.trangThai}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Nháp">Nháp</option>
          <option value="Đã cấp phát">Đã cấp phát</option>
          <option value="Đã xóa">Đã xóa</option>
        </select>
        <input
          type="date"
          name="dateFrom"
          value={filter.dateFrom}
          onChange={handleFilterChange}
          style={{ marginRight: 6 }}
        />
        <span style={{ margin: '0 6px' }}>-</span>
        <input
          type="date"
          name="dateTo"
          value={filter.dateTo}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        />
        <button onClick={handleSearch} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, marginRight: 8, cursor: 'pointer' }}>Tìm kiếm</button>
        <button onClick={() => { setFilter(defaultFilter); setPage(1); }} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Làm mới</button>
        <div style={{ flex: 1 }} />
        <button onClick={handleAdd} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', float: 'right' }}>+ Thêm phiếu</button>
      </FilterPanel>
      
      <div className="table-responsive">
        <table className="table-hocvien">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã phiếu</th>
              <th>Mã HV</th>
              <th>Họ tên</th>
              <th>Vật tư</th>
              <th>Số lượng</th>
              <th>Thời gian</th>
              <th>Đợt</th>
              <th>Tình trạng sau SD</th>
              <th>Tồn kho</th>
              <th>Ghi chú</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={12} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {paged.map((p, idx) => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td>{(page - 1) * pageSize + idx + 1}</td>
                <td>{p.id}</td>
                <td>{p.hocVienId}</td>
                <td>{p.tenHocVien}</td>
                <td>{p.tenVatTu}</td>
                <td>{p.soLuong}</td>
                <td>{formatDate(p.thoiGian)}</td>
                <td>{p.dotCapPhat}</td>
                <td>{p.tinhTrangSauSD}</td>
                <td>
                  <span className="badge" style={{ background: canhBaoMap[p.vatTuId] ? '#e74c3c' : '#2ecc40', color: '#fff', padding: '3px 10px', borderRadius: 12, fontWeight: 600, fontSize: 13 }}>
                    {tonKhoMap[p.vatTuId]}
                  </span>
                </td>
                <td>{p.ghiChu}</td>
                <td>
                  <button title="Xem chi tiết" onClick={e => { e.stopPropagation(); navigate(`/quan-trang/${p.id}`); }} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                  <button title="Sửa" onClick={e => { e.stopPropagation(); navigate(`/quan-trang/${p.id}/edit`); }} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 24 }}>
        <PaginationControl
          total={total}
          currentPage={page}
          pageSize={pageSize}
          onChangePage={setPage}
          onChangePageSize={setPageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />
      </div>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default QuanTrang; 