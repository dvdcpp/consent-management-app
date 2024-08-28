// hooks/usePagination.ts
import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    page,
    totalPages,
    startIndex,
    endIndex,
    handleChangePage,
  };
};