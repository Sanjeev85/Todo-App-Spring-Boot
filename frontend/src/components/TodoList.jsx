import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import SearchItem from './SearchItem';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const completedTodo = (id) => {
    const updatingtodos = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    setTodos(updatingtodos);
  };

  const deleteTask = async (id) => {
    const updated_todo = todos.filter((todo) => todo['id'] !== id);
    await axios.delete(`http://localhost:8080/todo/${id}`);
    setTodos(updated_todo);
  };

  const updateTodo = (id, title) => {
    const updated_text = todos.filter(async (todo) => {
      if (todo.id === id) {
        todo.title = title;
        await axios.put(`http://localhost:8080/todo/${id}/text`, {
          title: title,
        });
      }

      return todo;
    });
    setTodos(updated_text);
  };
  const addTodo = async () => {
    const res = await axios.get('http://localhost:8080/todo');
    setTodos(res.data);
  };

  const createTodo = async (text) => {
    if (text.trim().length <= 0) return;
    await axios
      .post('http://localhost:8080/todo', { title: text })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    addTodo();
  };

  useEffect(() => {
    addTodo();
  }, []);

  return (
    <>
      <SearchItem
        createTodo={createTodo}
        updateTodo={updateTodo}
      />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ margin: '5px' }}>S.No</h2>
          <h2 style={{ margin: '5px' }}>Title</h2>
          <h2 style={{ margin: '5px' }}>Completed</h2>
        </div>
        {todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            deleteTask={deleteTask}
            completedTodo={completedTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;
