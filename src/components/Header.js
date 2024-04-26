import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/header.scss";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br')

function Header(props) {

  let figurado = props.figurado;

  let auth = props.auth;

  let número = props.número;

  if (figurado === null) {
    return (
      <div></div>
    )
  } else {

    return (
      <div className='header'>

        <Container>
          <Row>
            
            <Col md={4}>
              {
                figurado.número-1 > 0 ?
                <div>
                  {
                    auth === true ?
                    <Link to={`/i/${figurado.número -1}`}><h2 className='header__numero'><img className='header__rewind' src="/icons/rewind.png" alt="" />#{figurado.número -1 }</h2></Link>
                    :<h2 className='header__numero'><img className='header__rewind' src="/icons/rewind.png" alt="" />#{figurado.número -1 }</h2>
                  }
                </div>
                :null 
              }
            </Col>

            <Col md={4}>

              <h1 className='header__title'>#{figurado.número}<span className="header__title__date">{moment(figurado.data).format('D/MM/Y')}</span></h1>
            
            </Col>

            <Col md={4}>

              {
                auth === true && figurado.número + 1 <= número ?
                <Link to={`/i/${figurado.número +1}`}><h2 className='header__numero--right'>#{figurado.número + 1 } <img className='header__rewind--right' src="/icons/rewind.png" alt="" /></h2></Link>
                :<button className='header__ajuda'>?</button>
              }
    
            </Col>
          </Row>
        </Container>
                            
      
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
