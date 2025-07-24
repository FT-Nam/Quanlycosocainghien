import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maTaiSan: 'TS01', tinhTrangBanDau: 'Hỏng', tinhTrangSuaChua: 'Đã sửa', ngaySuaChua: '2024-07-01', nguoiChiuTN: 'Nguyễn Văn A' },
    { id: '2', maTaiSan: 'TS02', tinhTrangBanDau: 'Bảo trì', tinhTrangSuaChua: 'Đang sửa', ngaySuaChua: '2024-07-02', nguoiChiuTN: 'Trần Thị B' },
];

export default function SuaChuaList() {
    const [filter, setFilter] = useState({ maTaiSan: '', nguoiChiuTN: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maTaiSan || row.maTaiSan.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
        (!filter.nguoiChiuTN || row.nguoiChiuTN.toLowerCase().includes(filter.nguoiChiuTN.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input placeholder="Tìm người chịu trách nhiệm" value={filter.nguoiChiuTN} onChange={e => setFilter(f => ({ ...f, nguoiChiuTN: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã tài sản</th>
                        <th>Tình trạng ban đầu</th>
                        <th>Tình trạng sửa chữa</th>
                        <th>Ngày sửa chữa</th>
                        <th>Người chịu trách nhiệm</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : (
                        data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                            <tr key={row.id}>
                                <td>{(page - 1) * pageSize + idx + 1}</td>
                                <td>{row.maTaiSan}</td>
                                <td>{row.tinhTrangBanDau}</td>
                                <td>{row.tinhTrangSuaChua}</td>
                                <td>{row.ngaySuaChua}</td>
                                <td>{row.nguoiChiuTN}</td>
                                <td>
                                    <button title="Xem chi tiết" onClick={() => nav(`${row.id}`)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                                    <button title="Sửa" onClick={() => nav(`${row.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: 16 }}>
                <PaginationControl
                    total={data.length}
                    currentPage={page}
                    pageSize={pageSize}
                    onChangePage={setPage}
                    onChangePageSize={setPageSize}
                />
            </div>
        </div>
    );
} 