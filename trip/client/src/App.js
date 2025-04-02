import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { AuthProvider } from './shared/context/auth-context';
import Register from './users/page/register';
import Login from './users/page/login';
import NavMain from './shared/components/navigation/navMain';
import NewPost from './post/page/newPost';
import PostList from './post/page/postList';
import PostDetail from './post/page/postDetail';
import Main from './shared/page/main';

import './App.css';
import MyPage from './users/page/myPage';

const App = () => {

  return (
      <Router>
        <AuthProvider>
            <NavMain />
              <main>
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/:id/mypage' element={<MyPage/>}/>
                  <Route path='/posts/add' element={<NewPost />} />
                  <Route path='/posts/list' element={<PostList />} />
                  <Route path='/posts/:id' element={<PostDetail />} />
                  
                </Routes>
              </main>
        </AuthProvider>
      </Router>
  );
}

export default App;
