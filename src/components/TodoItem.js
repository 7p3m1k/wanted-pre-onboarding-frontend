const TodoItem = ({ todo, isCompleted }) => {
  return (
    <li className="todoItem">
      <label>
        <input type="checkbox" />
        <span>{todo}</span>
      </label>
      <button className="todoBtn" data-testid="modify-button">
        수정
      </button>
      <button className="todoBtn" data-testid="delete-button">
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
