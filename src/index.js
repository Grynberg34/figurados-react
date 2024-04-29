import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/App';
import Home from './components/Home';
import Album from './components/Album';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {store, persistor} from './store.js';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <GoogleOAuthProvider clientId="252288233256-jb281v296cvod668rmk79fovsru7gq1f.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/i/:id" element={<Home />}></Route>
            <Route path="/album" element={<Album />}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  document.querySelector('#root')
);


