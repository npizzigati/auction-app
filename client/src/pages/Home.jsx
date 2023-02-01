import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosWithConfig.js';
import Container from 'react-bootstrap/Container';

import PaginationBar from '../components/PaginationBar.jsx';

const ITEMS_PER_PAGE = 10;

function Home () {
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [page, setPage] = useState(1);
  const allItemData = useRef([]);

  useEffect(() => {
    (async () => {
      axios.get('api/v1/items')
        .then(res => {
          allItemData.current = res.data;
          buildItemsOnPage(allItemData.current, page, setItemsOnPage);
        });
      // TODO: Error handling
    })();
  }, []);

  useEffect(() => {
    console.log('Calling useEffect (page dependency)');
    buildItemsOnPage(allItemData.current, page, setItemsOnPage);
  }, [page]);

  return (
    <Container>
      <div className='gallery'>
        {itemsOnPage}
      </div>
      <PaginationBar itemCount={allItemData.current.length} itemsPerPage={ITEMS_PER_PAGE} currentPage={page} setPage={setPage} />
    </Container>
  );
}

function buildItemsOnPage (itemsData, page, setItemsOnPage) {
  console.log('building items on page');
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  console.log('page: ', page);
  console.log('start, end: ', start, end);
  const markup = itemsData.slice(start, end).map(item => {
    return (
      <div key={item.id}>
        <span className='item item--name'>{item.name}</span>
        <span className='item item--description'>{item.description}</span>
      </div>
    );
  });

  setItemsOnPage(markup);
}

export default Home;
