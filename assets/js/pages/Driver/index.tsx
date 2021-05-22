import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DashboardRoutes } from '../../routes';
import { deleteDriver, getDrivers } from './ducks/actions';
import { formatDateTime } from '../../utils/datetime';
import './styles.css';
import NoDataIndication from '../../components/NoDataIndication';
import { Alert } from 'react-bootstrap';
import { BorderedButton } from '../../elements/Button';
import CreateDriver from './CreateDriver';

const { SearchBar, ClearSearchButton } = Search;

interface IDrivers {
  getDrivers: Function
  deleteDriver: Function
}

const Drivers: FunctionComponent<IDrivers> = ({ getDrivers, deleteDriver }) => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDriversData = () => {
    setIsLoading(true);
    getDrivers()
      .then((resp: any) => {
        setDrivers(resp.result);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        return err;
      });
  };
  useEffect(getDriversData, []);

  function handleDelete(e: any, id: number) {
    e.preventDefault();
    setIsLoading(true);
    deleteDriver(id)
      .then((resp: any) => {
        setDrivers(resp.result);
        setError(resp.error);
        resp.error && setShowError(true);
        getDriversData();
        setIsLoading(false);
      })
      .catch((err: any) => {
        return err;
      });
  }

  function getDriversTableColumns() {
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
        dataField: 'phone_number',
        text: 'Phone Number',
        sort: true
      },
      {
        dataField: 'is_suspended',
        text: 'Suspended',
        sort: true
      },
      {
        dataField: 'inserted_at',
        text: 'Inserted At',
        formatter: formatDateTime,
        sort: true,
        headerClasses: 'email-header-class'
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
                handleDelete(event, row.id);
              }}>Delete</a>
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
        <Breadcrumb.Item active>Driver</Breadcrumb.Item>
      </Breadcrumb>
      {showError && (
        <Alert onClose={() => setShowError(false)} dismissible variant='danger'>
          {error}
        </Alert>
      )}
      <h2>Driver</h2>

      <ToolkitProvider
        keyField="id"
        data={drivers || []}
        columns={getDriversTableColumns()}
        search
      >
        {
          props => (
            <>
              <BorderedButton
                type='button'
                className='float mr-2'
                onClick={() => setShowDriverModal(true)}
              >
                Create Driver
              </BorderedButton>
              <ClearSearchButton className="float-right ml-1 border" {...props.searchProps} />
              <SearchBar {...props.searchProps} tableId="drivers" />
              <BootstrapTable
                {...props.baseProps}
                noDataIndication={() => <NoDataIndication loading={isLoading} />}
                defaultSorted={[{ dataField: 'id', order: 'asc' }]}
              />
            </>
          )
        }
      </ToolkitProvider>

      <CreateDriver
        showDriverModal={showDriverModal}
        closeDriverModal={() => setShowDriverModal(false)}
        getDriversData={getDriversData}
      />
    </ErrorBoundary>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDrivers: () => dispatch(getDrivers()),
    deleteDriver: (id: number) => dispatch(deleteDriver(id))
  };
};

export default connect(null, mapDispatchToProps)(Drivers);
