import React from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import DanCuList from './DanCuList';
import DanCuDetail from './DanCuDetail';
import HocVanList from './HocVanList';
import HocVanDetail from './HocVanDetail';
import TienAnTienSuList from './TienAnTienSuList';
import TienAnTienSuDetail from './TienAnTienSuDetail';
import QuaTrinhCaiList from './QuaTrinhCaiList';
import QuaTrinhCaiDetail from './QuaTrinhCaiDetail';
import SucKhoeList from './SucKhoeList';
import SucKhoeDetail from './SucKhoeDetail';
import GiaoDucList from './GiaoDucList';
import GiaoDucDetail from './GiaoDucDetail';
import DanhGiaList from './DanhGiaList';
import DanhGiaDetail from './DanhGiaDetail';
import ThamGapList from './ThamGapList';
import ThamGapDetail from './ThamGapDetail';
import TaiHoaNhapList from './TaiHoaNhapList';
import TaiHoaNhapDetail from './TaiHoaNhapDetail';

const TAB_ROUTE = [
    { path: 'dan-cu', label: 'Thông tin dân cư', List: DanCuList, Detail: DanCuDetail },
    { path: 'hoc-van', label: 'Học vấn', List: HocVanList, Detail: HocVanDetail },
    { path: 'tien-an-tien-su', label: 'Tiền án/Tiền sự', List: TienAnTienSuList, Detail: TienAnTienSuDetail },
    { path: 'qua-trinh-cai', label: 'Quá trình cai nghiện', List: QuaTrinhCaiList, Detail: QuaTrinhCaiDetail },
    { path: 'suc-khoe', label: 'Sức khỏe/Điều trị', List: SucKhoeList, Detail: SucKhoeDetail },
    { path: 'giao-duc', label: 'Giáo dục/Tư vấn/Nghề', List: GiaoDucList, Detail: GiaoDucDetail },
    { path: 'danh-gia', label: 'Đánh giá/Khen thưởng/Kỷ luật', List: DanhGiaList, Detail: DanhGiaDetail },
    { path: 'tham-gap', label: 'Thăm gặp/Mối quan hệ', List: ThamGapList, Detail: ThamGapDetail },
    { path: 'tai-hoa-nhap', label: 'Tái hòa nhập/Quản lý sau cai', List: TaiHoaNhapList, Detail: TaiHoaNhapDetail },
];

export default function HoSoCaiNghienPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const tab = TAB_ROUTE.find(t => loc.pathname.includes(`/ho-so-cai-nghien/${t.path}`))?.path || TAB_ROUTE[0].path;
    return (
        <div>
            <h1>Quản lý hồ sơ cai nghiện</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {TAB_ROUTE.map(t => (
                    <button
                        key={t.path}
                        onClick={() => nav(`/ho-so-cai-nghien/${t.path}`)}
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
                    <Route key={t.path} path={`${t.path}`}>
                        <Route index element={<t.List />} />
                        <Route path="new" element={<t.Detail mode="add" />} />
                        <Route path=":id" element={<t.Detail mode="view" />} />
                        <Route path=":id/edit" element={<t.Detail mode="edit" />} />
                    </Route>
                ))}
            </Routes>
        </div>
    );
} 