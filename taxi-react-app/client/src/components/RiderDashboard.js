import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import TripCard from './TripCard';

import { connect, getTrips, messages } from '../services/TripService'; // changed



function RiderDashboard (props) {
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

  useEffect(() => {
    connect();
    const subscription = messages.subscribe((message) => {
      setTrips(prevTrips => [
        ...prevTrips.filter(trip => trip.id !== message.data.id),
        message.data
      ]);
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setTrips]);
  

  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return (
        trip.driver !== null &&
        trip.status !== 'REQUESTED' &&
        trip.status !== 'COMPLETED'
      );
    });
  };

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
      <TripCard
        title='Current Trip'
        trips={getCurrentTrips()}
        group='rider'
        otherGroup='driver'
      />
      <TripCard
        title='Recent Trips'
        trips={getCompletedTrips()}
        group='rider'
        otherGroup='driver'
      />
    </>
  );
}

export default RiderDashboard;