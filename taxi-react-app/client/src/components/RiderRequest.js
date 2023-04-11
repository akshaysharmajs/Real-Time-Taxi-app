// client/src/components/RiderRequest.js

import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Form
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { getUser } from '../services/AuthService';
import { createTrip } from '../services/TripService';

function RiderRequest (props) {
  const [isSubmitted, setSubmitted] = useState(false);

  const onSubmit = (values, actions) => {
    const rider = getUser();
    createTrip({
      pick_up_address: values.pickUpAddress,
      drop_off_address: values.dropOffAddress,
      rider: rider.id
    });
    setSubmitted(true);
  };

  if (isSubmitted) {
    return <Navigate to='/rider' />;
  }

  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to='/rider'>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Request</Breadcrumb.Item>
      </Breadcrumb>
      <Card className='mb-3'>
        <Card.Header>Request Trip</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              pickUpAddress: '',
              dropOffAddress: ''
            }}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              isSubmitting,
              values
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='pickUpAddress'>
                  <Form.Label>Pick up address:</Form.Label>
                  <Form.Control
                    data-cy='pick-up-address'
                    name='pickUpAddress'
                    onChange={handleChange}
                    values={values.pickUpAddress}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='dropOffAddress'>
                  <Form.Label>Drop off address:</Form.Label>
                  <Form.Control
                    data-cy='drop-off-address'
                    name='dropOffAddress'
                    onChange={handleChange}
                    values={values.dropOffAddress}
                  />
                </Form.Group>
                <div className='d-grid'>
                  <Button
                    data-cy='submit'
                    disabled={isSubmitting}
                    type='submit'
                    variant='primary'
                  >Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  )
}

export default RiderRequest;
