import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosWithConfig.js';
import Container from 'react-bootstrap/Container';

import PaginationBar from '../components/PaginationBar.jsx';
import Filter from '../components/Filter.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';

const ITEMS_PER_PAGE = 10;

function Home () {
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [numItemsDisplayed, setNumItemsDisplayed] = useState(null);
  const allItemData = useRef([]);
  const sortDropdownData = buildSortDropdownData(setSort);

  useEffect(() => {
    (async () => {
      await retrieveItemData(allItemData, setNumItemsDisplayed);
      await populateBidPrices(allItemData);
      buildItemsOnPage(allItemData.current, page, setItemsOnPage);
    })();
  }, []);

  useEffect(() => {
    buildItemsOnPage(allItemData.current, page, setItemsOnPage);
  }, [page]);

  useEffect(() => {
    sortItems(sort, allItemData, setPage, setItemsOnPage);
  }, [sort]);

  return (
    <Container>
      <div className='gallery--criteria-container'>
        <DropdownSelect data={sortDropdownData} />
        <Filter
          allItems={allItemData.current}
          filterItems={createFilterer(allItemData, setItemsOnPage, setPage, setNumItemsDisplayed)}
        />
      </div>
      <div className='gallery--container'>
        {itemsOnPage}
      </div>
      <PaginationBar itemCount={numItemsDisplayed} itemsPerPage={ITEMS_PER_PAGE} currentPage={page} setPage={setPage} />
    </Container>
  );
}

function createFilterer (allItemData, setItemsOnPage, setPage, setNumItemsDisplayed) {
  return function (text) {
    text = text.toLowerCase();
    if (text === '') {
      buildItemsOnPage(allItemData.current, 1, setItemsOnPage);
      setNumItemsDisplayed(allItemData.current.length);
    } else {
      const filteredItems = allItemData.current.filter(item => item.name.toLowerCase().includes(text) ||
                                                       item.description.toLowerCase().includes(text));
      buildItemsOnPage(filteredItems, 1, setItemsOnPage);
      setNumItemsDisplayed(filteredItems.length);
    }
    setPage(1);
  };
}

async function retrieveItemData (allItemData, setNumItemsDisplayed) {
  await axios.get('api/v1/items')
    .then(res => {
      allItemData.current = res.data;
      setNumItemsDisplayed(allItemData.current.length);
      console.log(res.data);
    });
  // TODO: Error handling
}

function buildItemsOnPage (allItems, page, setItemsOnPage) {
  console.log('building items on page');
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  console.log('page: ', page);
  console.log('start, end: ', start, end);
  const markup = allItems.slice(start, end).map(item => {
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

function sortItems (sort, allItemData, setPage, setItemsOnPage) {
  if (sort === 'price-asc') {
    allItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sort === 'price-desc') {
    allItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
  }
  buildItemsOnPage(allItemData.current, 1, setItemsOnPage);
  setPage(1);
}

export default Home;
