// client/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Container, Form, Nav, Navbar
} from 'react-bootstrap'; // changed
import { isRider } from './services/AuthService'; // new
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // new

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


import 'react-toastify/dist/ReactToastify.css'; // new
import './App.css';

import Driver from './components/Driver';
import Rider from './components/Rider';


import DriverDashboard from './components/DriverDashboard';
import DriverDetail from './components/DriverDetail';

import RiderDashboard from './components/RiderDashboard';
import RiderDetail from './components/RiderDetail';
import RiderRequest from './components/RiderRequest';





function App () {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('taxi.auth') !== null;
  });

  const logIn = async (username, password) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'taxi.auth', JSON.stringify(response.data)
      );
      setLoggedIn(true);
      return { response, isError: false };
    } catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };

  // new
  const logOut = () => {
    window.localStorage.removeItem('taxi.auth');
    setLoggedIn(false);
  };

  return (
    <Routes>
      {/* changed */}
      <Route
        path='/'
        element={
          <Layout
            isLoggedIn={isLoggedIn}
            logOut={logOut}
          />
        }
      >
        <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route
          path='sign-up'
          element={
            <SignUp isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='log-in'
          element={
            <LogIn
              isLoggedIn={isLoggedIn}
              logIn={logIn}
            />
          }
        />
        <Route path='rider' element={<Rider />}>
      <Route index element={<RiderDashboard />} />
      <Route path='request' element={<RiderRequest />} /> {/* new */}
      <Route path=':id' element={<RiderDetail />} />
      </Route>
      <Route path='driver' element={<Driver />}>
      <Route index element={<DriverDashboard />} />
      <Route path=':id' element={<DriverDetail />} />
      </Route>
      </Route>
    </Routes>
  );
}



function Layout ({ isLoggedIn, logOut }) {
  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>Taxi</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* new */}
            {
              isRider() && (
                <Nav className='me-auto'>
                  <LinkContainer to='/rider/request'>
                    <Nav.Link data-cy='request-trip'>Request a trip</Nav.Link>
                  </LinkContainer>
                </Nav>
              )
            }
            {
              isLoggedIn && (
                <Form className='ms-auto'>
                  <Button type='button' data-cy='logOut' onClick={() => logOut()}>Log out</Button>
                </Form>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='pt-3'>
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}


export default App;
