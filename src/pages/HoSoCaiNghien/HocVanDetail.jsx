import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const initData = {
    trinhDoDaoTao: '', ngheNghiep: '', noiLamViec: '', vanBang: '', chuyenMonCaoNhat: ''
};

export default function HocVanDetail({ mode }) {
    const { id } = useParams();
    const nav = useNavigate();
    const loc = useLocation();
    const isNew = mode === 'add' || loc.pathname.endsWith('/new');
    const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
    const isView = !isNew && !isEdit;
    const [data, setData] = useState(initData);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (!isNew && id) {
            // TODO: fetch data by id
            setData({
                trinhDoDaoTao: 'Đại học', ngheNghiep: 'Kỹ sư', noiLamViec: 'Công ty ABC', vanBang: 'Bằng kỹ sư', chuyenMonCaoNhat: 'Kỹ sư CNTT'
            });
        } else {
            setData(initData);
        }
        setErr('');
    }, [id, isNew]);

    const handleChange = e => {
        const { name, value } = e.target;
        setData(d => ({ ...d, [name]: value }));
        setErr('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!data.trinhDoDaoTao || !data.ngheNghiep) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };

    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm học vấn' : isEdit ? 'Chỉnh sửa học vấn' : 'Xem chi tiết học vấn'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Trình độ đào tạo *</label>
                        <input name="trinhDoDaoTao" value={data.trinhDoDaoTao} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nghề nghiệp *</label>
                        <input name="ngheNghiep" value={data.ngheNghiep} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Nơi làm việc/học tập</label>
                        <input name="noiLamViec" value={data.noiLamViec} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Văn bằng, chứng chỉ</label>
                        <input name="vanBang" value={data.vanBang} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trình trạng chuyên môn cao nhất</label>
                        <input name="chuyenMonCaoNhat" value={data.chuyenMonCaoNhat} onChange={handleChange} disabled={isView} />
                    </div>
                </div>
                {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
                <div className="form-footer">
                    <button type="button" onClick={() => nav(-1)} className="form-btn back-btn">Quay lại</button>
                    {!isView && <button type="submit" className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
                </div>
            </form>
        </div>
    );
} 