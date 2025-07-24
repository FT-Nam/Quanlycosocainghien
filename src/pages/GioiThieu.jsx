import React from 'react';

export default function GioiThieu() {
  return (
    <div>
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18, marginTop: 0 }}>Giới thiệu</h2>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>Hệ thống quản lý nội bộ Trung tâm cai nghiện Bộ Công an</h3>
      <p style={{ fontSize: 16, marginBottom: 12, color: '#222' }}>
        Hệ thống quản lý nội bộ là giải pháp tổng thể giúp quản lý học viên, cán bộ, điều trị, giáo dục, lao động, tài sản, thăm gặp và các nghiệp vụ khác một cách hiện đại, bảo mật, hiệu quả. Hệ thống được xây dựng nhằm số hóa toàn bộ quy trình quản lý, giảm thiểu thủ tục giấy tờ, tăng tính minh bạch và hỗ trợ ra quyết định nhanh chóng.
      </p>
      <ul style={{ marginLeft: 18, marginBottom: 12, color: '#222', fontSize: 15 }}>
        <li><b>Mục tiêu:</b> Nâng cao hiệu quả quản lý, giảm thủ tục giấy tờ, tăng tính minh bạch, hỗ trợ báo cáo và thống kê tự động.</li>
        <li><b>Chức năng chính:</b>
          <ul style={{ marginLeft: 18, marginTop: 4, marginBottom: 4 }}>
            <li>Quản lý hồ sơ học viên, cán bộ, điều trị, giáo dục, lao động trị liệu.</li>
            <li>Quản lý tài sản, quân trang, thăm gặp, tài chính lưu ký.</li>
            <li>Xuất báo cáo, in biểu mẫu, thống kê số liệu tự động.</li>
            <li>Phân quyền truy cập, bảo mật dữ liệu, sao lưu định kỳ.</li>
          </ul>
        </li>
        <li><b>Đơn vị phát triển:</b> Phòng CNTT, Trung tâm cai nghiện Bộ Công an.</li>
        <li><b>Liên hệ hỗ trợ:</b> 1900 9999 - Email: support@bocongan.gov.vn</li>
      </ul>
      <div style={{ color: '#444', fontSize: 15, marginTop: 8, fontStyle: 'italic' }}>
        <b>Lưu ý:</b> Hệ thống chỉ dành cho cán bộ, nhân viên được cấp quyền truy cập. Mọi hành vi truy cập trái phép sẽ bị xử lý theo quy định.
      </div>
    </div>
  );
} 