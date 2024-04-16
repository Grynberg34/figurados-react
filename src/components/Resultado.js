import { connect } from 'react-redux';
import Menu from './Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/resultado.scss";

function Resultado(props) {
  
  let palpites = props.palpites;

  if (palpites.chute === true) {
    return (
      <div className="resultado">

        <h1>true</h1>

      </div>
    )
  } else if (palpites.chute !== false) {

    return (
      <div className="resultado">
  
        <h1>false</h1>

      </div>
    )
    
  }

  
}

function mapStateToProps(state) {
  return {
    palpites: state.palpites
  }
}

export default connect(
  mapStateToProps
)(Resultado);
