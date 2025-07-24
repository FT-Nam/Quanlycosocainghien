import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function ThamGapMoiQuanHeForm() {
    const { register, control } = useFormContext();
    const { fields: tgFields, append: tgAppend, remove: tgRemove } = useFieldArray({ name: 'thamGap.chiTiet', control });
    const { fields: mqFields, append: mqAppend, remove: mqRemove } = useFieldArray({ name: 'moiQuanHe.chiTiet', control });
    return (
        <div>
            <div>
                <label>Tổng số lượt thăm gặp</label>
                <input {...register('thamGap.tongSoLuot')} />
            </div>
            <div>
                <label>Tổng số người thăm</label>
                <input {...register('thamGap.tongSoNguoiTham')} />
            </div>
            <div>
                <label>Chi tiết thăm gặp</label>
                <button type="button" onClick={() => tgAppend({})}>+ Thêm lần thăm gặp</button>
                {tgFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Thời gian" {...register(`thamGap.chiTiet.${idx}.thoiGian`)} style={{ width: 120 }} />
                        <input placeholder="Tên thân nhân" {...register(`thamGap.chiTiet.${idx}.tenThanNhan`)} style={{ width: 120 }} />
                        <input placeholder="CCCD thân nhân" {...register(`thamGap.chiTiet.${idx}.cccdThanNhan`)} style={{ width: 120 }} />
                        <input placeholder="Loại thăm gặp" {...register(`thamGap.chiTiet.${idx}.loaiThamGap`)} style={{ width: 120 }} />
                        <input placeholder="Mối quan hệ" {...register(`thamGap.chiTiet.${idx}.moiQuanHe`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => tgRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
            <div>
                <label>Tổng số mối quan hệ</label>
                <input {...register('moiQuanHe.tongSo')} />
            </div>
            <div>
                <label>Chi tiết mối quan hệ</label>
                <button type="button" onClick={() => mqAppend({})}>+ Thêm mối quan hệ</button>
                {mqFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="CCCD" {...register(`moiQuanHe.chiTiet.${idx}.cccd`)} style={{ width: 120 }} />
                        <input placeholder="Loại quan hệ" {...register(`moiQuanHe.chiTiet.${idx}.loaiQuanHe`)} style={{ width: 120 }} />
                        <input placeholder="Họ tên" {...register(`moiQuanHe.chiTiet.${idx}.hoTen`)} style={{ width: 120 }} />
                        <input placeholder="Ngày sinh" {...register(`moiQuanHe.chiTiet.${idx}.ngaySinh`)} style={{ width: 120 }} />
                        <input placeholder="Giới tính" {...register(`moiQuanHe.chiTiet.${idx}.gioiTinh`)} style={{ width: 80 }} />
                        <button type="button" onClick={() => mqRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
} 