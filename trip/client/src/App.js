import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './shared/context/auth-context';
import Register from './users/page/register';
import Login from './users/page/login';
import NavMain from './shared/components/navigation/navMain';
import NewPost from './post/page/newPost';
import PostList from './post/page/postList';
import PostDetail from './post/page/postDetail';
import Main from './shared/page/main';
import NewComment from './comment/page/newComment';

import './App.css';
import MyPage from './users/page/myPage';
import MyPost from './users/components/myPost';
import MyComment from './users/components/myComment';
import UpdatePost from './post/page/updatePost';
import NewPlaces from './places/page/newPlaces';
import PlacesList from './places/page/placesList';
import PlacesDetail from './places/page/placesDetail';
import MyBookMark from './users/components/myBookMark';
import MyLikes from './users/components/myLikes';
import UserUpdate from './users/components/userUpdate';
import UserDelete from './users/components/userDelete';
import NewReview from './reviews/page/newReview';
import ReviewList from './reviews/page/reviewList';
import ReviewDetail from './reviews/page/reviewDetail';
import UpdateReview from './reviews/page/updateReview';
import WriteReviews from './users/components/writeReviews';
import AdminPage from './users/Admin/page/adminPage';


const App = () => {

  return (
    <Router>
      <AuthProvider>
        <NavMain />
        <main>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/:id/mypage' element={<MyPage />}>
              <Route path='post' element={<MyPost />} />
              <Route path='comments' element={<MyComment />} />
              <Route path='bookmarks' element={<MyBookMark />} />
              <Route path='likes' element={<MyLikes />} />
              <Route path='reviews' element={<WriteReviews />} />
            </Route>
            <Route path='/posts/add' element={<NewPost />} />
            <Route path='/posts/list' element={<PostList />} />
            <Route path='/posts/:id' element={<PostDetail />} />
            <Route path='/posts/:id' element={<MyPost />} />
            <Route path='/comment/:id' element={<NewComment />} />
            <Route path='/posts/:id/edit' element={<UpdatePost />} />
            <Route path='/places/add' element={<NewPlaces />} />
            <Route path='/places/list' element={<PlacesList />} />
            <Route path='/places/:id' element={<PlacesDetail />} />
            <Route path="/users/:id/edit" element={<UserUpdate />} />
            <Route path="/users/:id/delete" element={<UserDelete />} />
            <Route path="/places/:id/review/add" element={<NewReview />} />
            <Route path="/places/:id/review/list" element={<ReviewList />} />
            <Route path='/places/:id/review/:reviewId' element={<ReviewDetail />} />
            <Route path="/places/:id/review/:reviewId/edit" element={<UpdateReview />} />

          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
