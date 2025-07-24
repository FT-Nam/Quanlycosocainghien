import React, { useState } from 'react';
import { tienLuuKyList as initialData } from '../data/tienLuuKy';
import { hocVienList } from '../data/hocVien';
import FilterPanel from '../components/FilterPanel';
import PaginationControl from '../components/PaginationControl';
import Toast from '../components/Toast';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const LOAI_COLORS = { 'Gửi': '#2ecc40', 'Rút': '#e74c3c' };
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

const defaultFilter = {
  hocVienId: '',
  loaiGD: '',
  dateFrom: '',
  dateTo: '',
  trangThai: '', // Thêm filter trạng thái
};

const TienLuuKy = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const filtered = data.filter(tk => {
    const matchHV = !filter.hocVienId || tk.hocVienId === filter.hocVienId;
    const matchLoai = !filter.loaiGD || tk.loaiGD === filter.loaiGD;
    const date = new Date(tk.ngayGD);
    const matchDateFrom = !filter.dateFrom || date >= new Date(filter.dateFrom);
    const matchDateTo = !filter.dateTo || date <= new Date(filter.dateTo);
    const matchTrangThai = !filter.trangThai || tk.trangThai === filter.trangThai;
    return matchHV && matchLoai && matchDateFrom && matchDateTo && matchTrangThai && tk.trangThai !== 'Đã xóa';
  });
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Tính số dư hiện tại theo học viên
  const soDuMap = {};
  data.forEach(tk => { soDuMap[tk.hocVienId] = tk.soDuSauGD; });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(f => ({ ...f, [name]: value }));
    setPage(1);
  };
  const handleSearch = () => setPage(1);
  const handleAdd = () => navigate('/tien-luu-ky/new');
  const handleSubmit = (values) => {
    // Tính số dư mới
    const lastGD = data.filter(tk => tk.hocVienId === values.hocVienId).sort((a,b) => new Date(b.ngayGD) - new Date(a.ngayGD))[0];
    const soDuTruoc = lastGD ? lastGD.soDuSauGD : 0;
    const soTien = Number(values.soTien);
    const soDuSauGD = values.loaiGD === 'Gửi' ? soDuTruoc + soTien : soDuTruoc - soTien;
    setData(d => [
      {
        id: 'TLK' + (Math.floor(Math.random()*900)+100),
        hocVienId: values.hocVienId,
        tenHocVien: (hocVienList.find(hv => hv.id === values.hocVienId)?.hoTen) || '',
        ngayGD: values.ngayGD,
        loaiGD: values.loaiGD,
        soTien,
        soDuSauGD,
        ghiChu: values.ghiChu
      },
      ...d
    ]);
    setOpenModal(false);
    setToast({ open: true, type: 'success', message: 'Thêm giao dịch thành công.' });
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  // Xuất Excel
  const exportExcel = () => {
    const exportData = filtered.map((tk, idx) => ({
      'STT': idx + 1,
      'Mã HV': tk.hocVienId,
      'Họ tên': tk.tenHocVien,
      'Ngày GD': formatDate(tk.ngayGD),
      'Loại GD': tk.loaiGD,
      'Số tiền': tk.soTien,
      'Số dư sau GD': tk.soDuSauGD,
      'Ghi chú': tk.ghiChu
    }));
    const ws = XLSXUtils.json_to_sheet(exportData);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, 'Giao dịch lưu ký');
    XLSXWriteFile(wb, 'giao_dich_luu_ky.xlsx');
  };
  // Xuất PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('SAO KÊ GIAO DỊCH TIỀN LƯU KÝ', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [[
        'STT', 'Mã HV', 'Họ tên', 'Ngày GD', 'Loại GD', 'Số tiền', 'Số dư sau GD', 'Ghi chú'
      ]],
      body: filtered.map((tk, idx) => [
        idx + 1,
        tk.hocVienId,
        tk.tenHocVien,
        formatDate(tk.ngayGD),
        tk.loaiGD,
        tk.soTien,
        tk.soDuSauGD,
        tk.ghiChu
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139,0,0] },
      margin: { left: 8, right: 8 }
    });
    doc.save('giao_dich_luu_ky.pdf');
  };

  return (
    <div>
      <h1>Quản lý tiền lưu ký</h1>
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
          {Array.from(new Set(data.map(tk => tk.hocVienId))).map(hvId => (
            <option key={hvId} value={hvId}>{hvId} - {data.find(tk => tk.hocVienId === hvId)?.tenHocVien}</option>
          ))}
        </select>
        <select
          name="loaiGD"
          value={filter.loaiGD}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả loại GD</option>
          <option value="Gửi">Gửi</option>
          <option value="Rút">Rút</option>
        </select>
        <select
          name="trangThai"
          value={filter.trangThai}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Bình thường">Bình thường</option>
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
        <button onClick={handleAdd} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', float: 'right' }}>+ Thêm giao dịch</button>
      </FilterPanel>
      {filter.hocVienId && (
        <div style={{ margin: '12px 0 8px 0' }}>
          <span style={{ background: '#f5f5f5', color: '#8B0000', fontWeight: 700, borderRadius: 8, padding: '8px 22px', fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(139,0,0,0.06)' }}>
            Số dư hiện tại: {soDuMap[filter.hocVienId]?.toLocaleString() || 0} đ
          </span>
        </div>
      )}
      <div className="table-responsive">
        <table className="table-hocvien">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã HV</th>
              <th>Họ tên</th>
              <th>Ngày GD</th>
              <th>Loại GD</th>
              <th>Số tiền</th>
              <th>Số dư sau GD</th>
              <th>Ghi chú</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {paged.map((tk, idx) => (
              <tr key={tk.id} style={{ cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td>{(page - 1) * pageSize + idx + 1}</td>
                <td>{tk.hocVienId}</td>
                <td>{tk.tenHocVien}</td>
                <td>{formatDate(tk.ngayGD)}</td>
                <td><span className="badge" style={{ background: LOAI_COLORS[tk.loaiGD] || '#bbb', color: '#fff', padding: '3px 10px', borderRadius: 12, fontWeight: 600, fontSize: 13 }}>{tk.loaiGD}</span></td>
                <td>{tk.soTien.toLocaleString()} đ</td>
                <td>{tk.soDuSauGD.toLocaleString()} đ</td>
                <td>{tk.ghiChu}</td>
                <td>
                  <button title="Xem chi tiết" onClick={e => { e.stopPropagation(); navigate(`/tien-luu-ky/${tk.id}`); }} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                  <button title="Sửa" onClick={e => { e.stopPropagation(); navigate(`/tien-luu-ky/${tk.id}/edit`); }} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
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

export default TienLuuKy; 