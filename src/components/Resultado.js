import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/resultado.scss";
import { GoogleLogin } from '@react-oauth/google';
import { AuthGoogle } from '../actions';
import { store } from '../store';
import YouTube from 'react-youtube';

function Resultado(props) {
  
  let palpites = props.palpites;

  let figurado = props.figurado;

  let auth = props.auth;
  
  if (palpites.chute === true) {
    return (
      <div className="resultado">

        <div className="resultado__certo">
  
          <Container fluid>
            <Row>
              <Col md={3}>

                <h1 className="resultado__certo__title">no gol!</h1>

                <img className='resultado__certo__img' src={figurado.imagem} alt="" />

                {
                  auth === true ?
                  <h1 className="resultado__certo__subtitle">adicionado ao álbum</h1>
                  :<div>
                    <h1 className="resultado__certo__subtitle">cadastre-se ou faça login para adicionar a figurinha no álbum e jogar os números anteriores</h1>
                    <div className='resultado__certo__google'>
                      <GoogleLogin
                      onSuccess={response => {
                        store.dispatch(AuthGoogle(response.credential))
                      }}
                      onError={() => {
                        console.log('Login failed');
                      }}
                      />
                    </div>
                  </div>
                }


              </Col>

              <Col md={1}></Col>

              <Col md={8}>

                
                <div className='resultado__certo__youtube'>
                  
                  <YouTube videoId={figurado.youtube}/>

                </div>


                <a className='resultado__certo__wikipedia' target='_blank' rel='noreferrer' href={figurado.wikipedia}>página do jogador na wikipedia</a>

              </Col>
            </Row>
          </Container>

        </div>

      </div>
    )
  } else if (palpites.chute === false) {

    return (
      <div className="resultado">
  
        <div className='resultado__errado'>

          <h1 className="resultado__errado__title">pra fora!</h1>        
          <h2 className="resultado__errado__subtitle">você chutou {palpites.jogador.nome}</h2>
          <h2 className="resultado__errado__subtitle">a resposta correta era {figurado.nome}</h2>

          {
            auth === false ?
            <div className='resultado__errado__login'>
              <h2 className="resultado__errado__login__text">cadastre-se ou faça login para jogar os números anteriores</h2>
              <div className='resultado__errado__login__google'>
                <GoogleLogin
                onSuccess={response => {
                  store.dispatch(AuthGoogle(response.credential))
                }}
                onError={() => {
                  console.log('Login failed');
                }}
                />
              </div>
            </div>
            :null
          }

        </div>

      </div>
    )
    
  }
  
}

function mapStateToProps(state) {
  return {
    figurado: state.figurado,
    palpites: state.palpites,
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps
)(Resultado);
