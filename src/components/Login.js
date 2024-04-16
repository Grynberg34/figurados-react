import React from 'react';
import { LogInUser } from '../actions';
import { CheckAuth } from '../actions';
import { AuthGoogle } from '../actions';
import { connect } from 'react-redux';
import { store } from '../store';
import { Link, Navigate } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login(props) {


  const responseGoogle = (response) => {

    store.dispatch(AuthGoogle(response));

  }

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
      <div id="login" className="content" style={{backgroundImage: `url('/home/background.png')`}}>
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Link to="/"><img className="logo" src="/logo.svg" alt="" /></Link>
              <div className="login" style={{backgroundImage: `url('/home/box.png')`}}>
                <GoogleLogin
                  clientId= "390518303780-jh735t86sg11luhqg21vm52q66r4qcha.apps.googleusercontent.com"
                  buttonText="Faça login com a conta Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={renderProps => (
                    <button className="google" onClick={renderProps.onClick}> <img className="google__img" src="/home/google.png" alt=""></img> Login Google</button>
                  )}
                />
              </div>  
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    jwt: state.jwt,
  }
}

export default connect(
  mapStateToProps
)(Login);

