import React, { FunctionComponent } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;

const TextField: FunctionComponent<any> = ({ label, addEyeIcon, onEyeClick, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label>{label}</Form.Label>
      {
        addEyeIcon ? (
          <div className="pass-wrapper">
            <Form.Control {...field} {...props} />
            <i onClick={onEyeClick}>{eye}</i>
          </div>
        ) : (
          <Form.Control {...field} {...props} />
        )
      }
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default TextField;
