import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maTaiSan: 'TS01', tenTaiSan: 'Máy tính xách tay', nhaCungCap: 'FPT', trangThai: 'Đang sử dụng', donViTinh: 'Cái', soLuong: 10 },
    { id: '2', maTaiSan: 'TS02', tenTaiSan: 'Máy in', nhaCungCap: 'Canon', trangThai: 'Bảo trì', donViTinh: 'Cái', soLuong: 3 },
];

export default function TaiSanList() {
    const [filter, setFilter] = useState({ maTaiSan: '', tenTaiSan: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maTaiSan || row.maTaiSan.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
        (!filter.tenTaiSan || row.tenTaiSan.toLowerCase().includes(filter.tenTaiSan.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input placeholder="Tìm tên tài sản" value={filter.tenTaiSan} onChange={e => setFilter(f => ({ ...f, tenTaiSan: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã tài sản</th>
                        <th>Tên tài sản</th>
                        <th>Nhà cung cấp</th>
                        <th>Trạng thái</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
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
                                <td>{row.maTaiSan}</td>
                                <td>{row.tenTaiSan}</td>
                                <td>{row.nhaCungCap}</td>
                                <td>{row.trangThai}</td>
                                <td>{row.donViTinh}</td>
                                <td>{row.soLuong}</td>
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