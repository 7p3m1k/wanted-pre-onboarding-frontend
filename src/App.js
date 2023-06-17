import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter basename="/https://7p3m1k.github.io/wanted-pre-onboarding-frontend/">
      <div className="App">
        <ul>
          <li>
            <Link to={"/signin"}>SignIn</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to={"/todo"}>TodoList</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
