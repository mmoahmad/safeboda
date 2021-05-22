import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DashboardRoutes } from '../../routes';
import { stopRide, getRides } from './ducks/actions';
import './styles.css';
import NoDataIndication from '../../components/NoDataIndication';
import { Alert } from 'react-bootstrap';
import { BorderedButton } from '../../elements/Button';
import haversine from 'haversine-distance';
import CreateRide from './CreateRide';

const { SearchBar, ClearSearchButton } = Search;

interface IRides {
  getRides: Function
  stopRide: Function
}

const Rides: FunctionComponent<IRides> = ({ getRides, stopRide }) => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showRideModal, setShowRideModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const getDistanceData = (rides: any) => {
    (rides || []).map((v: any) => {
      const pickup = [v.pick_up_latitude, v.pick_up_longitude];
      const destination = [v.destination_latitude, v.destination_longitude];
      let distance = haversine(pickup, destination);
      console.log(distance)
    })
  }

  const getRidesData = () => {
    setIsLoading(true);
    getRides()
      .then((resp: any) => {
        setRides(resp.rides);
        getDistanceData(resp.rides);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };
  useEffect(getRidesData, []);

  function handleSuspend(e: any, id: number) {
    e.preventDefault();
    setIsLoading(true);
    stopRide(id)
      .then((resp: any) => {
        setRides(resp.rides);
        setError(resp.error);
        resp.error && setShowError(true);
        getRidesData();
        setIsLoading(false);
      })
      .catch((err: any) => {
        return err;
      });
  }

  function getDistance(pick_up_latitude: any, pick_up_longitude: any, destination_latitude: any, destination_longitude: any) {
    if ((pick_up_latitude == destination_latitude) && (pick_up_longitude == destination_longitude)) {
      return 0;
    }
    else {
      const radpick_up_latitude = Math.PI * pick_up_latitude / 180;
      const raddestination_latitude = Math.PI * destination_latitude / 180;
      const theta = pick_up_longitude - destination_longitude;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radpick_up_latitude) * Math.sin(raddestination_latitude) + Math.cos(radpick_up_latitude) * Math.cos(raddestination_latitude) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      console.log(dist)
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344
      return dist;
    }
  }

  // useEffect(getDistanceData)

  function getRidesTableColumns() {
    return [
      {
        dataField: 'id',
        text: 'ID',
        sort: true,
        headerClasses: 'userid-header-class'
      },
      {
        dataField: 'passengerId',
        text: 'Passenger ID',
        sort: true
      },
      {
        dataField: 'driverId',
        text: 'Driver ID',
        sort: true
      },
      {
        dataField: 'status',
        text: 'Status',
        sort: true
      },
      {
        dataField: 'df1',
        text: 'Actions',
        isDummyField: true,
        headerClasses: 'username-header-class',
        formatter: (cellContent: any, row: any) => {
          return (
            <>
              <a href="#" onClick={event => {
                handleSuspend(event, row.id);
              }}>Stop</a>
            </>
          );
        }
      }
    ];
  }

  return (
    <ErrorBoundary>
      <Breadcrumb>
        <Breadcrumb.Item href={DashboardRoutes.MAIN.path}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Ride</Breadcrumb.Item>
      </Breadcrumb>
      {showError && (
        <Alert onClose={() => setShowError(false)} dismissible variant='danger'>
          {error}
        </Alert>
      )}
      <h2>Ride</h2>

      <ToolkitProvider
        keyField="id"
        data={rides || []}
        columns={getRidesTableColumns()}
        search
      >
        {
          props => (
            <>
              <BorderedButton
                type='button'
                className='float mr-2'
                onClick={() => setShowRideModal(true)}
              >
                Create Ride
              </BorderedButton>
              <ClearSearchButton className="float-right ml-1 border" {...props.searchProps} />
              <SearchBar {...props.searchProps} tableId="rides" />
              <BootstrapTable
                {...props.baseProps}
                noDataIndication={() => <NoDataIndication loading={isLoading} />}
                defaultSorted={[{ dataField: 'id', order: 'asc' }]}
              />
            </>
          )
        }
      </ToolkitProvider>

      <CreateRide
        showRideModal={showRideModal}
        closeRideModal={() => setShowRideModal(false)}
        getRidesData={getRidesData}
      />
    </ErrorBoundary>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getRides: () => dispatch(getRides()),
    stopRide: (id: number) => dispatch(stopRide(id))
  };
};

export default connect(null, mapDispatchToProps)(Rides);
