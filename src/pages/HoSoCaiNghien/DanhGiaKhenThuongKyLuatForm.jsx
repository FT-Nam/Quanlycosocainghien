import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function DanhGiaKhenThuongKyLuatForm() {
    const { register, control } = useFormContext();
    const { fields: dgFields, append: dgAppend, remove: dgRemove } = useFieldArray({ name: 'danhGia.dinhKy', control });
    const { fields: ktFields, append: ktAppend, remove: ktRemove } = useFieldArray({ name: 'danhGia.khenThuong', control });
    const { fields: klFields, append: klAppend, remove: klRemove } = useFieldArray({ name: 'danhGia.kyLuat', control });
    return (
        <div>
            <div>
                <label>Đánh giá định kỳ</label>
                <button type="button" onClick={() => dgAppend({})}>+ Thêm đánh giá</button>
                {dgFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Loại" {...register(`danhGia.dinhKy.${idx}.loai`)} style={{ width: 80 }} />
                        <input placeholder="Thời gian" {...register(`danhGia.dinhKy.${idx}.thoiGian`)} style={{ width: 120 }} />
                        <input placeholder="Tổng điểm" {...register(`danhGia.dinhKy.${idx}.tongDiem`)} style={{ width: 80 }} />
                        <input placeholder="Kết quả" {...register(`danhGia.dinhKy.${idx}.ketQua`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => dgRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
            <div>
                <label>Khen thưởng</label>
                <button type="button" onClick={() => ktAppend({})}>+ Thêm khen thưởng</button>
                {ktFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Thời gian QĐ" {...register(`danhGia.khenThuong.${idx}.thoiGianQD`)} style={{ width: 120 }} />
                        <input placeholder="Hình thức" {...register(`danhGia.khenThuong.${idx}.hinhThuc`)} style={{ width: 120 }} />
                        <input placeholder="Lý do" {...register(`danhGia.khenThuong.${idx}.lyDo`)} style={{ width: 120 }} />
                        <input placeholder="Thời gian thực hiện" {...register(`danhGia.khenThuong.${idx}.thoiGianThucHien`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => ktRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
            <div>
                <label>Kỷ luật</label>
                <button type="button" onClick={() => klAppend({})}>+ Thêm kỷ luật</button>
                {klFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Thời gian QĐ" {...register(`danhGia.kyLuat.${idx}.thoiGianQD`)} style={{ width: 120 }} />
                        <input placeholder="Hình thức" {...register(`danhGia.kyLuat.${idx}.hinhThuc`)} style={{ width: 120 }} />
                        <input placeholder="Lý do" {...register(`danhGia.kyLuat.${idx}.lyDo`)} style={{ width: 120 }} />
                        <input placeholder="Thời gian thực hiện" {...register(`danhGia.kyLuat.${idx}.thoiGianThucHien`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => klRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
} 