import { connect } from 'react-redux';
import Figurado from './Figurado';
import Resultado from './Resultado';
import Menu from './Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/home.scss";

function Home(props) {
  
  let palpites = props.palpites;

  return (
    <div className="home" style={{backgroundImage: `url('/background5.png')`}}>

      <Container fluid>

        <Row>

          <Col md={2}></Col>  

          <Col md={8}>

            <Menu></Menu>

            {
              palpites.chute === null ?
              <Figurado></Figurado>
              :<Resultado></Resultado>
            }

          </Col>

          <Col md={2}></Col>  

        </Row>

      </Container>
    </div>
  )
  
  
}

function mapStateToProps(state) {
  return {
    palpites: state.palpites
  }
}

export default connect(
  mapStateToProps
)(Home);
