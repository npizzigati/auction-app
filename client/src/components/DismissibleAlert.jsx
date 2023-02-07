import React from 'react';
import Alert from 'react-bootstrap/Alert';

function DismissibleAlert ({ onClose, alertOptions }) {
  return (
    <Alert variant={alertOptions.variant} onClose={onClose} dismissible>
      <Alert.Heading>{alertOptions.heading}</Alert.Heading>
      <p>
        {alertOptions.message}
      </p>
    </Alert>
  );
}

export default DismissibleAlert;
