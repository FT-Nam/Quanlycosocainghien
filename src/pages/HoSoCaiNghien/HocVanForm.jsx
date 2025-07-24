import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function HocVanForm() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: '1 1 220px' }}>
                <label>Trình độ đào tạo</label>
                <input {...register('hocVan.trinhDoDaoTao')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Nghề nghiệp</label>
                <input {...register('hocVan.ngheNghiep')} />
            </div>
            <div style={{ flex: '1 1 320px' }}>
                <label>Nơi làm việc/học tập</label>
                <input {...register('hocVan.noiLamViec')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Văn bằng, chứng chỉ</label>
                <input {...register('hocVan.vanBang')} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
                <label>Trình trạng chuyên môn cao nhất</label>
                <input {...register('hocVan.chuyenMonCaoNhat')} />
            </div>
        </div>
    );
} 