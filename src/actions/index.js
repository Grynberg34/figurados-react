import api from '../api/api';

// REGISTER, LOGIN, REDEFINE, AUTH

export const LogInUser = (user) => async dispatch => {
    
    await api.post('/login', user).then(function(response){
        dispatch({ type: 'LOGIN_USER', payload: response.data.token });
    }).catch(function(err){
        console.log(err.response);
        dispatch({ type: 'FAIL_LOGIN', payload: err.response.data.mensagem});
    })
    
};


export const CheckAuth = (token) => async dispatch => {

    await api.get('/user', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    }).then(function(response){
    })
    .catch(function(err){
        console.log(err)
    })

};


export const AuthGoogle = (googleUser) => async dispatch => {

    await api.post('/auth/google/signin', {
        name: googleUser.profileObj.name,
        googleID: googleUser.googleId
    }).then(function(response){
        dispatch({ type: 'LOGIN_USER', payload: response.data.token });
    }).catch(function(err){
        console.log(err)
    })

};

export const LogoutUser = () => async dispatch => {

    await dispatch({ type: 'LOGIN_USER', payload: null });
    await dispatch({ type: 'CHECK_AUTH', payload: false });
    await dispatch({ type: 'SHOW_ALL_GUESSES', payload: null });

};


export const GetOpções= () => async dispatch => {

    await api.get('/palpites/todos', {
    }).then(async function(response){
        dispatch({ type: 'GET_OPCOES', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

    await api.get('/palpites/jogadores', {
    }).then(async function(response){
        dispatch({ type: 'GET_JOGADORES', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })
};

export const GetFigurado= () => async dispatch => {

    await api.get('/palpites/dia', {
    }).then(async function(response){
        dispatch({ type: 'GET_FIGURADO', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })
};

export const GetPalpites= (palpite, figurado) => async dispatch => {

    if (!figurado.certos.includes(palpite.id)) {
    dispatch({ type: 'SET_ERROS', payload: -1 });
    
    palpite.certo = false;
    dispatch({ type: 'SET_PALPITES', payload: palpite });

    } else {
        palpite.certo = true;
        dispatch({ type: 'SET_PALPITES', payload: palpite });
    
    }

};

export const FilterJogador = (filter, jogadores) => async dispatch => {
    
    if (filter.length < 3) {
        
        dispatch({ type: 'GET_FILTERED', payload: null});
        
    } else {

        var filtered;

        var new_filter = filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        filtered = jogadores.filter(jogador => jogador.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(new_filter))

        if (filtered.length === 0) {
            dispatch({ type: 'GET_FILTERED', payload: null});
        } else {
            dispatch({ type: 'GET_FILTERED', payload: filtered});
        }
    
    }

};

export const EscolherJogador = (jogador) => async dispatch => {

    dispatch({ type: 'GET_FILTERED', payload: null});
    dispatch({ type: 'ESCOLHER_JOGADOR', payload: jogador});

};

export const DeletarJogador = () => async dispatch => {
    
    dispatch({ type: 'DELETAR_JOGADOR', payload: null});

};

export const ChutarJogador = (jogador, figurado) => async dispatch => {

    if (jogador === figurado) {
        dispatch({ type: 'DEFINIR_CHUTE', payload: true});
    } else {
        dispatch({ type: 'DEFINIR_CHUTE', payload: false});
    }

};