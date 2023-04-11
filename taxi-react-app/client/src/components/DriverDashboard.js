// client/src/components/DriverDashboard.js

import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import TripCard from './TripCard';
import { getTrips } from '../services/TripService';

function DriverDashboard (props) {
  const [trips, setTrips] = useState([]);

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

  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  const getRequestedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'REQUESTED';
    });
  }

  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <TripCard
        title='Current Trip'
        trips={getCurrentTrips()}
        group='driver'
        otherGroup='rider'
      />
      <TripCard
        title='Requested Trips'
        trips={getRequestedTrips()}
        group='driver'
        otherGroup='rider'
      />
      <TripCard
        title='Recent Trips'
        trips={getCompletedTrips()}
        group='driver'
        otherGroup='rider'
      />
    </>
  );
}

export default DriverDashboard;
