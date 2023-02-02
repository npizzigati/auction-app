import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownSelect ({ data }) {
  const [dropdownButtonTitle, setDropdownButtonTitle] = useState(data.initialTitle);
  return (
    <>
      {buildDropdownMenu(data, dropdownButtonTitle, setDropdownButtonTitle)}
    </>
  );
}

function buildDropdownMenu (data, dropdownButtonTitle, setDropdownButtonTitle) {
  const dropdownItems = data.options.map((option) =>
    <Dropdown.Item
      key={option.id}
      onClick={() => {
        setDropdownButtonTitle(option.name);
        option.callback();
      }}
    >
      {option.name}
    </Dropdown.Item>
  );
  return (
    <DropdownButton
      id='dropdown-basic-button'
      className='u-ms-4'
      title={dropdownButtonTitle}
      size='sm'
    >
      {dropdownItems}
    </DropdownButton>
  );
}

export default DropdownSelect;
