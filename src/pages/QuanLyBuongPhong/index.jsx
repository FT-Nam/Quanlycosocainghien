import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import BuongPhongList from './BuongPhongList';
import BuongPhongDetail from './BuongPhongDetail';
import LichSuLuuTruList from './LichSuLuuTruList';
import LichSuLuuTruDetail from './LichSuLuuTruDetail';

const TAB_ROUTE = [
    { path: 'buong-phong', label: 'Buồng/Phòng', List: BuongPhongList, Detail: BuongPhongDetail },
    { path: 'lich-su-luu-tru', label: 'Lịch sử lưu trú', List: LichSuLuuTruList, Detail: LichSuLuuTruDetail },
];

export default function QuanLyBuongPhongPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/quan-ly-buong-phong/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý buồng, phòng</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/quan-ly-buong-phong/${t.path}`)}
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