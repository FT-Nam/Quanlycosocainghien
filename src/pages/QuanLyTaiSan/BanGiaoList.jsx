import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maTaiSan: 'TS01', nguoiBanGiao: 'Nguyễn Văn Hùng', nguoiNhan: 'Trần Thị Huyền', ngayBanGiao: '2024-07-01', tinhTrang: 'Tốt' },
    { id: '2', maTaiSan: 'TS02', nguoiBanGiao: 'Nguyễn Văn Nam', nguoiNhan: 'Lê Văn Đức', ngayBanGiao: '2024-07-02', tinhTrang: 'Cần sửa' },
];

export default function BanGiaoList() {
    const [filter, setFilter] = useState({ maTaiSan: '', nguoiBanGiao: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maTaiSan || row.maTaiSan.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
        (!filter.nguoiBanGiao || row.nguoiBanGiao.toLowerCase().includes(filter.nguoiBanGiao.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input placeholder="Tìm người bàn giao" value={filter.nguoiBanGiao} onChange={e => setFilter(f => ({ ...f, nguoiBanGiao: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã tài sản</th>
                        <th>Người bàn giao</th>
                        <th>Người nhận bàn giao</th>
                        <th>Ngày bàn giao</th>
                        <th>Tình trạng bàn giao</th>
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
                                <td>{row.nguoiBanGiao}</td>
                                <td>{row.nguoiNhan}</td>
                                <td>{row.ngayBanGiao}</td>
                                <td>{row.tinhTrang}</td>
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