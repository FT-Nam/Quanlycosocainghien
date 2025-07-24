import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maNCC: 'NCC001', tenNCC: 'Công ty Dược A', trangThai: 'Đang hợp tác', moTa: 'Nhà cung cấp chính' },
    { id: 2, maNCC: 'NCC002', tenNCC: 'Công ty VTYT B', trangThai: 'Ngừng hợp tác', moTa: 'Chuyên vật tư y tế' },
    // ... thêm dữ liệu mẫu
];

export default function NhaCungCapList() {
    const [filter, setFilter] = useState({ maNCC: '', tenNCC: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maNCC || d.maNCC.toLowerCase().includes(filter.maNCC.toLowerCase())) &&
        (!filter.tenNCC || d.tenNCC.toLowerCase().includes(filter.tenNCC.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã nhà cung cấp" value={filter.maNCC} onChange={e => setFilter(f => ({ ...f, maNCC: e.target.value }))} />
                    <input placeholder="Tìm tên nhà cung cấp" value={filter.tenNCC} onChange={e => setFilter(f => ({ ...f, tenNCC: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã nhà cung cấp</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Trạng thái</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maNCC}</td>
                            <td>{row.tenNCC}</td>
                            <td>{row.trangThai}</td>
                            <td>{row.moTa}</td>
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