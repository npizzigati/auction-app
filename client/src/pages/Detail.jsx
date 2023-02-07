import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import Countdown from 'react-countdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';
import AutoBidAlert from '../components/AutoBidAlert';
import AutoBidder from '../components/AutoBidder';

function Detail () {
  let autoBidAlertPollInterval;
  let updateBidPricePollInterval;
  const { item_id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [role, setRole] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [ownBid, setOwnBid] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const [showAutoBidAlert, setShowAutoBidAlert] = useState(false);
  const [showBidArea, setShowBidArea] = useState(true);
  const [autoBidAlertOptions, setAutoBidAlertOptions] = useState('');
  const [bidErrorMsg, setBidErrorMsg] = useState('');
  const bidAmountDomRef = useRef(null);

  useEffect(() => {
    (async () => authenticate({ notSignedInRedirect: '/login' }, setRole, navigate))();
    (async () => {
      await retrieveItemData();
      updateBidPrice();
      autoBidAlertPollInterval = setInterval(pollAutoBidPercentages, 5000);
      updateBidPricePollInterval = setInterval(updateBidPrice, 2000);
    })();

    return () => {
      clearInterval(autoBidAlertPollInterval);
      clearInterval(updateBidPricePollInterval);
    };
  }, []);

  function pollAutoBidPercentages () {
    const headers = { headers: { Authenticate: localStorage.token } };
    axios.get('api/v1/autobid/percentages', headers)
      .then(res => {
        const alertPercentage = res.data.alert_percentage;
        const actualPercentage = res.data.actual_percentage;
        if (actualPercentage >= 100) {
          setAutoBidAlertOptions({
            heading: 'Auto-Bidding Suspended',
            message: 'Your auto-bids have reached your allotted maximum. To continue autobidding, ' +
              'increase the maximum (Settings -> Configure Auto-Bidder).',
            variant: 'danger'
          });
          setShowAutoBidAlert(true);
        } else if (alertPercentage != null && actualPercentage >= alertPercentage) {
          setAutoBidAlertOptions({
            heading: 'Auto-Bidding Amount Alert',
            message: `Your auto-bids have now passed ${alertPercentage}% of your allotted maximum.`,
            variant: 'danger'
          });
          setShowAutoBidAlert(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const Completionist = () => {
    setShowBidArea(false);
    return (
      <span>Bidding on this item has closed!</span>
    );
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <div className='detail--bidding-countdown'>Bidding on this item ends in {days} days, {hours} hours, {minutes} minutes and {seconds} seconds</div>;
    }
  };

  return (
    <Container>
      <div className='detail--container'>
        {showAlert &&
          <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
        {item && <ItemMarkup item={item} />}
        {item && <Countdown date={item.bidding_close_datetime} renderer={renderer} />}
        {showBidArea &&
          <>
            <BidForm />
            <AutoBidder itemId={item_id} setShowAlert={setShowAlert} setAlertOptions={setAlertOptions} />
          </>}
        {showAutoBidAlert && <AutoBidAlert autoBidAlertOptions={autoBidAlertOptions} />}
      </div>
    </Container>
  );

  async function retrieveItemData () {
    await axios.get(`api/v1/items/${item_id}`)
      .then(res => {
        setItem(res.data);
      });
    // TODO: Error handling
  }

  async function updateBidPrice () {
    const highestBid = await retrieveHighestBid(item_id);
    setCurrentPrice(highestBid.bid_amount);
    setOwnBid(highestBid.own_bid);
  }

  function ItemMarkup ({ item }) {
    return (
      <div className='detail--item'>
        <div className='detail--text'>
          <div className='detail--title'>{item.name}</div>
          <div className='detail--description'>{item.description}</div>
        </div>
        <div className='detail--photo-container'>
          <img className='detail--photo' src={`../images/${item.filename}`} alt={item.name} />
        </div>
        <div className='detail--bid-container'>
          <span className='detail--bid-price'>
            {`Current bid: $${Number(currentPrice)?.toFixed(2)}`}
            <span className='detail--own-bid-indicator'>{ownBid && ' (Your bid)'}</span>
          </span>
        </div>
      </div>
    );
  }

  function BidForm () {
    return (
      <Form onSubmit={handleSubmit} noValidate>
        <div className='detail--bid-form-grouper'>
          <div className='detail--bid-input-row'>
            <div>
              <Form.Control
                ref={bidAmountDomRef}
                type='text'
                placeholder='Enter bid'
                required
                pattern='^(\$)?\d+(\.\d{2})?$'
                onChange={() => setBidErrorMsg('')}
              />
            </div>
            <div>
              {ownBid
               ? <Button variant='primary' type='submit' disabled>Bid&nbsp;Now</Button>
                : <Button variant='primary' type='submit'>Bid&nbsp;Now</Button>}
            </div>
          </div>
          <Form.Text className='text-muted u-red'>
            {bidErrorMsg}
          </Form.Text>
        </div>
      </Form>
    );

    function validate (ev) {
      const form = ev.target;
      let formValid = true;
      Array.from(form.elements).forEach(el => {
        if (!el.checkValidity()) {
          formValid = false;
          if (el === bidAmountDomRef.current) {
            setBidErrorMsg('Enter a valid amount');
          }
        }
      });
      return formValid;
    }

    async function handleSubmit (ev) {
      ev.preventDefault();
      if (!validate(ev)) {
        return;
      }
      setShowAlert(false);
      const value = bidAmountDomRef.current.value.replace('$', '');
      const headers = { headers: { Authenticate: localStorage.token } };
      await axios.post('api/v1/bids', {
        bid: value,
        item_id: item_id
      }, headers)
        .then(res => {
          if (res.data.status === 'validated') {
            startBidResultPolling(Number(value), item_id);
            bidAmountDomRef.current.value = '';
          } else {
            setAlertOptions({
              heading: 'Bid could not be placed for the following reasons:',
              message: res.data.errors.join('\n'),
              variant: 'danger'
            });
          }
          setShowAlert(true);
        });
    }
  }

  function startBidResultPolling (amount, item_id) {
    const bidResultPollingInterval = setInterval(() => {
      const headers = { headers: { Authenticate: localStorage.token } };
      axios.get(`api/v1/bid/was-saved?amount=${amount}&item_id=${item_id}`, headers)
        .then(res => {
          clearInterval(bidResultPollingInterval);
          if (res.data && res.data.saved === true) {
            setOwnBid(true);
            setCurrentPrice(amount);
            setAlertOptions({
              heading: 'Success',
              message: 'Your bid was placed',
              variant: 'success'
            });
          } else if (res.data && res.data.saved === false) {
            setAlertOptions({
              heading: 'Bid was unsuccessful',
              message: 'Someone made a higher bid',
              variant: 'danger'
            });
          }
          setShowAlert(true);
        })
        .catch(err => {
          setAlertOptions({
            heading: 'We are experiencing techical difficulties',
            message: err,
            variant: 'danger'
          });
          setShowAlert(true);
        });
    }, 500);
  }
}

async function retrieveHighestBid (itemId) {
  let highestBid;
  const headers = { headers: { Authenticate: localStorage.token } };
  await axios.get(`api/v1/bids?get_one=highest&item_id=${itemId}`, headers)
    .then(res => {
      highestBid = res.data;
    });
  return highestBid;
}

export default Detail;
