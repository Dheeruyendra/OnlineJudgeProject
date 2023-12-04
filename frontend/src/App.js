import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ProblemList from './Components/Problems/ProblemList';

function App() {
  return (
    <div className="App">
       
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/problemList" element = {<ProblemList />} />
      </Routes>
    </div>
  );
}

export default App;
