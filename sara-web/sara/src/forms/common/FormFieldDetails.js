import { Button, Typography } from '@material-ui/core';
import React from 'react';
import TextFormControl from './TextFormControl';

const FormFieldDetails = props => {
 return (
  <div className="container">
   <Typography variant="h4">{props.title}</Typography>
   <form>
    {props.fields.map(field => (
     <TextFormControl type={field.type} label={field.label}
      name={field.name} value={field.value}
      changeState={props.changeState} />
    ))}
    <Button variant="contained" color="primary" onClick={() => props.save()}>Save</Button>&nbsp;
    <Button variant="contained" color="primary" onClick={() => props.cancel()}>Cancel</Button>
   </form>
  </div>
 )
}
export default FormFieldDetails;