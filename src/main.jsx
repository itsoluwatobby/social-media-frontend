import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContextProvider from './UserContext/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/*' element={
          <UserContextProvider>
              <App />
          </UserContextProvider>
        } />
      </Routes>
    </Router>
  </React.StrictMode>
)
