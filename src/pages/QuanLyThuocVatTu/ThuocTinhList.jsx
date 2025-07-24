import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maThuocTinh: 'TT001', tenThuocTinh: 'Hoạt chất', moTaThuocTinh: 'Thành phần chính', maGiaTri: 'GT001', tenGiaTri: 'Paracetamol', moTaGiaTri: 'Giảm đau, hạ sốt', trangThai: 'Đang sử dụng' },
    { id: 2, maThuocTinh: 'TT002', tenThuocTinh: 'Dạng bào chế', moTaThuocTinh: 'Dạng viên', maGiaTri: 'GT002', tenGiaTri: 'Viên nén', moTaGiaTri: 'Dễ sử dụng', trangThai: 'Đang sử dụng' },
    // ... thêm dữ liệu mẫu
];

export default function ThuocTinhList() {
    const [filter, setFilter] = useState({ maThuocTinh: '', tenThuocTinh: '', tenGiaTri: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maThuocTinh || d.maThuocTinh.toLowerCase().includes(filter.maThuocTinh.toLowerCase())) &&
        (!filter.tenThuocTinh || d.tenThuocTinh.toLowerCase().includes(filter.tenThuocTinh.toLowerCase())) &&
        (!filter.tenGiaTri || d.tenGiaTri.toLowerCase().includes(filter.tenGiaTri.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã thuộc tính" value={filter.maThuocTinh} onChange={e => setFilter(f => ({ ...f, maThuocTinh: e.target.value }))} />
                    <input placeholder="Tìm tên thuộc tính" value={filter.tenThuocTinh} onChange={e => setFilter(f => ({ ...f, tenThuocTinh: e.target.value }))} />
                    <input placeholder="Tìm tên giá trị" value={filter.tenGiaTri} onChange={e => setFilter(f => ({ ...f, tenGiaTri: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã thuộc tính</th>
                        <th>Tên thuộc tính</th>
                        <th>Mô tả thuộc tính</th>
                        <th>Mã giá trị</th>
                        <th>Tên giá trị</th>
                        <th>Mô tả giá trị</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 ? (
                        <tr><td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maThuocTinh}</td>
                            <td>{row.tenThuocTinh}</td>
                            <td>{row.moTaThuocTinh}</td>
                            <td>{row.maGiaTri}</td>
                            <td>{row.tenGiaTri}</td>
                            <td>{row.moTaGiaTri}</td>
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