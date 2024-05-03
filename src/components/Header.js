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
                :<i onClick={() => handleShowHelp()} className='header__ajuda flaticon-question'></i>
              }
    
            </Col>
          </Row>
        </Container>

        <Modal animation={false} show={showLogin} onHide={handleCloseLogin} >
          <i className="login-close flaticon-cancel" onClick={handleCloseLogin}></i>
          <div className='modal-login'>
            <h1 className='modal-login__title'>cadastre-se ou faça login para jogar os anteriores</h1>
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

            <Container fluid>
              <Row>
                <Col md={2} xs={2}>
                  <h2 className="modal-help__number">1</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text">O objetivo do jogo é descobrir a cada dia um jogador aposentado do futebol brasileiro.</h3>
                </Col>

                <Col md={2} xs={2}>
                  <h2 className="modal-help__number--alt">2</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text--alt">Você terá duas dicas iniciais. Cada dica pode ser ou um time pelo qual o jogador atuou, ou a posição que jogava ou um título que conquistou</h3>
                </Col>

                <Col md={2} xs={2}>
                  <h2 className="modal-help__number">3</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text">Para obter mais dicas, clique em uma posição, um time ou um título. Se a dica for correta ela aparecerá em verde (ex: o jogador atuou por esse time) e caso for errada aparecerá em vermelho (ex: o jogador não ganhou aquele título)</h3>
                </Col>

                <Col md={2} xs={2}>
                  <h2 className="modal-help__number--alt">4</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text--alt">Você pode tentar novas dicas até completar 7 dicas erradas. Caso isso aconteça, você não poderá obter mais dicas e deverá chutar o jogador com as dicas que tiver até o momento</h3>
                </Col>

                <Col md={2} xs={2}>
                  <h2 className="modal-help__number">5</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text">Você tem apenas uma tentativa para tentar acertar o jogador. Para escolher sua resposta, digite o nome do jogador e o selecione clicando no seu nome na lista que aparecerá. Clique em ‘chutar para o gol’ e veja se acertou</h3>
                </Col>

                <Col md={2} xs={2}>
                  <h2 className="modal-help__number--alt">6</h2>
                </Col>

                <Col md={10} xs={10}>
                  <h3 className="modal-help__text--alt">Se acertar, você ganhará a figurinha do jogador para adicionar ao seu álbum</h3>
                </Col>

              </Row>
            </Container>

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
  }
}

export default connect(
  mapStateToProps
)(Header);
