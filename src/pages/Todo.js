import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  let navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [state, setState] = useState({
    todo: "",
    isCompleted: false,
  });

  const todoInput = useRef();
  const dataId = useRef(1);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      alert("로그인 해주세요");
      return navigate("/signin");
    } else {
      todoList();
    }
  }, []);

  const todoList = () => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  const handleChangeState = (e) => {
    console.log(e.target.value);

    setState({
      ...state,
      todo: e.target.value,
    });
  };

  const onCreate = () => {
    if (state.todo.length < 1) {
      todoInput.current.focus();
    }
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo: state.todo,
          isCompleted: state.isCompleted,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        dataId.current += 1;
        todoInput.current.value = "";
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <input
          data-testid="new-todo-input"
          value={state.todo}
          onChange={handleChangeState}
          ref={todoInput}
        />
        <button data-testid="new-todo-add-button" onClick={onCreate}>
          추가
        </button>
      </div>
      <ul className="todoList">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </div>
  );
};

export default Todo;
