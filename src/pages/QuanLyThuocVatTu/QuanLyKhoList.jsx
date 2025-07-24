import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, soLuongTon: 100, soLuongSuDung: 80, soLuongDangXuLy: 20 },
    { id: 2, soLuongTon: 50, soLuongSuDung: 45, soLuongDangXuLy: 5 },
    // ... thêm dữ liệu mẫu
];

export default function QuanLyKhoList() {
    const [filter, setFilter] = useState({ soLuongTon: '', soLuongSuDung: '', soLuongDangXuLy: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.soLuongTon || String(d.soLuongTon).includes(filter.soLuongTon)) &&
        (!filter.soLuongSuDung || String(d.soLuongSuDung).includes(filter.soLuongSuDung)) &&
        (!filter.soLuongDangXuLy || String(d.soLuongDangXuLy).includes(filter.soLuongDangXuLy))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm SL tồn kho" value={filter.soLuongTon} onChange={e => setFilter(f => ({ ...f, soLuongTon: e.target.value }))} />
                    <input placeholder="Tìm SL có thể sử dụng" value={filter.soLuongSuDung} onChange={e => setFilter(f => ({ ...f, soLuongSuDung: e.target.value }))} />
                    <input placeholder="Tìm SL đang xử lý" value={filter.soLuongDangXuLy} onChange={e => setFilter(f => ({ ...f, soLuongDangXuLy: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Số lượng tồn kho</th>
                        <th>Số lượng tồn kho có thể sử dụng</th>
                        <th>Số lượng tồn kho đang xử lý</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.soLuongTon}</td>
                            <td>{row.soLuongSuDung}</td>
                            <td>{row.soLuongDangXuLy}</td>
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