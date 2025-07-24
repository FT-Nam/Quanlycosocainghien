// Mock data cho lao động trị liệu
export const congViecList = [
  { id: 'CV1', ten: 'Làm vườn', khuVuc: 'Khu A', gioLam: '07:00-09:00', canBo: 'Nguyễn Văn Q' },
  { id: 'CV2', ten: 'Chăn nuôi', khuVuc: 'Khu B', gioLam: '09:30-11:00', canBo: 'Trần Thị R' },
];

export const nhomList = [
  { id: 'N1', ten: 'Nhóm 1', hocVien: ['Ngô Văn C', 'Lê Thị E'] },
  { id: 'N2', ten: 'Nhóm 2', hocVien: ['Phạm Thị D', 'Trần Văn F'] },
];

export const phanCongList = [
  { id: 'PC1', ngay: '2024-06-10', congViecId: 'CV1', nhomId: 'N1' },
  { id: 'PC2', ngay: '2024-06-10', congViecId: 'CV2', nhomId: 'N2' },
];

export const ghiNhanList = [
  { id: 'GN1', phanCongId: 'PC1', hocVien: 'Ngô Văn C', gioLam: 2, chatLuong: 'Tốt', thaiDo: 'Tích cực' },
  { id: 'GN2', phanCongId: 'PC1', hocVien: 'Lê Thị E', gioLam: 2, chatLuong: 'Khá', thaiDo: 'Bình thường' },
  { id: 'GN3', phanCongId: 'PC2', hocVien: 'Phạm Thị D', gioLam: 1.5, chatLuong: 'Tốt', thaiDo: 'Tích cực' },
  { id: 'GN4', phanCongId: 'PC2', hocVien: 'Trần Văn F', gioLam: 1.5, chatLuong: 'Trung bình', thaiDo: 'Thiếu tập trung' },
];

export const baoCaoTienBo = [
  { hocVien: 'Ngô Văn C', soNgayCong: 20, nhanXet: 'Tiến bộ rõ rệt' },
  { hocVien: 'Lê Thị E', soNgayCong: 18, nhanXet: 'Cần cố gắng hơn' },
  { hocVien: 'Phạm Thị D', soNgayCong: 19, nhanXet: 'Tích cực' },
  { hocVien: 'Trần Văn F', soNgayCong: 15, nhanXet: 'Chưa ổn định' },
];

export const laoDongService = {
  getCongViec: () => Promise.resolve(congViecList),
  getNhom: () => Promise.resolve(nhomList),
  getPhanCong: () => Promise.resolve(phanCongList),
  getGhiNhan: () => Promise.resolve(ghiNhanList),
  getBaoCao: () => Promise.resolve(baoCaoTienBo),
}; 