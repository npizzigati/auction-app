import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosWithConfig.js';
import Container from 'react-bootstrap/Container';

import PaginationBar from '../components/PaginationBar.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';

const ITEMS_PER_PAGE = 10;

function Home () {
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const allItemData = useRef([]);
  const sortDropdownData = buildSortDropdownData(setSort);

  useEffect(() => {
    (async () => {
      await retrieveItemData(allItemData);
      await populateBidPrices(allItemData);
      buildItemsOnPage(allItemData, page, setItemsOnPage);
    })();
  }, []);

  useEffect(() => {
    buildItemsOnPage(allItemData, page, setItemsOnPage);
  }, [page]);

  useEffect(() => {
    sortItems(sort, allItemData, page, setPage, setItemsOnPage);
  }, [sort]);

  return (
    <Container>
      <div>
        <DropdownSelect data={sortDropdownData} />
      </div>
      <div className='gallery--container'>
        {itemsOnPage}
      </div>
      <PaginationBar itemCount={allItemData.current.length} itemsPerPage={ITEMS_PER_PAGE} currentPage={page} setPage={setPage} />
    </Container>
  );
}

async function retrieveItemData (allItemData, page, setItemsOnPage) {
  await axios.get('api/v1/items')
    .then(res => {
      allItemData.current = res.data;
      console.log(res.data);
    });
  // TODO: Error handling
}

function buildItemsOnPage (allItemData, page, setItemsOnPage) {
  console.log('building items on page');
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  console.log('page: ', page);
  console.log('start, end: ', start, end);
  const markup = allItemData.current.slice(start, end).map(item => {
    return (
      <div className='gallery--item' key={item.id}>
        <span className='gallery--text'>{item.name}</span>
        <span className='gallery--text gallery--text__small'>{item.description}</span>
        <span className='gallery--text gallery--text__small'>{item.currentPrice}</span>
      </div>
    );
  });

  setItemsOnPage(markup);
}

async function populateBidPrices (allItemData) {
  for (let i = 0; i < allItemData.current.length; i++) {
    const item = allItemData.current[i];
    const highestBid = await retrieveHighestBid(item.id);
    if (highestBid === undefined) {
      item.currentPrice = item.reserve_price;
    } else {
      item.currentPrice = highestBid;
    }
  }
}

async function retrieveHighestBid (itemId) {
  let highestBid;
  await axios.get(`api/v1/bids?get_one=highest&item_id=${itemId}`)
    .then(res => {
      highestBid = res.data[0]?.amount;
    });
  return highestBid;
}

function buildSortDropdownData (setSort) {
  return {
    initialTitle: 'Sort: None',
    options: [
    {
      id: 1,
      name: 'Sort: Price (low to high)',
      callback: () => setSort('price-asc')
    },
    {
      id: 2,
      name: 'Sort: Price (high to low)',
      callback: () => setSort('price-desc')
    }]
  };
}

function sortItems (sort, allItemData, page, setPage, setItemsOnPage) {
  if (sort === 'price-asc') {
    allItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sort === 'price-desc') {
    allItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
  }
  buildItemsOnPage(allItemData, page, setItemsOnPage);
  setPage(1);
}

export default Home;
