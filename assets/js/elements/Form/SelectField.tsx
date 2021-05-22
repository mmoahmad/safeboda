import React, { FunctionComponent } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const SelectField: FunctionComponent<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...field} {...props} as="select" custom>
        <option value="">Select an option</option>
        {
          (props.options || []).map((v: any, k: any) => typeof v === 'object'
            ? (<option value={v.key} key={k}>{v.value}</option>)
            : (<option value={v} key={k}>{v}</option>))
        }
      </Form.Control>
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default SelectField;
