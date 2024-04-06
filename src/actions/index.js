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
        if (response.data.tipo_conta === 'user') {
            var auth = true;
            dispatch({ type: 'CHECK_AUTH', payload: auth});
            dispatch({ type: 'CHECK_USER', payload: response.data});
            dispatch({ type: 'CHECK_PIX', payload: response.data.pix});
            dispatch({ type: 'CHECK_VERIFIED', payload: response.data.verificado});
            dispatch({ type: 'CHECK_DONE', payload: response.data.enviado});
        } 
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