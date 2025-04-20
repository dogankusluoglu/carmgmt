import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function TableHeader({ label, sortKey, sortConfig, onSort }) {
  const isActiveSort = sortConfig.key === sortKey;
  const direction = isActiveSort ? sortConfig.direction : null;

  return (
    <th
      onClick={() => onSort(sortKey)}
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {isActiveSort && direction === 'asc' && <FaArrowUp className="inline-block text-xs" />}
        {isActiveSort && direction === 'desc' && <FaArrowDown className="inline-block text-xs" />}
      </div>
    </th>
  );
}

export default TableHeader;
