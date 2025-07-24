import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/ho-so-cai-nghien">Hồ sơ cai nghiện</NavLink></li>
          <li><NavLink to="/quan-ly-giao-duc">Quản lý giáo dục</NavLink></li>
          <li><NavLink to="/quan-ly-can-bo">Quản lý cán bộ</NavLink></li>
          <li><NavLink to="/quan-ly-tai-san">Quản lý tài sản</NavLink></li>
          <li><NavLink to="/quan-ly-buong-phong">Quản lý buồng</NavLink></li>
          <li><NavLink to="/quan-ly-thuoc-vat-tu">Quản lý thuốc, vật tư y tế</NavLink></li>
          <li><NavLink to="/tai-khoan">Tài khoản</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 