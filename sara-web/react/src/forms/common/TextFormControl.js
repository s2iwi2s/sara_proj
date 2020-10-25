
import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
const TextFormControl = props => {

  return (
    <FormControl fullWidth margin="normal" >
      { props.type === 'hidden' &&
        <input
          type={props.type}
          name={props.name} value={props.value} />
      }
      {props.type !== 'hidden' &&
        <>
          {/* <InputLabel htmlFor={props.name + 'id'}>{props.label}</InputLabel>
          <TextField labelId={props.name + 'id'} placeholder={"Enter " + props.label} */}
          <TextField label={props.label} placeholder={"Enter " + props.label}
            type={props.type ? props.type : "text"}
            name={props.name} value={props.value}
            onChange={(e) => props.changeState(e)} />
        </>
      }
    </FormControl >
  );
}
export default TextFormControl;

// export default class TextFormControl extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render = () => {
//     if (this.props.type == 'hidden') {
//       return (
//         <TextField
//           type={this.props.type}
//           name={this.props.name} value={this.props.value} />
//       );
//     }
//     return (
//       <FormControl fullWidth margin="normal" >
//         <TextField label={this.props.label} placeholder={"Enter " + this.props.label}
//           type={this.props.type ? this.props.type : "text"}
//           name={this.props.name} value={this.props.value}
//           onChange={(e) => this.props.changeState(e)} />
//       </FormControl>
//     );
//   }
// }