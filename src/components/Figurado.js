import { connect } from 'react-redux';
import FiguradoMenu from './FiguradoMenu';
import FiguradoPalpites from './FiguradoPalpites';
import "../scss/figurado.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Figurado(props) {

  let figurado = props.figurado;

  console.log(figurado?.dica_2)

  let mobile = props.mobile;
  return (
    <div className='figurado'>

      <Container fluid>
        <Row>
          <Col md={7}>

            <div className='figurado__dia'>
            
              <h1 className='figurado__dia__title'>quem é o jogador?</h1>
              
              <Container fluid>
                <Row>
                <Col md={6} xs={6}>
                    <div className='figurado__dia__dica'>
                      <h3 className='figurado__dia__dica__text'>{figurado.dica_2.texto}</h3>
                      <img className='figurado__dia__dica__img' src={figurado.dica_2.imagem} alt="" />
                    </div>
                  </Col>
              
                  <Col md={6} xs={6}>
                    <div className='figurado__dia__dica'>
                      <h3 className='figurado__dia__dica__text'>{figurado.dica.texto}</h3>
                      <img className='figurado__dia__dica__img' src={figurado.dica.imagem} alt="" />
                    </div>
                  </Col>

                </Row>
              </Container>

              {
                mobile === true ?
                <FiguradoPalpites></FiguradoPalpites>
                :null
              }


              <FiguradoMenu></FiguradoMenu>
              
            </div>

          </Col>

          <Col md={1}></Col>

          <Col md={4}>

            {
              mobile === false ?
              <FiguradoPalpites></FiguradoPalpites>
              :null
            }
    
          </Col>
        </Row>
      </Container>

    </div>
  )

  
}

function mapStateToProps(state) {
  return {
    opções: state.opções,
    jogadores: state.jogadores,
    figurado: state.figurado,
    auth: state.auth,
    mobile: state.mobile
  }
}

export default connect(
  mapStateToProps
)(Figurado);
