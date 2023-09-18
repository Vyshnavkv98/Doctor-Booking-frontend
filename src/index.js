import React, { useContext } from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import userReducer from './redux/user'
import adminReducer from './redux/admin'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { ContextProvider } from './context/ContextProvider';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

