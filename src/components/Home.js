import { connect } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { GetFigurado } from '../actions';
import { GetOpções } from '../actions';
import { store } from '../store';
import Figurado from './Figurado';
import Resultado from './Resultado';
import Header from './Header';
import Menu from './Menu';
import { GetNúmero } from '../actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/home.scss";

function Home(props) {

  let { id } = useParams();

  let num_id = parseInt(id);

  let opções = props.opções;

  let figurado = props.figurado;

  let palpites = props.palpites;

  let número = props.número;

  if (número === null) {

    store.dispatch(GetNúmero())

    return (
      <div></div>
    )
  } else {

    if (num_id > número) {
      return (
        <Navigate to={`/i/${número}`} />
      )
    } else {

      if (opções === null || figurado === null || figurado.número !== num_id)  {
  
          store.dispatch(GetFigurado(id))
      
          store.dispatch(GetOpções())
      
          return (
            <div className="home" style={{backgroundImage: `url('/background5.png')`}}></div>
          )
        } else {
          return (
            <div className="home" style={{backgroundImage: `url('/background5.png')`}}>
        
              <Container fluid>
        
                <Row>
        
                  <Col md={2}></Col>  
        
                  <Col md={8}>
        
                    <Menu></Menu>
        
                    <Header></Header>
        
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


    }


  }



  
  
}

function mapStateToProps(state) {
  return {
    palpites: state.palpites,
    opções: state.opções,
    figurado: state.figurado,
    auth: state.auth,
    número: state.número
  }
}

export default connect(
  mapStateToProps
)(Home);
