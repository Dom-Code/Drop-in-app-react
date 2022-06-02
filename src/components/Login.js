import React from 'react';

function Login() {
  return (
    <h2>Log in here</h2>
  );
}

export default Login;

// class NameForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//   }

//   handleChange = (event) => {
//     this.setState({value: event.target.value});
//   }

//   handleSubmt = (event) => {
//     event.preventDefault();
//     alert(this.state.value);
//   }

//   render() {
//     return(
//       <form onSubmit= {this.handleSubmit}>
//         <label>
//           Name:
//           <input type='text' value={this.state.value} onChange={this.handleChange}/>
//         </label>
//         <input type='submit' value='Submit'/>
//       </form>
//     )
//   }
// }

// export default NameForm;
