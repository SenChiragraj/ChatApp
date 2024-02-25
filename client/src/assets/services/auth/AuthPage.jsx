import { useParams } from 'react-router-dom'
import Login from './Login';
import Register from './Register'

const AuthPage = () => {
  const type = useParams();
  console.log(type['*']);
  return (
    type['*'] == 'register' ? <Register/> : <Login/>
  )
}

export default AuthPage