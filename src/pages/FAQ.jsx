import React from 'react';

const faqs = [
  {
    q: 'Làm sao để đổi mật khẩu?',
    a: 'Vào mục Tài khoản, chọn Đổi mật khẩu. Nhập mật khẩu cũ và mật khẩu mới, sau đó xác nhận.'
  },
  {
    q: 'Làm sao xuất file danh sách?',
    a: 'Vào trang danh sách học viên/cán bộ, bấm nút Xuất Excel hoặc PDF ở góc trên bên phải.'
  },
  {
    q: 'Không đăng nhập được?',
    a: 'Kiểm tra lại tài khoản/mật khẩu. Nếu vẫn không đăng nhập được, liên hệ quản trị viên để được cấp lại.'
  },
  {
    q: 'Làm sao in biểu mẫu?',
    a: 'Vào mục In biểu mẫu, chọn loại giấy tờ, nhập thông tin cần thiết, bấm In hoặc Xuất PDF.'
  },
  {
    q: 'Có thể xem lại lịch sử thao tác không?',
    a: 'Hệ thống lưu lại lịch sử thao tác của từng tài khoản. Vào mục Tài khoản > Lịch sử để xem chi tiết.'
  },
  {
    q: 'Liên hệ hỗ trợ kỹ thuật như thế nào?',
    a: 'Gọi 1900 9999 hoặc email support@bocongan.gov.vn để được hỗ trợ.'
  },
  {
    q: 'Dữ liệu có được sao lưu định kỳ không?',
    a: 'Dữ liệu hệ thống được sao lưu tự động hàng ngày và lưu trữ an toàn trên máy chủ trung tâm.'
  },
];

export default function FAQ() {
  return (
    <div>
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18, marginTop: 0 }}>Câu hỏi thường gặp (FAQ)</h2>
      {faqs.map((item, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 2 }}><b>Hỏi:</b> {item.q}</div>
          <div style={{ fontSize: 15, color: '#444', marginLeft: 18 }}><b>Đáp:</b> {item.a}</div>
        </div>
      ))}
    </div>
  );
} 