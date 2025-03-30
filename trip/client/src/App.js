import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { AuthProvider } from './shared/context/auth-context';
import Register from './users/page/register';
import Login from './users/page/login';
import Main from './shared/page/main';
import NavMain from './shared/components/navigation/navMain';
import NewPost from './post/page/newPost';


const App = () => {

  return (
    <Router>
      <AuthProvider>
        <NavMain/>
        <main>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/post' element={<NewPost />}/>
            
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
