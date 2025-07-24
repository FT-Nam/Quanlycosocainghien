import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TaiHoaNhapQuanLySauCaiForm() {
    const { register } = useFormContext();
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: '1 1 180px' }}>
                <label>Thời gian đánh giá kết quả cai nghiện</label>
                <input type="date" {...register('taiHoaNhap.thoiGianDanhGia')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Kết quả đánh giá y tế</label>
                <input {...register('taiHoaNhap.ketQuaYTe')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Kết quả đánh giá phục hồi</label>
                <input {...register('taiHoaNhap.ketQuaPhucHoi')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Kết quả đánh giá giáo dục</label>
                <input {...register('taiHoaNhap.ketQuaGiaoDuc')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Kết quả đánh giá lao động trị liệu, học nghề</label>
                <input {...register('taiHoaNhap.ketQuaLaoDong')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Kết quả đánh giá chuẩn bị tái hòa nhập</label>
                <input {...register('taiHoaNhap.ketQuaChuanBi')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Loại xác nhận</label>
                <input {...register('taiHoaNhap.loaiXacNhan')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Số xác nhận/chứng nhận hoàn thành</label>
                <input {...register('taiHoaNhap.soXacNhan')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Thời gian cấp</label>
                <input type="date" {...register('taiHoaNhap.thoiGianCap')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Tổ chức quản lý</label>
                <input {...register('taiHoaNhap.toChucQuanLy')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Thời gian đề xuất quản lý sau cai</label>
                <input type="date" {...register('taiHoaNhap.thoiGianDeXuat')} />
            </div>
        </div>
    );
} 