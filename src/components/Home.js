import { connect } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { GetFigurado } from '../actions';
import { GetOpções } from '../actions';
import { GetNúmero } from '../actions';
import { store } from '../store';
import Figurado from './Figurado';
import Resultado from './Resultado';
import Header from './Header';
import Menu from './Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/home.scss";


function Home(props) {
  

  let { id } = useParams();
  
  let figurado = props.figurado;
  
  let palpites = props.palpites;

  let opções = props.opções;

  let número = props.número;

  let user = props.user;

  let auth = props.auth;
 
  if (número === null || opções === null) {
    store.dispatch(GetNúmero())
    store.dispatch(GetOpções())

    return (
      <div className="home" style={{backgroundImage: `url('/background7.png')`}}></div>
    )

  } else {
    
    var num_id = parseInt(id);
    
    if (id === undefined) {
      num_id = número;
    } 

    if ((auth === false && num_id !== número) || num_id > número) {
      return (
        <Navigate to={`/i/${número}`} />
      )
    } else {
        if (figurado === null)  {
          store.dispatch(GetFigurado(num_id, user, palpites))
          return (
            <div className="home" style={{backgroundImage: `url('/background7.png')`}}></div>
          )
        } else {
          if (figurado.número !== num_id) {
            store.dispatch(GetFigurado(num_id, user, palpites))
            return (
              <div className="home" style={{backgroundImage: `url('/background7.png')`}}></div>
            )
          } else {
    
            return (
              <div className="home" style={{backgroundImage: `url('/background7.png')`}}>
                <Container fluid>
          
                  <Row>
          
                    <Col md={2}>
                    </Col>  
          
                    <Col md={8}>
          
                      <Menu></Menu>
          
                      <Header></Header>
          
                      {
                        palpites.chute === null ?
                        <Figurado></Figurado>
                        :<Resultado></Resultado>
                      }
          
                    </Col>
          
                    <Col md={2}>
                    </Col>  
          
                  </Row>
          
                </Container>
              </div>
            )
    
          }
      
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
    número: state.número,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Home);
