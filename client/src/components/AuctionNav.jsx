import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import axios from '../axiosWithConfig.js';

function AuctionNav () {
  const navigate = useNavigate();
  const expand = 'sm';
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    (async () => getUserInfo())();
  }, []);

  return (
    <>
      <Navbar bg='light' expand={expand} className='mb-3'>
        <Container fluid>
          <Navbar.Brand href='/'>Online Auction</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel2-expand-${expand}`}>
                 Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link href='/'>Home</Nav.Link>
                <NavDropdown
                  title='Settings'
                  align='end'
                  id={`offcanvasNavbarDropdown1-expand-${expand}`}
                >
                  <NavDropdown.Item href='/auto-bidder-config'>Configure Auto-Bidder</NavDropdown.Item>
                </NavDropdown>
                {role === 'admin' &&
                  <NavDropdown
                    title='Admin'
                    align='end'
                    id={`offcanvasNavbarDropdown2-expand-${expand}`}
                  >
                    <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
                  </NavDropdown>}
                <NavDropdown
                  title='Account'
                  align='end'
                  id={`offcanvasNavbarDropdown3-expand-${expand}`}
                >
                  <Navbar.Text className='navbar--username-container'>
                    {username}
                  </Navbar.Text>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );

  async function getUserInfo () {
    const headers = { headers: { Authenticate: localStorage.token } };
    await axios.get('api/v1/sessions/get-user-info', headers)
      .then(res => {
        setUsername(res.data?.username);
        setRole(res.data?.role);
      });
  }

  function logout () {
    localStorage.removeItem('token');
    navigate('/login');
  }
}

export default AuctionNav;
