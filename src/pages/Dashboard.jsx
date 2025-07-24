import React from 'react';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis as LXAxis, YAxis as LYAxis, CartesianGrid as LGrid, Tooltip as LTooltip } from 'recharts';
// import { Search, Plus, Download, AlertCircle, Users, Activity, Shield, FileText } from 'lucide-react'; // Nếu có icon

const pieData = [
  { name: 'Hoàn thành', value: 120 },
  { name: 'Đang điều trị', value: 60 },
  { name: 'Tái nghiện', value: 20 },
];
const pieColors = ['#8B0000', '#bbb', '#eee'];
const relapsedCount = 11; // Học viên tái nghiện 2 lần+

const barData = [
  { name: 'Đã cấp', value: 180 },
  { name: 'Chưa cấp', value: 20 },
];

const lineData = [
  { tháng: '1', thànhCông: 10 },
  { tháng: '2', thànhCông: 15 },
  { tháng: '3', thànhCông: 18 },
  { tháng: '4', thànhCông: 22 },
  { tháng: '5', thànhCông: 25 },
  { tháng: '6', thànhCông: 30 },
];

const stats = [
  { label: 'Tổng số học viên', value: 210 },
  { label: 'Đang điều trị', value: 86 },
  { label: 'Tái nghiện 2 lần+', value: relapsedCount },
  { label: 'Đơn thuốc đang dùng', value: 120 },
];

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 28, fontWeight: 700, marginBottom: 18 }}>Trang chủ</h1>
      {/* Dải nút điều hướng nhanh */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', borderRadius: 4, padding: '7px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>Xem toàn bộ thống kê chi tiết →</button>
        <button style={{ background: '#fff', color: '#8B0000', border: '1.2px solid #8B0000', borderRadius: 4, padding: '7px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>Xuất báo cáo nhanh</button>
      </div>
      {/* Grid nhóm biểu đồ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
        {/* Nhóm 1: Tình hình học viên */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(139,0,0,0.04)', padding: 24, gridColumn: '1/2' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ color: '#111', fontWeight: 600, fontSize: 18, margin: 0 }}>Tình hình học viên</h3>
            {relapsedCount > 10 && (
              <span style={{ background: '#fdeaea', color: '#8B0000', borderRadius: 4, padding: '2px 10px', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>⚠️ Cảnh báo: {relapsedCount} tái nghiện 2 lần+</span>
            )}
          </div>
          <PieChart width={260} height={220}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={false}>
              {pieData.map((entry, idx) => <Cell key={entry.name} fill={pieColors[idx]} />)}
            </Pie>
            <PieTooltip />
          </PieChart>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 8 }}>
            {pieData.map((d, idx) => (
              <span key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15 }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: pieColors[idx] }}></span>
                {d.name}
              </span>
            ))}
          </div>
        </div>
        {/* Nhóm 2: Trang bị */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(139,0,0,0.04)', padding: 24, gridColumn: '2/3' }}>
          <h3 style={{ color: '#111', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Trang bị</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <BarTooltip />
              <Bar dataKey="value" fill="#8B0000" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15 }}>
              <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: '#8B0000' }}></span>
              Đã cấp
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15 }}>
              <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: '#bbb' }}></span>
              Chưa cấp
            </span>
          </div>
        </div>
        {/* Nhóm 3: Kết quả đào tạo */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(139,0,0,0.04)', padding: 24, gridColumn: '3/4' }}>
          <h3 style={{ color: '#111', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Kết quả đào tạo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <LGrid strokeDasharray="3 3" stroke="#eee" />
              <LXAxis dataKey="tháng" stroke="#bbb" />
              <LYAxis stroke="#bbb" />
              <LTooltip />
              <Line type="monotone" dataKey="thànhCông" stroke="#8B0000" strokeWidth={3} dot={{ r: 5, fill: '#8B0000' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Box nhỏ thống kê */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(139,0,0,0.04)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 12, minWidth: 220, fontSize: 17, fontWeight: 600, color: '#111' }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span> {s.label}: <span style={{ color: '#8B0000', fontWeight: 700 }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 