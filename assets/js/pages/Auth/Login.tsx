import React, { useState, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { authenticateUserAction } from './ducks/actions';
import { AppRoutes } from '../../routes';
import TextField from '../../elements/Form/TextField';
import BorderedButton from '../../elements/Button/BorderedButton';
import FilledButton from '../../elements/Button/FilledButton';

interface ILogin {
  authenticateUser: any;
  history: any;
}

const initStates = {
  email: '',
  password: ''
};

const validation = Yup.object({
  email: Yup.string()
    .email('Please enter valid email.')
    .required('Please enter your email.'),
  password: Yup.string().required('Please enter your password')
});

const Login: FunctionComponent<ILogin> = ({ authenticateUser, history }) => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const searchQuery = useLocation().search;
  const path = useLocation().pathname.replace("/login/", "");
  const redirectTo = new URLSearchParams(searchQuery ? searchQuery : path).get('redirect');
  const handleSubmit = (values: any, { setErrors }: any) => {
    setIsLoading(true);
    handleSubmission(true);
    const { email, password } = values;
    authenticateUser(email, password)
      .then((resp: any) => {
        if (resp) {
          setIsLoading(false);
          history.push(redirectTo ? redirectTo : AppRoutes.DASHBOARD.path);
        }
        handleSubmission(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        let fieldError = {};
        if (error && error.response.data.message) {
          handleErrorMsg(error.response.data.message);
        }
        if (error.email) {
          fieldError = error.email;
        }
        if (error.password) {
          fieldError = error.password;
        }
        setErrors(fieldError);
        handleSubmission(false);
        setShow(true);
      });
  };

  const handleClear = () => {
    setShow(false);
    document.getElementById('email')?.focus();
  };

  const handleOnPaste = (e: any) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    const password = document.getElementById('password');
    if (password) {
      password.addEventListener('paste', handleOnPaste, false);
    }

    return () => {
      if (password) {
        password.removeEventListener('paste', handleOnPaste, false);
      }
    };
  });

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>Login</Card.Title>
      <Card.Body>
        {errorMsg && show && (
          <Alert onClose={() => setShow(false)} dismissible variant='danger'>
            {errorMsg}
          </Alert>
        )}
        <Formik
          initialValues={initStates}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextField
              label='Email'
              name='email'
              type='text'
              placeholder='Email'
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              placeholder='Password'
            />
            <FilledButton
              type='submit'
              disabled={isSubmitting}
              className='ml-2 float-right'
              isLoading={isLoading}
            >
              Login
            </FilledButton>
            <BorderedButton type='reset' className='float-right' onClick={handleClear}>
              Clear
            </BorderedButton>
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    authenticateUser: (email: string, password: string) =>
      dispatch(authenticateUserAction(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Login);
