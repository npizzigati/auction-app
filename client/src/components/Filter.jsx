import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';

function Filter ({ filterItems }) {
  const inputDomRef = useRef(null);

  return (
    <div>
      <input
        type='text'
        id='filter'
        ref={inputDomRef}
        placeholder='Filter items by name/description text'
        onChange={() => filterItems(inputDomRef.current.value)}
      />
      <Button
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
