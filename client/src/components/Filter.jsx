import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';

const FILTER_MESSAGE = 'Filter items by name/description text';

function Filter ({ filterItems }) {
  const inputDomRef = useRef(null);

  return (
    <div className='filter--container'>
      <input
        className='filter--input'
        type='text'
        id='filter'
        ref={inputDomRef}
        placeholder={FILTER_MESSAGE}
        size={FILTER_MESSAGE.length}
        onChange={() => filterItems(inputDomRef.current.value)}
      />
      <Button
        className='filter--button'
        variant='primary'
        size='sm'
        onClick={() => clear(inputDomRef, filterItems)}
      >
        Clear Filter
      </Button>
    </div>
  );
}

function clear (inputDomRef, filterItems) {
  console.log('clearing');
  inputDomRef.current.value = '';
  filterItems('');
}

export default Filter;
