import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tra-cuu', label: 'Tra cứu nhanh' },
  { to: '/in-bieu-mau', label: 'In biểu mẫu' },
  { to: '/bao-cao', label: 'Báo cáo' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/huong-dan', label: 'Hướng dẫn sử dụng' },
  { to: '/faq', label: 'Câu hỏi thường gặp' },
];

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src="/logo1.png" alt="Bộ Công An" className="logo" />
        </div>
        <div className="header-title">
          HỆ THỐNG QUẢN LÝ TRUNG TÂM CAI NGHIỆN
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-name">Nguyễn Văn A</div>
            <div className="user-role">Cán bộ quản lý</div>
          </div>
          <button className="logout-btn" style={{ background: 'none', border: 'none', color: '#8B0000', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '0 8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Đăng xuất
          </button>
        </div>
      </header>
      <nav className="main-navbar">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Header; 