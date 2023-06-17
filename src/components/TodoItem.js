import { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, isCompleted, id, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [ischecked, setIsChecked] = useState(isCompleted);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [text, setText] = useState(todo);

  const onEdit = (targetId) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${targetId}`,
        {
          todo: text,
          isCompleted: isCompleted,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  const onToggle = (targetId) => {
    setIsChecked(!ischecked);
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${targetId}`,
        {
          todo: text,
          isCompleted: !ischecked,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        setIsChecked(!ischecked);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  return (
    <li className="todoItem">
      <label>
        <input
          type="checkbox"
          data-testid="modify-input"
          onChange={() => onToggle(id)}
          checked={ischecked}
        />
        {isEdit ? (
          <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
          </>
        ) : (
          <span>{text}</span>
        )}
      </label>
      {isEdit ? (
        <>
          <button
            className="todoBtn"
            data-testid="submit-button"
            onClick={() => onEdit(id)}
          >
            제출
          </button>
          <button
            className="todoBtn"
            data-testid="cancel-button"
            onClick={() => toggleIsEdit()}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            className="todoBtn"
            data-testid="modify-button"
            onClick={() => toggleIsEdit()}
          >
            수정
          </button>
          <button
            className="todoBtn"
            data-testid="delete-button"
            onClick={() => onDelete(id)}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
