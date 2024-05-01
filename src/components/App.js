import { connect } from 'react-redux';
import Home from './Home';


function App(props) {


  return (
    <Home></Home>
  )

  
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(App);
