import React, { memo, FunctionComponent } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const BorderedButton: FunctionComponent<any> = ({
  children,
  isLoading,
  ...rest
}) => {
  return (
    <Button variant='dark' {...rest}>
      {children}
      {isLoading && (
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        />
      )}
    </Button>
  );
};

export default memo(BorderedButton);
