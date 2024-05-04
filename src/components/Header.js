import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { AuthGoogle } from '../actions';
import { CheckMobile } from '../actions';
import { store } from '../store';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/header.scss";
import "../icons/font/flaticon_figurados.scss";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

function Header(props) {

  let figurado = props.figurado;

  let auth = props.auth;

  let número = props.número;

  if (window.innerWidth < 768) {
    store.dispatch(CheckMobile(true))
  }

  const [showLogin, setLoginShow] = useState(false);

  const handleCloseLogin = () => setLoginShow(false);
  const handleShowLogin = () => {
    setLoginShow(true)
  };

  const [showHelp, setHelpShow] = useState(false);

  const handleCloseHelp = () => setHelpShow(false);
  const handleShowHelp = () => {
    setHelpShow(true)
  };

  if (figurado === null) {
    return (
      <div></div>
    )
  } else {

    return (
      <div className='header'>

        <Container fluid>
          <Row>
            
            <Col md={4} xs={2}>
              {
                figurado.número-1 > 0 ?
                <div>
                  {
                    auth === true ?
                    <Link className='header__arrow' to={`/i/${figurado.número -1}`}><i className='header__arrow__icon flaticon-rewind-button'></i><h2 className='header__numero'>#{figurado.número -1 }</h2></Link>
                    :<span onClick={() => handleShowLogin()} className='header__arrow'>
                      <i className='header__arrow__icon flaticon-rewind-button'></i>
                      <h2 className='header__numero'>#{figurado.número -1 }</h2>
                    </span>
                  }
                </div>
                :null 
              }
            </Col>

            <Col md={4} xs={8}>

              <h1 className='header__title'>#{figurado.número} <span className="header__title__date">{moment(figurado.data).format('DD/MM/Y')}</span></h1>
            
            </Col>

            <Col md={4} xs={2}>

              {
                auth === true && figurado.número + 1 <= número ?
                <div>
                  <Link className='header__arrow--right' to={`/i/${figurado.número +1}`}><h2 className='header__numero--right'>#{figurado.número + 1 }</h2><i className='header__arrow__icon--right flaticon-fast-forward'></i></Link>
                </div>
                :<h2 onClick={() => handleShowHelp()} className='header__ajuda bounce-in-top'>regras</h2>
              }
    
            </Col>
          </Row>
        </Container>

        <Modal animation={false} show={showLogin} onHide={handleCloseLogin} >
          <i className="login-close flaticon-cancel" onClick={handleCloseLogin}></i>
          <div className='modal-login'>
            <h1 className='modal-login__title'>cadastre-se ou faça login para acessar os jogos anteriores</h1>
              <div className='modal-login__google'>
                <GoogleLogin
                onSuccess={response => {
                  handleCloseLogin();
                  store.dispatch(AuthGoogle(response.credential))
                }}
                onError={() => {
                  console.log('Login failed');
                }}
                />
              </div>
          </div>
        </Modal>

        <Modal animation={false} show={showHelp} onHide={handleCloseHelp} >
          <i className="modal-close flaticon-cancel" onClick={handleCloseHelp}></i>
          <div className='modal-help'>

            <img className='modal-help__img' src="/ajuda.png" alt="" />

          </div>
        </Modal>

                            
      </div>
    )

  }

  
  
}

function mapStateToProps(state) {
  return {
    figurado: state.figurado,
    auth: state.auth,
    número: state.número,
    mobile: state.mobile,
  }
}

export default connect(
  mapStateToProps
)(Header);
