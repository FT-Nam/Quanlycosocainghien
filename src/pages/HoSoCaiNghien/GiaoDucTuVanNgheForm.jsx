import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function GiaoDucTuVanNgheForm() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ name: 'giaoDuc.chuongTrinh', control });
    return (
        <div>
            <div>
                <label>Số chương trình giáo dục đã đào tạo</label>
                <input {...register('giaoDuc.soChuongTrinhGiaoDuc')} />
            </div>
            <div>
                <label>Số chương trình tư vấn đã tham gia</label>
                <input {...register('giaoDuc.soChuongTrinhTuVan')} />
            </div>
            <div>
                <label>Chương trình chi tiết</label>
                <button type="button" onClick={() => append({})}>+ Thêm chương trình</button>
                {fields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Tên chương trình" {...register(`giaoDuc.chuongTrinh.${idx}.ten`)} style={{ width: 180 }} />
                        <input type="date" placeholder="Bắt đầu" {...register(`giaoDuc.chuongTrinh.${idx}.batDau`)} style={{ width: 120 }} />
                        <input type="date" placeholder="Kết thúc" {...register(`giaoDuc.chuongTrinh.${idx}.ketThuc`)} style={{ width: 120 }} />
                        <input placeholder="Điểm TB" {...register(`giaoDuc.chuongTrinh.${idx}.diemTB`)} style={{ width: 80 }} />
                        <input placeholder="Xếp loại" {...register(`giaoDuc.chuongTrinh.${idx}.xepLoai`)} style={{ width: 80 }} />
                        <input placeholder="Giáo viên" {...register(`giaoDuc.chuongTrinh.${idx}.giaoVien`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => remove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
} 