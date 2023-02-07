import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import { Container, Button, Form } from 'react-bootstrap';

import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';

function NewItem () {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const name = useRef(null);
  const description = useRef(null);
  const file = useRef(null);
  const closeDate = useRef(null);
  const closeTime = useRef(null);
  const newForm = useRef(null);

  useEffect(() => {
    (async () => authenticate({ notAdminRedirect: '/' }, null, navigate))();
  }, []);

  return (
    <Container>
      {showAlert &&
        <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
      <div className='admin-new--title'>
        New Item
      </div>
      <div className='admin-new--form-container'>
        <div className='admin-new--form-wrapper'><NewForm /></div>
      </div>
    </Container>
  );

  function NewForm () {
    return (
      <Form ref={newForm} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Item Name</Form.Label>
          <Form.Control ref={name} type='text' required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control ref={description} as='textarea' style={{ height: '6em' }} required />
        </Form.Group>
        <Form.Group className='mb-3'>
           <Form.Label>Photo</Form.Label>
           <Form.Control
             ref={file}
             type='file'
             accept='image/*'
             required
           />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Close of Bids</Form.Label>
          <div className='admin-new--datetime-container'>
            <Form.Control ref={closeDate} type='date' required />
            <Form.Control ref={closeTime} type='time' required />
          </div>
        </Form.Group>
        <div className='admin-new--action-buttons-container'>
          <Button className='admin-new--action-button' variant='outline-primary' type='submit' size='lg'>
            Submit
          </Button>
          <Button className='admin-new--action-button ms-3' onClick={cancelNew} variant='outline-warning' size='lg'>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }

  function handleSubmit (ev) {
    ev.preventDefault();
    const closeDateTimeVal = (!closeDate.current || !closeTime.current) ? itemData.bidding_close_datetime : buildCloseDateTime();
    const formData = new FormData();
    formData.append('name', name.current.value);
    formData.append('description', description.current.value);
    formData.append('file', file.current.files[0]);
    formData.append('bidding_close_datetime', closeDateTimeVal);

    const headers = {
      headers:
      {
        Authenticate: localStorage.token,
        'content-type': 'multipart/form-data'
      }
    };
    axios.post('api/v1/items', formData, headers)
      .then(res => {
        if (res.data.status === 'success') {
          navigate('/dashboard', { state: 'created' });
        } else {
          setAlertOptions({
            heading: 'Bid could not be placed for the following reasons:',
            message: res.data.errors?.join('\n'),
            variant: 'danger'
          });
          setShowAlert(true);
        }
      });
  }

  function cancelNew () {
    navigate('/dashboard');
  }

  function buildCloseDateTime () {
    return new Date(closeDate.current.value + 'T' + closeTime.current.value);
  }
}

export default NewItem;
