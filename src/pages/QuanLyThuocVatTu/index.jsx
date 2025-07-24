import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import DanhMucList from './DanhMucList';
import DanhMucDetail from './DanhMucDetail';
import ThuocTinhList from './ThuocTinhList';
import ThuocTinhDetail from './ThuocTinhDetail';
import NhaCungCapList from './NhaCungCapList';
import NhaCungCapDetail from './NhaCungCapDetail';
import DonViTinhList from './DonViTinhList';
import DonViTinhDetail from './DonViTinhDetail';
import ThuocVatTuList from './ThuocVatTuList';
import ThuocVatTuDetail from './ThuocVatTuDetail';
import QuanLyKhoList from './QuanLyKhoList';
import QuanLyKhoDetail from './QuanLyKhoDetail';
import KiemKeList from './KiemKeList';
import KiemKeDetail from './KiemKeDetail';

const TAB_ROUTE = [
    { path: 'danh-muc', label: 'Danh mục', List: DanhMucList, Detail: DanhMucDetail },
    { path: 'thuoc-tinh', label: 'Thuộc tính', List: ThuocTinhList, Detail: ThuocTinhDetail },
    { path: 'nha-cung-cap', label: 'Nhà cung cấp', List: NhaCungCapList, Detail: NhaCungCapDetail },
    { path: 'don-vi-tinh', label: 'Đơn vị tính', List: DonViTinhList, Detail: DonViTinhDetail },
    { path: 'thuoc-vat-tu', label: 'Thuốc/Vật tư', List: ThuocVatTuList, Detail: ThuocVatTuDetail },
    { path: 'quan-ly-kho', label: 'Quản lý kho', List: QuanLyKhoList, Detail: QuanLyKhoDetail },
    { path: 'kiem-ke', label: 'Kiểm kê', List: KiemKeList, Detail: KiemKeDetail },
];

export default function QuanLyThuocVatTuPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/quan-ly-thuoc-vat-tu/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý thuốc, vật tư y tế</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/quan-ly-thuoc-vat-tu/${t.path}`)}
                        style={{
                            background: tab === t.path ? '#8B0000' : '#fff',
                            color: tab === t.path ? '#fff' : '#8B0000',
                            border: '1.2px solid #8B0000',
                            borderRadius: 4,
                            padding: '6px 18px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <Routes>
                <Route index element={<Navigate to={TAB_ROUTE[0].path} replace />} />
                {TAB_ROUTE.map(t => (
                    <Route key={t.path} path={t.path}>
                        <Route index element={<t.List />} />
                        {t.Detail && <Route path="new" element={<t.Detail mode="add" />} />}
                        {t.Detail && <Route path=":id" element={<t.Detail mode="view" />} />}
                        {t.Detail && <Route path=":id/edit" element={<t.Detail mode="edit" />} />}
                    </Route>
                ))}
            </Routes>
        </div>
    );
} 