import React, { useState, useEffect } from 'react';
import {
  lopList,
  lichHocList,
  diemDanhList,
  danhGiaBuoiHocList,
  tuVanTamLyList,
  danhGiaCanBoList,
  thongKeHocVien,
  giaoDucService
} from '../data/giaoDucTuVan';
import PaginationControl from '../components/PaginationControl';
import { useNavigate } from 'react-router-dom';

const TAB = {
  LICH_HOC: 'Lịch học',
  TU_VAN: 'Tư vấn tâm lý',
  DANH_GIA_CAN_BO: 'Đánh giá cán bộ',
  THONG_KE: 'Thống kê',
  IN_BANG_DIEM: 'In bảng điểm',
};

const GiaoDucTuVan = () => {
  const [tab, setTab] = useState(TAB.LICH_HOC);
  const [lop, setLop] = useState([]);
  const [lichHoc, setLichHoc] = useState([]);
  const [diemDanh, setDiemDanh] = useState([]);
  const [danhGia, setDanhGia] = useState([]);
  const [tuVan, setTuVan] = useState([]);
  const [danhGiaCanBo, setDanhGiaCanBo] = useState([]);
  const [thongKe, setThongKe] = useState([]);
  // filter state
  const [selectedLop, setSelectedLop] = useState('');
  const [selectedLichHoc, setSelectedLichHoc] = useState('');
  const [filterLichHoc, setFilterLichHoc] = useState({ lop: '', mon: '', giangVien: '', tuNgay: '', denNgay: '' });
  // Thêm state phân trang cho từng tab
  const [pageLichHoc, setPageLichHoc] = useState(1);
  const [pageSizeLichHoc, setPageSizeLichHoc] = useState(10);
  const [pageDiemDanh, setPageDiemDanh] = useState(1);
  const [pageSizeDiemDanh, setPageSizeDiemDanh] = useState(10);
  const [pageDanhGia, setPageDanhGia] = useState(1);
  const [pageSizeDanhGia, setPageSizeDanhGia] = useState(10);
  const [pageTuVan, setPageTuVan] = useState(1);
  const [pageSizeTuVan, setPageSizeTuVan] = useState(10);
  const [pageDanhGiaCanBo, setPageDanhGiaCanBo] = useState(1);
  const [pageSizeDanhGiaCanBo, setPageSizeDanhGiaCanBo] = useState(10);
  const [pageThongKe, setPageThongKe] = useState(1);
  const [pageSizeThongKe, setPageSizeThongKe] = useState(10);
  const [pageInBangDiem, setPageInBangDiem] = useState(1);
  const [pageSizeInBangDiem, setPageSizeInBangDiem] = useState(10);
  const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
  const navigate = useNavigate();

  useEffect(() => {
    giaoDucService.getLop().then(setLop);
    giaoDucService.getLichHoc().then(setLichHoc);
    giaoDucService.getDiemDanh().then(setDiemDanh);
    giaoDucService.getDanhGiaBuoiHoc().then(setDanhGia);
    giaoDucService.getTuVanTamLy().then(setTuVan);
    giaoDucService.getDanhGiaCanBo().then(setDanhGiaCanBo);
    giaoDucService.getThongKe().then(setThongKe);
  }, []);

  // Lọc lịch học theo lớp
  const lichHocByLop = selectedLop ? lichHoc.filter(lh => lh.lopId === selectedLop) : lichHoc;
  // Lấy học viên theo lớp
  const hocVienByLop = selectedLop ? (lop.find(l => l.id === selectedLop)?.hocVien || []) : [];

  // Lọc lịch học theo filter
  const lichHocFiltered = lichHoc.filter(lh =>
    (!filterLichHoc.lop || lh.lopId === filterLichHoc.lop) &&
    (!filterLichHoc.mon || lh.mon.toLowerCase().includes(filterLichHoc.mon.toLowerCase())) &&
    (!filterLichHoc.giangVien || lh.giangVien.toLowerCase().includes(filterLichHoc.giangVien.toLowerCase())) &&
    (!filterLichHoc.tuNgay || new Date(lh.thoiGian) >= new Date(filterLichHoc.tuNgay)) &&
    (!filterLichHoc.denNgay || new Date(lh.thoiGian) <= new Date(filterLichHoc.denNgay))
  );
  // Lọc điểm danh/đánh giá/tu vấn/đánh giá cán bộ theo lớp và lịch học
  const diemDanhFiltered = diemDanh.filter(dd => (!selectedLop || dd.lopId === selectedLop) && (!selectedLichHoc || dd.lichHocId === selectedLichHoc));
  const danhGiaFiltered = danhGia.filter(dg => (!selectedLop || dg.lopId === selectedLop) && (!selectedLichHoc || dg.lichHocId === selectedLichHoc));
  const tuVanFiltered = tuVan.filter(tv => (!selectedLop || tv.lopId === selectedLop) && (!selectedLichHoc || tv.lichHocId === selectedLichHoc));
  const danhGiaCanBoFiltered = danhGiaCanBo.filter(cb => (!selectedLop || cb.lopId === selectedLop) && (!selectedLichHoc || cb.lichHocId === selectedLichHoc));
  const thongKeFiltered = thongKe.filter(tk => !selectedLop || tk.lop === (lop.find(l => l.id === selectedLop)?.ten));

  return (
    <div>
      <h1>Quản lý giáo dục, tư vấn</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {Object.values(TAB).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? '#8B0000' : '#fff',
              color: tab === t ? '#fff' : '#8B0000',
              border: '1.2px solid #8B0000',
              borderRadius: 4,
              padding: '6px 18px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === TAB.LICH_HOC && (
        <div>
          <h2>Lịch học theo tuần/tháng</h2>
          <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label>Lớp: </label>
                <select value={filterLichHoc.lop} onChange={e => setFilterLichHoc(f => ({ ...f, lop: e.target.value }))}>
                  <option value="">Tất cả lớp</option>
                  {lop.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
                </select>
              </div>
              <div>
                <label>Môn học: </label>
                <input value={filterLichHoc.mon} onChange={e => setFilterLichHoc(f => ({ ...f, mon: e.target.value }))} placeholder="Nhập tên môn" style={{ width: 120 }} />
              </div>
              <div>
                <label>Giảng viên: </label>
                <input value={filterLichHoc.giangVien} onChange={e => setFilterLichHoc(f => ({ ...f, giangVien: e.target.value }))} placeholder="Tên giảng viên" style={{ width: 120 }} />
              </div>
              <div>
                <label>Từ ngày: </label>
                <input type="date" value={filterLichHoc.tuNgay} onChange={e => setFilterLichHoc(f => ({ ...f, tuNgay: e.target.value }))} />
              </div>
              <div>
                <label>Đến ngày: </label>
                <input type="date" value={filterLichHoc.denNgay} onChange={e => setFilterLichHoc(f => ({ ...f, denNgay: e.target.value }))} />
              </div>
            </div>
            <button onClick={() => navigate('/giao-duc/lich-hoc/new')} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Thêm lịch học</button>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Lớp</th>
                <th>Tuần/Tháng</th>
                <th>Môn học</th>
                <th>Giảng viên</th>
                <th>Thời gian</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {lichHocFiltered.slice((pageLichHoc-1)*pageSizeLichHoc, pageLichHoc*pageSizeLichHoc).map(lh => (
                <tr key={lh.id}>
                  <td>{lop.find(l => l.id === lh.lopId)?.ten || ''}</td>
                  <td>{lh.type === 'Tuần' ? lh.value : ''}{lh.type === 'Tháng' ? lh.value : ''}</td>
                  <td>{lh.mon}</td>
                  <td>{lh.giangVien}</td>
                  <td>{lh.thoiGian.replace('T', ' ')}</td>
                  <td>
                    <button title="Xem chi tiết" onClick={() => navigate(`/giao-duc/buoi-hoc/${lh.id}`)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                    <button title="Sửa" onClick={() => navigate(`/giao-duc/lich-hoc/${lh.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={lichHocFiltered.length}
              currentPage={pageLichHoc}
              pageSize={pageSizeLichHoc}
              onChangePage={setPageLichHoc}
              onChangePageSize={setPageSizeLichHoc}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.TU_VAN && (
        <div>
          <h2>Nội dung các buổi tư vấn tâm lý</h2>
          <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label>Lớp: </label>
                <select value={selectedLop} onChange={e => { setSelectedLop(e.target.value); setSelectedLichHoc(''); }}>
                  <option value="">Tất cả lớp</option>
                  {lop.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
                </select>
              </div>
              <div>
                <label>Buổi học: </label>
                <select value={selectedLichHoc} onChange={e => setSelectedLichHoc(e.target.value)}>
                  <option value="">Tất cả buổi</option>
                  {lichHocByLop.map(lh => <option key={lh.id} value={lh.id}>{lh.mon} ({lh.thoiGian.replace('T', ' ')})</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => navigate('/giao-duc/tu-van-tam-ly/new')} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Thêm tư vấn tâm lý</button>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Lớp</th>
                <th>Buổi học</th>
                <th>Giảng viên</th>
                <th>Học viên</th>
                <th>Nội dung tư vấn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tuVanFiltered.slice((pageTuVan-1)*pageSizeTuVan, pageTuVan*pageSizeTuVan).map(tv => (
                <tr key={tv.id}>
                  <td>{tv.ngay}</td>
                  <td>{lop.find(l => l.id === tv.lopId)?.ten || ''}</td>
                  <td>{lichHoc.find(lh => lh.id === tv.lichHocId)?.mon || ''}</td>
                  <td>{tv.giangVien}</td>
                  <td>{tv.hocVien}</td>
                  <td>{tv.noiDung}</td>
                  <td>
                    <button title="Sửa" onClick={() => navigate(`/giao-duc/tu-van-tam-ly/${tv.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={tuVanFiltered.length}
              currentPage={pageTuVan}
              pageSize={pageSizeTuVan}
              onChangePage={setPageTuVan}
              onChangePageSize={setPageSizeTuVan}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.DANH_GIA_CAN_BO && (
        <div>
          <h2>Đánh giá cán bộ</h2>
          <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label>Lớp: </label>
                <select value={selectedLop} onChange={e => { setSelectedLop(e.target.value); setSelectedLichHoc(''); }}>
                  <option value="">Tất cả lớp</option>
                  {lop.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
                </select>
              </div>
              <div>
                <label>Buổi học: </label>
                <select value={selectedLichHoc} onChange={e => setSelectedLichHoc(e.target.value)}>
                  <option value="">Tất cả buổi</option>
                  {lichHocByLop.map(lh => <option key={lh.id} value={lh.id}>{lh.mon} ({lh.thoiGian.replace('T', ' ')})</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => navigate('/giao-duc/danh-gia-can-bo/new')} style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Thêm đánh giá cán bộ</button>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Lớp</th>
                <th>Buổi học</th>
                <th>Cán bộ tư vấn</th>
                <th>Học viên</th>
                <th>Đánh giá</th>
                <th>Nhận xét</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {danhGiaCanBoFiltered.slice((pageDanhGiaCanBo-1)*pageSizeDanhGiaCanBo, pageDanhGiaCanBo*pageSizeDanhGiaCanBo).map(cb => (
                <tr key={cb.id}>
                  <td>{cb.ngay}</td>
                  <td>{lop.find(l => l.id === cb.lopId)?.ten || ''}</td>
                  <td>{lichHoc.find(lh => lh.id === cb.lichHocId)?.mon || ''}</td>
                  <td>{cb.canBo}</td>
                  <td>{cb.hocVien}</td>
                  <td>{cb.danhGia}</td>
                  <td>{cb.nhanXet}</td>
                  <td>
                    <button title="Sửa" onClick={() => navigate(`/giao-duc/danh-gia-can-bo/${cb.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={danhGiaCanBoFiltered.length}
              currentPage={pageDanhGiaCanBo}
              pageSize={pageSizeDanhGiaCanBo}
              onChangePage={setPageDanhGiaCanBo}
              onChangePageSize={setPageSizeDanhGiaCanBo}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.THONG_KE && (
        <div>
          <h2>Thống kê số buổi học, điểm trung bình</h2>
          <div style={{ marginBottom: 12 }}>
            <label>Lọc theo lớp: </label>
            <select value={selectedLop} onChange={e => setSelectedLop(e.target.value)}>
              <option value="">Tất cả lớp</option>
              {lop.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
            </select>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Lớp</th>
                <th>Số buổi học</th>
                <th>Điểm trung bình</th>
              </tr>
            </thead>
            <tbody>
              {thongKeFiltered.slice((pageThongKe-1)*pageSizeThongKe, pageThongKe*pageSizeThongKe).map(tk => (
                <tr key={tk.hocVien}>
                  <td>{tk.hocVien}</td>
                  <td>{tk.lop}</td>
                  <td>{tk.soBuoi}</td>
                  <td>{tk.diemTB}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={thongKeFiltered.length}
              currentPage={pageThongKe}
              pageSize={pageSizeThongKe}
              onChangePage={setPageThongKe}
              onChangePageSize={setPageSizeThongKe}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.IN_BANG_DIEM && (
        <div>
          <h2>In bảng điểm, bảng tổng kết cuối kỳ</h2>
          <div style={{ marginBottom: 12 }}>
            <label>Lọc theo lớp: </label>
            <select value={selectedLop} onChange={e => setSelectedLop(e.target.value)}>
              <option value="">Chọn lớp</option>
              {lop.map(l => <option key={l.id} value={l.id}>{l.ten}</option>)}
            </select>
          </div>
          <button
            style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: 3, fontWeight: 600, cursor: selectedLop ? 'pointer' : 'not-allowed', marginBottom: 16, opacity: selectedLop ? 1 : 0.5 }}
            disabled={!selectedLop}
          >
            In bảng điểm
          </button>
          {!selectedLop && <div style={{ color: '#e74c3c', marginBottom: 12 }}>Vui lòng chọn lớp để xem và in bảng điểm.</div>}
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Lớp</th>
                <th>Môn học</th>
                <th>Điểm TB</th>
                <th>Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {thongKeFiltered.filter(tk => !selectedLop || tk.lop === (lop.find(l => l.id === selectedLop)?.ten)).slice((pageInBangDiem-1)*pageSizeInBangDiem, pageInBangDiem*pageSizeInBangDiem).map(tk => (
                <tr key={tk.hocVien}>
                  <td>{tk.hocVien}</td>
                  <td>{tk.lop}</td>
                  <td>{/* Môn học tổng hợp, có thể mở rộng sau */}</td>
                  <td>{tk.diemTB}</td>
                  <td>{tk.diemTB >= 8 ? 'Giỏi' : tk.diemTB >= 7 ? 'Khá' : 'Trung bình'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={thongKeFiltered.filter(tk => !selectedLop || tk.lop === (lop.find(l => l.id === selectedLop)?.ten)).length}
              currentPage={pageInBangDiem}
              pageSize={pageSizeInBangDiem}
              onChangePage={setPageInBangDiem}
              onChangePageSize={setPageSizeInBangDiem}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiaoDucTuVan; 