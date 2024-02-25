import {  Routes, Route  } from 'react-router-dom';
import AuthPage from './assets/services/auth/AuthPage';
import Login from './assets/services/auth/Login';
import Register from './assets/services/auth/Register';
import DefaultChatPage from './assets/services/pages/DefaultChatPage';
const App = () => {
  // const availableRooms = ['Apple', 'Samsung', "Xiaomi", "One Piece"];
  // const navigate = useNavigate(); // Get the navigate function from the hook

  return (
      <Routes>
        <Route exact path='/' element={<DefaultChatPage />} />
        <Route path='/auth/*' element={<AuthPage />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
  );
}

export default App;
