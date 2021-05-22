import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Alert, Card, Modal} from 'react-bootstrap';
import { TextField } from '../../elements/Form';
import { FilledButton, BorderedButton } from '../../elements/Button';
import { createPassenger } from './ducks/actions';

const successNotification = 'Passenger has been successfully created.';

interface ICreatePassenger {
  createPassenger: Function;
  showPassengerModal: boolean;
  closePassengerModal: any;
  getPassengersData: Function;
}

const validation = Yup.object({
  name: Yup.string().required('Name should not be empty.'),
  phone_number: Yup.string().required('Phone number should not be empty.')
});

const CreatePassenger: FunctionComponent<ICreatePassenger> = ({ createPassenger, closePassengerModal, showPassengerModal, getPassengersData }) => {
  const passangerData = {
    name: '',
    phone_number: ''
  };
  const [errorMsg, handleErrorMsg] = useState('');
  const [successMsg, handleSuccessMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initStates = passangerData;

  const handleSubmit = (values: any, { setErrors }: any) => {
    setIsLoading(true);
    handleSubmission(true);
    handleSuccessMsg('');
    handleErrorMsg('');
    createPassenger(values)
      .then((resp: any) => {
        getPassengersData();
        setIsLoading(false);
        handleSubmission(false);
        setShow(true);
        handleSuccessMsg(successNotification);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };

  return (
    <Modal
      backdrop="static"
      show={showPassengerModal}
      onHide={() => {
        setShow(false);
        closePassengerModal(false);
      }}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>
          <Card.Title className='text-center'>Create Passenger</Card.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && show && (
          <Alert onClose={() => setShow(false)} dismissible variant='danger'>
            {errorMsg}
          </Alert>
        )}
        {successMsg && show && (
          <Alert onClose={() => setShow(false)} dismissible variant='success'>
            {successMsg}
          </Alert>
        )}
        <Formik
          initialValues={initStates}
          validationSchema={validation}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          <Form>
            <TextField
              label="Name"
              name='name'
              type='text'
            />
            <TextField
              label="Phone Number"
              name='phone_number'
              type='text'
            />
            <FilledButton
              type='submit'
              disabled={isSubmitting}
              isLoading={isLoading}
              className='ml-2 float-right'
            >
              Create
              </FilledButton>
            <BorderedButton type='reset' onClick={() => setShow(false)} className='float-right'>
              Clear
              </BorderedButton>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createPassenger: (passanger: any) => dispatch(createPassenger(passanger))
  };
};

export default connect(null, mapDispatchToProps)(CreatePassenger);
