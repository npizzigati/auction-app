import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosWithConfig.js';
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';

import DismissibleAlert from '../components/DismissibleAlert.jsx';
import authenticate from '../utilities/misc_utils.js';

function Login () {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const alertText = {
    heading: 'Login Unsuccessful',
    message: 'Check your username and password',
    variant: 'danger'
  };

  useEffect(() => {
    (async () => authenticate({ signedInRedirect: '/' }, null, navigate))();
  }, []);

  return (
    <Container>
      <LoginForm />
    </Container>
  );

  function LoginForm () {
    const usernameDomRef = useRef(null);
    const passwordDomRef = useRef(null);
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <div className='login--form-container'>
            {showAlert && <DismissibleAlert onClose={() => setShowAlert(false)} alertText={alertText} />}
            <Form.Control ref={usernameDomRef} type='text' placeholder='Username' required />
            <Form.Control ref={passwordDomRef} type='password' placeholder='Password' required />
            <Button variant='primary' type='submit'>
              Log In
            </Button>
          </div>
        </Form>
      </>
    );

    async function handleSubmit (ev) {
      ev.preventDefault();
      await axios.post('api/v1/sessions', {
        username: usernameDomRef.current.value,
        password: passwordDomRef.current.value
      })
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            navigate('/');
          } else {
            setShowAlert(true);
          }
        });
    }
  }
}

export default Login;
