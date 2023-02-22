// client/components/SignUp.js

import React from 'react';
import { Breadcrumb, Card } from 'react-bootstrap'; // new
import { Link } from 'react-router-dom';

// changed
function SignUp (props) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/#/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Header>Sign up</Card.Header>
        <Card.Body>
          <Card.Text className='text-center'>
            Already have an account? <Link to='/log-in'>Log in!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default SignUp;
