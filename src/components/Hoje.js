import { connect } from 'react-redux';
import Figurado from './Figurado';
import Resultado from './Resultado';
import Menu from './Menu';
import { Link, Navigate } from "react-router-dom";
import { GetFigurado } from '../actions';
import { store } from '../store';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/hoje.scss";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br')

function Hoje(props) {
  
  let figurado = props.figurado;

  if (figurado === null) {
    store.dispatch(GetFigurado())

    return (
      <div></div>
    )
  } else {

    return (
      <div className='hoje'>

        <Container>
          <Row>
            
            <Col md={4}>
              {
                figurado.número - 1 > 1 ?
                <Link to="/"><h2 className='hoje__numero'><img className='hoje__rewind' src="/icons/rewind.png" alt="" />#{figurado.número -1 }</h2></Link>
                :null
              }
            </Col>

            <Col md={4}>

              <h1 className='hoje__title'>#{figurado.número}<span className="hoje__title__date">{moment(figurado.data).format('D/MM/Y')}</span></h1>
            
            </Col>

            <Col md={4}>
              <button className='hoje__ajuda'>?</button>
            </Col>
          </Row>
        </Container>
                            
      
      </div>
    )

  }

  
  
}

function mapStateToProps(state) {
  return {
    figurado: state.figurado
  }
}

export default connect(
  mapStateToProps
)(Hoje);
