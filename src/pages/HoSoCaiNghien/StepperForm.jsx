import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ThongTinDanCuForm from './ThongTinDanCuForm';
import HocVanForm from './HocVanForm';
import QuaTrinhCaiNghienForm from './QuaTrinhCaiNghienForm';
import SucKhoeDieuTriForm from './SucKhoeDieuTriForm';
import GiaoDucTuVanNgheForm from './GiaoDucTuVanNgheForm';
import DanhGiaKhenThuongKyLuatForm from './DanhGiaKhenThuongKyLuatForm';
import ThamGapMoiQuanHeForm from './ThamGapMoiQuanHeForm';
import TaiHoaNhapQuanLySauCaiForm from './TaiHoaNhapQuanLySauCaiForm';
import TienAnTienSuForm from './TienAnTienSuForm';

// Các bước lớn của hồ sơ cai nghiện
const steps = [
    'Thông tin dân cư',
    'Học vấn',
    'Tiền án/Tiền sự',
    'Quá trình cai nghiện',
    'Sức khỏe/Điều trị',
    'Giáo dục/Tư vấn/Nghề',
    'Đánh giá/Khen thưởng/Kỷ luật',
    'Thăm gặp/Mối quan hệ',
    'Tái hòa nhập/Quản lý sau cai',
];

function Stepper({ steps, current, onStep }) {
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {steps.map((label, idx) => (
                <button
                    key={label}
                    onClick={() => onStep(idx)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 4,
                        border: idx === current ? '2px solid #8B0000' : '1px solid #ccc',
                        background: idx === current ? '#8B0000' : '#fff',
                        color: idx === current ? '#fff' : '#333',
                        fontWeight: idx === current ? 700 : 400,
                        cursor: 'pointer',
                        minWidth: 120,
                    }}
                >
                    {idx + 1}. {label}
                </button>
            ))}
        </div>
    );
}

const stepComponents = [
    ThongTinDanCuForm,
    HocVanForm,
    TienAnTienSuForm,
    QuaTrinhCaiNghienForm,
    SucKhoeDieuTriForm,
    GiaoDucTuVanNgheForm,
    DanhGiaKhenThuongKyLuatForm,
    ThamGapMoiQuanHeForm,
    TaiHoaNhapQuanLySauCaiForm,
];

export default function StepperForm() {
    const [current, setCurrent] = useState(0);
    const methods = useForm({
        defaultValues: {},
        mode: 'onBlur',
    });
    const StepComponent = stepComponents[current];

    const onSubmit = data => {
        alert('Dữ liệu toàn bộ hồ sơ: ' + JSON.stringify(data, null, 2));
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stepper steps={steps} current={current} onStep={setCurrent} />
                <div style={{ minHeight: 180, marginBottom: 24 }}>
                    <StepComponent />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    {current > 0 && (
                        <button type="button" onClick={() => setCurrent(current - 1)}>
                            Quay lại
                        </button>
                    )}
                    {current < steps.length - 1 ? (
                        <button type="button" onClick={() => setCurrent(current + 1)}>
                            Tiếp theo
                        </button>
                    ) : (
                        <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>
                            Lưu toàn bộ hồ sơ
                        </button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
} 