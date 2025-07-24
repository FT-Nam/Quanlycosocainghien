import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import PhongBanList from './PhongBanList';
import PhongBanDetail from './PhongBanDetail';
import CanBoList from './CanBoList';
import CanBoDetail from './CanBoDetail';

const TAB_ROUTE = [
    { path: 'phong-ban', label: 'Phòng ban/Bộ phận', List: PhongBanList, Detail: PhongBanDetail },
    { path: 'can-bo', label: 'Cán bộ nhân viên', List: CanBoList, Detail: CanBoDetail },
];

export default function QuanLyCanBoPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/quan-ly-can-bo/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý cán bộ nhân viên</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/quan-ly-can-bo/${t.path}`)}
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