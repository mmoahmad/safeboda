import React, { FunctionComponent } from 'react';

interface INoData {
  loading: boolean
}

const NoDataIndication: FunctionComponent<INoData> = ({ loading }) => (
  <>
    {
      loading ? (
        <div className="spinner">
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      ) : ''
    }
    <div className="text-center">{loading ? 'Loading...' : 'No data found!'}</div>
  </>
);

export default NoDataIndication;
