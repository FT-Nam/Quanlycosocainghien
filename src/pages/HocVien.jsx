import React, { useState } from 'react';
import { hocVienList as initialData } from '../data/hocVien';
import FilterPanel from '../components/FilterPanel';
import OffcanvasForm from '../components/OffcanvasForm';
import ConfirmModal from '../components/ConfirmModal';
import PaginationControl from '../components/PaginationControl';
import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TRANG_THAI_COLORS = {
  'Đang cai': '#2ecc40',
  'Chờ xử lý': '#f1c40f',
  'Hoàn thành': '#2980b9',
  'Tái nghiện': '#e74c3c',
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

const defaultFilter = {
  keyword: '',
  trangThai: '',
  dateFrom: '',
  dateTo: '',
};

function maskCCCD(cccd) {
  if (!cccd || cccd.length < 6) return cccd;
  return cccd.slice(0, 5) + '*****' + cccd.slice(-2);
}

const HocVien = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });
  const navigate = useNavigate();

  // Filter logic
  const filtered = data.filter(hv => {
    const kw = filter.keyword.trim().toLowerCase();
    const matchKw =
      !kw ||
      hv.id.toLowerCase().includes(kw) ||
      hv.hoTen.toLowerCase().includes(kw) ||
      hv.cccd.includes(kw);
    const matchTrangThai = !filter.trangThai || hv.trangThai === filter.trangThai;
    const dateIn = new Date(hv.ngayVao);
    const matchDateFrom = !filter.dateFrom || dateIn >= new Date(filter.dateFrom);
    const matchDateTo = !filter.dateTo || dateIn <= new Date(filter.dateTo);
    return matchKw && matchTrangThai && matchDateFrom && matchDateTo;
  });
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Xuất Excel
  const exportExcel = () => {
    const exportData = filtered.map((hv, idx) => ({
      'STT': idx + 1,
      'Mã hồ sơ': hv.id,
      'Họ tên': hv.hoTen,
      'Năm sinh': formatDate(hv.namSinh),
      'CCCD': hv.cccd, // không mã hóa khi xuất
      'Địa chỉ': hv.diaChi,
      'Trạng thái': hv.trangThai,
      'Ngày vào': formatDate(hv.ngayVao)
    }));
    const ws = XLSXUtils.json_to_sheet(exportData);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, 'Danh sách học viên');
    XLSXWriteFile(wb, 'danh_sach_hoc_vien.xlsx');
  };
  // Xuất PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('DANH SÁCH HỒ SƠ HỌC VIÊN', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [[
        'STT', 'Mã hồ sơ', 'Họ tên', 'Năm sinh', 'CCCD', 'Địa chỉ', 'Trạng thái', 'Ngày vào'
      ]],
      body: filtered.map((hv, idx) => [
        idx + 1,
        hv.id,
        hv.hoTen,
        formatDate(hv.namSinh),
        hv.cccd, // không mã hóa khi xuất
        hv.diaChi,
        hv.trangThai,
        formatDate(hv.ngayVao)
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139,0,0] },
      margin: { left: 8, right: 8 }
    });
    doc.save('danh_sach_hoc_vien.pdf');
  };

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(f => ({ ...f, [name]: value }));
    setPage(1);
  };
  const handleSearch = () => setPage(1);
  const handleAdd = () => navigate('/hoc-vien/new');
  const handleEdit = (hv) => navigate(`/hoc-vien/${hv.id}/edit`);
  const handleView = (hv) => navigate(`/hoc-vien/${hv.id}`);
  const handleDelete = (hv) => {
    setSelected(hv);
    setShowConfirm(true);
  };
  const handleConfirmDelete = () => {
    setData(d => d.filter(hv => hv.id !== selected.id));
    setShowConfirm(false);
    setToast({ open: true, type: 'success', message: 'Đã xóa học viên.' });
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  // Xóa và toast giữ nguyên

  return (
    <div>
      <h1>Quản lý hồ sơ cai nghiện</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button onClick={exportExcel} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất Excel</button>
        <button onClick={exportPDF} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất PDF</button>
      </div>
      {/* FilterPanel */}
      <FilterPanel>
        <input
          name="keyword"
          value={filter.keyword}
          onChange={handleFilterChange}
          placeholder="Tìm theo mã, họ tên, CCCD"
          style={{ width: 200, marginRight: 12 }}
        />
        <select
          name="trangThai"
          value={filter.trangThai}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang cai">Đang cai</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Tái nghiện">Tái nghiện</option>
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
        <button onClick={handleAdd} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, float: 'right', cursor: 'pointer' }}>+ Thêm mới</button>
      </FilterPanel>
      {/* Bảng danh sách học viên */}
      <div className="table-responsive">
        <table className="table-hocvien">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã hồ sơ</th>
              <th>Họ tên</th>
              <th>Năm sinh</th>
              <th>CCCD</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Ngày vào</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {paged.map((hv, idx) => (
              <tr key={hv.id} style={{ cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td>{(page - 1) * pageSize + idx + 1}</td>
                <td>{hv.id}</td>
                <td>
                  <span className="hv-name" onClick={() => handleView(hv)} style={{ color: '#2980b9', textDecoration: 'underline', cursor: 'pointer' }}>{hv.hoTen}</span>
                </td>
                <td>{formatDate(hv.namSinh)}</td>
                <td>{maskCCCD(hv.cccd)}</td>
                <td>{hv.diaChi}</td>
                <td>
                  <span className="badge" style={{ background: TRANG_THAI_COLORS[hv.trangThai] || '#bbb', color: '#fff', padding: '3px 10px', borderRadius: 12, fontWeight: 600, fontSize: 13 }}>{hv.trangThai}</span>
                </td>
                <td>{formatDate(hv.ngayVao)}</td>
                <td>
                  <button title="Xem chi tiết" onClick={() => handleView(hv)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                  <button title="Sửa" onClick={() => handleEdit(hv)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>✏️</button>
                  <button title="Xóa" onClick={() => handleDelete(hv)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PaginationControl */}
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
      {/* OffcanvasForm, ConfirmModal, Toast sẽ render conditionally */}
      {/* Đã chuyển sang trang riêng, không còn dùng OffcanvasForm ở đây */}
      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Xác nhận xóa" content={`Bạn chắc chắn muốn xóa học viên ${selected?.hoTen || ''}?`} />
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default HocVien; 