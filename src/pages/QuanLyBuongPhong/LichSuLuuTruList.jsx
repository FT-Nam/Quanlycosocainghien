import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', tenHocVien: 'Nguyễn Văn A', maHocVien: 'HV01', vaoPhong: '2024-06-01', raPhong: '2024-07-01', ghiChu: 'Chuyển phòng' },
    { id: '2', tenHocVien: 'Trần Thị B', maHocVien: 'HV02', vaoPhong: '2024-06-15', raPhong: '', ghiChu: '' },
];

export default function LichSuLuuTruList() {
    const [filter, setFilter] = useState({ tenHocVien: '', maHocVien: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.tenHocVien || row.tenHocVien.toLowerCase().includes(filter.tenHocVien.toLowerCase())) &&
        (!filter.maHocVien || row.maHocVien.toLowerCase().includes(filter.maHocVien.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm tên học viên" value={filter.tenHocVien} onChange={e => setFilter(f => ({ ...f, tenHocVien: e.target.value }))} />
                    <input placeholder="Tìm mã học viên" value={filter.maHocVien} onChange={e => setFilter(f => ({ ...f, maHocVien: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên học viên</th>
                        <th>Mã học viên</th>
                        <th>Thời gian vào phòng</th>
                        <th>Thời gian ra phòng</th>
                        <th>Ghi chú</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : (
                        data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                            <tr key={row.id}>
                                <td>{(page - 1) * pageSize + idx + 1}</td>
                                <td>{row.tenHocVien}</td>
                                <td>{row.maHocVien}</td>
                                <td>{row.vaoPhong}</td>
                                <td>{row.raPhong}</td>
                                <td>{row.ghiChu}</td>
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