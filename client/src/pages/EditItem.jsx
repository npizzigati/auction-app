import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import { Container, Button, Form, Badge } from 'react-bootstrap';

import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';

function EditItem () {
  const navigate = useNavigate();
  const { item_id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [showFileChooser, setShowFileChooser] = useState(false);
  const [showDateTimeChooser, setShowDateTimeChooser] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const name = useRef(null);
  const description = useRef(null);
  const file = useRef(null);
  const closeDate = useRef(null);
  const closeTime = useRef(null);
  const editForm = useRef(null);

  useEffect(() => {
    (async () => authenticate({ notAdminRedirect: '/' }, null, navigate))();
    (async () => {
      await retrieveItemData();
    })();
  }, []);

  return (
    <Container>
      {showAlert &&
        <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
      <div className='admin-edit--title'>
        Edit Item
      </div>
      <div className='admin-edit--form-container'>
        <div className='admin-edit--form-wrapper'><EditForm /></div>
      </div>
    </Container>
  );

  function EditForm () {
    return (
      <Form ref={editForm} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Item Name</Form.Label>
          <Form.Control ref={name} type='text' defaultValue={itemData?.name} required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control ref={description} as='textarea' style={{ height: '6em' }} defaultValue={itemData?.description} required />
        </Form.Group>
        {showFileChooser
         ? <Form.Group className='mb-3'>
             <Form.Label>Photo</Form.Label>
             <Form.Control
               ref={file}
               type='file'
               accept='image/*'
               required
             />
           </Form.Group>
         : <Form.Group className='mb-3'>
             <Form.Label className='admin-edit--photo-label'>Photo</Form.Label>
             <div />
             <Form.Text>
               {itemData?.filename}
             </Form.Text>
             <Badge
               className='admin-edit--change-button ms-2'
               bg='secondary'
               onClick={() => setShowFileChooser(true)}
             >
               Change
             </Badge>
           </Form.Group>}
        {showDateTimeChooser
         ? <Form.Group className='mb-3'>
             <Form.Label>Close of Bids</Form.Label>
             <div className='admin-edit--datetime-container'>
               <Form.Control ref={closeDate} type='date' required />
               <Form.Control ref={closeTime} type='time' required />
             </div>
           </Form.Group>
         : <Form.Group className='mb-3'>
             <Form.Label className='admin-edit--close-of-bids-label'>Close of Bids</Form.Label>
             <div />
             <Form.Text>
               {formatDate(itemData?.bidding_close_datetime)}
             </Form.Text>
             <Badge
               className='admin-edit--change-button ms-2'
               bg='secondary'
               onClick={() => setShowDateTimeChooser(true)}
             >
               Change
             </Badge>
           </Form.Group>}
        <div className='admin-edit--action-buttons-container'>
          <Button className='admin-edit--action-button' variant='outline-primary' type='submit' size='lg'>
            Submit
          </Button>
          <Button className='admin-edit--action-button ms-3' onClick={cancelEdit} variant='outline-warning' size='lg'>
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
    if (file.current) {
      formData.append('file', file.current.files[0]);
    }
    formData.append('bidding_close_datetime', closeDateTimeVal);

    const headers = {
      headers:
      {
        Authenticate: localStorage.token,
        'content-type': 'multipart/form-data'
      }
    };
    axios.patch(`api/v1/items/${item_id}`, formData, headers)
      .then(res => {
        if (res.data.status === 'success') {
          navigate(`/admin-detail/${item_id}`, { state: 'updated' });
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

  function cancelEdit () {
    navigate(`/admin-detail/${item_id}`);
  }

  function buildCloseDateTime () {
    return new Date(closeDate.current.value + 'T' + closeTime.current.value);
  }

  async function retrieveItemData () {
    await axios.get(`api/v1/items/${item_id}`)
      .then(res => {
        setItemData(res.data);
      });
    // TODO: Error handling
  }
}

function formatDate (date) {
  return (new Date(date)).toLocaleString('en-US');
}

export default EditItem;
