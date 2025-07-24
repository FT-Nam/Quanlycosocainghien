import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function SucKhoeDieuTriForm() {
    const { register, control } = useFormContext();
    const { fields: xnFields, append: xnAppend, remove: xnRemove } = useFieldArray({ name: 'sucKhoe.xetNghiem', control });
    const { fields: thuocFields, append: thuocAppend, remove: thuocRemove } = useFieldArray({ name: 'sucKhoe.thuoc', control });
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <label>Tiền sử bệnh lý</label>
                <input {...register('sucKhoe.tienSuBenhLy')} />
            </div>
            <div>
                <label>Tình trạng sức khỏe hiện tại</label>
                <input {...register('sucKhoe.tinhTrangHienTai')} />
            </div>
            <div>
                <label>Thông tin sử dụng ma túy</label>
                <input {...register('sucKhoe.suDungMaTuy')} />
            </div>
            <div>
                <label>Xét nghiệm tình trạng nghiện</label>
                <button type="button" onClick={() => xnAppend({})}>+ Thêm lần xét nghiệm</button>
                {xnFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Lần" {...register(`sucKhoe.xetNghiem.${idx}.lan`)} style={{ width: 60 }} />
                        <input type="date" placeholder="Thời gian" {...register(`sucKhoe.xetNghiem.${idx}.thoiGian`)} style={{ width: 140 }} />
                        <input placeholder="Kết quả" {...register(`sucKhoe.xetNghiem.${idx}.ketQua`)} style={{ width: 120 }} />
                        <button type="button" onClick={() => xnRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
            <div>
                <label>Chẩn đoán & hướng điều trị</label>
                <input {...register('sucKhoe.chanDoan')} />
            </div>
            <div>
                <label>Thuốc sử dụng</label>
                <button type="button" onClick={() => thuocAppend({})}>+ Thêm thuốc</button>
                {thuocFields.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input placeholder="Tên thuốc" {...register(`sucKhoe.thuoc.${idx}.ten`)} style={{ width: 120 }} />
                        <input placeholder="Số lượng" {...register(`sucKhoe.thuoc.${idx}.soLuong`)} style={{ width: 80 }} />
                        <button type="button" onClick={() => thuocRemove(idx)} style={{ color: 'red' }}>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
} 