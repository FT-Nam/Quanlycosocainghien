import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import DanhMucList from './DanhMucList';
import DanhMucDetail from './DanhMucDetail';
import TaiSanList from './TaiSanList';
import TaiSanDetail from './TaiSanDetail';
import KhoList from './KhoList';
import KhoDetail from './KhoDetail';
import KiemKeList from './KiemKeList';
import KiemKeDetail from './KiemKeDetail';
import SerialList from './SerialList';
import SerialDetail from './SerialDetail';
import BanGiaoList from './BanGiaoList';
import BanGiaoDetail from './BanGiaoDetail';
import SuaChuaList from './SuaChuaList';
import SuaChuaDetail from './SuaChuaDetail';

// Placeholder components cho từng tab, sẽ thay bằng List thực tế sau

const TAB_ROUTE = [
    { path: 'danh-muc', label: 'Danh mục tài sản', List: DanhMucList, Detail: DanhMucDetail },
    { path: 'tai-san', label: 'Tài sản', List: TaiSanList, Detail: TaiSanDetail },
    { path: 'kho', label: 'Quản lý kho', List: KhoList, Detail: KhoDetail },
    { path: 'kiem-ke', label: 'Kiểm kê', List: KiemKeList, Detail: KiemKeDetail },
    { path: 'serial', label: 'Serial sản phẩm', List: SerialList, Detail: SerialDetail },
    { path: 'ban-giao', label: 'Bàn giao', List: BanGiaoList, Detail: BanGiaoDetail },
    { path: 'sua-chua', label: 'Sửa chữa', List: SuaChuaList, Detail: SuaChuaDetail },
];

export default function QuanLyTaiSanPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/quan-ly-tai-san/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý tài sản</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/quan-ly-tai-san/${t.path}`)}
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