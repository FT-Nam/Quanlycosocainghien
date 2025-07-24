import React, { useState } from 'react';

const getUser = () => {
  return JSON.parse(localStorage.getItem('user')) || {
    name: 'Nguyễn Văn A',
    email: 'vana@trungtam.gov.vn',
    role: 'Cán bộ quản lý',
    username: 'CB2034',
    isAdmin: true,
  };
};

const mockLogs = [
  { id: 1, ip: '10.11.21.45', action: 'Đổi mật khẩu', time: '2025-07-23 22:32:10' },
  { id: 2, ip: '10.11.21.45', action: 'Đăng nhập', time: '2025-07-23 21:00:00' },
  { id: 3, ip: '10.11.21.45', action: 'Xem hồ sơ HV', time: '2025-07-22 09:12:10' },
];

function passwordStrength(pw) {
  if (!pw) return '';
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score === 4) return 'Mạnh';
  if (score === 3) return 'Trung bình';
  if (score === 2) return 'Yếu';
  return 'Rất yếu';
}

export default function TaiKhoan() {
  const [user] = useState(getUser());
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLogoutAllModal, setShowLogoutAllModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [logFilter, setLogFilter] = useState({ action: '', from: '', to: '' });
  const [logs] = useState(mockLogs);

  // Đổi mật khẩu logic (giả lập)
  const REAL_OLD_PASSWORD = '123456';
  const canChange =
    oldPassword && newPassword && confirmPassword &&
    oldPassword !== newPassword &&
    newPassword === confirmPassword &&
    passwordStrength(newPassword) === 'Mạnh';

  const handleChangePassword = e => {
    e.preventDefault();
    setMessage(''); setError('');
    if (oldPassword !== REAL_OLD_PASSWORD) {
      setError('Mật khẩu cũ không đúng!'); return;
    }
    setMessage('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
    setTimeout(() => handleLogout(), 1800);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Đăng xuất mọi thiết bị (giả lập)
  const handleLogoutAll = () => {
    setShowLogoutAllModal(false);
    setTimeout(() => handleLogout(), 1200);
  };

  // Lọc log (giả lập)
  const filteredLogs = logs.filter(l =>
    (!logFilter.action || l.action === logFilter.action) &&
    (!logFilter.from || l.time >= logFilter.from) &&
    (!logFilter.to || l.time <= logFilter.to)
  );

  return (
    <div style={{ maxWidth: 900, paddingBottom: 32 }}>
      <h1 style={{ color: '#111', fontWeight: 700, fontSize: 32, marginBottom: 20, marginTop: 21, textAlign: 'left' }}>Tài khoản cá nhân</h1>
      <div className="hv-section" style={{ maxWidth: 900, marginLeft: 0 }}>
        <div className="form-group"><label>Họ tên</label><input value={user.name} disabled style={{ minWidth: 420 }} /></div>
        <div className="form-group"><label>Email đăng nhập</label><input value={user.email} disabled style={{ minWidth: 420 }} /></div>
        <div className="form-group"><label>Số điện thoại</label><input value={user.phone || '0123 456 789'} disabled style={{ minWidth: 420 }} /></div>
        <div className="form-group"><label>Vai trò</label><input value={user.role} disabled style={{ minWidth: 420 }} /></div>
        <div className="form-group"><label>Mã cán bộ</label><input value={user.username} disabled style={{ minWidth: 420 }} /></div>
        <div className="form-group"><label>Đơn vị công tác</label><input value={user.unit || 'Trung tâm cai nghiện Bộ Công an'} disabled style={{ minWidth: 420 }} /></div>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          <button className="form-btn save-btn" type="button" onClick={() => setShowPwdModal(true)}>Đổi mật khẩu</button>
          {user.isAdmin && <button className="form-btn back-btn" type="button" onClick={() => setShowLogModal(true)}>Xem nhật ký hoạt động</button>}
          <button className="form-btn back-btn" type="button" onClick={() => setShowLogoutAllModal(true)}>Đăng xuất mọi thiết bị</button>
        </div>
      </div>
      {/* Modal đổi mật khẩu */}
      {showPwdModal && (
        <div className="modal-backdrop">
          <div className="modal" style={{ minWidth: 340 }}>
            <div className="modal-header"><b>Đổi mật khẩu</b></div>
            <form className="modal-body" onSubmit={handleChangePassword} autoComplete="off">
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type={showOld ? 'text' : 'password'} value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Nhập mật khẩu hiện tại..." style={{ flex: 1 }} autoFocus />
                  <button type="button" style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8B0000' }} onClick={() => setShowOld(v => !v)}>{showOld ? 'Ẩn' : 'Hiện'}</button>
                </div>
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nhập mật khẩu mới..." style={{ flex: 1 }} />
                  <button type="button" style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8B0000' }} onClick={() => setShowNew(v => !v)}>{showNew ? 'Ẩn' : 'Hiện'}</button>
                </div>
                <div style={{ fontSize: 13, color: passwordStrength(newPassword) === 'Mạnh' ? '#2ecc40' : passwordStrength(newPassword) === 'Trung bình' ? '#f39c12' : '#e74c3c', marginTop: 2 }}>
                  Độ mạnh: {passwordStrength(newPassword) || '---'}
                </div>
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu mới</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới..." style={{ flex: 1 }} />
                  <button type="button" style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8B0000' }} onClick={() => setShowConfirm(v => !v)}>{showConfirm ? 'Ẩn' : 'Hiện'}</button>
                </div>
                <div style={{ fontSize: 13, color: confirmPassword && newPassword === confirmPassword ? '#2ecc40' : '#e74c3c', marginTop: 2 }}>
                  {confirmPassword ? (newPassword === confirmPassword ? 'Trùng khớp' : 'Không trùng khớp') : ''}
                </div>
              </div>
              {error && <div className="form-err">{error}</div>}
              {message && <div style={{ color: '#2ecc40', marginBottom: 10, fontWeight: 600 }}>{message}</div>}
              <div className="modal-footer">
                <button className="form-btn save-btn" type="submit" disabled={!canChange}>Đổi mật khẩu</button>
                <button className="form-btn back-btn" type="button" onClick={() => setShowPwdModal(false)}>Hủy</button>
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
                Mật khẩu mới phải tối thiểu 8 ký tự, có chữ hoa, số, ký tự đặc biệt và khác mật khẩu cũ.
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal nhật ký hoạt động */}
      {showLogModal && (
        <div className="modal-backdrop">
          <div className="modal" style={{ minWidth: 520 }}>
            <div className="modal-header"><b>Nhật ký hoạt động</b></div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <select value={logFilter.action} onChange={e => setLogFilter(f => ({ ...f, action: e.target.value }))}>
                  <option value="">Tất cả hành động</option>
                  <option value="Đổi mật khẩu">Đổi mật khẩu</option>
                  <option value="Đăng nhập">Đăng nhập</option>
                  <option value="Xem hồ sơ HV">Xem hồ sơ HV</option>
                </select>
                <input type="date" value={logFilter.from} onChange={e => setLogFilter(f => ({ ...f, from: e.target.value }))} />
                <input type="date" value={logFilter.to} onChange={e => setLogFilter(f => ({ ...f, to: e.target.value }))} />
              </div>
              <table className="table-hocvien" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Hành động</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(l => (
                    <tr key={l.id}>
                      <td>{l.time}</td>
                      <td>{l.action}</td>
                      <td>{l.ip}</td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu</td></tr>}
                </tbody>
              </table>
              <div className="modal-footer">
                <button className="form-btn back-btn" type="button" onClick={() => setShowLogModal(false)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal đăng xuất mọi thiết bị */}
      {showLogoutAllModal && (
        <div className="modal-backdrop">
          <div className="modal" style={{ minWidth: 340 }}>
            <div className="modal-header"><b>Đăng xuất mọi thiết bị</b></div>
            <div className="modal-body">
              <p>Bạn chắc chắn muốn đăng xuất khỏi tất cả thiết bị? Mọi phiên đăng nhập sẽ bị xóa khỏi hệ thống.</p>
              <div className="modal-footer">
                <button className="form-btn save-btn" type="button" onClick={handleLogoutAll}>Xác nhận</button>
                <button className="form-btn back-btn" type="button" onClick={() => setShowLogoutAllModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 