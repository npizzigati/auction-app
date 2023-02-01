import React, { useRef } from 'react';

function Filter ({ filterItems }) {
  const inputDOMRef = useRef(null);

  return (
    <div>
      <label for='filter'>Filter text in item name/description:</label>
      <input
        type='text'
        id='filter'
        ref={inputDOMRef}
        onChange={() => filterItems(inputDOMRef.current.value)}
      />
    </div>
  );
}

// function handleChange (inputDOMRef) {
//   // console.log(inputDOMRef.current.value);
//   const text = inputDOMRef.current.value;
//   const filteredItems = allItems.filter(item => item.name.includes(text));
//   buildItemsOnPage(filteredItems, 1, );
// }

export default Filter;
