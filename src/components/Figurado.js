import { connect } from 'react-redux';
import { GetPalpites } from '../actions';
import { FilterJogador } from '../actions';
import { EscolherJogador } from '../actions';
import { DeletarJogador } from '../actions';
import { ChutarJogador } from '../actions';
import { store } from '../store';
import "../scss/figurado.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Figurado(props) {

  let opções = props.opções;

  let jogadores = props.jogadores;

  let figurado = props.figurado;

  let palpites = props.palpites;

  let filter = props.filter;

  let user = props.user;

  function darPalpite(palpite) {

    if (palpites.erros > 0) {

      store.dispatch(GetPalpites(palpite, figurado, user));
    }
  }

  function searchJogador(jogador) {
    store.dispatch(FilterJogador(jogador, jogadores))
  }

  function escolherJogador(jogador) {
    store.dispatch(EscolherJogador(jogador));
  }

  function deletarJogador() {
    store.dispatch(DeletarJogador());
  }

  function chutarJogador(jogador, id,user) {
    store.dispatch(ChutarJogador(jogador, id, user));
  }

  return (
    <div className='figurado'>

      <Container fluid>
        <Row>
          <Col md={7}>

            <div className='figurado__dia'>
            
              <h1 className='figurado__dia__title'>quem é o jogador?</h1>
              
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <div className='figurado__dia__anos'>
                      <h2 className='figurado__dia__anos__title'>jogou de</h2>
                      <h3 className='figurado__dia__anos__text'>{figurado.anos}</h3>
                    </div>
                  </Col>
              
                  <Col md={6}>
                    <div className='figurado__dia__dica'>
                      <h3 className='figurado__dia__dica__text'>{figurado.dica.texto}</h3>
                      <img className='figurado__dia__dica__img' src={figurado.dica.imagem} alt="" />
                    </div>
                  </Col>

                </Row>
              </Container>

              <div className='figurado__dia__menu'>

                <h2 className='figurado__dia__menu__title'>clique nas opções abaixo para mais dicas</h2>

                <h5 className='figurado__dia__menu__option'>jogava de...</h5>
                <div className='figurado__dia__menu__items'>

                  { opções.posições.map( (posição) => 
                    <div key={posição.id} className='figurado__dia__menu__items__item'>
                      <img onClick={() => darPalpite(posição)} className='figurado__dia__menu__items__item__img' src={posição.imagem} title={posição.opção} alt="" />
                    </div>
                  )}

                </div>

                <h5 className='figurado__dia__menu__option'>jogou no...</h5>
                <div className='figurado__dia__menu__items'>

                  { opções.times.map( (time) => 
                    <div key={time.id} className='figurado__dia__menu__items__item'>
                      <img onClick={() => darPalpite(time)} className='figurado__dia__menu__items__item__img'src={time.imagem} title={time.opção} alt=""/>
                    </div>
                  )}

                </div>


                <h5 className='figurado__dia__menu__option'>ganhou...</h5>
                <div className='figurado__dia__menu__items'>


                  { opções.títulos.map( (título) => 
                    <div key={título.id} className='figurado__dia__menu__items__item--titulo'>
                      <img onClick={() => darPalpite(título)} className='figurado__dia__menu__items__item__img' src={título.imagem} title={título.opção} alt=""/>
                    </div>
                  )}

                </div>

              </div>

              
            </div>

          </Col>

          <Col md={1}></Col>

          <Col md={4}>

            <div className="figurado__palpites">
              <div className='figurado__palpites__erros'>
                
                <h4 className='figurado__palpites__erros__numero'>{palpites.erros} erros restantes</h4>
        
              </div>

              { palpites.opções.map( (palpite, i) => 
                <div className='figurado__palpites__palpite' style={{ backgroundColor: palpite.certo ? '#00a74b' : '#ff007b' }} key={i}>
                  <Container fluid>
                    <Row>
                      <Col md={3}>
                        <img className='figurado__palpites__palpite__img' src={palpite.imagem} alt="" />
                      </Col>
              
                      <Col md={9}><h5 className='figurado__palpites__palpite__text'>{palpite.opção}</h5></Col>
                    </Row>
                  </Container>
                </div>   
              )}

              { palpites.opções.length > 0 ?
                <div className='figurado__palpites__chute'>

                {
                  palpites.jogador === null?
                  <div>
                    <form>
                      <label className="figurado__palpites__chute__label">escolher jogador</label>
                      <input placeholder='digite o nome para selecionar o jogador' onChange={(e) => searchJogador(e.target.value)} type="text" className="figurado__palpites__chute__input" />
                    </form>
                    
                    {
                      filter !== null?
                      <div className='figurado__palpites__chute__jogadores'>
                      { filter.map( (jogador, i) => 
                        <li onClick={() => escolherJogador(jogador)} key={i} className="figurado__palpites__chute__jogadores__jogador">{jogador.nome}</li>
                      )}
                      </div>
                      :null
                    }

                  </div>
                  :<div className="figurado__palpites__chute__jogador">
                    
                    <button onClick={() => deletarJogador()} className="figurado__palpites__chute__jogador__fechar">X</button>

                    <h4 className="figurado__palpites__chute__jogador__nome">{palpites.jogador.nome}</h4>
                    <span className="figurado__palpites__chute__sub">esta é sua escolha final?</span>
                    <span className="figurado__palpites__chute__sub">você só tem uma chance para acertar</span>

                    <button onClick={() => chutarJogador(palpites.jogador.id, figurado.id,user)} className="figurado__palpites__chute__jogador__button">chutar pro gol</button>

                  </div>
                }

                
                </div>
                :null
              }     

            </div>
    
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
    palpites: state.palpites,
    filter: state.filter,
    auth: state.auth,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Figurado);
