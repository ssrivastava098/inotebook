import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/noteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AuthState from './contexts/auth/authState';
// import Alert from './components/Alert';

function App() {
  // let alert = {
  //   type: "success",
  //   message: "This is a success message"
  // };
  return (
    //This binding of the entire segment in <NoteState> will allow all the components to use the state variables
    <Router>
      <AuthState>
        <NoteState >
          {/* <div>
          <Alert alert = {alert}/>
        </div> */}
          <div className="comfortaa" style={{ "color": "white" }} >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </NoteState>
      </AuthState>
    </Router>
  );
}

export default App;
