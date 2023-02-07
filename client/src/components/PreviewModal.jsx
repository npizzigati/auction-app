import React from 'react';
import Modal from 'react-bootstrap/Modal';

function PreviewModal ({ show, handleClose, filename }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen='sm-down'>
        <Modal.Header closeButton>
          <Modal.Title>{filename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='admin-detail--photo-container'>
            <img className='admin-detail--photo' src={`../images/${filename}`} alt={filename} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PreviewModal;
