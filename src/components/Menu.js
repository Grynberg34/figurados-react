import { connect } from 'react-redux';
import { store } from '../store';
import "../scss/menu.scss";
import { AuthGoogle } from '../actions';
import { CheckAuth } from '../actions';
import { GoogleLogin } from '@react-oauth/google';
import { Link, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Menu(props) {

  var jwt = props.jwt;
  
  var auth =  props.auth;

  if(jwt !== null && auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  if (auth === true) {
    return (
      <div className="menu">

        <Container fluid >
  
          <Row>
            <Col md={4}>
              <a className="menu__logo" href="/">figurados.com.br</a>
            </Col>
  
            <Col md={5}>
            
            </Col>
  
            <Col md={3}>

            </Col>
          </Row>
  
        </Container>
  
      </div>
    )
  } else {

    return (
      <div className="menu">

        <Container fluid >
  
          <Row>
            <Col md={4}>
              <a className="menu__logo" href="/">figurados.com.br</a>
            </Col>
  
            <Col md={5}>
            
            </Col>
  
            <Col md={3}>
              <div className="menu__google">

                <GoogleLogin
                onSuccess={response => {

                  store.dispatch(AuthGoogle(response.credential))
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
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
)(Menu);
