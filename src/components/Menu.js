import { connect } from 'react-redux';
import "../scss/menu.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Menu(props) {

  return (
    <div className="menu">
      <Container fluid >

        <Row>
          <Col md={4}>
              <a className="menu__logo" href="/">figurados.com.br</a>
          </Col>

          <Col md={4}>
          
          </Col>
        </Row>

      </Container>

    </div>
  )
  
  
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps
)(Menu);
