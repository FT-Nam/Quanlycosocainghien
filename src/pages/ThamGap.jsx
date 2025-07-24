import React, { useEffect, useState } from 'react';
import { thamGapService } from '../data/thamGap';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../components/PaginationControl';
import Toast from '../components/Toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import các component dùng chung nếu có: FilterPanel, PaginationControl, ConfirmModal, Toast

const PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const trangThaiList = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã thăm'];
const hinhThucList = ['Tất cả', 'Trực tiếp', 'Gửi đồ'];

function formatDate(dt) {
  return new Date(dt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function ThamGap() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ trangThai: 'Tất cả', hinhThuc: 'Tất cả', tuNgay: '', denNgay: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });
  const [pageSize, setPageSize] = useState(10);
  const nav = useNavigate();

  useEffect(() => {
    loadData();
  }, [filter, page]);

  const loadData = async () => {
    let list = await thamGapService.getAll();
    if (filter.trangThai !== 'Tất cả') list = list.filter(x => x.trangThai === filter.trangThai);
    if (filter.hinhThuc !== 'Tất cả') list = list.filter(x => x.hinhThuc === filter.hinhThuc);
    if (filter.tuNgay && filter.denNgay) {
      list = list.filter(x => {
        const t = new Date(x.thoiGian);
        return t >= new Date(filter.tuNgay) && t <= new Date(filter.denNgay);
      });
    }
    setTotal(list.length);
    setData(list.slice((page-1)*pageSize, page*pageSize));
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      await thamGapService.delete(id);
      loadData();
    }
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map((row, idx) => ({
      STT: (page-1)*pageSize + idx + 1,
      'Học viên': row.tenHocVien,
      'Người thân': row.nguoiThan.ten,
      'Quan hệ': row.nguoiThan.quanHe,
      'CCCD': row.nguoiThan.cccd.replace(/\d{6}(\d{6})/, '******$1'),
      'Hình thức': row.hinhThuc,
      'Thời gian': formatDate(row.thoiGian),
      'Phòng': row.phongGap,
      'Cán bộ': row.canBo,
      'Trạng thái': row.trangThai,
      'Kết quả': row.ketQua,
      'Vi phạm': row.viPham ? 'Có' : 'Không',
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ThamGap');
    XLSX.writeFile(wb, 'danh_sach_tham_gap.xlsx');
    setToast({ open: true, type: 'success', message: 'Đã xuất Excel!' });
  };
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('DANH SÁCH THĂM GẶP', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [[
        'STT', 'Học viên', 'Người thân', 'Quan hệ', 'CCCD', 'Hình thức', 'Thời gian', 'Phòng', 'Cán bộ', 'Trạng thái', 'Kết quả', 'Vi phạm'
      ]],
      body: data.map((row, idx) => [
        (page-1)*pageSize + idx + 1,
        row.tenHocVien,
        row.nguoiThan.ten,
        row.nguoiThan.quanHe,
        row.nguoiThan.cccd.replace(/\d{6}(\d{6})/, '******$1'),
        row.hinhThuc,
        formatDate(row.thoiGian),
        row.phongGap,
        row.canBo,
        row.trangThai,
        row.ketQua,
        row.viPham ? 'Có' : 'Không',
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139,0,0] },
      margin: { left: 8, right: 8 }
    });
    doc.save('danh_sach_tham_gap.pdf');
    setToast({ open: true, type: 'success', message: 'Đã xuất PDF!' });
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <div className="tham-gap-page">
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 28 }}>Quản lý thăm gặp</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }} onClick={exportExcel}>Xuất Excel</button>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }} onClick={exportPDF}>Xuất PDF</button>
      </div>
      <div className="filter-panel" style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <select name="trangThai" value={filter.trangThai} onChange={handleFilterChange}>
            {trangThaiList.map(s => <option key={s}>{s}</option>)}
          </select>
          <select name="hinhThuc" value={filter.hinhThuc} onChange={handleFilterChange}>
            {hinhThucList.map(s => <option key={s}>{s}</option>)}
          </select>
          <input type="date" name="tuNgay" value={filter.tuNgay} onChange={handleFilterChange} />
          <input type="date" name="denNgay" value={filter.denNgay} onChange={handleFilterChange} />
        </div>
        <button style={{ background: '#8B0000', color: '#fff', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }} onClick={()=>nav('/tham-gap/new')}>+ Thêm mới</button>
      </div>
      <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Học viên</th>
            <th>Người thân</th>
            <th>Quan hệ</th>
            <th>CCCD</th>
            <th>Hình thức</th>
            <th>Thời gian</th>
            <th>Phòng</th>
            <th>Cán bộ</th>
            <th>Trạng thái</th>
            <th>Kết quả</th>
            <th>Vi phạm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id}>
              <td>{(page-1)*pageSize + idx + 1}</td>
              <td>{row.tenHocVien}</td>
              <td>{row.nguoiThan.ten}</td>
              <td>{row.nguoiThan.quanHe}</td>
              <td>{row.nguoiThan.cccd}</td>
              <td>{row.hinhThuc}</td>
              <td>{formatDate(row.thoiGian)}</td>
              <td>{row.phongGap}</td>
              <td>{row.canBo}</td>
              <td>{row.trangThai}</td>
              <td>{row.ketQua}</td>
              <td>{row.viPham ? 'Có' : 'Không'}</td>
              <td>
                <button title="Xem chi tiết" onClick={()=>nav(`/tham-gap/${row.id}`)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                <button title="Sửa" onClick={()=>nav(`/tham-gap/${row.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>✏️</button>
                <button title="Xóa" onClick={()=>handleDelete(row.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
} 