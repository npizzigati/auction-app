import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosWithConfig.js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClampLines from 'react-clamp-lines';

import PaginationBar from '../components/PaginationBar.jsx';
import Filter from '../components/Filter.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';

const ITEMS_PER_PAGE = 10;

function Home () {
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const allItemData = useRef([]);
  const filteredItemData = useRef([]);
  const sortDropdownData = buildSortDropdownData(setSort);

  useEffect(() => {
    (async () => {
      await retrieveItemData(allItemData);
      await populateBidPrices(allItemData);
      filteredItemData.current = allItemData.current;
      buildItemsOnPage(filteredItemData.current, page, setItemsOnPage);
    })();
  }, []);

  useEffect(() => {
    buildItemsOnPage(filteredItemData.current, page, setItemsOnPage);
  }, [page]);

  useEffect(() => {
    sortItems(sort, allItemData, filteredItemData, setPage, setItemsOnPage);
  }, [sort]);

  return (
    <Container>
      <div className='title--container'>
        <span className='title--text'>Antique Auction</span>
      </div>
      <div className='gallery--criteria-container'>
        <Filter
          allItems={allItemData.current}
          filterItems={createFilterer(allItemData, filteredItemData, setItemsOnPage, setPage)}
        />
        <div className='sort--container'>
          <DropdownSelect data={sortDropdownData} />
        </div>
      </div>
      <div className='gallery--container'>
        {itemsOnPage}
      </div>
      <PaginationBar itemCount={filteredItemData.current.length} itemsPerPage={ITEMS_PER_PAGE} currentPage={page} setPage={setPage} />
    </Container>
  );
}

function createFilterer (allItemData, filteredItemData, setItemsOnPage, setPage) {
  return function (text) {
    text = text.toLowerCase();
    if (text === '') {
      buildItemsOnPage(allItemData.current, 1, setItemsOnPage);
      filteredItemData.current = allItemData.current;
    } else {
      filteredItemData.current = allItemData.current.filter(item => item.name.toLowerCase().includes(text) ||
                                                       item.description.toLowerCase().includes(text));
      buildItemsOnPage(filteredItemData.current, 1, setItemsOnPage);
    }
    setPage(1);
  };
}

async function retrieveItemData (allItemData) {
  await axios.get('api/v1/items')
    .then(res => {
      allItemData.current = res.data;
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
    return buildItemMarkup(item);
  });

  setItemsOnPage(markup);
}

function buildItemMarkup (item) {
  return (
    <div className='gallery--item' key={item.id}>
      <div className='gallery--text'>
        <ClampLines
          className='gallery--name'
          text={item.name}
          lines={2}
          ellipsis='...'
        />
        <ClampLines
          className='gallery--description'
          text={item.description}
          lines={2}
          ellipsis='...'
        />
      </div>
      <div className='gallery--photo-container'>
        <img className='gallery--photo' src={`./images/${item.filename}`} alt={item.name} />
      </div>
      <div className='gallery--bid-container'>
        <div className='gallery--bid-price'>
          {`Current bid: $${Number(item.currentPrice).toFixed(2)}`}
        </div>
        <Button
          className='filter--button'
          variant='secondary'
          onClick={() => clear(inputDomRef, filterItems)}
        >
          Bid Now
        </Button>
      </div>
    </div>
  );
}

async function populateBidPrices (allItemData) {
  for (let i = 0; i < allItemData.current.length; i++) {
    const item = allItemData.current[i];
    const highestBid = await retrieveHighestBid(item.id);
    if (highestBid === undefined) {
      item.currentPrice = 0;
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

function sortItems (sort, allItemData, filteredItemData, setPage, setItemsOnPage) {
  if (sort === 'price-asc') {
    allItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
    filteredItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sort === 'price-desc') {
    allItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
    filteredItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
  }

  buildItemsOnPage(filteredItemData.current, 1, setItemsOnPage);
  setPage(1);
}

export default Home;
