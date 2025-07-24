import React, { useState } from 'react';
import { dieuTriList as initialData } from '../data/dieuTri';
import FilterPanel from '../components/FilterPanel';
import PaginationControl from '../components/PaginationControl';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TRANG_THAI_COLORS = {
  'Đang điều trị': '#2ecc40',
  'Hoàn tất': '#2980b9',
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
  tenThuoc: '',
  trangThai: '',
  dateFrom: '',
  dateTo: '',
};

const DieuTri = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [data] = useState(initialData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });
  // Dữ liệu cho biểu đồ: lấy theo học viên được chọn filter
  const [selectedHV, setSelectedHV] = useState('');
  const chartData = data.filter(dt => !selectedHV || dt.hocVienId === selectedHV)
    .map(dt => ({
      name: dt.ngayDung,
      ketQua: dt.ketQuaXetNghiem === 'Âm tính' ? 0 : 1
    }));

  const filtered = data.filter(dt => {
    const kw = filter.keyword.trim().toLowerCase();
    const matchKw =
      !kw ||
      dt.tenHocVien.toLowerCase().includes(kw) ||
      dt.hocVienId.toLowerCase().includes(kw);
    const matchThuoc = !filter.tenThuoc || dt.tenThuoc === filter.tenThuoc;
    const matchTrangThai = !filter.trangThai || dt.trangThai === filter.trangThai;
    const date = new Date(dt.ngayDung);
    const matchDateFrom = !filter.dateFrom || date >= new Date(filter.dateFrom);
    const matchDateTo = !filter.dateTo || date <= new Date(filter.dateTo);
    return matchKw && matchThuoc && matchTrangThai && matchDateFrom && matchDateTo;
  });
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(f => ({ ...f, [name]: value }));
    setPage(1);
  };
  const handleSearch = () => setPage(1);
  const handleAdd = () => navigate('/dieu-tri/new');
  const handleEdit = (dt) => navigate(`/dieu-tri/${dt.id}/edit`);
  const handleView = (dt) => navigate(`/dieu-tri/${dt.id}`);
  const handleDelete = (dt) => { setSelected(dt); setShowConfirm(true); };
  const handleConfirmDelete = () => {
    setShowConfirm(false);
    setToast({ open: true, type: 'success', message: 'Đã xóa điều trị.' });
    // TODO: Xóa khỏi data nếu dùng backend
  };
  const handleCloseToast = () => setToast({ ...toast, open: false });

  // Xuất Excel
  const exportExcel = () => {
    const exportData = filtered.map((dt, idx) => ({
      'STT': idx + 1,
      'Mã HV': dt.hocVienId,
      'Họ tên': dt.tenHocVien,
      'Ngày dùng': formatDate(dt.ngayDung),
      'Thuốc': dt.tenThuoc,
      'Liều lượng': dt.lieuLuong,
      'Chỉ định': dt.chiDinh,
      'KQ Xét nghiệm': dt.ketQuaXetNghiem,
      'Đánh giá': dt.danhGiaConNghien,
      'Đơn thuốc tuần': dt.donThuocTuan,
      'Trạng thái': dt.trangThai
    }));
    const ws = XLSXUtils.json_to_sheet(exportData);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, 'Danh sách điều trị');
    XLSXWriteFile(wb, 'danh_sach_dieu_tri.xlsx');
  };
  // Xuất PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('DANH SÁCH ĐIỀU TRỊ CAI NGHIỆN', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [[
        'STT', 'Mã HV', 'Họ tên', 'Ngày dùng', 'Thuốc', 'Liều lượng', 'Chỉ định', 'KQ Xét nghiệm', 'Đánh giá', 'Đơn thuốc tuần', 'Trạng thái'
      ]],
      body: filtered.map((dt, idx) => [
        idx + 1,
        dt.hocVienId,
        dt.tenHocVien,
        formatDate(dt.ngayDung),
        dt.tenThuoc,
        dt.lieuLuong,
        dt.chiDinh,
        dt.ketQuaXetNghiem,
        dt.danhGiaConNghien,
        dt.donThuocTuan,
        dt.trangThai
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139,0,0] },
      margin: { left: 8, right: 8 }
    });
    doc.save('danh_sach_dieu_tri.pdf');
  };

  return (
    <div>
      <h1>Quản lý điều trị cai nghiện</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button onClick={exportExcel} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất Excel</button>
        <button onClick={exportPDF} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất PDF</button>
      </div>
      <FilterPanel>
        <input
          name="keyword"
          value={filter.keyword}
          onChange={handleFilterChange}
          placeholder="Tìm theo tên, mã học viên"
          style={{ width: 200, marginRight: 12 }}
        />
        <select
          name="tenThuoc"
          value={filter.tenThuoc}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả thuốc</option>
          <option value="Methadone">Methadone</option>
          <option value="Suboxone">Suboxone</option>
        </select>
        <select
          name="trangThai"
          value={filter.trangThai}
          onChange={handleFilterChange}
          style={{ marginRight: 12 }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang điều trị">Đang điều trị</option>
          <option value="Hoàn tất">Hoàn tất</option>
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
        <button onClick={handleAdd} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', float: 'right' }}>+ Thêm mới</button>
      </FilterPanel>
      <div className="table-responsive">
        <table className="table-hocvien">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã HV</th>
              <th>Họ tên</th>
              <th>Ngày dùng</th>
              <th>Thuốc</th>
              <th>Liều lượng</th>
              <th>Chỉ định</th>
              <th>KQ Xét nghiệm</th>
              <th>Đánh giá</th>
              <th>Đơn thuốc tuần</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={11} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>
            )}
            {paged.map((dt, idx) => (
              <tr key={dt.id} style={{ cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td>{(page - 1) * pageSize + idx + 1}</td>
                <td>{dt.hocVienId}</td>
                <td>{dt.tenHocVien}</td>
                <td>{formatDate(dt.ngayDung)}</td>
                <td>{dt.tenThuoc}</td>
                <td>{dt.lieuLuong} mg</td>
                <td>{dt.chiDinh}</td>
                <td>{dt.ketQuaXetNghiem}</td>
                <td>{dt.danhGiaConNghien}</td>
                <td>{dt.donThuocTuan}</td>
                <td><span className="badge" style={{ background: TRANG_THAI_COLORS[dt.trangThai] || '#bbb', color: '#fff', padding: '3px 10px', borderRadius: 12, fontWeight: 600, fontSize: 13 }}>{dt.trangThai}</span></td>
                <td>
                  <button title="Xem chi tiết" onClick={() => handleView(dt)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                  <button title="Sửa" onClick={() => handleEdit(dt)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>✏️</button>
                  <button title="Xóa" onClick={() => handleDelete(dt)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
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
      <div style={{ marginTop: 32 }}>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Biểu đồ kết quả xét nghiệm theo thời gian:</label>
          <select value={selectedHV} onChange={e => setSelectedHV(e.target.value)} style={{ padding: '6px 12px', borderRadius: 3, border: '1px solid #ccc' }}>
            <option value="">Tất cả học viên</option>
            {Array.from(new Set(data.map(dt => dt.hocVienId))).map(hvId => (
              <option key={hvId} value={hvId}>{hvId} - {data.find(dt => dt.hocVienId === hvId)?.tenHocVien}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={v => v === 0 ? 'Âm tính' : 'Dương tính'} domain={[0,1]} />
            <Tooltip formatter={v => v === 0 ? 'Âm tính' : 'Dương tính'} />
            <Legend />
            <Line type="monotone" dataKey="ketQua" stroke="#8B0000" name="KQ Xét nghiệm" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Xác nhận xóa" content={`Bạn chắc chắn muốn xóa điều trị cho học viên ${selected?.tenHocVien || ''}?`} />
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={handleCloseToast} />
    </div>
  );
};

export default DieuTri; 