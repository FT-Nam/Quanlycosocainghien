import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maKhoa: 'KN001', tenKhoa: 'Cơ khí', loaiNganhNghe: 'Kỹ thuật', moTa: 'Đào tạo cơ khí căn bản' },
    { id: '2', maKhoa: 'KN002', tenKhoa: 'Điện tử', loaiNganhNghe: 'Kỹ thuật', moTa: 'Đào tạo điện tử cơ bản' },
];

export default function DaoTaoNgheList() {
    const [filter, setFilter] = useState({ maKhoa: '', tenKhoa: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maKhoa || row.maKhoa.toLowerCase().includes(filter.maKhoa.toLowerCase())) &&
        (!filter.tenKhoa || row.tenKhoa.toLowerCase().includes(filter.tenKhoa.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã khóa" value={filter.maKhoa} onChange={e => setFilter(f => ({ ...f, maKhoa: e.target.value }))} />
                    <input placeholder="Tìm tên khóa" value={filter.tenKhoa} onChange={e => setFilter(f => ({ ...f, tenKhoa: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khóa</th>
                        <th>Tên khóa</th>
                        <th>Loại ngành nghề</th>
                        <th>Mô tả</th>
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
                                <td>{row.maKhoa}</td>
                                <td>{row.tenKhoa}</td>
                                <td>{row.loaiNganhNghe}</td>
                                <td>{row.moTa}</td>
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