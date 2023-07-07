import axios from 'axios';
import React, { useState } from 'react';
import SearchItem from './SearchItem';

function TodoItem({ todo, index, deleteTask, completedTodo, updateTodo }) {
  const [edit, setEdit] = useState(false);

  const sendTextToSearchItem = (id, text) => {
    updateTodo(id, text);
  };

  const handleIsChecked = async (id) => {
    completedTodo(id);
    const completed = todo['completed'];

    try {
      await axios.put(`http://localhost:8080/todo/${id}`, null, {
        params: { completed },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (edit)
    return (
      <SearchItem
        id={todo['id']}
        edit={edit}
        sendTextToSearchItem={sendTextToSearchItem}
        setEdit={setEdit}
      />
    );

  return (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <p style={{ margin: '5px' }}>{todo['id']}</p>
      <p style={{ margin: '5px' }}>{todo['title']}</p>
      <p style={{ margin: '5px' }}>{todo['completed']}</p>
      <button onClick={() => setEdit(!edit)}> update Task </button>
      <button onClick={() => deleteTask(todo['id'])}>delete Task</button>
      <input
        type='checkbox'
        checked={todo['completed']}
        onChange={() => handleIsChecked(todo['id'])}
        placeholder='Add Your Task'
      />
    </div>
  );
}

export default TodoItem;
