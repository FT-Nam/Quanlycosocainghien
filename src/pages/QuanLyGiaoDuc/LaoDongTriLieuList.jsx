import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maDot: 'LD001', tenDot: 'Lao động mùa hè', diaDiem: 'Xưởng A', loaiNganhNghe: 'Cơ khí', thoiGianBatDau: '2023-06-01', thoiGianKetThuc: '2023-06-30', soLuong: 20, phuTrach: 'Nguyễn Văn B' },
    { id: '2', maDot: 'LD002', tenDot: 'Lao động mùa đông', diaDiem: 'Xưởng B', loaiNganhNghe: 'Điện tử', thoiGianBatDau: '2023-12-01', thoiGianKetThuc: '2023-12-31', soLuong: 15, phuTrach: 'Trần Thị C' },
];

export default function LaoDongTriLieuList() {
    const [filter, setFilter] = useState({ maDot: '', tenDot: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maDot || row.maDot.toLowerCase().includes(filter.maDot.toLowerCase())) &&
        (!filter.tenDot || row.tenDot.toLowerCase().includes(filter.tenDot.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã đợt" value={filter.maDot} onChange={e => setFilter(f => ({ ...f, maDot: e.target.value }))} />
                    <input placeholder="Tìm tên đợt" value={filter.tenDot} onChange={e => setFilter(f => ({ ...f, tenDot: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đợt</th>
                        <th>Tên đợt</th>
                        <th>Địa điểm</th>
                        <th>Loại ngành nghề</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Số lượng</th>
                        <th>Phụ trách</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={10} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : (
                        data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                            <tr key={row.id}>
                                <td>{(page - 1) * pageSize + idx + 1}</td>
                                <td>{row.maDot}</td>
                                <td>{row.tenDot}</td>
                                <td>{row.diaDiem}</td>
                                <td>{row.loaiNganhNghe}</td>
                                <td>{row.thoiGianBatDau}</td>
                                <td>{row.thoiGianKetThuc}</td>
                                <td>{row.soLuong}</td>
                                <td>{row.phuTrach}</td>
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