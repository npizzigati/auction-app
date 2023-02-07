import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Menu () {
  const navigate = useNavigate();
  return (
    <div className='nav-dropdown--container'>
      <NavDropdown
        id='nav-dropdown'
        title={<img className='nav-dropdown--menu-image' src='../images/menu.png' alt='menu' />}
      >
        <NavDropdown.Item
          onClick={signOut}
        >
          Sign Out
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  function signOut () {
    localStorage.removeItem('token');
    navigate('/login');
  }
}

export default Menu;
