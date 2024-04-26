import { connect } from 'react-redux';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import { GetFigurado } from '../actions';
import { GetOpções } from '../actions';
import { ResetPalpites } from '../actions';
import Home from './Home';


function App(props) {


  return (
    <Home></Home>
  )

  
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(App);
