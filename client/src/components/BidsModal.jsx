import React from 'react';
import { Modal, Table } from 'react-bootstrap';

function BidsModal ({ show, handleClose, bidHistory }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen='sm-down'>
        <Modal.Header closeButton>
          <Modal.Title>Bid History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <TableBody />
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );

  function TableBody () {
    return (
      <tbody>
        {bidHistory.map(datum => {
          return (
            <tr
              key={datum.id}
              className='bids-modal--item-row'
            >
              <td>{datum.name}</td>
              <td>{datum.amount}</td>
              <td>{(new Date(datum.created_at)).toLocaleString('en-US')}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default BidsModal;
