import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routeNameMap = {
  '': 'Trang chủ',
  'ho-so-cai-nghien': 'Hồ sơ cai nghiện',
  'quan-ly-giao-duc': 'Chương trình giáo dục',
  'dao-tao-nghe': 'Đào tạo nghề',
  'giao-duc': 'Giáo dục/Tư vấn',
  'lao-dong': 'Lao động trị liệu',
  'dan-cu': 'Dân cư',
  'hoc-van': 'Học vấn',
  'tien-an-tien-su': 'Tiền án/Tiền sự',
  'qua-trinh-cai': 'Quá trình cai nghiện',
  'suc-khoe': 'Sức khỏe/Điều trị',
  'giao-duc': 'Giáo dục/Tư vấn/Nghề',
  'danh-gia': 'Đánh giá/Khen thưởng/Kỷ luật',
  'tham-gap': 'Thăm gặp/Mối quan hệ',
  'tai-hoa-nhap': 'Tái hòa nhập/Quản lý sau cai',
  'hoc-vien': 'Hồ sơ cai nghiện',
  'dieu-tri': 'Phác đồ điều trị',
  'tien-luu-ky': 'Tiền lưu ký',
  'quan-trang': 'Quân trang',
  'giao-duc': 'Giáo dục tư vấn',
  'lao-dong': 'Lao động trị liệu',
  'tham-gap': 'Thăm gặp',
  'tai-khoan': 'Tài khoản',
  'new': 'Thêm mới',
  'edit': 'Chỉnh sửa',
  'detail': 'Chi tiết',
  'quan-ly-can-bo': 'Quản lý cán bộ',
  'phong-ban': 'Phòng ban/Bộ phận',
  'can-bo': 'Cán bộ nhân viên',
  'quan-ly-tai-san': 'Quản lý tài sản',
  'danh-muc': 'Danh mục',
  'tai-san': 'Tài sản',
  'lich-su-dieu-chuyen': 'Lịch sử điều chuyển',
  'lich-su-sua-chua': 'Lịch sử sửa chữa',
  'lich-su-thanh-ly': 'Lịch sử thanh lý',
  'quan-ly-buong-phong': 'Quản lý buồng phòng',
  'buong-phong': 'Buồng phòng',
  'lich-su-luu-tru': 'Lịch sử lưu trú',
  'kiem-ke': 'Kiểm kê',
  'ban-giao': 'Bàn giao',
  'sua-chua': 'Sửa chữa',
  'serial': 'Serial Sản phẩm',
  'quan-ly-thuoc-vat-tu': 'Quản lý thuốc, vật tư y tế',
  'thuoc-tinh': 'Thuộc tính',
  'nha-cung-cap': 'Nhà cung cấp',
  'don-vi-tinh': 'Đơn vị tính',
  'thuoc-vat-tu': 'Thuốc/Vật tư',
  'quan-ly-kho': 'Quản lý kho',
  'tra-cuu': 'Tra cứu nhanh',
  'in-bieu-mau': 'In biểu mẫu',
  'bao-cao': 'Báo cáo',
  'gioi-thieu': 'Giới thiệu',
  'huong-dan': 'Hướng dẫn sử dụng',
};

function getBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  // Đặc biệt cho phân công/ghi nhận: Trang chủ / Lao động trị liệu / Thêm mới|Chỉnh sửa|Chi tiết
  if ((parts[0] === 'phan-cong-lao-dong' || parts[0] === 'ghi-nhan-lao-dong')) {
    let last = parts[1] === 'new' ? 'Thêm mới' : parts[2] === 'edit' ? 'Chỉnh sửa' : (parts[1] ? 'Chi tiết' : '');
    if (parts.length === 2 && parts[1] === 'new') last = 'Thêm mới';
    if (parts.length === 3 && parts[2] === 'edit') last = 'Chỉnh sửa';
    if (parts.length === 2 && parts[1] && parts[1] !== 'new') last = 'Chi tiết';
    return [
      { name: 'Lao động trị liệu', path: '/lao-dong' },
      { name: last, path: pathname }
    ];
  }
  const crumbs = [];
  let path = '';
  for (let i = 0; i < parts.length; i++) {
    path += '/' + parts[i];
    let name = routeNameMap[parts[i]] || parts[i];
    // Nếu là id (HVxxx, DTxxx, PCxxx, GNxxx) thì hiển thị là "Chi tiết"
    if (/^HV\d+$/i.test(parts[i]) || /^DT\d+$/i.test(parts[i]) || /^PC\d+$/i.test(parts[i]) || /^GN\d+$/i.test(parts[i])) name = 'Chi tiết';
    crumbs.push({ name, path });
  }
  return crumbs;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const crumbs = getBreadcrumbs(location.pathname);
  if (crumbs.length === 0) return null;
  return (
    <nav className="breadcrumbs">
      <Link to="/">Trang chủ</Link>
      {crumbs.map((c, idx) => (
        <span key={c.path}>
          {' / '}
          {idx === crumbs.length - 1 ? (
            <span className="crumb-current">{c.name}</span>
          ) : (
            <Link to={c.path}>{c.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 