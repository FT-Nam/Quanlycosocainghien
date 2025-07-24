// Mock data cho quản lý thăm gặp
export const thamGapList = [
  {
    id: 'TG001',
    hocVienId: 'HV001',
    tenHocVien: 'Nguyễn Văn A',
    nguoiThan: { ten: 'Trần Thị B', quanHe: 'Mẹ', cccd: '012345678888' },
    hinhThuc: 'Trực tiếp',
    thoiGian: '2024-06-20T09:00',
    phongGap: 'Phòng 1',
    canBo: 'Nguyễn Văn Q',
    trangThai: 'Chờ duyệt',
    ketQua: '',
    viPham: false,
  },
  {
    id: 'TG002',
    hocVienId: 'HV002',
    tenHocVien: 'Lê Văn B',
    nguoiThan: { ten: 'Ngô Văn C', quanHe: 'Anh', cccd: '012345678899' },
    hinhThuc: 'Gửi đồ',
    thoiGian: '2024-06-21T14:00',
    phongGap: 'Phòng 2',
    canBo: 'Trần Thị R',
    trangThai: 'Đã duyệt',
    ketQua: 'Không vi phạm',
    viPham: false,
  },
  {
    id: 'TG003',
    hocVienId: 'HV001',
    tenHocVien: 'Nguyễn Văn A',
    nguoiThan: { ten: 'Nguyễn Văn D', quanHe: 'Bố', cccd: '012345678877' },
    hinhThuc: 'Trực tiếp',
    thoiGian: '2024-06-22T10:00',
    phongGap: 'Phòng 1',
    canBo: 'Nguyễn Văn Q',
    trangThai: 'Đã thăm',
    ketQua: 'Có vi phạm',
    viPham: true,
  }
];

export const thamGapService = {
  getAll: () => Promise.resolve(thamGapList),
  getById: (id) => Promise.resolve(thamGapList.find(tg => tg.id === id)),
  add: (data) => {
    thamGapList.push({ ...data, id: 'TG' + (thamGapList.length + 1).toString().padStart(3, '0') });
    return Promise.resolve();
  },
  update: (id, data) => {
    const idx = thamGapList.findIndex(tg => tg.id === id);
    if (idx !== -1) thamGapList[idx] = { ...thamGapList[idx], ...data };
    return Promise.resolve();
  },
  delete: (id) => {
    const idx = thamGapList.findIndex(tg => tg.id === id);
    if (idx !== -1) thamGapList.splice(idx, 1);
    return Promise.resolve();
  },
  filterByTime: (from, to) => {
    return Promise.resolve(
      thamGapList.filter(tg => {
        const t = new Date(tg.thoiGian);
        return t >= new Date(from) && t <= new Date(to);
      })
    );
  }
}; 