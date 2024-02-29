import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import TaskState from './context/TaskState';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <TaskState>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={localStorage.getItem('token') ? <Home /> : <Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </TaskState>
  );
}

export default App;
