import React, { FunctionComponent } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const CheckField: FunctionComponent<any> = ({ formLabel, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label className='d-block'>{formLabel}</Form.Label>
      { props.type === 'radio' ?
        (options || []).map((v: any, k: any) =>
          <Form.Check {...field} {...props} inline value={v.value} checked={meta.value === v.value} label={v.label} id={props.name + k} key={props.name + k} />
        ) :
        (options || []).map((v: any, k: any) =>
          <Form.Check {...field} {...props} inline value={v.value} label={v.label} id={props.name + k} key={props.name + k} />
        )
      }
      {meta.touched && meta.error &&
      (<Form.Text className='text-danger'>{meta.error}</Form.Text>)}
    </Form.Group>
  );
};

export default CheckField;
