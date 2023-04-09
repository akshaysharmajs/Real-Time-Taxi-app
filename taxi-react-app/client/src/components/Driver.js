import React, { useEffect, useState } from 'react'; // changed
import { Breadcrumb } from 'react-bootstrap'; // changed
import { Navigate } from 'react-router-dom';

import TripCard from './TripCard'; // new
import { isDriver } from '../services/AuthService';
import { getTrips } from '../services/TripService'; // new

function Driver (props) {
  // new
  const [trips, setTrips] = useState([]);

  // new
  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    };
    loadTrips();
  }, []);

  // new
  if (!isDriver()) {
    return <Navigate to='/' />;
  }

    // new
    const getCurrentTrips = () => {
      return trips.filter(trip => {
        return trip.driver !== null && trip.status !== 'COMPLETED';
      });
    };
  
    // new
    const getRequestedTrips = () => {
      return trips.filter(trip => {
        return trip.status === 'REQUESTED';
      });
    };
  
    // new
    const getCompletedTrips = () => {
      return trips.filter(trip => {
        return trip.status === 'COMPLETED';
      });
    };
    
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

    {/* changed */}
    <TripCard
      title='Current Trip'
      trips={getCurrentTrips()}
      group='driver'
      otherGroup='rider'
    />

    {/* changed */}
    <TripCard
      title='Requested Trips'
      trips={getRequestedTrips()}
      group='driver'
      otherGroup='rider'
    />

    {/* changed */}
    <TripCard
      title='Recent Trips'
      trips={getCompletedTrips()}
      group='driver'
      otherGroup='rider'
    />
    </>
  );
}

export default Driver;