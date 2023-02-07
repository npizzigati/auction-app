import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClampLines from 'react-clamp-lines';

import PaginationBar from '../components/PaginationBar.jsx';
import Filter from '../components/Filter.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';
import authenticate from '../utilities/misc_utils.js';

const ITEMS_PER_PAGE = 10;

function Home () {
  const navigate = useNavigate();
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [role, setRole] = useState('unauthed');
  const allItemData = useRef([]);
  const filteredItemData = useRef([]);
  const sortDropdownData = buildSortDropdownData();

  useEffect(() => {
    (async () => authenticate({ notSignedInRedirect: '/login' }, setRole, navigate))();
    (async () => {
      await retrieveItemData();
      await populateBidPrices();
      filteredItemData.current = allItemData.current;
      buildItemsOnPage();
    })();
  }, []);

  useEffect(() => {
    buildItemsOnPage();
  }, [page]);

  useEffect(() => {
    sortItems();
  }, [sort]);

  return (
    <Container>
      <div className='gallery--criteria-container'>
        <Filter
          allItems={allItemData.current}
          filterItems={createFilterer()}
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

  function buildItemsOnPage () {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const markup = filteredItemData.current.slice(start, end).map(item => {
      return buildItemMarkup(item);
    });

    setItemsOnPage(markup);
  }

  function createFilterer () {
    return function (text) {
      text = text.toLowerCase();
      if (text === '') {
        buildItemsOnPage();
        filteredItemData.current = allItemData.current;
      } else {
        filteredItemData.current = allItemData.current.filter(item => item.name.toLowerCase().includes(text) ||
                                                        item.description.toLowerCase().includes(text));
      }
      buildItemsOnPage();
      setPage(1);
    };
  }

  async function retrieveItemData () {
    await axios.get('api/v1/items')
      .then(res => {
        allItemData.current = res.data;
      });
    // TODO: Error handling
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
            variant='secondary'
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            Bid Now
          </Button>
        </div>
      </div>
    );
  }

  async function populateBidPrices () {
    const highestBids = await retrieveHighestBids();
    allItemData.current.forEach(item => {
      item.currentPrice = highestBids[item.id] || 0;
    });
  }

  async function retrieveHighestBids (itemId) {
    let highestBids;
    await axios.get('api/v1/bids?get_all=highest')
      .then(res => {
        highestBids = res.data;
      });
    return highestBids;
  }

  function buildSortDropdownData () {
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

  function sortItems () {
    if (sort === 'price-asc') {
      allItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
      filteredItemData.current.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sort === 'price-desc') {
      allItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
      filteredItemData.current.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    buildItemsOnPage();
    setPage(1);
  }
}

export default Home;
