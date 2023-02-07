import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from '../axiosWithConfig.js';

function AutoBidder ({ itemId, setShowAlert, setAlertText }) {
  const [autoBid, setAutoBid] = useState(null);
  const checkboxDomRef = useRef(null);

  useEffect(() => {
    (async () => {
      await getExistingAutobid();
    })();
  }, []);

  return (
    <>
      <div className='autobid-launcher--container'>
        <Form.Check
          ref={checkboxDomRef}
          type='checkbox'
          label='Auto-bidding'
          onChange={handleCheckboxClick}
          checked={!!autoBid}
        />
      </div>
    </>
  );

  async function handleCheckboxClick (ev) {
    if (checkboxDomRef.current.checked) {
      saveAutoBidder(ev);
    } else {
      removeAutoBidding();
    }
  }

  async function removeAutoBidding () {
    const headers = { headers: { Authenticate: localStorage.token } };
    await axios.delete(`api/v1/autobids/${autoBid.id}`, headers)
      .then(res => {
        if (res.data.status === 'deleted') {
          setAutoBid(null);
        } else {
          setAlertText({
            heading: 'Your auto-bid could not be removed due to the following error(s):',
            message: res.data.errors.join('\n'),
            variant: 'danger'
          });
          setShowAlert(true);
        }
      });
    // TODO: Handle errors
  }

  async function saveAutoBidder (ev) {
    const headers = { headers: { Authenticate: localStorage.token } };
    await axios.post('api/v1/autobids', {
      item_id: itemId
    }, headers)
      .then(res => {
        if (res.data.status === 'created') {
          setAutoBid({ id: res.data.autobid.id });
        } else {
          setAlertText({
            heading: 'Auto-bid could not be saved due to the following error(s):',
            message: res.data.errors.join('\n'),
            variant: 'danger'
          });
          setShowAlert(true);
        }
      });
    // TODO: Error handling
  }

  async function getExistingAutobid () {
    const headers = { headers: { Authenticate: localStorage.token } };
    await axios.get(`api/v1/autobids?get_one=user&item_id=${itemId}`, headers)
      .then(res => {
        if (res.data && res.data.id !== undefined) {
          setAutoBid({ id: res.data.id });
        }
      });
    // TODO: Error handling
  }
}

export default AutoBidder;
