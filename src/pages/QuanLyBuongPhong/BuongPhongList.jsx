import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maPhong: 'P101', tenPhong: 'Phòng 101', loaiPhong: 'Ngủ', soLuong: 10, sucChua: 12, tinhTrang: 'Đang sử dụng', phuTrach: 'Nguyễn Văn A', soLuongHocVien: 10 },
    { id: '2', maPhong: 'P201', tenPhong: 'Phòng 201', loaiPhong: 'Học', soLuong: 8, sucChua: 10, tinhTrang: 'Trống', phuTrach: 'Trần Thị B', soLuongHocVien: 0 },
];

export default function BuongPhongList() {
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
                        <th>Loại phòng</th>
                        <th>Số lượng</th>
                        <th>Sức chứa</th>
                        <th>Tình trạng</th>
                        <th>Phụ trách</th>
                        <th>SL học viên đang sử dụng</th>
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
                                <td>{row.maPhong}</td>
                                <td>{row.tenPhong}</td>
                                <td>{row.loaiPhong}</td>
                                <td>{row.soLuong}</td>
                                <td>{row.sucChua}</td>
                                <td>{row.tinhTrang}</td>
                                <td>{row.phuTrach}</td>
                                <td>{row.soLuongHocVien}</td>
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