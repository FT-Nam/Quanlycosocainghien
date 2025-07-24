import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', hoTen: 'Nguyễn Văn A', thanNhan: 'Nguyễn Thị C', moiQuanHe: 'Mẹ', thoiGian: '2023-06-01' },
    { id: '2', hoTen: 'Trần Thị B', thanNhan: 'Trần Văn D', moiQuanHe: 'Chồng', thoiGian: '2023-05-15' },
];

export default function ThamGapList() {
    const [filter, setFilter] = useState({ hoTen: '', thanNhan: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.hoTen || row.hoTen.toLowerCase().includes(filter.hoTen.toLowerCase())) &&
        (!filter.thanNhan || row.thanNhan.toLowerCase().includes(filter.thanNhan.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm họ tên" value={filter.hoTen} onChange={e => setFilter(f => ({ ...f, hoTen: e.target.value }))} />
                    <input placeholder="Tìm thân nhân" value={filter.thanNhan} onChange={e => setFilter(f => ({ ...f, thanNhan: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Thân nhân</th>
                        <th>Mối quan hệ</th>
                        <th>Thời gian</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : (
                        data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                            <tr key={row.id}>
                                <td>{(page - 1) * pageSize + idx + 1}</td>
                                <td>{row.hoTen}</td>
                                <td>{row.thanNhan}</td>
                                <td>{row.moiQuanHe}</td>
                                <td>{row.thoiGian}</td>
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