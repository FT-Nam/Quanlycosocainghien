import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maCanBo: 'CB01', tenCanBo: 'Phan Thành Nam', cccd: '012345678901', ngaySinh: '1980-01-01', gioiTinh: 'Nam', queQuan: 'Hà Nội', danToc: 'Kinh', tonGiao: 'Không', quocTich: 'Việt Nam', noiOHienTai: 'Hà Nội', phongBan: 'Phòng Hành chính', hocVi: 'Thạc sĩ', hocHam: '', capBac: 'Chuyên viên', chucVu: 'Trưởng phòng', chucDanh: '', trangThai: 'Đang làm', batDau: '2010-01-01', ketThuc: '' },
    { id: '2', maCanBo: 'CB02', tenCanBo: 'Nguyễn Văn Hiệp', cccd: '012345678902', ngaySinh: '1985-05-10', gioiTinh: 'Nữ', queQuan: 'Nam Định', danToc: 'Kinh', tonGiao: 'Không', quocTich: 'Việt Nam', noiOHienTai: 'Nam Định', phongBan: 'Phòng Kế toán', hocVi: 'Cử nhân', hocHam: '', capBac: 'Nhân viên', chucVu: 'Kế toán viên', chucDanh: '', trangThai: 'Đang làm', batDau: '2015-03-01', ketThuc: '' },
];

export default function CanBoList() {
    const [filter, setFilter] = useState({ maCanBo: '', tenCanBo: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maCanBo || row.maCanBo.toLowerCase().includes(filter.maCanBo.toLowerCase())) &&
        (!filter.tenCanBo || row.tenCanBo.toLowerCase().includes(filter.tenCanBo.toLowerCase()))
    );
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã cán bộ" value={filter.maCanBo} onChange={e => setFilter(f => ({ ...f, maCanBo: e.target.value }))} />
                    <input placeholder="Tìm tên cán bộ" value={filter.tenCanBo} onChange={e => setFilter(f => ({ ...f, tenCanBo: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className="table-hocvien">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã cán bộ</th>
                            <th>Tên cán bộ</th>
                            <th>Phòng ban</th>
                            <th>Chức vụ</th>
                            <th>Trạng thái</th>
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
                                    <td>{row.maCanBo}</td>
                                    <td>{row.tenCanBo}</td>
                                    <td>{row.phongBan}</td>
                                    <td>{row.chucVu}</td>
                                    <td>{row.trangThai}</td>
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
            </div>
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