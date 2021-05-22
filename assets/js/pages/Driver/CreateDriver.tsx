import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Alert, Card, Modal} from 'react-bootstrap';
import { TextField } from '../../elements/Form';
import { FilledButton, BorderedButton } from '../../elements/Button';
import { createDriver } from './ducks/actions';

const successNotification = 'Driver has been successfully created.';

interface ICreateDriver {
  createDriver: Function;
  showDriverModal: boolean;
  closeDriverModal: any;
  getDriversData: Function;
}

const validation = Yup.object({
  name: Yup.string().required('Entry fee should not be empty.'),
  phone_number: Yup.string().required('Transaction fee should not be empty.')
});

const CreateDriver: FunctionComponent<ICreateDriver> = ({ createDriver, closeDriverModal, showDriverModal, getDriversData }) => {
  const driverData = {
    name: '',
    phone_number: ''
  };
  const [errorMsg, handleErrorMsg] = useState('');
  const [successMsg, handleSuccessMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initStates = driverData;

  const handleSubmit = (values: any, { setErrors }: any) => {
    setIsLoading(true);
    handleSubmission(true);
    handleSuccessMsg('');
    handleErrorMsg('');
    createDriver(values)
      .then((resp: any) => {
        getDriversData();
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
      show={showDriverModal}
      onHide={() => {
        setShow(false);
        closeDriverModal(false);
      }}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>
          <Card.Title className='text-center'>Create Driver</Card.Title>
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
    createDriver: (driver: any) => dispatch(createDriver(driver))
  };
};

export default connect(null, mapDispatchToProps)(CreateDriver);
