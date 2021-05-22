import React, { useState, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Alert, Card, Modal, Row, Col } from 'react-bootstrap';
import { TextField, SelectField } from '../../elements/Form';
import { FilledButton, BorderedButton } from '../../elements/Button';
import { createRide, getDrivers, getPassengers } from './ducks/actions';

const successNotification = 'Ride has been successfully created.';
const errorNotification = 'Passenger or already driver have an ongoing ride.';

interface ICreateRide {
  createRide: Function;
  showRideModal: boolean;
  closeRideModal: any;
  getRidesData: Function;
  getDrivers: Function;
  getPassengers: Function;
}

const validation = Yup.object({
  driver_id: Yup.number().required('Please select a driver'),
  passenger_id: Yup.number().required('Please select a passenger'),
  pick_up_latitude: Yup.number().required('Pickup latitude should not be empty.'),
  pick_up_longitude: Yup.number().required('Pickup longitude should not be empty.'),
  destination_latitude: Yup.number().required('Destination latitude should not be empty.'),
  destination_longitude: Yup.number().required('Destination longitude should not be empty.')
});

const CreateRide: FunctionComponent<ICreateRide> = ({ createRide, closeRideModal, showRideModal, getRidesData, getDrivers, getPassengers }) => {
  const rideData = {
    driver_id: '',
    passenger_id: '',
    pick_up_latitude: '',
    pick_up_longitude: '',
    destination_latitude: '',
    destination_longitude: ''
  };
  const [drivers, setDrivers] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [errorMsg, handleErrorMsg] = useState('');
  const [successMsg, handleSuccessMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initStates = rideData;

  const getDriversData = () => {
    getDrivers()
      .then((resp: any) => {
        setDrivers((resp.drivers || []).filter((d: any) => { return !d.isSuspended }).map((v: any) => {
          return { value: v.name, key: v.id }
        }));
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };

  useEffect(getDriversData, []);

  const getPassengersData = () => {
    getPassengers()
      .then((resp: any) => {
        setPassengers((resp.passengers || []).map((v: any) => {
          return { value: v.name, key: v.id }
        }));
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };

  useEffect(getPassengersData, []);

  const handleSubmit = (values: any, { setErrors }: any) => {
    setIsLoading(true);
    handleSubmission(true);
    handleSuccessMsg('');
    handleErrorMsg('');
    const data = { ...values }
    delete data.driver_id
    delete data.passenger_id
    createRide(data, values.passenger_id, values.driver_id)
      .then((resp: any) => {
        getRidesData();
        setIsLoading(false);
        handleSubmission(false);
        setShow(true);
        handleSuccessMsg(successNotification);
      })
      .catch((err: any) => {
        console.log(err)
        setIsLoading(false);
        setShow(true);
        handleErrorMsg(errorNotification);
        return err;
      });
  };

  return (
    <Modal
      backdrop="static"
      show={showRideModal}
      onHide={() => {
        setShow(false);
        closeRideModal(false);
      }}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>
          <Card.Title className='text-center'>Create Ride</Card.Title>
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
            <SelectField
              label='Driver'
              name='driver_id'
              type="select"
              options={drivers}
            />
            <SelectField
              label='Passenger'
              name='passenger_id'
              type="select"
              options={passengers}
            />
            <Row>
              <Col>
                <TextField
                  label="Pickup Latitude"
                  name='pick_up_latitude'
                  type='number'
                />
              </Col>
              <Col>
                <TextField
                  label="Pickup Longitude"
                  name='pick_up_longitude'
                  type='number'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Destination Latitude"
                  name='destination_latitude'
                  type='number'
                />
              </Col>
              <Col>
                <TextField
                  label="Destination Longitude"
                  name='destination_longitude'
                  type='number'
                />
              </Col>
            </Row>
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
    getDrivers: () => dispatch(getDrivers()),
    getPassengers: () => dispatch(getPassengers()),
    createRide: (ride: any, passenger_id: number, driver_id: number) => dispatch(createRide(ride, passenger_id, driver_id))
  };
};

export default connect(null, mapDispatchToProps)(CreateRide);
