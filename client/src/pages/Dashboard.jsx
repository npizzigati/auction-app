import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import Filter from '../components/Filter.jsx';
import { Container, Table, Button } from 'react-bootstrap';

import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';

function Dashboard () {
  const navigate = useNavigate();
  const message = useLocation().state;
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const [allItemData, setAllItemData] = useState(null);
  const [filteredItemData, setFilteredItemData] = useState(null);

  useEffect(() => {
    (async () => authenticate({ notAdminRedirect: '/' }, null, navigate))();
    (async () => {
      if (message) {
        navigate('.', { replace: true });
        showSuccessAlert(message);
      }
      await retrieveItemData();
    })();
  }, []);

  return (
    <Container>
      {showAlert &&
        <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
      <div className='dashboard--title-container'>
        Admin Dashboard
      </div>
      <div className='dashboard--new-button-container'>
        <Button
          className='dashboard--new-button'
          variant='outline-primary'
          type='submit'
          size='lg'
          onClick={() => navigate('/item/new')}
        >
          Add New Item
        </Button>
      </div>
      <Filter
        allItems={allItemData}
        filterItems={createFilterer()}
      />
      <span className='dashboard--header-info'>Select any item below for more details and management options</span>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Close of Bids</th>
          </tr>
        </thead>
        <TableBody />
      </Table>
    </Container>
  );

  function TableBody () {
    return (
      <tbody>
        {filteredItemData?.map(item => {
          return (
            <tr
              key={item.id}
              className='dashboard--item-row'
              onClick={() => navigate(`/admin-detail/${item.id}`)}
            >
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{(new Date(item.bidding_close_datetime)).toLocaleString('en-US')}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  function createFilterer () {
    return function (text) {
      text = text.toLowerCase();
      if (text === '') {
        setFilteredItemData(allItemData);
      } else {
        const filteredData = allItemData.filter(item => item.name.toLowerCase().includes(text) ||
                                                    item.description.toLowerCase().includes(text));
        setFilteredItemData(filteredData);
      }
    };
  }

  async function retrieveItemData () {
    await axios.get('api/v1/items')
      .then(res => {
        setAllItemData(res.data);
        setFilteredItemData(res.data);
      });
    // TODO: Error handling
  }

  function showSuccessAlert (operation) {
    setAlertOptions({
      heading: 'Success!',
      message: `Your item was successfully ${operation}`,
      variant: 'success'
    });
    setShowAlert(true);
  }
}

export default Dashboard;
