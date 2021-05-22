import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DashboardRoutes } from '../../routes';
import { getPassengers } from './ducks/actions';
import './styles.css';
import NoDataIndication from '../../components/NoDataIndication';
import { Alert } from 'react-bootstrap';
import { BorderedButton } from '../../elements/Button';
import CreatePassenger from './CreatePassenger';

const { SearchBar, ClearSearchButton } = Search;

interface IPassengers {
  getPassengers: Function
  deletePassenger: Function
}

const Passengers: FunctionComponent<IPassengers> = ({ getPassengers, deletePassenger }) => {
  const [passangers, setPassengers] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPassengersData = () => {
    setIsLoading(true);
    getPassengers()
      .then((resp: any) => {
        setPassengers(resp.passengers);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };
  useEffect(getPassengersData, []);

  function getPassengersTableColumns() {
    return [
      {
        dataField: 'id',
        text: 'ID',
        sort: true,
        headerClasses: 'userid-header-class'
      },
      {
        dataField: 'name',
        text: 'Name',
        sort: true
      },
      {
        dataField: 'phoneNumber',
        text: 'Phone Number',
        sort: true
      }
    ];
  }

  return (
    <ErrorBoundary>
      <Breadcrumb>
        <Breadcrumb.Item href={DashboardRoutes.MAIN.path}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Passenger</Breadcrumb.Item>
      </Breadcrumb>
      {showError && (
        <Alert onClose={() => setShowError(false)} dismissible variant='danger'>
          {error}
        </Alert>
      )}
      <h2>Passenger</h2>

      <ToolkitProvider
        keyField="id"
        data={passangers || []}
        columns={getPassengersTableColumns()}
        search
      >
        {
          props => (
            <>
              <BorderedButton
                type='button'
                className='float mr-2'
                onClick={() => setShowPassengerModal(true)}
              >
                Create Passenger
              </BorderedButton>
              <ClearSearchButton className="float-right ml-1 border" {...props.searchProps} />
              <SearchBar {...props.searchProps} tableId="passangers" />
              <BootstrapTable
                {...props.baseProps}
                noDataIndication={() => <NoDataIndication loading={isLoading} />}
                defaultSorted={[{ dataField: 'id', order: 'asc' }]}
              />
            </>
          )
        }
      </ToolkitProvider>

      <CreatePassenger
        showPassengerModal={showPassengerModal}
        closePassengerModal={() => setShowPassengerModal(false)}
        getPassengersData={getPassengersData}
      />
    </ErrorBoundary>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPassengers: () => dispatch(getPassengers())
  };
};

export default connect(null, mapDispatchToProps)(Passengers);
