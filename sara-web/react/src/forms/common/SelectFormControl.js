
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export default function SelectFormControl(props) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={props.name + 'id'}>{props.label}</InputLabel>
      <Select labelId={props.name + 'id'} placeholder={"Enter " + props.label}
        name={props.name} value={props.value}
        onChange={(e) => props.changeSelectState(e)} >
        {props.optionsList.map(row => (
          <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
        ))}
      </Select>
    </FormControl >
  );
}
// export default class SelectFormControl extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   renderOptions = (optionsList) => {
//     return (optionsList.map(row => (
//       <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
//     )))
//   }
//   render = () => {
//     return (
//       <FormControl fullWidth margin="normal">
//         <Select label={this.props.label} placeholder={"Enter " + this.props.label}
//           name={this.props.name} value={this.props.value}
//           onChange={(e) => this.props.changeSelectState(e)} >
//           {this.renderOptions(this.props.options)}
//         </Select>
//       </FormControl >
//     );
//   }
// }