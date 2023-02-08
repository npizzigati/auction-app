import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from '../axiosWithConfig.js';
import { useNavigate } from 'react-router-dom';

import authenticate from '../utilities/misc_utils.js';
import DismissibleAlert from '../components/DismissibleAlert';

function AutoBidderConfig ({ userId }) {
  const navigate = useNavigate();
  const [maxAutoBidErrorMsg, setMaxAutoBidErrorMsg] = useState('');
  const [autoBidAlertPercentageErrorMsg, setAutoBidAlertPercentageErrorMsg] = useState('');
  const [autoBidConfig, setAutoBidConfig] = useState(null);
  const [role, setRole] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState('');
  const maxAutoBidDomRef = useRef(null);
  const autoBidAlertPercentageDomRef = useRef(null);

  useEffect(() => {
    (async () => authenticate({ notSignedInRedirect: '/login' }, setRole, navigate))();
    (async () => {
      await getExistingAutoBidConfigSettings();
    })();
    setSettingsSaved(false);
  }, []);

  return (
    <Container className='u-max-width-35'>
      {showAlert &&
        <DismissibleAlert alertOptions={alertOptions} onClose={() => setShowAlert(false)} />}
      <div className='autobidder-config--title'>Auto-Bidder Settings</div>
      <Form onSubmit={saveAutoBidder} noValidate>
        <Form.Group className='mb-3' controlId='formAutoBidMax'>
          <Form.Label className='mb-0'>Maximum Bid Amount</Form.Label>
          <div />
          <Form.Text className='text-muted'>
            Automatically bid in $1.00 increments
            up to this maximum. Note that the maximum is
            split between all the items where you have
            auto-bidding active.
          </Form.Text>
          <Form.Control
            ref={maxAutoBidDomRef}
            defaultValue={autoBidConfig ? Number(autoBidConfig.max).toFixed(2) : ''}
            type='text'
            required
            pattern='^(\$)?\d+(\.\d{2})?$'
            onChange={handleMaxChange}
          />
          <Form.Text className='text-muted u-red'>
            {maxAutoBidErrorMsg}
          </Form.Text>
        </Form.Group>
        <hr />
        <div />
        <Form.Group className='mb-3' controlId='formAutoBidAlert'>
          <div />
          <Form.Label className='mb-0'>Alert Percentage</Form.Label>
          <div />
          <Form.Text className='text-muted'>
            Get an alert when bidding reaches this
            percentage of maximum.
          </Form.Text>
          <Form.Control
            ref={autoBidAlertPercentageDomRef}
            defaultValue={autoBidConfig ? autoBidConfig.alertPercentage : ''}
            type='text'
            pattern='^(100%?)|(\d{0,2}%?)$'
            onChange={handlePercentChange}
          />
          <Form.Text className='text-muted u-red'>
            {autoBidAlertPercentageErrorMsg}
          </Form.Text>
        </Form.Group>
        <div className='autobidder-config--footer'>
          {settingsSaved
            ? <Button className='autobidder-config--button' type='submit' variant='success' disabled>
                Settings Saved
              </Button>
            : <Button className='autobidder-config--button' type='submit' variant='primary'>
                Save Settings
              </Button>
          }
        </div>
      </Form>
    </Container>
  );

  function handleMaxChange () {
    setSettingsSaved(false);
    setMaxAutoBidErrorMsg('');
  }

  function handlePercentChange () {
    setSettingsSaved(false);
    setAutoBidAlertPercentageErrorMsg('');
  }

  function validate (ev) {
    const form = ev.target;
    let formValid = true;
    Array.from(form.elements).forEach(el => {
      if (!el.checkValidity()) {
        formValid = false;
        if (el === maxAutoBidDomRef.current) {
          setMaxAutoBidErrorMsg('Enter a valid currency amount');
        } else if (el === autoBidAlertPercentageDomRef.current) {
          setAutoBidAlertPercentageErrorMsg('Enter a valid percentage, from 0 to 100 (whole numbers only)');
        }
      }
    });
    return formValid;
  }

  async function saveAutoBidder (ev) {
    ev.preventDefault();
    if (!validate(ev)) {
      return;
    }
    // setShowAlert(false);

    let save, saveUrl;
    if (autoBidConfig) {
      save = axios.patch;
      saveUrl = `api/v1/autobid_configs/${autoBidConfig.id}`;
    } else {
      save = axios.post;
      saveUrl = 'api/v1/autobid_configs';
    }

    const headers = { headers: { Authenticate: localStorage.token } };
    await save(saveUrl, {
      max: maxAutoBidDomRef.current.value.replace('$', ''),
      alert_percentage: autoBidAlertPercentageDomRef.current.value.replace('%', '')
    }, headers)
      .then(res => {
        if (res.data.status === 'created' || res.data.status === 'updated') {
          const { id, max, alert_percentage } = res.data.autobid_config;
          refreshFields(max, alert_percentage);
          setAutoBidConfig({ id: id, max: max, alertPercentage: alert_percentage });
          setSettingsSaved(true);
        } else {
          setAlertOptions({
            heading: 'Auto-bid settings could not be saved due to the following error(s):',
            message: res.data.errors.join('\n'),
            variant: 'danger'
          });
          setShowAlert(true);
        }
      });
    // TODO: Error handling
  }

  function refreshFields (max, alertPercentage) {
    maxAutoBidDomRef.current.value = Number(max).toFixed(2);
    autoBidAlertPercentageDomRef.current.value = alertPercentage;
  }

  async function getExistingAutoBidConfigSettings () {
    const headers =
          {
            headers:
            {
              Authenticate: localStorage.token,
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              Expires: '0'
            }
          };

    await axios.get('api/v1/autobid_configs?get_one=user', headers)
      .then(res => {
        if (res.data && res.data.id !== undefined) {
          const { id, max, alert_percentage } = res.data;
          setAutoBidConfig({ id: id, max: max, alertPercentage: alert_percentage });
        } else {
          setSettingsSaved(false);
        }
      })
      .catch(err => {
        setAlertOptions({
          heading: 'We are experiencing technical difficulties.',
          message: `Error: ${err}`,
          variant: 'danger'
        });
    });
  }
}

export default AutoBidderConfig;
