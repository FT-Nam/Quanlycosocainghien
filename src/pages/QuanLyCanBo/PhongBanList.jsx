import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maPhong: 'PB01', tenPhong: 'Phòng Hành chính', trangThai: 'Hoạt động', phuTrach: 'Nguyễn Văn A', soLuong: 5, danhSach: 'A, B, C, D, E' },
    { id: '2', maPhong: 'PB02', tenPhong: 'Phòng Kế toán', trangThai: 'Hoạt động', phuTrach: 'Trần Thị B', soLuong: 3, danhSach: 'F, G, H' },
];

export default function PhongBanList() {
    const [filter, setFilter] = useState({ maPhong: '', tenPhong: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maPhong || row.maPhong.toLowerCase().includes(filter.maPhong.toLowerCase())) &&
        (!filter.tenPhong || row.tenPhong.toLowerCase().includes(filter.tenPhong.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã phòng" value={filter.maPhong} onChange={e => setFilter(f => ({ ...f, maPhong: e.target.value }))} />
                    <input placeholder="Tìm tên phòng" value={filter.tenPhong} onChange={e => setFilter(f => ({ ...f, tenPhong: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã phòng</th>
                        <th>Tên phòng</th>
                        <th>Trạng thái</th>
                        <th>Phụ trách</th>
                        <th>Số lượng cán bộ</th>
                        <th>Danh sách cán bộ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={8} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : (
                        data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                            <tr key={row.id}>
                                <td>{(page - 1) * pageSize + idx + 1}</td>
                                <td>{row.maPhong}</td>
                                <td>{row.tenPhong}</td>
                                <td>{row.trangThai}</td>
                                <td>{row.phuTrach}</td>
                                <td>{row.soLuong}</td>
                                <td>{row.danhSach}</td>
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