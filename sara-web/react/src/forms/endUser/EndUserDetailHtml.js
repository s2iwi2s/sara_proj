import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextFormControl from '../common/TextFormControl';
import { Button } from '@material-ui/core';
const EndUserDetailHtml = props => {
      return (
            <div className="container">
                  <Typography variant="h4">User Detail</Typography>
                  <form>
                        <TextFormControl label="User Name"
                              name="userName" value={props.userName}
                              changeState={props.doChangeState} />

                        <TextFormControl label="Password" type="password"
                              name="password" value={props.password}
                              changeState={props.doChangeState} />

                        <TextFormControl label="First Name"
                              name="firstName" value={props.firstName}
                              changeState={props.doChangeState} />

                        <TextFormControl label="Last Name"
                              name="lastName" value={props.lastName}
                              changeState={props.doChangeState} />

                        {props.children}

                        <Button variant="contained" color="primary" onClick={() => props.doSave()}>Save</Button>&nbsp;
                        <Button variant="contained" color="primary" onClick={() => props.doEditAddress(-1, props.id)}>Add Address</Button>&nbsp;
                        <Button variant="contained" color="primary" onClick={() => props.doCancel()}>Cancel</Button>
                  </form>
            </div >
      );
};

export default EndUserDetailHtml;