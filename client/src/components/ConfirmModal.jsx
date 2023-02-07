import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal ({ show, handleClose, title, message, action, callback }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen='sm-down'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='outline-danger'
            onClick={callback}
          >
            {action}
          </Button>
          <Button
            variant='outline-secondary'
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
