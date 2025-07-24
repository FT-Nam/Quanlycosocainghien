import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TienAnTienSuForm() {
    const { register } = useFormContext();
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: '1 1 120px' }}>
                <label>Tổng số tiền án</label>
                <input {...register('tienAn.tongSo')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Tái phạm</label>
                <input {...register('tienAn.taiPham')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Năm xử</label>
                <input {...register('tienAn.namXu')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Tòa xử</label>
                <input {...register('tienAn.toaXu')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Địa phương</label>
                <input {...register('tienAn.diaPhuong')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Tội danh</label>
                <input {...register('tienAn.toiDanh')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Mức án</label>
                <input {...register('tienAn.mucAn')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Nơi chấp hành án</label>
                <input {...register('tienAn.noiChapHanhAn')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Năm tha</label>
                <input {...register('tienAn.namTha')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Tình trạng</label>
                <input {...register('tienAn.tinhTrang')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Ghi chú tiền án</label>
                <input {...register('tienAn.ghiChu')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Số tiền sự</label>
                <input {...register('tienSu.soTienSu')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Ghi chú tiền sự</label>
                <input {...register('tienSu.ghiChu')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Thời gian</label>
                <input {...register('tienSu.thoiGian')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Số QĐ</label>
                <input {...register('tienSu.soQD')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Ngày QĐ</label>
                <input type="date" {...register('tienSu.ngayQD')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Hành vi vi phạm</label>
                <input {...register('tienSu.hanhViViPham')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Đơn vị xử lý</label>
                <input {...register('tienSu.donViXuLy')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Hình thức xử lý</label>
                <input {...register('tienSu.hinhThucXuLy')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Nơi chấp hành</label>
                <input {...register('tienSu.noiChapHanh')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Bắt đầu</label>
                <input {...register('tienSu.batDau')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Kết thúc</label>
                <input {...register('tienSu.ketThuc')} />
            </div>
        </div>
    );
} 