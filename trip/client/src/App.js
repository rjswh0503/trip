import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { AuthProvider } from './shared/context/auth-context';
import Register from './users/page/register';
import Login from './users/page/login';
import Main from './shared/page/main';
import NavLink from './shared/components/navigation/navLink';


const App = () => {

  return (
    <Router>
      <AuthProvider>
        <NavLink/>
        <main>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
