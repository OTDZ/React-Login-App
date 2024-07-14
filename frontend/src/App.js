import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import Admin from './Admin';
import Visitor from './Visitor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/visitor' element={<Visitor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
