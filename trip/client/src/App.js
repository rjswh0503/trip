import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './users/page/register';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/api/users/register' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
