import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AutoBidAlert ({ autoBidAlertOptions }) {
  return (
    <Alert variant={autoBidAlertOptions.variant}>
      <span className='u-small-text'>{autoBidAlertOptions.message}</span>
    </Alert>
  );
}

export default AutoBidAlert;
