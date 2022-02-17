import React from 'react';
import ReactPaginate from 'react-paginate';

export function Pagination({ pageCount, changePage }) {
  return (
    <ReactPaginate
      nextLabel="next"
      previousLabel="previous"
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={'paginationBttns'}
      previousLinkClassName={'previousBttn'}
      nextLinkClassName={'nextBttn'}
      disabledClassName={'paginationDisabled'}
      activeClassName={'paginationActive'}
    />
  );
}
