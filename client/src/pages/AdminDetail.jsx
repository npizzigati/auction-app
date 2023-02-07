import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import { Container, Table, Button, Badge } from 'react-bootstrap';

import PreviewModal from '../components/PreviewModal.jsx';
import BidsModal from '../components/BidsModal.jsx';
import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';
import ConfirmModal from '../components/ConfirmModal';

function AdminDetail () {
  const navigate = useNavigate();
  const message = useLocation().state;
  const { item_id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const [previewFilename, setPreviewFilename] = useState(null);
  const [bidHistory, setBidHistory] = useState(null);

  useEffect(() => {
    (async () => authenticate({ notAdminRedirect: '/' }, null, navigate))();
    (async () => {
      if (message) {
        navigate('.', { replace: true });
        showSuccessAlert(message);
      }
      await retrieveItemData();
      await getBidHistory(item_id);
    })();
  }, []);

  return (
    <Container>
      {showAlert &&
        <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
      <PreviewModal
        show={showPreviewModal}
        handleClose={() => setShowPreviewModal(false)}
        filename={previewFilename}
      />
      <BidsModal
        show={showBidsModal}
        handleClose={() => setShowBidsModal(false)}
        bidHistory={bidHistory}
      />
      <ConfirmModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        title='Are you sure?'
        message='If you delete this item you will not be able to get it back. Are you sure?'
        action='Delete'
        callback={deleteItem}
      />
      <div className='admin-detail--title'>
        Item Details
      </div>
      <ItemTable />
      <div className='admin-detail--action-buttons-container'>
        <div className='admin-detail--action-button'>
          <Button
            variant='outline-primary'
            size='lg'
            onClick={() => navigate(`/item/${item_id}/edit`)}
          >
            Edit
          </Button>
        </div>
        <div className='admin-detail--action-button'>
          <Button
            variant='outline-danger'
            size='lg'
            onClick={setShowConfirmModal}
          >
            Delete
          </Button>
        </div>
      </div>
    </Container>
  );

  function ItemTable () {
    return (
      <Table className='admin-detail--item-table' bordered>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{itemData?.name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{itemData?.description}</td>
          </tr>
          <tr>
            <th>Photo</th>
            <td>
              {itemData?.filename}
              <Badge
                className='admin-detail--preview-button ms-2'
                bg='secondary'
                onClick={() => showPhotoPreview(itemData?.filename)}
              >
                Preview
              </Badge>
            </td>
          </tr>
          <tr>
            <th>Close of Bids</th>
            <td>{formatDate(itemData?.bidding_close_datetime)}</td>
          </tr>
          <tr>
            <th>Bids</th>
            <td>
              {bidHistory?.length}
              <Badge
                className='admin-detail--show-bids-button ms-2'
                bg='secondary'
                onClick={() => showBidHistory()}
              >
                See Bid History
              </Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  function showBidHistory () {
    setShowBidsModal(true);
  }

  async function getBidHistory (itemId) {
    const headers = { headers: { Authenticate: localStorage.token } };
    await axios.get(`api/v1/bids?with=usernames&item_id=${item_id}`, headers)
      .then(res => {
        setBidHistory(res.data);
      });
  }

  async function retrieveItemData () {
    await axios.get(`api/v1/items/${item_id}`)
      .then(res => {
        setItemData(res.data);
      });
    // TODO: Error handling
  }

  function deleteItem () {
    const headers = { headers: { Authenticate: localStorage.token } };
    axios.delete(`api/v1/items/${item_id}`, headers)
      .then(res => {
        if (res.data?.status === 'success') {
          navigate('/dashboard', { state: 'deleted' });
        } else {
          showFailureAlert('deleted');
        }
      });
  }

  function showPhotoPreview (filename) {
    setShowPreviewModal(true);
    setPreviewFilename(filename);
  }

  function showSuccessAlert (operation) {
    setAlertOptions({
      heading: 'Success!',
      message: `Your item was successfully ${operation}`,
      variant: 'success'
    });
    setShowAlert(true);
  }

  function showFailureAlert (operation) {
    setAlertOptions({
      heading: 'There was a problem with your request.',
      message: `Your item was not able to be ${operation}`,
      variant: 'danger'
    });
    setShowAlert(true);
  }
}

function formatDate (date) {
  return (new Date(date)).toLocaleString('en-US');
}

export default AdminDetail;
