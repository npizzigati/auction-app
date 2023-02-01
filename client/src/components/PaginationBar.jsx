import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationBar ({ itemCount, itemsPerPage, currentPage, setPage }) {
  const pages = [];
  const numberOfPages = getNumberOfPages(itemCount, itemsPerPage);
  for (let number = 1; number <= numberOfPages; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={(ev) => handleClick(ev, setPage)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>{pages}</Pagination>
  );
}

function handleClick (ev, setPage) {
  console.log('handling click');
  const page = ev.target.innerText;
  setPage(Number(page));
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
