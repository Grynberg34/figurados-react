import api from '../api/api';
import { jwtDecode } from "jwt-decode";

// REGISTER, LOGIN, REDEFINE, AUTH

export const CheckAuth = (token, palpites, figurado) => async dispatch => {

    await api.get('/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        }
    }).then(async function(response){

        var user = {
            id: response.data.id,
            name: response.data.name,
            created: response.data.created
        }

        if (response.data.id) {
            dispatch({ type: 'CHECK_AUTH', payload: true});
            dispatch({ type: 'CHECK_USER', payload: user});


            for (let i = 0; i < palpites.opções.length; i++) {

                let palpite = palpites.opções[i];

                palpite.user = user.id;

                palpite.figurado = figurado.id;

                await api.post('/jogo/palpite', palpite, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}).then( async function(response){
                }).catch(function(err){
                    console.log(err.response);
                })
            }

            if (palpites.chute !== null) {
                var resultado = {
                    certo: palpites.jogador.id === figurado.id,
                    chute: palpites.jogador.id,
                    figurado: figurado.id,
                    user : user.id
                }

                await api.post('/jogo/chute', resultado, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}).catch(function(err){
                    console.log(err.response);
                })
            }


            var figurado_new = {
                id: figurado.número,
                user: user.id
            }
        
            await api.post('jogo/figurado',  figurado_new, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}).then( async function(response){

                var chute = response.data.chute;

                var palpites = response.data.palpites;
        
                if (palpites.length > 7 && chute === null) {

                    var resultado = {
                        certo: true,
                        chute: 46,
                        figurado: figurado.id,
                        user : user.id
                    }
            
                    await api.post('/jogo/chute', resultado, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}).catch(function(err){
                        console.log(err.response);
                    })

                    dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:0, jogador: {nome:'Carlinhos Bala'}, chute: false}});
                } else {
                    dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:7-palpites.length, jogador: response.data.chute.jogador, chute: response.data.chute.resultado}});
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
    },{headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}).then(function(response){

        dispatch({ type: 'LOGIN_USER', payload: response.data.token });

    }).catch(function(err){
        console.log(err)
    })

};

export const LogoutUser = () => async dispatch => {

    await dispatch({ type: 'LOGIN_USER', payload: null });
    await dispatch({ type: 'CHECK_AUTH', payload: false });
    await dispatch({ type: 'CHECK_USER', payload: null });
};

export const CheckMobile = (value) => async dispatch => {

    dispatch({ type: 'CHECK_MOBILE', payload: value });
};

export const GetNúmero= () => async dispatch => {

    await api.get(`/jogo/numero`, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}}, {
    }).then(async function(response){
        dispatch({ type: 'GET_NÚMERO', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetOpções = () => async dispatch => {
    await api.get('/jogo/todos', {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}},  {
    }).then(async function(response){
        dispatch({ type: 'GET_OPCOES', payload: response.data.opções });
        dispatch({ type: 'GET_JOGADORES', payload: response.data.jogadores });
    })  
    .catch(function(err){
        console.log(err)
    })
}

export const GetFigurado= (id, user, palpites) => async dispatch => {

    var user_id;

    if (user === null) {
        user_id = null;
    } else {
        user_id = user.id
    }

    var figurado = {
        id: id,
        user: user_id
    }

    await api.post('jogo/figurado', figurado, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*"}},).then(function(response){

        if (user_id !== null || palpites.figurado_num !== figurado.id) {
            dispatch({ type: 'RESET_PALPITES', payload: {figurado_num: response.data.número, opções : response.data.palpites, erros:7-response.data.palpites.length, jogador: response.data.chute.jogador, chute: response.data.chute.resultado}});
        }
    
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
        dispatch({ type: 'SET_ERROS', payload: -1 });

        palpite.certo = true;
        dispatch({ type: 'SET_PALPITES', payload: palpite });
    }

    if (user === undefined) {
        user = null
    }
    
    if (user !== null) {
        await api.post('/jogo/palpite', palpite, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*",}}).then(function(response){
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
            user : user.id
        }

        await api.post('/jogo/chute',  resultado, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*",}}).then(function(response){

        }).catch(function(err){
            console.log(err.response);
        })
    }
};

export const GetAlbum = (user) => async dispatch => {

    let data = {
        user: user
    }
    
    await api.post('/jogo/album', data, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`, "Access-Control-Allow-Origin": "*",}}).then(function(response){

        var album = {
            figurados: response.data,
            asc: true,
            active: null
        }

        dispatch({ type: 'GET_ALBUM', payload: album});

    }).catch(function(err){
        console.log(err.response);
    })
    
};

export const SortAlbum = (order, figurados) => async dispatch => {

    var album = {
        figurados: figurados.reverse(),
        asc: order,
        active: null
    }

    dispatch({ type: 'SORT_ALBUM', payload: album});

};

export const SetModalAlbum = (figurado) => async dispatch => {

    dispatch({ type: 'SET_MODAL', payload: figurado});
};