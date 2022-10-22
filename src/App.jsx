import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Messenger from './pages/Messenger';
import { Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/ProtectRoute';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<ProtectRoute />}>
          <Route index element={<Home />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/messenger' element={<Messenger />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App


