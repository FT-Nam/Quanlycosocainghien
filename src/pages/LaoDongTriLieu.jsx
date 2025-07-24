import React, { useState, useEffect } from 'react';
import {
  congViecList,
  nhomList,
  phanCongList,
  ghiNhanList,
  baoCaoTienBo,
  laoDongService
} from '../data/laoDongTriLieu';
import ConfirmModal from '../components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../components/PaginationControl';

const TAB = {
  CONG_VIEC: 'Công việc',
  PHAN_CONG: 'Phân công',
  GHI_NHAN: 'Ghi nhận',
  BAO_CAO: 'Báo cáo',
};

const emptyCongViec = { ten: '', khuVuc: '', gioLam: '', canBo: '' };
const emptyPhanCong = { ngay: '', congViecId: '', nhomId: '' };
const emptyGhiNhan = { phanCongId: '', hocVien: '', gioLam: '', chatLuong: '', thaiDo: '' };

const LaoDongTriLieu = () => {
  const [tab, setTab] = useState(TAB.CONG_VIEC);
  const [congViec, setCongViec] = useState([]);
  const [nhom, setNhom] = useState([]);
  const [phanCong, setPhanCong] = useState([]);
  const [ghiNhan, setGhiNhan] = useState([]);
  const [baoCao, setBaoCao] = useState([]);
  const [selectedNhom, setSelectedNhom] = useState('');
  const [selectedCongViec, setSelectedCongViec] = useState('');
  // Modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  // Form modal state
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(''); // 'congViec' | 'phanCong' | 'ghiNhan'
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  // Thêm state phân trang cho từng tab
  const [pageCongViec, setPageCongViec] = useState(1);
  const [pageSizeCongViec, setPageSizeCongViec] = useState(10);
  const [pagePhanCong, setPagePhanCong] = useState(1);
  const [pageSizePhanCong, setPageSizePhanCong] = useState(10);
  const [pageGhiNhan, setPageGhiNhan] = useState(1);
  const [pageSizeGhiNhan, setPageSizeGhiNhan] = useState(10);
  const [pageBaoCao, setPageBaoCao] = useState(1);
  const [pageSizeBaoCao, setPageSizeBaoCao] = useState(10);
  const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

  // Xuất file
  const exportExcel = () => {
    try {
      // Nếu SheetJS/xlsx đã cài, dùng luôn
      // eslint-disable-next-line
      const XLSX = window.XLSX || null;
      if (XLSX) {
        const ws = XLSX.utils.json_to_sheet(baoCao);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'BaoCao');
        XLSX.writeFile(wb, 'bao_cao_laodong.xlsx');
        return;
      }
    } catch {}
    // Fallback: CSV
    const rows = baoCao.map(bc => ({ 'Học viên': bc.hocVien, 'Số ngày công': bc.soNgayCong, 'Nhận xét': bc.nhanXet }));
    const csv = [Object.keys(rows[0]).join(','), ...rows.map(r => Object.values(r).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bao_cao_laodong.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    laoDongService.getCongViec().then(setCongViec);
    laoDongService.getNhom().then(setNhom);
    laoDongService.getPhanCong().then(setPhanCong);
    laoDongService.getGhiNhan().then(setGhiNhan);
    laoDongService.getBaoCao().then(setBaoCao);
  }, []);

  // Lọc phân công theo nhóm/công việc
  const phanCongFiltered = phanCong.filter(pc => (!selectedNhom || pc.nhomId === selectedNhom) && (!selectedCongViec || pc.congViecId === selectedCongViec));
  // Lấy ghi nhận theo phân công
  const ghiNhanByPhanCong = phanCongId => ghiNhan.filter(gn => gn.phanCongId === phanCongId);
  // Học viên chưa tham gia hoặc không đủ ngày công
  const hocVienChuaThamGia = nhom.flatMap(n => n.hocVien).filter(hv => !ghiNhan.some(gn => gn.hocVien === hv));
  const hocVienKhongDuCong = baoCao.filter(bc => bc.soNgayCong < 15).map(bc => bc.hocVien);

  // Xác nhận xóa nâng cao
  const handleDelete = (type, item) => {
    setDeleteTarget({ type, item });
    setShowConfirm(true);
  };
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { type, item } = deleteTarget;
    if (type === 'congViec') setCongViec(list => list.filter(x => x.id !== item.id));
    if (type === 'phanCong') setPhanCong(list => list.filter(x => x.id !== item.id));
    if (type === 'ghiNhan') setGhiNhan(list => list.filter(x => x.id !== item.id));
    setShowConfirm(false);
    setDeleteTarget(null);
  };

  // Form thêm/sửa
  const openForm = (type, item = null) => {
    setFormType(type);
    setEditItem(item);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditItem(null);
  };
  const handleFormSubmit = values => {
    if (formType === 'congViec') {
      if (editItem) setCongViec(list => list.map(x => x.id === editItem.id ? { ...editItem, ...values } : x));
      else setCongViec(list => [...list, { ...values, id: 'CV' + (Math.random()*10000|0) }]);
    }
    if (formType === 'phanCong') {
      if (editItem) setPhanCong(list => list.map(x => x.id === editItem.id ? { ...editItem, ...values } : x));
      else setPhanCong(list => [...list, { ...values, id: 'PC' + (Math.random()*10000|0) }]);
    }
    if (formType === 'ghiNhan') {
      if (editItem) setGhiNhan(list => list.map(x => x.id === editItem.id ? { ...editItem, ...values } : x));
      else setGhiNhan(list => [...list, { ...values, id: 'GN' + (Math.random()*10000|0) }]);
    }
    closeForm();
  };

  // Render form modal động
  const renderForm = () => {
    if (!showForm) return null;
    if (formType === 'congViec') {
      const v = editItem || emptyCongViec;
      return (
        <div className="offcanvas-form-backdrop">
          <form className="offcanvas-form" onSubmit={e => { e.preventDefault(); handleFormSubmit({ ten: e.target.ten.value, khuVuc: e.target.khuVuc.value, gioLam: e.target.gioLam.value, canBo: e.target.canBo.value }); }}>
            <div className="offcanvas-header"><h2>{editItem ? 'Sửa' : 'Thêm'} công việc</h2><button onClick={closeForm} className="offcanvas-close" type="button">×</button></div>
            <div className="offcanvas-body">
              <div className="form-group"><label>Tên công việc</label><input name="ten" defaultValue={v.ten} required /></div>
              <div className="form-group"><label>Khu vực</label><input name="khuVuc" defaultValue={v.khuVuc} required /></div>
              <div className="form-group"><label>Giờ làm</label><input name="gioLam" defaultValue={v.gioLam} required /></div>
              <div className="form-group"><label>Cán bộ phụ trách</label><input name="canBo" defaultValue={v.canBo} required /></div>
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" onClick={closeForm} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Đóng</button>
              <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>
            </div>
          </form>
        </div>
      );
    }
    if (formType === 'phanCong') {
      const v = editItem || emptyPhanCong;
      return (
        <div className="offcanvas-form-backdrop">
          <form className="offcanvas-form" onSubmit={e => { e.preventDefault(); handleFormSubmit({ ngay: e.target.ngay.value, congViecId: e.target.congViecId.value, nhomId: e.target.nhomId.value }); }}>
            <div className="offcanvas-header"><h2>{editItem ? 'Sửa' : 'Thêm'} phân công</h2><button onClick={closeForm} className="offcanvas-close" type="button">×</button></div>
            <div className="offcanvas-body">
              <div className="form-group"><label>Ngày</label><input type="date" name="ngay" defaultValue={v.ngay} required /></div>
              <div className="form-group"><label>Công việc</label><select name="congViecId" defaultValue={v.congViecId} required>{congViec.map(cv => <option key={cv.id} value={cv.id}>{cv.ten}</option>)}</select></div>
              <div className="form-group"><label>Nhóm</label><select name="nhomId" defaultValue={v.nhomId} required>{nhom.map(n => <option key={n.id} value={n.id}>{n.ten}</option>)}</select></div>
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" onClick={closeForm} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Đóng</button>
              <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>
            </div>
          </form>
        </div>
      );
    }
    if (formType === 'ghiNhan') {
      const v = editItem || emptyGhiNhan;
      return (
        <div className="offcanvas-form-backdrop">
          <form className="offcanvas-form" onSubmit={e => { e.preventDefault(); handleFormSubmit({ phanCongId: e.target.phanCongId.value, hocVien: e.target.hocVien.value, gioLam: e.target.gioLam.value, chatLuong: e.target.chatLuong.value, thaiDo: e.target.thaiDo.value }); }}>
            <div className="offcanvas-header"><h2>{editItem ? 'Sửa' : 'Thêm'} ghi nhận</h2><button onClick={closeForm} className="offcanvas-close" type="button">×</button></div>
            <div className="offcanvas-body">
              <div className="form-group"><label>Phân công</label><select name="phanCongId" defaultValue={v.phanCongId} required>{phanCong.map(pc => <option key={pc.id} value={pc.id}>{congViec.find(cv => cv.id === pc.congViecId)?.ten} - {nhom.find(n => n.id === pc.nhomId)?.ten} ({pc.ngay})</option>)}</select></div>
              <div className="form-group"><label>Học viên</label><input name="hocVien" defaultValue={v.hocVien} required /></div>
              <div className="form-group"><label>Giờ làm</label><input name="gioLam" type="number" step="0.1" defaultValue={v.gioLam} required /></div>
              <div className="form-group"><label>Chất lượng</label><input name="chatLuong" defaultValue={v.chatLuong} required /></div>
              <div className="form-group"><label>Thái độ</label><input name="thaiDo" defaultValue={v.thaiDo} required /></div>
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" onClick={closeForm} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Đóng</button>
              <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>
            </div>
          </form>
        </div>
      );
    }
    return null;
  };

  const [filterCongViec, setFilterCongViec] = useState({ ten: '', khuVuc: '', canBo: '' });
  // Lọc công việc theo filter
  const congViecFiltered = congViec.filter(cv =>
    (!filterCongViec.ten || cv.ten.toLowerCase().includes(filterCongViec.ten.toLowerCase())) &&
    (!filterCongViec.khuVuc || cv.khuVuc.toLowerCase().includes(filterCongViec.khuVuc.toLowerCase())) &&
    (!filterCongViec.canBo || cv.canBo.toLowerCase().includes(filterCongViec.canBo.toLowerCase()))
  );

  return (
    <div>
      <h1>Quản lý lao động trị liệu</h1>
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
      {tab === TAB.CONG_VIEC && (
        <div>
          <h2>Danh sách công việc lao động</h2>
          <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input value={filterCongViec.ten} onChange={e => setFilterCongViec(f => ({ ...f, ten: e.target.value }))} placeholder="Tên công việc" style={{ width: 120 }} />
              <select value={filterCongViec.khuVuc} onChange={e => setFilterCongViec(f => ({ ...f, khuVuc: e.target.value }))} style={{ width: 120 }}>
                <option value="">Tất cả khu vực</option>
                {[...new Set(congViec.map(cv => cv.khuVuc))].map(kv => <option key={kv} value={kv}>{kv}</option>)}
              </select>
              <select value={filterCongViec.canBo} onChange={e => setFilterCongViec(f => ({ ...f, canBo: e.target.value }))} style={{ width: 140 }}>
                <option value="">Tất cả cán bộ</option>
                {[...new Set(congViec.map(cv => cv.canBo))].map(cb => <option key={cb} value={cb}>{cb}</option>)}
              </select>
            </div>
            <button style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/lao-dong/new')}>+ Thêm công việc</button>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Tên công việc</th>
                <th>Khu vực</th>
                <th>Giờ làm</th>
                <th>Cán bộ phụ trách</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {congViecFiltered.slice((pageCongViec-1)*pageSizeCongViec, pageCongViec*pageSizeCongViec).map(cv => (
                <tr key={cv.id}>
                  <td>{cv.ten}</td>
                  <td>{cv.khuVuc}</td>
                  <td>{cv.gioLam}</td>
                  <td>{cv.canBo}</td>
                  <td>
                    <button title="Xem" style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/lao-dong/${cv.id}`)}>👁️</button>
                    <button title="Sửa" style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/lao-dong/${cv.id}/edit`)}>✏️</button>
                    <button title="Xóa" onClick={() => handleDelete('congViec', cv)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={congViecFiltered.length}
              currentPage={pageCongViec}
              pageSize={pageSizeCongViec}
              onChangePage={setPageCongViec}
              onChangePageSize={setPageSizeCongViec}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.PHAN_CONG && (
        <div>
          <h2>Phân công nhóm lao động</h2>
          <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <label>Lọc theo nhóm: </label>
              <select value={selectedNhom} onChange={e => setSelectedNhom(e.target.value)}>
                <option value="">Tất cả nhóm</option>
                {nhom.map(n => <option key={n.id} value={n.id}>{n.ten}</option>)}
              </select>
              <label style={{ marginLeft: 16 }}>Công việc: </label>
              <select value={selectedCongViec} onChange={e => setSelectedCongViec(e.target.value)}>
                <option value="">Tất cả công việc</option>
                {congViec.map(cv => <option key={cv.id} value={cv.id}>{cv.ten}</option>)}
              </select>
            </div>
            <button style={{ background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/phan-cong-lao-dong/new')}>+ Thêm phân công</button>
          </div>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Nhóm</th>
                <th>Công việc</th>
                <th>Học viên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {phanCongFiltered.slice((pagePhanCong-1)*pageSizePhanCong, pagePhanCong*pageSizePhanCong).map(pc => (
                <tr key={pc.id}>
                  <td>{pc.ngay}</td>
                  <td>{nhom.find(n => n.id === pc.nhomId)?.ten}</td>
                  <td>{congViec.find(cv => cv.id === pc.congViecId)?.ten}</td>
                  <td>{nhom.find(n => n.id === pc.nhomId)?.hocVien.join(', ')}</td>
                  <td>
                    <button title="Xem" style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/phan-cong-lao-dong/${pc.id}`)}>👁️</button>
                    <button title="Sửa" style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/phan-cong-lao-dong/${pc.id}/edit`)}>✏️</button>
                    <button title="Xóa" onClick={() => handleDelete('phanCong', pc)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={phanCongFiltered.length}
              currentPage={pagePhanCong}
              pageSize={pageSizePhanCong}
              onChangePage={setPagePhanCong}
              onChangePageSize={setPageSizePhanCong}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
      )}
      {tab === TAB.GHI_NHAN && (
        <div>
          <h2>Ghi nhận giờ làm việc, chất lượng, thái độ</h2>
          <button style={{ marginBottom: 12, background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/ghi-nhan-lao-dong/new')}>+ Thêm ghi nhận</button>
          {phanCong.map(pc => (
            <div key={pc.id} style={{ marginBottom: 24, border: '1px solid #eee', borderRadius: 6, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                Ngày: {pc.ngay} | Nhóm: {nhom.find(n => n.id === pc.nhomId)?.ten} | Công việc: {congViec.find(cv => cv.id === pc.congViecId)?.ten}
              </div>
              <table className="table-hocvien">
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th>Giờ làm</th>
                    <th>Chất lượng</th>
                    <th>Thái độ</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {ghiNhanByPhanCong(pc.id).slice((pageGhiNhan-1)*pageSizeGhiNhan, pageGhiNhan*pageSizeGhiNhan).map(gn => (
                    <tr key={gn.id}>
                      <td>{gn.hocVien}</td>
                      <td>{gn.gioLam}</td>
                      <td>{gn.chatLuong}</td>
                      <td>{gn.thaiDo}</td>
                      <td>
                        <button title="Xem" style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/ghi-nhan-lao-dong/${gn.id}`)}>👁️</button>
                        <button title="Sửa" style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer', marginRight: 6 }} onClick={() => navigate(`/ghi-nhan-lao-dong/${gn.id}/edit`)}>✏️</button>
                        <button title="Xóa" onClick={() => handleDelete('ghiNhan', gn)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 16 }}>
                <PaginationControl
                  total={ghiNhanByPhanCong(pc.id).length}
                  currentPage={pageGhiNhan}
                  pageSize={pageSizeGhiNhan}
                  onChangePage={setPageGhiNhan}
                  onChangePageSize={setPageSizeGhiNhan}
                  pageSizeOptions={PAGE_SIZE_OPTIONS}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === TAB.BAO_CAO && (
        <div>
          <h2>Báo cáo ngày công, tiến bộ lao động trị liệu</h2>
          <button onClick={exportExcel} style={{ marginBottom: 12, background: '#8B0000', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 3, fontWeight: 600, cursor: 'pointer' }}>Xuất Excel</button>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Số ngày công</th>
                <th>Nhận xét</th>
              </tr>
            </thead>
            <tbody>
              {baoCao.slice((pageBaoCao-1)*pageSizeBaoCao, pageBaoCao*pageSizeBaoCao).map(bc => (
                <tr key={bc.hocVien}>
                  <td>{bc.hocVien}</td>
                  <td>{bc.soNgayCong}</td>
                  <td>{bc.nhanXet}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24 }}>
            <PaginationControl
              total={baoCao.length}
              currentPage={pageBaoCao}
              pageSize={pageSizeBaoCao}
              onChangePage={setPageBaoCao}
              onChangePageSize={setPageSizeBaoCao}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <h3>Học viên chưa tham gia lao động</h3>
            <ul>
              {hocVienChuaThamGia.map(hv => <li key={hv}>{hv}</li>)}
            </ul>
            <h3>Học viên tham gia không đủ ngày công</h3>
            <ul>
              {hocVienKhongDuCong.map(hv => <li key={hv}>{hv}</li>)}
            </ul>
          </div>
        </div>
      )}
      {renderForm()}
      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Xác nhận xóa" content={deleteTarget ? `Bạn chắc chắn muốn xóa ${deleteTarget.type === 'congViec' ? 'công việc' : deleteTarget.type === 'phanCong' ? 'phân công' : 'ghi nhận'}${deleteTarget.item?.ten ? ' ' + deleteTarget.item.ten : ''}${deleteTarget.item?.ngay ? ' ngày ' + deleteTarget.item.ngay : ''}${deleteTarget.item?.hocVien ? ' của ' + deleteTarget.item.hocVien : ''}?` : ''} />
    </div>
  );
};

export default LaoDongTriLieu; 