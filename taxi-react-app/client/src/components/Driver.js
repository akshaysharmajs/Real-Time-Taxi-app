import React from 'react';
import { Breadcrumb, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; // new

import { isDriver } from '../services/AuthService'; // new

function Driver (props) {
  // new
  if (!isDriver()) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Card className='mb-3'>
        <Card.Header>Current Trip</Card.Header>
        <Card.Body>
          No trips.
        </Card.Body>
      </Card>
      <Card className='mb-3'>
        <Card.Header>Requested Trips</Card.Header>
        <Card.Body>
          No trips.
        </Card.Body>
      </Card>
      <Card className='mb-3'>
        <Card.Header>Recent Trips</Card.Header>
        <Card.Body>
          No trips.
        </Card.Body>
      </Card>
    </>
  );
}

export default Driver;