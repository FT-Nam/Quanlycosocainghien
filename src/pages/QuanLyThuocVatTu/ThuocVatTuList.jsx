import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maSanPham: 'SP001', sku: 'SKU001', loaiSanPham: 'Thuốc', donViTinh: 'Hộp', nhaCungCap: 'Công ty Dược A', moTa: 'Thuốc giảm đau', giaNhap: '100000' },
    { id: 2, maSanPham: 'SP002', sku: 'SKU002', loaiSanPham: 'Vật tư', donViTinh: 'Cái', nhaCungCap: 'Công ty VTYT B', moTa: 'Băng gạc', giaNhap: '5000' },
    // ... thêm dữ liệu mẫu
];

export default function ThuocVatTuList() {
    const [filter, setFilter] = useState({ maSanPham: '', sku: '', loaiSanPham: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maSanPham || d.maSanPham.toLowerCase().includes(filter.maSanPham.toLowerCase())) &&
        (!filter.sku || d.sku.toLowerCase().includes(filter.sku.toLowerCase())) &&
        (!filter.loaiSanPham || d.loaiSanPham.toLowerCase().includes(filter.loaiSanPham.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã sản phẩm" value={filter.maSanPham} onChange={e => setFilter(f => ({ ...f, maSanPham: e.target.value }))} />
                    <input placeholder="Tìm SKU" value={filter.sku} onChange={e => setFilter(f => ({ ...f, sku: e.target.value }))} />
                    <input placeholder="Tìm loại sản phẩm" value={filter.loaiSanPham} onChange={e => setFilter(f => ({ ...f, loaiSanPham: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>SKU</th>
                        <th>Loại sản phẩm</th>
                        <th>Đơn vị tính</th>
                        <th>Nhà cung cấp</th>
                        <th>Mô tả</th>
                        <th>Giá nhập</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maSanPham}</td>
                            <td>{row.sku}</td>
                            <td>{row.loaiSanPham}</td>
                            <td>{row.donViTinh}</td>
                            <td>{row.nhaCungCap}</td>
                            <td>{row.moTa}</td>
                            <td>{row.giaNhap}</td>
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