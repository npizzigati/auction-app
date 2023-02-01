import React from 'react';

function PaginationBar ({ itemCount, itemsPerPage, currentPage, setPage }) {
  const totalPages = getNumberOfPages(itemCount, itemsPerPage);
  return (
    <div className='pagination--container'>
      <div className='pagination--page-indicator'>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      <div className='pagination--button-container'>
        <div
          className={'pagination--button' + ((currentPage === 1) ? ' disabled' : '')}
          onClick={(ev) => goToPrevPage(ev, currentPage, setPage)}
        >
          <span>&lt;&lt; Previous</span>
        </div>
        <div
          className={'pagination--button' + ((currentPage === totalPages) ? ' disabled' : '')}
          onClick={(ev) => goToNextPage(ev, currentPage, totalPages, setPage)}
        >
          <span>Next &gt;&gt;</span>
        </div>
      </div>
    </div>
  );
}

function goToPrevPage (ev, currentPage, setPage) {
  if (currentPage === 1) {
    return;
  }
  console.log('handling click - prev');
  setPage(currentPage - 1);
}

function goToNextPage (ev, currentPage, totalPages, setPage) {
  if (currentPage === totalPages) {
    return;
  }
  console.log('handling click - next');
  setPage(currentPage + 1);
}

function getNumberOfPages (itemCount, itemsPerPage) {
  const fullPages = Math.floor(itemCount / itemsPerPage);
  if (itemCount % itemsPerPage === 0) {
    return fullPages;
  } else {
    return fullPages + 1;
  }
}

export default PaginationBar;
