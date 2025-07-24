import React from 'react';

const PaginationControl = ({ total, currentPage, pageSize, onChangePage, onChangePageSize, pageSizeOptions = [5, 10, 20, 50] }) => {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const handlePrev = () => onChangePage(Math.max(1, currentPage - 1));
  const handleNext = () => onChangePage(Math.min(totalPages, currentPage + 1));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span>Tổng: <b>{total}</b></span>
      <button onClick={handlePrev} disabled={currentPage === 1} style={{ padding: '2px 10px' }}>{'<'}</button>
      <span>Trang <b>{currentPage}</b> / {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages} style={{ padding: '2px 10px' }}>{'>'}</button>
      <span>| Số dòng/trang:</span>
      <select value={pageSize} onChange={e => onChangePageSize(Number(e.target.value))}>
        {pageSizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
};

export default PaginationControl; 