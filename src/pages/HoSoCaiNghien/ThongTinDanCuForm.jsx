import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ThongTinDanCuForm() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: '1 1 320px' }}>
                <label>Số CCCD *</label>
                <input {...register('danCu.cccd', { required: 'Bắt buộc', pattern: { value: /^\d{12}$/, message: 'CCCD phải đủ 12 số' } })} />
                {errors?.danCu?.cccd && <div className="form-err">{errors.danCu.cccd.message}</div>}
            </div>
            <div style={{ flex: '1 1 320px' }}>
                <label>Họ, chữ đệm và tên khai sinh *</label>
                <input {...register('danCu.hoTen', { required: 'Bắt buộc' })} />
                {errors?.danCu?.hoTen && <div className="form-err">{errors.danCu.hoTen.message}</div>}
            </div>
            <div style={{ flex: '1 1 200px' }}>
                <label>Ngày sinh *</label>
                <input type="date" {...register('danCu.ngaySinh', { required: 'Bắt buộc' })} />
                {errors?.danCu?.ngaySinh && <div className="form-err">{errors.danCu.ngaySinh.message}</div>}
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Giới tính *</label>
                <select {...register('danCu.gioiTinh', { required: 'Bắt buộc' })}>
                    <option value="">Chọn</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors?.danCu?.gioiTinh && <div className="form-err">{errors.danCu.gioiTinh.message}</div>}
            </div>
            <div style={{ flex: '1 1 320px' }}>
                <label>Nơi sinh</label>
                <input {...register('danCu.noiSinh')} />
            </div>
            <div style={{ flex: '1 1 320px' }}>
                <label>Quê quán</label>
                <input {...register('danCu.queQuan')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Dân tộc</label>
                <input {...register('danCu.danToc')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Tôn giáo</label>
                <input {...register('danCu.tonGiao')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Quốc tịch</label>
                <input {...register('danCu.quocTich')} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
                <label>Nhóm máu</label>
                <input {...register('danCu.nhomMau')} />
            </div>
            <div style={{ flex: '1 1 320px' }}>
                <label>Nơi ở hiện tại</label>
                <input {...register('danCu.noiOHienTai')} />
            </div>
            <div style={{ flex: '1 1 180px' }}>
                <label>Tình trạng hôn nhân</label>
                <input {...register('danCu.honNhan')} />
            </div>
        </div>
    );
} 