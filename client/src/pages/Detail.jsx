import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

function Detail () {
  const { id } = useParams();
  console.log(id);
  return (
    <Container>
      <div className='title--container'>
        <span className='title--text'>Antique Auction</span>
      </div>
      {buildDetail(id)}
    </Container>
  );
}

function buildDetail (id) {
  return (
    <div className='detail--container'>
      {`Item ${id}`}
    </div>
  );
}

export default Detail;
