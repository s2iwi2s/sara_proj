import React from 'react';
import { Grid, MenuItem, TextField } from "@material-ui/core";

export default function SelectGrid({ sm, name, label, options, ...rest }) {
 return (<>
  <Grid item xs={12} sm={sm}>
   <TextField id={name}
    select
    name={name}
    label={label}
    variant="filled"
    fullWidth
    InputLabelProps={{ shrink: true }}
    autoComplete={label + "-" + name}
    {...rest}
   >
    {options.map(({ id, description }) => (
     <MenuItem key={id} value={id}>{description}</MenuItem>
    ))}
   </TextField>
  </Grid>
 </>)
}