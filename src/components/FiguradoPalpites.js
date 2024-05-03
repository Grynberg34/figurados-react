import { connect } from "react-redux";
import { FilterJogador } from "../actions";
import { EscolherJogador } from "../actions";
import { DeletarJogador } from "../actions";
import { ChutarJogador } from "../actions";
import { store } from "../store";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FiguradoPalpites(props) {
  let jogadores = props.jogadores;

  let figurado = props.figurado;

  let palpites = props.palpites;

  let filter = props.filter;

  let user = props.user;
  
  function searchJogador(jogador) {
    store.dispatch(FilterJogador(jogador, jogadores));
  }

  function escolherJogador(jogador) {
    store.dispatch(EscolherJogador(jogador));
  }

  function deletarJogador() {
    store.dispatch(DeletarJogador());
  }

  function chutarJogador(jogador, id, user) {
    store.dispatch(ChutarJogador(jogador, id, user));
  }

  return (
    <div className="figurado__palpites">
      <div className="figurado__palpites__erros">
        <h4 className="figurado__palpites__erros__numero">
          {palpites.erros} dicas restantes
        </h4>
      </div>

      {palpites.opções.map((palpite, i) => (
        <div
          className="figurado__palpites__palpite"
          style={{ backgroundColor: palpite.certo ? "#00a74b" : "#ff007b" }}
          key={i}
        >
          <Container fluid>
            <Row>
              <Col md={3} xs={3}>
                <img
                  className="figurado__palpites__palpite__img"
                  src={palpite.imagem}
                  alt=""
                />
              </Col>

              <Col md={9} xs={9}>
                <h5 className="figurado__palpites__palpite__text">
                  {palpite.opção}
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      ))}

      {palpites.opções.length > 0 ? (
        <div className="figurado__palpites__chute">
          {palpites.jogador === null ? (
            <div>
              <form>
                <label className="figurado__palpites__chute__label">
                  escolher jogador
                </label>
                <input
                  placeholder="digite o nome para selecionar o jogador"
                  onChange={(e) => searchJogador(e.target.value)}
                  type="text"
                  className="figurado__palpites__chute__input"
                />
              </form>

              {filter !== null ? (
                <div className="figurado__palpites__chute__jogadores">
                  {filter.map((jogador, i) => (
                    <li
                      onClick={() => escolherJogador(jogador)}
                      key={i}
                      className="figurado__palpites__chute__jogadores__jogador"
                    >
                      {jogador.nome}
                    </li>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="figurado__palpites__chute__jogador">
              <Container fluid>
                <Row>
                  <Col md={8}></Col>

                  <Col md={4}>
                    <i
                      onClick={() => deletarJogador()}
                      className="figurado__palpites__chute__jogador__fechar flaticon-cancel"
                    ></i>
                  </Col>
                </Row>
              </Container>

              <h4 className="figurado__palpites__chute__jogador__nome">
                {palpites.jogador.nome}
              </h4>
              <span className="figurado__palpites__chute__sub">
                essa é sua escolha final?
              </span>
              <span className="figurado__palpites__chute__sub">
                você só tem uma chance
              </span>

              <button
                onClick={() => chutarJogador(palpites.jogador.id, figurado.id, user)}
                className="figurado__palpites__chute__jogador__button">
                chutar pro gol
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    opções: state.opções,
    jogadores: state.jogadores,
    figurado: state.figurado,
    palpites: state.palpites,
    filter: state.filter,
    auth: state.auth,
    user: state.user,
  };
}

export default connect(mapStateToProps)(FiguradoPalpites);
