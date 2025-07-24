import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  lopList,
  lichHocList,
  diemDanhList,
  danhGiaBuoiHocList,
  tuVanTamLyList
} from '../data/giaoDucTuVan';

const TABS = {
  DIEM_DANH: 'Điểm danh',
  DANH_GIA: 'Đánh giá học viên',
};

export default function BuoiHocDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tab, setTab] = useState(TABS.DIEM_DANH);
  const [info, setInfo] = useState(null);
  const [dsDiemDanh, setDsDiemDanh] = useState([]);
  const [dsDanhGia, setDsDanhGia] = useState([]);
  const [dsTuVan, setDsTuVan] = useState([]);

  useEffect(() => {
    const lh = lichHocList.find(lh => lh.id === id);
    if (!lh) return;
    setInfo({
      lop: lopList.find(l => l.id === lh.lopId)?.ten || '',
      mon: lh.mon,
      thoiGian: lh.thoiGian.replace('T', ' '),
      giangVien: lh.giangVien,
      id: lh.id
    });
    setDsDiemDanh(diemDanhList.filter(dd => dd.lichHocId === id));
    setDsDanhGia(danhGiaBuoiHocList.filter(dg => dg.lichHocId === id));
    setDsTuVan(tuVanTamLyList.filter(tv => tv.lichHocId === id));
  }, [id]);

  if (!info) return <div style={{ padding: 32 }}>Không tìm thấy buổi học.</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 32 }}>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Chi tiết buổi học</h1>
      <div style={{ display: 'flex', gap: 32, marginBottom: 18 }}>
        <div><b>Lớp:</b> {info.lop}</div>
        <div><b>Môn học:</b> {info.mon}</div>
        <div><b>Thời gian:</b> {info.thoiGian}</div>
        <div><b>Giảng viên:</b> {info.giangVien}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {Object.values(TABS).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? '#8B0000' : '#fff',
              color: tab === t ? '#fff' : '#8B0000',
              border: '1.2px solid #8B0000',
              borderRadius: 4,
              padding: '6px 18px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === TABS.DIEM_DANH && (
        <div>
          <h2 style={{ fontSize: 18, color: '#8B0000', marginBottom: 12 }}>Điểm danh</h2>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Có mặt</th>
                <th>Kết quả</th>
                <th>Nhận xét</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dsDiemDanh.map(dd => (
                <tr key={dd.id}>
                  <td>{dd.hocVien}</td>
                  <td><input type="checkbox" checked={dd.diemDanh} readOnly /></td>
                  <td>{dd.ketQua}</td>
                  <td>{dd.nhanXet}</td>
                  <td>
                    <button title="Sửa" style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === TABS.DANH_GIA && (
        <div>
          <h2 style={{ fontSize: 18, color: '#8B0000', marginBottom: 12 }}>Đánh giá học viên</h2>
          <table className="table-hocvien">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Điểm</th>
                <th>Nhận xét</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dsDanhGia.map(dg => (
                <tr key={dg.id}>
                  <td>{dg.hocVien}</td>
                  <td>{dg.diem}</td>
                  <td>{dg.nhanXet}</td>
                  <td>
                    <button title="Sửa" style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                    <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: 32 }}>
        <button onClick={() => nav('/giao-duc')} style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', borderRadius: 4, padding: '8px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Quay lại</button>
      </div>
    </div>
  );
} 