import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { GetAlbum } from '../actions';
import { SortAlbum } from '../actions';
import { SetModalAlbum } from '../actions';
import { store } from '../store';
import Menu from './Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import { useState } from 'react';
import "../scss/album.scss";
import "../icons/font/flaticon_figurados.scss";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

function Album(props) {

  let user = props.user;

  let auth = props.auth;

  let album = props.album;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (figurado) => {
    store.dispatch(SetModalAlbum(figurado));
    setShow(true)
  };

  function sort(value) {
    store.dispatch(SortAlbum(value, album.figurados));
  }

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
                      <Col md={6} xs={7}>
                        <h3 className="album__header__info">clique na figurinha para ampliar e ver lances</h3>
                      </Col>

                      <Col md={3} xs={1}></Col>

                      <Col md={3} xs={4}>
                        {
                          album.asc === true ?
                          <div className='album__header__sort'>
                            <i className="album__header__sort__icon--active flaticon-sort-descending"></i><i onClick={() => sort(false)} className="album__header__sort__icon flaticon-sort"></i>
                          </div>
                          :<div className='album__header__sort'>
                            <i onClick={() => sort(true)} className="album__header__sort__icon flaticon-sort-descending"></i><i className="album__header__sort__icon--active flaticon-sort"></i>
                          </div>
                        }
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="album__figurados">
                  <Container fluid>
                    <Row>
                      { album.figurados.map( (figurado, index) => 
                        <Col md={2} xs={4} key={index}>
                          <div onClick={() => handleShow(figurado.Figurado)} className="album__figurados__figurado">
                            <img className='album__figurados__figurado__img' src={figurado.Figurado.imagem} alt="" />
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </div>
              </Col>

              <Col md={2}>
              <div id="container-038c6f715381a09d8ccc5627797d8ded"></div>  
              </Col>
            </Row>
          </Container>

          
          {
            album.active !== null?
            <Modal show={show} onHide={handleClose} >
              <i className="close flaticon-cancel" onClick={handleClose}></i>
              <div className='album-modal'>

                <h1 className="album-modal__title"><span className='album-modal__number'>#{album.active.número}</span> {album.active.nome}</h1>

                <Container fluid>
                  <Row>
                    <Col md={4}>

                      <img className='album-modal__img' src={album.active.imagem} alt="" />

                    </Col>

                    <Col md={1}></Col>

                    <Col md={7}>
                    
                      <YouTube className='album-modal__youtube' videoId={album.active.youtube}/>

                      <a className='album-modal__wikipedia' target='_blank' rel='noreferrer' href={album.active.wikipedia}>página do jogador na wikipedia</a>

                    </Col>
                  </Row>
                </Container>  
              </div>
            </Modal>
            :null
          }

        </div>
      )
    }

  }

}
  
    

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    album: state.album,
    figurado: state.figurado
  }
}

export default connect(
  mapStateToProps
)(Album);
