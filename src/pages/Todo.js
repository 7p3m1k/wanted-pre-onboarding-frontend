import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login-token") === null) {
      alert("로그인 해주세요");
      return navigate("/signin");
    }
  }, []);

  return (
    <div className="login">
      <div>ddd</div>
    </div>
  );
};

export default Todo;
