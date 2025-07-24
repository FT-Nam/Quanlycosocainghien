import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maDVT: 'DVT001', tenDonVi: 'Hộp', moTa: 'Đóng gói hộp', trangThai: 'Đang sử dụng' },
    { id: 2, maDVT: 'DVT002', tenDonVi: 'Cái', moTa: 'Đơn chiếc', trangThai: 'Ngừng sử dụng' },
    // ... thêm dữ liệu mẫu
];

export default function DonViTinhList() {
    const [filter, setFilter] = useState({ maDVT: '', tenDonVi: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maDVT || d.maDVT.toLowerCase().includes(filter.maDVT.toLowerCase())) &&
        (!filter.tenDonVi || d.tenDonVi.toLowerCase().includes(filter.tenDonVi.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã đơn vị" value={filter.maDVT} onChange={e => setFilter(f => ({ ...f, maDVT: e.target.value }))} />
                    <input placeholder="Tìm tên đơn vị" value={filter.tenDonVi} onChange={e => setFilter(f => ({ ...f, tenDonVi: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn vị tính</th>
                        <th>Tên đơn vị</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maDVT}</td>
                            <td>{row.tenDonVi}</td>
                            <td>{row.moTa}</td>
                            <td>{row.trangThai}</td>
                            <td>
                                <button title="Xem chi tiết" onClick={() => nav(`${row.id}`)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                                <button title="Sửa" onClick={() => nav(`${row.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                                <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: 16 }}>
                <PaginationControl
                    total={filtered.length}
                    currentPage={page}
                    pageSize={pageSize}
                    onChangePage={setPage}
                    onChangePageSize={setPageSize}
                />
            </div>
        </div>
    );
} 