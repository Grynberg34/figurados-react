import { connect } from 'react-redux';
import { store } from '../store';
import "../scss/menu.scss";
import { AuthGoogle } from '../actions';
import { CheckAuth } from '../actions';
import { GoogleLogin } from '@react-oauth/google';
import { NavLink, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { LogoutUser } from '../actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Menu(props) {

  var jwt = props.jwt;
  
  var auth =  props.auth;

  var palpites = props.palpites;

  var figurado = props.figurado;


  if(jwt !== null && auth !== true) {
    store.dispatch(CheckAuth(props.jwt, palpites, figurado))

  }

  function logout() {
    store.dispatch(LogoutUser())
  }
  
  if (auth === true) {
    return (
      <div className="menu">

        <Container fluid >
  
          <Row>
            <Col md={4}>
              <Link className="menu__logo" to="/">figurados</Link>
            </Col>
  
            <Col md={2}>
            
            </Col>
  
            <Col md={2} xs={4}>
              <NavLink className="menu__link" to="/">jogar</NavLink>
            </Col>
    
            <Col md={2} xs={4}>
              <NavLink className="menu__link" to="/album">álbum</NavLink>
            </Col>

            <Col md={2} xs={4}>
              <button className="menu__button" onClick={logout}>sair</button>
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
              <a className="menu__logo" href="/">figurados</a>
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
                  console.log('Login failed');
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
    palpites: state.palpites,
    figurado: state.figurado,
  }
}

export default connect(
  mapStateToProps
)(Menu);
