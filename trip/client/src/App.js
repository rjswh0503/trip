import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Register from './users/page/register';
import Login from './users/page/login';
import NavLink from './shared/components/navigation/navLink';



const App = () => {

  return (
    <>
      <Router>
        <NavLink />
        <main>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
