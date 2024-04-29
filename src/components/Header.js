import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/header.scss";
import "../icons/font/flaticon_figurados.scss";
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
                    <Link className='header__arrow' to={`/i/${figurado.número -1}`}><i className='header__arrow__icon flaticon-rewind-button'></i><h2 className='header__numero'>#{figurado.número -1 }</h2></Link>
                    :<span>
                      <i className='header__arrow__icon flaticon-rewind-button'></i>
                      <h2 className='header__numero'>#{figurado.número -1 }</h2>
                    </span>
                  }
                </div>
                :null 
              }
            </Col>

            <Col md={4}>

              <h1 className='header__title'>#{figurado.número}<span className="header__title__date">{moment(figurado.data).format('D/MM/Y')}</span></h1>
            
            </Col>

            <Col md={2}></Col>

            <Col md={2}>

              {
                auth === true && figurado.número + 1 <= número ?
                <Link className='header__arrow--right' to={`/i/${figurado.número +1}`}><h2 className='header__numero--right'>#{figurado.número + 1 }</h2><i className='header__arrow__icon--right flaticon-fast-forward'></i></Link>
                :<i className='header__ajuda flaticon-question'></i>
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
