import api from '../api/api';
import { jwtDecode } from "jwt-decode";

// REGISTER, LOGIN, REDEFINE, AUTH

export const CheckAuth = (token, palpites, figurado) => async dispatch => {

    await api.get('/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    }).then(async function(response){

        var id = response.data.id;


        if (response.data.id) {
            dispatch({ type: 'CHECK_AUTH', payload: true});
            dispatch({ type: 'CHECK_USER', payload: id});


            for (let i = 0; i < palpites.opções.length; i++) {

                var palpite = palpites.opções[i];

                palpite.user = id;

                palpite.figurado = figurado.id;

                await api.post('/jogo/palpite', palpite).catch(function(err){
                    console.log(err.response);
                })
            }

            if (palpites.chute !== null) {
                var resultado = {
                    certo: palpites.jogador.id === figurado.id,
                    chute: palpites.jogador.id,
                    figurado: figurado.id,
                    user : id
                }

                await api.post('/jogo/chute', resultado).catch(function(err){
                    console.log(err.response);
                })
            }


            var figurado_new = {
                id: figurado.número,
                user: id
            }

        
            await api.post('jogo/figurado', figurado_new).then( async function(response){

                var palpites = response.data.palpites;
        
                var errados = [];
        
                for (var i=0; i < palpites.length; i++) {
                    if (palpites[i].certo === false) {
                        errados.push(palpites[i].id)
                    }
                }

                console.log(figurado.id)

                if (errados.length > 7) {

                    var resultado = {
                        certo: true,
                        chute: 46,
                        figurado: figurado.id,
                        user : id
                    }
            
                    await api.post('/jogo/chute', resultado).catch(function(err){
                        console.log(err.response);
                    })

                    dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:0, jogador: {nome:'Carlinhos Bala'}, chute: false}});
                } else {
                    dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:7-errados.length, jogador: response.data.chute.jogador, chute: response.data.chute.resultado}});
                }
        
                dispatch({ type: 'GET_FIGURADO', payload: response.data });
        
            }).catch(function(err){
                console.log(err);
            })

        } else {
            dispatch({ type: 'CHECK_AUTH', payload: false});
        }

    })
    .catch(function(err){
        console.log(err)
    })

};

export const AuthGoogle = (credential) => async dispatch => {

    const decoded = jwtDecode(credential);

    await api.post('/auth/google/signin', {
        profile: decoded
    }).then(function(response){



        dispatch({ type: 'LOGIN_USER', payload: response.data.token });

    }).catch(function(err){
        console.log(err)
    })

};

export const LogoutUser = () => async dispatch => {

    await dispatch({ type: 'LOGIN_USER', payload: null });
    await dispatch({ type: 'CHECK_AUTH', payload: false });
    await dispatch({ type: 'CHECK_USER', payload: null });
    await dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: null, opções : [], erros:7, jogador: null, chute: null}});

};

export const GetNúmero= () => async dispatch => {

    await api.get(`/jogo/numero`, {
    }).then(async function(response){
        dispatch({ type: 'GET_NÚMERO', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetOpções = () => async dispatch => {
    await api.get('/jogo/todos', {
    }).then(async function(response){
        dispatch({ type: 'GET_OPCOES', payload: response.data.opções });
        dispatch({ type: 'GET_JOGADORES', payload: response.data.jogadores });
    })  
    .catch(function(err){
        console.log(err)
    })
}

export const GetFigurado= (id, user) => async dispatch => {

    var figurado = {
        id: id,
        user: user
    }

    await api.post('jogo/figurado', figurado).then(function(response){

        var palpites = response.data.palpites;

        var errados = [];

        
        for (var i=0; i < palpites.length; i++) {
            if (palpites[i].certo === false) {
                errados.push(palpites[i].id)
            }
        }

        dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:7-errados.length, jogador: response.data.chute.jogador, chute: response.data.chute.resultado}});

        dispatch({ type: 'GET_FIGURADO', payload: response.data });

    }).catch(function(err){
        console.log(err);
    })
    
};

export const GetPalpites= (palpite, figurado, user) => async dispatch => {

    palpite.user = user;

    palpite.figurado = figurado.id;
    
    if (!figurado.certos.includes(palpite.id)) {
        dispatch({ type: 'SET_ERROS', payload: -1 });
        
        palpite.certo = false;
        dispatch({ type: 'SET_PALPITES', payload: palpite });
        
    } else {
        palpite.certo = true;
        dispatch({ type: 'SET_PALPITES', payload: palpite });
    }
    
    if (user !== null) {
        await api.post('/jogo/palpite', palpite).then(function(response){
            console.log(response)
        }).catch(function(err){
            console.log(err.response);
        })
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

export const ChutarJogador = (jogador, figurado, user) => async dispatch => {

    if (jogador === figurado) {
        dispatch({ type: 'DEFINIR_CHUTE', payload: true});
    } else {
        dispatch({ type: 'DEFINIR_CHUTE', payload: false});
    }
    
    if (user !== null) {
        var resultado = {
            certo: jogador === figurado,
            chute: jogador,
            figurado: figurado,
            user : user
        }

        await api.post('/jogo/chute', resultado).then(function(response){

        }).catch(function(err){
            console.log(err.response);
        })
    }
};