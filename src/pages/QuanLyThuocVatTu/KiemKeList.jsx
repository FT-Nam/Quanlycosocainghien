import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maSanPham: 'SP001', tenSanPham: 'Thuốc giảm đau', thoiGianKiemKe: '2024-07-01', slTonThucTe: 95, slChenhLech: -5, lyDo: 'Hao hụt', giaTriChenhLech: '-500000', nguoiThucHien: 'Nguyễn Văn Nam' },
    { id: 2, maSanPham: 'SP002', tenSanPham: 'Băng gạc', thoiGianKiemKe: '2024-07-02', slTonThucTe: 50, slChenhLech: 0, lyDo: '', giaTriChenhLech: '0', nguoiThucHien: 'Trần Thị Hồng' },
    // ... thêm dữ liệu mẫu
];

export default function KiemKeList() {
    const [filter, setFilter] = useState({ maSanPham: '', tenSanPham: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maSanPham || d.maSanPham.toLowerCase().includes(filter.maSanPham.toLowerCase())) &&
        (!filter.tenSanPham || d.tenSanPham.toLowerCase().includes(filter.tenSanPham.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã sản phẩm" value={filter.maSanPham} onChange={e => setFilter(f => ({ ...f, maSanPham: e.target.value }))} />
                    <input placeholder="Tìm tên sản phẩm" value={filter.tenSanPham} onChange={e => setFilter(f => ({ ...f, tenSanPham: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thời gian kiểm kê</th>
                        <th>SL tồn thực tế</th>
                        <th>SL chênh lệch</th>
                        <th>Lý do</th>
                        <th>Giá trị chênh lệch</th>
                        <th>Người thực hiện</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={10} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maSanPham}</td>
                            <td>{row.tenSanPham}</td>
                            <td>{row.thoiGianKiemKe}</td>
                            <td>{row.slTonThucTe}</td>
                            <td>{row.slChenhLech}</td>
                            <td>{row.lyDo}</td>
                            <td>{row.giaTriChenhLech}</td>
                            <td>{row.nguoiThucHien}</td>
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