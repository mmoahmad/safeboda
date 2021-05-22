import React, { FunctionComponent } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const TextAreaField: FunctionComponent<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label>{label}</Form.Label>
      {
        <Form.Control as="textarea" {...field} {...props} />
      }
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default TextAreaField;
