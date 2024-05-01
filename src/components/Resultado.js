import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/resultado.scss";

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
                  :<h1 className="resultado__certo__subtitle">cadastre-se ou faça login para adicionar a figurinha no álbum</h1>
                }


              </Col>

              <Col md={1}></Col>

              <Col md={8}>
                <iframe className='resultado__certo__youtube' src={`https:/www.youtube.com/embed/${figurado.youtube}?`}
                muted
                allowFullScreen
                title='video'
                />

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
