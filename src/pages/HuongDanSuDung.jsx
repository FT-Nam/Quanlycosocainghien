import React from 'react';

export default function HuongDanSuDung() {
  return (
    <div>
      <h2 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18, marginTop: 0 }}>Hướng dẫn sử dụng</h2>
      <ol style={{ marginLeft: 18, marginBottom: 12, color: '#222', fontSize: 15 }}>
        <li><b>Quản lý hồ sơ cai nghiện:</b> Vào <b>Hồ sơ cai nghiện</b>, quản lý thông tin dân cư, học vấn, tiền án tiền sự, quá trình cai nghiện, sức khỏe, giáo dục/tư vấn/nghề, đánh giá, thăm gặp, tái hòa nhập. Có thể thêm mới, chỉnh sửa, xóa, xuất file danh sách.</li>
        <li><b>Quản lý giáo dục:</b> Vào <b>Quản lý giáo dục</b>, quản lý đào tạo nghề, giáo dục/tư vấn, lao động trị liệu. Thực hiện điểm danh, đánh giá, phân công, ghi nhận kết quả.</li>
        <li><b>Quản lý cán bộ:</b> Vào <b>Quản lý cán bộ</b>, quản lý phòng ban/bộ phận, cán bộ nhân viên. Thêm mới, chỉnh sửa, xem chi tiết cán bộ.</li>
        <li><b>Quản lý tài sản:</b> Vào <b>Quản lý tài sản</b>, quản lý danh mục, tài sản, kho, kiểm kê, serial, bàn giao, sửa chữa.</li>
        <li><b>Quản lý buồng:</b> Vào <b>Quản lý buồng</b>, quản lý buồng/phòng và lịch sử lưu trú của học viên.</li>
        <li><b>Quản lý thuốc, vật tư y tế:</b> Vào <b>Quản lý thuốc, vật tư y tế</b>, quản lý danh mục, thuộc tính, nhà cung cấp, đơn vị tính, thuốc/vật tư, kho, kiểm kê.</li>
        <li><b>Quản lý tài khoản:</b> Vào <b>Tài khoản</b> để đổi mật khẩu, xem nhật ký truy cập, cập nhật thông tin cá nhân.</li>
      </ol>
      <div style={{ color: '#444', fontSize: 15, marginTop: 8, fontStyle: 'italic' }}>
        <b>Lưu ý:</b>
        <ul style={{ marginLeft: 18, marginTop: 4, marginBottom: 4 }}>
          <li>Đảm bảo bảo mật tài khoản, không chia sẻ mật khẩu cho người khác.</li>
          <li>Thường xuyên sao lưu dữ liệu quan trọng.</li>
          <li>Liên hệ hỗ trợ kỹ thuật khi gặp sự cố: 1900 9999 - support@bocongan.gov.vn</li>
        </ul>
      </div>
    </div>
  );
} 