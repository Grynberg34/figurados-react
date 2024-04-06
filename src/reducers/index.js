import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//LOGIN

const userLogInReducer = (jwt = null, action) => {
  if (action.type === 'LOGIN_USER') {

    return action.payload;
    
  }
  
  return jwt;
};

const failedLogInReducer = (msg = '', action) => {
  if (action.type === 'FAIL_LOGIN') {

    return action.payload;
    
  }
  
  return msg;
};

//AUTH

const checkAuthReducer = (auth = false, action) => {
  if (action.type === 'CHECK_AUTH') {

    return action.payload;
  }
  
  return auth;
};

//CHECK USER

const checkUserReducer = (user = null, action) => {
  if (action.type === 'CHECK_USER') {

    return action.payload;
  }
  
  return user;
};






export default combineReducers({

  jwt: userLogInReducer,
  auth: checkAuthReducer,
  fail: failedLogInReducer,
  user: checkUserReducer,
});
