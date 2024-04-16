import { combineReducers } from 'redux';


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


const getOpçõesReducer = (opções = null, action) => {
  if (action.type === 'GET_OPCOES') {

    return action.payload;
    
  }
  
  return opções;
};

const getJogadoresReducer = (jogadores = null, action) => {
  if (action.type === 'GET_JOGADORES') {

    return action.payload;
    
  }
  
  return jogadores;
};

const getFiguradoReducer = (figurado = null, action) => {
  if (action.type === 'GET_FIGURADO') {

    return action.payload;
    
  }
  
  return figurado;
};

const getPalpitesReducer = (palpites = {opções : [], erros: 5, jogador: null, chute: null}, action) => {
  switch (action.type) {
    case 'SET_PALPITES':
      return {
        ...palpites,
        opções: [...palpites.opções, action.payload]
      };
    case 'SET_ERROS':
      return {
        ...palpites,
        erros: palpites.erros + action.payload
      };
    case 'ESCOLHER_JOGADOR':
      return {
        ...palpites,
        jogador: action.payload
      };
    case 'DELETAR_JOGADOR':
      return {
        ...palpites,
        jogador: action.payload
      };     
    case 'DEFINIR_CHUTE':
      return {
        ...palpites,
        chute: action.payload
      };    
    default:
      return palpites;
  }
};

const getFilteredReducer = (filter = null, action) => {
  if (action.type === 'GET_FILTERED') {

    return action.payload;
    
  }
  
  return filter;
};


export default combineReducers({

  jwt: userLogInReducer,
  auth: checkAuthReducer,
  fail: failedLogInReducer,
  user: checkUserReducer,
  opções: getOpçõesReducer,
  jogadores: getJogadoresReducer,
  figurado: getFiguradoReducer,
  palpites: getPalpitesReducer,
  filter: getFilteredReducer
});
