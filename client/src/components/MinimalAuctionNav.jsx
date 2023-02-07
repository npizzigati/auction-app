import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MinimalAuctionNav () {
  return (
    <>
      <Navbar bg='light' className='mb-3'>
        <Container fluid>
          <Navbar.Brand>Online Auction</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default MinimalAuctionNav;
