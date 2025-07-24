import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function QuaTrinhCaiNghienForm() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ name: 'quaTrinhCaiNghien', control });
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <button type="button" onClick={() => append({})}>+ Thêm lần cai nghiện</button>
            </div>
            {fields.map((item, idx) => (
                <div key={item.id} style={{ border: '1px solid #eee', borderRadius: 6, padding: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Loại cai nghiện</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.loaiCaiNghien`)} />
                        </div>
                        <div style={{ flex: '1 1 180px' }}>
                            <label>Cơ sở cai nghiện</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.coSo`)} />
                        </div>
                        <div style={{ flex: '1 1 60px' }}>
                            <label>Tổ</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.to`)} />
                        </div>
                        <div style={{ flex: '1 1 60px' }}>
                            <label>Đội</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.doi`)} />
                        </div>
                        <div style={{ flex: '1 1 80px' }}>
                            <label>Buồng</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.buong`)} />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Phương pháp</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.phuongPhap`)} />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Thời gian bắt đầu</label>
                            <input type="date" {...register(`quaTrinhCaiNghien.${idx}.thoiGianBatDau`)} />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Thời gian kết thúc</label>
                            <input type="date" {...register(`quaTrinhCaiNghien.${idx}.thoiGianKetThuc`)} />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Xếp loại</label>
                            <input {...register(`quaTrinhCaiNghien.${idx}.xepLoai`)} />
                        </div>
                        <div style={{ flex: '1 1 60px', alignSelf: 'flex-end' }}>
                            <button type="button" onClick={() => remove(idx)} style={{ color: 'red' }}>Xóa</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 