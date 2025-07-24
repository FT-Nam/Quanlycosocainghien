// Mock data cho giáo dục, tư vấn (theo lớp)
export const lopList = [
  { id: 'L1', ten: 'Lớp 1', hocVien: ['Ngô Văn C', 'Lê Thị E'] },
  { id: 'L2', ten: 'Lớp 2', hocVien: ['Phạm Thị D', 'Trần Văn F'] },
];

export const lichHocList = [
  { id: 'LH1', lopId: 'L1', thoiGian: '2024-06-03T08:00', mon: 'Giáo dục công dân', giangVien: 'Nguyễn Văn A', type: 'Tuần', value: 'Tuần 1' },
  { id: 'LH2', lopId: 'L2', thoiGian: '2024-06-05T14:00', mon: 'Tư vấn tâm lý', giangVien: 'Trần Thị B', type: 'Tháng', value: 'Tháng 5' },
];

export const diemDanhList = [
  { id: 'DD1', lichHocId: 'LH1', lopId: 'L1', hocVien: 'Ngô Văn C', diemDanh: true, ketQua: 'Đạt', nhanXet: 'Chăm chỉ', ngay: '2024-06-03' },
  { id: 'DD2', lichHocId: 'LH1', lopId: 'L1', hocVien: 'Lê Thị E', diemDanh: false, ketQua: 'Chưa đạt', nhanXet: 'Vắng', ngay: '2024-06-03' },
  { id: 'DD3', lichHocId: 'LH2', lopId: 'L2', hocVien: 'Phạm Thị D', diemDanh: true, ketQua: 'Đạt', nhanXet: 'Tốt', ngay: '2024-06-05' },
  { id: 'DD4', lichHocId: 'LH2', lopId: 'L2', hocVien: 'Trần Văn F', diemDanh: false, ketQua: 'Chưa đạt', nhanXet: 'Thiếu tập trung', ngay: '2024-06-05' },
];

export const danhGiaBuoiHocList = [
  { id: 'DG1', lichHocId: 'LH1', lopId: 'L1', hocVien: 'Ngô Văn C', diem: 8.5, nhanXet: 'Tiến bộ tốt', ngay: '2024-06-03' },
  { id: 'DG2', lichHocId: 'LH1', lopId: 'L1', hocVien: 'Lê Thị E', diem: 7.0, nhanXet: 'Cần cố gắng', ngay: '2024-06-03' },
  { id: 'DG3', lichHocId: 'LH2', lopId: 'L2', hocVien: 'Phạm Thị D', diem: 8.0, nhanXet: 'Tốt', ngay: '2024-06-05' },
  { id: 'DG4', lichHocId: 'LH2', lopId: 'L2', hocVien: 'Trần Văn F', diem: 6.5, nhanXet: 'Cần hỗ trợ', ngay: '2024-06-05' },
];

export const tuVanTamLyList = [
  { id: 'TV1', lichHocId: 'LH2', lopId: 'L2', ngay: '2024-06-05', giangVien: 'Trần Thị B', noiDung: 'Giải tỏa tâm lý, động viên', hocVien: 'Phạm Thị D' },
];

export const danhGiaCanBoList = [
  { id: 'CB1', lichHocId: 'LH2', lopId: 'L2', ngay: '2024-06-05', canBo: 'Trần Thị B', hocVien: 'Phạm Thị D', danhGia: 'Tốt', nhanXet: 'Tiếp thu nhanh' },
];

export const thongKeHocVien = [
  { hocVien: 'Ngô Văn C', lop: 'Lớp 1', soBuoi: 8, diemTB: 8.1 },
  { hocVien: 'Lê Thị E', lop: 'Lớp 1', soBuoi: 8, diemTB: 7.5 },
  { hocVien: 'Phạm Thị D', lop: 'Lớp 2', soBuoi: 7, diemTB: 7.3 },
  { hocVien: 'Trần Văn F', lop: 'Lớp 2', soBuoi: 7, diemTB: 6.8 },
];

export const giaoDucService = {
  getLop: () => Promise.resolve(lopList),
  getLichHoc: () => Promise.resolve(lichHocList),
  getDiemDanh: () => Promise.resolve(diemDanhList),
  getDanhGiaBuoiHoc: () => Promise.resolve(danhGiaBuoiHocList),
  getTuVanTamLy: () => Promise.resolve(tuVanTamLyList),
  getDanhGiaCanBo: () => Promise.resolve(danhGiaCanBoList),
  getThongKe: () => Promise.resolve(thongKeHocVien),
}; 