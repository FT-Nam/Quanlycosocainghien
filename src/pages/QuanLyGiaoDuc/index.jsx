import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import DaoTaoNgheList from './DaoTaoNgheList';
import DaoTaoNgheDetail from './DaoTaoNgheDetail';
import GiaoDucTuVanList from './GiaoDucTuVanList';
import GiaoDucTuVanDetail from './GiaoDucTuVanDetail';
import LaoDongTriLieuList from './LaoDongTriLieuList';
import LaoDongTriLieuDetail from './LaoDongTriLieuDetail';

const TAB_ROUTE = [
    { path: 'dao-tao-nghe', label: 'Đào tạo nghề', List: DaoTaoNgheList, Detail: DaoTaoNgheDetail },
    { path: 'giao-duc', label: 'Giáo dục/Tư vấn', List: GiaoDucTuVanList, Detail: GiaoDucTuVanDetail },
    { path: 'lao-dong', label: 'Lao động trị liệu', List: LaoDongTriLieuList, Detail: LaoDongTriLieuDetail },
];

export default function QuanLyGiaoDucPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/quan-ly-giao-duc/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý giáo dục, đào tạo, lao động</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/quan-ly-giao-duc/${t.path}`)}
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