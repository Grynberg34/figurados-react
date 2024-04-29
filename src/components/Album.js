import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { GetAlbum } from '../actions';
import { store } from '../store';
import Menu from './Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/album.scss";
import "../icons/font/flaticon_figurados.scss";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br')

function Album(props) {

  let user = props.user;

  let auth = props.auth;

  let album = props.album;

  if (auth === false) {
    return (
      <Navigate to={`/`} />
    )
  } else {

    if (album === null) {
      store.dispatch(GetAlbum(user.id));

      return (
        <div className="album" style={{backgroundImage: `url('/background6.png')`}}></div>
      )
    } else {
      return (
        <div className="album" style={{backgroundImage: `url('/background6.png')`}}>
          <Container fluid>
            <Row>
              <Col md={2}></Col>
  
              <Col md={8}>
                <Menu id="menu-album"></Menu>

                <div className="album__header">
                  <h1 className="album__header__title">{user.name}</h1>
                  <h2 className="album__header__subtitle">álbum criado em {moment(user.created).format('D/MM/Y')}</h2>

                  <Container fluid>
                    <Row>
                      <Col md={6}>
                        <h3 className="album__header__info">clique no figurado para ampliar e ver lances</h3>
                      </Col>

                      <Col md={6}>
                        <h3 className="album__header__sort"><i className="album__header__sort__icon flaticon-sort-descending"></i></h3>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="album__figurados">
                  <Container fluid>
                    <Row>
                      { album.map( (figurado, index) => 
                        <Col md={2} key={index}>
                          <div className="album__figurados__figurado">
                            <img className='album__figurados__figurado__img' src={figurado.Figurado.imagem} alt="" />
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }

  }

}
  
    

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    album: state.album
  }
}

export default connect(
  mapStateToProps
)(Album);
