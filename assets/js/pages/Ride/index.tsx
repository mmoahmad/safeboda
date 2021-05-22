import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DashboardRoutes } from '../../routes';
import { stopRide, unSuspendRide, getRides } from './ducks/actions';
import './styles.css';
import NoDataIndication from '../../components/NoDataIndication';
import { Alert } from 'react-bootstrap';
import { BorderedButton } from '../../elements/Button';
import CreateRide from './CreateRide';

const { SearchBar, ClearSearchButton } = Search;

interface IRides {
  getRides: Function
  stopRide: Function
  unSuspendRide: Function
}

const Rides: FunctionComponent<IRides> = ({ getRides, stopRide, unSuspendRide }) => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showRideModal, setShowRideModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRidesData = () => {
    setIsLoading(true);
    getRides()
      .then((resp: any) => {
        setRides(resp.rides);
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

  function handleUnSuspend(e: any, id: number) {
    e.preventDefault();
    setIsLoading(true);
    unSuspendRide(id)
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
            {row.isSuspended ? 
              <a href="#" onClick={event => {
                handleUnSuspend(event, row.id);
              }}>UnSuspend</a>
              :
              <a href="#" onClick={event => {
                handleSuspend(event, row.id);
              }}>Suspend</a>
            }
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
