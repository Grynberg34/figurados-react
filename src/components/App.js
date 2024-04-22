import { connect } from 'react-redux';
import { store } from '../store';
import { GetNúmero } from '../actions';
import { Navigate } from "react-router-dom";


function App(props) {

  var número = props.número;

  console.log(número);

  if (número === null) {

    store.dispatch(GetNúmero())

    return (
      <div></div>
    )
  } else {

    return (
      <Navigate to={`/i/${número}`} />
    )
  }

}

function mapStateToProps(state) {
  return {
    número: state.número
  }
}

export default connect(
  mapStateToProps
)(App);
