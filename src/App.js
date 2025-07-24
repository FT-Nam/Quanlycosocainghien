import React from 'react';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HocVien from './pages/HocVien';
import HocVienDetail from './pages/HocVienDetail';
import DieuTri from './pages/DieuTri';
import DieuTriDetail from './pages/DieuTriDetail';
import Breadcrumbs from './components/Breadcrumbs';
import TienLuuKy from './pages/TienLuuKy';
import QuanTrang from './pages/QuanTrang';
import TienLuuKyDetail from './pages/TienLuuKyDetail';
import QuanTrangDetail from './pages/QuanTrangDetail';
import GiaoDucTuVan from './pages/GiaoDucTuVan';
import LaoDongTriLieu from './pages/LaoDongTriLieu';
import LaoDongTriLieuDetail from './pages/LaoDongTriLieuDetail';
import PhanCongLaoDongDetail from './pages/PhanCongLaoDongDetail';
import GhiNhanLaoDongDetail from './pages/GhiNhanLaoDongDetail';
import ThamGap from './pages/ThamGap';
import ThamGapDetail from './pages/ThamGapDetail';
import BuoiHocDetail from './pages/BuoiHocDetail';
import LichHocDetail from './pages/LichHocDetail';
import TuVanTamLyDetail from './pages/TuVanTamLyDetail';
import DanhGiaCanBoDetail from './pages/DanhGiaCanBoDetail';
import TaiKhoan from './pages/TaiKhoan';
import TraCuuNhanh from './pages/TraCuuNhanh';
import InBieuMau from './pages/InBieuMau';
import BaoCao from './pages/BaoCao';
import GioiThieu from './pages/GioiThieu';
import HuongDanSuDung from './pages/HuongDanSuDung';
import FAQ from './pages/FAQ';
import HoSoCaiNghienPage from './pages/HoSoCaiNghien';
import QuanLyGiaoDucPage from './pages/QuanLyGiaoDuc';
import QuanLyCanBoPage from './pages/QuanLyCanBo';
import QuanLyTaiSanPage from './pages/QuanLyTaiSan';
import QuanLyBuongPhongPage from './pages/QuanLyBuongPhong';
import QuanLyThuocVatTu from './pages/QuanLyThuocVatTu';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Breadcrumbs />
          <Routes>
            <Route path="/ho-so-cai-nghien/*" element={<HoSoCaiNghienPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/hoc-vien" element={<HocVien />} />
            <Route path="/hoc-vien/new" element={<HocVienDetail />} />
            <Route path="/hoc-vien/:id" element={<HocVienDetail />} />
            <Route path="/hoc-vien/:id/edit" element={<HocVienDetail />} />
            <Route path="/dieu-tri" element={<DieuTri />} />
            <Route path="/dieu-tri/new" element={<DieuTriDetail />} />
            <Route path="/dieu-tri/:id" element={<DieuTriDetail />} />
            <Route path="/dieu-tri/:id/edit" element={<DieuTriDetail />} />
            <Route path="/tien-luu-ky" element={<TienLuuKy />} />
            <Route path="/tien-luu-ky/new" element={<TienLuuKyDetail />} />
            <Route path="/tien-luu-ky/:id" element={<TienLuuKyDetail />} />
            <Route path="/tien-luu-ky/:id/edit" element={<TienLuuKyDetail />} />
            <Route path="/quan-trang" element={<QuanTrang />} />
            <Route path="/quan-trang/new" element={<QuanTrangDetail />} />
            <Route path="/quan-trang/:id" element={<QuanTrangDetail />} />
            <Route path="/quan-trang/:id/edit" element={<QuanTrangDetail />} />
            <Route path="/giao-duc" element={<GiaoDucTuVan />} />
            <Route path="/lao-dong" element={<LaoDongTriLieu />} />
            <Route path="/lao-dong/new" element={<LaoDongTriLieuDetail />} />
            <Route path="/lao-dong/:id" element={<LaoDongTriLieuDetail />} />
            <Route path="/lao-dong/:id/edit" element={<LaoDongTriLieuDetail />} />
            <Route path="/phan-cong-lao-dong/new" element={<PhanCongLaoDongDetail />} />
            <Route path="/phan-cong-lao-dong/:id" element={<PhanCongLaoDongDetail />} />
            <Route path="/phan-cong-lao-dong/:id/edit" element={<PhanCongLaoDongDetail />} />
            <Route path="/ghi-nhan-lao-dong/new" element={<GhiNhanLaoDongDetail />} />
            <Route path="/ghi-nhan-lao-dong/:id" element={<GhiNhanLaoDongDetail />} />
            <Route path="/ghi-nhan-lao-dong/:id/edit" element={<GhiNhanLaoDongDetail />} />
            <Route path="/tham-gap" element={<ThamGap />} />
            <Route path="/tham-gap/new" element={<ThamGapDetail />} />
            <Route path="/tham-gap/:id" element={<ThamGapDetail />} />
            <Route path="/tham-gap/:id/edit" element={<ThamGapDetail />} />
            <Route path="/giao-duc/buoi-hoc/:id" element={<BuoiHocDetail />} />
            <Route path="/giao-duc/lich-hoc/new" element={<LichHocDetail />} />
            <Route path="/giao-duc/lich-hoc/:id/edit" element={<LichHocDetail />} />
            <Route path="/giao-duc/tu-van-tam-ly/new" element={<TuVanTamLyDetail />} />
            <Route path="/giao-duc/tu-van-tam-ly/:id/edit" element={<TuVanTamLyDetail />} />
            <Route path="/giao-duc/danh-gia-can-bo/new" element={<DanhGiaCanBoDetail />} />
            <Route path="/giao-duc/danh-gia-can-bo/:id/edit" element={<DanhGiaCanBoDetail />} />
            <Route path="/tai-khoan" element={<TaiKhoan />} />
            <Route path="/tra-cuu" element={<TraCuuNhanh />} />
            <Route path="/in-bieu-mau" element={<InBieuMau />} />
            <Route path="/bao-cao" element={<BaoCao />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/huong-dan" element={<HuongDanSuDung />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/quan-ly-giao-duc/*" element={<QuanLyGiaoDucPage />} />
            <Route path="/quan-ly-can-bo/*" element={<QuanLyCanBoPage />} />
            <Route path="/quan-ly-tai-san/*" element={<QuanLyTaiSanPage />} />
            <Route path="/quan-ly-buong-phong/*" element={<QuanLyBuongPhongPage />} />
            <Route path="/quan-ly-thuoc-vat-tu/*" element={<QuanLyThuocVatTu />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
