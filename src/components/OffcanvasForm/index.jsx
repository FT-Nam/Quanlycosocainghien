import React, { useState, useEffect } from 'react';

const defaultValues = {
  hoTen: '', namSinh: '', cccd: '', diaChi: '', tinhTrangPhapLy: '', hoSoViPham: '',
  lyDoNhapTrai: '', donViDuaVao: '', ngayVao: '', dotXuLy: '',
  nguoiThan: [{ ten: '', quanHe: '', sdt: '', diaChi: '' }],
  taiPham: '', ketQuaXetNghiem: '', trangThai: ''
};

const OffcanvasForm = ({ open, onClose, title, mode = 'add', initialValues = {}, onSubmit }) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({ ...defaultValues, ...initialValues });
    setErrors({});
  }, [open, initialValues]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (name === 'cccd' && value && !/^\d{0,12}$/.test(value)) {
      setErrors(err => ({ ...err, cccd: 'CCCD phải là 12 số' }));
    } else {
      setErrors(err => ({ ...err, [name]: '' }));
    }
  };
  const handleNguoiThanChange = (idx, e) => {
    const { name, value } = e.target;
    setValues(v => ({
      ...v,
      nguoiThan: v.nguoiThan.map((nt, i) => i === idx ? { ...nt, [name]: value } : nt)
    }));
  };
  const validate = () => {
    const err = {};
    if (!values.hoTen) err.hoTen = 'Bắt buộc';
    if (!values.namSinh) err.namSinh = 'Bắt buộc';
    if (!values.cccd || !/^\d{12}$/.test(values.cccd)) err.cccd = 'CCCD phải đủ 12 số';
    if (!values.ngayVao) err.ngayVao = 'Bắt buộc';
    return err;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0 && onSubmit) {
      onSubmit(values);
    }
  };
  const isView = mode === 'view';

  if (!open) return null;
  return (
    <div className="offcanvas-form-backdrop">
      <form className="offcanvas-form" onSubmit={handleSubmit}>
        <div className="offcanvas-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="offcanvas-close" type="button">×</button>
        </div>
        <div className="offcanvas-body">
          <div className="form-group">
            <label>Họ tên *</label>
            <input name="hoTen" value={values.hoTen} onChange={handleChange} disabled={isView} />
            {errors.hoTen && <div className="form-err">{errors.hoTen}</div>}
          </div>
          <div className="form-group">
            <label>Năm sinh *</label>
            <input type="date" name="namSinh" value={values.namSinh} onChange={handleChange} disabled={isView} />
            {errors.namSinh && <div className="form-err">{errors.namSinh}</div>}
          </div>
          <div className="form-group">
            <label>CCCD *</label>
            <input name="cccd" value={values.cccd} onChange={handleChange} disabled={isView} maxLength={12} />
            {errors.cccd && <div className="form-err">{errors.cccd}</div>}
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input name="diaChi" value={values.diaChi} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Tình trạng pháp lý</label>
            <input name="tinhTrangPhapLy" value={values.tinhTrangPhapLy} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Hồ sơ vi phạm</label>
            <input name="hoSoViPham" value={values.hoSoViPham} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Lý do nhập trại</label>
            <input name="lyDoNhapTrai" value={values.lyDoNhapTrai} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Đơn vị đưa vào</label>
            <input name="donViDuaVao" value={values.donViDuaVao} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Ngày vào *</label>
            <input type="date" name="ngayVao" value={values.ngayVao} onChange={handleChange} disabled={isView} />
            {errors.ngayVao && <div className="form-err">{errors.ngayVao}</div>}
          </div>
          <div className="form-group">
            <label>Đợt xử lý</label>
            <input name="dotXuLy" value={values.dotXuLy} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Người thân</label>
            {values.nguoiThan.map((nt, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <input name="ten" placeholder="Tên" value={nt.ten} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} style={{ flex: 2 }} />
                <input name="quanHe" placeholder="Quan hệ" value={nt.quanHe} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} style={{ flex: 1 }} />
                <input name="sdt" placeholder="SĐT" value={nt.sdt} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} style={{ flex: 1.5 }} />
                <input name="diaChi" placeholder="Địa chỉ" value={nt.diaChi} onChange={e => handleNguoiThanChange(idx, e)} disabled={isView} style={{ flex: 2 }} />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Thông tin tái phạm</label>
            <input name="taiPham" value={values.taiPham} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Kết quả xét nghiệm</label>
            <input name="ketQuaXetNghiem" value={values.ketQuaXetNghiem} onChange={handleChange} disabled={isView} />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select name="trangThai" value={values.trangThai} onChange={handleChange} disabled={isView}>
              <option value="">Chọn trạng thái</option>
              <option value="Đang cai">Đang cai</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Tái nghiện">Tái nghiện</option>
            </select>
          </div>
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={onClose} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Đóng</button>
          {!isView && <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>}
        </div>
      </form>
    </div>
  );
};

export default OffcanvasForm; 