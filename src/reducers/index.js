import { combineReducers } from 'redux';


//LOGIN

const userLogInReducer = (jwt = null, action) => {
  if (action.type === 'LOGIN_USER') {

    return action.payload;
    
  }
  
  return jwt;
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

const getNúmeroReducer = (número = null, action) => {
  if (action.type === 'GET_NÚMERO') {

    return action.payload;
    
  }
  
  return número;
};

const getFiguradoReducer = (figurado = null, action) => {
  if (action.type === 'GET_FIGURADO') {

    return action.payload;
    
  }
  
  return figurado;
};

const getPalpitesReducer = (palpites =  {figurado_num: null, opções : [], erros: 7, jogador: null, chute: null}, action) => {
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
      case 'RESET_PALPITES':
        return action.payload;        
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

const getAlbumReducer = (album = null, action) => {
  switch (action.type) { 
    case 'GET_ALBUM':
      return action.payload
    case 'SORT_ALBUM':
      return action.payload
    case 'SET_MODAL':
      return {
        ...album,
        active: action.payload
      }
    default:
      return album;
  }
  
};

const checkMobileReducer = (mobile = false, action) => {
  if (action.type === 'CHECK_MOBILE') {

    return action.payload;
    
  }
  
  return mobile;
};


export default combineReducers({
  jwt: userLogInReducer,
  auth: checkAuthReducer,
  user: checkUserReducer,
  opções: getOpçõesReducer,
  jogadores: getJogadoresReducer,
  figurado: getFiguradoReducer,
  palpites: getPalpitesReducer,
  filter: getFilteredReducer,
  número: getNúmeroReducer,
  album: getAlbumReducer,
  mobile: checkMobileReducer
});
