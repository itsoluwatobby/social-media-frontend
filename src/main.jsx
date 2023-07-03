import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContextProvider from './UserContext/UserContext';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/*' element={
          <UserContextProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </UserContextProvider>
        } />
      </Routes>
    </Router>
  </React.StrictMode>
)
