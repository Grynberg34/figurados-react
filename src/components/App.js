
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import Home from './Home';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App(props) {

  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  if (auth === true) {
    return (
      <Navigate to="/user" />
    )
  } else {
    return (
      <Home></Home>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    jwt: state.jwt
  }
}

export default connect(
  mapStateToProps
)(App);
